"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Trophy, Activity, Zap, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppShare } from "../whatsapp-share";
import { useMindGym } from "../mind-gym-context";

const ROUNDS = 5;

export function ReactionTrainer() {
  const [gameState, setGameState] = useState<"START" | "WAITING" | "READY" | "CLICKED" | "FINISHED" | "TOO_SOON">("START");
  const [results, setResults] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const { addProgress } = useMindGym();
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRound = useCallback(() => {
    setGameState("WAITING");
    const delay = 1000 + Math.random() * 4000;
    
    timerRef.current = setTimeout(() => {
      setGameState("READY");
      setStartTime(Date.now());
    }, delay);
  }, []);

  const handleClick = () => {
    if (gameState === "WAITING") {
      if (timerRef.current) clearTimeout(timerRef.current);
      setGameState("TOO_SOON");
    } else if (gameState === "READY" && startTime) {
      const reactionTime = Date.now() - startTime;
      const newResults = [...results, reactionTime];
      setResults(newResults);
      setGameState("CLICKED");
      addProgress(10);

      if (newResults.length >= ROUNDS) {
        setTimeout(() => {
          setGameState("FINISHED");
          addProgress(20);
        }, 1000);
      }
    }
  };

  const startGame = () => {
    setResults([]);
    startRound();
  };

  const getAverage = () => {
    if (results.length === 0) return 0;
    return Math.round(results.reduce((a, b) => a + b, 0) / results.length);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

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
                <Activity className="w-8 h-8 text-purple" />
              </div>
              <h3 className="text-2xl font-serif text-green mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Pulse Check
              </h3>
              <p className="text-black/60 text-sm mb-8 font-medium leading-relaxed">
                Click as fast as you can when the screen turns green.
              </p>
              <button
                onClick={startGame}
                className="dm-pill-button dm-pill-button-primary w-full inline-flex items-center justify-center gap-2 py-4"
              >
                <Play className="w-4 h-4" />
                Start Test
              </button>
            </div>
          </motion.div>
        )}

        {(gameState === "WAITING" || gameState === "READY" || gameState === "CLICKED" || gameState === "TOO_SOON") && (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col items-center justify-center space-y-8"
          >
            <div className="flex justify-between items-center w-full max-w-sm px-4">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
                Attempt {results.length + (gameState === "CLICKED" ? 0 : 1)} / {ROUNDS}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-green">
                Avg: {getAverage()}ms
              </div>
            </div>

            <button
              onClick={handleClick}
              className={cn(
                "w-full max-w-[400px] aspect-square rounded-[3rem] shadow-2xl transition-all duration-150 flex flex-col items-center justify-center gap-4 border-4 border-white",
                gameState === "WAITING" && "bg-purple text-white/40",
                gameState === "READY" && "bg-green text-white scale-105 shadow-green/20",
                gameState === "CLICKED" && "bg-white text-green",
                gameState === "TOO_SOON" && "bg-red-500 text-white"
              )}
            >
              <AnimatePresence mode="wait">
                {gameState === "WAITING" && (
                  <motion.div 
                    key="waiting"
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    <span className="font-black text-[10px] uppercase tracking-[0.4em]">Wait for Green</span>
                  </motion.div>
                )}
                {gameState === "READY" && (
                  <motion.div 
                    key="ready"
                    initial={{ scale: 0.8, opacity: 0 }} 
                    animate={{ scale: 1, opacity: 1 }} 
                    className="flex flex-col items-center gap-4"
                  >
                    <Zap className="w-16 h-16 fill-white" />
                    <span className="font-black text-2xl uppercase tracking-[0.4em]">CLICK!</span>
                  </motion.div>
                )}
                {gameState === "CLICKED" && (
                  <motion.div 
                    key="clicked"
                    initial={{ y: 20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <span className="text-6xl font-black tabular-nums">{results[results.length - 1]}ms</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); startRound(); }}
                      className="dm-pill-button dm-pill-button-secondary py-3 px-8 text-[10px]"
                    >
                      Next Attempt
                    </button>
                  </motion.div>
                )}
                {gameState === "TOO_SOON" && (
                  <motion.div 
                    key="soon"
                    initial={{ x: -20, opacity: 0 }} 
                    animate={{ x: 0, opacity: 1 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <span className="font-black text-xl uppercase tracking-[0.2em]">Too Soon!</span>
                    <button 
                      onClick={(e) => { e.stopPropagation(); startRound(); }}
                      className="bg-white/20 hover:bg-white/30 text-white font-black text-[10px] uppercase tracking-widest py-3 px-8 rounded-full transition-all"
                    >
                      Try Again
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <div className="h-8 flex items-center justify-center text-purple/20 font-black text-[10px] uppercase tracking-[0.3em]">
              Test your processing speed
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
                Pulse Confirmed
              </h3>
              <p className="text-black/60 text-sm mb-4 font-medium">
                Average Reaction Time
              </p>
              <div className="text-4xl font-black text-green mb-10 tabular-nums">
                {getAverage()}ms
              </div>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={startGame}
                  className="dm-pill-button dm-pill-button-primary w-full py-4 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Pulse
                </button>
                <WhatsAppShare 
                  gameName="Pulse Check"
                  result={`${getAverage()}ms average`}
                  slug="pulse-check"
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
