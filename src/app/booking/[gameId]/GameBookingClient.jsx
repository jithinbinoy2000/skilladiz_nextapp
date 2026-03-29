"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CalendarDays,
  Clock,
  Lock,
  AlertTriangle,
  CheckCircle2,
  Tag,
  ChevronLeft,
  Timer,
  Gamepad2,
  Zap,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

// ── Stripe ────────────────────────────────────────────────────────────────────

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function toYMD(d) {
  return d.toISOString().slice(0, 10);
}

function todayYMD() {
  return toYMD(new Date());
}

/** Returns true if a slot's end time has already passed when booking for today */
function isSlotExpired(slot, selectedDate) {
  if (selectedDate !== todayYMD()) return false;
  const now = new Date();
  const [h, m] = slot.end_time.split(":").map(Number);
  const slotEnd = new Date();
  slotEnd.setHours(h, m, 0, 0);
  return slotEnd <= now;
}

function parseImages(raw) {
  try {
    return typeof raw === "string" ? JSON.parse(raw) : raw || [];
  } catch {
    return [];
  }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function SlotButton({ slot, selected, expired, onSelect }) {
  const isUnavailable = !slot.is_available || expired;

  if (isUnavailable) {
    return (
      <div
        className={`flex cursor-not-allowed flex-col items-center justify-center gap-1 rounded-2xl border px-3 py-3 text-center ${
          expired
            ? "border-white/5 bg-transparent opacity-25"
            : "border-white/10 bg-white/5 opacity-40"
        }`}
      >
        <div className="flex items-center gap-1.5">
          {expired ? (
            <Timer className="w-3 h-3 text-white/30" />
          ) : (
            <Lock className="w-3 h-3 text-white/40" />
          )}
          <span className="text-xs text-white/50">
            {slot.start_time}
          </span>
        </div>
        <span className="text-[9px] uppercase tracking-[0.1em] text-white/25">
          {expired ? "Expired" : "Taken"}
        </span>
      </div>
    );
  }

  return (
    <button
      onClick={() => onSelect(slot)}
      className={`group flex flex-col items-center justify-center gap-1 rounded-2xl border px-3 py-3 text-center transition-all duration-200 ${
        selected
          ? "border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.15)]"
          : "border-white/20 bg-white/5 text-white hover:border-white/60 hover:bg-white/10"
      }`}
    >
      <Clock
        className={`h-3.5 w-3.5 transition-colors ${
          selected ? "text-black" : "text-white/60 group-hover:text-white"
        }`}
      />
      <span className="text-xs font-semibold">{slot.start_time}</span>
      <span
        className={`text-[9px] uppercase tracking-[0.08em] ${
          selected ? "text-black/60" : "text-white/40"
        }`}
      >
        –{slot.end_time}
      </span>
    </button>
  );
}

function SectionDivider({ label }) {
  return (
    <div className="flex items-center gap-3 py-1">
      <div className="flex-1 h-px bg-white/10" />
      <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
        {label}
      </span>
      <div className="flex-1 h-px bg-white/10" />
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function GameBookingClient({ gameId }) {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();

  // Game data
  const [game, setGame] = useState(null);
  const [gameLoading, setGameLoading] = useState(true);
  const [gameError, setGameError] = useState("");

  // Booking state
  const [selectedDate, setSelectedDate] = useState(todayYMD());
  const [availability, setAvailability] = useState(null);
  const [slotsLoading, setSlotsLoading] = useState(false);

  // Slot hold
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [holding, setHolding] = useState(false);
  const [holdBookingId, setHoldBookingId] = useState(null);
  const [holdExpiresAt, setHoldExpiresAt] = useState(null);
  const [holdCountdown, setHoldCountdown] = useState(null);
  const [holdError, setHoldError] = useState("");

  // Coupon
  const [couponCode, setCouponCode] = useState("");
  const [couponMsg, setCouponMsg] = useState({ text: "", ok: false });

  // Checkout
  const [checkoutVisible, setCheckoutVisible] = useState(false);
  const [checkoutKey, setCheckoutKey] = useState(0);

  // Active image for gallery
  const [activeImg, setActiveImg] = useState(0);

  // ── Fetch game ──────────────────────────────────────────────────────────────
  useEffect(() => {
    fetch(`/api/games/${gameId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setGame(d.data);
        else setGameError("Game not found");
      })
      .catch(() => setGameError("Failed to load game"))
      .finally(() => setGameLoading(false));
  }, [gameId]);

  // ── Fetch availability when date changes ───────────────────────────────────
  useEffect(() => {
    if (!gameId || !selectedDate) return;
    setSlotsLoading(true);
    setAvailability(null);
    setSelectedSlot(null);
    setHoldBookingId(null);
    setHoldExpiresAt(null);
    setCheckoutVisible(false);
    setCouponCode("");
    setCouponMsg({ text: "", ok: false });

    fetch(`/api/bookings/availability?game_id=${gameId}&date=${selectedDate}`)
      .then((r) => r.json())
      .then((d) => setAvailability(d.data))
      .catch(() => {})
      .finally(() => setSlotsLoading(false));
  }, [gameId, selectedDate]);

  // ── Countdown timer ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!holdExpiresAt) {
      setHoldCountdown(null);
      return;
    }
    const tick = () => {
      const remaining = Math.max(
        0,
        Math.round((new Date(holdExpiresAt) - Date.now()) / 1000)
      );
      setHoldCountdown(remaining);
      if (remaining === 0) {
        setHoldBookingId(null);
        setHoldExpiresAt(null);
        setSelectedSlot(null);
        setCheckoutVisible(false);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [holdExpiresAt]);

  // ── Handlers ───────────────────────────────────────────────────────────────

  const resetSlot = () => {
    setSelectedSlot(null);
    setHoldBookingId(null);
    setHoldExpiresAt(null);
    setCheckoutVisible(false);
    setCouponCode("");
    setCouponMsg({ text: "", ok: false });
  };

  const handleSlotSelect = async (slot) => {
    if (authStatus === "unauthenticated") {
      router.push(`/auth?callbackUrl=/booking/${gameId}`);
      return;
    }
    setHoldError("");
    setHolding(true);
    setSelectedSlot(slot);
    setCheckoutVisible(false);
    setCouponCode("");
    setCouponMsg({ text: "", ok: false });

    try {
      const res = await fetch("/api/bookings/hold", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          game_id: gameId,
          slot_id: slot.id,
          date_booked: selectedDate,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setHoldError(data.error || "Could not hold this slot. Try another.");
        setSelectedSlot(null);
        return;
      }
      setHoldBookingId(data.data.booking_id);
      setHoldExpiresAt(data.data.expires_at);
    } finally {
      setHolding(false);
    }
  };

  const validateCoupon = async () => {
    if (!couponCode.trim()) return;
    setCouponMsg({ text: "Checking…", ok: false });
    try {
      const res = await fetch(`/api/coupons?code=${couponCode.trim()}`);
      if (!res.ok) throw new Error();
      setCouponMsg({
        text: `"${couponCode.trim().toUpperCase()}" will be applied at checkout`,
        ok: true,
      });
    } catch {
      setCouponMsg({ text: "Could not validate coupon", ok: false });
    }
  };

  const handleContinueToPayment = () => {
    setCheckoutKey((k) => k + 1); // remount EmbeddedCheckout if re-opened
    setCheckoutVisible(true);
  };

  /** Called by @stripe/react-stripe-js to get the client secret */
  const fetchClientSecret = useCallback(async () => {
    if (!holdBookingId) throw new Error("No booking ID");
    const res = await fetch("/api/stripe/embedded-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        booking_id: holdBookingId,
        coupon_code: couponCode.trim() || undefined,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Checkout session failed");
    return data.data.clientSecret;
  }, [holdBookingId, couponCode]);

  // ── Loading / Error states ─────────────────────────────────────────────────

  if (gameLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-black">
        <div className="w-8 h-8 border-2 border-white rounded-full animate-spin border-t-transparent" />
      </div>
    );
  }

  if (gameError || !game) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-black px-4 text-center">
        <Gamepad2 className="w-12 h-12 mb-4 text-white/20" />
        <p className="text-sm text-white/50">{gameError || "Game not found"}</p>
        <a
          href="/"
          className="mt-4 text-xs uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors"
        >
          ← Back Home
        </a>
      </div>
    );
  }

  const images = parseImages(game.image_urls);
  const today = todayYMD();

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen text-white bg-black">
      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <div className="relative h-64 overflow-hidden sm:h-80 lg:h-96">
        {images[activeImg] ? (
          <img
            src={images[activeImg]}
            alt={game.title}
            className="absolute inset-0 object-cover w-full h-full transition-opacity duration-500"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,51,225,0.2),_transparent_70%)]" />
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10" />

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 px-4 pb-8 mx-auto max-w-7xl sm:px-6">
          <a
            href="/"
            className="mb-4 inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
          >
            <ChevronLeft className="h-3.5 w-3.5" /> Back
          </a>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.4em] text-white/50">
                Gaming Zone
              </p>
              <h1 className="font-display text-3xl uppercase tracking-[0.15em] sm:text-4xl lg:text-5xl">
                {game.title}
              </h1>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 border rounded-full border-white/20 bg-black/40 backdrop-blur-sm">
              <Clock className="w-4 h-4 text-white/50" />
              <span className="text-sm text-white/80">
                {game.duration_minutes} min
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">

          {/* ── LEFT: Game Details ────────────────────────────────────────── */}
          <div className="space-y-8">
            {/* Image gallery */}
            {images.length > 0 && (
              <div className="space-y-3">
                <div className="relative overflow-hidden rounded-2xl">
                  <img
                    src={images[activeImg]}
                    alt={game.title}
                    className="object-cover w-full h-56 sm:h-64"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
                {images.length > 1 && (
                  <div className="flex gap-2 pb-1 overflow-x-auto">
                    {images.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveImg(i)}
                        className={`shrink-0 overflow-hidden rounded-xl transition-all ${
                          i === activeImg
                            ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                            : "opacity-50 hover:opacity-80"
                        }`}
                      >
                        <img
                          src={img}
                          alt={`${game.title} ${i + 1}`}
                          className="object-cover w-20 h-14"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* About */}
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.3em] text-white/40">
                About This Zone
              </p>
              <p className="font-sans leading-relaxed text-white/70">
                {game.description ||
                  "Premium gaming experience with top-of-the-line equipment, immersive environment, and expert setup. Perfect for casual players and competitive gamers alike."}
              </p>
            </div>

            {/* Details card */}
            <div className="overflow-hidden border rounded-2xl border-white/10">
              {[
                ["Session Duration", `${game.duration_minutes} minutes`],
                ["Availability", "Daily — subject to schedule"],
                ["Zone Type", "Gaming Zone"],
                ["Equipment", "Professional Grade"],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex items-center justify-between px-5 py-4 ${
                    i > 0 ? "border-t border-white/10" : ""
                  }`}
                >
                  <span className="text-xs uppercase tracking-[0.15em] text-white/40">
                    {label}
                  </span>
                  <span className="text-sm font-medium text-white">{value}</span>
                </div>
              ))}
            </div>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2">
              {["No Walk-ins", "Online Payment", "Instant Confirmation", "Secure Checkout"].map(
                (tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>

          {/* ── RIGHT: Booking Form ───────────────────────────────────────── */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="space-y-5">

              {/* Date + Slots Card */}
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <p className="mb-1 text-xs uppercase tracking-[0.4em] text-white/40">
                  Skilladiz
                </p>
                <h2 className="mb-6 font-display text-2xl uppercase tracking-[0.12em]">
                  Reserve Your Slot
                </h2>

                {/* Date Picker */}
                <div className="mb-6">
                  <label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/50">
                    <CalendarDays className="w-4 h-4" /> Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    min={today}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="h-12 w-full rounded-xl border border-white/20 bg-transparent px-4 text-sm text-white [color-scheme:dark] focus:border-white/50 focus:outline-none"
                  />
                </div>

                <SectionDivider label="Available Time Slots" />

                {/* Slot Grid */}
                <div className="mt-5">
                  {slotsLoading ? (
                    <div className="flex flex-col items-center py-8">
                      <div className="w-6 h-6 border-2 border-white rounded-full animate-spin border-t-transparent" />
                      <p className="mt-3 text-xs text-white/40">
                        Checking availability…
                      </p>
                    </div>
                  ) : !availability ? (
                    <div className="py-8 text-xs text-center text-white/30">
                      Select a date to see available slots
                    </div>
                  ) : availability.is_leave_day ? (
                    <div className="flex flex-col items-center py-8 text-center">
                      <AlertTriangle className="w-8 h-8 mb-3 text-red-400/80" />
                      <h3 className="text-sm font-semibold uppercase tracking-[0.1em] text-red-300">
                        Shop Closed
                      </h3>
                      <p className="mt-1 text-xs text-white/40">
                        {availability.leave_reason}
                      </p>
                    </div>
                  ) : availability.slots.length === 0 ? (
                    <p className="py-8 text-sm text-center text-white/40">
                      No time slots configured for this game yet.
                    </p>
                  ) : (
                    <div className="space-y-4">
                      {holdError && (
                        <div className="flex items-center gap-2 px-4 py-3 text-xs text-red-400 rounded-xl bg-red-500/10">
                          <AlertTriangle className="w-4 h-4 shrink-0" />
                          {holdError}
                        </div>
                      )}

                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                        {availability.slots.map((slot) => {
                          const expired = isSlotExpired(slot, selectedDate);
                          return (
                            <SlotButton
                              key={slot.id}
                              slot={slot}
                              selected={selectedSlot?.id === slot.id}
                              expired={expired}
                              onSelect={holding ? () => {} : handleSlotSelect}
                            />
                          );
                        })}
                      </div>

                      {holding && (
                        <div className="flex items-center gap-2 text-xs text-white/40">
                          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Reserving slot…
                        </div>
                      )}

                      {/* Legend */}
                      <div className="flex flex-wrap gap-4 text-xs text-white/25">
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-3 border rounded border-white/20 bg-white/5" />
                          Available
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-3 border rounded border-white/10 bg-white/5 opacity-40" />
                          Taken / Held
                        </span>
                        <span className="flex items-center gap-1.5">
                          <span className="w-3 h-3 bg-transparent border rounded opacity-25 border-white/5" />
                          Expired
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* ── Booking Summary + Checkout ─────────────────────────── */}
              <AnimatePresence>
                {holdBookingId && selectedSlot && (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                  >
                    <div className="p-6 space-y-6 sm:p-8">
                      {/* Hold timer */}
                      {holdCountdown !== null && (
                        <div
                          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs uppercase tracking-[0.12em] ${
                            holdCountdown > 60
                              ? "bg-green-500/10 text-green-400"
                              : "bg-red-500/10 text-red-400"
                          }`}
                        >
                          <Lock className="h-3.5 w-3.5 shrink-0" />
                          Slot held for{" "}
                          <span className="font-mono font-bold">
                            {Math.floor(holdCountdown / 60)}:
                            {String(holdCountdown % 60).padStart(2, "0")}
                          </span>
                        </div>
                      )}

                      {/* Summary */}
                      <div>
                        <p className="mb-3 text-xs uppercase tracking-[0.25em] text-white/40">
                          Booking Summary
                        </p>
                        <div className="overflow-hidden border rounded-2xl border-white/10">
                          {[
                            ["Game", game.title],
                            ["Date", selectedDate],
                            [
                              "Time",
                              `${selectedSlot.start_time} – ${selectedSlot.end_time}`,
                            ],
                            ["Duration", `${game.duration_minutes} min`],
                          ].map(([label, value], i) => (
                            <div
                              key={label}
                              className={`flex items-center justify-between px-4 py-3 ${
                                i > 0 ? "border-t border-white/10" : ""
                              }`}
                            >
                              <span className="text-xs uppercase tracking-[0.15em] text-white/40">
                                {label}
                              </span>
                              <span className="text-sm font-medium text-white">
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Coupon — only shown before checkout opens */}
                      {!checkoutVisible && (
                        <div>
                          <label className="mb-2 flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/50">
                            <Tag className="w-4 h-4" /> Coupon Code
                            <span className="tracking-normal normal-case text-white/30">
                              (optional)
                            </span>
                          </label>
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={couponCode}
                              onChange={(e) => {
                                setCouponCode(e.target.value.toUpperCase());
                                setCouponMsg({ text: "", ok: false });
                              }}
                              placeholder="ENTER CODE"
                              className="flex-1 h-10 px-4 font-mono text-sm text-white uppercase bg-transparent border rounded-xl border-white/20 placeholder:text-white/25 focus:border-white/50 focus:outline-none"
                            />
                            <button
                              onClick={validateCoupon}
                              disabled={!couponCode.trim()}
                              className="rounded-xl border border-white/20 px-4 text-xs uppercase tracking-[0.15em] text-white hover:bg-white/5 disabled:opacity-30 transition-colors"
                            >
                              Apply
                            </button>
                          </div>
                          {couponMsg.text && (
                            <p
                              className={`mt-1.5 text-xs ${
                                couponMsg.ok ? "text-green-400" : "text-red-400"
                              }`}
                            >
                              {couponMsg.text}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Auth gate */}
                      {authStatus === "unauthenticated" && (
                        <div className="px-4 py-3 text-sm text-yellow-400 rounded-xl bg-yellow-500/10">
                          Please{" "}
                          <a href="/auth" className="font-semibold underline">
                            sign in
                          </a>{" "}
                          to complete your booking.
                        </div>
                      )}

                      {/* Continue to Payment OR Embedded Checkout */}
                      {!checkoutVisible ? (
                        <button
                          onClick={handleContinueToPayment}
                          disabled={authStatus !== "authenticated"}
                          className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-black transition-all hover:bg-white/90 disabled:opacity-30"
                        >
                          <Zap className="w-4 h-4" />
                          Continue to Payment
                        </button>
                      ) : (
                        <div className="space-y-4">
                          <SectionDivider label="Secure Payment" />

                          {/* Stripe EmbeddedCheckout */}
                          <div
                            key={checkoutKey}
                            className="overflow-hidden border rounded-2xl border-white/10"
                          >
                            <EmbeddedCheckoutProvider
                              stripe={stripePromise}
                              options={{ fetchClientSecret }}
                            >
                              <EmbeddedCheckout />
                            </EmbeddedCheckoutProvider>
                          </div>

                          <p className="text-xs text-center text-white/25">
                            Secured by Stripe · Apple Pay & Google Pay accepted
                          </p>
                        </div>
                      )}

                      {/* Change slot */}
                      <button
                        onClick={resetSlot}
                        className="w-full rounded-full border border-white/15 py-3 text-xs uppercase tracking-[0.2em] text-white/50 transition-colors hover:border-white/30 hover:text-white/80"
                      >
                        ← Choose a Different Slot
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
