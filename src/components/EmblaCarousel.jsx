"use client";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useCallback, useEffect, useRef } from "react";

export default function EmblaCarousel({
  items = [],
  renderItem,
  autoplayDelay = 3000,
  slidesPerView = { base: 1, sm: 2, md: 3, lg: 4 },
}) {
  const autoplayRef = useRef(
    Autoplay({ delay: autoplayDelay, stopOnInteraction: false })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "start",
      breakpoints: {
        "(min-width: 640px)": { slidesToScroll: slidesPerView.sm ?? 2 },
        "(min-width: 768px)": { slidesToScroll: slidesPerView.md ?? 3 },
        "(min-width: 1024px)": { slidesToScroll: slidesPerView.lg ?? 4 },
      },
    },
    [autoplayRef.current]
  );

  const handleMouseEnter = useCallback(() => {
    autoplayRef.current?.stop();
  }, []);

  const handleMouseLeave = useCallback(() => {
    autoplayRef.current?.play();
  }, []);

  return (
    <div
      className="overflow-hidden"
      ref={emblaRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="flex gap-5">
        {items.map((item, index) => (
          <div
            key={item?.id ?? index}
            className="shrink-0 w-[80vw] sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] lg:w-[calc(25%-15px)]"
          >
            {renderItem ? renderItem(item, index) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
