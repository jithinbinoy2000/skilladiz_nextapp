"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus, CalendarDays, Zap, Clock, CheckCircle2, BanIcon } from "lucide-react";
import DayBookingsPanel from "./DayBookingsPanel";
import AddBookingModal from "./AddBookingModal";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

export default function BookingCalendar() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); // 1-indexed
  const [bookingCounts, setBookingCounts] = useState({});
  const [leaveMap, setLeaveMap] = useState({}); // { 'YYYY-MM-DD': leaveId }
  const [selectedDate, setSelectedDate] = useState(null);
  const [dayBookings, setDayBookings] = useState([]);
  const [loadingDay, setLoadingDay] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [gameFilter, setGameFilter] = useState("all");
  const [games, setGames] = useState([]);
  const [autoApprove, setAutoApprove] = useState(false);
  const [autoApproveLoading, setAutoApproveLoading] = useState(false);
  const [pendingApprovals, setPendingApprovals] = useState([]);
  const [pendingLoading, setPendingLoading] = useState(false);

  // Load games for filter tabs
  useEffect(() => {
    fetch("/api/games")
      .then((r) => r.json())
      .then((d) => setGames(d.data || []));
  }, []);

  // Load auto-approve setting
  useEffect(() => {
    fetch("/api/admin/settings/bookings")
      .then((r) => r.json())
      .then((d) => { if (d.data) setAutoApprove(d.data.auto_approve ?? false); })
      .catch(() => {});
  }, []);

  // Load pending approvals (paid bookings awaiting admin approval)
  const fetchPendingApprovals = useCallback(async () => {
    setPendingLoading(true);
    try {
      const res = await fetch("/api/bookings?status=pending");
      const data = await res.json();
      // Only show bookings that have been paid (have payment_intent_id)
      const paid = (data.data || []).filter((b) => b.payment_intent_id);
      setPendingApprovals(paid);
    } catch {
      // ignore
    } finally {
      setPendingLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPendingApprovals();
  }, [fetchPendingApprovals]);

  const toggleAutoApprove = async () => {
    const next = !autoApprove;
    setAutoApproveLoading(true);
    try {
      const res = await fetch("/api/admin/settings/bookings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ auto_approve: next }),
      });
      const data = await res.json();
      if (data.data) setAutoApprove(data.data.auto_approve);
    } finally {
      setAutoApproveLoading(false);
    }
  };

  const approvePendingBooking = async (bookingId) => {
    await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "confirmed" }),
    });
    fetchPendingApprovals();
    if (selectedDate) selectDay(selectedDate);
  };

  const cancelPendingBooking = async (bookingId) => {
    await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "cancelled" }),
    });
    fetchPendingApprovals();
    if (selectedDate) selectDay(selectedDate);
  };

  const fetchMonthData = useCallback(async (y, m) => {
    const [countsRes, leavesRes] = await Promise.all([
      fetch(`/api/admin/bookings/monthly-counts?year=${y}&month=${m}`),
      fetch("/api/shop-leaves"),
    ]);
    const countsData = await countsRes.json();
    const leavesData = await leavesRes.json();

    setBookingCounts(countsData.data || {});

    const map = {};
    for (const l of leavesData.data || []) {
      map[l.leave_date] = l.id;
    }
    setLeaveMap(map);
  }, []);

  useEffect(() => {
    fetchMonthData(year, month);
  }, [year, month, fetchMonthData]);

  const prevMonth = () => {
    if (month === 1) { setYear((y) => y - 1); setMonth(12); }
    else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 12) { setYear((y) => y + 1); setMonth(1); }
    else setMonth((m) => m + 1);
  };

  const selectDay = async (dateStr) => {
    setSelectedDate(dateStr);
    setLoadingDay(true);
    try {
      let url = `/api/admin/bookings/by-date?date=${dateStr}`;
      const res = await fetch(url);
      const data = await res.json();
      let bookings = data.data || [];
      if (gameFilter !== "all") {
        bookings = bookings.filter((b) => b.game_id === gameFilter);
      }
      setDayBookings(bookings);
    } finally {
      setLoadingDay(false);
    }
  };

  const toggleLeave = async (dateStr) => {
    const existingId = leaveMap[dateStr];
    if (existingId) {
      await fetch(`/api/shop-leaves/${existingId}`, { method: "DELETE" });
      setLeaveMap((prev) => {
        const n = { ...prev };
        delete n[dateStr];
        return n;
      });
    } else {
      const res = await fetch("/api/shop-leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ leave_date: dateStr, reason: "Shop closed" }),
      });
      const data = await res.json();
      if (data.data?.id) {
        setLeaveMap((prev) => ({ ...prev, [dateStr]: data.data.id }));
      }
    }
  };

  const updateStatus = async (bookingId, status) => {
    await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    if (selectedDate) selectDay(selectedDate);
    fetchPendingApprovals();
  };

  // Build the calendar grid
  const getCalendarDays = () => {
    const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
    const daysInMonth = new Date(year, month, 0).getDate();
    const cells = [];

    for (let i = 0; i < firstDayOfWeek; i++) {
      cells.push({ day: null, date: null });
    }
    for (let d = 1; d <= daysInMonth; d++) {
      const mm = String(month).padStart(2, "0");
      const dd = String(d).padStart(2, "0");
      cells.push({ day: d, date: `${year}-${mm}-${dd}` });
    }
    // Pad to full weeks
    while (cells.length % 7 !== 0) cells.push({ day: null, date: null });
    return cells;
  };

  const cells = getCalendarDays();
  const todayStr = today.toISOString().slice(0, 10);

  return (
    <div className="space-y-5">
      {/* Auto-approve toggle */}
      <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/3">
        <div>
          <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
            Auto-Approve Bookings
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {autoApprove
              ? "Bookings are confirmed immediately after payment."
              : "Bookings stay pending after payment — you must manually approve each one."}
          </p>
        </div>
        <button
          onClick={toggleAutoApprove}
          disabled={autoApproveLoading}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none disabled:opacity-50 ${
            autoApprove ? "bg-brand-500" : "bg-gray-200 dark:bg-gray-700"
          }`}
          role="switch"
          aria-checked={autoApprove}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ${
              autoApprove ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      {/* Pending Approvals panel */}
      {/* {!autoApprove && (
        <div className="p-4 border border-orange-200 rounded-2xl bg-orange-50 dark:border-orange-500/20 dark:bg-orange-500/5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-600 dark:text-orange-400" />
              <p className="text-sm font-semibold text-orange-800 dark:text-orange-300">
                Awaiting Approval
                {pendingApprovals.length > 0 && (
                  <span className="ml-2 rounded-full bg-orange-500 px-2 py-0.5 text-xs text-white">
                    {pendingApprovals.length}
                  </span>
                )}
              </p>
            </div>
          </div>
          {pendingLoading ? (
            <div className="flex items-center gap-2 py-2 text-xs text-orange-600 dark:text-orange-400">
              <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-orange-500 border-t-transparent" />
              Loading…
            </div>
          ) : pendingApprovals.length === 0 ? (
            <p className="text-xs text-orange-600/70 dark:text-orange-400/70">
              No bookings awaiting approval.
            </p>
          ) : (
            <div className="space-y-2">
              {pendingApprovals.map((b) => (
                <div
                  key={b.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-orange-200 bg-white px-3 py-2.5 dark:border-orange-500/20 dark:bg-white/3"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate dark:text-white/90">
                      {b.game_title ?? "Booking"}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {b.date_booked} · {b.user_name ?? b.user_email ?? b.user_id}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1.5">
                    <button
                      onClick={() => approvePendingBooking(b.id)}
                      className="flex items-center gap-1 rounded-lg bg-green-100 px-2.5 py-1 text-xs font-medium text-green-700 hover:bg-green-200 dark:bg-green-500/10 dark:text-green-400"
                    >
                      <CheckCircle2 className="w-3 h-3" /> Approve
                    </button>
                    <button
                      onClick={() => cancelPendingBooking(b.id)}
                      className="flex items-center gap-1 rounded-lg bg-red-100 px-2.5 py-1 text-xs font-medium text-red-700 hover:bg-red-200 dark:bg-red-500/10 dark:text-red-400"
                    >
                      <BanIcon className="w-3 h-3" /> Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )} */}

      {/* Game filter tabs */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setGameFilter("all")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            gameFilter === "all"
              ? "bg-brand-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
          }`}
        >
          All Games
        </button>
        {games.map((g) => (
          <button
            key={g.id}
            onClick={() => setGameFilter(g.id)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              gameFilter === g.id
                ? "bg-brand-500 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            }`}
          >
            {g.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* ── Calendar ── */}
        <div className="p-5 bg-white border border-gray-200 rounded-2xl dark:border-gray-800 dark:bg-white/3 lg:col-span-2">
          {/* Calendar header */}
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {MONTHS[month - 1]} {year}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setShowAddModal(true); }}
                className="flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-600"
              >
                <Plus className="w-4 h-4" /> Add Booking
              </button>
              <button
                onClick={prevMonth}
                className="rounded-lg border border-gray-300 p-1.5 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={nextMonth}
                className="rounded-lg border border-gray-300 p-1.5 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Day-of-week headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div
                key={d}
                className="py-2 text-xs font-medium text-center text-gray-500 uppercase dark:text-gray-400"
              >
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((cell, i) => {
              if (!cell.date) {
                return <div key={`empty-${i}`} className="h-14" />;
              }
              const isLeave = cell.date in leaveMap;
              const isToday = cell.date === todayStr;
              const isSelected = cell.date === selectedDate;
              const count = bookingCounts[cell.date] || 0;

              return (
                <button
                  key={cell.date}
                  onClick={() => selectDay(cell.date)}
                  className={`flex h-14 flex-col items-center justify-start rounded-xl p-1.5 text-sm transition-all focus:outline-none
                    ${isSelected ? "ring-2 ring-brand-500 ring-offset-1" : ""}
                    ${
                      isLeave
                        ? "bg-red-50 dark:bg-red-500/10"
                        : "hover:bg-gray-50 dark:hover:bg-white/3"
                    }
                  `}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-medium
                      ${isToday ? "bg-brand-500 text-white" : isLeave ? "text-red-600 dark:text-red-400" : "text-gray-700 dark:text-gray-200"}
                    `}
                  >
                    {cell.day}
                  </span>
                  {count > 0 && (
                    <span className="mt-0.5 rounded-full bg-brand-100 px-1.5 py-0 text-xs font-medium text-brand-700 dark:bg-brand-500/20 dark:text-brand-400">
                      {count}
                    </span>
                  )}
                  {isLeave && count === 0 && (
                    <span className="mt-0.5 text-xs text-red-400">closed</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-4 pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
            {[
              { color: "bg-brand-500", label: "Today" },
              { color: "bg-brand-100 dark:bg-brand-500/20", label: "Has Bookings" },
              { color: "bg-red-100 dark:bg-red-500/10", label: "Shop Closed" },
            ].map(({ color, label }) => (
              <span key={label} className="flex items-center gap-1.5 text-xs text-gray-500 dark:text-gray-400">
                <span className={`h-3 w-3 rounded ${color}`} />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* ── Day panel ── */}
        {selectedDate ? (
          <DayBookingsPanel
            date={selectedDate}
            bookings={dayBookings}
            loading={loadingDay}
            isLeave={selectedDate in leaveMap}
            onToggleLeave={() => toggleLeave(selectedDate)}
            onUpdateStatus={updateStatus}
            onClose={() => setSelectedDate(null)}
          />
        ) : (
          <div className="flex items-center justify-center p-8 text-center border border-gray-300 border-dashed rounded-2xl dark:border-gray-700">
            <div>
              <CalendarDays className="w-10 h-10 mx-auto mb-3 text-gray-300 dark:text-gray-600" />
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                Click any date to view bookings
              </p>
              <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                You can also mark dates as shop closed
              </p>
            </div>
          </div>
        )}
      </div>

      {showAddModal && (
        <AddBookingModal
          onClose={() => setShowAddModal(false)}
          onCreated={() => {
            setShowAddModal(false);
            fetchMonthData(year, month);
            if (selectedDate) selectDay(selectedDate);
          }}
        />
      )}
    </div>
  );
}
