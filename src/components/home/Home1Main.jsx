"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

const services = [
  {
    title: "Immersive VR Experiences",
    category: "Innovation",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41848629d00d518f6ff31_1",
  },
  {
    title: "Virtual 360deg Environments",
    category: "Business",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41adf70e6281fac07dc19_4",
  },
  {
    title: "VR Training and Simulations",
    category: "Experiences",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41aef5a2c5039c962accc_5",
  },
  {
    title: "Next-Gen Virtual Tourism",
    category: "Technology",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b02c7c9e886d6fdec74_6",
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
              Virtual Reality
            </motion.p>
            <motion.h1
              className="font-display text-5xl uppercase tracking-[0.15em] text-white sm:text-6xl lg:text-7xl"
              variants={fadeUpVariant}
            >
              Experience the Unreal
            </motion.h1>
            <motion.p className="max-w-xl text-lg text-white/70" variants={fadeUpVariant}>
               Ultimate gaming destination — a premium, high-energy space where passionate gamers, friends, and fun-seekers come together to compete, unwind, and connect. Step in. Level up. This is where your gaming story begins.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4" variants={fadeUpVariant}>
              <a
                href="/"
                className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.25em] text-black"
              >
                Touch the Future
              </a>
              <a
                href="/"
                className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.25em] text-white"
              >
                Explore Worlds
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
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d2f467d74a011f856f847d_Png-2.webp"
                alt="VR headset"
                className="absolute inset-0 object-contain w-full h-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full px-6 py-20 mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">Our Services</p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.12em]">
              Virtual Reality Services
            </h2>
          </div>
          <p className="max-w-xl text-white/70">
            From training simulations to immersive tourism, our team crafts personalized VR
            journeys for every industry.
          </p>
        </div>

        <div className="grid gap-6 mt-12 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.title}
              className="relative overflow-hidden border group rounded-3xl border-white/10 bg-white/5"
            >
              <img
                src={service.image}
                alt={service.title}
                className="object-cover w-full h-64 transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute space-y-2 bottom-6 left-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  {service.category}
                </p>
                <h3 className="text-xl font-display uppercase tracking-[0.1em] text-white">
                  {service.title}
                </h3>
              </div>
            </article>
          ))}
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
                        Virtual Reality
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
              Immerse yourself in something unreal
            </h2>
            <p className="text-white/70">
              We break the boundaries of reality. Your imagination becomes a world you can
              explore. The next dimension is waiting for you.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-pink"
            >
              Try Virtual Worlds
              <span className="w-12 h-px bg-pink" />
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {gallery.map((src) => (
              <div key={src} className="overflow-hidden border rounded-2xl border-white/10">
                <img src={src} alt="Gallery" className="object-cover w-full h-40" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white/5">
        <div className="w-full px-6 py-20 mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <p className="text-xs uppercase tracking-[0.3em] text-white/60">Where Imagination Lives</p>
              <p className="text-lg text-white/70">
                Vear is a gateway to a limitless digital universe where 98% hyper-realistic
                environments blur the line between virtual and real.
              </p>
            </div>
            <div className="space-y-4">
              <h3 className="text-5xl text-white font-display">30K+</h3>
              <p className="text-white/70">
                Users have already stepped into the Vear VR world, experiencing mind-blowing
                adventures and next-level interactions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
