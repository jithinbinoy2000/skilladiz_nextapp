"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { hoverLift } from "@/lib/animations";
import { Menu, User, LogOut, ChevronDown } from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import FillButton from "./ui/FillButton";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Book Now", href: "/booking" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
  { label: "Membership", href: "/membership" },
];

function UserDropdown({ user }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const initial = user?.name?.charAt(0)?.toUpperCase() ?? "U";

  return (
    <div className="relative hidden md:block" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center gap-2 rounded-full border border-white/20 px-3 py-1.5 text-xs uppercase tracking-[0.15em] text-white/80 hover:border-white/40 transition"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-pink-600 text-[11px] font-bold text-white">
          {initial}
        </span>
        <span className="max-w-[100px] truncate">{user?.name}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 overflow-hidden border shadow-xl w-44 rounded-xl border-white/10 bg-black/95 backdrop-blur-xl"
          >
            <div className="px-4 py-3 border-b border-white/10">
              <p className="text-xs font-medium text-white truncate">{user?.name}</p>
              <p className="text-[11px] text-white/50 truncate">{user?.email}</p>
            </div>
            <a
              href="/profile"
              className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-white/70 hover:text-white hover:bg-white/5 transition"
              onClick={() => setOpen(false)}
            >
              <User className="h-3.5 w-3.5" /> My Profile
            </a>
            <button
              onClick={() => signOut({ callbackUrl: "/auth" })}
              className="flex w-full items-center gap-2.5 px-4 py-2.5 text-xs text-white/70 hover:text-pink-400 hover:bg-white/5 transition"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const [cmsIdentity, setCmsIdentity] = useState(null);
  const { data: session } = useSession();

  useEffect(() => {
    fetch("/api/cms/site_identity")
      .then((r) => r.json())
      .then((d) => { if (d.data) setCmsIdentity(d.data.content); })
      .catch(() => {});
  }, []);

  const logoSrc = cmsIdentity?.logo_url || "/logo.jpg";
  const siteName = cmsIdentity?.site_name || "Skilladiz";
  const isLoggedIn = !!session?.user;

  return (
    <header className="sticky top-0 z-50 bg-black/90 backdrop-blur-2xl">
      <div className="flex items-center justify-between w-full px-6 py-4 mx-auto max-w-375">
        <a href="/" className="flex items-center gap-3">
          <img
            src={logoSrc}
            alt={siteName}
            className="w-auto h-10 sm:h-15"
          />
        </a>

        <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.12em] md:flex">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="transition text-white/80 hover:text-white font-display"
              whileHover={hoverLift.whileHover}
            >
              {link.label}
            </motion.a>
          ))}
        </nav>

        {isLoggedIn ? (
          <UserDropdown user={session.user} />
        ) : (
          <FillButton
          fillColor="#ffffff"
                    idleTextColor="rgba(255,255,255,0.8)"
                    filledTextColor="#000000"
                    borderColor="rgba(255,255,255,0.3)"
            href="/auth"
            className="hidden items-center gap-3 rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] text-white md:flex"
            // whileHover={hoverLift.whileHover}
          >
            Login
          </FillButton>
        )}

        <button
          type="button"
          className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/80 md:hidden font-display"
          onClick={() => setOpen((prev) => !prev)}
        >
          <Menu className="w-6 h-6"/>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 0% 0%)" }}
            animate={{ clipPath: "circle(150% at 0% 0%)" }}
            exit={{ clipPath: "circle(0% at 0% 0%)" }}
            transition={{
              type: "spring",
              stiffness: 120,
              damping: 20,
              mass: 1,
            }}
            className="absolute font-display top-0 left-0 w-full h-screen px-6 py-6 border-t max-w-[calc(100vw-100px)] border-white/10 bg-black md:hidden backdrop-blur-xl"
          >
            <div className="flex flex-col gap-6 font-light uppercase tracking-[0.12em] px-5 py-15">
              {navLinks.map((link) => (
                <a key={link.label} href={link.href} className="text-base text-white/80 font-display">
                  {link.label}
                </a>
              ))}
              {isLoggedIn ? (
                <>
                  <a href="/profile" className="text-base text-white/80 font-display">My Profile</a>
                  <button
                    onClick={() => signOut({ callbackUrl: "/auth" })}
                    className="text-base text-left text-pink-400 font-display"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <a href="/auth" className="text-base text-white/80 font-display">Login</a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
