"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Trophy, Calendar, Users, DollarSign, ChevronDown, Medal } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const STATUS_CONFIG = {
  upcoming: { label: "Upcoming", className: "border-blue-500/40 text-blue-300 bg-blue-500/10" },
  registration_open: { label: "Open Registration", className: "border-green-500/40 text-green-300 bg-green-500/10" },
  ongoing: { label: "Live", className: "border-yellow-500/40 text-yellow-300 bg-yellow-500/10" },
  completed: { label: "Completed", className: "border-white/20 text-white/50 bg-white/5" },
  cancelled: { label: "Cancelled", className: "border-red-500/40 text-red-300 bg-red-500/10" },
};

const FILTERS = [
  { key: "", label: "All" },
  { key: "upcoming", label: "Upcoming" },
  { key: "registration_open", label: "Registration Open" },
  { key: "ongoing", label: "Live" },
  { key: "completed", label: "Completed" },
];

function TournamentCard({ t }) {
  const [expanded, setExpanded] = useState(false);
  const status = STATUS_CONFIG[t.status] ?? STATUS_CONFIG.upcoming;
  const fillPct = t.max_participants
    ? Math.min(100, ((t.current_registrations ?? 0) / t.max_participants) * 100)
    : 0;

  const parseImages = (raw) => {
    try {
      const arr = typeof raw === "string" ? JSON.parse(raw) : raw;
      return Array.isArray(arr) ? arr : [];
    } catch { return []; }
  };

  const resultImages = parseImages(t.result_images);
  const isCompleted = t.status === "completed";

  return (
    <motion.article
      variants={fadeUp}
      className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
    >
      {/* Banner */}
      {t.banner_url ? (
        <div className="relative h-44 overflow-hidden">
          <img src={t.banner_url} alt={t.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <span className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}>
            {status.label}
          </span>
        </div>
      ) : (
        <div className="relative flex h-44 items-center justify-center bg-gradient-to-br from-brand-500/20 to-pink/20">
          <Trophy className="h-14 w-14 text-white/20" />
          <span className={`absolute right-4 top-4 rounded-full border px-3 py-1 text-xs font-medium ${status.className}`}>
            {status.label}
          </span>
        </div>
      )}

      <div className="p-6 space-y-4">
        {/* Title & category */}
        <div>
          {t.category && (
            <p className="text-xs uppercase tracking-[0.3em] text-white/40">{t.category}</p>
          )}
          <h3 className="mt-1 font-display text-xl uppercase tracking-[0.1em]">{t.name}</h3>
        </div>

        {/* Info grid */}
        <div className="grid grid-cols-2 gap-3 text-sm text-white/60">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-white/30" />
            <span>{t.date} · {t.time}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users className="h-4 w-4 text-white/30" />
            <span>{t.current_registrations ?? 0}/{t.max_participants} players</span>
          </div>
          <div className="flex items-center gap-1.5">
            <DollarSign className="h-4 w-4 text-white/30" />
            <span>Entry: ₹{Number(t.entry_fee).toFixed(0)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Trophy className="h-4 w-4 text-yellow-400/60" />
            <span className="text-yellow-300/80">Prize: ₹{Number(t.prize_pool).toFixed(0)}</span>
          </div>
        </div>

        {/* Registration fill bar */}
        {t.max_participants && t.status !== "completed" && (
          <div>
            <div className="mb-1 flex justify-between text-xs text-white/40">
              <span>Registration</span>
              <span>{t.current_registrations ?? 0}/{t.max_participants}</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-brand-500 transition-all"
                style={{ width: `${fillPct}%` }}
              />
            </div>
          </div>
        )}

        {/* Winner (completed) */}
        {isCompleted && t.winner_name && (
          <div className="flex items-center gap-3 rounded-xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3">
            {t.winner_image_url ? (
              <img src={t.winner_image_url} alt={t.winner_name} className="h-10 w-10 rounded-full object-cover" />
            ) : (
              <Medal className="h-6 w-6 text-yellow-400 shrink-0" />
            )}
            <div>
              <p className="text-xs text-yellow-400/60">Winner</p>
              <p className="font-medium text-yellow-300">{t.winner_name}</p>
            </div>
          </div>
        )}

        {/* Description / Rules toggle */}
        {(t.description || t.rules_policies || resultImages.length > 0) && (
          <div>
            <button
              onClick={() => setExpanded((x) => !x)}
              className="flex w-full items-center justify-between text-left text-xs uppercase tracking-[0.25em] text-white/40 hover:text-white/60 transition-colors"
            >
              {expanded ? "Show Less" : "Details & Rules"}
              <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
            </button>

            {expanded && (
              <div className="mt-3 space-y-3">
                {t.description && (
                  <p className="text-sm text-white/60 whitespace-pre-line">{t.description}</p>
                )}
                {t.rules_policies && (
                  <div>
                    <p className="mb-1.5 text-xs uppercase tracking-wider text-white/40">Rules & Policies</p>
                    <p className="text-sm text-white/60 whitespace-pre-line">{t.rules_policies}</p>
                  </div>
                )}
                {resultImages.length > 0 && (
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-wider text-white/40">Highlights</p>
                    <div className="grid grid-cols-3 gap-2">
                      {resultImages.map((url, i) => (
                        <img key={i} src={url} alt="" className="aspect-square rounded-xl object-cover" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Registration dates */}
        {(t.registration_start || t.registration_end) && t.status !== "completed" && (
          <p className="text-xs text-white/40">
            Registration:{" "}
            {t.registration_start && <span>{t.registration_start}</span>}
            {t.registration_start && t.registration_end && " – "}
            {t.registration_end && <span>{t.registration_end}</span>}
          </p>
        )}
      </div>
    </motion.article>
  );
}

export default function TournamentsPage() {
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("");

  useEffect(() => {
    setLoading(true);
    const qs = activeFilter ? `?status=${activeFilter}` : "";
    fetch(`/api/tournaments${qs}`)
      .then((r) => r.json())
      .then((d) => setTournaments(d.data || []))
      .finally(() => setLoading(false));
  }, [activeFilter]);

  const completed = tournaments.filter((t) => t.status === "completed");
  const active = tournaments.filter((t) => t.status !== "completed");

  return (
    <div className="text-white bg-black main-wrapper">
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/10 via-black to-brand-500/20" />
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative flex flex-col items-center w-full max-w-6xl px-6 mx-auto text-center py-28">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Compete & Win</p>
            <h1 className="mt-6 font-display text-5xl uppercase tracking-[0.18em] sm:text-6xl">
              Tournaments
            </h1>
            <p className="mt-4 max-w-xl text-white/60">
              Join competitive tournaments, showcase your skills, and claim your place on the leaderboard.
            </p>
          </div>
        </section>

        {/* Filter bar */}
        <section className="sticky top-16 z-20 border-b border-white/10 bg-black/90 backdrop-blur-md">
          <div className="flex w-full max-w-6xl items-center gap-2 overflow-x-auto px-6 py-3 mx-auto no-scrollbar">
            {FILTERS.map((f) => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                  activeFilter === f.key
                    ? "bg-brand-500 text-white"
                    : "border border-white/20 text-white/60 hover:border-white/40 hover:text-white"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </section>

        {/* Tournaments grid */}
        <section className="py-16">
          <div className="w-full max-w-6xl px-6 mx-auto">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-80 animate-pulse rounded-3xl border border-white/10 bg-white/5" />
                ))}
              </div>
            ) : tournaments.length === 0 ? (
              <div className="py-20 text-center text-white/40">
                <Trophy className="mx-auto mb-3 h-10 w-10 text-white/20" />
                No tournaments found.
              </div>
            ) : (
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.05 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {tournaments.map((t) => (
                  <TournamentCard key={t.id} t={t} />
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Results section (completed only when showing all) */}
        {!activeFilter && completed.length > 0 && (
          <section className="pb-20">
            <div className="w-full max-w-6xl px-6 mx-auto">
              <div className="mb-8 text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Hall of Champions</p>
                <h2 className="mt-3 font-display text-3xl uppercase tracking-[0.12em]">Past Winners</h2>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {completed
                  .filter((t) => t.winner_name)
                  .map((t) => (
                    <div key={t.id} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                      {t.winner_image_url ? (
                        <img src={t.winner_image_url} alt={t.winner_name} className="h-14 w-14 rounded-full object-cover" />
                      ) : (
                        <div className="flex h-14 w-14 items-center justify-center rounded-full border border-yellow-500/20 bg-yellow-500/10">
                          <Medal className="h-6 w-6 text-yellow-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-xs text-white/40">{t.name}</p>
                        <p className="font-medium text-yellow-300">{t.winner_name}</p>
                        <p className="text-xs text-white/30">{t.date}</p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}
