"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Trophy, Compass, ArrowRight, Sparkles, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppShare } from "../whatsapp-share";

type Tile = {
  id: number;
  rotation: number; // 0, 90, 180, 270
  targetRotation: number;
  type: "straight" | "corner" | "cross";
};

const LEVELS = [
  {
    gridSize: 3,
    tiles: [
      { id: 0, type: "corner", target: 90 }, { id: 1, type: "straight", target: 0 }, { id: 2, type: "corner", target: 180 },
      { id: 3, type: "straight", target: 90 }, { id: 4, type: "cross", target: 0 }, { id: 5, type: "straight", target: 90 },
      { id: 6, type: "corner", target: 0 }, { id: 7, type: "straight", target: 0 }, { id: 8, type: "corner", target: 270 },
    ]
  },
  {
    gridSize: 3,
    tiles: [
      { id: 0, type: "straight", target: 90 }, { id: 1, type: "corner", target: 180 }, { id: 2, type: "straight", target: 90 },
      { id: 3, type: "corner", target: 90 }, { id: 4, type: "straight", target: 0 }, { id: 5, type: "corner", target: 270 },
      { id: 6, type: "straight", target: 90 }, { id: 7, type: "corner", target: 0 }, { id: 8, type: "straight", target: 90 },
    ]
  }
];

export function MindfulPaths() {
  const [currentLevel, setCurrentLevel] = useState(0);
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "LEVEL_COMPLETE" | "FINISHED">("START");
  const [moves, setMoves] = useState(0);

  const initLevel = useCallback((levelIdx: number) => {
    const level = LEVELS[levelIdx];
    const newTiles = level.tiles.map(t => ({
      id: t.id,
      type: t.type as any,
      targetRotation: t.target,
      // Randomize initial rotation (but not the target one)
      rotation: [0, 90, 180, 270].filter(r => r !== t.target)[Math.floor(Math.random() * 3)]
    }));
    setTiles(newTiles);
    setMoves(0);
    setGameState("PLAYING");
  }, []);

  const handleTileClick = (id: number) => {
    if (gameState !== "PLAYING") return;

    setTiles(prev => {
      const newTiles = prev.map(t => 
        t.id === id ? { ...t, rotation: (t.rotation + 90) % 360 } : t
      );
      
      setMoves(m => m + 1);

      // Check if all tiles match their target rotation
      // (Note: some types like "straight" have two valid rotations, but let's keep it simple for now)
      const isSolved = newTiles.every(t => {
        if (t.type === "straight") return t.rotation % 180 === t.targetRotation % 180;
        if (t.type === "cross") return true; // cross always matches
        return t.rotation === t.targetRotation;
      });

      if (isSolved) {
        setTimeout(() => {
          if (currentLevel < LEVELS.length - 1) {
            setGameState("LEVEL_COMPLETE");
          } else {
            setGameState("FINISHED");
          }
        }, 500);
      }

      return newTiles;
    });
  };

  const nextLevel = () => {
    const nextIdx = currentLevel + 1;
    setCurrentLevel(nextIdx);
    initLevel(nextIdx);
  };

  const startOver = () => {
    setCurrentLevel(0);
    initLevel(0);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <AnimatePresence mode="wait">
        {gameState === "START" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="p-8 bg-purple/5 rounded-[2rem] border border-purple/10">
              <Compass className="w-12 h-12 text-purple mx-auto mb-4" />
              <h3 className="text-xl font-serif text-green mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Mindful Paths
              </h3>
              <p className="text-black/60 text-sm mb-8 font-medium leading-relaxed">
                A meditative spatial puzzle. Rotate the tiles to align the flow and connect the patterns.
              </p>
              <button
                onClick={() => initLevel(0)}
                className="dm-pill-button dm-pill-button-primary inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Begin Journey
              </button>
            </div>
          </motion.div>
        )}

        {gameState === "PLAYING" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="flex justify-between items-center px-2">
              <div className="text-[10px] font-bold uppercase tracking-widest text-black/40">
                Path {currentLevel + 1} of {LEVELS.length}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-green">
                Moves: {moves}
              </div>
            </div>

            <div className={cn(
              "grid gap-3 p-4 bg-white rounded-[2rem] shadow-2xl border border-black/5 aspect-square",
              LEVELS[currentLevel].gridSize === 3 ? "grid-cols-3" : "grid-cols-4"
            )}>
              {tiles.map((tile) => (
                <button
                  key={tile.id}
                  onClick={() => handleTileClick(tile.id)}
                  className="aspect-square bg-purple/5 rounded-2xl flex items-center justify-center relative overflow-hidden group hover:bg-purple/10 transition-colors"
                >
                  <motion.div
                    animate={{ rotate: tile.rotation }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-full h-full flex items-center justify-center p-4"
                  >
                    {tile.type === "straight" && (
                      <div className="w-2 h-full bg-green rounded-full opacity-60" />
                    )}
                    {tile.type === "corner" && (
                      <div className="w-full h-full relative">
                        <div className="absolute top-1/2 left-1/2 w-2 h-1/2 bg-green -translate-x-1/2 rounded-full opacity-60" />
                        <div className="absolute top-1/2 left-1/2 h-2 w-1/2 bg-green -translate-y-1/2 rounded-full opacity-60" />
                      </div>
                    )}
                    {tile.type === "cross" && (
                      <div className="w-full h-full relative">
                        <div className="absolute top-0 left-1/2 w-2 h-full bg-green -translate-x-1/2 rounded-full opacity-60" />
                        <div className="absolute top-1/2 left-0 h-2 w-full bg-green -translate-y-1/2 rounded-full opacity-60" />
                      </div>
                    )}
                  </motion.div>
                </button>
              ))}
            </div>

            <p className="text-center text-[10px] font-bold uppercase tracking-widest text-black/20 italic">
              Tap tiles to rotate them into alignment
            </p>
          </motion.div>
        )}

        {gameState === "LEVEL_COMPLETE" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="p-8 bg-green/5 rounded-[2rem] border border-green/10">
              <Sparkles className="w-12 h-12 text-green mx-auto mb-4" />
              <h3 className="text-xl font-serif text-green mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Path Aligned
              </h3>
              <p className="text-black/60 text-sm mb-8 font-medium">
                You resolved the pattern in {moves} moves.
              </p>
              <button
                onClick={nextLevel}
                className="dm-pill-button dm-pill-button-primary inline-flex items-center gap-2"
              >
                Next Path
                <ArrowRight className="w-4 h-4" />
              </button>
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
                Master of Alignment
              </h3>
              <p className="text-black/60 text-sm mb-8 font-medium leading-relaxed">
                Your spatial reasoning and patience have successfully restored the flow of every path.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={startOver}
                  className="dm-pill-button dm-pill-button-primary inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart Journey
                </button>
                <WhatsAppShare 
                  gameName="Mindful Paths"
                  result={`Journey Completed!`}
                  slug="mindful-paths"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
