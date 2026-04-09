"use client";

import { DayPicker } from "react-day-picker";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

function Chevron({ orientation }) {
  if (orientation === "left") return <ChevronLeft className="h-4 w-4" />;
  return <ChevronRight className="h-4 w-4" />;
}

export function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("select-none", className)}
      classNames={{
        months: "flex flex-col",
        month: "flex flex-col gap-3",
        month_caption:
          "relative flex h-10 items-center justify-center",
        caption_label:
          "text-xs font-semibold uppercase tracking-[0.22em] text-white",
        nav: "absolute inset-x-0 top-0 flex h-10 items-center justify-between",
        button_previous: cn(
          "flex h-8 w-8 items-center justify-center rounded-xl",
          "border border-white/15 text-white/45",
          "hover:border-white/35 hover:bg-white/5 hover:text-white",
          "transition-all duration-150 focus:outline-none"
        ),
        button_next: cn(
          "flex h-8 w-8 items-center justify-center rounded-xl",
          "border border-white/15 text-white/45",
          "hover:border-white/35 hover:bg-white/5 hover:text-white",
          "transition-all duration-150 focus:outline-none"
        ),
        month_grid: "w-full border-collapse",
        weekdays: "flex",
        weekday:
          "h-9 w-9 flex items-center justify-center text-[9px] font-medium uppercase tracking-[0.15em] text-white/30",
        week: "flex mt-1",
        day: "relative h-9 w-9 p-0 text-center",
        day_button: cn(
          "h-9 w-9 rounded-xl text-sm font-medium transition-all duration-150",
          "text-white/75 hover:bg-white/10 hover:text-white",
          "aria-selected:bg-white aria-selected:text-black aria-selected:font-bold",
          "aria-selected:hover:bg-white/90 aria-selected:shadow-[0_0_16px_rgba(255,255,255,0.15)]",
          "disabled:pointer-events-none disabled:text-white/20",
          "focus:outline-none focus-visible:ring-1 focus-visible:ring-white/30"
        ),
        selected: "",
        today:
          "[&>button:not([aria-selected])]:ring-1 [&>button:not([aria-selected])]:ring-white/25 [&>button:not([aria-selected])]:text-white",
        outside: "[&>button]:opacity-25 [&>button]:text-white/40",
        disabled:
          "[&>button]:opacity-20 [&>button]:cursor-not-allowed [&>button]:pointer-events-none",
        hidden: "invisible",
        ...classNames,
      }}
      components={{ Chevron }}
      {...props}
    />
  );
}
