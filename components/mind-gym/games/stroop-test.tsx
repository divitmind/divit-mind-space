"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Trophy, Zap, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const COLORS = [
  { name: "Red", value: "#ef4444", class: "text-red-500" },
  { name: "Blue", value: "#3b82f6", class: "text-blue-500" },
  { name: "Green", value: "#22c55e", class: "text-green-500" },
  { name: "Yellow", value: "#eab308", class: "text-yellow-500" },
  { name: "Purple", value: "#a855f7", class: "text-purple-500" },
];

const TOTAL_ROUNDS = 20;

export function StroopTest() {
  const [currentWord, setCurrentWord] = useState({ text: "", color: "", colorName: "" });
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "FINISHED">("START");
  const [startTime, setStartTime] = useState(0);
  const [results, setResults] = useState<{ time: number; correct: boolean }[]>([]);
  const [feedback, setFeedback] = useState<"CORRECT" | "WRONG" | null>(null);

  const generateWord = useCallback(() => {
    const textIdx = Math.floor(Math.random() * COLORS.length);
    const colorIdx = Math.floor(Math.random() * COLORS.length);
    
    setCurrentWord({
      text: COLORS[textIdx].name,
      color: COLORS[colorIdx].value,
      colorName: COLORS[colorIdx].name
    });
    setStartTime(Date.now());
  }, []);

  const startGame = () => {
    setRound(1);
    setScore(0);
    setResults([]);
    setGameState("PLAYING");
    generateWord();
  };

  const handleAnswer = (colorName: string) => {
    if (gameState !== "PLAYING" || feedback) return;

    const endTime = Date.now();
    const isCorrect = colorName === currentWord.colorName;
    const reactionTime = endTime - startTime;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setFeedback("CORRECT");
    } else {
      setFeedback("WRONG");
    }

    setResults(prev => [...prev, { time: reactionTime, correct: isCorrect }]);

    setTimeout(() => {
      setFeedback(null);
      if (round < TOTAL_ROUNDS) {
        setRound(prev => prev + 1);
        generateWord();
      } else {
        setGameState("FINISHED");
      }
    }, 400);
  };

  const averageTime = results.length > 0 
    ? (results.reduce((acc, curr) => acc + curr.time, 0) / results.length / 1000).toFixed(2)
    : 0;

  return (
    <div className="w-full max-w-xl mx-auto">
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
              <Zap className="w-12 h-12 text-purple mx-auto mb-4" />
              <h3 className="text-xl font-serif text-green mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                The Stroop Challenge
              </h3>
              <p className="text-black/60 text-sm mb-8 font-medium leading-relaxed">
                A word will appear. Your goal is to identify the <strong>color of the ink</strong>, not what the word says. Stay sharp!
              </p>
              <button
                onClick={startGame}
                className="dm-pill-button dm-pill-button-primary inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Start Test
              </button>
            </div>
          </motion.div>
        )}

        {gameState === "PLAYING" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-12"
          >
            <div className="flex justify-between items-center px-4">
              <div className="text-xs font-bold uppercase tracking-widest text-black/40">
                Round {round} / {TOTAL_ROUNDS}
              </div>
              <div className="text-xs font-bold uppercase tracking-widest text-green">
                Score: {score}
              </div>
            </div>

            <div className="h-40 flex items-center justify-center relative">
              <motion.div
                key={`${round}-${currentWord.text}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl md:text-8xl font-black tracking-tight"
                style={{ color: currentWord.color }}
              >
                {currentWord.text}
              </motion.div>

              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  >
                    {feedback === "CORRECT" ? (
                      <CheckCircle2 className="w-24 h-24 text-green/50" />
                    ) : (
                      <XCircle className="w-24 h-24 text-red-500/50" />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleAnswer(color.name)}
                  disabled={!!feedback}
                  className={cn(
                    "px-4 py-3 rounded-2xl border-2 border-black/5 font-bold text-sm transition-all active:scale-95",
                    "hover:border-purple/30 hover:shadow-md bg-white text-black/70",
                    feedback && "opacity-50"
                  )}
                >
                  {color.name}
                </button>
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
                Test Complete!
              </h3>
              
              <div className="grid grid-cols-2 gap-4 my-8">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-black/5">
                  <div className="text-xs font-bold text-black/40 uppercase mb-1">Accuracy</div>
                  <div className="text-2xl font-bold text-green">{Math.round((score / TOTAL_ROUNDS) * 100)}%</div>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-black/5">
                  <div className="text-xs font-bold text-black/40 uppercase mb-1">Avg Speed</div>
                  <div className="text-2xl font-bold text-green">{averageTime}s</div>
                </div>
              </div>

              <button
                onClick={startGame}
                className="dm-pill-button dm-pill-button-primary inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retake Test
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
