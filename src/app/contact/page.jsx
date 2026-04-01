"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { fadeUpVariant, staggerContainer, initScrollAnimations } from "@/lib/animations";

const faqs = [
  {
    title: "Pricing",
    question: "Do you offer discounts for long-term subscriptions?",
    answer:
      "Yes, we provide discounts for users who opt for long-term subscriptions. The longer the commitment, the greater the discount. A yearly subscription will offer significant savings compared to a monthly plan.",
  },
  {
    title: "Process",
    question: "How is new content updated and released on Vear?",
    answer:
      "Vear continuously updates its content through regular software releases. This includes new virtual environments, games, and educational tools. We collaborate with creators to bring fresh experiences every month.",
  },
  {
    title: "Support",
    question: "How can I manage my Vear subscription or account?",
    answer:
      "To manage your Vear subscription, log into your account and view plan details, upgrade or downgrade, or change payment methods. Our support team is always available to assist with inquiries.",
  },
];

const testimonials = [
  {
    quote:
      "Vear is setting a new standard in VR. The attention to detail and performance make it one of the best platforms I've used!",
    name: "Maya Mitchell",
    role: "CEO at TechNova",
    avatarClass: "bg-[url('https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e251362ceb42725e7218d2_Team-5.webp')]",
  },
  {
    quote:
      "Vear takes virtual gaming to another level. The realism and excitement of stepping into new worlds is a must for any VR fan!",
    name: "Olivia Johnson",
    role: "Founder at InnX",
    avatarClass: "bg-[url('https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e25137094645914fd15b54_Team-2.webp')]",
  },
  {
    quote:
      "Vear isn't just another VR platform - it's the future of digital interaction. The smooth user experience makes it VR at its finest!",
    name: "Harper Anderson",
    role: "Director at BrightAds",
    avatarClass: "bg-[url('https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67e25130f161daff25d19636_Team-1.webp')]",
  },
];

export default function ContactPage() {
  const rootRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

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
              src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdc5f950c0d1d312713_6.webp"
              alt="Contact Us"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-28 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Contact</p>
            <h1 className="mt-6 font-display text-5xl uppercase tracking-[0.18em] sm:text-6xl">
              Contact Us
            </h1>
          </div>
        </section>

        <section className="py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-6">
            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
              <motion.div
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-6"
              >
                <p className="text-xs uppercase tracking-[0.35em] text-white/60">Get in touch</p>
                <h2 className="text-3xl font-display uppercase tracking-[0.12em]">
                  Let's build your next immersive world.
                </h2>
                <p className="text-sm text-white/70">
                  Tell us about your project and our VR experts will help you craft a future-ready
                  experience.
                </p>
                <div className="grid gap-6 text-sm text-white/70 sm:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">Email</p>
                    <p className="mt-2">hello@vear.io</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">Phone</p>
                    <p className="mt-2">9778241440</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">Studio</p>
                    <p className="mt-2">San Francisco, CA</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-white/50">Hours</p>
                    <p className="mt-2">Mon - Fri, 9am - 6pm</p>
                  </div>
                </div>
              </motion.div>

              <motion.form
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                className="space-y-5 rounded-3xl border border-white/10 bg-white/5 p-8"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="First name"
                    className="w-full rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
                  />
                  <input
                    type="text"
                    placeholder="Last name"
                    className="w-full rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
                />
                <input
                  type="tel"
                  placeholder="9778241440"
                  className="w-full rounded-full border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
                />
                <textarea
                  rows={5}
                  placeholder="Your message"
                  className="w-full rounded-3xl border border-white/20 bg-transparent px-4 py-3 text-sm text-white placeholder:text-white/40"
                />
                <button
                  type="submit"
                  className="rounded-full bg-pink px-6 py-3 text-xs uppercase tracking-[0.2em] text-black"
                >
                  Send Message
                </button>
              </motion.form>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto w-full max-w-5xl px-6">
            <div className="mb-8 flex items-center gap-3">
              <p className="text-xs uppercase tracking-[0.35em] text-white/60">Frequent Questions</p>
              <img
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d9606476c7cb7cb2c4489c_sonna-arrow-down-right%201.svg"
                alt=""
                className="h-4 w-4"
              />
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div
                  key={faq.question}
                  className="rounded-2xl border border-white/10 bg-white/5"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(idx === openIndex ? -1 : idx)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-white/50">{faq.title}</p>
                      <p className="mt-2 text-sm text-white/80">{faq.question}</p>
                    </div>
                    <span className="text-xl text-white/70">{openIndex === idx ? "-" : "+"}</span>
                  </button>
                  {openIndex === idx && (
                    <div className="px-6 pb-6 text-sm text-white/70">{faq.answer}</div>
                  )}
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
                alt="Reviews"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
              <div className="relative grid gap-8 p-10 lg:grid-cols-3">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.name} className="space-y-6">
                    <p className="text-lg text-white/90">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <div
                        className={`h-12 w-12 rounded-full bg-cover bg-center ${testimonial.avatarClass}`}
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                        <p className="text-xs text-white/60">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

