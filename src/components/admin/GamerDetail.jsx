"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Star, Clock, Gamepad2, Trophy, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react";

const STATUS_STYLES = {
  confirmed: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  completed: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  pending: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

const TX_STYLES = {
  purchase: "bg-purple-100 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  points_earned: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
};

function StatCard({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 dark:bg-brand-500/10">
        <Icon className="h-5 w-5 text-brand-500" />
      </div>
      <div>
        <p className="text-lg font-semibold text-gray-800 dark:text-white/90">{value}</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      </div>
    </div>
  );
}

function BookingRow({ booking }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <button
        type="button"
        onClick={() => setExpanded((p) => !p)}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          <ShoppingBag className="h-4 w-4 shrink-0 text-gray-400" />
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-gray-800 dark:text-white/90">{booking.game_title}</p>
            <p className="text-xs text-gray-400">{booking.date_booked} · {booking.start_time}–{booking.end_time}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${STATUS_STYLES[booking.status] ?? ""}`}>
            {booking.status}
          </span>
          {expanded ? <ChevronUp className="h-3.5 w-3.5 text-gray-400" /> : <ChevronDown className="h-3.5 w-3.5 text-gray-400" />}
        </div>
      </button>
      {expanded && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-3 grid gap-2 sm:grid-cols-3 text-sm">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-gray-400">Booked On</p>
            <p className="text-gray-700 dark:text-gray-200">{booking.created_at?.slice(0, 10)}</p>
          </div>
          {booking.payment_intent_id && (
            <div className="sm:col-span-2">
              <p className="text-[10px] uppercase tracking-wider text-gray-400">Payment Ref</p>
              <p className="font-mono text-[11px] text-gray-600 dark:text-gray-300 break-all">{booking.payment_intent_id}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function GamerDetail({ id }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("bookings");

  useEffect(() => {
    fetch(`/api/admin/gamers/${id}`)
      .then((r) => r.json())
      .then((d) => setData(d.data ?? null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-brand-500" />
      </div>
    );
  }

  if (!data) {
    return <p className="text-sm text-red-500">Gamer not found.</p>;
  }

  return (
    <div>
      <a
        href="/admin/gamers"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-500 transition"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Gamers
      </a>

      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-100 text-2xl font-bold text-brand-600 dark:bg-brand-500/10">
          {data.name?.charAt(0)?.toUpperCase() ?? "?"}
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">{data.name}</h2>
          <p className="text-sm text-gray-500">{data.email}</p>
          <div className="mt-1 flex flex-wrap gap-2">
            {data.phone && <span className="text-xs text-gray-400">{data.phone}</span>}
            {data.tag_name && <span className="text-xs font-medium text-brand-500">#{data.tag_name}</span>}
            <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] capitalize text-gray-600 dark:bg-gray-800 dark:text-gray-300">
              {data.role}
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={Star} label="Total Points" value={data.points} />
        <StatCard icon={Clock} label="Hours Played" value={`${data.total_hours_played}h`} />
        <StatCard icon={Gamepad2} label="Games Booked" value={data.total_booked} />
        <StatCard icon={Trophy} label="Completed" value={data.total_completed} />
      </div>

      {/* Tabs */}
      <div className="mb-4 flex gap-1 rounded-xl border border-gray-200 bg-gray-50 p-1 dark:border-gray-800 dark:bg-white/[0.03]">
        {["bookings", "transactions"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 rounded-lg px-4 py-2 text-xs font-medium uppercase tracking-wider transition ${
              tab === t
                ? "bg-white text-brand-600 shadow-sm dark:bg-gray-900 dark:text-brand-400"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400"
            }`}
          >
            {t === "bookings" ? "Bookings" : "Transactions"}
          </button>
        ))}
      </div>

      {tab === "bookings" && (
        <div className="space-y-2">
          {data.bookings?.length === 0 ? (
            <p className="py-8 text-center text-sm text-gray-400">No bookings</p>
          ) : (
            data.bookings?.map((b) => <BookingRow key={b.id} booking={b} />)
          )}
        </div>
      )}

      {tab === "transactions" && (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Type", "Description", "Amount", "Points", "Date"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {data.transactions?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-sm text-gray-400">
                    No transactions
                  </td>
                </tr>
              ) : (
                data.transactions?.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-medium capitalize ${TX_STYLES[t.type] ?? ""}`}>
                        {t.type.replace("_", " ")}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">{t.description ?? "—"}</td>
                    <td className="px-4 py-3 text-gray-700 dark:text-gray-200">
                      {t.amount_cents > 0 ? `$${(t.amount_cents / 100).toFixed(2)}` : "—"}
                    </td>
                    <td className="px-4 py-3 font-medium text-green-600 dark:text-green-400">
                      {t.points > 0 ? `+${t.points}` : "—"}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                      {t.created_at?.slice(0, 10)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
