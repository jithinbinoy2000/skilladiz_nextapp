"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";
import FillButton from "./ui/FillButton";

const DEFAULT_SOCIAL = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "TikTok", href: "https://www.tiktok.com/" },
  { label: "X", href: "https://x.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
];

const quickLinks = [
  { label: "Who We Are", href: "/about" },
  { label: "Book a Slot", href: "/booking" },
  { label: "Pricing", href: "/pricing" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
  { label: "Refund Policy", href: "/refund-policy" },
];

export default function Footer() {
  const [socialLinks, setSocialLinks] = useState(DEFAULT_SOCIAL);
  const [siteName, setSiteName] = useState("Skilladiz");
  const [copyright, setCopyright] = useState("© Skilladiz. All Rights Reserved.");

  useEffect(() => {
    // Fetch social links from CMS
    fetch("/api/cms/social_links")
      .then((r) => r.json())
      .then((d) => {
        const content = d.data?.content;
        if (!content) return;
        const links = [];
        const map = { instagram: "Instagram", twitter: "X (Twitter)", youtube: "YouTube", discord: "Discord", facebook: "Facebook" };
        for (const [key, label] of Object.entries(map)) {
          if (content[key]) links.push({ label, href: content[key] });
        }
        if (links.length > 0) setSocialLinks(links);
      })
      .catch(() => {});

    // Fetch site identity
    fetch("/api/cms/site_identity")
      .then((r) => r.json())
      .then((d) => {
        const content = d.data?.content;
        if (content?.site_name) setSiteName(content.site_name);
      })
      .catch(() => {});

    // Fetch footer CMS
    fetch("/api/cms/footer")
      .then((r) => r.json())
      .then((d) => {
        const content = d.data?.content;
        if (content?.copyright_text) setCopyright(content.copyright_text);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-black border-t border-white/10">
      <div className="w-full px-6 py-16 mx-auto max-w-375">
        <div className="flex flex-col items-start justify-between gap-10 sm:flex-row">
          <div className="space-y-6">
            <motion.h2
              className="font-display text-5xl uppercase tracking-[0.2em]"
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              {siteName}
            </motion.h2>
            <p className="max-w-lg text-white/70 tracking-[0.05em] font-display">
              Explore, connect, and experience immersive worlds built for the next generation of
              virtual reality.
            </p>
          </div>

          <div className="grid w-full gap-8 md:grid-cols-1 lg:w-auto">
            <div className="space-y-4">
              {/* <p className="text-xs uppercase tracking-[0.25em] text-white/60">Social</p> */}
              <div className="flex flex-col sm:flex-row gap-2 text-sm uppercase tracking-[0.09em] mr-auto">
                {socialLinks.map((item) => (
                  // <a key={item.label} href={item.href} className="px-4 text-white/80 hover:text-pink py-1.5 border border-white/30 rounded-full hover:text-black hover:bg-white transition-colors ease-in-out duration-300 font-display">
                  //   {item.label}
                  // </a>
                    <FillButton 
                    fillColor="#ffffff"
                    idleTextColor="rgba(255,255,255,0.8)"
                    filledTextColor="#000000"
                    borderColor="rgba(255,255,255,0.3)"
                                      key={item.label} href={item.href}>
                      {item.label}
                    </FillButton>
                ))}
              </div>
            </div>
          </div>
        </div>
           <div className="mx-auto mt-6 space-y-4 sm:mt-12 w-fit">
              <div className="flex flex-col sm:flex-row gap-1 text-xl uppercase tracking-[0.12em] flex-wrap ">
                {quickLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 text-white/80 hover:text-white py-1.5 text-nowrap font-display"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.2em] text-white/50 md:flex-row">
          <span>{copyright}</span>
          <span>Desiged for pasionated gammers</span>
        </div>
      </div>
    </footer>
  );
}
