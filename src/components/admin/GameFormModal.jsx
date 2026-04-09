"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { FileUpload } from "../FileUpload";

const EMPTY = {
  title: "",
  description: "",
  image_urls: [],
  duration_minutes: "",
  active_status: true,
  redirect_url: "/home-2",
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
          ? game.image_urls
          : typeof game.image_urls === "string"
          ? JSON.parse(game.image_urls || "[]")
          : [],
        duration_minutes: game.duration_minutes ?? "",
        active_status: game.active_status !== false,
        redirect_url: game.redirect_url ?? "/home-2",
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
      const payload = {
        title: form.title.trim(),
        description: form.description.trim() || null,
        image_urls: form.image_urls,
        duration_minutes: Number(form.duration_minutes),
        active_status: form.active_status,
        redirect_url: form.redirect_url.trim() || "/home-2",
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

  const fieldCls =
    "w-full h-10 px-3 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-brand-300 focus:outline-none dark:bg-gray-800 dark:border-gray-700 dark:text-white/90";
  const labelCls = "mb-1.5 block text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-2xl dark:bg-gray-900 overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-gray-800">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
              {game ? "Edit Game" : "Add New Game"}
            </h2>
            <p className="text-xs text-gray-400 mt-0.5">
              {game ? "Update game details below" : "Fill in the details to create a new game"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">

            {/* Row 1: Title + Duration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelCls}>Title *</label>
                <input
                  required
                  value={form.title}
                  onChange={(e) => set("title", e.target.value)}
                  placeholder="e.g. Street Fighter 6"
                  className={fieldCls}
                />
              </div>
              <div>
                <label className={labelCls}>Duration (minutes) *</label>
                <input
                  required
                  type="number"
                  min={1}
                  value={form.duration_minutes}
                  onChange={(e) => set("duration_minutes", e.target.value)}
                  placeholder="60"
                  className={fieldCls}
                />
              </div>
            </div>

            {/* Row 2: Redirect URL + Active */}
            <div className="grid grid-cols-2 gap-4 items-end">
              <div>
                <label className={labelCls}>Redirect URL</label>
                <input
                  type="text"
                  value={form.redirect_url}
                  onChange={(e) => set("redirect_url", e.target.value)}
                  placeholder="/home-2"
                  className={fieldCls}
                />
              </div>
              <div className="pb-1">
                <label className="flex items-center gap-3 cursor-pointer h-10 px-3 border border-gray-200 rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
                  <input
                    type="checkbox"
                    checked={form.active_status}
                    onChange={(e) => set("active_status", e.target.checked)}
                    className="w-4 h-4 rounded border-gray-300 accent-brand-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Active (visible for booking)</span>
                </label>
              </div>
            </div>

            {/* Row 3: Description */}
            <div>
              <label className={labelCls}>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => set("description", e.target.value)}
                rows={3}
                placeholder="Short description of the game…"
                className="w-full px-3 py-2.5 text-sm text-gray-800 bg-white border border-gray-200 rounded-lg placeholder:text-gray-400 focus:border-brand-300 focus:outline-none resize-none dark:bg-gray-800 dark:border-gray-700 dark:text-white/90"
              />
            </div>

            {/* Row 4: Images upload */}
            <div>
              <label className={labelCls}>Game Images</label>
              <FileUpload
                onUploadComplete={(asset) =>
                  set("image_urls", [...form.image_urls, asset.path])
                }
              />
              {form.image_urls.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {form.image_urls.map((url, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={url}
                        alt=""
                        className="w-16 h-16 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          set("image_urls", form.image_urls.filter((_, idx) => idx !== i))
                        }
                        className="absolute -top-1.5 -right-1.5 hidden group-hover:flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {error && (
              <p className="px-3 py-2 text-sm text-red-600 rounded-lg bg-red-50 dark:bg-red-500/10 dark:text-red-400">
                {error}
              </p>
            )}
          </div>

          {/* Footer */}
          <div className="flex gap-3 px-6 py-4 border-t border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-white rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-60 transition-colors"
            >
              {loading ? "Saving…" : game ? "Save Changes" : "Create Game"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
