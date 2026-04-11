"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Plus, Pencil, Trash2, X, Image as ImageIcon, Video, Code2,
  Eye, EyeOff, RefreshCw,
} from "lucide-react";
import { FileUpload } from "@/components/FileUpload";

const TYPE_CONFIG = {
  image: { label: "Image", icon: ImageIcon, color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-500/10" },
  video: { label: "Video", icon: Video, color: "text-red-500", bg: "bg-red-50 dark:bg-red-500/10" },
  embed: { label: "Embed", icon: Code2, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-500/10" },
};

const EMPTY_FORM = {
  title: "",
  type: "image",
  url: "",
  thumbnail_url: "",
  category: "",
  is_visible: true,
  sort_order: "0",
};

// ── Form Modal ────────────────────────────────────────────────────────────────
function MediaFormModal({ item, categories, onClose, onSaved }) {
  const isEdit = Boolean(item);
  const [form, setForm] = useState(
    isEdit
      ? {
          title: item.title ?? "",
          type: item.type ?? "image",
          url: item.url ?? "",
          thumbnail_url: item.thumbnail_url ?? "",
          category: item.category ?? "",
          is_visible: item.is_visible ?? true,
          sort_order: String(item.sort_order ?? "0"),
        }
      : { ...EMPTY_FORM }
  );
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const set = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  // When type changes, clear the URL so the upload widget resets
  const handleTypeChange = (newType) => {
    setForm((f) => ({ ...f, type: newType, url: "", thumbnail_url: "" }));
  };

  const handleSubmit = async () => {
    setError("");
    if (!form.url.trim()) { setError("Please upload a file or enter an embed URL"); return; }

    setSaving(true);
    try {
      const endpoint = isEdit
        ? `/api/admin/gallery/${item.id}`
        : "/api/admin/gallery";

      const res = await fetch(endpoint, {
        method: isEdit ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          sort_order: Number(form.sort_order || 0),
          thumbnail_url: form.thumbnail_url || null,
          category: form.category || null,
          title: form.title || null,
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
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900 max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            {isEdit ? "Edit Media" : "Add Media"}
          </h2>
          <button onClick={onClose} className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          {/* Type selector */}
          <div>
            <label className={labelCls}>Media Type</label>
            <div className="flex gap-2">
              {Object.entries(TYPE_CONFIG).map(([key, cfg]) => {
                const Icon = cfg.icon;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleTypeChange(key)}
                    className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2.5 text-sm font-medium transition-colors ${
                      form.type === key
                        ? `${cfg.bg} border-transparent ${cfg.color}`
                        : "border-gray-200 text-gray-500 hover:border-gray-300 dark:border-gray-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {cfg.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── IMAGE upload ──────────────────────────────────────────── */}
          {form.type === "image" && (
            <div>
              <label className={labelCls}>Image File <span className="text-red-500">*</span></label>
              {form.url ? (
                <div className="space-y-2">
                  <img
                    src={form.url}
                    alt="preview"
                    className="h-36 w-full rounded-xl object-cover border border-gray-200 dark:border-gray-700"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                  <button
                    type="button"
                    onClick={() => set("url", "")}
                    className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                  >
                    <X className="h-3 w-3" /> Remove & re-upload
                  </button>
                </div>
              ) : (
                <FileUpload
                  accept="image/*"
                  hint="JPEG, PNG, WebP, GIF"
                  onUploadComplete={(asset) => set("url", asset.path)}
                />
              )}
            </div>
          )}

          {/* ── VIDEO upload ──────────────────────────────────────────── */}
          {form.type === "video" && (
            <>
              <div>
                <label className={labelCls}>Video File <span className="text-red-500">*</span></label>
                {form.url ? (
                  <div className="space-y-2">
                    <video
                      src={form.url}
                      className="h-36 w-full rounded-xl object-cover border border-gray-200 dark:border-gray-700 bg-black"
                      controls
                    />
                    <button
                      type="button"
                      onClick={() => set("url", "")}
                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                    >
                      <X className="h-3 w-3" /> Remove & re-upload
                    </button>
                  </div>
                ) : (
                  <FileUpload
                    accept="video/*"
                    hint="MP4, WebM, OGG, MOV — video file"
                    onUploadComplete={(asset) => set("url", asset.path)}
                  />
                )}
              </div>

              <div>
                <label className={labelCls}>Thumbnail (optional)</label>
                {form.thumbnail_url ? (
                  <div className="space-y-2">
                    <img
                      src={form.thumbnail_url}
                      alt="thumbnail"
                      className="h-20 w-32 rounded-lg object-cover border border-gray-200 dark:border-gray-700"
                      onError={(e) => (e.target.style.display = "none")}
                    />
                    <button
                      type="button"
                      onClick={() => set("thumbnail_url", "")}
                      className="flex items-center gap-1 text-xs text-red-500 hover:text-red-600"
                    >
                      <X className="h-3 w-3" /> Remove thumbnail
                    </button>
                  </div>
                ) : (
                  <FileUpload
                    accept="image/*"
                    hint="Upload a thumbnail image for this video"
                    onUploadComplete={(asset) => set("thumbnail_url", asset.path)}
                  />
                )}
              </div>
            </>
          )}

          {/* ── EMBED text input ──────────────────────────────────────── */}
          {form.type === "embed" && (
            <div>
              <label className={labelCls}>Embed / iframe URL <span className="text-red-500">*</span></label>
              <input
                value={form.url}
                onChange={(e) => set("url", e.target.value)}
                placeholder="https://www.youtube.com/embed/…"
                className={inputCls}
              />
              {form.url && (
                <div className="mt-2 aspect-video overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
                  <iframe
                    src={form.url}
                    className="h-full w-full"
                    title="embed preview"
                    allowFullScreen
                  />
                </div>
              )}
            </div>
          )}

          {/* Title */}
          <div>
            <label className={labelCls}>Title (optional)</label>
            <input
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="Descriptive title"
              className={inputCls}
            />
          </div>

          {/* Category */}
          <div>
            <label className={labelCls}>Category (optional)</label>
            <input
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              list="gallery-category-suggestions"
              placeholder="e.g. Events, Highlights, Team"
              className={inputCls}
            />
            <datalist id="gallery-category-suggestions">
              {categories.map((c) => <option key={c} value={c} />)}
            </datalist>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Sort order */}
            <div>
              <label className={labelCls}>Sort Order</label>
              <input
                type="number"
                value={form.sort_order}
                onChange={(e) => set("sort_order", e.target.value)}
                className={inputCls}
              />
            </div>
            {/* Visibility */}
            <div>
              <label className={labelCls}>Visibility</label>
              <button
                type="button"
                onClick={() => set("is_visible", !form.is_visible)}
                className={`flex h-10 w-full items-center gap-2 rounded-lg border px-3 text-sm transition-colors ${
                  form.is_visible
                    ? "border-green-300 bg-green-50 text-green-700 dark:border-green-700 dark:bg-green-500/10 dark:text-green-400"
                    : "border-gray-300 text-gray-500 dark:border-gray-700"
                }`}
              >
                {form.is_visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                {form.is_visible ? "Visible" : "Hidden"}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
            {error}
          </p>
        )}

        <div className="mt-5 flex gap-3">
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
            {saving ? "Saving…" : isEdit ? "Save Changes" : "Add Media"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Media card ────────────────────────────────────────────────────────────────
function MediaCard({ item, onEdit, onDelete, onToggleVisibility }) {
  const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.image;
  const Icon = cfg.icon;

  return (
    <div className={`group relative rounded-2xl border overflow-hidden transition-shadow hover:shadow-md ${
      item.is_visible
        ? "border-gray-200 bg-white dark:border-gray-700 dark:bg-white/3"
        : "border-gray-200 bg-gray-50 opacity-60 dark:border-gray-800 dark:bg-gray-900"
    }`}>
      {/* Thumbnail area */}
      <div className="relative h-40 bg-gray-100 dark:bg-gray-800">
        {item.type === "image" && (
          <img
            src={item.url}
            alt={item.title || ""}
            className="h-full w-full object-cover"
            onError={(e) => { e.target.style.display = "none"; }}
          />
        )}
        {item.type === "video" && (item.thumbnail_url ? (
          <img src={item.thumbnail_url} alt="" className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Video className="h-10 w-10 text-gray-300 dark:text-gray-600" />
          </div>
        ))}
        {item.type === "embed" && (
          <div className="flex h-full w-full items-center justify-center">
            <Code2 className="h-10 w-10 text-gray-300 dark:text-gray-600" />
          </div>
        )}

        {/* Type badge */}
        <div className={`absolute left-2 top-2 flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${cfg.bg} ${cfg.color}`}>
          <Icon className="h-3 w-3" />
          {cfg.label}
        </div>

        {/* Actions overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onEdit(item)}
            className="rounded-lg bg-white/90 p-2 text-gray-800 hover:bg-white"
          >
            <Pencil className="h-4 w-4" />
          </button>
          <button
            onClick={() => onToggleVisibility(item)}
            className="rounded-lg bg-white/90 p-2 text-gray-800 hover:bg-white"
          >
            {item.is_visible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
          <button
            onClick={() => onDelete(item)}
            className="rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-3 py-2.5">
        <p className="truncate text-sm font-medium text-gray-800 dark:text-white/90">
          {item.title || <span className="italic text-gray-400">Untitled</span>}
        </p>
        <div className="mt-0.5 flex items-center justify-between">
          {item.category && <span className="text-xs text-gray-400">{item.category}</span>}
          <span className={`ml-auto text-xs ${item.is_visible ? "text-green-600 dark:text-green-400" : "text-gray-400"}`}>
            {item.is_visible ? "Visible" : "Hidden"}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Main manager ──────────────────────────────────────────────────────────────
export default function GalleryManager() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [filterCategory, setFilterCategory] = useState("");
  const [filterType, setFilterType] = useState("");

  const loadGallery = useCallback(async () => {
    setLoading(true);
    const qs = filterCategory ? `?category=${encodeURIComponent(filterCategory)}` : "";
    const res = await fetch(`/api/admin/gallery${qs}`);
    const data = await res.json();
    const galleryData = data.data || {};
    setItems(Array.isArray(galleryData) ? galleryData : (galleryData.items ?? []));
    if (galleryData.categories) setCategories(galleryData.categories);
    setLoading(false);
  }, [filterCategory]);

  useEffect(() => {
    fetch("/api/gallery")
      .then((r) => r.json())
      .then((d) => { if (d.data?.categories) setCategories(d.data.categories); })
      .catch(() => {});
  }, []);

  useEffect(() => { loadGallery(); }, [loadGallery]);

  const deleteItem = async (item) => {
    if (!confirm(`Delete "${item.title || "this item"}"?`)) return;
    await fetch(`/api/admin/gallery/${item.id}`, { method: "DELETE" });
    loadGallery();
  };

  const toggleVisibility = async (item) => {
    await fetch(`/api/admin/gallery/${item.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_visible: !item.is_visible }),
    });
    loadGallery();
  };

  const displayed = filterType ? items.filter((i) => i.type === filterType) : items;

  return (
    <div>
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">Gallery</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{items.length} media items</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {/* Type filter */}
          <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {[
              { key: "", label: "All" },
              ...Object.entries(TYPE_CONFIG).map(([k, v]) => ({ key: k, label: v.label })),
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setFilterType(key)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  filterType === key
                    ? "bg-brand-500 text-white"
                    : "text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 dark:text-gray-400"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {categories.length > 0 && (
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-9 rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-700 focus:outline-none dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
            >
              <option value="">All Categories</option>
              {categories.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          )}

          <button
            onClick={loadGallery}
            className="rounded-lg border border-gray-300 p-2 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800"
          >
            <RefreshCw className="h-4 w-4 text-gray-500" />
          </button>

          <button
            onClick={() => setShowCreate(true)}
            className="flex items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium text-white hover:bg-brand-600"
          >
            <Plus className="h-4 w-4" /> Add Media
          </button>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-52 animate-pulse rounded-2xl bg-gray-100 dark:bg-gray-800" />
          ))}
        </div>
      ) : displayed.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-gray-300 py-16 text-center dark:border-gray-700">
          <ImageIcon className="mx-auto mb-3 h-8 w-8 text-gray-300 dark:text-gray-600" />
          <p className="text-sm text-gray-400">
            No media items yet. Click <strong>Add Media</strong> to upload images, videos, or add embeds.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {displayed.map((item) => (
            <MediaCard
              key={item.id}
              item={item}
              onEdit={setEditItem}
              onDelete={deleteItem}
              onToggleVisibility={toggleVisibility}
            />
          ))}
        </div>
      )}

      {showCreate && (
        <MediaFormModal
          categories={categories}
          onClose={() => setShowCreate(false)}
          onSaved={() => { setShowCreate(false); loadGallery(); }}
        />
      )}
      {editItem && (
        <MediaFormModal
          item={editItem}
          categories={categories}
          onClose={() => setEditItem(null)}
          onSaved={() => { setEditItem(null); loadGallery(); }}
        />
      )}
    </div>
  );
}
