"use client";

import { Tag, CheckCircle2 } from "lucide-react";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

function formatDate(ymd) {
  const [y, m, d] = ymd.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  return `${DAYS[date.getDay()]}, ${d} ${MONTHS[m - 1]} ${y}`;
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between px-5 py-3.5">
      <span className="text-[10px] uppercase tracking-[0.2em] text-white/40">
        {label}
      </span>
      <span className="text-sm font-medium text-white">{value}</span>
    </div>
  );
}

export function BookingSummaryCard({
  game,
  selectedDate,
  selectedSlot,
  couponCode,
  couponMsg,
  onCouponChange,
  onCouponApply,
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
      {/* Summary rows */}
      <div className="divide-y divide-white/8">
        <Row label="Game" value={game.title} />
        <Row label="Date" value={formatDate(selectedDate)} />
        <Row
          label="Time"
          value={`${selectedSlot.start_time} – ${selectedSlot.end_time}`}
        />
        <Row label="Duration" value={`${game.duration_minutes} min`} />
      </div>

      {/* Coupon section */}
      <div className="border-t border-white/10 px-5 py-4 space-y-2">
        <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.22em] text-white/40">
          <Tag className="h-3 w-3" />
          Coupon Code
          <span className="normal-case tracking-normal text-white/25">
            (optional)
          </span>
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => onCouponChange(e.target.value.toUpperCase())}
            placeholder="ENTER CODE"
            className={[
              "h-10 flex-1 rounded-xl border bg-transparent px-3",
              "font-mono text-sm uppercase text-white",
              "placeholder:text-white/20",
              "transition-colors focus:outline-none",
              couponMsg.ok
                ? "border-emerald-500/40 focus:border-emerald-400/60"
                : "border-white/15 focus:border-white/35",
            ].join(" ")}
          />
          <button
            onClick={onCouponApply}
            disabled={!couponCode.trim()}
            className="rounded-xl border border-white/15 px-4 text-xs uppercase tracking-[0.15em] text-white/60 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white disabled:opacity-25"
          >
            Apply
          </button>
        </div>

        {couponMsg.text && (
          <p
            className={`flex items-center gap-1.5 text-xs ${
              couponMsg.ok ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {couponMsg.ok && <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />}
            {couponMsg.text}
          </p>
        )}
      </div>
    </div>
  );
}
