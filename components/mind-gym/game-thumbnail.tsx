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
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#FAF9F5" />
            <motion.circle 
              cx="200" cy="112.5" r="40" 
              stroke="#7A9A7D" strokeWidth="0.5" strokeDasharray="4 4"
              animate={{ r: [40, 60, 40], opacity: [0.3, 0.1, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle 
              cx="200" cy="112.5" r="20" 
              fill="#7A9A7D" fillOpacity="0.1"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            />
            <circle cx="200" cy="112.5" r="4" fill="#7A9A7D" />
            <path d="M120 112.5H280" stroke="#000" strokeOpacity="0.05" strokeWidth="1" />
          </svg>
        );
      case "schulte-table":
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#FAF9F5" />
            <g opacity="0.1">
              {Array.from({ length: 5 }).map((_, i) => (
                Array.from({ length: 5 }).map((_, j) => (
                  <rect 
                    key={`${i}-${j}`}
                    x={140 + i * 25} y={52.5 + j * 25} 
                    width="20" height="20" 
                    rx="4" fill="#52154E" 
                  />
                ))
              ))}
            </g>
            <motion.rect 
              x="190" y="102.5" width="20" height="20" rx="4" 
              fill="#52154E" fillOpacity="0.2" stroke="#52154E" strokeWidth="1"
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </svg>
        );
      case "stroop-test":
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#FAF9F5" />
            <motion.circle 
              cx="180" cy="112.5" r="45" fill="#7A9A7D" fillOpacity="0.2" 
              animate={{ x: [180, 190, 180] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.circle 
              cx="220" cy="112.5" r="45" fill="#52154E" fillOpacity="0.2" 
              animate={{ x: [220, 210, 220] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
            <text x="200" y="120" textAnchor="middle" fill="#000" fillOpacity="0.1" fontSize="12" fontWeight="900" letterSpacing="4">FOCUS</text>
          </svg>
        );
      case "neural-fusion":
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#FAF9F5" />
            <motion.rect 
              x="160" y="82.5" width="40" height="40" rx="12" fill="#7A9A7D" fillOpacity="0.15" 
              animate={{ x: [160, 180, 160], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <motion.rect 
              x="200" y="102.5" width="40" height="40" rx="12" fill="#52154E" fillOpacity="0.15" 
              animate={{ x: [200, 180, 200], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <circle cx="200" cy="112.5" r="2" fill="#000" fillOpacity="0.1" />
          </svg>
        );
      case "mindful-paths":
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#FAF9F5" />
            <motion.path 
              d="M120 150C160 150 180 75 220 75C260 75 280 150 320 150" 
              stroke="#7A9A7D" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.2"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.path 
              d="M120 75C160 75 180 150 220 150C260 150 280 75 320 75" 
              stroke="#52154E" strokeWidth="2" strokeLinecap="round" strokeOpacity="0.1"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            />
          </svg>
        );
      default:
        return (
          <div className="w-full h-full bg-[#FAF9F5] flex items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-purple/5 flex items-center justify-center">
              <rect width="40" height="40" fill="currentColor" className="text-purple/10" />
            </div>
          </div>
        );
    }
  };

  return (
    <div className={cn("relative w-full h-full overflow-hidden", className)}>
      {renderIllustration()}
      {/* Soft grain overlay for premium feel */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent" />
    </div>
  );
}
