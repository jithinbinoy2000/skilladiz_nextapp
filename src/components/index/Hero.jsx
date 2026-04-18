import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer } from "../../lib/animations";
import Magnet from "../Magnet";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(248,51,225,0.15),_transparent_55%)]" />
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:py-32 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          className="space-y-6 sm:space-y-8"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-[10px] uppercase tracking-[0.45em] text-white/50 font-sans"
            variants={fadeUpVariant}
          >
            Skilladiz Gaming
          </motion.p>
          <motion.h1
            className="font-display text-4xl uppercase tracking-[0.05em] leading-tight text-white sm:text-5xl lg:text-7xl"
            variants={fadeUpVariant}
          >
            Experience the Future of Gaming
          </motion.h1>
          <div className="relative w-full border rounded-full min-h-[calc(100vw-80px)] 2xl:min-h-[calc(100vw-30px)] border-white/20 sm:hidden">
            <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_top,_rgba(248,51,225,0.35),_transparent_70%)]" />
            <img
              src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d2f467d74a011f856f847d_Png-2.webp"
              alt="VR headset"
              className="absolute inset-0 object-contain w-full h-full"
            />
          </div>
          <motion.p
            className="max-w-2xl font-sans text-sm leading-relaxed text-white/65 sm:text-base"
            variants={fadeUpVariant}
          >
            Ultimate gaming destination â€” a premium, high-energy space where
            passionate gamers, friends, and fun-seekers come together to compete,
            unwind, and connect. Step in. Level up. This is where your gaming
            story begins.
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4 sm:justify-start"
            variants={fadeUpVariant}
          >
            <a
              href="/booking"
              className="rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.12em] text-black"
            >
              Reserve Your Arena
            </a>
            <a
              href="/about"
              className="rounded-full border border-white/40 px-6 py-3 text-xs uppercase tracking-[0.12em] text-white"
            >
              Inside Skilladiz
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative items-center justify-center hidden sm:flex"
          variants={fadeUpVariant}
          initial="hidden"
          animate="visible"
        >
          <Magnet padding={200} disabled={false} magnetStrength={5}>
            <div className="relative h-[300px] w-[300px] sm:h-[560px] sm:w-[560px] rounded-full border border-white/20">
              <div className="absolute inset-6 rounded-full bg-[radial-gradient(circle_at_top,_rgba(248,51,225,0.35),_transparent_70%)]" />
              <img
                src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d2f467d74a011f856f847d_Png-2.webp"
                alt="VR headset"
                className="absolute inset-0 object-contain w-full h-full"
              />
            </div>
          </Magnet>
        </motion.div>
      </div>
    </section>
  );
}

export default Hero;
