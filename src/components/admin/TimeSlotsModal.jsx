"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2, Clock } from "lucide-react";

export default function TimeSlotsModal({ game, onClose }) {
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ start_time: "", end_time: "" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadSlots = async () => {
    setLoading(true);
    const res = await fetch(`/api/time-slots?game_id=${game.id}`);
    const data = await res.json();
    setSlots(data.data || []);
    setLoading(false);
  };

  useEffect(() => { loadSlots(); }, [game.id]);

  const addSlot = async (e) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      const res = await fetch("/api/time-slots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ game_id: game.id, ...newSlot }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to add slot"); return; }
      setNewSlot({ start_time: "", end_time: "" });
      loadSlots();
    } finally {
      setSaving(false);
    }
  };

  const deleteSlot = async (id) => {
    await fetch(`/api/time-slots/${id}`, { method: "DELETE" });
    loadSlots();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              Time Slots
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{game.title}</p>
          </div>
          <button onClick={onClose} className="rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Existing slots */}
        <div className="mb-4 space-y-2">
          {loading ? (
            <p className="py-4 text-center text-sm text-gray-400">Loading…</p>
          ) : slots.length === 0 ? (
            <div className="flex flex-col items-center py-6 text-center">
              <Clock className="mb-2 h-8 w-8 text-gray-300" />
              <p className="text-sm text-gray-500">No slots yet. Add one below.</p>
            </div>
          ) : (
            slots.map((s) => (
              <div
                key={s.id}
                className="flex items-center justify-between rounded-xl border border-gray-100 px-4 py-2.5 dark:border-gray-800"
              >
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {s.start_time} – {s.end_time}
                </span>
                <button
                  onClick={() => deleteSlot(s.id)}
                  className="rounded-lg p-1 text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-500/10"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Add new slot */}
        <form onSubmit={addSlot} className="space-y-3 border-t border-gray-200 pt-4 dark:border-gray-800">
          <p className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
            Add Slot
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs text-gray-600 dark:text-gray-400">Start</label>
              <input
                type="time"
                required
                value={newSlot.start_time}
                onChange={(e) => setNewSlot((p) => ({ ...p, start_time: e.target.value }))}
                className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs text-gray-600 dark:text-gray-400">End</label>
              <input
                type="time"
                required
                value={newSlot.end_time}
                onChange={(e) => setNewSlot((p) => ({ ...p, end_time: e.target.value }))}
                className="h-10 w-full rounded-lg border border-gray-300 bg-transparent px-3 text-sm text-gray-800 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600 disabled:opacity-60"
          >
            <Plus className="h-4 w-4" />
            {saving ? "Adding…" : "Add Slot"}
          </button>
        </form>
      </div>
    </div>
  );
}
