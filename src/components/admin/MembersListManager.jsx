"use client";

import { useState, useEffect, useCallback } from "react";
import { Users, Bell, RefreshCw, AlertTriangle, Zap, Tag, Plus, Minus } from "lucide-react";
import Toggle from "./Toggle";

const STATUS_CLASSES = {
  active:    "bg-success-50  text-success-600  dark:bg-success-500/10  dark:text-success-400",
  expired:   "bg-error-50    text-error-600    dark:bg-error-500/10    dark:text-error-400",
  cancelled: "bg-gray-100    text-gray-500     dark:bg-gray-800        dark:text-gray-400",
};

function daysUntil(dateStr) {
  if (!dateStr) return null;
  return Math.ceil((new Date(dateStr) - new Date()) / 86_400_000);
}

// ── Adjust Perks Modal ────────────────────────────────────────────────────────
function AdjustPerksModal({ gamer, onClose, onSaved }) {
  const [discountRate, setDiscountRate] = useState(
    String(gamer.personal_discount_rate ?? 0)
  );
  const [pointsAdj,   setPointsAdj]    = useState("");
  const [note,        setNote]         = useState("");
  const [saving,      setSaving]       = useState(false);
  const [error,       setError]        = useState("");

  const handleSave = async () => {
    setError("");
    const hasDiscount = discountRate !== "" && discountRate !== String(gamer.personal_discount_rate ?? 0);
    const hasPoints   = pointsAdj !== "" && Number(pointsAdj) !== 0;

    if (!hasDiscount && !hasPoints) {
      setError("No changes to save"); return;
    }

    setSaving(true);
    try {
      const body = {};
      if (hasDiscount) body.personal_discount_rate = Number(discountRate);
      if (hasPoints)   { body.points_adjustment = Number(pointsAdj); body.note = note || undefined; }

      const res  = await fetch(`/api/admin/gamers/${gamer.id}`, {
        method:  "PATCH",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to save"); return; }
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "h-10 w-full rounded-lg border border-gray-200 bg-transparent px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90";
  const labelCls = "mb-1 block text-xs font-medium text-gray-500 dark:text-gray-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl dark:bg-gray-900">

        {/* Header */}
        <div className="border-b border-gray-100 px-6 py-4 dark:border-gray-800">
          <h2 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Adjust Perks
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            {gamer.name} — {gamer.email}
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* Current points */}
          <div className="flex items-center gap-3 rounded-xl bg-gray-50 px-4 py-3 dark:bg-white/3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-500/10">
              <Zap className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-xs text-gray-400">Current Credit Points</p>
              <p className="text-lg font-bold text-gray-800 dark:text-white/90">
                {gamer.points ?? 0}
              </p>
            </div>
            {(gamer.personal_discount_rate ?? 0) > 0 && (
              <>
                <div className="ml-auto flex h-9 w-9 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10">
                  <Tag className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Personal Discount</p>
                  <p className="text-lg font-bold text-gray-800 dark:text-white/90">
                    {gamer.personal_discount_rate}%
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Personal discount */}
          <div>
            <label className={labelCls}>
              <Tag className="inline h-3.5 w-3.5 text-orange-500 mr-1" />
              Personal Discount Rate (%)
            </label>
            <div className="relative">
              <input
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={discountRate}
                onChange={(e) => setDiscountRate(e.target.value)}
                placeholder="0"
                className={`${inputCls} pr-8`}
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">%</span>
            </div>
            <p className="mt-1 text-xs text-gray-400">
              Applies on top of any plan discount. Set to 0 to remove.
            </p>
          </div>

          {/* Points adjustment */}
          <div>
            <label className={labelCls}>
              <Zap className="inline h-3.5 w-3.5 text-yellow-500 mr-1" />
              Credit Points Adjustment
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPointsAdj((v) => String(Math.abs(Number(v || 0))))}
                className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  Number(pointsAdj) > 0
                    ? "border-success-400 bg-success-50 text-success-600 dark:border-success-600 dark:bg-success-500/10 dark:text-success-400"
                    : "border-gray-200 text-gray-500 dark:border-gray-700"
                }`}
              >
                <Plus className="h-3.5 w-3.5" /> Award
              </button>
              <button
                type="button"
                onClick={() => setPointsAdj((v) => String(-Math.abs(Number(v || 0))))}
                className={`flex items-center gap-1 rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  Number(pointsAdj) < 0
                    ? "border-error-400 bg-error-50 text-error-600 dark:border-error-600 dark:bg-error-500/10 dark:text-error-400"
                    : "border-gray-200 text-gray-500 dark:border-gray-700"
                }`}
              >
                <Minus className="h-3.5 w-3.5" /> Deduct
              </button>
              <input
                type="number"
                value={pointsAdj}
                onChange={(e) => setPointsAdj(e.target.value)}
                placeholder="e.g. 50"
                className="h-10 flex-1 rounded-lg border border-gray-200 bg-transparent px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
              />
            </div>
            {pointsAdj !== "" && Number(pointsAdj) !== 0 && (
              <p className={`mt-1 text-xs font-medium ${
                Number(pointsAdj) > 0
                  ? "text-success-600 dark:text-success-400"
                  : "text-error-600 dark:text-error-400"
              }`}>
                New balance: {(gamer.points ?? 0) + Number(pointsAdj)} pts
              </p>
            )}
          </div>

          {/* Note */}
          {pointsAdj !== "" && Number(pointsAdj) !== 0 && (
            <div>
              <label className={labelCls}>Note / Reason (optional)</label>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="e.g. Tournament bonus, correction…"
                className={inputCls}
              />
            </div>
          )}
        </div>

        {error && (
          <div className="mx-6 mb-2">
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        <div className="flex gap-3 border-t border-gray-100 px-6 py-4 dark:border-gray-800">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Apply Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Notification Modal ────────────────────────────────────────────────────────
function NotifyModal({ gamer, onClose }) {
  const [msg,     setMsg]     = useState(
    "Your membership is expiring soon. Renew now to keep your benefits!"
  );
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    setSending(true);
    try {
      await fetch(`/api/admin/gamers/${gamer.id}/notify`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ message: msg }),
      });
    } catch {}
    setSending(false);
    onClose();
    alert("Notification sent.");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <h2 className="mb-1 text-base font-semibold text-gray-800 dark:text-white/90">
          Send Notification
        </h2>
        <p className="mb-4 text-xs text-gray-400">{gamer.name} — {gamer.email}</p>
        <textarea
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          rows={4}
          className="w-full rounded-lg border border-gray-200 bg-transparent px-3 py-2 text-sm text-gray-800 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90 resize-none"
        />
        <div className="mt-4 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            disabled={sending}
            className="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60"
          >
            {sending ? "Sending…" : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function MembersListManager() {
  const [gamers,       setGamers]       = useState([]);
  const [loading,      setLoading]      = useState(true);
  const [search,       setSearch]       = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [adjustGamer,  setAdjustGamer]  = useState(null);
  const [notifyGamer,  setNotifyGamer]  = useState(null);

  const loadMembers = useCallback(async () => {
    setLoading(true);
    const res  = await fetch("/api/admin/gamers");
    const data = await res.json();
    setGamers(data.data || []);
    setLoading(false);
  }, []);

  useEffect(() => { loadMembers(); }, [loadMembers]);

  const expiringCount = gamers.filter((g) => {
    const d = daysUntil(g.membership?.due_date);
    return g.membership?.status === "active" && d !== null && d <= 14;
  }).length;

  const filtered = gamers
    .filter((g) => {
      if (filterStatus === "active")   return g.membership?.status === "active";
      if (filterStatus === "expired")  return g.membership?.status === "expired";
      if (filterStatus === "none")     return !g.membership;
      if (filterStatus === "expiring") {
        const d = daysUntil(g.membership?.due_date);
        return g.membership?.status === "active" && d !== null && d <= 14;
      }
      return true;
    })
    .filter(
      (g) =>
        !search ||
        g.name?.toLowerCase().includes(search.toLowerCase()) ||
        g.email?.toLowerCase().includes(search.toLowerCase())
    );

  const FILTERS = [
    { key: "all",      label: "All" },
    { key: "active",   label: "Active" },
    { key: "expired",  label: "Expired" },
    { key: "none",     label: "No Plan" },
    { key: "expiring", label: "Expiring Soon" },
  ];

  return (
    <div>
      {/* Expiry alert */}
      {expiringCount > 0 && (
        <div className="mb-4 flex items-center gap-3 rounded-xl border border-warning-200 bg-warning-50 px-4 py-3 dark:border-warning-500/30 dark:bg-warning-500/10">
          <AlertTriangle className="h-5 w-5 shrink-0 text-warning-600 dark:text-warning-400" />
          <p className="text-sm text-warning-700 dark:text-warning-300">
            <strong>{expiringCount}</strong> member{expiringCount > 1 ? "s are" : " is"} expiring within 14 days.{" "}
            <button onClick={() => setFilterStatus("expiring")} className="underline">
              View them
            </button>
          </p>
        </div>
      )}

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-1.5">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilterStatus(key)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filterStatus === key
                  ? "bg-brand-500 text-white"
                  : "border border-gray-200 text-gray-600 hover:border-brand-400 hover:text-brand-500 dark:border-gray-700 dark:text-gray-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="search"
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 w-52 rounded-lg border border-gray-200 bg-transparent px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
          />
          <button
            onClick={loadMembers}
            className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <RefreshCw className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Member", "Membership", "Points", "Discount", "Status", "Expiry", "Actions"].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i}>
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-5 py-4">
                        <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <Users className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                    <p className="text-sm text-gray-400">No members in this filter</p>
                  </td>
                </tr>
              ) : (
                filtered.map((g) => {
                  const days         = daysUntil(g.membership?.due_date);
                  const isExpiring   = days !== null && days >= 0 && days <= 14;
                  const hasDiscount  = Number(g.personal_discount_rate ?? 0) > 0;

                  return (
                    <tr key={g.id} className="hover:bg-gray-50 dark:hover:bg-white/2">

                      {/* Member */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-50 text-sm font-semibold text-brand-600 dark:bg-brand-500/10 dark:text-brand-400">
                            {g.name?.charAt(0)?.toUpperCase() ?? "?"}
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-gray-800 dark:text-white/90 truncate">
                              {g.name}
                            </p>
                            <p className="text-xs text-gray-400 truncate">{g.email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Membership type */}
                      <td className="px-5 py-4 text-gray-700 dark:text-gray-200">
                        {g.membership?.plan_name || (
                          <span className="text-xs text-gray-400">No plan</span>
                        )}
                      </td>

                      {/* Points */}
                      <td className="px-5 py-4">
                        <span className="inline-flex items-center gap-1 rounded-full bg-yellow-50 px-2.5 py-0.5 text-xs font-semibold text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400">
                          <Zap className="h-3 w-3" />
                          {g.points ?? 0}
                        </span>
                      </td>

                      {/* Personal discount */}
                      <td className="px-5 py-4">
                        {hasDiscount ? (
                          <span className="inline-flex items-center gap-1 rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-semibold text-orange-700 dark:bg-orange-500/10 dark:text-orange-400">
                            <Tag className="h-3 w-3" />
                            {g.personal_discount_rate}%
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">—</span>
                        )}
                      </td>

                      {/* Membership status */}
                      <td className="px-5 py-4">
                        {g.membership ? (
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                              STATUS_CLASSES[g.membership.status] ?? ""
                            }`}
                          >
                            {g.membership.status}
                          </span>
                        ) : (
                          <span className="text-xs text-gray-400">None</span>
                        )}
                      </td>

                      {/* Expiry */}
                      <td className="px-5 py-4">
                        <span
                          className={`text-sm ${
                            days == null
                              ? "text-gray-400"
                              : days < 0
                              ? "text-error-600 dark:text-error-400"
                              : isExpiring
                              ? "font-medium text-warning-600 dark:text-warning-400"
                              : "text-gray-600 dark:text-gray-300"
                          }`}
                        >
                          {days == null
                            ? "—"
                            : days < 0
                            ? `${Math.abs(days)}d ago`
                            : `${days}d left`}
                          {isExpiring && " ⚠️"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setAdjustGamer(g)}
                            className="flex items-center gap-1.5 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-medium text-brand-600 hover:bg-brand-100 dark:bg-brand-500/10 dark:text-brand-400"
                          >
                            <Zap className="h-3.5 w-3.5" /> Adjust
                          </button>
                          <button
                            onClick={() => setNotifyGamer(g)}
                            className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
                          >
                            <Bell className="h-3.5 w-3.5" /> Notify
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {adjustGamer && (
        <AdjustPerksModal
          gamer={adjustGamer}
          onClose={() => setAdjustGamer(null)}
          onSaved={() => { setAdjustGamer(null); loadMembers(); }}
        />
      )}
      {notifyGamer && (
        <NotifyModal
          gamer={notifyGamer}
          onClose={() => setNotifyGamer(null)}
        />
      )}
    </div>
  );
}
