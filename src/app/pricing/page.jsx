"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fadeUpVariant, staggerContainer, initScrollAnimations } from "@/lib/animations";
import { Cursor } from "../../components/ui/cursor";

const plans = [
  {
    name: "Starter Plan",
    price: "$19.99",
    icon: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d99909cf62606f1317287f_1.webp",
  },
  {
    name: "Professional Plan",
    price: "$49.99",
    icon: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e269e54300766f3a68794d_3.svg",
  },
  {
    name: "Enterprise Plan",
    price: "$79.99",
    icon: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e269e5d3426bb4b80bb1c2_2.svg",
  },
];

const planDescription =
  "Perfect for individuals and beginners stepping into the world of VR. Get a taste of immersive technology with essential features.";

const planFeatures = [
  "Access to core VR experiences",
  "Standard graphics quality",
  "Limited cloud storage",
  "Community support",
];

export default function PricingPage() {
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
              src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdc5f950c0d1d312713_6.webp"
              alt="Vear Plans"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/65" />
          </div>
          <div className="relative flex flex-col items-center w-full max-w-6xl px-6 mx-auto text-center py-28">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Pricing</p>
            <h1 className="mt-6 font-display text-5xl uppercase tracking-[0.18em] sm:text-6xl">
              Vear Plans
            </h1>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="w-full max-w-6xl px-6 mx-auto">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-8 lg:grid-cols-3"
            >
              {plans.map((plan) => (
                <motion.article
                  key={plan.name}
                  variants={fadeUpVariant}
                  data-reveal
                  className="relative p-8 overflow-hidden border group rounded-3xl border-white/10 bg-white/5"
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
                          <h3 className="text-lg font-display uppercase tracking-[0.12em]">
                            {plan.name}
                          </h3>
                          <p className="text-sm text-white/70">{plan.price}/month</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-center w-12 h-12 border rounded-full border-white/20">
                        <img
                          src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                          alt=""
                          className="w-4 h-4"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-white/70">{planDescription}</p>
                    <ul className="grid gap-2 text-sm text-white/70">
                      {planFeatures.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
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
        </section>

        <section className="pb-20">
          <div className="w-full max-w-6xl px-6 mx-auto">
            <div className="relative p-10 overflow-hidden border rounded-3xl border-white/10 bg-white/5 lg:p-14">
              <div
                data-parallax
                className="absolute inset-0 bg-[url('https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e27eaed8ecdca4a1a67252_6.webp')] bg-cover bg-center opacity-20"
              />
              <div className="relative grid gap-10 lg:grid-cols-[220px_1fr]">
                <div className="items-center justify-center hidden lg:flex">
                  <div className="relative w-40 h-40">
                    <div className="absolute inset-0 animate-[spin_18s_linear_infinite] rounded-full border border-white/20" />
                    <div className="absolute overflow-hidden rounded-full inset-3">
                      <img
                        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd845bd43980da09622_3.webp"
                        alt="Team"
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="absolute overflow-hidden rounded-full inset-10">
                      <img
                        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e25130f161daff25d19636_Team-1.webp"
                        alt="Team"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <p className="text-xs uppercase tracking-[0.35em] text-white/60">
                    Virtual Reality Awaits
                  </p>
                  <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
                    Experience VR Like Never Before - Let's Talk!
                  </h2>
                  <div className="grid gap-6 text-sm text-white/70 md:grid-cols-2">
                    <p>
                      From breathtaking virtual landscapes to hyper-realistic simulations, our platform
                      redefines what's possible. Whether you're exploring distant galaxies or diving into new
                      realities, Vear brings limitless experiences.
                    </p>
                    <p>
                      From breathtaking virtual landscapes to hyper-realistic simulations, our platform
                      redefines what's possible. Whether you're exploring distant galaxies or diving into new
                      realities, Vear brings limitless experiences.
                    </p>
                  </div>
                  <a
                    href="tel:9778241440"
                    className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white"
                  >
                    Call for a Virtual Adventure
                    <span className="inline-flex items-center justify-center w-10 h-10 border rounded-full border-white/20">
                      <img
                        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                        alt=""
                        className="w-4 h-4"
                      />
                    </span>
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
