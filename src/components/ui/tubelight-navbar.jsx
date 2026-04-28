// // "use client";
// // import React, { useEffect, useState } from "react";
// // import { motion } from "framer-motion";
// // import Link from "next/link";
// // import { cn } from "@/lib/utils";

// // const neonColors = [
// //   "from-pink-500 via-red-500 to-yellow-400",
// //   "from-cyan-400 via-blue-500 to-purple-600",
// //   "from-green-400 via-emerald-500 to-teal-400",
// //   "from-fuchsia-500 via-purple-500 to-indigo-500",
// // ];

// // export function NavBar({ items, className }) {
// //   const [activeTab, setActiveTab] = useState(items[0].name);
// //   const [isMobile, setIsMobile] = useState(false);
// //   const [randomColor, setRandomColor] = useState(neonColors[0]);

// //   useEffect(() => {
// //     const handleResize = () => setIsMobile(window.innerWidth < 768);
// //     handleResize();
// //     window.addEventListener("resize", handleResize);
// //     return () => window.removeEventListener("resize", handleResize);
// //   }, []);

// //   useEffect(() => {
// //     const nextColor = neonColors[Math.floor(Math.random() * neonColors.length)];
// //     setRandomColor(nextColor);
// //   }, [activeTab]);

// //   return (
// //     <div
// //       className={cn(
// //         "fixed  sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
// //         className
// //       )}
// //     >
// //       <div className="flex items-center gap-3 bg-background/10 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
// //         {items.map((item) => {
// //           const Icon = item.icon;
// //           const isActive = activeTab === item.name;

// //           return (
// //             <Link
// //               key={item.name}
// //               href={item.url}
// //               onClick={() => setActiveTab(item.name)}
// //               className={cn(
// //                 "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-all duration-300",
// //                 isActive
// //                   ? "bg-white text-transparent bg-clip-text bg-gradient-to-r"
// //                   : "text-white/80 hover:text-white"
// //               )}
// //             >
// //               {/* Gradient text (active has bg-clip gradient on white bg) */}
// //               <span
// //                 className={cn(
// //                   "hidden md:inline bg-clip-text text-transparent bg-gradient-to-r",
// //                   isActive ? randomColor : "from-gray-100 to-gray-200"
// //                 )}
// //               >
// //                 {item.name}
// //               </span>

// //               {/* Mobile icon */}
// //               {isMobile && Icon && (
// //                 <span className="md:hidden">
// //                   <Icon size={18} strokeWidth={2.5} />
// //                 </span>
// //               )}

// //               {/* Active state — gradient top bar */}
// //               {isActive && (
// //                 <motion.div
// //                   layoutId="lamp"
// //                   className="absolute inset-0 rounded-full bg-white/10 -z-10 backdrop-blur-2xl"
// //                   initial={false}
// //                   transition={{
// //                     type: "spring",
// //                     stiffness: 300,
// //                     damping: 30,
// //                   }}
// //                 >
// //                   <div
// //                     className={cn(
// //                       "absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-0.5 rounded-t-full bg-gradient-to-r blur-[1px]",
// //                       randomColor
// //                     )}
// //                   />
// //                 </motion.div>
// //               )}
// //             </Link>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }


// "use client"

// import React, { useEffect, useState } from "react"
// import { motion } from "framer-motion"
// import Link from "next/link"
// import { LucideIcon } from "lucide-react"
// import { cn } from "@/lib/utils"


// export function NavBar({ items, className }) {
//   const [activeTab, setActiveTab] = useState(items[0].name)
//   const [isMobile, setIsMobile] = useState(false)

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768)
//     }

//     handleResize()
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [])

//   return (
//     <div
//       className={cn(
//         "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
//         className,
//       )}
//     >
//       <div className="flex items-center gap-3 bg-background/5  backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
//         {items.map((item) => {
//           const Icon = item.icon
//           const isActive = activeTab === item.name

//           return (
//             <Link
//               key={item.name}
//               href={item.url}
//               onClick={() => setActiveTab(item.name)}
//               className={cn(
//                 "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
//                 "text-white/80 hover:text-white/90",
//                 isActive && "bg-white text-black hover:text-black",
//               )}
//             >
//               <span className="hidden md:inline">{item.name}</span>
//               <span className="md:hidden">
//                 <Icon size={18} strokeWidth={2.5} />
//               </span>
//               {isActive && (
//                 <motion.div
//                   layoutId="lamp"
//                   className="absolute inset-0 w-full bg-white rounded-full -z-10"
//                   initial={false}
//                   transition={{
//                     type: "spring",
//                     stiffness: 300,
//                     damping: 30,
//                   }}
//                 >
//                   <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
//                     <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
//                     <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
//                     <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
//                   </div>
//                 </motion.div>
//               )}
//             </Link>
//           )
//         })}
//       </div>
//     </div>
//   )
// }


"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

export function NavBar({ items, className }) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed bottom-0 sm:top-0 left-1/2 -translate-x-1/2 z-50 mb-6 sm:pt-6",
        className,
      )}
    >
      <div className="flex items-center gap-3 bg-background/5 backdrop-blur-lg py-1 px-1 rounded-full shadow-lg">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm font-semibold px-6 py-2 rounded-full transition-colors",
                "text-white/80 hover:text-white/90",
                isActive && "bg-white text-black hover:text-black",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-white rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  {/* Glow effect color replaced here */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 rounded-t-full">
                    <div className="absolute w-12 h-6 bg-blue-500/20 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-blue-500/20 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-blue-500/20 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
