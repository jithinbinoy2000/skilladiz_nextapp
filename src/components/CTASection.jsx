"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, initScrollAnimations } from "@/lib/animations";
import { useEffect, useRef } from "react";

export default function CTASection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cleanup = initScrollAnimations(sectionRef.current);
    return cleanup;
  }, []);

  return (
    <section className="section no-spacing" ref={sectionRef}>
      <div className="base-container">
        <div className="grid-layout">
          <div className="left-intro">
            <motion.div
              className="subtitle-text"
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              Where Imagination Lives
            </motion.div>
            <motion.p
              className="large-size-text"
              variants={fadeUpVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
            >
              <span className="white-span">
                Vear is a gateway to a limitless digital universe where 98% hyper-realistic
                environments
              </span>
              blur the line between virtual and real. With 10,000+ immersive experiences.
            </motion.p>
          </div>

          <motion.div
            className="png-girl-wrapper"
            variants={fadeUpVariant}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            data-parallax
          >
            <img
              src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d447af45bd43980dba892c_Png-02.webp"
              loading="lazy"
              alt="Project photo"
              className="girl-png"
            />
            <div className="overlay-gradient" />
          </motion.div>

          <div className="two-coll-grid">
            <div className="right-intro">
              <motion.div
                className="benefit-container"
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <h2 className="benefit-number">30K+</h2>
              </motion.div>
              <motion.p
                className="benefit-description"
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <span className="white-span">
                  Users have already stepped into the Vear VR world, experiencing mind-blowing
                  adventures,
                </span>
                immersive storytelling, and next-level interactions.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      <div className="banner-bg--002" data-parallax>
        <div className="banner-dark-ov" />
      </div>
    </section>
  );
}
