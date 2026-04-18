import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

function TournamentsSection({ serviceRows }) {
  return (
    <section className="relative py-12 sm:py-16 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top-right,rgba(120,80,255,0.10),transparent_55%)]" />
      <div className="w-full px-6 mx-auto max-w-7xl">
        <div className="flex items-center gap-3 mb-10">
          <p className="text-xs uppercase tracking-[0.35em] text-white/60">
            Tournaments
          </p>
          <img
            src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d9606476c7cb7cb2c4489c_sonna-arrow-down-right%201.svg"
            alt=""
            className="w-4 h-4"
          />
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="divide-y divide-white/10 border-y border-white/20"
        >
          {serviceRows.map((service) => (
            <motion.article
              key={service.title}
              variants={fadeUpVariant}
              data-reveal
              className="group grid items-center gap-5 py-7 sm:py-10 lg:grid-cols-[220px_1fr_160px]"
            >
              <div className="relative w-full overflow-hidden border h-44 rounded-2xl border-white/10">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-full transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-white/50">
                  <span>{service.order}</span>
                  <span className="w-10 h-px bg-white/20" />
                  <span>{service.category}</span>
                </div>
                <h3 className="text-2xl font-display uppercase tracking-widest sm:text-3xl">
                  {service.title}
                </h3>
                <p className="max-w-2xl font-sans text-sm sm:text-base text-white/70">
                  {service.description ||
                    "Join the action. Compete for glory at Skilladiz Gaming Arena."}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end">
                <div className="rounded-full border border-white/40 px-4 py-2 text-xs uppercase tracking-[0.25em] text-nowrap">
                  {service.price}
                </div>
                <a
                  href="/booking"
                  className="flex items-center justify-center w-12 h-12 transition-colors border rounded-full border-white/40 hover:bg-white/10"
                >
                  <img
                    src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                    alt=""
                    className="w-4 h-4"
                  />
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default TournamentsSection;
