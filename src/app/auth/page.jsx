"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fadeUpVariant, staggerContainer, initScrollAnimations } from "@/lib/animations";

export default function AuthPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const cleanup = initScrollAnimations(rootRef.current);
    return () => cleanup();
  }, []);

  return (
    <div ref={rootRef} className="main-wrapper bg-black text-white">
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              data-parallax
              src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bb7a6d11cdeba3f637c_7.webp"
              alt="Account"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-28 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Account</p>
            <h1 className="mt-6 font-display text-5xl uppercase tracking-[0.18em] sm:text-6xl">
              Login or Register
            </h1>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-5xl px-6">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-8 lg:grid-cols-2"
            >
              <motion.form
                variants={fadeUpVariant}
                className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <h2 className="font-display text-2xl uppercase tracking-[0.12em]">Login</h2>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
                />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
                />
                <button
                  type="submit"
                  className="rounded-full bg-pink px-6 py-3 text-xs uppercase tracking-[0.2em] text-black"
                >
                  Sign In
                </button>
              </motion.form>

              <motion.form
                variants={fadeUpVariant}
                className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <h2 className="font-display text-2xl uppercase tracking-[0.12em]">Register</h2>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
                />
                <input
                  type="password"
                  placeholder="Create password"
                  className="w-full rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
                />
                <button
                  type="submit"
                  className="rounded-full border border-white/20 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white"
                >
                  Create Account
                </button>
              </motion.form>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
