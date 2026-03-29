"use client";

import { useState, useEffect } from "react";
import AdminMetrics from "@/components/admin/AdminMetrics";
import BookingsWeekChart from "@/components/admin/BookingsWeekChart";
import RecentBookingsTable from "@/components/admin/RecentBookingsTable";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/analytics")
      .then((r) => r.json())
      .then((d) => setData(d.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">Dashboard</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Welcome back — here's what's happening at Skilladiz
        </p>
      </div>

      {/* Stats */}
      <AdminMetrics stats={data?.stats} loading={loading} />

      {/* Chart + recent bookings */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-2">
          <BookingsWeekChart chartData={data?.chart} loading={loading} />
        </div>
        <div className="xl:col-span-3">
          <RecentBookingsTable bookings={data?.recent_bookings} loading={loading} />
        </div>
      </div>
    </div>
  );
}
