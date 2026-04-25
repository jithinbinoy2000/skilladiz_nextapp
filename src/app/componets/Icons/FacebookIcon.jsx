'use client'
import React from 'react';

const FacebookIcon = ({ className = "" }) => {
  return (
    <div className={`inline-block ${className}`}>
      <style jsx>{`
        .facebook-icon {
          transition: all 0.3s ease;
        }

        .facebook-icon:hover {
          transform: scale(1.05);
        }

        .gradient-stroke {
          transition: all 0.3s ease;
        }

        .facebook-icon:hover .outer-circle {
          stroke-width: 2.5;
          filter: drop-shadow(0 0 2px rgba(66, 103, 178, 0.9))
                  drop-shadow(0 0 3px rgba(59, 89, 152, 0.7))
                  drop-shadow(0 0 4px rgba(41, 72, 125, 0.5));
        }

        .facebook-icon:hover .logo-path {
          stroke-width: 2.5;
          filter: drop-shadow(0 0 2px rgba(66, 103, 178, 0.9))
                  drop-shadow(0 0 3px rgba(59, 89, 152, 0.7))
                  drop-shadow(0 0 4px rgba(41, 72, 125, 0.5));
        }
      `}</style>

      <svg
        width={"100%"}
        height={'100%'}
        viewBox="0 0 120 120"
        className="facebook-icon cursor-pointer"
      >
        <defs>
          {/* Facebook blue gradient */}
          <linearGradient id="facebookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#3b5998', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#4267B2', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#4c70ba', stopOpacity: 1 }} />
          </linearGradient>

          {/* Neon glow effect */}
          <radialGradient id="facebookGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{ stopColor: 'rgba(66, 103, 178, 0.2)', stopOpacity: 1 }} />
            <stop offset="70%" style={{ stopColor: 'rgba(59, 89, 152, 0.1)', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: 'transparent', stopOpacity: 0 }} />
          </radialGradient>
        </defs>

        {/* Outer circle */}
        <circle
          cx="60"
          cy="60"
          r="30"
          fill="none"
          stroke="url(#facebookGradient)"
          strokeWidth="2.5"
          className="outer-circle gradient-stroke"
        />

        {/* Facebook "f" Logo */}
        <g transform="translate(60, 60)">
          <path
            d="M8, -12h-5c-1,0-2,1-2,2v4h7l-1,8h-6v16h-8v-16h-5v-8h5v-5c0-6,3-10,9-10
            c2.4,0,5,0.3,6,0.5V-12z"
            fill="none"
            stroke="url(#facebookGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="logo-path gradient-stroke"
          />
        </g>
      </svg>
    </div>
  );
};

export default FacebookIcon;
