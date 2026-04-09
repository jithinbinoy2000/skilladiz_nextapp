"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { CalendarDays, ChevronDown } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

/** "YYYY-MM-DD" → local Date at midnight */
function ymdToDate(ymd) {
  const [y, m, d] = ymd.split("-").map(Number);
  return new Date(y, m - 1, d);
}

/** Date → "YYYY-MM-DD" in local time */
function dateToYmd(date) {
  return date.toLocaleDateString("en-CA");
}

const WEEKDAY = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDisplay(ymd) {
  const d = ymdToDate(ymd);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isToday = d.getTime() === today.getTime();
  const label = `${WEEKDAY[d.getDay()]}, ${d.getDate()} ${MONTH[d.getMonth()]} ${d.getFullYear()}`;
  return isToday ? `Today — ${label}` : label;
}

export function BookingCalendar({ selectedDate, onSelect }) {
  const [open, setOpen] = useState(false);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = selectedDate ? ymdToDate(selectedDate) : undefined;

  function handleSelect(date) {
    if (!date) return;
    onSelect(dateToYmd(date));
    setOpen(false); // close popover after picking
  }

  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-white/40">
        <CalendarDays className="h-3 w-3" />
        Select Date
      </label>

      <Popover.Root open={open} onOpenChange={setOpen}>
        {/* ── Trigger button ── */}
        <Popover.Trigger asChild>
          <button className="flex w-full items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/[0.03] px-4 py-3 text-left transition-all hover:border-white/30 hover:bg-white/5 focus:outline-none data-[state=open]:border-white/30 data-[state=open]:bg-white/5">
            <div className="flex items-center gap-2.5">
              <CalendarDays className="h-4 w-4 shrink-0 text-white/40" />
              {selectedDate ? (
                <span className="text-sm font-medium text-white">
                  {formatDisplay(selectedDate)}
                </span>
              ) : (
                <span className="text-sm text-white/35">Pick a date…</span>
              )}
            </div>
            <ChevronDown
              className={`h-4 w-4 shrink-0 text-white/35 transition-transform duration-200 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </Popover.Trigger>

        {/* ── Popover panel ── */}
        <Popover.Portal>
          <Popover.Content
            sideOffset={8}
            align="start"
            className="z-50 w-[var(--radix-popover-trigger-width)] min-w-[300px] rounded-2xl border border-white/12 bg-[#0d0d0d] p-4 shadow-2xl shadow-black/60 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 duration-150"
          >
            <Calendar
              mode="single"
              selected={selected}
              onSelect={handleSelect}
              disabled={{ before: today }}
              defaultMonth={selected ?? today}
              className="mx-auto"
            />
            <Popover.Arrow className="fill-white/10" />
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
