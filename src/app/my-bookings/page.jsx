"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  CalendarDays,
  Clock,
  CheckCircle2,
  XCircle,
  Hourglass,
  Trophy,
  CreditCard,
} from "lucide-react";

const STATUS_CONFIG = {
  pending: {
    label: "Awaiting Approval",
    labelShort: "Pending",
    icon: Hourglass,
    classes:
      "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-300 dark:border-orange-500/20",
    dot: "bg-orange-500",
    description: "Your payment was received. The admin will review and confirm your booking shortly.",
  },
  confirmed: {
    label: "Confirmed",
    labelShort: "Confirmed",
    icon: CheckCircle2,
    classes:
      "bg-green-100 text-green-700 border-green-200 dark:bg-green-500/10 dark:text-green-300 dark:border-green-500/20",
    dot: "bg-green-500",
    description: "Your booking is confirmed. See you at the arena!",
  },
  completed: {
    label: "Completed",
    labelShort: "Completed",
    icon: Trophy,
    classes:
      "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20",
    dot: "bg-blue-500",
    description: "This session has been completed.",
  },
  cancelled: {
    label: "Cancelled",
    labelShort: "Cancelled",
    icon: XCircle,
    classes:
      "bg-red-100 text-red-700 border-red-200 dark:bg-red-500/10 dark:text-red-300 dark:border-red-500/20",
    dot: "bg-red-500",
    description: "This booking was cancelled.",
  },
};

function StatusBadge({ booking }) {
  const isPaidPending =
    booking.status === "pending" && !!booking.payment_intent_id;

  const key = booking.status in STATUS_CONFIG ? booking.status : "pending";
  const cfg = STATUS_CONFIG[key];
  const Icon = cfg.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${cfg.classes}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {isPaidPending ? "Awaiting Approval" : cfg.label}
    </span>
  );
}

function BookingCard({ booking }) {
  const isPaidPending =
    booking.status === "pending" && !!booking.payment_intent_id;
  const isHold =
    booking.status === "pending" && !booking.payment_intent_id;

  // Don't show unpaid holds (they expire automatically)
  if (isHold) return null;

  const cfg = STATUS_CONFIG[booking.status] ?? STATUS_CONFIG.pending;

  let thumb = null;
  try {
    const imgs =
      typeof booking.image_urls === "string"
        ? JSON.parse(booking.image_urls)
        : booking.image_urls || [];
    thumb = imgs[0] ?? null;
  } catch {
    thumb = null;
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      <div className="flex gap-4 p-4 sm:p-5">
        {/* Thumbnail */}
        {thumb ? (
          <img
            src={thumb}
            alt={booking.game_title}
            className="h-20 w-24 shrink-0 rounded-xl object-cover sm:h-24 sm:w-28"
          />
        ) : (
          <div className="flex h-20 w-24 shrink-0 items-center justify-center rounded-xl bg-white/5 text-3xl sm:h-24 sm:w-28">
            🎮
          </div>
        )}

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-white">
              {booking.game_title}
            </h3>
            <StatusBadge booking={booking} />
          </div>

          <div className="space-y-1">
            <p className="flex items-center gap-2 text-xs text-white/50">
              <CalendarDays className="h-3.5 w-3.5" />
              {new Date(booking.date_booked + "T00:00:00").toLocaleDateString(
                "en-US",
                { weekday: "short", year: "numeric", month: "short", day: "numeric" }
              )}
            </p>
            <p className="flex items-center gap-2 text-xs text-white/50">
              <Clock className="h-3.5 w-3.5" />
              {booking.start_time} – {booking.end_time}
            </p>
            {booking.payment_intent_id && (
              <p className="flex items-center gap-2 text-xs text-white/30">
                <CreditCard className="h-3.5 w-3.5" />
                Payment received
              </p>
            )}
          </div>

          {/* Status description */}
          <p className={`mt-2 text-xs ${cfg.classes.includes("orange") ? "text-orange-400/80" : cfg.classes.includes("green") ? "text-green-400/80" : cfg.classes.includes("blue") ? "text-blue-400/80" : "text-red-400/80"}`}>
            {isPaidPending
              ? STATUS_CONFIG.pending.description
              : cfg.description}
          </p>
        </div>
      </div>
    </div>
  );
}

const FILTER_TABS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Awaiting Approval" },
  { key: "confirmed", label: "Confirmed" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
];

export default function MyBookingsPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  useEffect(() => {
    if (authStatus === "unauthenticated") {
      router.push("/auth?callbackUrl=/my-bookings");
    }
  }, [authStatus, router]);

  useEffect(() => {
    if (authStatus !== "authenticated") return;
    setLoading(true);
    fetch("/api/bookings/my")
      .then((r) => r.json())
      .then((d) => setBookings(d.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [authStatus]);

  // Exclude unpaid holds (pending with no payment_intent_id)
  const visibleBookings = bookings.filter((b) => {
    if (b.status === "pending" && !b.payment_intent_id) return false;
    if (activeFilter === "all") return true;
    return b.status === activeFilter;
  });

  if (authStatus === "loading") {
    return (
      <div className="main-wrapper bg-black">
        <Header />
        <main className="flex min-h-screen items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
        </main>
      </div>
    );
  }

  return (
    <div className="main-wrapper bg-black">
      <Header />
      <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        <div className="mb-8">
          <p className="mb-1 text-[10px] uppercase tracking-[0.4em] text-white/35">
            Your Account
          </p>
          <h1 className="font-display text-3xl uppercase tracking-[0.1em] text-white">
            My Bookings
          </h1>
        </div>

        {/* Filter tabs */}
        <div className="mb-6 flex flex-wrap gap-2">
          {FILTER_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              className={`rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-[0.1em] transition-colors ${
                activeFilter === tab.key
                  ? "bg-white text-black"
                  : "border border-white/15 text-white/50 hover:border-white/30 hover:text-white/80"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-white border-t-transparent" />
          </div>
        ) : visibleBookings.length === 0 ? (
          <div className="flex flex-col items-center py-20 text-center">
            <CalendarDays className="mb-4 h-12 w-12 text-white/15" />
            <p className="text-sm font-medium text-white/40">
              {activeFilter === "all"
                ? "You have no bookings yet."
                : `No ${activeFilter} bookings.`}
            </p>
            <a
              href="/booking"
              className="mt-5 rounded-full bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black hover:bg-white/90 transition-colors"
            >
              Book a Slot
            </a>
          </div>
        ) : (
          <div className="space-y-3">
            {visibleBookings.map((b) => (
              <BookingCard key={b.id} booking={b} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
