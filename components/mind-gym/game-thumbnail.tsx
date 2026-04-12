"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface GameThumbnailProps {
  slug: string;
  className?: string;
}

export function GameThumbnail({ slug, className }: GameThumbnailProps) {
  const renderIllustration = () => {
    switch (slug) {
      case "pulse-check":
        // Processing Speed: Concentric waves with a central "firing" neuron
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <defs>
              <radialGradient id="pulse-grad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#7A9A7D" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#7A9A7D" stopOpacity="0" />
              </radialGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>
            <rect width="400" height="225" fill="#F5F4F0" />
            
            {/* Background Waves */}
            {[1, 2, 3].map((i) => (
              <motion.circle
                key={i}
                cx="200" cy="112.5" r={30 * i}
                stroke="#7A9A7D"
                strokeWidth="1.5"
                strokeOpacity="0.3"
                animate={{
                  r: [30 * i, 30 * i + 25, 30 * i],
                  opacity: [0.2, 0.5, 0.2],
                }}
                transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}

            {/* Central "Pulse" */}
            <motion.circle
              cx="200" cy="112.5" r="8"
              fill="#7A9A7D"
              filter="url(#glow)"
              animate={{
                scale: [1, 2, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
            />
            
            {/* Scanning Line */}
            <motion.path
              d="M80 112.5H320"
              stroke="#7A9A7D"
              strokeWidth="2"
              strokeOpacity="0.15"
              strokeDasharray="6 10"
              animate={{ x: [-20, 20, -20] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        );

      case "schulte-table":
        // Visual Scanning: Grid with "discovery" highlights
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#F5F4F0" />
            <g transform="translate(140, 52.5)">
              {Array.from({ length: 4 }).map((_, i) => (
                Array.from({ length: 4 }).map((_, j) => (
                  <g key={`${i}-${j}`}>
                    <rect
                      x={i * 30} y={j * 30}
                      width="26" height="26"
                      rx="8"
                      fill="#52154E"
                      fillOpacity="0.08"
                      stroke="#52154E"
                      strokeOpacity="0.15"
                      strokeWidth="1"
                    />
                    {/* Random active states */}
                    {(i + j) % 3 === 0 && (
                      <motion.rect
                        x={i * 30} y={j * 30}
                        width="26" height="26"
                        rx="8"
                        fill="#52154E"
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{ duration: 3, delay: (i + j) * 0.2, repeat: Infinity }}
                      />
                    )}
                  </g>
                ))
              ))}
            </g>
            {/* Eye Tracking Trail */}
            <motion.path
              d="M152 65L242 125L182 155L272 95"
              stroke="#52154E"
              strokeWidth="2.5"
              strokeOpacity="0.2"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        );

      case "stroop-test":
        // Flexibility: Color interference and overlap
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#F5F4F0" />
            
            <motion.circle
              cx="180" cy="112.5" r="55"
              fill="#7A9A7D"
              fillOpacity="0.35"
              animate={{ 
                x: [0, 25, 0],
                scale: [1, 1.15, 1] 
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            
            <motion.circle
              cx="220" cy="112.5" r="55"
              fill="#52154E"
              fillOpacity="0.35"
              style={{ mixBlendMode: 'multiply' }}
              animate={{ 
                x: [0, -25, 0],
                scale: [1, 0.85, 1] 
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            <text x="200" y="118" textAnchor="middle" className="font-serif italic font-bold" fill="#52154E" fillOpacity="0.6" fontSize="16" style={{ letterSpacing: '0.25em' }}>
              AGILITY
            </text>
          </svg>
        );

      case "neural-fusion":
        // Pattern Recognition: Connected nodes and logic paths
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#F5F4F0" />
            <g transform="translate(100, 62.5)">
              {/* Nodes */}
              {[
                { x: 50, y: 50 }, { x: 150, y: 30 }, { x: 250, y: 70 },
                { x: 100, y: 120 }, { x: 200, y: 100 }
              ].map((node, i) => (
                <g key={i}>
                  {/* Connections */}
                  {i > 0 && (
                    <motion.line
                      x1={50} y1={50} x2={node.x} y2={node.y}
                      stroke="#7A9A7D" strokeWidth="1.5" strokeOpacity="0.4"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 2, delay: i * 0.3, repeat: Infinity }}
                    />
                  )}
                  <motion.circle
                    cx={node.x} cy={node.y} r="6"
                    fill={i % 2 === 0 ? "#7A9A7D" : "#52154E"}
                    fillOpacity="0.5"
                    animate={{ r: [6, 9, 6], fillOpacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
                  />
                </g>
              ))}
            </g>
          </svg>
        );

      case "mindful-paths":
        // Spatial Rotation: Flowing, meditative lines
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#F5F4F0" />
            <motion.path
              d="M100 112.5 C 150 40, 250 185, 300 112.5"
              stroke="#7A9A7D"
              strokeWidth="3.5"
              strokeOpacity="0.4"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M100 112.5 C 150 40, 250 185, 300 112.5",
                  "M100 112.5 C 150 185, 250 40, 300 112.5",
                  "M100 112.5 C 150 40, 250 185, 300 112.5"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path
              d="M100 112.5 C 150 185, 250 40, 300 112.5"
              stroke="#52154E"
              strokeWidth="2.5"
              strokeOpacity="0.25"
              fill="none"
              strokeLinecap="round"
              animate={{
                d: [
                  "M100 112.5 C 150 185, 250 40, 300 112.5",
                  "M100 112.5 C 150 40, 250 185, 300 112.5",
                  "M100 112.5 C 150 185, 250 40, 300 112.5"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            />
          </svg>
        );

      default:
        return (
          <div className="w-full h-full bg-[#FAF9F5] flex items-center justify-center">
            <motion.div 
              className="w-12 h-12 rounded-2xl bg-green/5 border border-green/10"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>
        );
    }
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {renderIllustration()}
      {/* Premium grain and gradient overlays */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-white/40 via-transparent to-black/[0.02]" />
    </div>
  );
}
