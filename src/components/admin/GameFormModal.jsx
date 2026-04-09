"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FileUpload } from "../FileUpload";

const EMPTY = {
  title: "",
  description: "",
  image_urls: "",
  duration_minutes: "",
  active_status: true,
};

export default function GameFormModal({ game, onClose, onSaved }) {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (game) {
      setForm({
        title: game.title ?? "",
        description: game.description ?? "",
        image_urls: Array.isArray(game.image_urls)
          ? game.image_urls.join(", ")
          : typeof game.image_urls === "string"
          ? JSON.parse(game.image_urls || "[]").join(", ")
          : "",
        duration_minutes: game.duration_minutes ?? "",
        active_status: game.active_status !== false,
      });
    } else {
      setForm(EMPTY);
    }
  }, [game]);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const urls = form.image_urls
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        image_urls: urls,
        duration_minutes: Number(form.duration_minutes),
        active_status: form.active_status,
      };

      const url = game ? `/api/games/${game.id}` : "/api/games";
      const method = game ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to save game"); return; }
      onSaved?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60">
      <div className="w-full max-w-lg p-6 bg-white shadow-xl rounded-2xl dark:bg-gray-900">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {game ? "Edit Game" : "Add New Game"}
          </h2>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Title *
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Street Fighter 6"
              className="w-full h-10 px-3 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              placeholder="Short description of the game…"
              className="w-full px-3 py-2 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
            />
          </div>
          <FileUpload/>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Image URLs{" "}
              <span className="font-normal text-gray-400">(comma-separated)</span>
            </label>
            <input
              value={form.image_urls}
              onChange={(e) => set("image_urls", e.target.value)}
              placeholder="/images/sf6.jpg, https://cdn.example.com/img.jpg"
              className="w-full h-10 px-3 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">
              Duration (minutes) *
            </label>
            <input
              required
              type="number"
              min={1}
              value={form.duration_minutes}
              onChange={(e) => set("duration_minutes", e.target.value)}
              placeholder="60"
              className="w-full h-10 px-3 text-sm text-gray-800 bg-transparent border border-gray-300 rounded-lg placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:border-gray-700 dark:text-white/90"
            />
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.active_status}
              onChange={(e) => set("active_status", e.target.checked)}
              className="w-4 h-4 border-gray-300 rounded accent-brand-500"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              Active (visible for booking)
            </span>
          </label>

          {/*  Upload Image  */}
     

          {error && (
            <p className="px-3 py-2 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-500/10 dark:text-red-400">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-60"
            >
              {loading ? "Saving…" : game ? "Save Changes" : "Create Game"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
