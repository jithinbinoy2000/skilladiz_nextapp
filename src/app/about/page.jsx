"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fadeUpVariant, staggerContainer, initScrollAnimations } from "@/lib/animations";

const values = [
  {
    title: "Immersive Design",
    text: "We craft multi-sensory digital worlds that blur the line between physical and virtual.",
  },
  {
    title: "Human-Centered",
    text: "Every experience is built to feel intuitive, inclusive, and emotionally resonant.",
  },
  {
    title: "Future-Ready",
    text: "We prototype and deploy VR systems that scale with evolving tech and audiences.",
  },
];

const team = [
  {
    name: "Avery Morgan",
    role: "Creative Director",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e25130f161daff25d19636_Team-1.webp",
  },
  {
    name: "Jordan Lee",
    role: "Lead Technologist",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e251362ceb42725e7218d2_Team-5.webp",
  },
  {
    name: "Maya Patel",
    role: "Experience Producer",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e25137094645914fd15b54_Team-2.webp",
  },
  {
    name: "Noah Carter",
    role: "VR Strategist",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e25137b93f637b96941d4b_Team-3.webp",
  },
];

export default function AboutPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const cleanup = initScrollAnimations(rootRef.current);
    return () => cleanup();
  }, []);

  return (
    <div ref={rootRef} className="text-white bg-black main-wrapper">
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              data-parallax
              src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdc5f950c0d1d312713_6.webp"
              alt="About"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="relative flex flex-col w-full max-w-6xl gap-6 px-6 mx-auto text-center py-28">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">About Our Gaming Hub</p>
            <h1 className="font-display text-5xl uppercase tracking-[0.18em] sm:text-6xl">
              Premier Gaming Destination
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-white/70">
              We combine classic billiards, cutting-edge VR technology, and next-generation PS5 gaming to create the ultimate entertainment experience where players of all levels come together to compete, connect, and level up.
            </p>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="w-full max-w-6xl px-6 mx-auto">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Our Mission</p>
                <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
                  Three Gaming Disciplines, One Premium Destination
                </h2>
                <p className="text-sm text-white/70">
                  We bring together pool gaming, VR experiences, and PS5 esports in one world-class facility. Our mission is to provide professional-grade equipment, expert community support, and competitive opportunities that elevate every player's experience.
                </p>
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="p-5 text-center border rounded-2xl border-white/10 bg-white/5">
                    <div className="text-2xl font-display uppercase tracking-[0.12em]">3</div>
                    <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/60">Gaming Types</p>
                  </div>
                  <div className="p-5 text-center border rounded-2xl border-white/10 bg-white/5">
                    <div className="text-2xl font-display uppercase tracking-[0.12em]">30K+</div>
                    <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/60">Active Players</p>
                  </div>
                  <div className="p-5 text-center border rounded-2xl border-white/10 bg-white/5">
                    <div className="text-2xl font-display uppercase tracking-[0.12em]">Weekly</div>
                    <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/60">Tournaments</p>
                  </div>
                </div>
              </div>
              <div className="relative overflow-hidden border rounded-3xl border-white/10">
                <img
                  data-parallax
                  src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdf2e4a11e6d9a282f2_11.webp"
                  alt="Mission"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="w-full max-w-6xl px-6 mx-auto">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Gaming Offerings</p>
                <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
                  Where Every Gamer Belongs
                </h2>
                <p className="text-sm text-white/70">
                  Explore our three dedicated gaming zones, each crafted with professional standards and passionate communities. From strategic pool play to immersive virtual worlds and intense console battles.
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="p-5 border rounded-2xl border-white/10 bg-white/5" data-reveal>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60">01</p>
                    <h3 className="mt-3 text-lg font-display uppercase tracking-[0.12em]">
                      <a href="/home-1" className="text-pink hover:underline">Pool Gaming</a>
                    </h3>
                    <p className="mt-2 text-sm text-white/70">
                      Tournament-grade 8-ball and 9-ball tables with professional equipment.
                    </p>
                  </div>
                  <div className="p-5 border rounded-2xl border-white/10 bg-white/5" data-reveal>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60">02</p>
                    <h3 className="mt-3 text-lg font-display uppercase tracking-[0.12em]">
                      <a href="/home-2" className="text-pink hover:underline">VR Gaming</a>
                    </h3>
                    <p className="mt-2 text-sm text-white/70">
                      Immersive full-body VR experiences with motion tracking and multiplayer missions.
                    </p>
                  </div>
                  <div className="p-5 border rounded-2xl border-white/10 bg-white/5" data-reveal>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60">03</p>
                    <h3 className="mt-3 text-lg font-display uppercase tracking-[0.12em]">
                      <a href="/home-3" className="text-pink hover:underline">PS5 Gaming</a>
                    </h3>
                    <p className="mt-2 text-sm text-white/70">
                      Next-gen console gaming with competitive tournaments and esports leagues.
                    </p>
                  </div>
                  <div className="p-5 border rounded-2xl border-white/10 bg-white/5" data-reveal>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60">04</p>
                    <h3 className="mt-3 text-lg font-display uppercase tracking-[0.12em]">
                      <a href="/home-4" className="text-pink hover:underline">Full Hub</a>
                    </h3>
                    <p className="mt-2 text-sm text-white/70">
                      Complete gaming destination with all three disciplines under one roof.
                    </p>
                  </div>
                </div>
              </div>
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="relative overflow-hidden border rounded-3xl border-white/10">
                  <img
                    data-parallax
                    src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd845bd43980da09622_3.webp"
                    alt="Experience"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="relative overflow-hidden border rounded-3xl border-white/10">
                  <img
                    data-parallax
                    src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdf2e4a11e6d9a282f2_11.webp"
                    alt="Experience"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/30" />
                </div>
                <div className="relative overflow-hidden border rounded-3xl border-white/10 sm:col-span-2">
                  <img
                    data-parallax
                    src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e27eaed8ecdca4a1a67252_6.webp"
                    alt="Experience"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute inset-0 bg-black/35" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="w-full max-w-6xl px-6 mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Core Values</p>
              <img
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d9606476c7cb7cb2c4489c_sonna-arrow-down-right%201.svg"
                alt=""
                className="w-4 h-4"
              />
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-6 md:grid-cols-3"
            >
              {values.map((value) => (
                <motion.article
                  key={value.title}
                  variants={fadeUpVariant}
                  className="p-6 border rounded-3xl border-white/10 bg-white/5"
                >
                  <h3 className="text-xl font-display uppercase tracking-[0.12em]">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm text-white/70">{value.text}</p>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section id="team" className="py-16">
          <div className="w-full max-w-6xl px-6 mx-auto">
            <div className="flex items-center gap-3 mb-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Our Team</p>
              <img
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d9606476c7cb7cb2c4489c_sonna-arrow-down-right%201.svg"
                alt=""
                className="w-4 h-4"
              />
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="border rounded-3xl border-white/10 bg-white/5">
                  <div className="h-56 overflow-hidden rounded-3xl">
                    <img src={member.image} alt={member.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="p-5 space-y-2">
                    <h4 className="text-lg font-display uppercase tracking-[0.12em]">
                      {member.name}
                    </h4>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="w-full max-w-6xl px-6 mx-auto">
            <div className="relative overflow-hidden border rounded-3xl border-white/10">
              <img
                data-parallax
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e27eaed8ecdca4a1a67252_6.webp"
                alt="CTA"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/70" />
              <div className="relative flex flex-col gap-6 p-10 sm:p-14">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Join Us</p>
                <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
                  Ready to build your next immersive world?
                </h2>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/contact"
                    className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.25em] text-black"
                  >
                    Contact Vear
                  </a>
                  <a
                    href="/services"
                    className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.25em] text-white"
                  >
                    Explore Services
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
