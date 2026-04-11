"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Sparkles } from "lucide-react";

interface MindGymContextType {
  progress: number;
  level: number;
  addProgress: (amount: number) => void;
  resetProgress: () => void;
}

const MindGymContext = createContext<MindGymContextType | undefined>(undefined);

export function MindGymProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState(0);
  const [level, setLevel] = useState(1);
  const [showLevelUp, setShowLevelUp] = useState(false);

  const addProgress = useCallback((amount: number) => {
    setProgress((prev) => {
      const newProgress = prev + amount;
      if (newProgress >= 100) {
        setLevel((l) => l + 1);
        setShowLevelUp(true);
        return newProgress - 100;
      }
      return newProgress;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setProgress(0);
    setLevel(1);
  }, []);

  useEffect(() => {
    if (showLevelUp) {
      const timer = setTimeout(() => setShowLevelUp(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showLevelUp]);

  return (
    <MindGymContext.Provider value={{ progress, level, addProgress, resetProgress }}>
      {children}
      
      {/* Level Up Toast */}
      <AnimatePresence>
        {showLevelUp && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] pointer-events-none"
          >
            <div className="bg-green text-white px-8 py-4 rounded-[2rem] shadow-2xl flex items-center gap-4 border-4 border-white">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center animate-bounce">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest opacity-60">Focus Level Up!</div>
                <div className="text-xl font-serif italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                  Reached Level {level}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </MindGymContext.Provider>
  );
}

export function useMindGym() {
  const context = useContext(MindGymContext);
  if (context === undefined) {
    throw new Error("useMindGym must be used within a MindGymProvider");
  }
  return context;
}
