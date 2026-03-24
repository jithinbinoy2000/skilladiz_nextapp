"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { fadeUpVariant, staggerContainer, initScrollAnimations } from "@/lib/animations";

export default function HeroSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cleanup = initScrollAnimations(sectionRef.current);
    return cleanup;
  }, []);

  return (
    <div className="clip-section" ref={sectionRef}>
      <section className="banner-01">
        <div className="banner-content">
          <div className="banner-grid">
            <div className="large-container">
              <div className="png-container">
                <motion.h1
                  className="hero-banner-title"
                  variants={fadeUpVariant}
                  initial="hidden"
                  animate="visible"
                >
                  virtual reality
                </motion.h1>

                <motion.div
                  className="glass-wrapper"
                  variants={fadeUpVariant}
                  initial="hidden"
                  animate="visible"
                  data-parallax
                >
                  <img
                    className="glass-img"
                    src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d2f467d74a011f856f847d_Png-2.webp"
                    alt="Project photo"
                    loading="lazy"
                  />

                  <div className="hero-video-button">
                    <div className="video-button-background">
                      <div className="button-video">
                        <video autoPlay loop muted playsInline className="button-video">
                          <source
                            src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522%2F67d7ea6c4bfa605e293f0b1f_7547008%20uhd%203840%202160%2025fps-transcode.mp4"
                            type="video/mp4"
                          />
                          <source
                            src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522%2F67d7ea6c4bfa605e293f0b1f_7547008%20uhd%203840%202160%2025fps-transcode.webm"
                            type="video/webm"
                          />
                        </video>
                        <div className="overlay" />
                      </div>
                    </div>

                    <motion.div
                      className="video-hover-button"
                      variants={fadeUpVariant}
                      initial="hidden"
                      animate="visible"
                    >
                      <a href="/" className="lightbox-video-banner w-inline-block">
                        <div className="video-icon-wrapper">
                          <img
                            width="14"
                            alt="Project photo"
                            src="https://cdn.prod.website-files.com/67d2aef700b3d9b727bac522/67d7e7cc219d309de33b4cec_Play.webp"
                            loading="lazy"
                            className="video-icon"
                          />
                          <div className="play-bg" />
                        </div>
                      </a>
                    </motion.div>
                  </div>
                </motion.div>

                <motion.div
                  className="hero-banner-text"
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.p className="subtitle-text" variants={fadeUpVariant}>
                    Step into immersive worlds
                  </motion.p>
                  <motion.p className="large-text" variants={fadeUpVariant}>
                    <span className="white-span">Vear unlocks hyper-realistic environments</span>
                    where imagination becomes an experience you can feel.
                  </motion.p>
                </motion.div>
              </div>
            </div>

            <div className="hero-banner-bottom">
              <motion.div
                className="banner-scroll"
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
              >
                <div className="scroll-text">Scroll</div>
                <div className="scroll-line" />
              </motion.div>
              <motion.div
                className="banner-description"
                variants={fadeUpVariant}
                initial="hidden"
                animate="visible"
              >
                <p className="large-text">
                  Explore next-gen virtual tourism, training, and storytelling powered by
                  cutting-edge simulation.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
