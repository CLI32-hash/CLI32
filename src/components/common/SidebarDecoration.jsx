import React from 'react';

export const SidebarDecoration = () => {
  return (
    <div className="relative w-full h-full min-h-[160px] overflow-hidden pointer-events-none select-none">
      {/* ── Soft Background Waves & Blobs ── */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 240 280"
        preserveAspectRatio="none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="sidebarWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EBF4FE" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0.3" />
          </linearGradient>
          <radialGradient id="softBlobGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient glow circle */}
        <circle cx="180" cy="140" r="70" fill="url(#softBlobGlow)" />

        {/* Bottom decorative wave shapes */}
        <path
          d="M0 130 C60 150, 90 200, 140 215 C190 230, 210 255, 240 270 L240 280 L0 280 Z"
          fill="url(#sidebarWaveGrad)"
        />
        <path
          d="M0 190 C70 200, 110 240, 240 250 L240 280 L0 280 Z"
          fill="#EFF6FF"
          opacity="0.6"
        />

        {/* ── Curved Dashed Flight Trail Path ── */}
        <path
          d="M 12 260 C 20 200, 65 205, 105 160 C 130 130, 142 110, 155 88"
          stroke="#93C5FD"
          strokeWidth="1.8"
          strokeDasharray="4 4"
          strokeLinecap="round"
          fill="none"
          className="animate-trail-dash"
        />
      </svg>

      {/* ── Floating Paper Plane Illustration ── */}
      <div className="absolute right-9 top-14 transform rotate-[-8deg] animate-plane-float">
        <svg
          width="42"
          height="42"
          viewBox="0 0 44 44"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-[#1D58D8] drop-shadow-xs"
        >
          {/* Main Paper Plane Wings & Body */}
          <path
            d="M6 22 L38 6 L26 38 L21 25 L6 22 Z"
            fill="none"
            stroke="#1D58D8"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Center Fold Line */}
          <path
            d="M38 6 L21 25"
            stroke="#1D58D8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Subtle Rear Underfold */}
          <path
            d="M21 25 L25 33 L29 28"
            stroke="#93C5FD"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </div>
  );
};
