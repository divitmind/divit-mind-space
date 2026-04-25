"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Trophy, Brain, Undo2, Lightbulb, MousePointer2, HelpCircle, ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppShare } from "../whatsapp-share";
import { useMindGym } from "../mind-gym-context";

type Tile = {
  id: number;
  value: number;
  x: number;
  y: number;
};

const GRID_SIZE = 4;

export function NeuralFusion() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "WON" | "LOST">("START");
  const [history, setHistory] = useState<{ tiles: Tile[]; score: number }[]>([]);
  const [showTutorial, setShowTutorial] = useState(false);
  const [suggestedMove, setSuggestedMove] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT" | null>(null);
  const { addProgress } = useMindGym();
  
  const tileIdCounter = useRef(0);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  const createTile = (value: number, x: number, y: number): Tile => ({
    id: tileIdCounter.current++,
    value,
    x,
    y
  });

  const getEmptyCells = (currentTiles: Tile[]) => {
    const emptyCells = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      for (let y = 0; y < GRID_SIZE; y++) {
        if (!currentTiles.find(t => t.x === x && t.y === y)) {
          emptyCells.push({ x, y });
        }
      }
    }
    return emptyCells;
  };

  const addRandomTile = (currentTiles: Tile[]) => {
    const emptyCells = getEmptyCells(currentTiles);
    if (emptyCells.length > 0) {
      const cell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      return [...currentTiles, createTile(Math.random() < 0.9 ? 2 : 4, cell.x, cell.y)];
    }
    return currentTiles;
  };

  const startGame = () => {
    tileIdCounter.current = 0;
    let newTiles: Tile[] = [];
    newTiles = addRandomTile(newTiles);
    newTiles = addRandomTile(newTiles);
    setTiles(newTiles);
    setScore(0);
    setHistory([]);
    setSuggestedMove(null);
    setGameState("PLAYING");
  };

  const getMoveResult = (currentTiles: Tile[], direction: string) => {
    let moved = false;
    let mergeScore = 0;
    const grid: (Tile | null)[][] = Array.from({ length: GRID_SIZE }, () => 
      Array.from({ length: GRID_SIZE }, () => null)
    );
    currentTiles.forEach(t => grid[t.y][t.x] = t);

    const isVertical = direction === "UP" || direction === "DOWN";
    const isForward = direction === "RIGHT" || direction === "DOWN";

    for (let i = 0; i < GRID_SIZE; i++) {
      let line: (Tile | null)[] = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        line.push(isVertical ? grid[j][i] : grid[i][j]);
      }
      if (isForward) line.reverse();

      let activeTiles = line.filter((t): t is Tile => t !== null);
      const mergedLine: Tile[] = [];
      for (let j = 0; j < activeTiles.length; j++) {
        const current = activeTiles[j];
        const next = activeTiles[j + 1];
        if (next && current.value === next.value) {
          mergeScore += current.value * 2;
          moved = true;
          j++;
        } else {
          mergedLine.push(current);
        }
      }
      if (activeTiles.length !== mergedLine.length) moved = true;
      
      mergedLine.forEach((tile, index) => {
        const finalIndex = isForward ? GRID_SIZE - 1 - index : index;
        const newX = isVertical ? i : finalIndex;
        const newY = isVertical ? finalIndex : i;
        if (tile.x !== newX || tile.y !== newY) moved = true;
      });
    }
    return { moved, mergeScore };
  };

  const findBestMove = () => {
    const directions = ["UP", "DOWN", "LEFT", "RIGHT"] as const;
    let bestDir: "UP" | "DOWN" | "LEFT" | "RIGHT" | null = null;
    let maxMerge = -1;

    directions.forEach(dir => {
      const { moved, mergeScore } = getMoveResult(tiles, dir);
      if (moved && mergeScore > maxMerge) {
        maxMerge = mergeScore;
        bestDir = dir;
      }
    });

    if (bestDir === null) {
      bestDir = directions.find(dir => getMoveResult(tiles, dir).moved) || null;
    }

    setSuggestedMove(bestDir);
    setTimeout(() => setSuggestedMove(null), 3000);
  };

  const undo = () => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setTiles(lastState.tiles);
    setScore(lastState.score);
    setHistory(prev => prev.slice(0, -1));
  };

  const move = useCallback((direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    if (gameState !== "PLAYING") return;
    setSuggestedMove(null);

    setTiles(prevTiles => {
      let moved = false;
      let newScore = score;
      let mergedThisTurn = false;
      const nextTiles: Tile[] = [];

      const grid: (Tile | null)[][] = Array.from({ length: GRID_SIZE }, () => 
        Array.from({ length: GRID_SIZE }, () => null)
      );
      prevTiles.forEach(t => grid[t.y][t.x] = t);

      const isVertical = direction === "UP" || direction === "DOWN";
      const isForward = direction === "RIGHT" || direction === "DOWN";

      for (let i = 0; i < GRID_SIZE; i++) {
        let line: (Tile | null)[] = [];
        for (let j = 0; j < GRID_SIZE; j++) {
          line.push(isVertical ? grid[j][i] : grid[i][j]);
        }
        if (isForward) line.reverse();

        let activeTiles = line.filter((t): t is Tile => t !== null);
        const mergedLine: Tile[] = [];
        for (let j = 0; j < activeTiles.length; j++) {
          const current = activeTiles[j];
          const next = activeTiles[j + 1];
          if (next && current.value === next.value) {
            const mergedValue = current.value * 2;
            mergedLine.push({ ...current, value: mergedValue });
            newScore += mergedValue;
            moved = true;
            mergedThisTurn = true;
            j++;
          } else {
            mergedLine.push(current);
          }
        }

        mergedLine.forEach((tile, index) => {
          const finalIndex = isForward ? GRID_SIZE - 1 - index : index;
          const newX = isVertical ? i : finalIndex;
          const newY = isVertical ? finalIndex : i;
          if (tile.x !== newX || tile.y !== newY) moved = true;
          nextTiles.push({ ...tile, x: newX, y: newY });
        });
      }

      if (!moved) return prevTiles;

      if (mergedThisTurn) addProgress(5);

      setHistory(prev => [...prev.slice(-4), { tiles: prevTiles, score: score }]);
      setScore(newScore);
      if (newScore > bestScore) setBestScore(newScore);
      return addRandomTile(nextTiles);
    });
  }, [gameState, score, bestScore, addProgress]);

  // Touch Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;
    const deltaX = e.changedTouches[0].clientX - touchStartRef.current.x;
    const deltaY = e.changedTouches[0].clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(deltaX) < 30 && Math.abs(deltaY) < 30) return;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      move(deltaX > 0 ? "RIGHT" : "LEFT");
    } else {
      move(deltaY > 0 ? "DOWN" : "UP");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") move("UP");
      else if (e.key === "ArrowDown") move("DOWN");
      else if (e.key === "ArrowLeft") move("LEFT");
      else if (e.key === "ArrowRight") move("RIGHT");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [move]);

  const getTileStyles = (value: number) => {
    const styles: Record<number, string> = {
      2: "bg-[#FAF7F2] text-green",
      4: "bg-[#F3EFE7] text-green",
      8: "bg-[#E8D5B7] text-white",
      16: "bg-[#D4BD9E] text-white",
      32: "bg-[#7A9A7D] text-white opacity-80",
      64: "bg-[#7A9A7D] text-white",
      128: "bg-[#6B8B6E] text-white",
      256: "bg-[#5A7A5D] text-white",
      512: "bg-[#52154E] text-white opacity-80",
      1024: "bg-[#52154E] text-white",
      2048: "bg-[#52154E] text-white ring-4 ring-yellow-400/50",
    };
    return styles[value] || "bg-[#52154E] text-white";
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <AnimatePresence mode="wait">
        {gameState === "START" && (
          <motion.div
            key="start"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="text-center space-y-8"
          >
            <div className="p-10 bg-purple/5 rounded-[3rem] border border-purple/10 max-w-sm">
              <div className="w-16 h-16 bg-purple/10 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Brain className="w-8 h-8 text-purple" />
              </div>
              <h3 className="text-2xl font-serif text-green mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Neural Fusion
              </h3>

              {!showTutorial ? (
                <>
                  <p className="text-black/60 text-sm mb-8 font-medium leading-relaxed">
                    Strategic planning through numeric synthesis. Merge tiles to reach higher capacities.
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={startGame}
                      className="dm-pill-button dm-pill-button-primary w-full inline-flex items-center justify-center gap-2 py-4"
                    >
                      <Play className="w-4 h-4" />
                      Initialize Flow
                    </button>
                    <button
                      onClick={() => setShowTutorial(true)}
                      className="text-xs font-bold uppercase tracking-[0.2em] text-purple hover:text-green transition-colors flex items-center justify-center gap-2"
                    >
                      <HelpCircle className="w-4 h-4" />
                      Assisted Mode: How to Play?
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-left space-y-6 mb-8">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-green tracking-widest">The Goal</p>
                    <p className="text-sm text-black/60 font-medium">Merge tiles with the same number to double their value. Reach 2048 to master the session.</p>  
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] font-black uppercase text-green tracking-widest">Controls</p>
                    <p className="text-sm text-black/60 font-medium">Use **Arrow Keys**, **Swipe**, or **Buttons** to slide tiles. Matching tiles fuse when they collide.</p>
                  </div>
                  <button
                    onClick={() => setShowTutorial(false)}
                    className="dm-pill-button dm-pill-button-secondary w-full py-3 text-[10px]"
                  >
                    Return to Start
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {gameState === "PLAYING" && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full h-full flex flex-col items-center justify-center space-y-8"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Immersive Header Stats */}
            <div className="flex justify-between items-center w-full max-w-sm px-4">
              <div className="flex gap-3">
                <div className="bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-2xl border border-black/5 shadow-sm">
                  <div className="text-[8px] font-black uppercase tracking-widest text-black/20">Score</div>
                  <div className="text-lg font-black text-green tabular-nums">{score}</div>
                </div>
                <div className="bg-white/50 backdrop-blur-sm px-4 py-1.5 rounded-2xl border border-black/5 shadow-sm">
                  <div className="text-[8px] font-black uppercase tracking-widest text-black/20">Best</div>
                  <div className="text-lg font-black text-purple tabular-nums">{bestScore}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={findBestMove}
                  className="w-10 h-10 flex items-center justify-center bg-purple/10 rounded-full border border-purple/20 text-purple hover:bg-purple hover:text-white transition-all shadow-sm"
                  title="Show Hint"
                >
                  <Lightbulb className="w-4 h-4" />
                </button>
                <button 
                  onClick={undo}
                  disabled={history.length === 0}
                  className="w-10 h-10 flex items-center justify-center bg-white/50 backdrop-blur-sm rounded-full border border-black/5 text-green disabled:opacity-20 transition-all active:scale-95"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Immersive Game Grid */}
            <div className="relative bg-black/5 p-3 rounded-[2.5rem] aspect-square w-full max-w-[400px] border-4 border-white shadow-2xl overflow-hidden group">
              <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 gap-3 p-3">
                {Array.from({ length: 16 }).map((_, i) => (
                  <div key={i} className="bg-white/40 rounded-2xl" />
                ))}
              </div>

              {/* Edge Pulse Hints */}
              <AnimatePresence>
                {suggestedMove && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className={cn(
                      "absolute pointer-events-none z-0",
                      suggestedMove === "UP" && "top-0 left-0 right-0 h-12 bg-gradient-to-b from-purple/40 to-transparent",
                      suggestedMove === "DOWN" && "bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-purple/40 to-transparent",
                      suggestedMove === "LEFT" && "left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-purple/40 to-transparent",
                      suggestedMove === "RIGHT" && "right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-purple/40 to-transparent",
                    )}
                  />
                )}
              </AnimatePresence>

              <div className="relative z-10 w-full h-full">
                <AnimatePresence>
                  {tiles.map((tile) => (
                    <motion.div
                      key={tile.id}
                      layoutId={tile.id.toString()}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        layout: { type: "spring", stiffness: 350, damping: 35 },
                        opacity: { duration: 0.1 }
                      }}
                      className={cn(
                        "absolute w-[calc(25%-9px)] h-[calc(25%-9px)] flex items-center justify-center rounded-2xl text-2xl font-black shadow-sm",
                        getTileStyles(tile.value)
                      )}
                      style={{
                        left: `${tile.x * 25}%`,
                        top: `${tile.y * 25}%`,
                      }}
                    >
                      {tile.value}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            {/* Assisted Controls (On-Screen Arrows) */}
            <div className="grid grid-cols-3 gap-2 w-full max-w-[180px]">
              <div />
              <button
                onClick={() => move("UP")}
                className={cn("p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-black/5 shadow-sm flex items-center justify-center text-green transition-all active:scale-95", suggestedMove === "UP" && "bg-purple text-white scale-110 shadow-lg shadow-purple/20")}>
                <ChevronUp className="w-5 h-5" />
              </button>
              <div />
              <button
                onClick={() => move("LEFT")}
                className={cn("p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-black/5 shadow-sm flex items-center justify-center text-green transition-all active:scale-95", suggestedMove === "LEFT" && "bg-purple text-white scale-110 shadow-lg shadow-purple/20")}>
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => move("DOWN")}
                className={cn("p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-black/5 shadow-sm flex items-center justify-center text-green transition-all active:scale-95", suggestedMove === "DOWN" && "bg-purple text-white scale-110 shadow-lg shadow-purple/20")}>
                <ChevronDown className="w-5 h-5" />
              </button>
              <button
                onClick={() => move("RIGHT")}
                className={cn("p-4 bg-white/50 backdrop-blur-sm rounded-2xl border border-black/5 shadow-sm flex items-center justify-center text-green transition-all active:scale-95", suggestedMove === "RIGHT" && "bg-purple text-white scale-110 shadow-lg shadow-purple/20")}>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            
            <div className="h-4">
              <AnimatePresence>
                {suggestedMove && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex items-center gap-2 text-purple/40 font-black text-[10px] uppercase tracking-[0.3em]"
                  >
                    <MousePointer2 className="w-3 h-3 animate-bounce" />
                    Move {suggestedMove} to Merge
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {gameState === "LOST" && (
          <motion.div
            key="lost"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8"
          >
            <div className="p-10 bg-red-50 rounded-[3rem] border border-red-100 max-w-sm">
              <Trophy className="w-16 h-16 text-black/10 mx-auto mb-6" />
              <h3 className="text-2xl font-serif text-green mb-2" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Session Complete
              </h3>
              <div className="text-4xl font-black text-green mb-8 tabular-nums">{score}</div>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={startGame}
                  className="dm-pill-button dm-pill-button-primary w-full py-4 flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset Flow
                </button>
                <WhatsAppShare 
                  gameName="Neural Fusion"
                  result={`${score} points`}
                  slug="neural-fusion"
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
