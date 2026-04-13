"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { X, Play, Code2, Image as ImageIcon, ZoomIn } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

// ── Lightbox ─────────────────────────────────────────────────────────────────

function Lightbox({ item, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="relative max-h-[90vh] max-w-5xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute z-10 flex items-center justify-center text-white rounded-full -right-3 -top-3 h-9 w-9 bg-white/10 backdrop-blur hover:bg-white/20"
          >
            <X className="w-5 h-5" />
          </button>

          {item.type === "image" && (
            <img
              src={item.url}
              alt={item.title || ""}
              className="mx-auto max-h-[85vh] w-auto rounded-2xl object-contain"
            />
          )}

          {item.type === "video" && (
            <div className="overflow-hidden bg-black rounded-2xl">
              <video
                src={item.url}
                controls
                autoPlay
                className="mx-auto max-h-[80vh] w-full"
                poster={item.thumbnail_url || undefined}
              />
            </div>
          )}

          {item.type === "embed" && (
            <div className="overflow-hidden aspect-video rounded-2xl">
              <iframe
                src={item.url}
                className="w-full h-full"
                allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                title={item.title || "Embedded content"}
              />
            </div>
          )}

          {item.title && (
            <p className="mt-3 text-sm text-center text-white/60">{item.title}</p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// ── Media Card ────────────────────────────────────────────────────────────────

function MediaCard({ item, onClick }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      variants={fadeUp}
      onClick={() => onClick(item)}
      className="relative overflow-hidden border cursor-pointer group rounded-2xl border-white/10 bg-white/5"
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-white/5">
        {item.type === "image" && (
          <img
            src={item.url}
            alt={item.title || ""}
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        )}
        {item.type === "video" && item.thumbnail_url && (
          <img
            src={item.thumbnail_url}
            alt=""
            onLoad={() => setLoaded(true)}
            className={`h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 ${loaded ? "opacity-100" : "opacity-0"}`}
          />
        )}
        {item.type === "video" && !item.thumbnail_url && (
          <div className="flex items-center justify-center w-full h-full">
            <Play className="w-10 h-10 text-white/20" />
          </div>
        )}
        {item.type === "embed" && (
          <div className="flex items-center justify-center w-full h-full">
            <Code2 className="w-10 h-10 text-white/20" />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 flex items-center justify-center transition-opacity duration-300 opacity-0 bg-black/40 group-hover:opacity-100">
          {item.type === "video" ? (
            <div className="flex items-center justify-center w-12 h-12 border rounded-full border-white/40 bg-white/10 backdrop-blur">
              <Play className="h-5 w-5 text-white ml-0.5" />
            </div>
          ) : item.type === "embed" ? (
            <div className="flex items-center justify-center w-12 h-12 border rounded-full border-white/40 bg-white/10 backdrop-blur">
              <Code2 className="w-5 h-5 text-white" />
            </div>
          ) : (
            <div className="flex items-center justify-center w-12 h-12 border rounded-full border-white/40 bg-white/10 backdrop-blur">
              <ZoomIn className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Type badge */}
        {item.type !== "image" && (
          <div className="absolute left-3 top-3">
            <span className={`rounded-full px-2.5 py-1 text-xs font-medium backdrop-blur ${
              item.type === "video"
                ? "bg-red-500/20 text-red-300 border border-red-500/30"
                : "bg-purple-500/20 text-purple-300 border border-purple-500/30"
            }`}>
              {item.type === "video" ? "Video" : "Embed"}
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      {(item.title || item.category) && (
        <div className="px-3 py-2.5">
          {item.title && (
            <p className="text-sm font-medium truncate text-white/80">{item.title}</p>
          )}
          {item.category && (
            <p className="mt-0.5 text-xs text-white/40">{item.category}</p>
          )}
        </div>
      )}
    </motion.div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default function GalleryPage() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("");
  const [activeType, setActiveType] = useState("");
  const [lightboxItem, setLightboxItem] = useState(null);

  useEffect(() => {
    setLoading(true);
    const qs = activeCategory ? `?category=${encodeURIComponent(activeCategory)}` : "";
    fetch(`/api/gallery${qs}`)
      .then((r) => r.json())
      .then((d) => {
        const data = d.data || {};
        setItems(Array.isArray(data) ? data : (data.items || []));
        if (data.categories) setCategories(data.categories);
      })
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const displayed = activeType ? items.filter((i) => i.type === activeType) : items;

  return (
    <div className="text-white bg-black main-wrapper">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-pink/20 via-black to-brand-500/20" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative flex flex-col items-center w-full max-w-6xl px-6 mx-auto text-center py-28">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Media</p>
            <h1 className="mt-6 font-display text-5xl uppercase tracking-[0.18em] sm:text-6xl">
              Gallery
            </h1>
            <p className="max-w-xl mt-4 text-white/60">
              Photos, videos, and highlights from our events, tournaments, and gaming sessions.
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="sticky z-20 border-b top-16 border-white/10 bg-black/90 backdrop-blur-md">
          <div className="w-full max-w-6xl px-6 py-3 mx-auto">
            <div className="flex flex-wrap items-center gap-2">
              {/* Type filters */}
              <div className="flex items-center overflow-hidden border rounded-full border-white/20">
                {[
                  { key: "", label: "All", icon: null },
                  { key: "image", label: "Photos", icon: ImageIcon },
                  { key: "video", label: "Videos", icon: Play },
                  { key: "embed", label: "Embeds", icon: Code2 },
                ].map(({ key, label, icon: Icon }) => (
                  <button
                    key={key}
                    onClick={() => setActiveType(key)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium transition-colors ${
                      activeType === key
                        ? "bg-brand-500 text-white"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    {Icon && <Icon className="w-3 h-3" />}
                    {label}
                  </button>
                ))}
              </div>

              {/* Category filters */}
              {categories.length > 0 && (
                <>
                  <div className="w-px h-4 bg-white/20" />
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(activeCategory === cat ? "" : cat)}
                      className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                        activeCategory === cat
                          ? "bg-pink text-white"
                          : "border border-white/20 text-white/50 hover:border-white/40 hover:text-white"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section className="py-16">
          <div className="w-full px-6 mx-auto max-w-7xl">
            {loading ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="border aspect-video animate-pulse rounded-2xl border-white/10 bg-white/5" />
                ))}
              </div>
            ) : displayed.length === 0 ? (
              <div className="py-20 text-center text-white/40">
                <ImageIcon className="w-10 h-10 mx-auto mb-3 text-white/20" />
                No media items found.
              </div>
            ) : (
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
              >
                {displayed.map((item) => (
                  <MediaCard key={item.id} item={item} onClick={setLightboxItem} />
                ))}
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />
      )}
    </div>
  );
}
