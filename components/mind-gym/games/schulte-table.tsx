"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Trophy, Timer, Eye, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppShare } from "../whatsapp-share";
import { useMindGym } from "../mind-gym-context";

export function SchulteTable() {
  const [numbers, setNumbers] = useState<number[]>([]);
  const [nextNumber, setNextNumber] = useState(1);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "FINISHED">("START");
  const { addProgress } = useMindGym();
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const shuffle = (array: number[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const startGame = () => {
    const nums = Array.from({ length: 25 }, (_, i) => i + 1);
    setNumbers(shuffle(nums));
    setNextNumber(1);
    setGameState("PLAYING");
    setStartTime(Date.now());
    setElapsedTime(0);
  };

  useEffect(() => {
    if (gameState === "PLAYING") {
      timerRef.current = setInterval(() => {
        if (startTime) {
          setElapsedTime((Date.now() - startTime) / 1000);
        }
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, startTime]);

  const handleNumberClick = (num: number) => {
    if (gameState !== "PLAYING") return;

    if (num === nextNumber) {
      if (num === 25) {
        setGameState("FINISHED");
        addProgress(30);
      } else {
        setNextNumber(prev => prev + 1);
        addProgress(1); // Small progress for each correct number
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {gameState === "START" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="p-10 bg-purple/5 rounded-[3rem] border border-purple/10 max-w-sm">
              <div className="w-16 h-16 bg-purple/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Eye className="w-8 h-8 text-purple" />
              </div>
              <h3 className="text-2xl font-serif text-green mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Schulte Table
              </h3>
              <p className="text-black/60 text-sm mb-8 font-medium leading-relaxed">
                Find numbers 1 to 25 in sequence. Keeps your gaze on the center to train peripheral vision.
              </p>
              <button
                onClick={startGame}
                className="dm-pill-button dm-pill-button-primary w-full inline-flex items-center justify-center gap-2 py-4"
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
            className="w-full h-full flex flex-col items-center justify-center space-y-8"
          >
            <div className="flex justify-between items-center w-full max-w-sm px-4">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
                <Timer className="w-3 h-3" />
                {elapsedTime.toFixed(1)}s
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-green">
                Target: {nextNumber}
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 p-4 bg-white/50 backdrop-blur-sm rounded-[2.5rem] shadow-2xl border-4 border-white aspect-square w-full max-w-[400px]">
              {numbers.map((num) => {
                const isNext = num === nextNumber;
                const isFound = num < nextNumber;
                
                return (
                  <button
                    key={num}
                    onClick={() => handleNumberClick(num)}
                    className={cn(
                      "aspect-square rounded-xl flex items-center justify-center text-lg font-black transition-all duration-300",
                      isFound 
                        ? "bg-green/10 text-green/20" 
                        : "bg-white text-green shadow-sm hover:shadow-md hover:scale-105 active:scale-95"
                    )}
                  >
                    {num}
                  </button>
                );
              })}
            </div>
            
            <div className="h-8 flex items-center justify-center">
              <div className="flex items-center gap-2 text-purple/20 font-black text-[10px] uppercase tracking-[0.3em]">
                Focus on the Center
              </div>
            </div>
          </motion.div>
        )}

        {gameState === "FINISHED" && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="p-10 bg-green/5 rounded-[3rem] border border-green/10 max-w-sm">
              <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-green mb-2" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Vision Sharpened
              </h3>
              <p className="text-black/60 text-sm mb-4 font-medium">
                You found all numbers in
              </p>
              <div className="text-4xl font-black text-green mb-10 tabular-nums">
                {elapsedTime.toFixed(2)}s
              </div>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={startGame}
                  className="dm-pill-button dm-pill-button-primary w-full py-4 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
                <WhatsAppShare 
                  gameName="Schulte Table"
                  result={`${elapsedTime.toFixed(2)} seconds`}
                  slug="schulte-table"
                  className="w-full"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
