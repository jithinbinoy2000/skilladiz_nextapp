"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PatternWrapper({ children, className = "" }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-2xl ${className}`}
    >
      {/* Dot-pattern background */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1px,transparent_1px)]
                   [background-size:20px_20px]
                   bg-neutral-950"
      />

      {/* Radial fade overlay to soften edges */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.8)_100%)]
                   pointer-events-none"
      />

      {/* Content with fade-in motion */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="relative z-10 p-6 text-center"
      >
        {children}
      </motion.div>
    </div>
  );
}
