"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

const portfolioItems = [
  {
    title: "Virtual Events & Meetings",
    category: "Business",
    price: "from $144",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b1170e6281fac083a2f_7.jpg",
  },
  {
    title: "Interactive VR Showcases",
    category: "Experiences",
    price: "from $55",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b2081a078cb7da1c157_11.jpg",
  },
  {
    title: "VR-Powered Digital Twins",
    category: "Innovation",
    price: "from $120",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b43a0e72a3c574e43ba_Blog-1.jpg",
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
                Explore the Future
              </motion.p>
              <motion.h1
                className="font-display text-5xl uppercase tracking-[0.15em] sm:text-6xl"
                variants={fadeUpVariant}
              >
                VR Experiences for Modern Brands
              </motion.h1>
              <motion.p className="max-w-xl text-lg text-white/70" variants={fadeUpVariant}>
                Launch immersive showcases, virtual events, and interactive brand worlds that
                keep your audience captivated.
              </motion.p>
            </div>
            <motion.div className="flex items-center justify-center" variants={fadeUpVariant}>
              <img
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42be93529f99d85977c16_7.webp"
                alt="VR Experience"
                className="h-[360px] w-full rounded-3xl object-cover"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Latest Portfolio</p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.12em]">
              Virtual Projects
            </h2>
          </div>
          <a href="/" className="text-xs uppercase tracking-[0.2em] text-pink">
            Explore All Services
          </a>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {portfolioItems.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <div className="relative">
                <img src={item.image} alt={item.title} className="h-56 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="space-y-3 p-6">
                <h3 className="text-lg font-display uppercase tracking-[0.1em] text-white">
                  {item.title}
                </h3>
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.2em] text-white/60">
                  <span>{item.category}</span>
                  <span>{item.price}</span>
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
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Virtual Reality Awaits</p>
              <h2 className="font-display text-4xl uppercase tracking-[0.12em]">
                Experience VR Like Never Before
              </h2>
              <p className="text-white/70">
                From breathtaking virtual landscapes to hyper-realistic simulations, Vear redefines
                what is possible.
              </p>
              <a
                href="tel:9778241440"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-pink"
              >
                Call for a Virtual Adventure
                <span className="h-px w-12 bg-pink" />
              </a>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42be93529f99d85977c16_7.webp",
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bec00e6b7904f2fe546_9.webp",
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdf2e4a11e6d9a282f2_11.webp",
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdc5f950c0d1d312713_6.webp",
              ].map((src) => (
                <div key={src} className="overflow-hidden rounded-2xl border border-white/10">
                  <img src={src} alt="VR" className="h-44 w-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
