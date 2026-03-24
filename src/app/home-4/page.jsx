"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fadeUpVariant, staggerContainer, initScrollAnimations } from "@/lib/animations";

const heroStats = [
  { label: "Immersive Worlds", value: "120+" },
  { label: "Global Partners", value: "48" },
  { label: "VR Experiences", value: "300" },
];

const featuredServices = [
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
    title: "VR Training & Simulations",
    category: "Experiences",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41aef5a2c5039c962accc_5",
  },
];

const serviceRows = [
  {
    order: "001",
    title: "Immersive VR Experiences",
    category: "Innovation",
    price: "from $130",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41848629d00d518f6ff31_1",
  },
  {
    order: "002",
    title: "Virtual 360deg Environments",
    category: "Business",
    price: "from $85",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41adf70e6281fac07dc19_4",
  },
  {
    order: "003",
    title: "VR Training & Simulations",
    category: "Experiences",
    price: "from $155",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41aef5a2c5039c962accc_5",
  },
  {
    order: "004",
    title: "Next-Gen Virtual Tourism",
    category: "Technology",
    price: "from $98",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b02c7c9e886d6fdec74_6",
  },
  {
    order: "005",
    title: "Virtual Events & Meetings",
    category: "Business",
    price: "from $144",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b1170e6281fac083a2f_7",
  },
  {
    order: "006",
    title: "Interactive VR Showcases",
    category: "Experiences",
    price: "from $55",
    image: "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac52f/67d41b2081a078cb7da1c157_11",
  },
];

const showcases = [
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd5d89b248471ed7355_2.webp",
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd845bd43980da09622_3.webp",
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bbfba94846ccbb1bf89_10.webp",
  "https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdc5f950c0d1d312713_6.webp",
];

const testimonials = [
  {
    quote:
      "Vear is setting a new standard in VR. The attention to detail and performance make it one of the best platforms I've used!",
    name: "Maya Mitchell",
    role: "CEO at TechNova",
  },
  {
    quote:
      "The realism and excitement of stepping into new worlds is a must for any VR fan!",
    name: "Olivia Johnson",
    role: "Founder at InnX",
  },
  {
    quote:
      "Vear isn't just another VR platform - it's the future of digital interaction.",
    name: "Harper Anderson",
    role: "Director at BrightAds",
  },
];

const pricingTeaser = [
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

export default function Home4Page() {
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
              alt="Home 4"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-28">
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
                <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="text-3xl font-display uppercase tracking-[0.12em]">{stat.value}</div>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-10 flex items-center gap-3">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Featured Services</p>
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
              className="grid gap-6 md:grid-cols-3"
            >
              {featuredServices.map((service) => (
                <motion.article
                  key={service.title}
                  variants={fadeUpVariant}
                  className="overflow-hidden rounded-3xl border border-white/10 bg-white/5"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="space-y-3 p-6">
                    <p className="text-xs uppercase tracking-[0.25em] text-white/60">{service.category}</p>
                    <h3 className="text-xl font-display uppercase tracking-[0.12em]">
                      {service.title}
                    </h3>
                    <p className="text-sm text-white/70">
                      At Vear, we redefine immersive storytelling with hyper-realistic digital environments.
                    </p>
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
            <div className="mb-10 flex items-center gap-3">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Service List</p>
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
              {serviceRows.map((service) => (
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
                    <p className="max-w-2xl text-sm text-white/70">
                      At Vear, we redefine immersive storytelling with hyper-realistic digital environments.
                    </p>
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

        <section className="pb-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-6">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Immersion Layers</p>
                <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
                  Elevate every touchpoint with experiential VR.
                </h2>
                <p className="text-sm text-white/70">
                  Blend training, events, and digital worlds into a single high-impact journey. This
                  section compiles the storytelling from Home 2 and the visual depth of Home 3.
                </p>
                <div className="flex flex-wrap gap-3">
                  {showcases.map((image) => (
                    <div
                      key={image}
                      className="h-16 w-16 overflow-hidden rounded-xl border border-white/10"
                    >
                      <img src={image} alt="Showcase" className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative overflow-hidden rounded-3xl border border-white/10">
                <img
                  data-parallax
                  src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bb7a6d11cdeba3f637c_7.webp"
                  alt="Immersion"
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-10">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Client Voices</p>
              <div className="mt-8 grid gap-8 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.name} className="space-y-4">
                    <p className="text-lg text-white/90">"{testimonial.quote}"</p>
                    <div className="text-xs uppercase tracking-[0.25em] text-white/60">
                      {testimonial.name} * {testimonial.role}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="mb-10 flex items-center gap-3">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Pricing Preview</p>
              <img
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d9606476c7cb7cb2c4489c_sonna-arrow-down-right%201.svg"
                alt=""
                className="h-4 w-4"
              />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {pricingTeaser.map((plan) => (
                <div key={plan.name} className="rounded-3xl border border-white/10 bg-white/5 p-6">
                  <div className="flex items-center gap-3">
                    <img src={plan.icon} alt="" className="h-10 w-10" />
                    <div>
                      <h3 className="text-lg font-display uppercase tracking-[0.12em]">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-white/70">{plan.price}/month</p>
                    </div>
                  </div>
                  <a
                    href="/pricing"
                    className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-white"
                  >
                    View Plans
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20">
                      <img
                        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                        alt=""
                        className="h-3 w-3"
                      />
                    </span>
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10">
              <img
                data-parallax
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e27eaed8ecdca4a1a67252_6.webp"
                alt="CTA"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/70" />
              <div className="relative flex flex-col gap-6 p-10 sm:p-14">
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Join the Future</p>
                <h2 className="text-3xl font-display uppercase tracking-[0.12em] sm:text-4xl">
                  Ready to design your next virtual adventure?
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
