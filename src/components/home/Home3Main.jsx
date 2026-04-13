"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

const ps5Games = [
  {
    title: "Competitive FPS Arena",
    category: "Action Gaming",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41adf70e6281fac07dc19_4",
    description: "Fast-paced first-person shooter tournaments with ultra-low latency and responsive controls."
  },
  {
    title: "Story-Driven Adventures",
    category: "Immersive Gaming",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b2081a078cb7da1c157_11.jpg",
    description: "Cinematic single-player and co-op adventures with stunning graphics and engaging narratives."
  },
  {
    title: "Sports & Racing League",
    category: "Competitive Sports",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b43a0e72a3c574e43ba_Blog-1.jpg",
    description: "High-fidelity racing and sports simulations with leaderboards and competitive events."
  },
  {
    title: "Multiplayer Battle Zones",
    category: "Team Gaming",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b1170e6281fac083a2f_7.jpg",
    description: "Squad-based multiplayer modes with rich environments and dynamic gameplay."
  },
];

export default function Home3Main() {
  return (
    <div>
      <section className="relative overflow-hidden bg-black">
        <div className="mx-auto w-full max-w-7xl px-6 py-24">
          <motion.div
            className="space-y-8 text-center"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="text-xs uppercase tracking-[0.35em] text-white/60" variants={fadeUpVariant}>
              Next-Gen Gaming Power
            </motion.p>
            <motion.h1
              className="font-display text-5xl uppercase tracking-[0.18em] sm:text-6xl"
              variants={fadeUpVariant}
            >
              PS5 Gaming Arena
            </motion.h1>
            <motion.p className="mx-auto max-w-2xl text-lg text-white/70" variants={fadeUpVariant}>
              Experience the raw power of PlayStation 5 gaming. Ultra-fast loading times, stunning 4K graphics, haptic feedback, and adaptive triggers create the most immersive console gaming experience. Join millions in legendary titles and competitive esports.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4 justify-center" variants={fadeUpVariant}>
              <a
                href="/booking"
                className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.25em] text-black"
              >
                Book Gaming Session
              </a>
              <a
                href="#ps5-games"
                className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.25em] text-white"
              >
                View Game Library
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {ps5Games.map((game) => (
            <article
              key={game.title}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 transition duration-300 hover:border-pink/50"
            >
              <div className="relative overflow-hidden">
                <img src={game.image} alt={game.title} className="h-56 lg:h-64 w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>
              <div className="space-y-3 p-5">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">{game.category}</p>
                <h3 className="text-lg font-display uppercase tracking-[0.1em] text-white leading-tight">
                  {game.title}
                </h3>
                <p className="text-xs text-white/60 line-clamp-2">{game.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-white/5">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">PlayStation 5 Technology</p>
              <h2 className="font-display text-4xl uppercase tracking-[0.12em]">
                Experience Next-Generation Gaming
              </h2>
              <p className="text-white/70 leading-relaxed">
                The PlayStation 5 represents the cutting edge of gaming technology. With its custom CPU and GPU, ultra-high-speed SSD, and innovative DualSense controller, the PS5 delivers lightning-fast load times, stunning 4K visuals, and immersive gameplay. Features like haptic feedback and adaptive triggers create tactile sensations that bring you deeper into the action. Ray tracing capabilities deliver photorealistic lighting and reflections, while the Tempest 3D Audio technology surrounds you in dimensional sound.
              </p>
              <div className="space-y-3">
                <h3 className="text-lg font-display uppercase tracking-[0.1em] text-white">Key Features:</h3>
                <ul className="text-white/70 space-y-2 text-sm">
                  <li>✓ Ultra-high-speed SSD for near-instant loading</li>
                  <li>✓ 4K resolution with ray tracing capabilities</li>
                  <li>✓ Haptic feedback for realistic tactile feedback</li>
                  <li>✓ Adaptive triggers for dynamic resistance</li>
                  <li>✓ Tempest 3D Audio for immersive soundscapes</li>
                </ul>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bbfba94846ccbb1bf89_10.webp",
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42b967cf935bf787300ac_7.webp",
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bec00e6b7904f2fe546_9.webp",
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdf2e4a11e6d9a282f2_11.webp",
              ].map((src, idx) => (
                <div key={src} className="overflow-hidden rounded-2xl border border-white/10 transition duration-300 hover:border-pink/50">
                  <img src={src} alt={`PS5 gaming area ${idx + 1}`} className="h-44 w-full object-cover transition duration-300 hover:scale-110" />
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
              <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">Esports Tournaments</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Join competitive PS5 tournaments with live leaderboards, prizes, and the chance to become a gaming champion. Team up or go solo.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">Multi-Gaming Hub</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Beyond PS5, explore our <a href="/home-2" className="text-pink hover:underline">VR gaming zones</a> and <a href="/home-1" className="text-pink hover:underline">elite pool halls</a>. Experience all gaming disciplines under one roof.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="font-display text-2xl uppercase tracking-[0.1em] text-white">Community Events</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                Weekly game nights, seasonal tournaments, and social gaming events. Meet fellow gamers and build lasting connections with the community.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
