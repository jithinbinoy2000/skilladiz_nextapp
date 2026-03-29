"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { CalendarDays, Clock, Tag, ChevronRight, Lock, AlertTriangle, CheckCircle2 } from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────────────

function toYMD(dateObj) {
  // Always returns YYYY-MM-DD — never a raw SQL DATE
  return dateObj.toISOString().slice(0, 10);
}

function tomorrow() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return toYMD(d);
}

const STEPS = ["Select Date & Game", "Choose Time Slot", "Review & Pay"];

// ── Sub-components ────────────────────────────────────────────────────────────

function StepIndicator({ current }) {
  return (
    <div className="mb-8 flex items-center gap-0">
      {STEPS.map((label, i) => (
        <div key={label} className="flex flex-1 items-center">
          <div className="flex flex-col items-center">
            <div
              className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                i < current
                  ? "bg-white text-black"
                  : i === current
                  ? "border-2 border-white text-white"
                  : "border border-white/20 text-white/30"
              }`}
            >
              {i < current ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <span
              className={`mt-1.5 text-center text-xs uppercase tracking-[0.1em] ${
                i === current ? "text-white" : "text-white/40"
              }`}
            >
              {label}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`mb-5 h-px flex-1 transition-colors ${
                i < current ? "bg-white/40" : "bg-white/10"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function SlotButton({ slot, selected, onSelect }) {
  if (!slot.is_available) {
    return (
      <div className="flex cursor-not-allowed items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 opacity-40">
        <Lock className="h-3.5 w-3.5 text-white/50" />
        <span className="text-sm text-white/50">
          {slot.start_time} – {slot.end_time}
        </span>
      </div>
    );
  }
  return (
    <button
      onClick={() => onSelect(slot)}
      className={`flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm transition-all ${
        selected
          ? "border-white bg-white text-black font-semibold"
          : "border-white/20 bg-white/5 text-white hover:border-white/50 hover:bg-white/10"
      }`}
    >
      <Clock className="h-3.5 w-3.5" />
      {slot.start_time} – {slot.end_time}
    </button>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function BookingFlow() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Step tracking
  const [step, setStep] = useState(0);

  // Step 0: date + game
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedDate, setSelectedDate] = useState(tomorrow());

  // Step 1: slots
  const [availability, setAvailability] = useState(null); // { is_leave_day, leave_reason, slots }
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [holding, setHolding] = useState(false);
  const [holdBookingId, setHoldBookingId] = useState(null);
  const [holdExpiresAt, setHoldExpiresAt] = useState(null);
  const [holdError, setHoldError] = useState("");

  // Step 2: review + checkout
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState({ text: "", ok: false });
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  // Pre-fill game from URL ?game=id
  useEffect(() => {
    fetch("/api/games")
      .then((r) => r.json())
      .then((d) => {
        const list = d.data || [];
        setGames(list);
        const preGame = searchParams.get("game");
        if (preGame) {
          const found = list.find((g) => g.id === preGame);
          if (found) setSelectedGame(found);
        }
      });
  }, [searchParams]);

  // Fetch availability when game + date ready (step 1)
  const fetchAvailability = useCallback(async (gameId, date) => {
    setAvailability(null);
    setSelectedSlot(null);
    const res = await fetch(`/api/bookings/availability?game_id=${gameId}&date=${date}`);
    const data = await res.json();
    setAvailability(data.data);
  }, []);

  useEffect(() => {
    if (step === 1 && selectedGame && selectedDate) {
      fetchAvailability(selectedGame.id, selectedDate);
    }
  }, [step, selectedGame, selectedDate, fetchAvailability]);

  // Countdown timer display for hold
  const [holdCountdown, setHoldCountdown] = useState(null);
  useEffect(() => {
    if (!holdExpiresAt) { setHoldCountdown(null); return; }
    const tick = () => {
      const remaining = Math.max(0, Math.round((new Date(holdExpiresAt) - Date.now()) / 1000));
      setHoldCountdown(remaining);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [holdExpiresAt]);

  // ── Handlers ──────────────────────────────────────────────────────────────

  const handleStep0Next = () => {
    if (!selectedGame || !selectedDate) return;
    setStep(1);
  };

  const handleSlotSelect = async (slot) => {
    if (authStatus === "unauthenticated") {
      router.push(`/auth?callbackUrl=/booking${selectedGame ? `?game=${selectedGame.id}` : ""}`);
      return;
    }
    setHoldError("");
    setHolding(true);
    setSelectedSlot(slot);
    try {
      const res = await fetch("/api/bookings/hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game_id: selectedGame.id,
          slot_id: slot.id,
          date_booked: selectedDate,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHoldError(data.error || "Could not hold this slot");
        setSelectedSlot(null);
        return;
      }
      setHoldBookingId(data.data.booking_id);
      setHoldExpiresAt(data.data.expires_at);
      setStep(2);
    } finally {
      setHolding(false);
    }
  };

  const validateCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponMsg({ text: "Checking…", ok: false });
    const res = await fetch(`/api/coupons?code=${couponCode.trim()}`).catch(() => null);
    // Simple client-side validation
    const today = new Date().toISOString().slice(0, 10);
    // We'll validate server-side at checkout; just do a quick UI check
    if (!res || !res.ok) { setCouponMsg({ text: "Could not validate coupon", ok: false }); return; }
    // Coupon validated at checkout — show optimistic OK
    setCouponMsg({ text: `Code "${couponCode.trim().toUpperCase()}" will be applied at checkout`, ok: true });
  };

  const handleCheckout = async () => {
    if (!holdBookingId) return;
    setCheckoutError("");
    setCheckingOut(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          booking_id: holdBookingId,
          coupon_code: couponCode.trim() || undefined,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setCheckoutError(data.error || "Checkout failed"); return; }
      window.location.href = data.data.url;
    } finally {
      setCheckingOut(false);
    }
  };

  const parseImages = (raw) => {
    try { return typeof raw === "string" ? JSON.parse(raw) : (raw || []); }
    catch { return []; }
  };

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-black px-4 py-16 text-white sm:px-6">
      <div className="mx-auto max-w-3xl">
        {/* Title */}
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-white/50">Skilladiz</p>
          <h1 className="font-display text-3xl uppercase tracking-[0.15em] sm:text-4xl">
            Reserve Your Slot
          </h1>
        </div>

        <StepIndicator current={step} />

        {/* ── STEP 0: Date + Game ── */}
        {step === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="space-y-6">
              {/* Date picker */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
                  <CalendarDays className="h-4 w-4" /> Select Date
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={toYMD(new Date())}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="h-12 w-full rounded-xl border border-white/20 bg-transparent px-4 text-sm text-white focus:border-white/50 focus:outline-none"
                />
              </div>

              {/* Game picker */}
              <div>
                <label className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
                  <span>🎮</span> Select Game
                </label>
                {games.length === 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-24 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {games.filter((g) => g.active_status !== false).map((game) => {
                      const imgs = parseImages(game.image_urls);
                      const isSelected = selectedGame?.id === game.id;
                      return (
                        <button
                          key={game.id}
                          onClick={() => setSelectedGame(game)}
                          className={`group relative overflow-hidden rounded-2xl border transition-all ${
                            isSelected
                              ? "border-white"
                              : "border-white/10 hover:border-white/30"
                          }`}
                        >
                          {imgs[0] ? (
                            <img
                              src={imgs[0]}
                              alt={game.title}
                              className="h-24 w-full object-cover transition group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-24 items-center justify-center bg-white/5 text-3xl">🎮</div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          {isSelected && (
                            <div className="absolute inset-0 bg-white/10" />
                          )}
                          <div className="absolute bottom-2 left-2 right-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white line-clamp-2">
                              {game.title}
                            </p>
                            <p className="text-[10px] text-white/60">{game.duration_minutes} min</p>
                          </div>
                          {isSelected && (
                            <CheckCircle2 className="absolute right-2 top-2 h-5 w-5 text-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <button
                onClick={handleStep0Next}
                disabled={!selectedGame || !selectedDate}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] text-black font-semibold disabled:opacity-30 hover:bg-white/90 transition-colors"
              >
                Check Availability <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 1: Slots ── */}
        {step === 1 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                  {selectedDate} · {selectedGame?.title}
                </p>
              </div>
              <button
                onClick={() => { setStep(0); setAvailability(null); }}
                className="text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white/80"
              >
                ← Change
              </button>
            </div>

            {!availability ? (
              <div className="flex flex-col items-center py-10 text-center">
                <div className="h-7 w-7 animate-spin rounded-full border-4 border-white border-t-transparent" />
                <p className="mt-3 text-sm text-white/50">Checking availability…</p>
              </div>
            ) : availability.is_leave_day ? (
              <div className="flex flex-col items-center py-10 text-center">
                <AlertTriangle className="mb-3 h-10 w-10 text-red-400" />
                <h3 className="text-lg font-semibold text-red-300">Shop Closed</h3>
                <p className="mt-1 text-sm text-white/50">{availability.leave_reason}</p>
                <button onClick={() => setStep(0)} className="mt-4 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white">
                  ← Choose another date
                </button>
              </div>
            ) : availability.slots.length === 0 ? (
              <div className="py-10 text-center text-sm text-white/50">
                No time slots configured for this game yet.
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                  Available time slots — click to reserve
                </p>
                {holdError && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <AlertTriangle className="h-4 w-4 shrink-0" /> {holdError}
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {availability.slots.map((slot) => (
                    <SlotButton
                      key={slot.id}
                      slot={slot}
                      selected={selectedSlot?.id === slot.id}
                      onSelect={holding ? () => {} : handleSlotSelect}
                    />
                  ))}
                </div>
                {holding && (
                  <div className="flex items-center gap-2 text-sm text-white/50">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    Holding slot…
                  </div>
                )}
                <div className="mt-2 flex items-center gap-4 text-xs text-white/30">
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded border border-white/20 bg-white/5" />
                    Available
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded border border-white/10 bg-white/5 opacity-40" />
                    Taken / Held
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── STEP 2: Review + Pay ── */}
        {step === 2 && selectedSlot && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
            {/* Hold timer */}
            {holdCountdown !== null && (
              <div className={`mb-5 flex items-center gap-2 rounded-xl px-4 py-2 text-xs uppercase tracking-[0.1em] ${
                holdCountdown > 60
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              }`}>
                <Lock className="h-3.5 w-3.5" />
                Slot reserved for {Math.floor(holdCountdown / 60)}:{String(holdCountdown % 60).padStart(2, "0")}
              </div>
            )}

            {/* Summary */}
            <h3 className="mb-4 text-sm uppercase tracking-[0.2em] text-white/50">Booking Summary</h3>
            <div className="mb-6 divide-y divide-white/10 rounded-2xl border border-white/10">
              {[
                ["Game", selectedGame?.title],
                ["Date", selectedDate],
                ["Time", `${selectedSlot.start_time} – ${selectedSlot.end_time}`],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between px-4 py-3">
                  <span className="text-xs uppercase tracking-[0.15em] text-white/50">{label}</span>
                  <span className="text-sm font-medium text-white">{value}</span>
                </div>
              ))}
            </div>

            {/* Coupon */}
            <div className="mb-6">
              <label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60">
                <Tag className="h-4 w-4" /> Coupon Code (optional)
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponMsg({ text: "", ok: false }); }}
                  placeholder="ENTER CODE"
                  className="h-10 flex-1 rounded-xl border border-white/20 bg-transparent px-4 font-mono text-sm uppercase text-white placeholder:text-white/30 focus:border-white/50 focus:outline-none"
                />
                <button
                  onClick={validateCoupon}
                  disabled={!couponCode.trim()}
                  className="rounded-xl border border-white/20 px-4 text-xs uppercase tracking-[0.15em] text-white hover:bg-white/5 disabled:opacity-30"
                >
                  Apply
                </button>
              </div>
              {couponMsg.text && (
                <p className={`mt-1.5 text-xs ${couponMsg.ok ? "text-green-400" : "text-red-400"}`}>
                  {couponMsg.text}
                </p>
              )}
            </div>

            {/* Auth gate */}
            {authStatus === "unauthenticated" && (
              <div className="mb-4 rounded-xl bg-yellow-500/10 px-4 py-3 text-sm text-yellow-400">
                Please <a href="/auth" className="underline">sign in</a> to proceed to checkout.
              </div>
            )}

            {checkoutError && (
              <div className="mb-4 flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                <AlertTriangle className="h-4 w-4 shrink-0" /> {checkoutError}
              </div>
            )}

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => { setStep(1); setHoldBookingId(null); setHoldExpiresAt(null); }}
                className="flex-1 rounded-full border border-white/20 py-3 text-xs uppercase tracking-[0.2em] text-white hover:bg-white/5"
              >
                ← Change Slot
              </button>
              <button
                onClick={handleCheckout}
                disabled={checkingOut || authStatus !== "authenticated"}
                className="flex flex-1 items-center justify-center gap-3 rounded-full bg-white py-3 text-xs uppercase tracking-[0.2em] text-black font-semibold hover:bg-white/90 disabled:opacity-30 transition-colors"
              >
                {checkingOut ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" />
                    Redirecting…
                  </>
                ) : (
                  <>Proceed to Checkout</>
                )}
              </button>
            </div>

            <p className="mt-4 text-center text-xs text-white/30">
              Secured by Stripe · Apple Pay & Google Pay accepted
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
