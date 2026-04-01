import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "@/lib/animations";

function ChooseArenaSection({ featuredGames }) {
  return (
    <section className="relative py-16 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(120,80,255,0.08),_transparent_60%)]" />
      <div className="w-full px-4 mx-auto max-w-7xl sm:px-6">
        <div className="flex flex-col gap-6 mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.35em] text-white/60">
              Gaming Zones
            </p>
            <h2 className="mt-4 font-display text-4xl uppercase tracking-[0.12em]">
              Choose Your Arena
            </h2>
          </div>
          <p className="max-w-md font-sans text-white/70">
            From classic cue sports to next-gen VR, every zone at Skilladiz is built
            to deliver peak performance and pure fun.
          </p>
        </div>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="grid gap-4 md:grid-cols-2"
        >
          {featuredGames.map((game, i) => (
            <motion.article
              key={game.title}
              variants={fadeUpVariant}
              transition={{ delay: i * 0.08 }}
              className="relative overflow-hidden border group rounded-3xl border-white/10 bg-white/5"
            >
              <img
                src={game.image}
                alt={game.title}
                className="object-cover w-full transition duration-500 min-h-64 aspect-video group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute space-y-1 bottom-6 left-6">
                <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                  {game.category}
                </p>
                <h3 className="text-xl font-display uppercase tracking-[0.1em] text-white">
                  {game.title}
                </h3>
              </div>
              <a
                href="/booking"
                className="absolute flex items-center justify-center w-10 h-10 transition-opacity duration-300 border rounded-full opacity-0 top-4 right-4 border-white/20 bg-black/50 backdrop-blur-sm group-hover:opacity-100"
                aria-label={`Book ${game.title}`}
              >
                <img
                  src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector%20101.svg"
                  alt=""
                  className="w-4 h-4"
                />
              </a>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ChooseArenaSection;
