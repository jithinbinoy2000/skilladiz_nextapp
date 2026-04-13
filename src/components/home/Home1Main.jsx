"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

const poolVariants = [
  {
    title: "8-Ball Pool Championship",
    category: "Classic Game",
    description: "Tournament-grade tables with professional lighting, premium cues, and smooth felt for competitive play.",
    image: "/vear/67e29cdc0ffb11b522861f7f_Shop-1.jpg",
  },
  {
    title: "9-Ball Speed Pool",
    category: "Fast-Paced",
    description: "Quick matches on regulation tables, perfect for skilled players seeking rapid-fire competitive action.",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41848629d00d518f6ff31_1",
  },
  {
    title: "Snooker Professional Tables",
    category: "Elite Gaming",
    description: "Full-size snooker tables with precision cues—ideal for advanced players and serious tournament competition.",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41adf70e6281fac07dc19_4",
  },
  {
    title: "Casual Pool Lounge",
    category: "Social Fun",
    description: "Relaxed atmosphere with varied tables, perfect for casual players, friends, and group gatherings.",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41aef5a2c5039c962accc_5",
  },
];

const gallery = [
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd5d89b248471ed7355_2.webp",
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd845bd43980da09622_3.webp",
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdc5f950c0d1d312713_6.webp",
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bbfba94846ccbb1bf89_10.webp",
];

export default function Home1Main() {
  return (
    <div>
      <section className="relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,51,225,0.15),_transparent_55%)]" />
        <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            className="space-y-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="text-xs uppercase tracking-[0.4em] text-white/60" variants={fadeUpVariant}>
              Master the Game
            </motion.p>
            <motion.h1
              className="font-display text-5xl uppercase tracking-[0.15em] text-white sm:text-6xl lg:text-7xl"
              variants={fadeUpVariant}
            >
              Elite Pool Gaming
            </motion.h1>
            <motion.p className="max-w-xl text-lg text-white/70" variants={fadeUpVariant}>
              Experience competitive 8-ball pool on tournament-grade tables with premium lighting and professional cues. Whether you're playing casual matches or serious tournaments, our state-of-the-art pool halls deliver the precision and atmosphere every billiard enthusiast demands.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4" variants={fadeUpVariant}>
              <a
                href="/booking"
                className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.25em] text-black"
              >
                Book Your Game
              </a>
              <a
                href="#pool-games"
                className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.25em] text-white"
              >
                Explore Tables
              </a>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative flex items-center justify-center"
            variants={fadeUpVariant}
            initial="hidden"
            animate="visible"
          >
            <div className="relative h-[360px] w-[360px] rounded-full border border-white/20">
              <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_top,_rgba(248,51,225,0.35),_transparent_70%)]" />
              <img
                src="/vear/67e29cdc0ffb11b522861f7f_Shop-1.jpg"
                alt="Pool table with cue and balls"
                className="absolute inset-0 object-contain w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-6 py-20 mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Our Pool Games</p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.12em]">
              Premium Billiards Experiences
            </h2>
          </div>
          <p className="max-w-xl text-white/70">
            From classic 8-ball championships to professional snooker tables, our gaming zones feature competition-grade equipment and comfortable environments for every skill level.
          </p>
        </div>

        <div className="grid gap-6 mt-12 md:grid-cols-2">
          {poolVariants.map((game) => (
            <article
              key={game.title}
              className="relative overflow-hidden border group rounded-3xl border-white/10 bg-white/5"
            >
              <img
                src={game.image}
                alt={game.title}
                className="object-cover w-full h-64 transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute space-y-3 bottom-6 left-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  {game.category}
                </p>
                <h3 className="text-xl font-display uppercase tracking-[0.1em] text-white">
                  {game.title}
                </h3>
                <p className="text-sm text-white/60">{game.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-white/5 py-20">
        <div className="mx-auto w-full max-w-7xl px-6">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">About 8-Ball Pool</p>
              <h2 className="font-display text-4xl uppercase tracking-[0.12em]">
                The World's Most Popular Pool Game
              </h2>
              <p className="text-white/70 leading-relaxed">
                8-Ball is a classic pocket billiards game played with 15 numbered balls and a white cue ball. Players compete to pocket all balls of their assigned group (solids 1-7 or stripes 9-15) before pocketing the 8-ball to win. It's a game of strategy, precision, and skill that requires mastery of angles, spin, and shot selection.
              </p>
              <div className="space-y-3">
                <h3 className="text-lg font-display uppercase tracking-[0.1em] text-white">Key Features:</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>✓ Tournament-regulated table dimensions</li>
                  <li>✓ Professional-grade cues and equipment</li>
                  <li>✓ Optimal lighting for accurate play</li>
                  <li>✓ Competitive and casual gaming options</li>
                </ul>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {gallery.map((src, idx) => (
                <div key={idx} className="overflow-hidden rounded-2xl border border-white/10">
                  <img src={src} alt={`Pool gaming area ${idx + 1}`} className="h-44 w-full object-cover transition duration-300 hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 mx-auto border-y border-white/10 max-w-7xl">
        <div className="w-full max-w-6xl px-6 mx-auto">
          <div className="overflow-hidden">
            <div className="marquee-track">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-16">
                  {Array.from({ length: 4 }).map((_, wordIdx) => (
                    <span
                      key={`${idx}-${wordIdx}`}
                      className="text-3xl font-display uppercase tracking-[0.2em] text-white/60 sm:text-4xl"
                    >
                      Professional Pool Gaming
                    </span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          </div>
        </section>
        
      <section className="w-full px-6 py-20 mx-auto max-w-7xl">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <h2 className="font-display text-4xl uppercase tracking-[0.12em]">
              Why Choose Our Pool Gaming Zones?
            </h2>
            <p className="text-white/70">
              Our dedicated pool gaming areas feature competition-standard tables, professional cues, and optimal playing conditions. Whether practicing your skills or competing in tournaments, enjoy premium equipment and a community of fellow billiards enthusiasts.
            </p>
            <a
              href="/booking"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-pink"
            >
              Reserve Your Table Now
              <span className="w-12 h-px bg-pink" />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((src) => (
              <div key={src} className="overflow-hidden border rounded-2xl border-white/10">
                <img src={src} alt="Pool table gaming area" className="object-cover w-full h-40 transition duration-300 hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white/5">
        <div className="w-full px-6 py-20 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">Pool Expertise</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                From casual players to professionals, our expert staff helps players improve their game with tips, techniques, and tournament opportunities.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">Social Gaming</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Beyond pool, explore our VR gaming zones and PS5 gaming arenas. Experience the ultimate gaming hub with everything under one roof. <a href="/home-2" className="text-pink hover:underline">More virtual experiences</a>.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">Competitive Events</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Join weekly tournaments, league play, and championships with prizes. Level up your skills and build your reputation in the billiards community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
