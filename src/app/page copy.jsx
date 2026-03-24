"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  fadeUpVariant,
  staggerContainer,
  initScrollAnimations,
} from "@/lib/animations";
import Magnet from "@/components/Magnet";
import Hyperspeed from "@/components/HyperSpeedPresets";
import GridDistortion from "@/components/GridDistortion";

const heroStats = [
  { label: "Gaming Stations", value: "40+" },
  { label: "Community Members", value: "30K+" },
  { label: "Weekly Tournaments", value: "12" },
];


const featuredServices = [
  {
    title: "8 Ball Pool",
    category: "Classic Gaming",
    description:
      "Tournament-grade tables, smooth cloth, and pro cues for crisp shots and satisfying finishes.",
    image:
      "/vear/67e29cdc0ffb11b522861f7f_Shop-1.jpg",
    buttons: [
      {
        name: "Info",
        url: "/games/8-ball-pool-snooker"
      },
      {
        name: "Reserve Table",
        url: "/book/8-ball-pool-snooker"
      }
    ]
  },
  {
    title: "PS5 Arena",
    category: "Console Gaming",
    description:
      "Next-gen PS5 battles on immersive screens with competitive audio and low-latency controllers.",
    image:
      "/vear/67e29d2441cc3c17285f6f34_Shop-2.jpg",
    buttons: [
      {
        name: "Info",
        url: "/games/ps5-arena"
      },
      {
        name: "Reserve Slot",
        url: "/book/ps5-arena"
      }
    ]
  },
  {
    title: "VR Zone",
    category: "Virtual Reality",
    description:
      "Full-body motion and room-scale adventures with curated titles for first-timers and veterans.",
    image:
      "/vear/67e29d2749e445657d16e43a_Shop-3.jpg",
    buttons: [
      {
        name: "Info",
        url: "/games/vr-zone"
      },
      {
        name: "Reserve VR",
        url: "/book/vr-zone"
      }
    ]
  },
];



const serviceRows = [
  {
    order: "001",
    title: "Immersive VR Arena",
    category: "Virtual Reality",
    price: "from INR 499",
    description:
      "Step into co-op and competitive VR with curated titles, guided setup, and premium headsets.",
    image:
      "/vear/67d41b02c7c9e886d6fdec74_6.jpg",
  },
  {
    order: "002",
    title: "PS5 Championship Pods",
    category: "Console Gaming",
    price: "from INR 299",
    description:
      "High-fidelity PS5 stations with competitive seating, crisp audio, and curated game libraries.",
    image:
      "/vear/67d41b1170e6281fac083a2f_7.jpg",
  },
  {
    order: "003",
    title: "8 Ball Pool & Snooker",
    category: "Classic Gaming",
    price: "from INR 199",
    description:
      "Pro tables, smooth cloth, and clean lighting for serious practice and relaxed hangouts.",
    image:
      "/vear/67d41b2081a078cb7da1c157_11.jpg",
  },
  {
    order: "004",
    title: "Party & Group Bookings",
    category: "Community",
    price: "from INR 1499",
    description:
      "Celebrate birthdays and team nights with custom sessions, hosts, and curated playlists.",
    image:
      "/vear/67d41b43a0e72a3c574e43ba_Blog-1.jpg",
  },
  {
    order: "005",
    title: "Weekly Tournaments",
    category: "Competitive",
    price: "from INR 149",
    description:
      "Bracketed showdowns with live leaderboards, prizes, and a community cheering you on.",
    image:
      "/vear/67e29f0ab5c415744620eb23_Shop-4.jpg",
  },
  {
    order: "006",
    title: "Members-Only Perks",
    category: "Membership",
    price: "from INR 999",
    description:
      "Priority booking, discounts on sessions, and early access to new games and events.",
    image:
      "/vear/67e29d25c9a52cf400a6bdec_Shop-5.jpg",
  },
];

const showcases = [
  "/vear/67e29d2617ba0575513e3255_Shop-6.jpg",
  "/vear/67e2a94391bcf1c8e63fdae4_Shop-7.jpg",
  "/vear/67e29f0ab5c415744620eb23_Shop-4.jpg",
  "/vear/67e29d25c9a52cf400a6bdec_Shop-5.jpg",
];

const testimonials = [
  {
    quote:
      "SkilladizX nails the vibe. The PS5 pods are unreal, and the community nights are always electric.",
    name: "Aarav Mathew",
    role: "Tournament Regular",
  },
  {
    quote:
      "Best pool setup in town. The lighting, tables, and music make every game feel premium.",
    name: "Sneha Nair",
    role: "Snooker Enthusiast",
  },
  {
    quote:
      "Took my friends for VR and ended up staying all evening. Seamless booking and great staff.",
    name: "Kiran Joseph",
    role: "Weekend Warrior",
  },
];

const pricingTeaser = [
  {
    name: "Starter",
    price: "$19.99",
    icon: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d99909cf62606f1317287f_1.webp",
  },
  {
    name: "Professional",
    price: "$49.99",
    icon: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e269e54300766f3a68794d_3.svg",
  },
  {
    name: "Enterprise",
    price: "$79.99",
    icon: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e269e5d3426bb4b80bb1c2_2.svg",
  },
];
const plans = [
  {
    name: "Silver",
    price: "INR 999",
    duration: "/ Month",
    icon: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d99909cf62606f1317287f_1.webp",
    description:
      "Best for casual players who want steady discounts and rewards.",
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
    price: "INR 2,499",
    duration: "/ 3 Months",
    popular: true,
    icon: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e269e54300766f3a68794d_3.svg",
    description:
      "Level up with bigger savings, priority access, and special events.",
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
    price: "INR 7,999",
    duration: "/ Year",
    icon: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e269e5d3426bb4b80bb1c2_2.svg",
    description:
      "The ultimate membership with VIP perks and premium access.",
    features: [
      "15% discount on every play slot booking",
      "Earn 20 Skill Streaks per play slot",
      "Free SkilladizX exclusive merchandise",
      "Birthday offer: 1 hour free play",
      "Priority booking on weekends & events",
      "Access to VIP gaming perks",
      "Validity: 1 Year"
    ]
  }
];


const planDescription =
  "Perfect for individuals and beginners stepping into premium gaming. Get a taste of immersive sessions with essential perks.";

const planFeatures = [
  "Access to core gaming experiences",
  "Standard session slots",
  "Member community access",
  "Priority support",
];

export default function Home4Page() {
  const rootRef = useRef(null);

  useEffect(() => {
    const cleanup = initScrollAnimations(rootRef.current);
    return () => cleanup();
  }, []);

  return (
    <div ref={rootRef} className="text-white bg-black main-wrapper">
      <Header />
      <main>
        {/* <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              data-parallax
              src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42b9377921d8b4a813cbe_4.webp"
              alt="Home 4"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="relative flex flex-col w-full max-w-6xl gap-8 px-6 mx-auto py-28">
            <div className="max-w-3xl space-y-6">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">Home 4</p>
              <h1 className="font-display text-5xl uppercase tracking-[0.18em] sm:text-6xl">
                The Ultimate Vear Experience
              </h1>
              <p className="text-lg text-white/70">
                A compiled journey across Home 1, Home 2, and Home 3 to showcase the full spectrum of
                Vear's immersive vision.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/services"
                  className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.25em] text-black"
                >
                  Explore Services
                </a>
                <a
                  href="/contact"
                  className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.25em] text-white"
                >
                  Start a Project
                </a>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {heroStats.map((stat) => (
                <div key={stat.label} className="p-6 border rounded-2xl border-white/10 bg-white/5">
                  <div className="text-3xl font-display uppercase tracking-[0.12em]">{stat.value}</div>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section> */}
        <section className="relative overflow-hidden bg-black">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,51,225,0.18),_transparent_55%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,_rgba(255,255,255,0.03),_transparent_55%)]" />
          <div className="mx-auto grid w-full max-w-[1400px] gap-12 px-6 py-24 lg:py-32 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              className="space-y-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.p
                className="text-xs uppercase tracking-[0.4em] text-white/60 font-body"
                variants={fadeUpVariant}
              >
                SkilladizX Gaming Club
              </motion.p>
              <motion.h1
                className="font-display text-3xl uppercase tracking-[.15em] leading-tight text-white sm:text-6xl lg:text-7xl"
                variants={fadeUpVariant}
              >
                Play Bigger. Connect Deeper. Win Together.
              </motion.h1>
              <motion.p
                className="max-w-2xl text-lg text-white/70 font-body"
                variants={fadeUpVariant}
              >
                A premium, high-energy gaming lounge where friends, rivals, and communities come together to compete, unwind, and celebrate the win. Step in. Level up. This is where your gaming story begins.
              </motion.p>
              <motion.div
                className="flex flex-wrap gap-4"
                variants={fadeUpVariant}
              >
                <a
                  href="/contact"
                  className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.25em] text-black"
                >
                  Reserve Your Arena
                </a>
                <a
                  href="/services"
                  className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.25em] text-white"
                >
                  Explore the Club
                </a>
              </motion.div>
              <motion.div
                className="grid gap-4 pt-6 sm:grid-cols-3"
                variants={fadeUpVariant}
              >
                {heroStats.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4"
                  >
                    <div className="text-2xl font-display uppercase tracking-[0.12em]">
                      {stat.value}
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/60 font-body">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              className="relative flex items-center justify-center"
              variants={fadeUpVariant}
              initial="hidden"
              animate="visible"
            >
              <Magnet padding={200} disabled={false} magnetStrength={5}>
                <div className="relative h-[360px] w-[360px] sm:h-[460px] sm:w-[460px] rounded-full border border-white/20 bg-white/5">
                  <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_top,_rgba(248,51,225,0.35),_transparent_70%)]" />
                  <div className="absolute -top-8 right-8 h-20 w-20 rounded-full bg-white/10 blur-xl" />
                  <img
                    src="/vear/67d41b2081a078cb7da1c157_11.jpg"
                    alt="SkilladizX hero"
                    className="absolute inset-0 object-cover w-full h-full rounded-full"
                  />
                </div>
              </Magnet>
            
            </motion.div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="w-full px-6 mx-auto max-w-[1400px]">
            <div className="flex items-center gap-3 mb-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60 font-body">
               Gaming Zones
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
              className="grid gap-6 md:grid-cols-3"
            >
              {featuredServices.map((service) => (
                <motion.article
                  key={service.title}
                  variants={fadeUpVariant}
                  className="overflow-hidden border rounded-3xl border-white/10 bg-white/5 transition duration-300 hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="relative overflow-hidden h-72">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="p-6 space-y-3">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60 font-body">
                      {service.category}
                    </p>
                    <h3 className="text-xl font-display uppercase tracking-[0.12em]">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/70 font-body">
                      {service.description}
                    </p>
                    <motion.div
                      className="flex flex-wrap items-center justify-end gap-4 mt-5"
                      variants={fadeUpVariant}
                    >
                      <a
                        href={service.buttons[0].url}
                        className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.25em] text-white"
                      >
                        {service.buttons[0].name}
                      </a>
                      <a
                        href={service.buttons[1].url}
                        className="rounded-full bg-white px-6 py-3 text-xs tracking-[0.25em] uppercase text-black"
                      >
                        {service.buttons[1].name}
                      </a>
                    </motion.div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
     
        <section className="py-10 mx-auto border-y border-white/10 max-w-[1400px]">
          <div className="w-full px-6 ">
            <div className="overflow-hidden">
              <div className="marquee-track">
                {/* {Array.from({ length: 60 }).map((_, idx) => ( */}
                {/* key={idx} */}
                  <div  className="flex items-center gap-16"> 
                    {/* {Array.from({ length: 60 }).map((_, wordIdx) => ( */}
                      <span
                        // key={`${idx}-${wordIdx}`}
                        className="text-3xl font-display uppercase tracking-[0.2em] text-white/60 sm:text-4xl"
                      >
                        Game Hard. Chill Harder. Play Smart. Win Together. — SkilladizX Gaming Club
                      </span>
                    {/* ))} */}
                  </div>
                {/* // ))} */}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="w-full px-6 mx-auto max-w-[1400px]">
            <div className="flex items-center gap-3 mb-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60 font-body">
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
                    <p className="max-w-2xl text-sm text-white/70 font-body">
                      {service.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
                    <div className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.25em]">
                      {service.price}
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 border rounded-full border-white/20">
                      <img
                        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                        alt=""
                        className="w-4 h-4"
                      />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
        
<section className="py-20 bg-black">
  <div className="w-full px-6 mx-auto max-w-[1400px]">
    <div className="flex items-center gap-3 mb-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60 font-body">
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
    button: "Inside SkilladizX",
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
        <div
          key={idx}
          className="grid grid-rows-[auto_auto_1fr_auto] gap-4 border-l ps-6 first:ps-0 first:border-l-0 border-white/10"
        >
          <h2 className="text-2xl sm:text-2xl font-display uppercase tracking-[0.12em]">
            {item.title}
          </h2>
          <div className="w-60 h-60"></div>
          <p className="text-xs uppercase text-white/90">{item.step}</p>
          <p className="text-base tracking-[.05em] text-white/70 font-body">{item.desc}</p>
          <a
            href={item.url}
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

<section className="relative min-h-[650px] overflow-hidden">

  {/* GridDistortion — full background */}
  <div className="absolute inset-0 z-0 w-full h-full pb-20">
    <GridDistortion
      imageSrc="/vear/67e29d2617ba0575513e3255_Shop-6.jpg"
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
  <div className="relative z-20 w-full px-6 py-20 mx-auto pointer-events-none max-w-[1400px]">
    <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">

      {/* Left column */}
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.35em] text-white/60 font-body">
          Elevate Your Game
        </p>
        <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
          Step Into the Ultimate Gaming Lifestyle.
        </h2>
        <div className="text-base text-white/70 font-body">
         <p>SkilladizX was built for players who want more than just a session. With a futuristic interior, premium hardware at every station, and a community-driven vibe that welcomes everyone — from casual players to hardcore competitors — this is the gaming lifestyle upgrade you've been waiting for.</p>
          <br/>
          <p className="pt-5">Dive into 8-ball pool, snooker, immersive VR adventures, PlayStation battles, and a selection of classic games — all under one stylish, high-tech roof in the heart of Kerala. This isn't just where you play. This is where you belong.</p>
        </div>
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
          src="/vear/67d41b43a0e72a3c574e43ba_Blog-1.jpg"
          alt="SkilladizX Lounge"
          className="absolute inset-0 object-cover w-full h-full"
        />
        <div className="absolute bottom-0 left-0 p-4 bg-black">
        <p className="text-xs uppercase tracking-[0.35em] text-white/60 font-body">
          Kerala's Premium Gaming Lounge
        </p>
        <h2 className="text-2xl font-display uppercase tracking-[0.12em] sm:text-3xl">
          Built for champions and weekend heroes.
        </h2>
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>

    </div>
  </div>

</section>

        {/* <section className="pb-16 sm:pb-20">
          <div className="w-full mx-auto max-w-[1400px]">
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
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-4 lg:grid-cols-4"
            >
              {plans.map((plan) => (
                <motion.article
                  key={plan.name}
                  variants={fadeUpVariant}
                  data-reveal
                  className="relative p-5 overflow-hidden border group rounded-3xl border-white/10 bg-white/5 aspect-square"
                >
                  <div className="absolute inset-0 transition duration-300 opacity-0 group-hover:opacity-100">
                    <div className="absolute top-0 w-32 h-32 rounded-full -left-10 bg-pink/20 blur-2xl" />
                    <div className="absolute bottom-0 w-32 h-32 rounded-full -right-10 bg-white/10 blur-2xl" />
                  </div>
                  <div className="relative space-y-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={plan.icon} alt="" className="w-10 h-10" />
                        <div>
                          <h3 className="text-base font-display uppercase tracking-[0.12em]">
                            {plan.name}
                          </h3>
                          <p className="text-sm text-white/70">
                            {plan.price}/month
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center w-10 h-10 border rounded-full border-white/20">
                        <img
                          src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                          alt=""
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <p className="text-base text-white/70">{planDescription}</p>
                    <ul className="grid gap-3 text-xs text-white/70">
                      {planFeatures.map((feature) => (
                        <li key={feature} className="flex items-center gap-4">
                          <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section> */}  
        <section className="py-20 bg-black">
  <div className="w-full px-6 mx-auto max-w-[1400px]">

    {/* Section label */}
    <div className="flex items-center gap-3 mb-10">
      <p className="text-xs uppercase tracking-[0.35em] text-white/60 font-body">
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
          className="grid grid-rows-[auto_auto_1fr_auto] gap-4 border-l ps-6 first:ps-0 first:border-l-0 border-white/10 relative group  aspect-[2/2.5]"
        >
          {/* <div className="absolute inset-0 transition duration-300 opacity-0 group-hover:opacity-100">
                    <div className="absolute top-0 rounded-full h-30 w-30 -left-10 bg-pink/20 blur-2xl" />
                    <div className="absolute bottom-0 rounded-full h-30 w-30 -right-10 bg-white/10 blur-2xl" />
                  </div> */}
          {/* Title */}
          <h2 className="text-2xl font-display uppercase tracking-[0.12em]">
            {plan.name}
          </h2>

          {/* Icon + price */}
          <div className="flex items-center gap-3">
            <img src={plan.icon} alt="" className="w-10 h-10" />
            <p className="text-sm text-white/70 font-body">
              {plan.price}
              {plan.duration}
            </p>
          </div>

          {/* Step number */}
          {/* <p className="text-xs uppercase text-white/90">
            {String(idx + 1).padStart(2, '0')}
          </p> */}

          {/* Description */}
          <p className="text-base tracking-[.05em] text-white z-50 font-body">
            {plan.description}
          </p>

          {/* Features */}
          <ul className="grid gap-3 mb-2 text-xs text-white/70 font-body">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-4">
                <span className="h-1.5 w-1.5 rounded-full bg-white/70 shrink-0" />
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

        {/* <section className="pb-20">
            <div className="relative overflow-hidden max-h-[900px]">
              <img
                data-parallax
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d447af45bd43980dba892c_Png-02.webp"
                alt="SkilladizX CTA"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/70" />
              <div className="relative flex flex-col gap-6 p-10 sm:p-14">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60 font-body">
                  Book Your Session
                </p>
                <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
                  Ready for a night of legendary play?
                </h2>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="/contact"
                    className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.25em] text-black"
                  >
                    Book Now
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
        </section> */}

<section className="relative py-24 mb-20 overflow-hidden bg-black">

  {/* Background gradient waves */}
  <div className="absolute inset-0 z-0 opacity-70">
    <div className="absolute top-[-200px] right-[-200px] w-[700px] h-[700px] rounded-full bg-purple-600/20 blur-[140px]" />
    <div className="absolute bottom-[-200px] left-[-200px] w-[700px] h-[700px] rounded-full bg-pink-600/20 blur-[140px]" />
    
      <img
        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d447af45bd43980dba892c_Png-02.webp"
        alt="VR Players"
        className="absolute z-0 object-contain w-full mx-auto translate-x-[1/2] max-w-[1400px] -bottom-40"
      />
  </div>
  <div className="absolute inset-0 z-10 pointer-events-none bg-black/10 backdrop-blur-xs" />
   {/* <div className="absolute right-0 z-0 -bottom-40">


    </div> */}

  <div className="relative z-10 w-full px-6 mx-auto max-w-[1400px]">

    <div className="grid gap-16 lg:grid-cols-2">

      {/* LEFT CONTENT */}
      <div className="max-w-xl space-y-6">

        <p className="text-xs uppercase tracking-[0.25em] text-white/60 font-body">
          Where Imagination Lives
        </p>

        <h2 className="text-3xl leading-tight font-display sm:text-4xl lg:text-3xl">
          SkilladizX is a gateway to a limitless gaming universe where
          <span className="text-white/90"> immersive experiences </span>
          blur the line between play and reality.
        </h2>
        <div className="w-90 h-90"></div>
        

      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex flex-col items-end justify-end gap-6 lg:items-end">

        {/* BIG STAT */}
        <div className="text-6xl font-display tracking-[0.12em] sm:text-7xl lg:text-8xl">
          30K+
        </div>

        <p className="max-w-sm text-sm text-white/60 lg:text-right font-body">
          Gamers have already stepped into the SkilladizX world,
          experiencing competitive play, immersive VR adventures,
          and next-level gaming moments.
        </p>

      </div>

    </div>

    {/* IMAGE */}
   

  </div>
</section>

        <section className="pb-20">
          <div className="w-full px-6 mx-auto max-w-[1400px]">
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
                  Book Your Session
                </p>
                <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
                  Ready for a night of legendary play?
                </h2>
                <div className="flex flex-wrap gap-4">
                  <a
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





