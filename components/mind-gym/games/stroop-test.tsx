"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Trophy, Zap, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppShare } from "../whatsapp-share";
import { useMindGym } from "../mind-gym-context";

const COLORS = [
  { name: "Green", value: "text-green", hex: "#7A9A7D" },
  { name: "Purple", value: "text-purple", hex: "#52154E" },
  { name: "Blue", value: "text-blue-600", hex: "#2563eb" },
  { name: "Red", value: "text-red-600", hex: "#dc2626" },
];

const ROUNDS = 15;

export function StroopTest() {
  const [currentRound, setCurrentRound] = useState(0);
  const [word, setWord] = useState(COLORS[0]);
  const [color, setColor] = useState(COLORS[1]);
  const [options, setOptions] = useState<typeof COLORS>([]);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "FINISHED">("START");
  const [feedback, setFeedback] = useState<"CORRECT" | "WRONG" | null>(null);
  const { addProgress } = useMindGym();

  const nextRound = useCallback(() => {
    if (currentRound >= ROUNDS) {
      setGameState("FINISHED");
      addProgress(30);
      return;
    }

    const randomWord = COLORS[Math.floor(Math.random() * COLORS.length)];
    const randomColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    setWord(randomWord);
    setColor(randomColor);
    setOptions([...COLORS].sort(() => Math.random() - 0.5));
    setCurrentRound(prev => prev + 1);
    setFeedback(null);
  }, [currentRound, addProgress]);

  const startGame = () => {
    setCurrentRound(0);
    setScore(0);
    setGameState("PLAYING");
    nextRound();
  };

  const handleOptionClick = (selectedColorName: string) => {
    if (feedback) return;

    if (selectedColorName === color.name) {
      setScore(prev => prev + 1);
      setFeedback("CORRECT");
      addProgress(2);
    } else {
      setFeedback("WRONG");
    }

    setTimeout(nextRound, 600);
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
                <Zap className="w-8 h-8 text-purple" />
              </div>
              <h3 className="text-2xl font-serif text-green mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Stroop Test
              </h3>
              <p className="text-black/60 text-sm mb-8 font-medium leading-relaxed">
                Ignore the word text and identify the ink color as fast as possible.
              </p>
              <button
                onClick={startGame}
                className="dm-pill-button dm-pill-button-primary w-full inline-flex items-center justify-center gap-2 py-4"
              >
                <Play className="w-4 h-4" />
                Begin Test
              </button>
            </div>
          </motion.div>
        )}

        {gameState === "PLAYING" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col items-center justify-center space-y-12"
          >
            <div className="flex justify-between items-center w-full max-w-sm px-4">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
                Round {currentRound} / {ROUNDS}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-green">
                Correct: {score}
              </div>
            </div>

            <div className="relative h-48 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${word.name}-${color.name}`}
                  initial={{ opacity: 0, y: 20, scale: 0.8 }}
                  animate={{ 
                    opacity: 1, 
                    y: 0, 
                    scale: feedback === "WRONG" ? [1, 1.1, 1] : 1,
                    x: feedback === "WRONG" ? [0, -10, 10, -10, 0] : 0
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className={cn(
                    "text-6xl md:text-8xl font-black uppercase tracking-tighter transition-colors duration-300",
                    color.value
                  )}
                >
                  {word.name}
                </motion.div>
              </AnimatePresence>
              
              {/* Visual Feedback Ripple */}
              <AnimatePresence>
                {feedback === "CORRECT" && (
                  <motion.div 
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 2, opacity: 0.2 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-green rounded-full blur-3xl pointer-events-none"
                  />
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full max-w-sm p-4">
              {options.map((option) => (
                <button
                  key={option.name}
                  onClick={() => handleOptionClick(option.name)}
                  className="bg-white hover:bg-black/5 text-black/40 hover:text-green font-black text-[10px] uppercase tracking-[0.3em] py-6 rounded-2xl border border-black/5 shadow-sm transition-all active:scale-95"
                >
                  {option.name}
                </button>
              ))}
            </div>

            <div className="h-8 flex items-center justify-center">
              <div className="flex items-center gap-2 text-purple/20 font-black text-[10px] uppercase tracking-[0.3em]">
                Select the Ink Color
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
                Test Complete
              </h3>
              <div className="text-4xl font-black text-green mb-4 tabular-nums">
                {score} / {ROUNDS}
              </div>
              <p className="text-black/60 text-sm mb-10 font-medium">
                Accuracy: {Math.round((score / ROUNDS) * 100)}%
              </p>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={startGame}
                  className="dm-pill-button dm-pill-button-primary w-full py-4 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try Again
                </button>
                <WhatsAppShare 
                  gameName="Stroop Test"
                  result={`${score}/${ROUNDS} correct`}
                  slug="stroop-test"
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
