"use client";

import { Lock, Timer } from "lucide-react";

export function HoldTimer({ countdown }) {
  if (countdown === null || countdown === undefined) return null;

  const isUrgent = countdown <= 60;
  const minutes = Math.floor(countdown / 60);
  const seconds = String(countdown % 60).padStart(2, "0");

  return (
    <div
      className={[
        "flex items-center gap-2.5 rounded-xl px-4 py-2.5",
        "text-xs uppercase tracking-[0.1em]",
        isUrgent
          ? "bg-red-500/10 text-red-400"
          : "bg-emerald-500/10 text-emerald-400",
      ].join(" ")}
    >
      {isUrgent ? (
        <Timer className="h-3.5 w-3.5 shrink-0 animate-pulse" />
      ) : (
        <Lock className="h-3.5 w-3.5 shrink-0" />
      )}
      <span>Slot held for</span>
      <span className="font-mono text-sm font-bold">
        {minutes}:{seconds}
      </span>
      {isUrgent && (
        <span className="normal-case tracking-normal opacity-70">
          — pay soon!
        </span>
      )}
    </div>
  );
}
