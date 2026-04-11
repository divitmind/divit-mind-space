"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Trophy, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

const GRID_SIZE = 5;
const TOTAL_NUMBERS = GRID_SIZE * GRID_SIZE;

export function SchulteTable() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "FINISHED">("START");
  const [startTime, setStartTime] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [errorIndex, setErrorIndex] = useState<number | null>(null);

  const generateNumbers = useCallback(() => {
    const nums = Array.from({ length: TOTAL_NUMBERS }, (_, i) => i + 1);
    for (let i = nums.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [nums[i], nums[j]] = [nums[j], nums[i]];
    }
    setNumbers(nums);
  }, []);

  const startGame = () => {
    generateNumbers();
    setNextNumber(1);
    setGameState("PLAYING");
    setStartTime(Date.now());
    setTimeElapsed(0);
  };

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
      if (num === TOTAL_NUMBERS) {
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
              <h3 className="text-xl font-serif text-green mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Ready to focus?
              </h3>
              <p className="text-black/60 text-sm mb-8 font-medium">
                Find and click the numbers from 1 to 25 as fast as you can. Keep your eyes in the center of the grid to train peripheral vision.
              </p>
              <button
                onClick={startGame}
                className="dm-pill-button dm-pill-button-primary inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Training
              </button>
            </div>
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
              <div className="flex items-center gap-2 text-green font-bold">
                <Timer className="w-4 h-4" />
                <span className="tabular-nums">{formatTime(timeElapsed)}</span>
              </div>
              <div className="text-purple font-bold text-sm uppercase tracking-widest">
                Target: {nextNumber}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 md:gap-3">
              {numbers.map((num, idx) => (
                <motion.button
                  key={idx}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNumberClick(num, idx)}
                  className={cn(
                    "aspect-square flex items-center justify-center rounded-xl md:rounded-2xl text-lg md:text-xl font-bold transition-all duration-200 shadow-sm border-2",
                    num < nextNumber 
                      ? "bg-green/10 border-green/20 text-green/30" 
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
                Excellent Focus!
              </h3>
              <p className="text-black/60 text-sm mb-6 font-medium">
                You completed the Schulte Table in
              </p>
              <div className="text-4xl font-bold text-green mb-8">
                {formatTime(timeElapsed)}
              </div>
              <button
                onClick={startGame}
                className="dm-pill-button dm-pill-button-primary inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
