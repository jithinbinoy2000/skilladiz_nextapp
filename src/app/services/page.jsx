"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fadeUpVariant, staggerContainer, initScrollAnimations } from "@/lib/animations";

const services = [
  {
    order: "001",
    title: "Immersive VR Experiences",
    price: "from $130",
    category: "Innovation",
    image:
      "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41848629d00d518f6ff31_1",
  },
  {
    order: "002",
    title: "Virtual 360deg Environments",
    price: "from $85",
    category: "Business",
    image:
      "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41adf70e6281fac07dc19_4",
  },
  {
    order: "003",
    title: "VR Training & Simulations",
    price: "from $155",
    category: "Experiences",
    image:
      "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41aef5a2c5039c962accc_5",
  },
  {
    order: "004",
    title: "Next-Gen Virtual Tourism",
    price: "from $98",
    category: "Technology",
    image:
      "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b02c7c9e886d6fdec74_6",
  },
  {
    order: "005",
    title: "Virtual Events & Meetings",
    price: "from $144",
    category: "Business",
    image:
      "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b1170e6281fac083a2f_7",
  },
  {
    order: "006",
    title: "Interactive VR Showcases",
    price: "from $55",
    category: "Experiences",
    image:
      "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b2081a078cb7da1c157_11",
  },
  {
    order: "007",
    title: "VR-Powered Digital Twins",
    price: "from $120",
    category: "Innovation",
    image:
      "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b43a0e72a3c574e43ba_Blog-1",
  },
  {
    order: "008",
    title: "AI-Enhanced VR Systems",
    price: "from $220",
    category: "Technology",
    image:
      "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b4f9a911f70acfdcc49_Blog-2",
  },
];

const description =
  "At Vear, we don't just offer virtual reality services - we redefine them. Our cutting-edge solutions transport users beyond screens, creating immersive, interactive, and hyper-realistic digital environments.";

export default function ServicesPage() {
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
              src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42b9377921d8b4a813cbe_4.webp"
              alt="VR Services"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/65" />
          </div>
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-28 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Immersive Worlds</p>
            <h1 className="mt-6 font-display text-5xl uppercase tracking-[0.18em] sm:text-6xl">
              VR Services
            </h1>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 lg:sticky lg:top-28 lg:self-start">
                <div className="relative h-full min-h-[320px] overflow-hidden rounded-3xl">
                  <img
                    data-parallax
                    src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41848629d00d518f6ff31_1"
                    alt="Immersive VR"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 space-y-4 p-6">
                  <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.25em] text-white/70">
                    {services.slice(0, 4).map((service) => (
                      <span
                        key={service.title}
                        className="rounded-full border border-white/20 px-3 py-1"
                      >
                        {service.category}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-display uppercase tracking-[0.15em]">
                    Digital Reality Services
                  </h2>
                  <p className="text-sm text-white/70">{description}</p>
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white"
                  >
                    Touch the Future
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                      <img
                        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                        alt=""
                        className="h-4 w-4"
                      />
                    </span>
                  </a>
                </div>
              </div>

              <div className="space-y-6">
                {services.slice(0, 4).map((service) => (
                  <motion.article
                    key={service.title}
                    variants={fadeUpVariant}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    data-reveal
                    className="flex items-center justify-between gap-6 rounded-3xl border border-white/10 bg-white/5 p-6"
                  >
                    <div>
                      <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/50">
                        <span>{service.order}</span>
                        <span className="h-px w-10 bg-white/20" />
                        <span>{service.category}</span>
                      </div>
                      <h3 className="mt-3 text-xl font-display uppercase tracking-[0.12em]">
                        {service.title}
                      </h3>
                    </div>
                    <div className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.25em]">
                      {service.price}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="vr-services" className="py-8 sm:py-12">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-10 flex items-center gap-3">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Immersive Worlds</p>
              <img
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d9606476c7cb7cb2c4489c_sonna-arrow-down-right%201.svg"
                alt=""
                className="h-4 w-4"
              />
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="divide-y divide-white/10 border-y border-white/10"
            >
              {services.map((service) => (
                <motion.article
                  key={service.title}
                  variants={fadeUpVariant}
                  data-reveal
                  className="group grid items-center gap-6 py-10 lg:grid-cols-[220px_1fr_160px]"
                >
                  <div className="relative h-44 w-full overflow-hidden rounded-2xl border border-white/10">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50">
                      <span>{service.order}</span>
                      <span className="h-px w-10 bg-white/20" />
                      <span>{service.category}</span>
                    </div>
                    <h3 className="text-2xl font-display uppercase tracking-[0.12em]">
                      {service.title}
                    </h3>
                    <p className="max-w-2xl text-sm text-white/70">{description}</p>
                  </div>

                  <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
                    <div className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.25em]">
                      {service.price}
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20">
                      <img
                        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                        alt=""
                        className="h-4 w-4"
                      />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="border-y border-white/10 py-10">
          <div className="mx-auto w-full max-w-6xl px-6">
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

        <section className="py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
                  Immerse yourself in something unreal!
                </h2>
                <p className="text-sm text-white/70">
                  We break the boundaries of reality Vear transforms your imagination into reality. Ready to
                  enter the future? The next dimension is waiting for you.
                </p>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white"
                >
                  Try to Virtual Worlds
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
                    <img
                      src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                      alt=""
                      className="h-4 w-4"
                    />
                  </span>
                </a>
              </div>
              <div className="flex justify-center">
                <div className="relative h-64 w-64 sm:h-72 sm:w-72">
                  <div className="absolute inset-0 animate-[spin_20s_linear_infinite] rounded-full border border-white/20" />
                  <div className="absolute inset-5 overflow-hidden rounded-full">
                    <img
                      src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd5d89b248471ed7355_2.webp"
                      alt="Immersion"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute inset-16 overflow-hidden rounded-full">
                    <img
                      src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdf2e4a11e6d9a282f2_11.webp"
                      alt="Immersion"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-6 right-0 rounded-full border border-white/20 bg-black/70 px-4 py-2 text-xs uppercase tracking-[0.25em]">
                    001 / 004
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <img
                  data-parallax
                  src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42b9377921d8b4a813cbe_4.webp"
                  alt="Gallery"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <img
                  data-parallax
                  src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bb7a6d11cdeba3f637c_7.webp"
                  alt="Gallery"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/35" />
                <div className="absolute bottom-6 right-6 max-w-xs rounded-2xl border border-white/20 bg-black/70 p-5">
                  <div className="flex items-center gap-2">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <img
                        key={idx}
                        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67dd232308abbf8bd8fd3328_Star.webp"
                        alt=""
                        className="h-4 w-4"
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-sm text-white/80">
                    "Vear redefined my virtual experience. Stunning visuals, smooth performance, and endless
                    possibilities."
                  </p>
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

