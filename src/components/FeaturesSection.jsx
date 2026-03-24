"use client";

import { motion } from "framer-motion";
import { fadeUpVariant, staggerContainer, initScrollAnimations, hoverLift } from "@/lib/animations";
import { useEffect, useRef } from "react";

export default function FeaturesSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cleanup = initScrollAnimations(sectionRef.current);
    return cleanup;
  }, []);

  return (
    <div className="clip-relative-section" ref={sectionRef}>
      <section className="section without-top-spacing">
        <div className="grid-best-portfolio">
          <div className="grid-hero-con">
            <div className="grid-project-content">
              <div className="center-align-title">
                <motion.h2
                  className="best-work-name"
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  Immerse yourself in something unreal
                </motion.h2>
              </div>
              <div className="center-paragraph">
                <motion.p
                  className="large-text"
                  variants={fadeUpVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  <span className="white-span">We break the boundaries of reality.</span>
                  Your imagination becomes a world you can explore. The next dimension is
                  waiting for you.
                </motion.p>
              </div>
              <motion.div
                className="hero-link-wrapper"
                variants={fadeUpVariant}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <motion.a
                  href="/"
                  className="underline-main-link w-inline-block"
                  whileHover={hoverLift.whileHover}
                >
                  <div>Try to Virtual Worlds</div>
                  <div className="arrow-clip-wrap">
                    <div className="clip-arrow-2">
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector 101.svg"
                        alt="Project photo"
                        className="project-small-arrow"
                      />
                    </div>
                    <div className="clip-arrow-2 bottom-arrow">
                      <img
                        loading="lazy"
                        src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d3d739571201bc625f4937_Vector 101.svg"
                        alt="Project photo"
                        className="project-small-arrow"
                      />
                    </div>
                  </div>
                  <div className="hover-line">
                    <div className="hover-line-fill" />
                  </div>
                </motion.a>
              </motion.div>
            </div>
          </div>

          <motion.div
            className="hero-spin-image"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="spin-wrap flex-spin" data-parallax>
              <div className="spin-outside">
                <div className="spin-inside-01">
                  <div className="rotate-photo">
                    <div className="image-ov" />
                    <img
                      alt="Project photo"
                      src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd5d89b248471ed7355_2.webp"
                      loading="lazy"
                      className="image-cover"
                    />
                  </div>
                  <div className="rotate-photo back">
                    <div className="image-ov" />
                    <img
                      alt="Project photo"
                      src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdf2e4a11e6d9a282f2_11.webp"
                      loading="lazy"
                      className="image-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-wrapper">
                <div className="small-order-text">001 / 004</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-spin-image"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="spin-wrap flex-spin" data-parallax>
              <div className="spin-outside">
                <div className="spin-inside-002">
                  <div className="rotate-photo">
                    <div className="image-ov" />
                    <img
                      alt="Project photo"
                      src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd845bd43980da09622_3.webp"
                      loading="lazy"
                      className="image-cover"
                    />
                  </div>
                  <div className="rotate-photo back">
                    <div className="image-ov" />
                    <img
                      alt="Project photo"
                      src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42be93529f99d85977c16_7.webp"
                      loading="lazy"
                      className="image-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-wrapper">
                <div className="small-order-text">002 / 004</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-spin-image"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="spin-wrap bottom-flex-spin" data-parallax>
              <div className="spin-outside">
                <div className="spin-inside-003">
                  <div className="rotate-photo">
                    <div className="image-ov" />
                    <img
                      alt="Project photo"
                      src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bdc5f950c0d1d312713_6.webp"
                      loading="lazy"
                      className="image-cover"
                    />
                  </div>
                  <div className="rotate-photo back">
                    <div className="image-ov" />
                    <img
                      alt="Project photo"
                      src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42b9bf72882fc457e2679_Blog-2.webp"
                      loading="lazy"
                      className="image-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-wrapper">
                <div className="small-order-text">003 / 004</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="hero-spin-image"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <div className="spin-wrap bottom-flex-spin" data-parallax>
              <div className="spin-outside">
                <div className="spin-inside-004">
                  <div className="rotate-photo">
                    <div className="image-ov" />
                    <img
                      alt="Project photo"
                      src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bbfba94846ccbb1bf89_10.webp"
                      loading="lazy"
                      className="image-cover"
                    />
                  </div>
                  <div className="rotate-photo back">
                    <div className="image-ov" />
                    <img
                      alt="Project photo"
                      src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d42bd8a550e86d30cf0f3b_4.webp"
                      loading="lazy"
                      className="image-cover"
                    />
                  </div>
                </div>
              </div>
              <div className="order-wrapper">
                <div className="small-order-text">004 / 004</div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
