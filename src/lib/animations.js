import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

export const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const hoverLift = {
  whileHover: { y: -6, transition: { duration: 0.2, ease: "easeOut" } },
};

export const initScrollAnimations = (root) => {
  if (!root) return () => {};
  gsap.registerPlugin(ScrollTrigger);

  const parallaxItems = root.querySelectorAll(
    "[data-parallax], .banner-bg--002, .banner-bg--002.reverce, .large-photo, .background-portfolio-3-2"
  );
  const revealItems = root.querySelectorAll("[data-reveal]");

  parallaxItems.forEach((item) => {
    gsap.to(item, {
      yPercent: -12,
      ease: "none",
      scrollTrigger: {
        trigger: item,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.6,
      },
    });
  });

  revealItems.forEach((item) => {
    gsap.fromTo(
      item,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: item,
          start: "top 85%",
        },
      }
    );
  });

  return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
};
