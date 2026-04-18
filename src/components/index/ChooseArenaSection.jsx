"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

const bentoConfig = [
  { colSpan: "lg:col-span-2", rowSpan: "lg:row-span-1", size: "large" },
  { colSpan: "lg:col-span-1", rowSpan: "lg:row-span-1", size: "small" },
  { colSpan: "lg:col-span-1", rowSpan: "lg:row-span-1", size: "small" },
  { colSpan: "lg:col-span-2", rowSpan: "lg:row-span-1", size: "large" },
];

function ArenaCard({ game, index, config }) {
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  return (
    <motion.article
      variants={fadeUpVariant}
      transition={{ delay: index * 0.1 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden rounded-2xl cursor-pointer group
        ${config.colSpan} ${config.rowSpan}
        h-80 lg:h-auto
      `}
    >
      {/* Image */}
      <motion.img
        src={game.image}
        alt={game.title}
        animate={{ scale: hovered ? 1.07 : 1 }}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="absolute inset-0 object-cover w-full h-full"
      />

      {/* Base gradient — always visible */}
      <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10" />

      {/* Number + category + title — always visible at bottom */}
      <motion.div
        animate={{ y: hovered ? -8 : 0, opacity: hovered ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute bottom-0 left-0 right-0 p-6"
      >
        <div className="flex items-center gap-3 mb-2">
          <span className="font-mono text-xs text-white/30 tracking-widest">{num}</span>
          <span className="h-px flex-1 bg-white/10" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
            {game.category}
          </span>
        </div>
        <h3
          className={`font-display uppercase tracking-[0.12em] text-white leading-tight
            ${config.size === "large" ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"}
          `}
        >
          {game.title}
        </h3>
      </motion.div>

      {/* Hover overlay — slides up */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col justify-end p-6 bg-linear-to-t from-black/95 via-black/70 to-black/20"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-1">
              {game.category}
            </span>
            <h3
              className={`font-display uppercase tracking-[0.12em] text-white leading-tight mb-3
                ${config.size === "large" ? "text-2xl lg:text-3xl" : "text-xl lg:text-2xl"}
              `}
            >
              {game.title}
            </h3>
            {game.description && (
              <p className="text-sm text-white/65 leading-relaxed mb-5 max-w-sm">
                {game.description}
              </p>
            )}
            <div className="flex items-center gap-3">
              <a
                href={game.bookUrl || "/booking"}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-xs font-bold uppercase tracking-[0.2em] text-black hover:bg-white/90 transition-colors"
              >
                Book Now
                <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                  <path d="M1 11L11 1M11 1H4M11 1v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top-right index pill */}
      <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/40 backdrop-blur-md px-3 py-1">
        <span className="font-mono text-[10px] text-white/40">{num}</span>
        <span className="text-[10px] text-white/25">/</span>
        <span className="font-mono text-[10px] text-white/25">04</span>
      </div>
    </motion.article>
  );
}

function ChooseArenaSection({ featuredGames }) {
  return (
    <section className="relative py-14 sm:py-20 overflow-hidden bg-black">
      {/* Ambient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_40%_at_50%_50%,rgba(120,80,255,0.06),transparent)]" />

      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6">

        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="flex flex-col gap-5 mb-8 sm:mb-12 lg:flex-row lg:items-end lg:justify-between"
        >
          <motion.div variants={fadeUpVariant}>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-white/30" />
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/50">
                Gaming Zones
              </p>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl md:text-6xl uppercase tracking-[0.08em] leading-[0.9] text-white">
              Choose<br />
              <span className="text-white/30">Your</span> Arena
            </h2>
          </motion.div>

          <motion.div variants={fadeUpVariant} className="lg:text-right max-w-md">
            <p className="text-white/55 font-sans text-sm leading-relaxed mb-5">
              From classic cue sports to next-gen VR, every zone at Skilladiz is
              built to deliver peak performance and pure fun.
            </p>
            <a
              href="/booking"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white/60 hover:text-white transition-colors border-b border-white/20 hover:border-white/60 pb-0.5"
            >
              View All Zones
              <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H4M11 1v7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>
        </motion.div>

        {/* Bento grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:grid-rows-2 lg:h-225"
        >
          {featuredGames.map((game, i) => (
            <ArenaCard
              key={game.title}
              game={game}
              index={i}
              config={bentoConfig[i] ?? { colSpan: "lg:col-span-1", rowSpan: "lg:row-span-1", size: "small" }}
            />
          ))}
        </motion.div>

        {/* Bottom stat strip */}
        <motion.div
          variants={fadeUpVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="mt-10 flex flex-wrap items-center justify-between gap-6 border-t border-white/8 pt-8"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-white/30">
            4 Unique Zones · Multiple Slots Daily · All Skill Levels
          </p>
          <a
            href="/booking"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white hover:border-white/40 transition-all"
          >
            Book a Slot
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default ChooseArenaSection;
