"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Plus, CalendarDays } from "lucide-react";
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

  // Load games for filter tabs
  useEffect(() => {
    fetch("/api/games")
      .then((r) => r.json())
      .then((d) => setGames(d.data || []));
  }, []);

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
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:col-span-2">
          {/* Calendar header */}
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {MONTHS[month - 1]} {year}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setShowAddModal(true); }}
                className="flex items-center gap-1.5 rounded-lg bg-brand-500 px-3 py-1.5 text-sm font-medium text-white hover:bg-brand-600"
              >
                <Plus className="h-4 w-4" /> Add Booking
              </button>
              <button
                onClick={prevMonth}
                className="rounded-lg border border-gray-300 p-1.5 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <ChevronLeft className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={nextMonth}
                className="rounded-lg border border-gray-300 p-1.5 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <ChevronRight className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Day-of-week headers */}
          <div className="mb-2 grid grid-cols-7">
            {DAYS.map((d) => (
              <div
                key={d}
                className="py-2 text-center text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
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
                        : "hover:bg-gray-50 dark:hover:bg-white/[0.03]"
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
          <div className="mt-4 flex flex-wrap gap-4 border-t border-gray-100 pt-4 dark:border-gray-800">
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
          <div className="flex items-center justify-center rounded-2xl border border-dashed border-gray-300 p-8 text-center dark:border-gray-700">
            <div>
              <CalendarDays className="mx-auto mb-3 h-10 w-10 text-gray-300 dark:text-gray-600" />
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
