"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays, Clock, Tag, ChevronRight, ChevronLeft,
  Lock, AlertTriangle, CheckCircle2, Gamepad2, Zap, Timer,
} from "lucide-react";

// ── Helpers ───────────────────────────────────────────────────────────────────

function toYMD(d) { return d.toISOString().slice(0, 10); }
function tomorrow() { const d = new Date(); d.setDate(d.getDate() + 1); return toYMD(d); }

const STEPS = ["Date & Game", "Pick a Time", "Review & Pay"];
const DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_NAMES = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

/** Build an array of the next `count` date strings from today */
function buildDateRange(count = 14) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return d;
  });
}

// ── Step indicator ────────────────────────────────────────────────────────────

function StepIndicator({ current }) {
  return (
    <div className="mb-10 flex items-center">
      {STEPS.map((label, i) => (
        <div key={label} className="flex flex-1 items-center">
          <div className="flex flex-col items-center">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
              i < current  ? "bg-white text-black"
              : i === current ? "border-2 border-white text-white"
              : "border border-white/20 text-white/30"
            }`}>
              {i < current ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
            </div>
            <span className={`mt-1.5 text-center text-[10px] uppercase tracking-[0.12em] ${
              i === current ? "text-white" : "text-white/30"
            }`}>{label}</span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={`mb-5 h-px flex-1 transition-colors ${i < current ? "bg-white/50" : "bg-white/10"}`} />
          )}
        </div>
      ))}
    </div>
  );
}

// ── Date carousel ─────────────────────────────────────────────────────────────

function DateCarousel({ selectedDate, onSelect }) {
  const scrollRef = useRef(null);
  const dates = buildDateRange(21);
  const todayStr = toYMD(new Date());

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 220, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto scroll-smooth px-10 pb-1 no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {dates.map((d) => {
          const ymd = toYMD(d);
          const isSelected = ymd === selectedDate;
          const isToday = ymd === todayStr;
          return (
            <button
              key={ymd}
              onClick={() => onSelect(ymd)}
              className={`shrink-0 flex flex-col items-center gap-1 rounded-2xl border px-4 py-3 transition-all ${
                isSelected
                  ? "border-white bg-white text-black"
                  : "border-white/15 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
              }`}
            >
              <span className={`text-[10px] uppercase tracking-[0.12em] ${isSelected ? "text-black/60" : "text-white/40"}`}>
                {isToday ? "Today" : DAY_NAMES[d.getDay()]}
              </span>
              <span className="text-lg font-bold leading-none">{d.getDate()}</span>
              <span className={`text-[10px] ${isSelected ? "text-black/60" : "text-white/40"}`}>
                {MONTH_NAMES[d.getMonth()]}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// ── Time slot carousel ────────────────────────────────────────────────────────

function TimeCarousel({ slots, selectedSlot, onSelect, holding }) {
  const scrollRef = useRef(null);

  const scroll = (dir) => {
    scrollRef.current?.scrollBy({ left: dir * 240, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <button
        onClick={() => scroll(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-auto scroll-smooth px-10 pb-2 no-scrollbar"
        style={{ scrollbarWidth: "none" }}
      >
        {slots.map((slot) => {
          const isSelected = selectedSlot?.id === slot.id;
          const isUnavailable = !slot.is_available;

          if (isUnavailable) {
            return (
              <div
                key={slot.id}
                className="shrink-0 flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 opacity-35 cursor-not-allowed min-w-[110px]"
              >
                <Lock className="h-4 w-4 text-white/30" />
                <span className="text-sm font-semibold text-white/50">{slot.start_time}</span>
                <span className="text-[10px] uppercase tracking-[0.1em] text-white/30">Taken</span>
              </div>
            );
          }

          return (
            <button
              key={slot.id}
              onClick={() => !holding && onSelect(slot)}
              className={`shrink-0 flex flex-col items-center gap-2 rounded-2xl border px-5 py-4 transition-all min-w-[110px] ${
                isSelected
                  ? "border-white bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.12)]"
                  : "border-white/20 bg-white/5 text-white hover:border-white/50 hover:bg-white/10"
              }`}
            >
              <Clock className={`h-4 w-4 ${isSelected ? "text-black" : "text-white/50"}`} />
              <span className="text-sm font-bold">{slot.start_time}</span>
              <span className={`text-[10px] uppercase tracking-[0.1em] ${isSelected ? "text-black/60" : "text-white/40"}`}>
                → {slot.end_time}
              </span>
            </button>
          );
        })}
      </div>

      <button
        onClick={() => scroll(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

// ── Game card ─────────────────────────────────────────────────────────────────

function GameCard({ game, selected, onSelect }) {
  const imgs = (() => {
    try { return typeof game.image_urls === "string" ? JSON.parse(game.image_urls) : (game.image_urls || []); }
    catch { return []; }
  })();

  return (
    <button
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-2xl border transition-all text-left ${
        selected ? "border-white ring-2 ring-white/30" : "border-white/10 hover:border-white/30"
      }`}
    >
      {imgs[0] ? (
        <img src={imgs[0]} alt={game.title} className="h-28 w-full object-cover transition-transform duration-300 group-hover:scale-105" />
      ) : (
        <div className="flex h-28 items-center justify-center bg-white/5 text-3xl">🎮</div>
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      {selected && <div className="absolute inset-0 bg-white/10" />}
      {selected && (
        <div className="absolute right-2 top-2">
          <CheckCircle2 className="h-5 w-5 text-white drop-shadow" />
        </div>
      )}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-white line-clamp-1">{game.title}</p>
        <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/50">
          <Clock className="h-3 w-3" /> {game.duration_minutes} min
        </p>
      </div>
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function BookingFlow() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [step, setStep] = useState(0);

  // Step 0
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [selectedDate, setSelectedDate] = useState(tomorrow());

  // Step 1
  const [availability, setAvailability] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [holding, setHolding] = useState(false);
  const [holdBookingId, setHoldBookingId] = useState(null);
  const [holdExpiresAt, setHoldExpiresAt] = useState(null);
  const [holdError, setHoldError] = useState("");

  // Step 2
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState({ text: "", ok: false });
  const [checkingOut, setCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState("");

  // Countdown
  const [holdCountdown, setHoldCountdown] = useState(null);

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

  useEffect(() => {
    if (!holdExpiresAt) { setHoldCountdown(null); return; }
    const tick = () => {
      const remaining = Math.max(0, Math.round((new Date(holdExpiresAt) - Date.now()) / 1000));
      setHoldCountdown(remaining);
      if (remaining === 0) { setHoldBookingId(null); setHoldExpiresAt(null); setSelectedSlot(null); setStep(1); }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [holdExpiresAt]);

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
        body: JSON.stringify({ game_id: selectedGame.id, slot_id: slot.id, date_booked: selectedDate }),
      });
      const data = await res.json();
      if (!res.ok) { setHoldError(data.error || "Could not hold this slot"); setSelectedSlot(null); return; }
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
    if (!res || !res.ok) { setCouponMsg({ text: "Invalid coupon code", ok: false }); return; }
    setCouponMsg({ text: `"${couponCode.trim().toUpperCase()}" will be applied at checkout`, ok: true });
  };

  const handleCheckout = async () => {
    if (!holdBookingId) return;
    setCheckoutError("");
    setCheckingOut(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ booking_id: holdBookingId, coupon_code: couponCode.trim() || undefined }),
      });
      const data = await res.json();
      if (!res.ok) { setCheckoutError(data.error || "Checkout failed"); return; }
      window.location.href = data.data.url;
    } finally {
      setCheckingOut(false);
    }
  };

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Page header */}
      <div className="relative overflow-hidden border-b border-white/5 bg-[radial-gradient(ellipse_at_top,_rgba(248,51,225,0.08),_transparent_60%)]">
        <div className="mx-auto max-w-3xl px-4 py-14 text-center sm:px-6">
          <p className="mb-2 text-xs uppercase tracking-[0.4em] text-white/40">Skilladiz Gaming Arena</p>
          <h1 className="font-display text-4xl uppercase tracking-[0.12em] sm:text-5xl">
            Reserve Your Slot
          </h1>
          <p className="mt-3 text-sm text-white/40">
            Book your session in minutes — instant confirmation.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <StepIndicator current={step} />

        <AnimatePresence mode="wait">

          {/* ── STEP 0 ─────────────────────────────────────────────────── */}
          {step === 0 && (
            <motion.div
              key="step0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Date carousel */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <label className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
                  <CalendarDays className="h-4 w-4" /> Select Date
                </label>
                <DateCarousel selectedDate={selectedDate} onSelect={setSelectedDate} />
                <p className="mt-3 text-center text-xs text-white/30">
                  {(() => {
                    const d = new Date(selectedDate + "T00:00:00");
                    return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`;
                  })()}
                </p>
              </div>

              {/* Game selector */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <label className="mb-5 flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/50">
                  <Gamepad2 className="h-4 w-4" /> Select Game
                </label>
                {games.length === 0 ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/5" />
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    {games.filter((g) => g.active_status !== false).map((game) => (
                      <GameCard
                        key={game.id}
                        game={game}
                        selected={selectedGame?.id === game.id}
                        onSelect={() => setSelectedGame(game)}
                      />
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleStep0Next}
                disabled={!selectedGame || !selectedDate}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white/90 disabled:opacity-25"
              >
                Check Availability <ChevronRight className="h-4 w-4" />
              </button>
            </motion.div>
          )}

          {/* ── STEP 1 ─────────────────────────────────────────────────── */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                {/* Header */}
                <div className="mb-7 flex items-start justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/40">Available Slots</p>
                    <h2 className="mt-1 font-display text-xl uppercase tracking-[0.1em]">
                      {selectedGame?.title}
                    </h2>
                    <p className="mt-0.5 flex items-center gap-1.5 text-xs text-white/40">
                      <CalendarDays className="h-3.5 w-3.5" />
                      {(() => {
                        const d = new Date(selectedDate + "T00:00:00");
                        return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
                      })()}
                    </p>
                  </div>
                  <button
                    onClick={() => { setStep(0); setAvailability(null); }}
                    className="flex items-center gap-1 text-xs uppercase tracking-[0.15em] text-white/40 hover:text-white/80 transition-colors"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" /> Change
                  </button>
                </div>

                {/* Slot content */}
                {!availability ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <div className="h-7 w-7 animate-spin rounded-full border-4 border-white border-t-transparent" />
                    <p className="mt-3 text-sm text-white/40">Checking availability…</p>
                  </div>
                ) : availability.is_leave_day ? (
                  <div className="flex flex-col items-center py-12 text-center">
                    <AlertTriangle className="mb-3 h-10 w-10 text-red-400/80" />
                    <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-red-300">Shop Closed</h3>
                    <p className="mt-1 text-xs text-white/40">{availability.leave_reason}</p>
                    <button onClick={() => setStep(0)} className="mt-5 text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">
                      ← Choose another date
                    </button>
                  </div>
                ) : availability.slots.length === 0 ? (
                  <p className="py-12 text-center text-sm text-white/40">No slots configured for this game yet.</p>
                ) : (
                  <div className="space-y-5">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/30">
                      Swipe or click a time to reserve
                    </p>
                    {holdError && (
                      <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-xs text-red-400">
                        <AlertTriangle className="h-4 w-4 shrink-0" /> {holdError}
                      </div>
                    )}

                    <TimeCarousel
                      slots={availability.slots}
                      selectedSlot={selectedSlot}
                      onSelect={handleSlotSelect}
                      holding={holding}
                    />

                    {holding && (
                      <div className="flex items-center gap-2 text-xs text-white/40">
                        <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                        Reserving your slot…
                      </div>
                    )}

                    <div className="flex flex-wrap gap-4 pt-1 text-[11px] text-white/25">
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
            </motion.div>
          )}

          {/* ── STEP 2 ─────────────────────────────────────────────────── */}
          {step === 2 && selectedSlot && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 space-y-6">

                {/* Hold timer */}
                {holdCountdown !== null && (
                  <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-xs uppercase tracking-[0.12em] ${
                    holdCountdown > 60 ? "bg-green-500/10 text-green-400" : "bg-red-500/10 text-red-400"
                  }`}>
                    <Timer className="h-3.5 w-3.5 shrink-0" />
                    Slot held for{" "}
                    <span className="font-mono font-bold">
                      {Math.floor(holdCountdown / 60)}:{String(holdCountdown % 60).padStart(2, "0")}
                    </span>
                    <span className="ml-1 normal-case text-current/70">— complete payment before it expires</span>
                  </div>
                )}

                {/* Summary */}
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">Booking Summary</p>
                  <div className="overflow-hidden rounded-2xl border border-white/10 divide-y divide-white/10">
                    {[
                      ["Game", selectedGame?.title],
                      ["Date", (() => { const d = new Date(selectedDate + "T00:00:00"); return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`; })()],
                      ["Time", `${selectedSlot.start_time} – ${selectedSlot.end_time}`],
                      ["Duration", `${selectedGame?.duration_minutes} min`],
                    ].map(([label, value]) => (
                      <div key={label} className="flex items-center justify-between px-5 py-3.5">
                        <span className="text-xs uppercase tracking-[0.15em] text-white/40">{label}</span>
                        <span className="text-sm font-medium text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coupon */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/50">
                    <Tag className="h-4 w-4" /> Coupon Code
                    <span className="normal-case tracking-normal text-white/30">(optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponMsg({ text: "", ok: false }); }}
                      placeholder="ENTER CODE"
                      className="h-11 flex-1 rounded-xl border border-white/20 bg-transparent px-4 font-mono text-sm uppercase text-white placeholder:text-white/25 focus:border-white/50 focus:outline-none"
                    />
                    <button
                      onClick={validateCoupon}
                      disabled={!couponCode.trim()}
                      className="rounded-xl border border-white/20 px-5 text-xs uppercase tracking-[0.15em] text-white hover:bg-white/5 disabled:opacity-30 transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg.text && (
                    <p className={`mt-1.5 text-xs ${couponMsg.ok ? "text-green-400" : "text-red-400"}`}>{couponMsg.text}</p>
                  )}
                </div>

                {/* Auth gate */}
                {authStatus === "unauthenticated" && (
                  <div className="rounded-xl bg-yellow-500/10 px-4 py-3 text-sm text-yellow-400">
                    Please <a href="/auth" className="font-semibold underline">sign in</a> to complete your booking.
                  </div>
                )}

                {checkoutError && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    <AlertTriangle className="h-4 w-4 shrink-0" /> {checkoutError}
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button
                    onClick={() => { setStep(1); setHoldBookingId(null); setHoldExpiresAt(null); }}
                    className="flex-1 rounded-full border border-white/15 py-3.5 text-xs uppercase tracking-[0.2em] text-white/60 hover:border-white/30 hover:text-white/90 transition-colors"
                  >
                    ← Change Slot
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={checkingOut || authStatus !== "authenticated"}
                    className="flex flex-1 items-center justify-center gap-3 rounded-full bg-white py-3.5 text-xs font-bold uppercase tracking-[0.2em] text-black hover:bg-white/90 disabled:opacity-30 transition-all"
                  >
                    {checkingOut ? (
                      <><div className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent" /> Redirecting…</>
                    ) : (
                      <><Zap className="h-4 w-4" /> Proceed to Checkout</>
                    )}
                  </button>
                </div>

                <p className="text-center text-xs text-white/25">
                  Secured by Stripe · Apple Pay & Google Pay accepted
                </p>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
