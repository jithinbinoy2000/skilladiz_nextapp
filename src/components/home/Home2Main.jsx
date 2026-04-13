"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

const virtualGameTypes = [
  {
    title: "VR Room-Scale Adventures",
    category: "Immersive",
    price: "from $45/session",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b1170e6281fac083a2f_7.jpg",
    description: "Full-body VR experiences with motion tracking and co-op missions in hyper-realistic environments.",
  },
  {
    title: "Beat Saber & Rhythm Gaming",
    category: "Active Play",
    price: "from $35/session",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b2081a078cb7da1c157_11.jpg",
    description: "High-energy VR rhythm games perfect for solo play or competitive tournaments.",
  },
  {
    title: "Puzzle & Strategy Worlds",
    category: "Brain Games",
    price: "from $40/session",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b43a0e72a3c574e43ba_Blog-1.jpg",
    description: "Engaging VR puzzle experiences that challenge your mind with immersive storytelling.",
  },
];

export default function Home2Main() {
  return (
    <div>
      <section className="relative overflow-hidden bg-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <motion.div
            className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6">
              <motion.p className="text-xs uppercase tracking-[0.35em] text-white/60" variants={fadeUpVariant}>
                Next Generation Gaming
              </motion.p>
              <motion.h1
                className="font-display text-5xl uppercase tracking-[0.15em] sm:text-6xl"
                variants={fadeUpVariant}
              >
                Virtual Reality Gaming
              </motion.h1>
              <motion.p className="max-w-xl text-lg text-white/70" variants={fadeUpVariant}>
                Step into immersive virtual worlds with cutting-edge VR technology. From action-packed adventures to mind-bending puzzles, experience gaming like never before with motion tracking, haptic feedback, and stunning 360-degree environments.
              </motion.p>
              <motion.div className="flex flex-wrap gap-4" variants={fadeUpVariant}>
                <a
                  href="/booking"
                  className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.25em] text-black"
                >
                  Book VR Session
                </a>
                <a
                  href="#vr-games"
                  className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.25em] text-white"
                >
                  Explore Experiences
                </a>
              </motion.div>
            </div>
            <motion.div className="flex items-center justify-center" variants={fadeUpVariant}>
              <img
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42be93529f99d85977c16_7.webp"
                alt="VR gaming with motion controllers"
                className="h-[360px] w-full rounded-3xl object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Virtual Gaming Options</p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.12em]">
              Immersive VR Experiences
            </h2>
          </div>
          <a href="/booking" className="text-xs uppercase tracking-[0.2em] text-pink">
            Book Your Experience
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {virtualGameTypes.map((game) => (
            <article
              key={game.title}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition duration-300 hover:border-pink/50"
            >
              <div className="relative overflow-hidden">
                <img src={game.image} alt={game.title} className="h-56 w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="space-y-3 p-6">
                <h3 className="text-lg font-display uppercase tracking-[0.1em] text-white">
                  {game.title}
                </h3>
                <p className="text-sm text-white/70">{game.description}</p>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60 pt-3 border-t border-white/10">
                  <span>{game.category}</span>
                  <span className="text-pink">{game.price}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-white/5">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">About VR Gaming</p>
              <h2 className="font-display text-4xl uppercase tracking-[0.12em]">
                The Future of Interactive Entertainment
              </h2>
              <p className="text-white/70 leading-relaxed">
                Virtual Reality gaming represents the cutting edge of interactive entertainment. Using advanced motion tracking, haptic feedback systems, and photorealistic graphics, VR creates fully immersive experiences where players can interact with digital environments in unprecedented ways. Whether exploring alien worlds, solving complex puzzles, or engaging in competitive sports, VR gaming pushes the boundaries of what's possible in digital entertainment.
              </p>
              <div className="space-y-3">
                <h3 className="text-lg font-display uppercase tracking-[0.1em] text-white">VR Tech Features:</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>✓ Full body motion tracking for natural movement</li>
                  <li>✓ Haptic feedback for realistic physical sensations</li>
                  <li>✓ 6-axis head tracking for immersive perspectives</li>
                  <li>✓ Co-op multiplayer experiences</li>
                </ul>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42be93529f99d85977c16_7.webp",
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bec00e6b7904f2fe546_9.webp",
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdf2e4a11e6d9a282f2_11.webp",
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdc5f950c0d1d312713_6.webp",
              ].map((src, idx) => (
                <div key={src} className="overflow-hidden rounded-2xl border border-white/10 transition duration-300 hover:border-pink/50">
                  <img src={src} alt={`VR gaming area ${idx + 1}`} className="h-44 w-full object-cover transition duration-300 hover:scale-110" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="space-y-4">
              <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">Action & Adventure</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Engage in high-adrenaline missions, explore dangerous terrains, and battle enemies in fully immersive VR combat experiences.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">Multiplayer Arenas</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Compete with friends in arena battles or team up for co-op adventures. Also enjoy traditional gaming at our <a href="/home-3" className="text-pink hover:underline">PS5 gaming zones</a> and <a href="/home-1" className="text-pink hover:underline">professional pool halls</a>.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">Wellness Gaming</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Active VR games that double as full-body workouts. Balance fitness and fun with rhythm games, motion-intensive adventures, and interactive fitness programs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
