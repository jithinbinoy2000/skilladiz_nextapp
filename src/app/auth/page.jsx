"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fadeUpVariant, staggerContainer, initScrollAnimations } from "@/lib/animations";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { Cursor } from "../../components/ui/cursor";

export default function AuthPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    const cleanup = initScrollAnimations(rootRef.current);
    return () => cleanup();
  }, []);

  return (
    <div ref={rootRef} className="text-white bg-black main-wrapper">
      <Cursor/>
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              data-parallax
              src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bb7a6d11cdeba3f637c_7.webp"
              alt="Account"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="relative flex flex-col items-center w-full max-w-6xl px-6 mx-auto text-center py-28">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Account</p>
            <h1 className="mt-6 font-display text-5xl uppercase tracking-[0.18em] sm:text-6xl">
              Login or Register
            </h1>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="w-full max-w-5xl px-6 mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-8 lg:grid-cols-2"
            >
              <motion.div variants={fadeUpVariant}>
                <LoginForm />
              </motion.div>
              <motion.div variants={fadeUpVariant}>
                <RegisterForm />
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
