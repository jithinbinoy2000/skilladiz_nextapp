"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  fadeUpVariant,
  staggerContainer,
  initScrollAnimations,
} from "@/lib/animations";
import Magnet from "@/components/Magnet";
import GridDistortion from "@/components/GridDistortion";
import FillButton from "@/components/ui/FillButton";
import Carousel from "@/components/Carousel";

// Static fallback shown before DB data loads
const DEFAULT_FEATURED_SERVICES = [
  {
    id: null,
    title: "8 Ball Pool",
    category: "Classic Gaming",
    description:
      "Tournament-grade tables, crisp lighting, and pro cues for clean shots and smooth play.",
    duration: 60,
    image: "/vear/67e29cdc0ffb11b522861f7f_Shop-1.jpg",
    bookUrl: "/booking",
  },
  {
    id: null,
    title: "PS5 Arena",
    category: "Console Gaming",
    description:
      "Next-gen PS5 battles on immersive screens with competitive audio and low latency.",
    duration: 60,
    image: "/vear/67e29d2441cc3c17285f6f34_Shop-2.jpg",
    bookUrl: "/booking",
  },
  {
    id: null,
    title: "VR Zone",
    category: "Virtual Reality",
    description:
      "Room-scale adventures and co-op missions with guided setup and premium headsets.",
    duration: 90,
    image: "/vear/67e29d2749e445657d16e43a_Shop-3.jpg",
    bookUrl: "/booking",
  },
];



// Static fallback for "Service List" section — replaced by live tournaments below
const DEFAULT_SERVICE_ROWS = [
  {
    order: "001",
    title: "Upcoming Tournament",
    category: "Esports",
    price: "Register Now",
    description: "",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e27eaed8ecdca4a1a67252_6.webp",
  },
];

const showcases = [
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd5d89b248471ed7355_2.webp",
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd845bd43980da09622_3.webp",
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bbfba94846ccbb1bf89_10.webp",
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdc5f950c0d1d312713_6.webp",
];

const heroStats = [
  { label: "Gaming Stations", value: "40+" },
  { label: "Community Members", value: "30K+" },
  { label: "Weekly Tournaments", value: "12" },
];

const featuredGames = [
  {
    title: "8 Ball Pool",
    category: "Classic Gaming",
    image: "/vear/67e29cdc0ffb11b522861f7f_Shop-1.jpg",
  },
  {
    title: "PS5 Arena",
    category: "Console Gaming",
    image: "/vear/67e29d2441cc3c17285f6f34_Shop-2.jpg",
  },
  {
    title: "VR Zone",
    category: "Virtual Reality",
    image: "/vear/67e29d2749e445657d16e43a_Shop-3.jpg",
  },
  {
    title: "Tournaments",
    category: "Esports",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e27eaed8ecdca4a1a67252_6.webp",
  },
];

const galleryGrid = [
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42be93529f99d85977c16_7.webp",
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bec00e6b7904f2fe546_9.webp",
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdf2e4a11e6d9a282f2_11.webp",
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdc5f950c0d1d312713_6.webp",
];

const testimonials = [
  {
    quote: "Skilladiz is where gaming gets real. The VR zone is insane and the PS5 setups are next level. Best gaming spot in Kerala!",
    name: "Arjun Menon",
    role: "Hardcore Gamer",
  },
  {
    quote: "From 8-ball pool to VR adventures — Skilladiz has it all. We come here every weekend with the crew. Pure vibes!",
    name: "Sneha Rajesh",
    role: "Community Member",
  },
  {
    quote: "Competed in three tournaments here already. The energy is unmatched and the setups are pro-grade. This is the real deal.",
    name: "Rahul Nair",
    role: "Esports Competitor",
  },
];

const plans = [
  {
    name: "Silver",
    price: "₹999",
    duration: "/ Month",
    icon: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d99909cf62606f1317287f_1.webp",
    features: [
      "10% discount on every play slot booking",
      "Earn 10 Skill Streaks per play slot",
      "Redeemable reward points",
      "Access to all gaming zones",
      "Validity: 1 Month"
    ]
  },
  {
    name: "Gold",
    price: "₹2,499",
    duration: "/ 3 Months",
    popular: true,
    icon: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e269e54300766f3a68794d_3.svg",
    features: [
      "12% discount on every play slot booking",
      "Earn 15 Skill Streaks per play slot",
      "Free entry to monthly tournaments",
      "Exclusive community events",
      "Priority support",
      "Validity: 3 Months"
    ]
  },
  {
    name: "Platinum",
    price: "₹7,999",
    duration: "/ Year",
    icon: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e269e5d3426bb4b80bb1c2_2.svg",
    features: [
      "15% discount on every play slot booking",
      "Earn 20 Skill Streaks per play slot",
      "Free Skilladiz exclusive merchandise",
      "Birthday offer: 1 hour free play",
      "Priority booking on weekends & events",
      "Access to VIP gaming perks",
      "Validity: 1 Year"
    ]
  }
];


// ── Helpers ──────────────────────────────────────────────────────────────────

function parseTournamentRows(tournaments) {
  const FALLBACK_IMG =
    "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e27eaed8ecdca4a1a67252_6.webp";
  return tournaments.map((t, i) => ({
    order: String(i + 1).padStart(3, "0"),
    title: t.name,
    category: t.status.replace(/_/g, " "),
    price: t.entry_fee === 0 ? "Free Entry" : `Entry $${Number(t.entry_fee).toFixed(0)}`,
    description: `${t.date} at ${t.time}${t.prize_pool > 0 ? ` · Prize $${Number(t.prize_pool).toFixed(0)}` : ""}`,
    image: t.banner_url || FALLBACK_IMG,
    tournament: t,
  }));
}

function parseGameCards(games) {
  return games
    .filter((g) => g.active_status !== false)
    .slice(0, 8)
    .map((g) => {
      let imgs = [];
      try { imgs = typeof g.image_urls === "string" ? JSON.parse(g.image_urls) : (g.image_urls || []); } catch {}
      return {
        id: g.id,
        title: g.title,
        category: "Gaming Zone",
        description: g.description || "",
        duration: g.duration_minutes,
        image: imgs[0] || "/vear/67e29cdc0ffb11b522861f7f_Shop-1.jpg",
        bookUrl: `/booking/${g.id}`,
      };
    });
}

// ── Gaming Zones Carousel ─────────────────────────────────────────────────────

function GamingZonesCarousel({ services }) {
  const trackRef = useRef(null);

  return (
    <section className="relative py-16 sm:py-20">
      <div className="w-full px-6 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Gaming Zones
            </p>
            <img
              src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d9606476c7cb7cb2c4489c_sonna-arrow-down-right%201.svg"
              alt=""
              className="w-4 h-4"
            />
          </div>
        </div>

        {/* Cards — horizontal scroll on mobile, grid on larger screens */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory pb-4
                     md:grid md:grid-cols-2 md:overflow-x-visible md:snap-none md:pb-0
                     lg:grid-cols-3
                     xl:grid-cols-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((service, i) => (
            <motion.article
              key={service.id ?? service.title}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: Math.min(i * 0.08, 0.3) }}
              className="shrink-0 w-[80vw] sm:w-[45vw] md:w-auto snap-start
                         overflow-hidden rounded-3xl border border-white/10 bg-white/5 flex flex-col"
            >
              {/* Card image */}
              <div className="relative h-56 overflow-hidden shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                {service.duration && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-sm">
                    <svg className="w-3 h-3 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                    </svg>
                    <span className="text-[10px] text-white/70">{service.duration}m</span>
                  </div>
                )}
              </div>

              {/* Card body */}
              <div className="flex flex-col flex-1 p-5 space-y-3">
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                  {service.category}
                </p>
                <h3 className="text-lg font-display uppercase tracking-[0.12em] leading-tight">
                  {service.title}
                </h3>
                {service.description && (
                  <p className="flex-1 font-sans text-sm leading-relaxed text-white/60 line-clamp-2">
                    {service.description}
                  </p>
                )}
                {/* CTA */}
                <div className="flex items-center justify-between gap-3 pt-2 mt-auto">
                  <a
                    href="/about"
                    className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white hover:border-white/40 transition-colors"
                  >
                    Info
                  </a>
                  <a
                    href={service.bookUrl}
                    className="flex-1 rounded-full bg-white px-5 py-2.5 text-center text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Mobile scroll hint */}
        <p className="mt-3 text-xs text-center text-white/20 md:hidden">
          ← Swipe to explore →
        </p>
      </div>
    </section>
  );
}

export default function HomePage() {
  const rootRef = useRef(null);

  // ── Dynamic data ──
  const [serviceRows, setServiceRows] = useState(DEFAULT_SERVICE_ROWS);
  const [featuredServices, setFeaturedServices] = useState(DEFAULT_FEATURED_SERVICES);

  useEffect(() => {
    // Fetch live tournaments → replace Service List section
    fetch("/api/tournaments")
      .then((r) => r.json())
      .then((d) => {
        const rows = d.data || [];
        if (rows.length > 0) setServiceRows(parseTournamentRows(rows));
      })
      .catch(() => {});

    // Fetch live games → replace Gaming Zones section
    fetch("/api/games")
      .then((r) => r.json())
      .then((d) => {
        const rows = d.data || [];
        if (rows.length > 0) setFeaturedServices(parseGameCards(rows));
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const cleanup = initScrollAnimations(rootRef.current);
    return () => cleanup();
  }, []);

  return (
    <div ref={rootRef} className="text-white bg-black main-wrapper">
      <Header />
      <main>
        <section className="relative overflow-hidden bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,51,225,0.15),_transparent_55%)]" />
          <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 sm:px-6 py-8 lg:py-32 lg:grid-cols-[1.1fr_0.9fr]">
            <motion.div
              className="space-y-6 sm:space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                className="text-xs uppercase font-display tracking-[0.4em] text-white/60"
                variants={fadeUpVariant}
              >
                Skilladiz Gaming
              </motion.p>
              <motion.h1
                className="font-display text-3xl uppercase tracking-[.15em] leading-12 sm:leading-20 text-white sm:text-6xl lg:text-6xl"
                variants={fadeUpVariant}
              >
                Experience the Future of Gaming
              </motion.h1>
               <div className="relative w-full border rounded-full min-h-[calc(100vw-30px)] border-white/20 sm:hidden">
                <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_top,_rgba(248,51,225,0.35),_transparent_70%)]" />
                <img
                  src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d2f467d74a011f856f847d_Png-2.webp"
                  alt="VR headset"
                  className="absolute inset-0 object-contain w-full h-full"
                />
              </div>
              <motion.p
                className="max-w-2xl font-sans text-lg leading-[10ev] text-white/70"
                variants={fadeUpVariant}
              >
                Ultimate gaming destination — a premium, high-energy space where passionate gamers, friends, and fun-seekers come together to compete, unwind, and connect. Step in. Level up. This is where your gaming story begins.
              </motion.p>
              <motion.div
                className="flex flex-wrap justify-center gap-4 sm:justify-start"
                variants={fadeUpVariant}
              >
                <a
                  href="/booking"
                  className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.12em] text-black "
                >
                 Reserve Your Arena
                </a>
                <a
                  href="/about"
                  className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.12em] text-white"
                >
                 Inside Skilladiz
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              className="relative items-center justify-center hidden sm:flex"
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
            >
              <Magnet padding={200} disabled={false} magnetStrength={5}>
                  <div className="relative h-[300px] w-[300px] sm:h-[560px] sm:w-[560px] rounded-full border border-white/20">
                <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_top,_rgba(248,51,225,0.35),_transparent_70%)]" />
                <img
                  src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d2f467d74a011f856f847d_Png-2.webp"
                  alt="VR headset"
                  className="absolute inset-0 object-contain w-full h-full"
                />
              </div>
              </Magnet>
            
            </motion.div>
          </div>
        </section>

        {/* ── Stats Row — home-4 inspired ─────────────────────── */}
        <section className="py-10 bg-black">
          <div className="w-full px-4 mx-auto max-w-7xl sm:px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-3"
            >
              {heroStats.map((stat) => (
                <motion.div
                  key={stat.label}
                  variants={fadeUpVariant}
                  className="flex flex-col gap-2 p-6 border rounded-2xl border-white/10 bg-white/5"
                >
                  <div className="text-5xl font-display uppercase tracking-[0.08em]">{stat.value}</div>
                  <p className="text-xs uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <GamingZonesCarousel services={featuredServices} />
     
        <section className="py-10 mx-auto border-y border-white/10 max-w-7xl">
          <div className="w-full px-6 ">
            <div className="overflow-hidden">
              <div className="marquee-track">
                <div className="flex items-center gap-16">
                  <span className="text-xs font-display uppercase sm:tracking-[0.2em] text-white/60 sm:text-4xl">
                    Game Hard. Chill Harder. Play Smart. Win Together. — Skilladiz Gaming Club
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured Games Grid — home-1 inspired ───────────── */}
        <section className="relative py-16 overflow-hidden bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,80,255,0.08),_transparent_60%)]" />
          <div className="w-full px-4 mx-auto max-w-7xl sm:px-6">
            <div className="flex flex-col gap-6 mb-12 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Gaming Zones</p>
                <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.12em]">
                  Choose Your Arena
                </h2>
              </div>
              <p className="max-w-md font-sans text-white/70">
                From classic cue sports to next-gen VR, every zone at Skilladiz is built to deliver peak performance and pure fun.
              </p>
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              className="grid gap-4 md:grid-cols-2"
            >
              {featuredGames.map((game, i) => (
                <motion.article
                  key={game.title}
                  variants={fadeUpVariant}
                  transition={{ delay: i * 0.08 }}
                  className="relative overflow-hidden border group rounded-3xl border-white/10 bg-white/5"
                >
                  <img
                    src={game.image}
                    alt={game.title}
                    className="object-cover w-full h-64 transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute space-y-1 bottom-6 left-6">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/70">{game.category}</p>
                    <h3 className="text-xl font-display uppercase tracking-[0.1em] text-white">{game.title}</h3>
                  </div>
                  <a
                    href="/booking"
                    className="absolute flex items-center justify-center w-10 h-10 transition-opacity duration-300 border rounded-full opacity-0 top-4 right-4 border-white/20 bg-black/50 backdrop-blur-sm group-hover:opacity-100"
                    aria-label={`Book ${game.title}`}
                  >
                    <img
                      src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                      alt=""
                      className="w-4 h-4"
                    />
                  </a>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="relative py-16 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top-right,_rgba(120,80,255,0.10),_transparent_55%)]" />
          <div className="w-full px-6 mx-auto max-w-7xl">
            <div className="flex items-center gap-3 mb-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                Service List
              </p>
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
              className="divide-y divide-white/10 border-y border-white/10"
            >
              {serviceRows.map((service) => (
                <motion.article
                  key={service.title}
                  variants={fadeUpVariant}
                  data-reveal
                  className="group grid items-center gap-6 py-10 lg:grid-cols-[220px_1fr_160px]"
                >
                  <div className="relative w-full overflow-hidden border h-44 rounded-2xl border-white/10">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="object-cover w-full h-full transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50">
                      <span>{service.order}</span>
                      <span className="w-10 h-px bg-white/20" />
                      <span>{service.category}</span>
                    </div>
                    <h3 className="text-2xl font-display uppercase tracking-[0.12em]">
                      {service.title}
                    </h3>
                    <p className="max-w-2xl font-sans text-base text-white/70">
                      {service.description || "Join the action. Compete for glory at Skilladiz Gaming Arena."}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
                    <div className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.25em]">
                      {service.price}
                    </div>
                    <a
                      href="/booking"
                      className="flex items-center justify-center w-12 h-12 transition-colors border rounded-full border-white/20 hover:bg-white/10"
                    >
                      <img
                        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                        alt=""
                        className="w-4 h-4"
                      />
                    </a>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
        
<section className="relative py-20 overflow-hidden bg-black">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom-left,_rgba(248,51,225,0.10),_transparent_55%)]" />
  <div className="w-full px-4 mx-auto max-w-7xl sm:px-6">
    <div className="flex items-center gap-3 mb-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">
               Our Philosophy
              </p>
              <img
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d9606476c7cb7cb2c4489c_sonna-arrow-down-right%201.svg"
                alt=""
                className="w-4 h-4"
              />
            </div>
    <div className="grid grid-cols-1 gap-2 py-10 sm:grid-cols-2 lg:grid-cols-4 border-y border-white/10">
      {[
  {
    step: "01",
    title: "IMMERSION",
    desc: "Designing spaces where players stay fully engaged, focused, and energized while experiencing games in a truly authentic atmosphere.",
    button: "Inside Skilladiz",
    url: "/about"
  },
  {
    step: "02",
    title: "EXPLORATION",
    desc: "Bringing together diverse gaming experiences, from classic cue sports to modern consoles and virtual reality adventures.",
    button: "Explore Games",
    url: "/games"
  },
  {
    step: "03",
    title: "INTERACTION",
    desc: "Creating a community where gamers connect, compete, and share meaningful moments that extend beyond individual play.",
    button: "Our Community",
    url: "/community"
  },
  {
    step: "04",
    title: "SIMULATION",
    desc: "Adopting advanced gaming technologies that deliver realism, creativity, and innovation to elevate everyday play experiences.",
    button: "VR Experience",
    url: "/vr-zone"
  }
]


.map((item, idx) => (
        <div key={idx} className="grid grid-rows-[auto_auto_1fr_auto] gap-4
 border-l ps-6 first:ps-0 first:border-l-0 border-white/10">
          <h2 className="text-2xl font-display uppercase tracking-[0.12em]">
            {item.title}
          </h2>
          <p className="text-xs uppercase text-white/90">{item.step}</p>
          <p className="text-base  tracking-[.05em] text-white/70 font-sans">{item.desc}</p>
          <a
            href="/contact"
            className="flex items-center gap-2 mt-2 text-xs uppercase tracking-[0.25em] text-white"
          >
           <div className="flex items-center justify-center w-10 h-10 border rounded-full border-white/20">
                        <img
                          src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                          alt=""
                          className="w-3 h-3"
                        />
                      </div>
       {item.button}
          </a>
        </div>
      ))}
    </div>
  </div>
</section>

<section className="relative min-h-screen sm:min-h-[850px] overflow-hidden">

  {/* GridDistortion — full background */}
  <div className="absolute inset-0 z-0 w-full h-full pb-20">
    <GridDistortion
      imageSrc="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e27eaed8ecdca4a1a67252_6.webp"
      grid={10}
      mouse={0.1}
      strength={0.15}
      relaxation={0.9}
      className="object-contain w-full h-full mx-auto opacity-50"
    />
  </div>

  {/* Dark overlay */}
  {/* <div className="absolute inset-0 z-10 bg-black/70 backdrop-blur-lg" /> */}
  {/* Dark overlay — pointer-events-none lets mouse through to GridDistortion */}
<div className="absolute inset-0 z-10 pointer-events-none bg-black/20 backdrop-blur-sm" />

  {/* Content */}
  <div className="relative z-20 w-full px-4 py-1 mx-auto pointer-events-none sm:py-40 sm:px-6 max-w-7xl">
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">

      {/* Left column */}
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.35em] text-white/60">
          Elevate Your Game
        </p>
        <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
          Step Into the Ultimate Gaming Lifestyle.
        </h2>
        <p className="max-w-xl font-sans text-xl text-white/70">
          Skilladiz was designed for those who demand more than just a gaming session. With a futuristic interior, premium equipment at every station, and a community-driven atmosphere that welcomes everyone — from casual players to hardcore competitors — Skilladiz is the gaming lifestyle upgrade you've been waiting for.
        </p>
        <div className="flex flex-wrap gap-3">
          {showcases.map((image) => (
            <div
              key={image}
              className="h-20 overflow-hidden border w-30 rounded-xl border-white/10"
            >
              <img
                src={image}
                alt="Showcase"
                className="object-cover w-full h-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right column */}
      <div className="relative overflow-hidden border rounded-3xl border-white/10 h-full min-h-[240px] aspect-video">
        <img
          data-parallax
          src="https://res.cloudinary.com/jerrick/image/upload/v1764906826/6932574a991b82001d403a51.jpg"
          alt="Immersion"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 p-4 bg-black">
        <p className="text-xs uppercase tracking-[0.35em] text-white/60">
          Elevate Your Game
        </p>
        <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
          Step Into the Ultimate Gaming Lifestyle.
        </h2>
          
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>

    </div>
  </div>

</section>

        <section className="relative py-20 overflow-hidden bg-black">
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,51,225,0.12),_transparent_50%)]" />
  <div className="w-full px-6 mx-auto max-w-7xl">

    {/* Section label */}
    <div className="flex items-center gap-3 mb-10">
      <p className="text-xs uppercase tracking-[0.35em] text-white/60">
        Membership Plans
      </p>
      <img
        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d9606476c7cb7cb2c4489c_sonna-arrow-down-right%201.svg"
        alt=""
        className="w-4 h-4"
      />
    </div>

    {/* Cards grid — Philosophy style */}
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="grid grid-cols-1 gap-2 py-10 sm:grid-cols-2 lg:grid-cols-3 border-y border-white/10"
    >
      {plans.map((plan, idx) => (
        <motion.div
          key={plan.name}
          variants={fadeUpVariant}
          className="grid grid-rows-[auto_auto_1fr_auto] gap-4 border-l ps-6 first:ps-0 first:border-l-0 border-white/10 relative group aspect-[2/2.5]"
        >
          {/* Title */}
          <h2 className="text-2xl font-display uppercase tracking-[0.12em]">
            {plan.name}
          </h2>

          {/* Icon + price */}
          <div className="flex items-center gap-3">
            <img src={plan.icon} alt="" className="w-10 h-10" />
            <p className="text-sm text-white/70">{plan.price} {plan.duration}</p>
          </div>

          {/* Description */}
          <p className="text-base tracking-[.05em] text-white z-50">
            {plan.planDescription}
          </p>

          {/* Features */}
          <ul className="grid gap-3 mb-2 text-white/70">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-4">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70 shrink-0 font-sans text-sm" />
                {feature}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <a
            href="/membership"
            className="flex items-center gap-2 mt-2 text-xs uppercase tracking-[0.25em] text-white"
          >
            <div className="flex items-center justify-center w-10 h-10 border rounded-full border-white/20 shrink-0">
              <img
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                alt=""
                className="w-3 h-3"
              />
            </div>
            View {plan.name}
          </a>
        </motion.div>
      ))}
    </motion.div>

  </div>
</section>


<section className="relative py-24 mb-20 overflow-hidden bg-black">

  {/* Background gradient waves */}
  <div className="absolute inset-0 z-0 opacity-70">
    <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[140px]" />
    <div className="absolute bottom-[-200px] left-[-200px] w-[700px] h-[700px] rounded-full bg-pink-600/20 blur-[140px]" />
    
      <img
        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d447af45bd43980dba892c_Png-02.webp"
        alt="VR Players"
        className="absolute right-0 z-0 object-contain w-full max-w-7xl -bottom-40"
      />
  </div>
  <div className="absolute inset-0 z-10 pointer-events-none bg-black/10 backdrop-blur-xs" />
   {/* <div className="absolute right-0 z-0 -bottom-40">


    </div> */}

  <div className="relative z-10 w-full px-6 mx-auto  my-auto max-w-7xl flex justify-center items-center min-h-[calc(100vh-300px)]">

    <div className="grid gap-16 lg:grid-cols-2">

      {/* LEFT CONTENT */}
      <div className="max-w-xl space-y-6">

        <p className="text-xs uppercase tracking-[0.25em] text-white/60">
          Where Imagination Lives
        </p>

        <h2 className="text-3xl leading-tight font-display sm:text-3xl lg:text-3xl">
          Skilladiz is a gateway to a limitless gaming universe where
          <span className="text-white/90"> immersive experiences </span>
          blur the line between play and reality.
        </h2>

      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex flex-col items-end justify-end gap-6 lg:items-end">

        {/* BIG STAT */}
        <div className="text-6xl font-display tracking-[0.12em] sm:text-7xl lg:text-8xl">
          30K+
        </div>

        <p className="max-w-sm font-sans text-base text-white/60 lg:text-right">
          Gamers have already stepped into the Skilladiz world,
          experiencing competitive play, immersive VR adventures,
          and next-level gaming moments.
        </p>

      </div>

    </div>

    {/* IMAGE */}
   

  </div>
</section>

        <section className="pb-20">
          <div className="w-full px-6 mx-auto max-w-7xl">
            <div className="relative overflow-hidden border rounded-3xl border-white/10">
              <img
                data-parallax
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e27eaed8ecdca4a1a67252_6.webp"
                alt="CTA"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/70" />
              <div className="relative flex flex-col gap-6 p-10 sm:p-14">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                  Join the Future
                </p>
                <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
                  Ready to design your next virtual adventure?
                </h2>
                <div className="flex flex-wrap gap-4">
                  {/* <a
                    href="/contact"
                    className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.25em] text-black"
                  >
                    Contact Us
                  </a>
                  <a
                    href="/services"
                    className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.25em] text-white"
                  >
                    Explore More
                  </a> */}
                  <FillButton 
                  href="/contact"
  variant="solid"
                  >
    Contact Us
  </FillButton>

  <FillButton href="/services" variant="ghost">
    Explore More
  </FillButton>
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
