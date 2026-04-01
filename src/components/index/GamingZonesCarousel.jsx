import { useRef } from "react";
import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";

function GamingZonesCarousel({ services }) {
  const trackRef = useRef(null);

  return (
    <section className="relative py-16 sm:py-20">
      <div className="w-full px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Gaming Zones
            </p>
            <img
              src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d9606476c7cb7cb2c4489c_sonna-arrow-down-right%201.svg"
              alt=""
              className="w-4 h-4"
            />
          </div>
        </div>

        <div
          ref={trackRef}
          className="flex gap-5 pb-4 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 md:overflow-x-visible md:snap-none md:pb-0 lg:grid-cols-3 xl:grid-cols-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {services.map((service, i) => (
            <motion.article
              key={service.id ?? service.title}
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
              transition={{ delay: Math.min(i * 0.08, 0.3) }}
              className="shrink-0 w-[80vw] sm:w-[45vw] md:w-auto snap-start overflow-hidden rounded-3xl border border-white/10 bg-white/5 flex flex-col"
            >
              <div className="relative h-56 overflow-hidden shrink-0">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                {service.duration && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-sm">
                    <svg
                      className="w-3 h-3 text-white/60"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    <span className="text-[10px] text-white/70">
                      {service.duration}m
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col flex-1 p-5 space-y-3">
                <p className="text-xs uppercase tracking-[0.25em] text-white/50">
                  {service.category}
                </p>
                <h3 className="text-lg font-display uppercase tracking-[0.12em] leading-tight">
                  {service.title}
                </h3>
                {service.description && (
                  <p className="flex-1 font-sans text-sm leading-relaxed text-white/60 line-clamp-2">
                    {service.description}
                  </p>
                )}
                <div className="flex items-center justify-between gap-3 pt-2 mt-auto">
                  <a
                    href="/about"
                    className="rounded-full border border-white/20 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white hover:border-white/40 transition-colors"
                  >
                    Info
                  </a>
                  <a
                    href={service.bookUrl}
                    className="flex-1 rounded-full bg-white px-5 py-2.5 text-center text-xs font-bold uppercase tracking-[0.2em] text-black transition-all hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                  >
                    Book Now
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-3 text-xs text-center text-white/20 md:hidden">
          ← Swipe to explore →
        </p>
      </div>
    </section>
  );
}

export default GamingZonesCarousel;
