"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { hoverLift } from "@/lib/animations";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Terms", href: "/terms-and-conditions" },
  { label: "Refund", href: "/refund-policy" },
  { label: "Login", href: "/auth" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur">
      <div className="flex items-center justify-between w-full px-6 py-4 mx-auto max-w-7xl">
        <a href="/" className="flex items-center gap-3">
          <img
            // src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d1926f9cc6575b8f4ee4_Logo_2.svg"
            src="/logo.jpg"
            alt="Vear"
            className="w-auto h-15"
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.12em] md:flex">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="transition text-white/80 hover:text-pink"
              whileHover={hoverLift.whileHover}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        <motion.a
          href="/contact"
          className="hidden items-center gap-3 rounded-full border border-white/20 px-5 py-2 text-xs uppercase tracking-[0.2em] text-white md:flex"
          whileHover={hoverLift.whileHover}
        >
          Touch the Future
        </motion.a>

        <button
          type="button"
          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white md:hidden"
          onClick={() => setOpen((prev) => !prev)}
        >
          Menu
        </button>
      </div>

      {open && (
        <div className="absolute top-0 left-0 w-full h-screen px-6 py-6 border-t max-w-[calc(100vw-100px)] border-white/10 bg-black/80 md:hidden backdrop-blur-xl">
          <div className="flex flex-col gap-6 font-light uppercase tracking-[0.12em] px-5 py-10">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="text-lg border border-white text-white/80">
                {link.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
