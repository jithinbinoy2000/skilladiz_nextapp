"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavBar } from "@/components/ui/tubelight-navbar";
import { Home, Info, Phone, Star, Trophy, Users } from "lucide-react";
import { ShinyButton } from "@/components/shiny-button";
import { Button } from "@/components/ui/button";


const navItems = [
  { name: "Home", url: "/", icon: Home },
  { name: "About", url: "#about", icon: Info },
  { name: "Membership", url: "#membership", icon: Users },
  // { name: "Tournaments", url: "/tournaments", icon: Trophy },
  // { name: "Reviews", url: "/reviews", icon: Star },
  { name: "Contact", url: "#contact", icon: Phone },
]
function Header() {
  const pathname = usePathname();
  // const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="text-white px-4 sm:px-6 py-4 flex items-center justify-between w-full z-50 relative ">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img src="/logo.jpg" alt="Logo" className="h-10 w-auto" />
      </div>

      {/* Desktop Navigation */}
     <NavBar items={navItems}/>

      {/* Desktop Buttons */}
      {/* <div className="hidden md:flex space-x-4">
        <Link href="/login">
          <Button className="px-6 py-2 text-sm rounded-full bg-red-500">
            Login
          </Button>
        </Link>
        <Link href="/booking  ">
          <Button className="px-6 py-2 text-sm rounded-full bg-red-500">
            Book Slot
          </Button>
        </Link>
      </div> */}

      {/* Hamburger Icon for Mobile */}
      {/* <button
        className="md:hidden text-neon-cyan"
        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ?"X": "M"}
      </button> */}

      {/* Mobile Menu */}
      {/* {isMobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-black shadow-lg border-t border-neutral-800 px-4 py-6 flex flex-col space-y-4 z-40">
          {navItems.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={label}
                href={href}
                className={`text-sm font-medium uppercase tracking-wider transition ${
                  isActive ? "text-neon-cyan" : "text-white hover:text-neon-cyan"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            );
          })}

          <div className="flex flex-col gap-4 mt-4">
            <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
              <ShinyButton className="w-full px-4 py-2 border border-neon-cyan text-neon-cyan rounded hover:bg-neon-cyan hover:text-black transition">
                Login
              </ShinyButton>
            </Link>
            <Link href="/book" onClick={() => setMobileMenuOpen(false)}>
              <button className="w-full px-4 py-2 bg-neon-cyan text-black rounded hover:bg-cyan-400 transition">
                Book Slot
              </button>
            </Link>
          </div>
        </div>
      )} */}

      {/* Neon Styles */}
      <style jsx>{`
        .text-neon-cyan {
          color: #00fff7;
          text-shadow: 0 0 1px #00fff7, 0 0 3px #00fff7;
        }
        .bg-neon-cyan {
          background-color: #00fff7;
          box-shadow: 0 0 1px #00fff7, 0 0 3px #00fff7, 0 0 3px #00fff7;
        }
        .group:hover span:last-child {
          width: 100% !important;
        }
      `}</style>
    </header>
  );
}

export default Header;
