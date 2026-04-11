"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Trophy, Zap, CheckCircle2, Heart, Timer, Target, Sparkles, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppShare } from "../whatsapp-share";

const COLORS = [
  { name: "Red", value: "#ef4444", class: "text-red-500" },
  { name: "Blue", value: "#3b82f6", class: "text-blue-500" },
  { name: "Green", value: "#22c55e", class: "text-green-500" },
  { name: "Yellow", value: "#eab308", class: "text-yellow-500" },
  { name: "Purple", value: "#a855f7", class: "text-purple-500" },
];

const INITIAL_LIVES = 3;
const BASE_TIME = 3000; // 3 seconds per round
const MIN_TIME = 1000;  // Minimum 1 second

export function StroopTest() {
  const [currentWord, setCurrentWord] = useState({ text: "", color: "", colorName: "" });
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "FINISHED">("START");
  const [results, setResults] = useState<{ time: number; correct: boolean }[]>([]);
  const [feedback, setFeedback] = useState<"CORRECT" | "WRONG" | "TIMEOUT" | null>(null);
  const [timeLeft, setTimeLeft] = useState(100);
  const [isShaking, setIsShaking] = useState(false);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef(0);

  // Calculate allowed time based on score (gets faster)
  const getAllowedTime = useCallback(() => {
    return Math.max(MIN_TIME, BASE_TIME - (score * 50));
  }, [score]);

  const generateWord = useCallback(() => {
    const textIdx = Math.floor(Math.random() * COLORS.length);
    let colorIdx = Math.floor(Math.random() * COLORS.length);
    
    // Ensure we have a mix of congruent and incongruent trials (more incongruent)
    if (Math.random() > 0.2) {
      while (colorIdx === textIdx) {
        colorIdx = Math.floor(Math.random() * COLORS.length);
      }
    }
    
    setCurrentWord({
      text: COLORS[textIdx].name,
      color: COLORS[colorIdx].value,
      colorName: COLORS[colorIdx].name
    });
    
    startTimeRef.current = Date.now();
    setTimeLeft(100);
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    const allowedTime = getAllowedTime();
    const interval = 20; // 20ms update rate
    const step = (interval / allowedTime) * 100;

    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 0) {
          handleTimeout();
          return 0;
        }
        return prev - step;
      });
    }, interval);
  }, [getAllowedTime]);

  const handleTimeout = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setFeedback("TIMEOUT");
    setLives(prev => prev - 1);
    setStreak(0);
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);

    setTimeout(() => {
      setFeedback(null);
      if (lives > 1) {
        generateWord();
      } else {
        setGameState("FINISHED");
      }
    }, 600);
  };

  const startGame = () => {
    setScore(0);
    setLives(INITIAL_LIVES);
    setStreak(0);
    setMaxStreak(0);
    setResults([]);
    setGameState("PLAYING");
    generateWord();
  };

  const handleAnswer = (colorName: string) => {
    if (gameState !== "PLAYING" || feedback) return;
    if (timerRef.current) clearInterval(timerRef.current);

    const reactionTime = Date.now() - startTimeRef.current;
    const isCorrect = colorName === currentWord.colorName;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        if (newStreak > maxStreak) setMaxStreak(newStreak);
        return newStreak;
      });
      setFeedback("CORRECT");
    } else {
      setLives(prev => prev - 1);
      setStreak(0);
      setFeedback("WRONG");
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }

    setResults(prev => [...prev, { time: reactionTime, correct: isCorrect }]);

    setTimeout(() => {
      setFeedback(null);
      if (isCorrect || lives > (isCorrect ? 0 : 1)) {
        if (!isCorrect && lives <= 1) {
          setGameState("FINISHED");
        } else {
          generateWord();
        }
      } else {
        setGameState("FINISHED");
      }
    }, 400);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const averageTime = results.length > 0 
    ? (results.filter(r => r.correct).reduce((acc, curr) => acc + curr.time, 0) / (results.filter(r => r.correct).length || 1) / 1000).toFixed(2)
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
                Color Clash Challenge
              </h3>
              <p className="text-black/60 text-sm mb-8 font-medium leading-relaxed max-w-sm mx-auto">
                Identify the <strong>color of the ink</strong> as fast as you can. Don't let the word meaning distract you. You have 3 lives!
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
            className={cn("space-y-8 p-4 rounded-[2rem] transition-colors duration-300", 
              feedback === "WRONG" || feedback === "TIMEOUT" ? "bg-red-50" : 
              feedback === "CORRECT" ? "bg-green-50" : "bg-transparent",
              isShaking && "animate-shake"
            )}
          >
            {/* Header Stats */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {Array.from({ length: INITIAL_LIVES }).map((_, i) => (
                  <Heart 
                    key={i} 
                    className={cn("w-5 h-5 transition-colors", i < lives ? "fill-red-500 text-red-500" : "text-black/10")} 
                  />
                ))}
              </div>
              <div className="flex flex-col items-end">
                <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">Score</div>
                <div className="text-xl font-bold text-green">{score}</div>
              </div>
            </div>

            {/* Timer Bar */}
            <div className="w-full h-1.5 bg-black/5 rounded-full overflow-hidden">
              <motion.div 
                className={cn("h-full transition-colors", 
                  timeLeft < 30 ? "bg-red-500" : timeLeft < 60 ? "bg-yellow-500" : "bg-purple"
                )}
                initial={{ width: "100%" }}
                animate={{ width: `${timeLeft}%` }}
                transition={{ duration: 0.05, ease: "linear" }}
              />
            </div>

            {/* Word Area */}
            <div className="h-48 flex flex-col items-center justify-center relative">
              {streak > 1 && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-0 text-purple font-black text-sm uppercase tracking-[0.2em]"
                >
                  {streak} STREAK!
                </motion.div>
              )}
              
              <motion.div
                key={`${score}-${currentWord.text}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-6xl md:text-8xl font-black tracking-tight drop-shadow-sm"
                style={{ color: currentWord.color }}
              >
                {currentWord.text}
              </motion.div>
              
              <AnimatePresence>
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={cn("mt-4 text-xs font-bold uppercase tracking-widest",
                      feedback === "CORRECT" ? "text-green" : "text-red-500"
                    )}
                  >
                    {feedback === "CORRECT" ? "Perfect!" : feedback === "TIMEOUT" ? "Too Slow!" : "Wrong Color!"}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Buttons Area */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => handleAnswer(color.name)}
                  disabled={!!feedback}
                  className={cn(
                    "px-4 py-4 rounded-2xl border-2 border-black/5 font-bold text-sm transition-all active:scale-95",
                    "hover:border-purple/30 hover:shadow-md bg-white text-green",
                    feedback && "opacity-50 grayscale-[0.5]"
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
                Mind Gym Results
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-8">
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-black/5">
                  <div className="text-[10px] font-bold text-black/40 uppercase mb-1">Final Score</div>
                  <div className="text-2xl font-bold text-green">{score}</div>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-black/5">
                  <div className="text-[10px] font-bold text-black/40 uppercase mb-1">Best Streak</div>
                  <div className="text-2xl font-bold text-purple">{maxStreak}</div>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-black/5">
                  <div className="text-[10px] font-bold text-black/40 uppercase mb-1">Avg Speed</div>
                  <div className="text-2xl font-bold text-green">{averageTime}s</div>
                </div>
                <div className="p-4 bg-white rounded-2xl shadow-sm border border-black/5">
                  <div className="text-[10px] font-bold text-black/40 uppercase mb-1">Focus Level</div>
                  <div className="text-lg font-bold text-yellow-600">
                    {score > 30 ? "Master" : score > 15 ? "Advanced" : "Learner"}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={startGame}
                  className="dm-pill-button dm-pill-button-primary w-full inline-flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Try to Beat Score
                </button>
                
                <WhatsAppShare 
                  gameName="Stroop Test"
                  result={`${score} points (Speed: ${averageTime}s)`}
                  slug="stroop-test"
                  className="w-full"
                />

                <div className="text-[10px] text-black/40 font-bold uppercase tracking-widest pt-2">
                  Tip: Use your peripheral vision for faster response
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
