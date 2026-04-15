"use client";

import { useEffect, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { initScrollAnimations } from "@/lib/animations";
import { Cursor } from "../../components/ui/cursor";

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
    <div ref={rootRef} className="text-white bg-black main-wrapper">
      <Cursor/>
      <Header />
      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              data-parallax
              src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bb7a6d11cdeba3f637c_7.webp"
              alt="Terms"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black/75" />
          </div>
          <div className="relative flex flex-col w-full max-w-5xl gap-4 px-6 py-24 mx-auto text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">Legal</p>
            <h1 className="font-display text-4xl uppercase tracking-[0.18em] sm:text-5xl">
              Terms & Conditions
            </h1>
            <p className="max-w-2xl mx-auto text-sm text-white/70">
              Please read these terms carefully before using Vear's experiences and services.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="w-full max-w-5xl px-6 mx-auto">
            <div className="space-y-8">
              {sections.map((section) => (
                <div key={section.title} className="p-8 border rounded-3xl border-white/10 bg-white/5">
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
