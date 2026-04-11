"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Trophy, Zap, AlertCircle, Timer, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

const TOTAL_TRIALS = 5;

export function ReactionTrainer() {
  const [gameState, setGameState] = useState<"START" | "WAITING" | "ACTION" | "RESULT" | "TOO_EARLY">("START");
  const [trials, setTrials] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [currentReaction, setCurrentReaction] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startTrial = useCallback(() => {
    setGameState("WAITING");
    
    // Random delay between 2 and 5 seconds
    const delay = Math.random() * 3000 + 2000;
    
    timerRef.current = setTimeout(() => {
      setGameState("ACTION");
      setStartTime(Date.now());
    }, delay);
  }, []);

  const handleClick = () => {
    if (gameState === "WAITING") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState("TOO_EARLY");
    } else if (gameState === "ACTION") {
      const reactionTime = Date.now() - startTime;
      setCurrentReaction(reactionTime);
      setTrials(prev => [...prev, reactionTime]);
      setGameState("RESULT");
    }
  };

  const nextStep = () => {
    if (trials.length < TOTAL_TRIALS) {
      startTrial();
    } else {
      setGameState("FINISHED" as any);
    }
  };

  const resetGame = () => {
    setTrials([]);
    setCurrentReaction(0);
    setGameState("START");
  };

  const averageTime = trials.length > 0 
    ? Math.round(trials.reduce((a, b) => a + b, 0) / trials.length)
    : 0;

  const getInsight = (ms: number) => {
    if (ms < 200) return { label: "Elite", desc: "Your processing speed is in the top 1% of the population." };
    if (ms < 250) return { label: "Sharp", desc: "Excellent focus and neural efficiency." };
    if (ms < 300) return { label: "Steady", desc: "Solid reaction time, typical for healthy focused adults." };
    return { label: "Mindful", desc: "A great baseline. Practice can help sharpen your quick-response focus." };
  };

  return (
    <div className="w-full max-w-xl mx-auto h-[400px] flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {gameState === "START" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center space-y-6 w-full"
          >
            <div className="p-8 bg-purple/5 rounded-[2rem] border border-purple/10">
              <Activity className="w-12 h-12 text-purple mx-auto mb-4" />
              <h3 className="text-xl font-serif text-green mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Pulse Check
              </h3>
              <p className="text-black/60 text-sm mb-8 font-medium leading-relaxed max-w-xs mx-auto">
                Test your raw processing speed. Click the screen as soon as it turns <strong>Sage Green</strong>.
              </p>
              <button
                onClick={startTrial}
                className="dm-pill-button dm-pill-button-primary inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Begin Test
              </button>
            </div>
          </motion.div>
        )}

        {(gameState === "WAITING" || gameState === "ACTION" || gameState === "TOO_EARLY") && (
          <motion.div
            key="game-area"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className={cn(
              "w-full h-full rounded-[2rem] flex flex-col items-center justify-center cursor-pointer transition-colors duration-300 relative overflow-hidden border-4 border-white shadow-2xl",
              gameState === "WAITING" ? "bg-[#FAF7F2]" : 
              gameState === "ACTION" ? "bg-[#7A9A7D]" : "bg-red-50"
            )}
            onClick={handleClick}
          >
            {gameState === "WAITING" && (
              <div className="text-center">
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-20 h-20 bg-purple/5 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <div className="w-12 h-12 bg-purple/10 rounded-full" />
                </motion.div>
                <p className="text-green/40 font-bold uppercase tracking-[0.3em] text-xs">Wait for green...</p>
              </div>
            )}

            {gameState === "ACTION" && (
              <>
                <motion.div 
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 4, opacity: 0.3 }}
                  className="absolute inset-0 bg-white rounded-full pointer-events-none"
                />
                <div className="text-center relative z-10">
                  <p className="text-white font-black text-4xl uppercase tracking-widest animate-pulse">CLICK NOW!</p>
                </div>
              </>
            )}

            {gameState === "TOO_EARLY" && (
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-500 font-bold uppercase tracking-widest text-lg mb-4">Too Early!</p>
                <button
                  onClick={(e) => { e.stopPropagation(); startTrial(); }}
                  className="dm-pill-button-secondary text-xs"
                >
                  Try Again
                </button>
              </div>
            )}

            <div className="absolute top-6 right-8 text-[10px] font-bold uppercase tracking-widest text-black/20">
              Trial {trials.length + 1} / {TOTAL_TRIALS}
            </div>
          </motion.div>
        )}

        {gameState === "RESULT" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-[10px] font-bold uppercase tracking-widest text-black/40 mb-2">Reaction Time</div>
            <div className="text-7xl font-black text-green mb-8 tabular-nums">{currentReaction}<span className="text-xl ml-1">ms</span></div>
            <button
              onClick={nextStep}
              className="dm-pill-button dm-pill-button-primary"
            >
              {trials.length < TOTAL_TRIALS ? "Next Trial" : "View Final Report"}
            </button>
          </motion.div>
        )}

        {(gameState as any) === "FINISHED" && (
          <motion.div
            key="finished"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6 w-full"
          >
            <div className="p-8 bg-green/5 rounded-[2rem] border border-green/10">
              <Trophy className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
              <h3 className="text-2xl font-serif text-green mb-2" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Final Pulse Result
              </h3>
              
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-black/5 my-6">
                <div className="text-[10px] font-bold text-black/40 uppercase mb-1">Average Speed</div>
                <div className="text-4xl font-black text-green">{averageTime}ms</div>
              </div>

              <div className="text-left bg-purple/5 p-6 rounded-2xl border border-purple/10 mb-8">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-4 h-4 text-purple" />
                  <span className="text-xs font-bold uppercase tracking-widest text-purple">
                    Insight: {getInsight(averageTime).label}
                  </span>
                </div>
                <p className="text-sm text-black/70 font-medium leading-relaxed">
                  {getInsight(averageTime).desc}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={resetGame}
                  className="dm-pill-button dm-pill-button-primary inline-flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart
                </button>
                <div className="flex items-center justify-center p-4 rounded-full border-2 border-black/5 text-[10px] font-bold uppercase tracking-widest text-black/40">
                  Share Result
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
