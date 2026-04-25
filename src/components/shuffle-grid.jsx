// "use client"

// import { motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import { cn } from "@/lib/utils";
// import { DotPattern } from "./ui/dot-pattern";

// export const ShuffleHero = () => {
//   return (
//     <section
//       className="py-20 px-4 relative">
//       <DotPattern className="text-white/20 absolute inset-0 -z-20" />
// <div
//   className="pointer-events-none absolute inset-0 -z-10 bg-red-500/50
//     bg-[radial-gradient(ellipse_at_center,
//       rgba(255,0,0,)_0%,        /* transparent center */
//       rgba(255,0,0,1)_50%,     /* light red halfway */
//       rgba(255,0,0,1)_80%,     /* stronger red fade */
//       rgba(255,0,0,1)_95%,     /* deep red near edge */
//       rgba(255,0,0,1)_100%       /* full red at edge */
//     )]"
// />



//       <div className="relative z-10 px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-[1500px] mx-auto text-white ">
//         <div>
//           <span className="block mb-4 text-xs md:text-sm font-medium">
//              Elevate Your Game
//           </span>
//           <h3 className="text-4xl md:text-6xl font-semibold ">
//            Step Into the Ultimate Gaming Lifestyle
//           </h3>
//           <p className="text-base md:text-lg text-muted-foreground my-4 md:my-6">
//             With a furturstic ambiance, state-of-the-art setups, and a community-driven spirit.
//             skilladiz is crafter for those wh seek more than just a game- they seek a lifestyle
//           </p>
//           <button
//         className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md
//                    transition-all hover:bg-blue-700 active:scale-95
//                    focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
//       >
//             Play Now
//           </button>
//         </div>
//         <ShuffleGrid />
//       </div>
//     </section>
//   );
// };

// const shuffle = (array) => {
//   let currentIndex = array.length,
//     randomIndex;

//   while (currentIndex != 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;

//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }

//   return array;
// };

// const squareData = [
//   {
//     id: 1,
//     src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//   },
//   {
//     id: 2,
//     src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//   },
//   {
//     id: 3,
//     src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//   },
//   {
//     id: 4,
//     src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//   },
//   {
//     id: 5,
//     src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1325&q=80",
//   },
//   {
//     id: 6,
//     src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//   },
//   {
//     id: 7,
//     src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//   },
//   {
//     id: 8,
//     src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//   },
//   {
//     id: 9,
//     src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
//   },
//   {
//     id: 10,
//     src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
//   },
//   {
//     id: 11,
//     src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80",
//   },
//   {
//     id: 12,
//     src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=882&q=80",
//   },
//   {
//     id: 13,
//     src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
//   },
//   {
//     id: 14,
//     src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80",
//   },
//   {
//     id: 15,
//     src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=681&q=80",
//   },
//   {
//     id: 16,
//     src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1820&q=80",
//   },
// ];

// const generateSquares = () => {
//   return shuffle(squareData).map((sq) => (
//     <motion.div
//       key={sq.id}
//       layout
//       transition={{ duration: 1.5, type: "spring" }}
//       className="w-full h-full rounded-md overflow-hidden bg-muted"
//       style={{
//         backgroundImage: `url(${sq.src})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}></motion.div>
//   ));
// };

// const ShuffleGrid = () => {
//   const timeoutRef = useRef(null);
//   const [squares, setSquares] = useState(generateSquares());

//   useEffect(() => {
//     shuffleSquares();

//     return () => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }
//     };
//   }, []);

//   const shuffleSquares = () => {
//     setSquares(generateSquares());

//     timeoutRef.current = setTimeout(shuffleSquares, 3000);
//   };

//   return (
//     <div className="grid grid-cols-4 grid-rows-4 h-[650px] gap-1">
//       {squares.map((sq) => sq)}
//     </div>
//   );
// };

// "use client"

// import { motion } from "framer-motion";
// import { useEffect, useRef, useState } from "react";
// import { cn } from "@/lib/utils";
// import { DotPattern } from "./ui/dot-pattern";

// export const ShuffleHero = () => {
//   return (
//     <section className="py-20 px-4 relative overflow-hidden">
//       <DotPattern className="text-white/20 absolute inset-0 " />


//       <div
//         className="pointer-events-none absolute inset-0 -z-10 bg-black"
//         style={{
//           WebkitMaskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)",
//           maskImage: "radial-gradient(circle at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)",
//           WebkitMaskRepeat: "no-repeat",
//           maskRepeat: "no-repeat",
//           WebkitMaskSize: "cover",
//           maskSize: "cover",
//         }}
//       />

//       <div className="relative z-10 px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-[1500px] mx-auto text-white">
//         <div>
//           <span className="block mb-4 text-xs md:text-sm font-medium">
//             Elevate Your Game
//           </span>
//           <h3 className="text-4xl md:text-6xl font-semibold">
//             Step Into the Ultimate Gaming Lifestyle
//           </h3>
//           <p className="text-base md:text-lg text-muted-foreground my-4 md:my-6">
//             With a futuristic ambiance, state-of-the-art setups, and a community-driven spirit.
//             Skilladiz is crafted for those who seek more than just a game — they seek a lifestyle.
//           </p>
//           <button
//             className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md
//                        transition-all hover:bg-blue-700 active:scale-95
//                        focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
//           >
//             Play Now
//           </button>
//         </div>
//         <ShuffleGrid />
//       </div>
//     </section>
//   );
// };

// const shuffle = (array) => {
//   let currentIndex = array.length,
//     randomIndex;

//   while (currentIndex !== 0) {
//     randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex--;
//     [array[currentIndex], array[randomIndex]] = [
//       array[randomIndex],
//       array[currentIndex],
//     ];
//   }

//   return array;
// };

// const squareData = [
//   { id: 1, src: "https://images.unsplash.com/photo-1547347298-4074fc3086f0?auto=format&fit=crop&w=1740&q=80" },
//   { id: 2, src: "https://images.unsplash.com/photo-1510925758641-869d353cecc7?auto=format&fit=crop&w=687&q=80" },
//   { id: 3, src: "https://images.unsplash.com/photo-1629901925121-8a141c2a42f4?auto=format&fit=crop&w=687&q=80" },
//   { id: 4, src: "https://images.unsplash.com/photo-1580238053495-b9720401fd45?auto=format&fit=crop&w=687&q=80" },
//   { id: 5, src: "https://images.unsplash.com/photo-1569074187119-c87815b476da?auto=format&fit=crop&w=1325&q=80" },
//   { id: 6, src: "https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?auto=format&fit=crop&w=1740&q=80" },
//   { id: 7, src: "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?auto=format&fit=crop&w=1740&q=80" },
//   { id: 8, src: "https://plus.unsplash.com/premium_photo-1671436824833-91c0741e89c9?auto=format&fit=crop&w=1740&q=80" },
//   { id: 9, src: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1740&q=80" },
//   { id: 10, src: "https://images.unsplash.com/photo-1610768764270-790fbec18178?auto=format&fit=crop&w=687&q=80" },
//   { id: 11, src: "https://images.unsplash.com/photo-1507034589631-9433cc6bc453?auto=format&fit=crop&w=684&q=80" },
//   { id: 12, src: "https://images.unsplash.com/photo-1533107862482-0e6974b06ec4?auto=format&fit=crop&w=882&q=80" },
//   { id: 13, src: "https://images.unsplash.com/photo-1560089000-7433a4ebbd64?auto=format&fit=crop&w=870&q=80" },
//   { id: 14, src: "https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=686&q=80" },
//   { id: 15, src: "https://images.unsplash.com/photo-1606244864456-8bee63fce472?auto=format&fit=crop&w=681&q=80" },
//   { id: 16, src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=1820&q=80" },
// ];

// const generateSquares = () => {
//   return shuffle(squareData).map((sq) => (
//     <motion.div
//       key={sq.id}
//       layout
//       transition={{ duration: 1.5, type: "spring" }}
//       className="w-full h-full rounded-md overflow-hidden bg-muted"
//       style={{
//         backgroundImage: `url(${sq.src})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     ></motion.div>
//   ));
// };

// const ShuffleGrid = () => {
//   const timeoutRef = useRef(null);
//   const [squares, setSquares] = useState(generateSquares());

//   useEffect(() => {
//     shuffleSquares();
//     return () => clearTimeout(timeoutRef.current);
//   }, []);

//   const shuffleSquares = () => {
//     setSquares(generateSquares());
//     timeoutRef.current = setTimeout(shuffleSquares, 3000);
//   };

//   return (
//     <div className="grid grid-cols-4 grid-rows-4 h-[650px] gap-1">
//       {squares.map((sq) => sq)}
//     </div>
//   );
// };
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { DotPattern } from "./ui/dot-pattern";

export const ShuffleHero = () => {
  // Animation variants for fade-in & slide-up
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="relative py-20 px-4 overflow-hidden bg-black">
      {/* Dot pattern background */}
      <DotPattern className="text-white/5 absolute inset-0 pointer-events-none" />

      {/* Radial mask overlay */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          WebkitMaskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)",
          maskImage:
            "radial-gradient(circle at center, rgba(0,0,0,1) 10%, rgba(0,0,0,0.8) 80%, rgba(0,0,0,0) 100%)",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskSize: "cover",
          maskSize: "cover",
        }}
      />

      <div className="relative z-10 max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-8 sm:px-8 sm:py-12 text-white text-center sm:text-start">
        {/* Left: Text block */}
        <motion.div
          className=""
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="block mb-4 text-xs md:text-sm font-medium">
            Elevate Your Game
          </span>
          <h3 className="text-4xl md:text-6xl font-semibold bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
            Step Into the Ultimate Gaming Lifestyle
          </h3>
          <p className="text-gray-300 md:text-lg 2xl:text-xl  my-4 md:my-6 leading-relaxed">
            With a futuristic ambiance, state-of-the-art setups, and a
            community-driven spirit. Skilladiz is crafted for those who seek
            more than just a game — they seek a lifestyle.
          </p>
          <p className="text-muted-foreground mb-4 md:mb-6 text-lg md:text-xl">
            Dive into the world of 8-ball pool, snooker, VR adventures, PlayStation battles, and more — all under one stylish, high-tech roof.
          </p>
          <button
            className="bg-blue-600 text-white font-medium py-2 px-6 rounded-md
                       transition-all hover:bg-blue-700 active:scale-95
                       focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
          >
            Play Now
          </button>
        </motion.div>

        {/* Right: Shuffle Grid */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          transition={{ delay: 0.3 }}
          className="mx-auto"
        >
          <ShuffleGrid />
        </motion.div>
      </div>
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  { id: 1, src: "/grid/1.jpg" },
  { id: 2, src: "/grid/2.jpg" },
  { id: 3, src: "/grid/3.jpg" },
  { id: 4, src: "/grid/4.jpg" },
  { id: 5, src: "/grid/5.jpg" },
  { id: 6, src: "/grid/6.jpg" },
  { id: 7, src: "/grid/7.jpg" },
  { id: 8, src: "/grid/8.jpg" },
  { id: 9, src: "/grid/9.jpg" },
  { id: 10, src: "/grid/10.jpg" },
  { id: 11, src: "/grid/11.jpg" },
  { id: 12, src: "/grid/12.jpg" },
  { id: 13, src: "/grid/13.jpg" },
  { id: 14, src: "/grid/14.jpg" },
  { id: 15, src: "/grid/15.jpg" },
  { id: 16, src: "/grid/16.jpg" },
];

const generateSquares = () =>
  shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full rounded-md overflow-hidden bg-muted"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    />
  ));

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 gap-1 h-[350px] sm:h-[500px] lg:h-[550px] 2xl:h-[650px] aspect-square mx-auto">
      {squares}
    </div>
  );
};
