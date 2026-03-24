"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { initScrollAnimations } from "@/lib/animations";

const sections = [
  {
    title: "Overview",
    body:
      "These Terms and Conditions govern your access to Vear experiences, products, and services. By using our platform, you agree to comply with the policies below.",
  },
  {
    title: "Usage Rights",
    body:
      "Vear grants you a limited, non-exclusive license to access our VR content for personal or approved business use. You may not copy, resell, or distribute proprietary assets without written consent.",
  },
  {
    title: "Payments",
    body:
      "Subscription fees and service packages are billed according to the plan you select. All pricing is listed in USD and may be updated with prior notice.",
  },
  {
    title: "Content Ownership",
    body:
      "All experiences, visuals, and platform assets remain the intellectual property of Vear or its partners. Custom client assets remain the property of the client unless otherwise specified.",
  },
  {
    title: "Limitation of Liability",
    body:
      "Vear is not liable for indirect or incidental damages arising from use of the platform. VR experiences should be used responsibly and according to safety guidance.",
  },
];

export default function TermsPage() {
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
              alt="Terms"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/75" />
          </div>
          <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-4 px-6 py-24 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Legal</p>
            <h1 className="font-display text-4xl uppercase tracking-[0.18em] sm:text-5xl">
              Terms & Conditions
            </h1>
            <p className="mx-auto max-w-2xl text-sm text-white/70">
              Please read these terms carefully before using Vear's experiences and services.
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
