"use client"
import { GridPattern } from '@/components/ui/grid-pattern';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

function OurVision() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: 'easeOut' },
    },
  };

  return (
    <section className="py-20 px-4 relative bg-transparent overflow-hidden">
      {/* Grid background only */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <GridPattern/>
      </div>

      <div className="relative z-10 max-w-[1500px] mx-auto flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Left - Image with animation */}
        <motion.div
          className="w-full md:w-1/2 flex items-center justify-center mb-8 md:mb-0"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <Image
            src={'/home/controller.png'}
            height={500}
            width={500}
            quality={100}
            alt="controller"
            className="object-contain drop-shadow-xl"
          />
        </motion.div>

        {/* Right - Heading & Content with animation */}
        <motion.div
          className="w-full md:w-1/2 flex flex-col justify-center text-center md:text-left gap-6 my-auto"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Our Vision – <br></br> Beyond the Screen
          </h1>
          <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
            Today, many young players spend hours gaming online — often alone and disconnected from real people.
            At Skilladiz, we believe gaming should bring people together, not apart.
            Our mission is to transform gaming from an online habit into an offline community movement — where fun, friendship, and focus unite.
          </p>
        </motion.div>
      </div>

      {/* Footer Text */}
      <motion.div
        className="relative z-10 mt-12 text-center md:text-left max-w-7xl mx-auto"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ delay: 0.6, duration: 0.7, ease: 'easeOut' }}
      >
        <p className="text-muted-foreground text-lg md:text-xl text-center max-w-3xl mx-auto">
          Skilladiz is where passion meets purpose. Here, we play hard, chill smart, and build a stronger gaming community for Kerala and beyond.
        </p>
      </motion.div>
    </section>
  );
}

export default OurVision;
