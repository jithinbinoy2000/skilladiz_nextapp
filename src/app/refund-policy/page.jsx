"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { initScrollAnimations } from "@/lib/animations";

const sections = [
  {
    title: "Eligibility",
    body:
      "Refunds are available for subscription cancellations within 14 days of purchase, provided no premium content or services have been fully delivered.",
  },
  {
    title: "Service Packages",
    body:
      "Custom VR builds and on-site services are non-refundable once production begins. We will work with you to resolve any issues or adjust deliverables where possible.",
  },
  {
    title: "Processing",
    body:
      "Approved refunds are processed within 7 to 10 business days. Refunds return to the original payment method whenever possible.",
  },
  {
    title: "Contact",
    body:
      "To request a refund, email hello@vear.io with your order details and a short description of the issue. Our team will respond within two business days.",
  },
];

export default function RefundPolicyPage() {
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
              src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdc5f950c0d1d312713_6.webp"
              alt="Refund Policy"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/75" />
          </div>
          <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-24 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Legal</p>
            <h1 className="font-display text-4xl uppercase tracking-[0.18em] sm:text-5xl">
              Refund Policy
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-white/70">
              Our commitment is to deliver immersive excellence with clear, transparent refund guidance.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto w-full max-w-5xl px-6">
            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.title} className="rounded-3xl border border-white/10 bg-white/5 p-8">
                  <h2 className="text-xl font-display uppercase tracking-[0.12em]">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-sm text-white/70">{section.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
