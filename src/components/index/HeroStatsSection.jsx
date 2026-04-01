import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

function HeroStatsSection({ heroStats }) {
  return (
    <section className="py-10 bg-black">
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {heroStats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={fadeUpVariant}
              className="flex flex-col gap-2 p-6 border rounded-2xl border-white/10 bg-white/5"
            >
              <div className="text-5xl font-display uppercase tracking-[0.08em]">
                {stat.value}
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroStatsSection;
