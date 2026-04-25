// 'use client'
// import React from 'react';

// const WhatsAppIcon = ({ size = 120, className = "" }) => {
//   return (
//     <div className={`inline-block ${className}`}>
//       <style jsx>{`
//         .whatsapp-icon {
//           transition: transform 0.3s ease;
//         }

//         .whatsapp-icon:hover {
//           transform: scale(1.05);
//         }

//         .circle {
//           fill: none;
//           stroke: url(#whatsappGradient);
//           stroke-width: 2;
//           filter: drop-shadow(0 0 4px #25D366)
//                   drop-shadow(0 0 8px #128C7E);
//           transition: all 0.3s ease;
//         }

//         .whatsapp-icon:hover .circle {
//           stroke-width: 3;
//         }

//         .logo {
//           fill: none;
//           stroke: url(#whatsappGradient);
//           stroke-width: 2;
//           filter: drop-shadow(0 0 3px #25D366);
//         }
//       `}</style>

//       <svg 
//         width={size} 
//         height={size} 
//         viewBox="0 0 120 120" 
//         className="whatsapp-icon cursor-pointer"
//       >
//         <defs>
//           <linearGradient id="whatsappGradient" x1="0%" y1="0%" x2="100%" y2="100%">
//             <stop offset="0%" stopColor="#25D366" />
//             <stop offset="100%" stopColor="#128C7E" />
//           </linearGradient>
//         </defs>

//         <circle cx="60" cy="60" r="26" className="circle" />
//         <circle cx="60" cy="60" r="20" className="circle" />
//         <circle cx="60" cy="60" r="14" className="circle" />

//         <g transform="translate(60,60)">
//           <path 
//             d="M -7 -2 C -3 5, 3 5, 6 -2"
//             className="logo"
//           />
//         </g>
//       </svg>
//     </div>
//   );
// };

// export default WhatsAppIcon;
'use client'
import React from 'react';

const WhatsAppIcon = ({ className = "" }) => {
  return (
    <div className={`inline-block ${className}`}>
      <style jsx>{`
        .whatsapp-icon {
          transition: all 0.3s ease;
        }

        .whatsapp-icon:hover {
          transform: scale(1.05);
        }

        .gradient-stroke {
          transition: all 0.3s ease;
        }

        /* Outer circle glow on hover */
        .whatsapp-icon:hover .outer-circle {
          stroke-width: 1.5;
          filter: drop-shadow(0 0 1px rgba(37, 211, 102, 0.9))
                  drop-shadow(0 0 2px rgba(18, 140, 126, 0.7))
                  drop-shadow(0 0 3px rgba(7, 94, 84, 0.5));
        }

        /* Inner logo glow on hover */
        .whatsapp-icon:hover .logo-path {
          filter: drop-shadow(0 0 1px rgba(37, 211, 102, 0.9))
                  drop-shadow(0 0 2px rgba(18, 140, 126, 0.7))
                  drop-shadow(0 0 3px rgba(7, 94, 84, 0.5));
        }
      `}</style>

      <svg
        width={"100%"}
        height={'100%'}
        viewBox="0 0 120 120"
        className="whatsapp-icon cursor-pointer"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* WhatsApp gradient */}
          <linearGradient id="whatsappGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#25D366" />
            <stop offset="50%" stopColor="#20BE5B" />
            <stop offset="100%" stopColor="#128C7E" />
          </linearGradient>
        </defs>

        {/* Outer circular border (same proportions as Instagram) */}
        <circle
          cx="60"
          cy="60"
          r="30"
          fill="none"
          stroke="url(#whatsappGradient)"
          strokeWidth="1.5"
          className="outer-circle gradient-stroke"
        />
<g id="SVGRepo_iconCarrier" transform="translate(38,40) scale(1.7)" className="logo-path gradient-stroke"> <path d="M3 5.5C3 14.0604 9.93959 21 18.5 21C18.8862 21 19.2691 20.9859 19.6483 20.9581C20.0834 20.9262 20.3009 20.9103 20.499 20.7963C20.663 20.7019 20.8185 20.5345 20.9007 20.364C21 20.1582 21 19.9181 21 19.438V16.6207C21 16.2169 21 16.015 20.9335 15.842C20.8749 15.6891 20.7795 15.553 20.6559 15.4456C20.516 15.324 20.3262 15.255 19.9468 15.117L16.74 13.9509C16.2985 13.7904 16.0777 13.7101 15.8683 13.7237C15.6836 13.7357 15.5059 13.7988 15.3549 13.9058C15.1837 14.0271 15.0629 14.2285 14.8212 14.6314L14 16C11.3501 14.7999 9.2019 12.6489 8 10L9.36863 9.17882C9.77145 8.93713 9.97286 8.81628 10.0942 8.64506C10.2012 8.49408 10.2643 8.31637 10.2763 8.1317C10.2899 7.92227 10.2096 7.70153 10.0491 7.26005L8.88299 4.05321C8.745 3.67376 8.67601 3.48403 8.55442 3.3441C8.44701 3.22049 8.31089 3.12515 8.15802 3.06645C7.98496 3 7.78308 3 7.37932 3H4.56201C4.08188 3 3.84181 3 3.63598 3.09925C3.4655 3.18146 3.29814 3.33701 3.2037 3.50103C3.08968 3.69907 3.07375 3.91662 3.04189 4.35173C3.01413 4.73086 3 5.11378 3 5.5Z" stroke="url(#whatsappGradient)" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"></path> </g>
      </svg>
    </div>
  );
};

export default WhatsAppIcon;
