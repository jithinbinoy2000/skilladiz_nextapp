import { motion } from "framer-motion";
import { fadeUpVariant } from "@/lib/animations";
import EmblaCarousel from "../EmblaCarousel";

function ServiceCard({ service }) {
  return (
    <motion.article
      variants={fadeUpVariant}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      className="flex flex-col overflow-hidden border rounded-3xl border-white/10 bg-white/5 h-full"
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
            <span className="text-[10px] text-white/70">{service.duration}m</span>
          </div>
        )}
      </div>

      <div className="flex flex-col flex-1 p-5 space-y-3">
        <p className="text-xs uppercase tracking-[0.25em] text-white/50">
          {service.category}
        </p>
        <h3 className="text-lg font-display uppercase tracking-[0.12em] leading-tight text-white">
          {service.title}
        </h3>
        {service.description && (
          <p className="flex-1 text-sm leading-relaxed text-white/60 line-clamp-2">
            {service.description}
          </p>
        )}
        <div className="flex items-center justify-between gap-3 pt-2 mt-auto">
          <a
            href={service.redirectUrl || "/about"}
            className="rounded-full border border-white/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-white/70 hover:text-white hover:border-white/40 transition-colors"
          >
            Info
          </a>
          <a
            href={service.bookUrl}
            className="flex-1 rounded-full bg-white px-5 py-2.5 text-center text-xs font-bold uppercase tracking-[0.2em] text-black hover:bg-white/90 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all"
          >
            Book Now
          </a>
        </div>
      </div>
    </motion.article>
  );
}

function GamingZonesCarousel({ services }) {
  return (
    <section className="relative pb-14 sm:pb-20">
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6">
        <div className="flex items-center justify-between mb-8 sm:mb-10">
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

        <EmblaCarousel
          items={services}
          autoplayDelay={3000}
          renderItem={(service) => <ServiceCard service={service} />}
        />
      </div>
    </section>
  );
}

export default GamingZonesCarousel;
