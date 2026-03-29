"use client";

import { useState, useEffect, useCallback } from "react";
import { Download, RefreshCw, Users, UserCheck, UserX } from "lucide-react";

const STATUS_CLASSES = {
  active: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  expired: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
  cancelled: "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400",
};

function RenewModal({ gamer, onClose, onRenewed }) {
  const [dueDate, setDueDate] = useState(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() + 1);
    return d.toISOString().slice(0, 10);
  });
  const [planName, setPlanName] = useState("Pro Member");
  const [amountPaid, setAmountPaid] = useState("39");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRenew = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/memberships", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: gamer.id,
          due_date: dueDate,
          plan_name: planName,
          amount_paid: Number(amountPaid),
          status: "active",
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to renew"); return; }
      onRenewed?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="mb-1 text-lg font-semibold text-gray-800 dark:text-white/90">
          Renew Membership
        </h2>
        <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{gamer.name} ({gamer.email})</p>

        <div className="space-y-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Plan</label>
            <input value={planName} onChange={(e) => setPlanName(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Due Date</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400">Amount Paid ($)</label>
            <input type="number" min={0} step={0.01} value={amountPaid} onChange={(e) => setAmountPaid(e.target.value)}
              className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90" />
          </div>
        </div>

        {error && <p className="mt-3 rounded bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

        <div className="mt-4 flex gap-3">
          <button onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300">
            Cancel
          </button>
          <button onClick={handleRenew} disabled={loading}
            className="flex-1 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60">
            {loading ? "Renewing…" : "Renew"}
          </button>
        </div>
      </div>
    </div>
  );
}

function exportCSV(gamers) {
  const headers = ["Name", "Email", "Role", "Bookings", "Total Spent ($)", "Membership", "Due Date", "Last Booking", "Joined"];
  const rows = gamers.map((g) => [
    g.name,
    g.email,
    g.role,
    g.booking_count,
    Number(g.total_spent).toFixed(2),
    g.membership?.status ?? "None",
    g.membership?.due_date ?? "-",
    g.last_booking_date ?? "-",
    g.created_at?.slice(0, 10) ?? "-",
  ]);

  const escape = (v) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = [headers, ...rows].map((r) => r.map(escape).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `gamers-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export default function GamersDirectory() {
  const [gamers, setGamers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [renewGamer, setRenewGamer] = useState(null);

  const loadGamers = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/gamers");
    const data = await res.json();
    setGamers(data.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadGamers(); }, [loadGamers]);

  const filtered = gamers.filter(
    (g) =>
      g.name?.toLowerCase().includes(search.toLowerCase()) ||
      g.email?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Gamers Directory</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {gamers.length} registered gamers
          </p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="search"
            placeholder="Search by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-56 rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
          />
          <button onClick={loadGamers}
            className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800">
            <RefreshCw className="h-4 w-4 text-gray-500" />
          </button>
          <button
            onClick={() => exportCSV(filtered)}
            disabled={filtered.length === 0}
            className="flex items-center gap-2 rounded-lg bg-gray-800 px-3 py-2 text-sm font-medium text-white hover:bg-gray-700 disabled:opacity-50 dark:bg-gray-700"
          >
            <Download className="h-4 w-4" /> Export CSV
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Gamer", "Bookings", "Total Spent", "Membership", "Due Date", "Last Booking", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>{Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                    </td>
                  ))}</tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <Users className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                    <p className="text-sm text-gray-400">No gamers found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((g) => (
                  <tr key={g.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-brand-600 dark:bg-brand-500/10">
                          {g.name?.charAt(0)?.toUpperCase() ?? "?"}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white/90">{g.name}</p>
                          <p className="text-xs text-gray-400">{g.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-700 dark:text-gray-200">{g.booking_count}</td>
                    <td className="px-5 py-4 font-medium text-gray-800 dark:text-white/90">
                      ${Number(g.total_spent).toFixed(2)}
                    </td>
                    <td className="px-5 py-4">
                      {g.membership ? (
                        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_CLASSES[g.membership.status] ?? ""}`}>
                          {g.membership.status}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-400">None</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {g.membership?.due_date ?? "—"}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">
                      {g.last_booking_date ?? "—"}
                    </td>
                    <td className="px-5 py-4">
                      <button
                        onClick={() => setRenewGamer(g)}
                        className="flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400"
                      >
                        <UserCheck className="h-3.5 w-3.5" /> Renew
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {renewGamer && (
        <RenewModal
          gamer={renewGamer}
          onClose={() => setRenewGamer(null)}
          onRenewed={() => { setRenewGamer(null); loadGamers(); }}
        />
      )}
    </div>
  );
}
