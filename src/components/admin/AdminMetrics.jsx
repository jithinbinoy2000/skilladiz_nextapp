"use client";

import { CalendarCheck, Users, DollarSign, Gamepad2, TrendingUp } from "lucide-react";

const CARDS = [
  {
    key: "total_bookings",
    label: "Total Bookings",
    icon: CalendarCheck,
    color: "bg-blue-100 dark:bg-blue-500/10",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  {
    key: "confirmed_bookings",
    label: "Confirmed Bookings",
    icon: TrendingUp,
    color: "bg-green-100 dark:bg-green-500/10",
    iconColor: "text-green-600 dark:text-green-400",
  },
  {
    key: "active_members",
    label: "Active Members",
    icon: Users,
    color: "bg-purple-100 dark:bg-purple-500/10",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  {
    key: "total_gamers",
    label: "Registered Gamers",
    icon: Gamepad2,
    color: "bg-orange-100 dark:bg-orange-500/10",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  {
    key: "total_revenue",
    label: "Membership Revenue",
    icon: DollarSign,
    color: "bg-emerald-100 dark:bg-emerald-500/10",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    prefix: "$",
  },
];

export default function AdminMetrics({ stats, loading }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5 md:gap-5">
      {CARDS.map(({ key, label, icon: Icon, color, iconColor, prefix }) => (
        <div
          key={key}
          className="rounded-2xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-white/[0.03] md:p-5"
        >
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}
          >
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
          <div className="mt-4">
            <span className="block text-xs text-gray-500 dark:text-gray-400">
              {label}
            </span>
            {loading ? (
              <div className="mt-2 h-7 w-20 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
            ) : (
              <span className="mt-1 block text-2xl font-bold text-gray-800 dark:text-white/90">
                {prefix}
                {stats?.[key]?.toLocaleString() ?? "—"}
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
