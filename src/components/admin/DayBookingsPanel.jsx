"use client";

import { X, BanIcon, CheckCircle2, Clock, CreditCard } from "lucide-react";

const STATUS_CLASSES = {
  confirmed: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  completed: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

/** pending + has payment_intent_id = paid but awaiting admin approval */
function isPaidPending(b) {
  return b.status === "pending" && !!b.payment_intent_id;
}

function statusLabel(b) {
  if (isPaidPending(b)) return "Awaiting Approval";
  if (b.status === "pending") return "On Hold";
  return b.status.charAt(0).toUpperCase() + b.status.slice(1);
}

function statusClass(b) {
  if (isPaidPending(b))
    return "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400";
  return STATUS_CLASSES[b.status] ?? "";
}

export default function DayBookingsPanel({
  date,
  bookings,
  loading,
  isLeave,
  onToggleLeave,
  onUpdateStatus,
  onClose,
}) {
  const formatted = date
    ? new Date(date + "T00:00:00").toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3">
      {/* Header */}
      <div className="mb-4 flex items-start justify-between gap-2">
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400">Selected</p>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
            {formatted}
          </h3>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          <X className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      {/* Leave day toggle */}
      <button
        onClick={onToggleLeave}
        className={`mb-4 flex w-full items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
          isLeave
            ? "border-red-300 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-400"
            : "border-gray-300 bg-gray-50 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:bg-transparent dark:text-gray-300"
        }`}
      >
        <BanIcon className="h-4 w-4" />
        {isLeave ? "Remove Shop Closure" : "Mark as Shop Closed"}
      </button>

      {/* Bookings list */}
      <div className="space-y-3">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-brand-500 border-t-transparent" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center py-8 text-center">
            <Clock className="mb-2 h-8 w-8 text-gray-300 dark:text-gray-600" />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              No bookings for this day
            </p>
          </div>
        ) : (
          bookings.map((b) => (
            <div
              key={b.id}
              className="rounded-xl border border-gray-100 p-3 dark:border-gray-800"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-800 dark:text-white/90">
                    {b.game_title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {b.start_time} – {b.end_time}
                  </p>
                  <p className="mt-1 text-xs text-gray-600 dark:text-gray-300">
                    {b.user_name}{" "}
                    <span className="text-gray-400">({b.user_email})</span>
                  </p>
                  {isPaidPending(b) && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-orange-600 dark:text-orange-400">
                      <CreditCard className="h-3 w-3" /> Payment received
                    </p>
                  )}
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusClass(b)}`}
                >
                  {statusLabel(b)}
                </span>
              </div>

              {/* Action buttons */}
              {b.status !== "completed" && b.status !== "cancelled" && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {b.status === "pending" && (
                    <button
                      onClick={() => onUpdateStatus(b.id, "confirmed")}
                      className="flex items-center gap-1 rounded-lg bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-200 dark:bg-green-500/10 dark:text-green-400"
                    >
                      <CheckCircle2 className="h-3 w-3" /> Approve
                    </button>
                  )}
                  {b.status === "confirmed" && (
                    <button
                      onClick={() => onUpdateStatus(b.id, "completed")}
                      className="flex items-center gap-1 rounded-lg bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-700 hover:bg-blue-200 dark:bg-blue-500/10 dark:text-blue-400"
                    >
                      <CheckCircle2 className="h-3 w-3" /> Mark Complete
                    </button>
                  )}
                  <button
                    onClick={() => onUpdateStatus(b.id, "cancelled")}
                    className="flex items-center gap-1 rounded-lg bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-200 dark:bg-red-500/10 dark:text-red-400"
                  >
                    <BanIcon className="h-3 w-3" /> Cancel
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
