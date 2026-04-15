"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { initScrollAnimations } from "@/lib/animations";
import Hero from "@/components/index/Hero";
import ChooseArenaSection from "@/components/index/ChooseArenaSection";
import FinalCTASection from "@/components/index/FinalCTASection";
import GamingZonesCarousel from "@/components/index/GamingZonesCarousel";
import HeroStatsSection from "@/components/index/HeroStatsSection";
import ImaginationSection from "@/components/index/ImaginationSection";
import LifestyleSection from "@/components/index/LifestyleSection";
import MarqueeSection from "@/components/index/MarqueeSection";
import MembershipPlansSection from "@/components/index/MembershipPlansSection";
import PhilosophySection from "@/components/index/PhilosophySection";
import TournamentsSection from "@/components/index/TournamentsSection";
import { Cursor } from "../components/ui/cursor";

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
      try { imgs = typeof g.image_urls === "string" ? JSON.parse(g.image_urls) : (g.image_urls || []); } catch { }
      return {
        id: g.id,
        title: g.title,
        category: "Gaming Zone",
        description: g.description || "",
        duration: g.duration_minutes,
        image: imgs[0] || "/vear/67e29cdc0ffb11b522861f7f_Shop-1.jpg",
        bookUrl: `/booking/${g.id}`,
        redirectUrl: g.redirect_url || "/"
      };
    });
}

export default function HomePage() {
  const rootRef = useRef(null);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Skilladiz Gaming Club",
        url: siteUrl,
        logo: `${siteUrl}/logo.jpg`,
        sameAs: [],
      },
      {
        "@type": "WebSite",
        name: "Skilladiz Gaming Club",
        url: siteUrl,
      },
      {
        "@type": "WebPage",
        name: "Skilladiz Gaming Club | Where Skill Meets Chill",
        url: siteUrl,
        isPartOf: { "@type": "WebSite", url: siteUrl },
      },
    ],
  };

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
      .catch(() => { });

    // Fetch live games → replace Gaming Zones section
    fetch("/api/games")
      .then((r) => r.json())
      .then((d) => {
        const rows = d.data || [];
        if (rows.length > 0) setFeaturedServices(parseGameCards(rows));
      })
      .catch(() => { });
  }, []);

  useEffect(() => {
    const cleanup = initScrollAnimations(rootRef.current);
    return () => cleanup();
  }, []);

  return (
    <div ref={rootRef} className="text-white bg-black main-wrapper overflow-x-clip">
      <Script
        id="home-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Cursor/>
      <Header />
      <main>
        <Hero />
        <GamingZonesCarousel services={featuredServices} />
        <MarqueeSection />
        <ChooseArenaSection featuredGames={featuredGames} />
        <HeroStatsSection heroStats={heroStats} />
        <TournamentsSection serviceRows={serviceRows} />
        <PhilosophySection />
        <ImaginationSection />
        <MembershipPlansSection plans={plans} />
        <LifestyleSection showcases={showcases} />
        <FinalCTASection />
      </main>
      <Footer />
    </div>
  );
}
