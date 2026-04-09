"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Clock, Lock, Timer } from "lucide-react";

/** Individual slot card — available */
function SlotCardAvailable({ slot, selected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={[
        "group flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border",
        "px-4 py-4 text-center transition-all duration-200",
        "min-w-[96px] focus:outline-none",
        selected
          ? "border-white bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.14)]"
          : "border-white/15 bg-white/5 text-white hover:border-white/45 hover:bg-white/10",
      ].join(" ")}
    >
      <Clock
        className={`h-3.5 w-3.5 transition-colors ${
          selected ? "text-black" : "text-white/45 group-hover:text-white/75"
        }`}
      />
      <span className="text-sm font-bold leading-none">{slot.start_time}</span>
      <span
        className={`text-[9px] uppercase tracking-[0.08em] ${
          selected ? "text-black/55" : "text-white/40"
        }`}
      >
        → {slot.end_time}
      </span>
    </button>
  );
}

/** Individual slot card — unavailable (taken or expired) */
function SlotCardUnavailable({ slot }) {
  const expired = slot._expired;
  return (
    <div
      className={[
        "flex shrink-0 flex-col items-center gap-1.5 rounded-2xl border",
        "px-4 py-4 text-center cursor-not-allowed min-w-[96px]",
        expired
          ? "border-white/5 opacity-20"
          : "border-white/10 bg-white/5 opacity-35",
      ].join(" ")}
    >
      {expired ? (
        <Timer className="h-3.5 w-3.5 text-white/30" />
      ) : (
        <Lock className="h-3.5 w-3.5 text-white/30" />
      )}
      <span className="text-sm font-bold leading-none text-white/50">
        {slot.start_time}
      </span>
      <span className="text-[9px] uppercase tracking-[0.08em] text-white/25">
        {expired ? "Expired" : "Taken"}
      </span>
    </div>
  );
}

/** Scroll button for the carousel */
function ScrollBtn({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      aria-label={direction === "prev" ? "Scroll left" : "Scroll right"}
      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-white/15 text-white/45 transition-all hover:border-white/35 hover:bg-white/5 hover:text-white"
    >
      {direction === "prev" ? (
        <ChevronLeft className="h-3.5 w-3.5" />
      ) : (
        <ChevronRight className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

export function TimeSlotCarousel({ slots, selectedSlot, onSelect, holding }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    dragFree: true,
    containScroll: "trimSnaps",
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="space-y-3">
      {/* Header row with scroll buttons */}
      <div className="flex items-center justify-between">
        <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
          Available Times — swipe or click
        </p>
        <div className="flex gap-1.5">
          <ScrollBtn direction="prev" onClick={scrollPrev} />
          <ScrollBtn direction="next" onClick={scrollNext} />
        </div>
      </div>

      {/* Embla viewport */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex gap-2.5 touch-pan-y select-none">
          {slots.map((slot) => {
            const unavailable = !slot.is_available || slot._expired;
            return unavailable ? (
              <SlotCardUnavailable key={slot.id} slot={slot} />
            ) : (
              <SlotCardAvailable
                key={slot.id}
                slot={slot}
                selected={selectedSlot?.id === slot.id}
                onSelect={() => !holding && onSelect(slot)}
              />
            );
          })}
        </div>
      </div>

      {/* Holding spinner */}
      {holding && (
        <div className="flex items-center gap-2 text-xs text-white/40">
          <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Reserving your slot…
        </div>
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-3 text-[10px] text-white/30">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded border border-white/20 bg-white/5" />
          Available
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded border border-white/10 bg-white/5 opacity-40" />
          Taken
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded border border-white/5 opacity-20" />
          Expired
        </span>
      </div>
    </div>
  );
}
