'use client'
import React from 'react';

const YouTubeIcon = ({ size = 120, className = "" }) => {
  return (
    <div className={`inline-block ${className}`}>
      <style jsx>{`
        .youtube-icon {
          transition: transform 0.3s ease;
        }

        .youtube-icon:hover {
          transform: scale(1.05);
        }

        .neon-glow {
          filter: drop-shadow(0 0 1px #FF0000)
                  drop-shadow(0 0 1px #CC0000)
                  drop-shadow(0 0 1px #FF4444);
          transition: all 0.3s ease;
        }

        .youtube-icon:hover .neon-glow {
          filter: drop-shadow(0 0 1px #FF0000)
                  drop-shadow(0 0 1px #CC0000)
                  drop-shadow(0 0 1px #FF4444);
        }
      `}</style>

      <svg
        width={"100%"}
        height={'100%'}
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        className="youtube-icon cursor-pointer"
        fill="none"
      >
        <defs>
          <linearGradient id="youtubeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF0000" />
            <stop offset="50%" stopColor="#FF4B2B" />
            <stop offset="100%" stopColor="#CC0000" />
          </linearGradient>
        </defs>

        {/* Outer Circle */}
        <circle
          cx="60"
          cy="60"
          r="30"
          stroke="url(#youtubeGradient)"
          strokeWidth="0.5"
          fill="none"
          className="neon-glow"
        />

        {/* YouTube Play Button */}
        <g transform="translate(60, 60)">
          {/* Play button rectangle (YouTube style) */}
          <rect
            x="-18"
            y="-12"
            width="36"
            height="24"
            rx="6"
            ry="6"
            fill="none"
            stroke="url(#youtubeGradient)"
            strokeWidth="0.5"
            className="neon-glow"
          />
          
          {/* Play triangle */}
          <polygon
            points="-5,-7 10,0 -5,7"
            fill="none"
            stroke="url(#youtubeGradient)"
            strokeWidth="0.5"
            strokeLinejoin="round"
            className="neon-glow"
          />
        </g>
      </svg>
    </div>
  );
};

export default YouTubeIcon;
