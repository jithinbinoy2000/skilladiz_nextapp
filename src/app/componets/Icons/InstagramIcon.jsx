'use client'
import React from 'react';

const InstagramIcon = ({ className = "" }) => {
  return (
    <div className={`inline-block ${className}`}>
      <style jsx>{`
        .instagram-icon {
          transition: all 0.3s ease;
        }
        
        .instagram-icon:hover {
          transform: scale(1.05);
        }
        
        .gradient-stroke {
          transition: all 0.3s ease;
        }
        
        .instagram-icon:hover .outer-circle {
          stroke-width: 2;
          filter: drop-shadow(0 0 1px rgba(188, 24, 136, 0.8))
                  drop-shadow(0 0 2px rgba(220, 39, 67, 0.6))
                  drop-shadow(0 0 3px rgba(240, 148, 51, 0.4));
        }
        
        .instagram-icon:hover .camera-body {
          stroke-width: 2;
          filter: drop-shadow(0 0 1px rgba(188, 24, 136, 0.7))
                  drop-shadow(0 0 2px rgba(220, 39, 67, 0.5));
        }
        
        .instagram-icon:hover .lens-outer {
          stroke-width: 2;
          filter: drop-shadow(0 0 1px rgba(188, 24, 136, 0.8))
                  drop-shadow(0 0 2px rgba(220, 39, 67, 0.6));
        }
        
        .instagram-icon:hover .lens-inner {
          stroke-width: 2;
          filter: drop-shadow(0 0 1px rgba(188, 24, 136, 0.9))
                  drop-shadow(0 0 2px rgba(220, 39, 67, 0.7));
        }
        
        .instagram-icon:hover .flash-dot {
          filter: drop-shadow(0 0 1px rgba(188, 24, 136, 0.9))
                  drop-shadow(0 0 2px rgba(220, 39, 67, 0.7))
                  drop-shadow(0 0 3px rgba(240, 148, 51, 0.5));
        }
        
        .flash-dot {
          transition: all 0.3s ease;
        }
      `}</style>
      
      <svg 
        // width={size} 
        // height={size} 
        width="100%" 
        height="100%" 
        viewBox="0 0 120 120" 
        className="instagram-icon cursor-pointer"
      >
        <defs>
          {/* Instagram gradient */}
          <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#f09433', stopOpacity: 1}} />
            <stop offset="25%" style={{stopColor: '#e6683c', stopOpacity: 1}} />
            <stop offset="50%" style={{stopColor: '#dc2743', stopOpacity: 1}} />
            <stop offset="75%" style={{stopColor: '#cc2366', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#bc1888', stopOpacity: 1}} />
          </linearGradient>
          
          {/* Radial gradient for neon effect */}
          <radialGradient id="neonGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style={{stopColor: 'rgba(188, 24, 136, 0.2)', stopOpacity: 1}} />
            <stop offset="70%" style={{stopColor: 'rgba(220, 39, 67, 0.1)', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: 'transparent', stopOpacity: 0}} />
          </radialGradient>
        </defs>
        
        {/* Outer circle */}
        <circle 
          cx="60" 
          cy="60" 
          r="30" 
          fill="none" 
          stroke="url(#instagramGradient)" 
          strokeWidth="2.5" 
          className="outer-circle gradient-stroke" 
        />
        
        {/* Instagram camera icon */}
        <g transform="translate(60, 60)">
          {/* Main rounded rectangle (camera body) */}
          <rect 
            x="-18" 
            y="-18" 
            width="36" 
            height="36" 
            rx="8" 
            ry="8" 
            fill="none" 
            stroke="url(#instagramGradient)" 
            strokeWidth="2.5" 
            className="camera-body gradient-stroke" 
          />
          
          {/* Camera lens (outer circle) */}
          <circle 
            cx="0" 
            cy="0" 
            r="11" 
            fill="none" 
            stroke="url(#instagramGradient)" 
            strokeWidth="2.5" 
            className="lens-outer gradient-stroke" 
          />
          
          {/* Camera lens (inner circle) - this fills the blank center */}
          <circle 
            cx="0" 
            cy="0" 
            r="6" 
            fill="none" 
            stroke="url(#instagramGradient)" 
            strokeWidth="2" 
            className="lens-inner gradient-stroke" 
          />
          
          {/* Flash/viewfinder dot */}
          <circle 
            cx="8" 
            cy="-8" 
            r="2.5" 
            fill="url(#instagramGradient)" 
            className="flash-dot"
          />
        </g>
      </svg>
    </div>
  );
};
export default  InstagramIcon