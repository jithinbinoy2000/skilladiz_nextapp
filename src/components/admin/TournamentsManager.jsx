"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus, Pencil, Trash2, Trophy, Users, Calendar, ChevronDown, X,
} from "lucide-react";
import { FileUpload } from "@/components/FileUpload";

const STATUSES = ["upcoming", "registration_open", "ongoing", "completed", "cancelled"];

const STATUS_STYLES = {
  upcoming: "bg-blue-100 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  registration_open: "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  ongoing: "bg-yellow-100 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
  completed: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400",
};

const EMPTY_FORM = {
  name: "",
  category: "",
  date: "",
  time: "18:00",
  entry_fee: "0",
  prize_pool: "0",
  max_participants: "16",
  description: "",
  banner_url: "",
  rules_policies: "",
  registration_start_date: "",
  registration_start_time: "00:00",
  registration_end_date: "",
  registration_end_time: "23:59",
  status: "upcoming",
  winner_name: "",
  winner_image_url: "",
  result_images: [],
};

// ── Uploaded image preview with remove button ─────────────────────────────────
function ImagePreview({ src, onRemove, className = "" }) {
  if (!src) return null;
  return (
    <div className={`relative group inline-block ${className}`}>
      <img
        src={src}
        alt=""
        className="h-20 w-28 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
        onError={(e) => (e.target.style.display = "none")}
      />
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="absolute -right-1.5 -top-1.5 hidden group-hover:flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function TournamentFormModal({ tournament, onClose, onSaved }) {
  const isEdit = Boolean(tournament);

  const parseImages = (raw) => {
    try {
      const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  };

  // Split stored "YYYY-MM-DD HH:MM" back into date + time parts for editing
  const splitDT = (stored) => {
    if (!stored) return { date: "", time: "00:00" };
    const [d, t] = stored.split(" ");
    return { date: d ?? "", time: t ?? "00:00" };
  };

  const [form, setForm] = useState(() => {
    if (!isEdit) return { ...EMPTY_FORM };
    const regStart = splitDT(tournament.registration_start);
    const regEnd   = splitDT(tournament.registration_end);
    return {
      name:                    tournament.name                    ?? "",
      category:                tournament.category                ?? "",
      date:                    tournament.date                    ?? "",
      time:                    tournament.time                    ?? "18:00",
      entry_fee:               String(tournament.entry_fee        ?? "0"),
      prize_pool:              String(tournament.prize_pool       ?? "0"),
      max_participants:        String(tournament.max_participants  ?? "16"),
      description:             tournament.description             ?? "",
      banner_url:              tournament.banner_url              ?? "",
      rules_policies:          tournament.rules_policies          ?? "",
      registration_start_date: regStart.date,
      registration_start_time: regStart.time,
      registration_end_date:   regEnd.date,
      registration_end_time:   regEnd.time,
      status:                  tournament.status                  ?? "upcoming",
      winner_name:             tournament.winner_name             ?? "",
      winner_image_url:        tournament.winner_image_url        ?? "",
      result_images:           parseImages(tournament.result_images),
    };
  });

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("details");

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const handleSubmit = async () => {
    setError("");
    if (!form.name.trim())        { setError("Tournament name is required");  return; }
    if (!form.date)               { setError("Game start date is required");  return; }
    if (!form.max_participants)   { setError("Max participants is required"); return; }

    // Combine split date+time fields back into "YYYY-MM-DD HH:MM" strings
    const combineDT = (date, time) =>
      date ? `${date} ${time || "00:00"}` : null;

    setSaving(true);
    try {
      const url = isEdit
        ? `/api/admin/tournaments/${tournament.id}`
        : "/api/admin/tournaments";

      const res = await fetch(url, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name:             form.name.trim(),
          category:         form.category         || null,
          date:             form.date,
          time:             form.time,
          entry_fee:        Number(form.entry_fee  || 0),
          prize_pool:       Number(form.prize_pool || 0),
          max_participants: Number(form.max_participants),
          description:      form.description      || null,
          banner_url:       form.banner_url        || null,
          rules_policies:   form.rules_policies    || null,
          registration_start: combineDT(form.registration_start_date, form.registration_start_time),
          registration_end:   combineDT(form.registration_end_date,   form.registration_end_time),
          status:           form.status,
          winner_name:      form.winner_name       || null,
          winner_image_url: form.winner_image_url  || null,
          result_images:    form.result_images,
        }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to save"); return; }
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  const inputCls =
    "h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90";
  const labelCls = "mb-1 block text-xs font-medium text-gray-600 dark:text-gray-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl dark:bg-gray-900 flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 dark:border-gray-800 shrink-0">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEdit ? "Edit Tournament" : "New Tournament"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 dark:border-gray-800 shrink-0">
          {["details", "registration", "results"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`-mb-px border-b-2 px-4 py-3 text-sm font-medium capitalize transition-colors ${
                activeTab === tab
                  ? "border-brand-500 text-brand-600 dark:text-brand-400"
                  : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 flex-1">

          {/* ── DETAILS TAB ──────────────────────────────────────────── */}
          {activeTab === "details" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Tournament Name <span className="text-red-500">*</span></label>
                  <input
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    placeholder="e.g. Summer Championship"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className={labelCls}>Category</label>
                  <input
                    value={form.category}
                    onChange={(e) => set("category", e.target.value)}
                    placeholder="e.g. FPS, MOBA, Racing"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Game Start Date <span className="text-red-500">*</span></label>
                  <input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Game Start Time</label>
                  <input type="time" value={form.time} onChange={(e) => set("time", e.target.value)} className={inputCls} />
                </div>
              </div>

              {/* Banner image upload */}
              <div>
                <label className={labelCls}>Banner Image</label>
                {form.banner_url ? (
                  <div className="mb-2">
                    <ImagePreview
                      src={form.banner_url}
                      onRemove={() => set("banner_url", "")}
                      className="w-full"
                    />
                    <img
                      src={form.banner_url}
                      alt="banner"
                      className="mt-2 h-28 w-full rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <button
                      type="button"
                      onClick={() => set("banner_url", "")}
                      className="mt-1.5 flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                    >
                      <X className="h-3 w-3" /> Remove image
                    </button>
                  </div>
                ) : (
                  <FileUpload
                    accept="image/*"
                    hint="JPEG, PNG, WebP — banner image"
                    onUploadComplete={(asset) => set("banner_url", asset.path)}
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Entry Fee (₹)</label>
                  <input type="number" min={0} value={form.entry_fee} onChange={(e) => set("entry_fee", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Prize Pool (₹)</label>
                  <input type="number" min={0} value={form.prize_pool} onChange={(e) => set("prize_pool", e.target.value)} className={inputCls} />
                </div>
              </div>

              <div>
                <label className={labelCls}>Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                  rows={3}
                  placeholder="Describe the tournament…"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90 resize-none"
                />
              </div>

              <div>
                <label className={labelCls}>Rules & Policies</label>
                <textarea
                  value={form.rules_policies}
                  onChange={(e) => set("rules_policies", e.target.value)}
                  rows={4}
                  placeholder="List the tournament rules…"
                  className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2 text-sm text-gray-800 placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90 resize-none"
                />
              </div>

              <div>
                <label className={labelCls}>Status</label>
                <div className="relative">
                  <select
                    value={form.status}
                    onChange={(e) => set("status", e.target.value)}
                    className={`${inputCls} appearance-none pr-8`}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
          )}

          {/* ── REGISTRATION TAB ─────────────────────────────────────── */}
          {activeTab === "registration" && (
            <div className="space-y-5">
              <div>
                <label className={labelCls}>Max Players <span className="text-red-500">*</span></label>
                <input
                  type="number"
                  min={2}
                  value={form.max_participants}
                  onChange={(e) => set("max_participants", e.target.value)}
                  className={`${inputCls} max-w-[180px]`}
                />
                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                  Registrations are tracked automatically as players sign up.
                </p>
              </div>

              <div>
                <label className={labelCls}>Registration Opens</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={form.registration_start_date}
                    onChange={(e) => set("registration_start_date", e.target.value)}
                    className={inputCls}
                  />
                  <input
                    type="time"
                    value={form.registration_start_time}
                    onChange={(e) => set("registration_start_time", e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>Registration Closes</label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={form.registration_end_date}
                    onChange={(e) => set("registration_end_date", e.target.value)}
                    className={inputCls}
                  />
                  <input
                    type="time"
                    value={form.registration_end_time}
                    onChange={(e) => set("registration_end_time", e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── RESULTS TAB ──────────────────────────────────────────── */}
          {activeTab === "results" && (
            <div className="space-y-4">
              <div>
                <label className={labelCls}>Winner Name</label>
                <input
                  value={form.winner_name}
                  onChange={(e) => set("winner_name", e.target.value)}
                  placeholder="e.g. Player123"
                  className={inputCls}
                />
              </div>

              {/* Winner image upload */}
              <div>
                <label className={labelCls}>Winner Photo</label>
                {form.winner_image_url ? (
                  <div className="flex items-center gap-3">
                    <img
                      src={form.winner_image_url}
                      alt="winner"
                      className="h-16 w-16 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <button
                      type="button"
                      onClick={() => set("winner_image_url", "")}
                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                    >
                      <X className="h-3 w-3" /> Remove
                    </button>
                  </div>
                ) : (
                  <FileUpload
                    accept="image/*"
                    hint="Upload winner photo — JPEG, PNG, WebP"
                    onUploadComplete={(asset) => set("winner_image_url", asset.path)}
                  />
                )}
              </div>

              {/* Result highlight images */}
              <div>
                <label className={labelCls}>Result / Highlight Images</label>
                {form.result_images.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {form.result_images.map((url, i) => (
                      <div key={i} className="relative group">
                        <img
                          src={url}
                          alt=""
                          className="h-16 w-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                          onError={(e) => (e.target.style.display = "none")}
                        />
                        <button
                          type="button"
                          onClick={() => set("result_images", form.result_images.filter((_, idx) => idx !== i))}
                          className="absolute -right-1.5 -top-1.5 hidden group-hover:flex items-center justify-center h-5 w-5 rounded-full bg-red-500 text-white"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <FileUpload
                  accept="image/*"
                  hint="Upload highlight/result photos — multiple allowed"
                  onUploadComplete={(asset) =>
                    set("result_images", [...form.result_images, asset.path])
                  }
                />
              </div>
            </div>
          )}
        </div>

        {error && (
          <div className="mx-6 mb-2">
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">{error}</p>
          </div>
        )}

        <div className="flex gap-3 border-t border-gray-100 px-6 py-4 dark:border-gray-800 shrink-0">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="flex-1 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60"
          >
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Create Tournament"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Main table ────────────────────────────────────────────────────────────────
export default function TournamentsManager() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editTournament, setEditTournament] = useState(null);
  const [filterStatus, setFilterStatus] = useState("");

  const loadTournaments = useCallback(async () => {
    setLoading(true);
    const qs = filterStatus ? `?status=${filterStatus}` : "";
    const res = await fetch(`/api/admin/tournaments${qs}`);
    const data = await res.json();
    setTournaments(data.data || []);
    setLoading(false);
  }, [filterStatus]);

  useEffect(() => { loadTournaments(); }, [loadTournaments]);

  const deleteTournament = async (id, name) => {
    if (!confirm(`Delete tournament "${name}"?`)) return;
    await fetch(`/api/admin/tournaments/${id}`, { method: "DELETE" });
    loadTournaments();
  };

  const updateStatus = async (t, status) => {
    await fetch(`/api/admin/tournaments/${t.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    loadTournaments();
  };

  return (
    <div>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Tournaments</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{tournaments.length} tournaments total</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="h-9 rounded-lg border border-gray-300 bg-white px-3 pr-8 text-sm text-gray-700 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 appearance-none"
            >
              <option value="">All Statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
          >
            <Plus className="h-4 w-4" /> Add Tournament
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 dark:border-gray-800">
                {["Tournament", "Category", "Date", "Players", "Entry / Prize", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3 text-left text-xs font-medium uppercase text-gray-500 dark:text-gray-400">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i}>{Array.from({ length: 7 }).map((_, j) => (
                    <td key={j} className="px-5 py-4">
                      <div className="h-4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                    </td>
                  ))}</tr>
                ))
              ) : tournaments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center">
                    <Trophy className="mx-auto mb-2 h-8 w-8 text-gray-300" />
                    <p className="text-sm text-gray-400">No tournaments found</p>
                  </td>
                </tr>
              ) : (
                tournaments.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {t.banner_url ? (
                          <img src={t.banner_url} alt={t.name} className="h-10 w-14 rounded-lg object-cover" />
                        ) : (
                          <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                            <Trophy className="h-5 w-5 text-gray-400" />
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white/90">{t.name}</p>
                          {t.winner_name && (
                            <p className="text-xs text-yellow-600 dark:text-yellow-400">🏆 {t.winner_name}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-500 dark:text-gray-400">{t.category || "—"}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                        <Calendar className="h-3.5 w-3.5 text-gray-400" />
                        {t.date}
                      </div>
                      <p className="mt-0.5 text-xs text-gray-400">{t.time}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-300">
                          {t.current_registrations ?? 0}/{t.max_participants}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-gray-700 dark:text-gray-200">₹{Number(t.entry_fee).toFixed(0)}</p>
                      <p className="text-xs text-gray-400">Prize: ₹{Number(t.prize_pool).toFixed(0)}</p>
                    </td>
                    <td className="px-5 py-4">
                      <div className="relative group">
                        <span className={`inline-flex cursor-pointer items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[t.status] ?? ""}`}>
                          {t.status.replace(/_/g, " ")}
                          <ChevronDown className="h-3 w-3" />
                        </span>
                        <div className="absolute left-0 top-full z-10 mt-1 hidden min-w-[140px] rounded-xl border border-gray-200 bg-white py-1 shadow-lg group-hover:block dark:border-gray-700 dark:bg-gray-900">
                          {STATUSES.map((s) => (
                            <button
                              key={s}
                              onClick={() => updateStatus(t, s)}
                              className={`block w-full px-3 py-1.5 text-left text-xs capitalize hover:bg-gray-50 dark:hover:bg-gray-800 ${
                                t.status === s ? "font-medium text-brand-500" : "text-gray-600 dark:text-gray-300"
                              }`}
                            >
                              {s.replace(/_/g, " ")}
                            </button>
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setEditTournament(t)}
                          className="rounded-lg p-1.5 text-gray-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-500/10"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteTournament(t.id, t.name)}
                          className="rounded-lg p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showCreate && (
        <TournamentFormModal
          onClose={() => setShowCreate(false)}
          onSaved={() => { setShowCreate(false); loadTournaments(); }}
        />
      )}
      {editTournament && (
        <TournamentFormModal
          tournament={editTournament}
          onClose={() => setEditTournament(null)}
          onSaved={() => { setEditTournament(null); loadTournaments(); }}
        />
      )}
    </div>
  );
}
