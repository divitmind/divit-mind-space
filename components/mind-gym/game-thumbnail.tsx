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
        // Reaction Time Preview
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#FAF9F5" />
            
            {/* Main Central Button */}
            <motion.rect
              x="130" y="42.5" width="140" height="140" rx="70"
              fill="#7A9A7D"
              animate={{
                fill: ["#7A9A7D", "#52154E", "#7A9A7D"],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            <text x="200" y="118" textAnchor="middle" className="font-sans font-black" fill="white" fontSize="14" style={{ letterSpacing: '0.1em' }}>
              WAIT...
            </text>

            <text x="200" y="200" textAnchor="middle" className="font-sans font-bold" fill="#7A9A7D" fillOpacity="0.4" fontSize="10">
              REACTION SPEED TEST
            </text>
            
            {/* MS Counter */}
            <text x="350" y="40" textAnchor="middle" className="font-mono font-bold" fill="#7A9A7D" fontSize="12">
              214ms
            </text>
          </svg>
        );

      case "schulte-table":
        // Schulte Table Grid Preview
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#FAF9F5" />
            <g transform="translate(115, 27.5)">
              {[0, 1, 2, 3, 4].map((i) => (
                [0, 1, 2, 3, 4].map((j) => {
                  const num = (i * 5 + j + 1);
                  const isTarget = num === 7;
                  return (
                    <g key={`${i}-${j}`}>
                      <rect
                        x={i * 34} y={j * 34}
                        width="30" height="30"
                        rx="6"
                        fill={isTarget ? "#52154E" : "white"}
                        stroke="#52154E"
                        strokeOpacity="0.1"
                        strokeWidth="1"
                      />
                      <text 
                        x={i * 34 + 15} y={j * 34 + 20} 
                        textAnchor="middle" 
                        fontSize="10" 
                        fontWeight="900" 
                        fill={isTarget ? "white" : "#52154E"}
                        fillOpacity={isTarget ? 1 : 0.4}
                      >
                        {num}
                      </text>
                      {isTarget && (
                        <motion.circle
                          cx={i * 34 + 15} cy={j * 34 + 15} r="20"
                          stroke="#52154E"
                          strokeWidth="2"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.5, 1.8] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        />
                      )}
                    </g>
                  );
                })
              ))}
            </g>
          </svg>
        );

      case "stroop-test":
        // Stroop Interference Preview
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#FAF9F5" />
            
            {/* Word "BLUE" in Red */}
            <motion.g
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <rect x="80" y="62.5" width="240" height="60" rx="30" fill="white" stroke="#52154E" strokeOpacity="0.05" />
              <text x="200" y="103" textAnchor="middle" className="font-sans font-black" fill="#EF4444" fontSize="32" style={{ letterSpacing: '0.1em' }}>
                BLUE
              </text>
            </motion.g>

            {/* Response Buttons */}
            <g transform="translate(100, 140)">
              {['RED', 'GREEN', 'BLUE'].map((color, i) => (
                <g key={color} transform={`translate(${i * 70}, 0)`}>
                  <rect width="60" height="30" rx="15" fill={i === 0 ? "#52154E" : "white"} stroke="#52154E" strokeOpacity="0.1" />
                  <text x="30" y="20" textAnchor="middle" fontSize="8" fontWeight="900" fill={i === 0 ? "white" : "#52154E"}>{color}</text>
                  {i === 0 && (
                     <motion.circle cx="30" cy="15" r="20" stroke="#52154E" strokeWidth="1" animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 1 }} />
                  )}
                </g>
              ))}
            </g>
          </svg>
        );

      case "neural-fusion":
        // 2048-style Synthesis Preview
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#FAF9F5" />
            <g transform="translate(110, 22.5)">
              {[0, 1, 2, 3].map((i) => (
                [0, 1, 2, 3].map((j) => (
                  <rect key={`${i}-${j}`} x={i * 46} y={j * 46} width="42" height="42" rx="8" fill="white" stroke="#7A9A7D" strokeOpacity="0.1" />
                ))
              ))}
              
              {/* Active Tiles Merging */}
              <motion.g animate={{ x: [0, 46, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "anticipate" }}>
                <rect x="46" y="46" width="42" height="42" rx="8" fill="#7A9A7D" />
                <text x="67" y="74" textAnchor="middle" fontSize="16" fontWeight="900" fill="white">8</text>
              </motion.g>
              <rect x="92" y="46" width="42" height="42" rx="8" fill="#7A9A7D" />
              <text x="113" y="74" textAnchor="middle" fontSize="16" fontWeight="900" fill="white">8</text>
              
              <rect x="0" y="0" width="42" height="42" rx="8" fill="#52154E" fillOpacity="0.8" />
              <text x="21" y="28" textAnchor="middle" fontSize="16" fontWeight="900" fill="white">64</text>
            </g>
          </svg>
        );

      case "mindful-paths":
        // Spatial Pattern Preview
        return (
          <svg viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <rect width="400" height="225" fill="#FAF9F5" />
            <g transform="translate(125, 37.5)">
              {[0, 1, 2].map((i) => (
                [0, 1, 2].map((j) => (
                  <circle key={`${i}-${j}`} cx={i * 75} cy={j * 75} r="4" fill="#7A9A7D" fillOpacity="0.2" />
                ))
              ))}
              <motion.path
                d="M0 0 L75 0 L75 75 L150 75 L150 150"
                stroke="#7A9A7D"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.circle
                cx="150" cy="150" r="10"
                fill="#7A9A7D"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </g>
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
