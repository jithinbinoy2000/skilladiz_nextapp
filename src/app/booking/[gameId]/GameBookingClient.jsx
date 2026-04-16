"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Clock,
  Gamepad2,
  ChevronLeft,
  AlertTriangle,
  Zap,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";

import { BookingCalendar } from "./components/BookingCalendar";
import { TimeSlotCarousel } from "./components/TimeSlotCarousel";
import { HoldTimer } from "./components/HoldTimer";
import { BookingSummaryCard } from "./components/BookingSummaryCard";
import { PaymentModal } from "./components/PaymentModal";

// ── Stripe ────────────────────────────────────────────────────────────────────

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// ── Helpers ───────────────────────────────────────────────────────────────────

function todayYMD() {
  return new Date().toLocaleDateString("en-CA");
}

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

// ── GameHero ──────────────────────────────────────────────────────────────────

function GameHero({ game, images, activeImg }) {
  return (
    <div className="relative h-60 overflow-hidden sm:h-76 lg:h-88">
      {images[activeImg] ? (
        <img
          src={images[activeImg]}
          alt={game.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,51,225,0.18),transparent_70%)]" />
      )}
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/10" />

      {/* Content */}
      <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-7 sm:px-6">
        <a
          href="/"
          className="mb-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
        >
          <ChevronLeft className="h-3 w-3" /> Back
        </a>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="mb-1.5 text-[9px] uppercase tracking-[0.45em] text-white/35">
              Gaming Zone
            </p>
            <h1 className="font-display text-3xl uppercase tracking-[0.1em] sm:text-4xl lg:text-5xl">
              {game.title}
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-4 py-2 backdrop-blur-sm">
            <Clock className="h-3.5 w-3.5 text-white/45" />
            <span className="text-sm text-white/65">{game.duration_minutes} min</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── GameDetails (left column) ─────────────────────────────────────────────────

function GameDetails({ game, images, activeImg, onImgChange }) {
  return (
    <div className="space-y-6">
      {/* Gallery */}
      {images.length > 0 && (
        <div className="space-y-2">
          <div className="overflow-hidden rounded-2xl">
            <img
              src={images[activeImg]}
              alt={game.title}
              className="h-52 w-full object-cover transition-opacity duration-300 sm:h-60"
            />
          </div>
          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => onImgChange(i)}
                  className={`shrink-0 overflow-hidden rounded-xl transition-all ${
                    i === activeImg
                      ? "ring-2 ring-white ring-offset-2 ring-offset-black"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <img
                    src={img}
                    alt={`${game.title} ${i + 1}`}
                    className="h-14 w-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* About */}
      <div>
        <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-white/35">
          About This Zone
        </p>
        <p className="text-sm leading-relaxed text-white/60">
          {game.description ||
            "Premium gaming experience with top-of-the-line equipment and an immersive setup. Perfect for casual players and competitive gamers alike."}
        </p>
      </div>

      {/* Info card */}
      <div className="overflow-hidden rounded-2xl border border-white/10">
        {[
          ["Duration", `${game.duration_minutes} min per session`],
          ["Availability", "Daily — subject to schedule"],
          ["Zone Type", "Gaming Zone"],
          ["Equipment", "Professional Grade"],
        ].map(([label, value], i) => (
          <div
            key={label}
            className={`flex items-center justify-between px-5 py-3.5 ${
              i > 0 ? "border-t border-white/10" : ""
            }`}
          >
            <span className="text-[10px] uppercase tracking-[0.15em] text-white/35">
              {label}
            </span>
            <span className="text-sm font-medium text-white">{value}</span>
          </div>
        ))}
      </div>

      {/* Feature tags */}
      <div className="flex flex-wrap gap-2">
        {[
          "No Walk-ins",
          "Online Payment",
          "Instant Confirmation",
          "Secure Checkout",
        ].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.1em] text-white/40"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ── BookingPanel (right column) ───────────────────────────────────────────────

function BookingPanel({
  game,
  selectedDate,
  onDateSelect,
  availability,
  slotsLoading,
  enrichedSlots,
  selectedSlot,
  holding,
  holdError,
  holdBookingId,
  holdCountdown,
  couponCode,
  couponMsg,
  authStatus,
  onSlotSelect,
  onCouponChange,
  onCouponApply,
  onOpenPayment,
  onResetSlot,
}) {
  const showSummary = holdBookingId && selectedSlot;

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/35">
          Skilladiz
        </p>
        <h2 className="font-display text-2xl uppercase tracking-[0.1em] text-white">
          Reserve Your Slot
        </h2>
      </div>

      {/* Calendar */}
      <BookingCalendar selectedDate={selectedDate} onSelect={onDateSelect} />

      {/* Slots section */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
        <p className="mb-4 text-[10px] uppercase tracking-[0.28em] text-white/40">
          Time Slots
        </p>

        {slotsLoading ? (
          <div className="flex items-center gap-3 py-4 text-xs text-white/40">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            Checking availability…
          </div>
        ) : !availability ? null : availability.is_leave_day ? (
          <div className="flex flex-col items-center py-6 text-center">
            <AlertTriangle className="mb-3 h-8 w-8 text-red-400/70" />
            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-red-300">
              Shop Closed
            </p>
            <p className="mt-1 text-xs text-white/40">
              {availability.leave_reason}
            </p>
          </div>
        ) : enrichedSlots.length === 0 ? (
          <p className="py-6 text-center text-sm text-white/40">
            No time slots configured yet.
          </p>
        ) : (
          <div className="space-y-3">
            {holdError && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-3 text-xs text-red-400">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                {holdError}
              </div>
            )}
            <TimeSlotCarousel
              slots={enrichedSlots}
              selectedSlot={selectedSlot}
              onSelect={onSlotSelect}
              holding={holding}
            />
          </div>
        )}
      </div>

      {/* Summary + payment section */}
      {showSummary && (
        <div className="space-y-3">
          <HoldTimer countdown={holdCountdown} />

          <BookingSummaryCard
            game={game}
            selectedDate={selectedDate}
            selectedSlot={selectedSlot}
            couponCode={couponCode}
            couponMsg={couponMsg}
            onCouponChange={onCouponChange}
            onCouponApply={onCouponApply}
          />

          {authStatus === "unauthenticated" && (
            <div className="rounded-xl bg-amber-500/10 px-4 py-3 text-sm text-amber-400">
              Please{" "}
              <a href="/auth" className="font-semibold underline">
                sign in
              </a>{" "}
              to complete your booking.
            </div>
          )}

          {/* CTA */}
          <button
            onClick={onOpenPayment}
            disabled={authStatus !== "authenticated"}
            className="flex w-full items-center justify-center gap-3 rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.22em] text-black transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-30"
          >
            <Zap className="h-4 w-4" />
            Continue to Payment
          </button>

          <button
            onClick={onResetSlot}
            className="w-full rounded-full border border-white/12 py-3 text-xs uppercase tracking-[0.2em] text-white/40 transition-all hover:border-white/25 hover:text-white/70"
          >
            ← Choose a Different Slot
          </button>
        </div>
      )}
    </div>
  );
}

// ── OtherGamesSection ─────────────────────────────────────────────────────────

function OtherGameCard({ game }) {
  const images = parseImages(game.image_urls);
  const thumb = images[0];

  return (
    <a
      href={`/booking/${game.id}`}
      className="group relative overflow-hidden rounded-2xl border border-white/10 transition-all duration-200 hover:border-white/30 focus:outline-none focus-visible:ring-1 focus-visible:ring-white/40"
    >
      {/* Thumbnail */}
      {thumb ? (
        <img
          src={thumb}
          alt={game.title}
          className="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      ) : (
        <div className="flex h-36 items-center justify-center bg-white/5 text-4xl">
          🎮
        </div>
      )}

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-xs font-semibold uppercase tracking-[0.08em] text-white line-clamp-1">
          {game.title}
        </p>
        <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/50">
          <Clock className="h-3 w-3" /> {game.duration_minutes} min
        </p>
      </div>

      {/* Hover CTA */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <span className="rounded-full bg-white px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-black shadow-lg">
          Book Now
        </span>
      </div>
    </a>
  );
}

function OtherGamesSection({ games }) {
  if (!games.length) return null;
  return (
    <div className="mt-14 border-t border-white/8 pt-10">
      <p className="mb-1 text-[10px] uppercase tracking-[0.4em] text-white/35">
        Explore More
      </p>
      <h3 className="mb-6 font-display text-xl uppercase tracking-[0.1em] text-white">
        Other Gaming Zones
      </h3>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {games.map((g) => (
          <OtherGameCard key={g.id} game={g} />
        ))}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function GameBookingClient({ gameId }) {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();

  // Game
  const [game, setGame] = useState(null);
  const [gameLoading, setGameLoading] = useState(true);
  const [gameError, setGameError] = useState("");
  const [activeImg, setActiveImg] = useState(0);
  const [otherGames, setOtherGames] = useState([]);

  // Booking
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

  // Payment modal
  const [paymentOpen, setPaymentOpen] = useState(false);
  const [checkoutKey, setCheckoutKey] = useState(0);

  // ── Fetch game + other games ────────────────────────────────────────────────
  useEffect(() => {
    fetch(`/api/games/${gameId}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.data) setGame(d.data);
        else setGameError("Game not found");
      })
      .catch(() => setGameError("Failed to load game"))
      .finally(() => setGameLoading(false));

    fetch("/api/games")
      .then((r) => r.json())
      .then((d) =>
        setOtherGames(
          (d.data || []).filter(
            (g) => g.id !== gameId && g.active_status !== false
          )
        )
      )
      .catch(() => {});
  }, [gameId]);

  // ── Fetch availability ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!gameId || !selectedDate) return;
    setSlotsLoading(true);
    setAvailability(null);
    setSelectedSlot(null);
    setHoldBookingId(null);
    setHoldExpiresAt(null);
    setPaymentOpen(false);
    setCouponCode("");
    setCouponMsg({ text: "", ok: false });

    fetch(`/api/bookings/availability?game_id=${gameId}&date=${selectedDate}`)
      .then((r) => r.json())
      .then((d) => setAvailability(d.data))
      .catch(() => {})
      .finally(() => setSlotsLoading(false));
  }, [gameId, selectedDate]);

  // ── Hold countdown ──────────────────────────────────────────────────────────
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
        setPaymentOpen(false);
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [holdExpiresAt]);

  // ── Handlers ────────────────────────────────────────────────────────────────

  const handleDateSelect = (ymd) => setSelectedDate(ymd);

  const handleSlotSelect = async (slot) => {
    if (authStatus === "unauthenticated") {
      router.push(`/auth?callbackUrl=/booking/${gameId}`);
      return;
    }
    setHoldError("");
    setHolding(true);
    setSelectedSlot(slot);
    setPaymentOpen(false);
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
      setCouponMsg({ text: "Invalid or expired coupon code", ok: false });
    }
  };

  const handleOpenPayment = () => {
    setCheckoutKey((k) => k + 1);
    setPaymentOpen(true);
  };

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

  const resetSlot = () => {
    setSelectedSlot(null);
    setHoldBookingId(null);
    setHoldExpiresAt(null);
    setPaymentOpen(false);
    setCouponCode("");
    setCouponMsg({ text: "", ok: false });
  };

  // ── Loading / error ─────────────────────────────────────────────────────────

  if (gameLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
      </div>
    );
  }

  if (gameError || !game) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center bg-black px-4 text-center">
        <Gamepad2 className="mb-4 h-12 w-12 text-white/20" />
        <p className="text-sm text-white/50">{gameError || "Game not found"}</p>
        <a
          href="/"
          className="mt-4 text-xs uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white"
        >
          ← Back Home
        </a>
      </div>
    );
  }

  const images = parseImages(game.image_urls);

  // Enrich slots with _expired flag for today's date
  const enrichedSlots =
    availability?.slots?.map((slot) => ({
      ...slot,
      _expired: isSlotExpired(slot, selectedDate),
    })) ?? [];

  // ── Render ──────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <GameHero game={game} images={images} activeImg={activeImg} />

      {/* Body */}
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-1">
          {/* Game info */}
          <GameDetails
            game={game}
            images={images}
            activeImg={activeImg}
            onImgChange={setActiveImg}
          />

          {/* Booking sections in simple layout */}
          <div className="space-y-8">
            <BookingPanel
              game={game}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              availability={availability}
              slotsLoading={slotsLoading}
              enrichedSlots={enrichedSlots}
              selectedSlot={selectedSlot}
              holding={holding}
              holdError={holdError}
              holdBookingId={holdBookingId}
              holdCountdown={holdCountdown}
              couponCode={couponCode}
              couponMsg={couponMsg}
              authStatus={authStatus}
              onSlotSelect={handleSlotSelect}
              onCouponChange={(val) => {
                setCouponCode(val);
                setCouponMsg({ text: "", ok: false });
              }}
              onCouponApply={validateCoupon}
              onOpenPayment={handleOpenPayment}
              onResetSlot={resetSlot}
            />
          </div>
        </div>

        {/* Other games */}
        <OtherGamesSection games={otherGames} />
      </div>

      {/* Payment modal */}
      <PaymentModal
        open={paymentOpen}
        onOpenChange={setPaymentOpen}
        stripePromise={stripePromise}
        fetchClientSecret={fetchClientSecret}
        checkoutKey={checkoutKey}
      />
    </div>
  );
}
