"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

const serviceCards = [
  {
    title: "Virtual 360deg Environments",
    category: "Business",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41adf70e6281fac07dc19_4",
  },
  {
    title: "Interactive VR Showcases",
    category: "Experiences",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b2081a078cb7da1c157_11.jpg",
  },
  {
    title: "VR-Powered Digital Twins",
    category: "Innovation",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b43a0e72a3c574e43ba_Blog-1.jpg",
  },
  {
    title: "Virtual Events & Meetings",
    category: "Business",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b1170e6281fac083a2f_7.jpg",
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
              Unlimited Dimensions
            </motion.p>
            <motion.h1
              className="font-display text-5xl uppercase tracking-[0.18em] sm:text-6xl"
              variants={fadeUpVariant}
            >
              Experience the Future Now
            </motion.h1>
            <motion.p className="mx-auto max-w-2xl text-lg text-white/70" variants={fadeUpVariant}>
              Join millions of users worldwide and step into the future of immersive virtual
              environments, crafted for business, entertainment, and education.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-6 py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {serviceCards.map((card) => (
            <article
              key={card.title}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <div className="relative">
                <img src={card.image} alt={card.title} className="h-60 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              </div>
              <div className="space-y-2 p-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/60">{card.category}</p>
                <h3 className="text-xl font-display uppercase tracking-[0.1em] text-white">
                  {card.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden bg-white/5">
        <div className="mx-auto w-full max-w-7xl px-6 py-20">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-6">
              <h2 className="font-display text-4xl uppercase tracking-[0.12em]">
                Experience the Future Now with VR
              </h2>
              <p className="text-white/70">
                At Vear, we push the boundaries of reality with ultra-low latency, seamless
                immersion, and thousands of virtual environments.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bbfba94846ccbb1bf89_10.webp",
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42b967cf935bf787300ac_7.webp",
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bec00e6b7904f2fe546_9.webp",
                "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdf2e4a11e6d9a282f2_11.webp",
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
