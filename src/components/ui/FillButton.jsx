// "use client";

// import { useRef, useCallback } from "react";
// import { motion, useAnimation } from "framer-motion";

// /**
//  * FillButton
//  *
//  * Matches your existing pill-button style:
//  *   px-4 py-1.5 border border-white/30 rounded-full font-display text-white/80
//  *
//  * On hover: fill bursts from the exact cursor entry pixel,
//  * text flips to filled-text colour. On leave: collapses toward exit point.
//  * Wavy elastic spring via Framer Motion.
//  *
//  * Props:
//  *  - children        : label
//  *  - href            : renders as <a> when provided, otherwise <button>
//  *  - className       : extra Tailwind classes
//  *
//  *  ── Form / state ──────────────────────────────────────────────────────
//  *  - value           : controlled input value (string)
//  *  - setValue        : setter for value — (val: string) => void
//  *
//  *  ── Callbacks ─────────────────────────────────────────────────────────
//  *  - onClick         : (e) => void   — fires on click
//  *  - onSuccess       : (value) => void — call this yourself after async success
//  *  - onError         : (error) => void — call this yourself on failure
//  *
//  *  ── Colours ───────────────────────────────────────────────────────────
//  *  - idleTextColor   : text colour at rest          (default: "rgba(255,255,255,0.8)")
//  *  - filledTextColor : text colour while hovered    (default: "#000000")
//  *  - fillColor       : hover fill colour            (default: "#ffffff")
//  *  - borderColor     : idle border colour           (default: "rgba(255,255,255,0.3)")
//  *
//  *  - ...rest         : forwarded to the root element
//  */

// function getDiagonal(rect) {
//   return Math.sqrt(rect.width ** 2 + rect.height ** 2);
// }

// function getRelativePos(e, rect) {
//   return {
//     x: e.clientX - rect.left,
//     y: e.clientY - rect.top,
//   };
// }

// export default function FillButton({
//   children,
//   href,
//   className = "",

//   // ── Form / state ──────────────────────────────────────────
//   value,
//   setValue,

//   // ── Callbacks ─────────────────────────────────────────────
//   onClick,
//   onSuccess,
//   onError,

//   // ── Colours ───────────────────────────────────────────────
//   idleTextColor   = "rgba(255,255,255,0.8)",
//   filledTextColor = "#000000",
//   fillColor       = "#ffffff",
//   borderColor     = "rgba(255,255,255,0.3)",

//   ...rest
// }) {
//   const elRef          = useRef(null);
//   const fillControls   = useAnimation();
//   const borderControls = useAnimation();
//   const textControls   = useAnimation();

//   const handleMouseEnter = useCallback(async (e) => {
//     if (!elRef.current) return;

//     const rect = elRef.current.getBoundingClientRect();
//     const { x, y } = getRelativePos(e, rect);
//     const r = getDiagonal(rect) * 1.15;

//     // Snap to entry point at 0 size — no transition
//     fillControls.set({
//       left:         x,
//       top:          y,
//       width:        0,
//       height:       0,
//       x:            "-50%",
//       y:            "-50%",
//       borderRadius: "50%",
//       opacity:      1,
//     });

//     // Elastic burst outward
//     fillControls.start({
//       width:  r * 2,
//       height: r * 2,
//       transition: {
//         type:      "spring",
//         stiffness: 160,
//         damping:   13,
//         mass:      0.75,
//       },
//     });

//     borderControls.start({
//       opacity: 0,
//       transition: { duration: 0.18, ease: "easeOut" },
//     });

//     textControls.start({
//       color: filledTextColor,
//       transition: { duration: 0.18 },
//     });
//   }, [fillControls, borderControls, textControls]);

//   const handleMouseLeave = useCallback(async (e) => {
//     if (!elRef.current) return;

//     const rect = elRef.current.getBoundingClientRect();
//     const { x, y } = getRelativePos(e, rect);

//     // Collapse toward exit point
//     fillControls.start({
//       left:         x,
//       top:          y,
//       width:        0,
//       height:       0,
//       borderRadius: "50%",
//       transition: {
//         type:      "spring",
//         stiffness: 200,
//         damping:   22,
//         mass:      0.6,
//       },
//     });

//     borderControls.start({
//       opacity: 1,
//       transition: { duration: 0.18, ease: "easeIn" },
//     });

//     textControls.start({
//       color: idleTextColor,
//       transition: { duration: 0.2 },
//     });
//   }, [fillControls, borderControls, textControls]);

//   const sharedProps = {
//     ref:            elRef,
//     onMouseEnter:   handleMouseEnter,
//     onMouseLeave:   handleMouseLeave,
//     className: [
//       // ── matches your existing style exactly ──
//       "relative inline-flex items-center justify-center",
//       "overflow-hidden select-none cursor-pointer",
//       "px-4 py-1.5",
//       "rounded-full",
//       "font-display",
//       "border border-white/30",
//       className,
//     ]
//       .filter(Boolean)
//       .join(" "),
//     style: {
//       background:    "transparent",
//       outline:       "none",
//       textDecoration: "none",
//     },
//     ...rest,
//   };

//   const inner = (
//     <>
//       {/* White fill circle — erupts from cursor entry */}
//       <motion.span
//         aria-hidden="true"
//         animate={fillControls}
//         className="absolute pointer-events-none"
//         style={{
//           background:   "#ffffff",
//           width:        0,
//           height:       0,
//           borderRadius: "50%",
//           top:          0,
//           left:         0,
//           x:            "-50%",
//           y:            "-50%",
//           zIndex:       0,
//         }}
//       />

//       {/* Border layer — fades out on hover */}
//       <motion.span
//         aria-hidden="true"
//         animate={borderControls}
//         className="absolute inset-0 rounded-full pointer-events-none"
//         style={{
//           border:    "1px solid rgba(255,255,255,0.3)",
//           boxSizing: "border-box",
//           zIndex:    1,
//         }}
//       />

//       {/* Label */}
//       <motion.span
//         animate={textControls}
//         className="relative z-10"
//         style={{ color: "rgba(255,255,255,0.8)" }}
//       >
//         {children}
//       </motion.span>
//     </>
//   );

//   // Render as <a> when href is provided, otherwise <button>
//   if (href) {
//     return (
//       <motion.a href={href} {...sharedProps}>
//         {inner}
//       </motion.a>
//     );
//   }

//   return (
//     <motion.button onClick={onClick} {...sharedProps}>
//       {inner}
//     </motion.button>
//   );
// }









// // // colours
// // <FillButton
// //   fillColor="#ffffff"
// //   idleTextColor="rgba(255,255,255,0.8)"
// //   filledTextColor="#000000"
// //   borderColor="rgba(255,255,255,0.3)"
// // >

// // // form state
// // <FillButton value={email} setValue={setEmail}>

// // // callbacks — onClick receives (event, { value, setValue })
// // // if onClick returns a Promise, onSuccess/onError fire automatically
// // <FillButton
// //   onClick={async (e, { value }) => await submitForm(value)}
// //   onSuccess={(res) => toast.success("Done!")}
// //   onError={(err) => toast.error(err.message)}
// // ></FillButton>

"use client";

import { useRef, useCallback } from "react";
import { motion, useAnimation } from "framer-motion";

/**
 * FillButton
 *
 * Matches your existing pill-button style:
 *   px-4 py-1.5 border border-white/30 rounded-full font-display text-white/80
 *
 * On hover: fill bursts from the exact cursor entry pixel,
 * text flips to filled-text colour. On leave: collapses toward exit point.
 * Wavy elastic spring via Framer Motion.
 *
 * Props:
 *  - children        : label
 *  - href            : renders as <a> when provided, otherwise <button>
 *  - className       : extra Tailwind classes
 *
 *  ── Form / state ──────────────────────────────────────────────────────
 *  - value           : controlled input value (string)
 *  - setValue        : setter for value — (val: string) => void
 *
 *  ── Callbacks ─────────────────────────────────────────────────────────
 *  - onClick         : (e) => void   — fires on click
 *  - onSuccess       : (value) => void — call this yourself after async success
 *  - onError         : (error) => void — call this yourself on failure
 *
 *  ── Colours ───────────────────────────────────────────────────────────
 *  - idleTextColor   : text colour at rest          (default: "rgba(255,255,255,0.8)")
 *  - filledTextColor : text colour while hovered    (default: "#000000")
 *  - fillColor       : hover fill colour            (default: "#ffffff")
 *  - borderColor     : idle border colour           (default: "rgba(255,255,255,0.3)")
 *
 *  - ...rest         : forwarded to the root element
 */

function getDiagonal(rect) {
  return Math.sqrt(rect.width ** 2 + rect.height ** 2);
}

function getRelativePos(e, rect) {
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

export default function FillButton({
  children,
  href,
  className = "",

  // ── Form / state ──────────────────────────────────────────
  value,
  setValue,

  // ── Callbacks ─────────────────────────────────────────────
  onClick,
  onSuccess,
  onError,

  // ── Colours ───────────────────────────────────────────────
  // variant="solid"  → white bg, black text, black fill on hover  (Contact Us style)
  // variant="ghost"  → transparent bg, white text, white fill on hover  (Explore More style)
  variant         = "ghost",
  idleTextColor,
  filledTextColor,
  fillColor,
  borderColor,

  ...rest
}) {
  // Resolve variant defaults — explicit prop always wins
  const VARIANTS = {
    solid: {
      idleTextColor:   "#000000",
      filledTextColor: "#ffffff",
      fillColor:       "#000000",
      borderColor:     "rgba(255,255,255,0.2)",
      solidBg:         "#ffffff",
    },
    ghost: {
      idleTextColor:   "#ffffff",
      filledTextColor: "#000000",
      fillColor:       "#ffffff",
      borderColor:     "rgba(255,255,255,0.2)",
      solidBg:         "transparent",
    },
  };
  const v = VARIANTS[variant] ?? VARIANTS.ghost;
  const resolvedIdleText   = idleTextColor   ?? v.idleTextColor;
  const resolvedFilledText = filledTextColor ?? v.filledTextColor;
  const resolvedFill       = fillColor       ?? v.fillColor;
  const resolvedBorder     = borderColor     ?? v.borderColor;
  const resolvedBg         = v.solidBg;

  const elRef          = useRef(null);
  const fillControls   = useAnimation();
  const borderControls = useAnimation();
  const textControls   = useAnimation();

  const handleMouseEnter = useCallback(async (e) => {
    if (!elRef.current) return;

    const rect = elRef.current.getBoundingClientRect();
    const { x, y } = getRelativePos(e, rect);
    const r = getDiagonal(rect) * 1.15;

    // Snap to entry point at 0 size — no transition
    fillControls.set({
      left:         x,
      top:          y,
      width:        0,
      height:       0,
      x:            "-50%",
      y:            "-50%",
      borderRadius: "50%",
      opacity:      1,
    });

    // Elastic burst outward
    fillControls.start({
      width:  r * 2,
      height: r * 2,
      transition: {
        type:      "spring",
        stiffness: 160,
        damping:   13,
        mass:      0.75,
      },
    });

    borderControls.start({
      opacity: 0,
      transition: { duration: 0.18, ease: "easeOut" },
    });

    textControls.start({
      color: resolvedFilledText,
      transition: { duration: 0.18 },
    });
  }, [fillControls, borderControls, textControls, resolvedFilledText]);

  const handleMouseLeave = useCallback(async (e) => {
    if (!elRef.current) return;

    const rect = elRef.current.getBoundingClientRect();
    const { x, y } = getRelativePos(e, rect);

    // Collapse toward exit point
    fillControls.start({
      left:         x,
      top:          y,
      width:        0,
      height:       0,
      borderRadius: "50%",
      transition: {
        type:      "spring",
        stiffness: 200,
        damping:   22,
        mass:      0.6,
      },
    });

    borderControls.start({
      opacity: 1,
      transition: { duration: 0.22, ease: "easeIn" },
    });

    textControls.start({
      color: resolvedIdleText,
      transition: { duration: 0.2 },
    });
  }, [fillControls, borderControls, textControls, resolvedIdleText]);

  const handleClick = useCallback((e) => {
    if (!onClick) return;
    try {
      const result = onClick(e, { value, setValue });
      // If onClick returns a Promise, hook onSuccess / onError automatically
      if (result && typeof result.then === "function") {
        result
          .then((res) => onSuccess?.(res))
          .catch((err) => onError?.(err));
      }
    } catch (err) {
      onError?.(err);
    }
  }, [onClick, onSuccess, onError, value, setValue]);

  const sharedProps = {
    ref:            elRef,
    onMouseEnter:   handleMouseEnter,
    onMouseLeave:   handleMouseLeave,
    className: [
      "relative inline-flex items-center justify-center",
      "overflow-hidden select-none cursor-pointer",
      "px-6 py-3",
      "rounded-full",
      "text-xs uppercase tracking-[0.25em]",
      "border border-white/20 border-[1px]",
      className,
    ]
      .filter(Boolean)
      .join(" "),
    style: {
      background:     resolvedBg,
      outline:        "none",
      textDecoration: "none",
      borderColor:    resolvedBorder,
    },
    ...rest,
  };

  const inner = (
    <>
      {/* White fill circle — erupts from cursor entry */}
      <motion.span
        aria-hidden="true"
        animate={fillControls}
        className="absolute pointer-events-none"
        style={{
          background:   resolvedFill,
          width:        0,
          height:       0,
          borderRadius: "50%",
          top:          0,
          left:         0,
          x:            "-50%",
          y:            "-50%",
          zIndex:       0,
        }}
      />

      {/* Border layer — fades out on hover */}
      <motion.span
        aria-hidden="true"
        animate={borderControls}
        className="absolute inset-0 rounded-full pointer-events-none"
        style={{
          border:    `1px solid ${resolvedBorder}`,
          boxSizing: "border-box",
          zIndex:    1,
        }}
      />

      {/* Label */}
      <motion.span
        animate={textControls}
        className="relative z-10"
        style={{ color: resolvedIdleText }}
      >
        {children}
      </motion.span>
    </>
  );

  // Render as <a> when href is provided, otherwise <button>
  if (href) {
    return (
      <motion.a href={href} onClick={handleClick} {...sharedProps}>
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.button onClick={handleClick} {...sharedProps}>
      {inner}
    </motion.button>
  );
}