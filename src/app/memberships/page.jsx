"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Check, Zap, Tag, Clock } from "lucide-react";
import { Cursor } from "../../components/ui/cursor";

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

function PlanCard({ plan, index }) {
  const discountedPrice =
    plan.is_discount_enabled && Number(plan.discount_rate) > 0
      ? Number(plan.price) * (1 - Number(plan.discount_rate) / 100)
      : null;

  const features = plan.description
    ? plan.description.split("\n").filter(Boolean)
    : [];

  return (
    <motion.article
      variants={fadeUp}
      className="relative flex flex-col p-8 overflow-hidden transition-colors duration-300 border rounded-3xl border-white/10 bg-white/5 group hover:border-white/20"
    >
      {/* Glow effect */}
      <div className="absolute inset-0 transition-opacity duration-500 opacity-0 pointer-events-none group-hover:opacity-100">
        <div className="absolute top-0 w-40 h-40 rounded-full -left-10 bg-pink/20 blur-3xl" />
        <div className="absolute bottom-0 w-40 h-40 rounded-full -right-10 bg-brand-500/20 blur-3xl" />
      </div>

      {/* Discount badge */}
      {plan.is_discount_enabled && Number(plan.discount_rate) > 0 && (
        <div className="absolute flex items-center gap-1 px-3 py-1 text-xs font-medium text-orange-300 rounded-full right-6 top-6 bg-orange-500/20">
          <Tag className="w-3 h-3" />
          {plan.discount_rate}% OFF
        </div>
      )}

      <div className="relative flex-1 space-y-5">
        {/* Plan header */}
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-white/50">Plan</p>
          <h3 className="mt-2 font-display text-2xl uppercase tracking-[0.12em]">
            {plan.name}
          </h3>
          <div className="mt-1 flex items-center gap-1.5 text-white/50">
            <Clock className="h-3.5 w-3.5" />
            <span className="text-xs">{plan.duration_label || `${plan.duration_days} days`}</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          {discountedPrice ? (
            <>
              <span className="text-4xl tracking-tight font-display">
                ₹{discountedPrice.toFixed(0)}
              </span>
              <span className="text-lg line-through text-white/40">₹{Number(plan.price).toFixed(0)}</span>
            </>
          ) : (
            <span className="text-4xl tracking-tight font-display">
              ₹{Number(plan.price).toFixed(0)}
            </span>
          )}
        </div>

        {/* Credits */}
        {Number(plan.credit_points_per_hour) > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 border rounded-xl border-yellow-500/20 bg-yellow-500/10">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-yellow-300">
              {plan.credit_points_per_hour} credit points per hour
            </span>
          </div>
        )}

        {/* Features */}
        {features.length > 0 && (
          <ul className="space-y-2.5">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-white/70">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-400" />
                {f}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CTA */}
      <div className="relative mt-8">
        <a
          href="/booking"
          className="block w-full rounded-xl border border-white/20 bg-white/5 py-3 text-center text-sm font-medium uppercase tracking-[0.2em] text-white transition-colors hover:bg-white/10"
        >
          Get Started
        </a>
      </div>
    </motion.article>
  );
}

export default function MembershipsPage() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/membership-plans")
      .then((r) => r.json())
      .then((d) => setPlans(d.data || []))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="text-white bg-black main-wrapper">
      <Cursor/>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-500/20 via-black to-pink/20" />
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative flex flex-col items-center w-full max-w-6xl px-6 mx-auto text-center py-28">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Membership</p>
            <h1 className="mt-6 font-display text-5xl uppercase tracking-[0.18em] sm:text-6xl">
              Join the Club
            </h1>
            <p className="max-w-xl mt-4 text-white/60">
              Choose a plan that fits your gaming style. Unlock exclusive perks, earn credit points, and play more for less.
            </p>
          </div>
        </section>

        {/* Plans */}
        <section className="py-20">
          <div className="w-full max-w-6xl px-6 mx-auto">
            {loading ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="border h-72 animate-pulse rounded-3xl border-white/10 bg-white/5" />
                ))}
              </div>
            ) : plans.length === 0 ? (
              <div className="py-20 text-center text-white/40">
                No membership plans available yet.
              </div>
            ) : (
              <motion.div
                variants={stagger}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                className={`grid gap-6 ${
                  plans.length === 1 ? "max-w-sm mx-auto" :
                  plans.length === 2 ? "sm:grid-cols-2 max-w-2xl mx-auto" :
                  "sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {plans.map((plan, i) => (
                  <PlanCard key={plan.id} plan={plan} index={i} />
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* CTA banner */}
        <section className="pb-20">
          <div className="w-full max-w-6xl px-6 mx-auto">
            <div className="relative p-10 overflow-hidden text-center border rounded-3xl border-white/10 bg-white/5 lg:p-14">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-500/10 to-pink/10" />
              <div className="relative">
                <p className="text-xs uppercase tracking-[0.35em] text-white/50">Ready to play more?</p>
                <h2 className="mt-4 font-display text-3xl uppercase tracking-[0.12em] sm:text-4xl">
                  Start Your Membership Today
                </h2>
                <p className="max-w-lg mx-auto mt-3 text-white/60">
                  Join hundreds of gamers who save on every session and enjoy exclusive member benefits.
                </p>
                <a
                  href="/auth"
                  className="mt-8 inline-flex items-center gap-3 rounded-xl bg-brand-500 px-8 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-white hover:bg-brand-600 transition-colors"
                >
                  Sign Up Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
