"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ShoppingBag } from "lucide-react";

const STATUS_STYLES = {
  confirmed: "bg-green-500/15 text-green-400 border border-green-500/20",
  completed: "bg-blue-500/15 text-blue-400 border border-blue-500/20",
  pending: "bg-yellow-500/15 text-yellow-400 border border-yellow-500/20",
  cancelled: "bg-red-500/15 text-red-400 border border-red-500/20",
};

function BookingRow({ booking }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left hover:bg-white/5 transition"
      >
        <div className="flex items-center gap-4 min-w-0">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pink-600/20 text-pink-400">
            <ShoppingBag className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-white">{booking.game_title}</p>
            <p className="text-xs text-white/50">{booking.date_booked}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${STATUS_STYLES[booking.status] ?? ""}`}>
            {booking.status}
          </span>
          {expanded
            ? <ChevronUp className="h-4 w-4 text-white/40" />
            : <ChevronDown className="h-4 w-4 text-white/40" />}
        </div>
      </button>

      {expanded && (
        <div className="border-t border-white/10 px-5 py-4 grid gap-3 sm:grid-cols-2 text-sm">
          <Detail label="Date" value={booking.date_booked} />
          <Detail label="Time" value={`${booking.start_time} — ${booking.end_time}`} />
          <Detail label="Status" value={booking.status} />
          <Detail label="Booked On" value={booking.created_at?.slice(0, 10)} />
          {booking.payment_intent_id && (
            <Detail label="Payment Ref" value={booking.payment_intent_id} mono />
          )}
        </div>
      )}
    </div>
  );
}

function Detail({ label, value, mono }) {
  return (
    <div>
      <p className="text-[11px] uppercase tracking-[0.15em] text-white/40">{label}</p>
      <p className={`mt-0.5 text-sm text-white/80 ${mono ? "font-mono text-[11px]" : ""}`}>{value ?? "—"}</p>
    </div>
  );
}

export default function PurchaseHistory({ bookings }) {
  if (!bookings?.length) {
    return (
      <div className="flex flex-col items-center gap-3 py-16 text-center">
        <ShoppingBag className="h-10 w-10 text-white/20" />
        <p className="text-sm text-white/40">No purchases yet</p>
        <a
          href="/booking"
          className="mt-2 rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.15em] text-white/70 hover:border-white/40 transition"
        >
          Book a Game
        </a>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {bookings.map((b) => (
        <BookingRow key={b.id} booking={b} />
      ))}
    </div>
  );
}
