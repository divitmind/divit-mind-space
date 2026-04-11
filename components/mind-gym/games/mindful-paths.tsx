"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Trophy, Compass, ArrowRight, Sparkles, Share2, MousePointer2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppShare } from "../whatsapp-share";
import { useMindGym } from "../mind-gym-context";

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
  const [hintTileId, setHintTileId] = useState<number | null>(null);
  const { addProgress } = useMindGym();
  
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const isTileSolved = (t: Tile) => {
    if (t.type === "straight") return t.rotation % 180 === t.targetRotation % 180;
    if (t.type === "cross") return true;
    return t.rotation === t.targetRotation;
  };

  const startIdleTimer = useCallback(() => {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      if (gameState === "PLAYING") {
        const unsolved = tiles.find(t => !isTileSolved(t));
        if (unsolved) setHintTileId(unsolved.id);
      }
    }, 4000);
  }, [gameState, tiles]);

  const initLevel = useCallback((levelIdx: number) => {
    const level = LEVELS[levelIdx];
    const newTiles = level.tiles.map(t => ({
      id: t.id,
      type: t.type as any,
      targetRotation: t.target,
      // Randomize initial rotation
      rotation: [0, 90, 180, 270].filter(r => r !== t.target)[Math.floor(Math.random() * 3)]
    }));
    
    // Frictionless Tutorial: If level 0, solve half of it
    if (levelIdx === 0) {
      newTiles[0].rotation = newTiles[0].targetRotation;
      newTiles[1].rotation = newTiles[1].targetRotation;
      newTiles[2].rotation = newTiles[2].targetRotation;
    }

    setTiles(newTiles);
    setMoves(0);
    setHintTileId(null);
    setGameState("PLAYING");
    startIdleTimer();
  }, [startIdleTimer]);

  const handleTileClick = (id: number) => {
    if (gameState !== "PLAYING") return;
    setHintTileId(null);
    startIdleTimer();

    setTiles(prev => {
      const newTiles = prev.map(t => 
        t.id === id ? { ...t, rotation: (t.rotation + 90) % 360 } : t
      );
      
      setMoves(m => m + 1);
      const isSolved = newTiles.every(isTileSolved);

      if (isSolved) {
        addProgress(20); // Level completion reward
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

  useEffect(() => {
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
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
                <Compass className="w-8 h-8 text-purple" />
              </div>
              <h3 className="text-2xl font-serif text-green mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Mindful Paths
              </h3>
              <p className="text-black/60 text-sm mb-8 font-medium leading-relaxed">
                Connect the lines to restore flow. A meditative spatial logic exercise.
              </p>
              <button
                onClick={() => initLevel(0)}
                className="dm-pill-button dm-pill-button-primary w-full inline-flex items-center justify-center gap-2 py-4"
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
            className="w-full h-full flex flex-col items-center justify-center space-y-8"
          >
            <div className="flex justify-between items-center w-full max-w-sm px-4">
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
                Path {currentLevel + 1} of {LEVELS.length}
              </div>
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-green">
                Moves: {moves}
              </div>
            </div>

            <div className={cn(
              "grid gap-4 p-6 bg-white/50 backdrop-blur-sm rounded-[3rem] shadow-2xl border-4 border-white aspect-square w-full max-w-[400px]",
              LEVELS[currentLevel].gridSize === 3 ? "grid-cols-3" : "grid-cols-4"
            )}>
              {tiles.map((tile) => {
                const solved = isTileSolved(tile);
                const isHint = hintTileId === tile.id;
                
                return (
                  <button
                    key={tile.id}
                    onClick={() => handleTileClick(tile.id)}
                    className={cn(
                      "aspect-square rounded-2xl flex items-center justify-center relative overflow-hidden transition-all duration-500 group",
                      solved ? "bg-green/5" : "bg-purple/5 hover:bg-purple/10",
                      isHint && "ring-4 ring-purple/20 animate-pulse bg-purple/10"
                    )}
                  >
                    {isHint && (
                      <div className="absolute inset-0 bg-purple/5 animate-ping" />
                    )}
                    <motion.div
                      animate={{ rotate: tile.rotation }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="w-full h-full flex items-center justify-center p-4"
                    >
                      {tile.type === "straight" && (
                        <div className={cn("w-2 h-full rounded-full transition-colors duration-500", 
                          solved ? "bg-green" : "bg-black/10 group-hover:bg-purple/20"
                        )} />
                      )}
                      {tile.type === "corner" && (
                        <div className="w-full h-full relative">
                          <div className={cn("absolute top-1/2 left-1/2 w-2 h-1/2 -translate-x-1/2 rounded-full transition-colors duration-500", 
                            solved ? "bg-green" : "bg-black/10 group-hover:bg-purple/20"
                          )} />
                          <div className={cn("absolute top-1/2 left-1/2 h-2 w-1/2 -translate-y-1/2 rounded-full transition-colors duration-500", 
                            solved ? "bg-green" : "bg-black/10 group-hover:bg-purple/20"
                          )} />
                        </div>
                      )}
                      {tile.type === "cross" && (
                        <div className="w-full h-full relative">
                          <div className={cn("absolute top-0 left-1/2 w-2 h-full -translate-x-1/2 rounded-full transition-colors duration-500", 
                            solved ? "bg-green" : "bg-black/10 group-hover:bg-purple/20"
                          )} />
                          <div className={cn("absolute top-1/2 left-0 h-2 w-full -translate-y-1/2 rounded-full transition-colors duration-500", 
                            solved ? "bg-green" : "bg-black/10 group-hover:bg-purple/20"
                          )} />
                        </div>
                      )}
                    </motion.div>
                  </button>
                );
              })}
            </div>

            <div className="h-8 flex items-center justify-center">
              <AnimatePresence>
                {hintTileId !== null && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-purple/40 font-black text-[10px] uppercase tracking-[0.3em]"
                  >
                    <MousePointer2 className="w-3 h-3 animate-bounce" />
                    Tap to Align Path
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {gameState === "LEVEL_COMPLETE" && (
          <motion.div
            key="complete"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="p-10 bg-green/5 rounded-[3rem] border border-green/10 max-w-sm">
              <Sparkles className="w-16 h-16 text-green mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-green mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Path Aligned
              </h3>
              <p className="text-black/60 text-sm mb-8 font-medium">
                Flow restored in {moves} moves.
              </p>
              <button
                onClick={nextLevel}
                className="dm-pill-button dm-pill-button-primary w-full inline-flex items-center justify-center gap-2 py-4"
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
            className="text-center space-y-8"
          >
            <div className="p-10 bg-green/5 rounded-[3rem] border border-green/10 max-w-sm">
              <Trophy className="w-16 h-16 text-yellow-600 mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-green mb-2" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Master of Alignment
              </h3>
              <p className="text-black/60 text-sm mb-10 font-medium leading-relaxed">
                Your spatial reasoning has successfully restored every path.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={startOver}
                  className="dm-pill-button dm-pill-button-primary w-full py-4 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Restart Journey
                </button>
                <WhatsAppShare 
                  gameName="Mindful Paths"
                  result={`Journey Completed!`}
                  slug="mindful-paths"
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
