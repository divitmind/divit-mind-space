"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Trophy, Timer, Target, Settings2, BarChart3, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppShare } from "../whatsapp-share";

type GridSize = 3 | 4 | 5;

export function SchulteTable() {
  const [gridSize, setGridSize] = useState<GridSize>(5);
  const [numbers, setNumbers] = useState<number[]>([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [gameState, setGameState] = useState<"START" | "COUNTDOWN" | "PLAYING" | "FINISHED">("START");
  const [startTime, setStartTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [errorIndex, setErrorIndex] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(3);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [clickStats, setClickStats] = useState<number[]>([]);

  const totalNumbers = gridSize * gridSize;

  const generateNumbers = useCallback(() => {
    const nums = Array.from({ length: totalNumbers }, (_, i) => i + 1);
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setNumbers(nums);
  }, [totalNumbers]);

  const startCountdown = () => {
    generateNumbers();
    setNextNumber(1);
    setGameState("COUNTDOWN");
    setCountdown(3);
    setClickStats([]);
  };

  useEffect(() => {
    if (gameState === "COUNTDOWN") {
      if (countdown > 0) {
        const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        return () => clearTimeout(timer);
      } else {
        setGameState("PLAYING");
        setStartTime(Date.now());
        setLastClickTime(Date.now());
        setTimeElapsed(0);
      }
    }
  }, [gameState, countdown]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (gameState === "PLAYING") {
      interval = setInterval(() => {
        setTimeElapsed(Date.now() - startTime);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [gameState, startTime]);

  const handleNumberClick = (num: number, index: number) => {
    if (gameState !== "PLAYING") return;

    if (num === nextNumber) {
      const now = Date.now();
      setClickStats(prev => [...prev, now - lastClickTime]);
      setLastClickTime(now);

      if (num === totalNumbers) {
        setGameState("FINISHED");
      } else {
        setNextNumber(prev => prev + 1);
      }
    } else {
      setErrorIndex(index);
      setTimeout(() => setErrorIndex(null), 300);
    }
  };

  const formatTime = (ms: number) => {
    const seconds = (ms / 1000).toFixed(2);
    return `${seconds}s`;
  };

  const avgTimePerItem = clickStats.length > 0
    ? (clickStats.reduce((a, b) => a + b, 0) / clickStats.length / 1000).toFixed(2)
    : 0;

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {gameState === "START" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center space-y-6"
          >
            <div className="p-8 bg-purple/5 rounded-[2rem] border border-purple/10">
              <div className="w-12 h-12 bg-purple/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-purple" />
              </div>
              <h3 className="text-xl font-serif text-green mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Visual Scanning
              </h3>
              <p className="text-black/60 text-sm mb-8 font-medium max-w-xs mx-auto leading-relaxed">
                Find numbers 1 to {totalNumbers} in sequence. Keep your eyes on the center to improve peripheral vision.
              </p>

              <div className="flex justify-center gap-3 mb-8">
                {[3, 4, 5].map((size) => (
                  <button
                    key={size}
                    onClick={() => setGridSize(size as GridSize)}
                    className={cn(
                      "w-12 h-12 rounded-xl border-2 font-bold text-sm transition-all",
                      gridSize === size 
                        ? "bg-purple border-purple text-white shadow-lg shadow-purple/20" 
                        : "bg-white border-black/5 text-black/40 hover:border-purple/30"
                    )}
                  >
                    {size}x{size}
                  </button>
                ))}
              </div>

              <button
                onClick={startCountdown}
                className="dm-pill-button dm-pill-button-primary w-full inline-flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Training
              </button>
            </div>
          </motion.div>
        )}

        {gameState === "COUNTDOWN" && (
          <motion.div
            key="countdown"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.5 }}
            className="flex flex-col items-center justify-center py-20"
          >
            <div className="text-8xl font-black text-purple">
              {countdown === 0 ? "GO!" : countdown}
            </div>
            <p className="text-black/40 font-bold uppercase tracking-[0.2em] mt-4">Focus on the center</p>
          </motion.div>
        )}

        {gameState === "PLAYING" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2 text-green font-bold bg-white px-4 py-2 rounded-full shadow-sm border border-black/5">
                <Timer className="w-4 h-4" />
                <span className="tabular-nums text-sm">{formatTime(timeElapsed)}</span>
              </div>
              <div className="text-purple font-black text-sm uppercase tracking-widest bg-purple/5 px-4 py-2 rounded-full border border-purple/10">
                Target: {nextNumber}
              </div>
            </div>

            <div 
              className={cn("grid gap-2 md:gap-3 relative", 
                gridSize === 3 ? "grid-cols-3" : gridSize === 4 ? "grid-cols-4" : "grid-cols-5"
              )}
            >
              {/* Center Focal Point - subtle helper */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                <div className="w-4 h-4 rounded-full border-2 border-green" />
              </div>

              {numbers.map((num, idx) => (
                <motion.button
                  key={`${gridSize}-${idx}`}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleNumberClick(num, idx)}
                  className={cn(
                    "aspect-square flex items-center justify-center rounded-xl md:rounded-2xl text-lg md:text-xl font-bold transition-all duration-200 shadow-sm border-2",
                    num < nextNumber 
                      ? "bg-green/5 border-green/10 text-green/20" 
                      : "bg-white border-black/5 text-green hover:border-purple/30 hover:shadow-md",
                    errorIndex === idx && "bg-red-500 border-red-500 text-white animate-shake"
                  )}
                >
                  {num}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === "FINISHED" && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="p-8 bg-green/5 rounded-[2rem] border border-green/10">
              <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-2xl font-serif text-green mb-2" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Great Visual Focus!
              </h3>
              
              <div className="grid grid-cols-2 gap-4 my-8">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-black/5">
                  <div className="text-[10px] font-bold text-black/40 uppercase mb-1">Total Time</div>
                  <div className="text-2xl font-bold text-green">{formatTime(timeElapsed)}</div>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-black/5">
                  <div className="text-[10px] font-bold text-black/40 uppercase mb-1">Avg Speed</div>
                  <div className="text-2xl font-bold text-purple">{avgTimePerItem}s</div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={startCountdown}
                  className="dm-pill-button dm-pill-button-primary w-full inline-flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>

                <WhatsAppShare 
                  gameName={`Schulte Table (${gridSize}x${gridSize})`}
                  result={`${formatTime(timeElapsed)} (Avg: ${avgTimePerItem}s/item)`}
                  slug="schulte-table"
                  className="w-full"
                />

                <button
                  onClick={() => setGameState("START")}
                  className="text-xs font-bold uppercase tracking-widest text-black/40 hover:text-green transition-colors w-full"
                >
                  Change Grid Size
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
