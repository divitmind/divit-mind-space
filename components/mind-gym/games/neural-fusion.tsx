"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Trophy, Brain, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Undo2, Share2, HelpCircle, Lightbulb } from "lucide-react";
import { cn } from "@/lib/utils";
import { WhatsAppShare } from "../whatsapp-share";

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
  
  const tileIdCounter = useRef(0);

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
    const nextTiles: Tile[] = [];
    
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
          mergedLine.push({ ...current, value: current.value * 2 });
          mergeScore += current.value * 2;
          moved = true;
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
      });
    }
    return { moved, mergeScore };
  };

  const findBestMove = () => {
    const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
    let bestDir: any = null;
    let maxMerge = -1;

    directions.forEach(dir => {
      const { moved, mergeScore } = getMoveResult(tiles, dir);
      if (moved && mergeScore > maxMerge) {
        maxMerge = mergeScore;
        bestDir = dir;
      }
    });

    // If no merges possible, just pick any valid move
    if (bestDir === null) {
      bestDir = directions.find(dir => getMoveResult(tiles, dir).moved);
    }

    setSuggestedMove(bestDir);
    setTimeout(() => setSuggestedMove(null), 2000);
  };

  const move = useCallback((direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    if (gameState !== "PLAYING") return;
    setSuggestedMove(null);

    setTiles(prevTiles => {
      let moved = false;
      let newScore = score;
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

      setHistory(prev => [...prev.slice(-4), { tiles: prevTiles, score: score }]);
      setScore(newScore);
      if (newScore > bestScore) setBestScore(newScore);
      return addRandomTile(nextTiles);
    });
  }, [gameState, score, bestScore]);

  const undo = () => {
    if (history.length === 0) return;
    const last = history[history.length - 1];
    setTiles(last.tiles);
    setScore(last.score);
    setHistory(prev => prev.slice(0, -1));
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
    <div className="w-full max-w-md mx-auto">
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
              <Brain className="w-12 h-12 text-purple mx-auto mb-4" />
              <h3 className="text-xl font-serif text-green mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Neural Fusion
              </h3>
              
              {!showTutorial ? (
                <>
                  <p className="text-black/60 text-sm mb-8 font-medium leading-relaxed">
                    A strategic challenge for pattern recognition and neural planning. Merge matching tiles to reach higher numbers.
                  </p>
                  <div className="flex flex-col gap-3">
                    <button
                      onClick={startGame}
                      className="dm-pill-button dm-pill-button-primary inline-flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      Initialize
                    </button>
                    <button
                      onClick={() => setShowTutorial(true)}
                      className="text-xs font-bold uppercase tracking-widest text-purple hover:text-green transition-colors flex items-center justify-center gap-2"
                    >
                      <HelpCircle className="w-4 h-4" />
                      How to Play?
                    </button>
                  </div>
                </>
              ) : (
                <div className="text-left space-y-4 mb-8">
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-green tracking-widest">The Goal</p>
                    <p className="text-sm text-black/60 font-medium">Merge tiles with the same number to create larger numbers. Reach 2048 to win!</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold uppercase text-green tracking-widest">Controls</p>
                    <p className="text-sm text-black/60 font-medium">Use **Arrow Keys** or **Swipe** to slide all tiles. When two matching tiles touch, they fuse into one.</p>
                  </div>
                  <button
                    onClick={() => setShowTutorial(false)}
                    className="dm-pill-button-secondary w-full text-xs"
                  >
                    Got it, let's play
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
            className="space-y-6"
          >
            {/* Header Stats */}
            <div className="flex justify-between items-center px-2">
              <div className="flex gap-3">
                <div className="text-center bg-white px-3 py-2 rounded-2xl shadow-sm border border-black/5 min-w-[70px]">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-black/30">Score</div>
                  <div className="text-lg font-black text-green tabular-nums">{score}</div>
                </div>
                <div className="text-center bg-white px-3 py-2 rounded-2xl shadow-sm border border-black/5 min-w-[70px]">
                  <div className="text-[9px] font-bold uppercase tracking-widest text-black/30">Best</div>
                  <div className="text-lg font-black text-purple tabular-nums">{bestScore}</div>
                </div>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={findBestMove}
                  className="w-10 h-10 flex items-center justify-center bg-purple/10 rounded-full border border-purple/20 text-purple hover:bg-purple hover:text-white transition-all shadow-sm"
                  title="Get a hint"
                >
                  <Lightbulb className="w-4 h-4" />
                </button>
                <button 
                  onClick={undo}
                  disabled={history.length === 0}
                  className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-black/5 shadow-sm text-green hover:border-purple/30 disabled:opacity-30 transition-all"
                >
                  <Undo2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Game Grid */}
            <div className="relative bg-black/5 p-3 rounded-[2rem] aspect-square grid grid-cols-4 grid-rows-4 gap-3">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="bg-white/40 rounded-xl" />
              ))}

              <AnimatePresence>
                {tiles.map((tile) => (
                  <motion.div
                    key={tile.id}
                    layoutId={tile.id.toString()}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ 
                      layout: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.1 }
                    }}
                    className={cn(
                      "absolute w-[calc(25%-12px)] h-[calc(25%-12px)] m-1.5 flex items-center justify-center rounded-xl text-xl font-black shadow-sm",
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

            {/* Controls */}
            <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto pt-4">
              <div />
              <button 
                onClick={() => move("UP")} 
                className={cn("p-4 bg-white rounded-2xl border border-black/5 shadow-sm flex items-center justify-center text-green transition-all", suggestedMove === "UP" && "bg-purple text-white scale-110 shadow-lg shadow-purple/20")}>
                <ChevronUp />
              </button>
              <div />
              <button 
                onClick={() => move("LEFT")} 
                className={cn("p-4 bg-white rounded-2xl border border-black/5 shadow-sm flex items-center justify-center text-green transition-all", suggestedMove === "LEFT" && "bg-purple text-white scale-110 shadow-lg shadow-purple/20")}>
                <ChevronLeft />
              </button>
              <button 
                onClick={() => move("DOWN")} 
                className={cn("p-4 bg-white rounded-2xl border border-black/5 shadow-sm flex items-center justify-center text-green transition-all", suggestedMove === "DOWN" && "bg-purple text-white scale-110 shadow-lg shadow-purple/20")}>
                <ChevronDown />
              </button>
              <button 
                onClick={() => move("RIGHT")} 
                className={cn("p-4 bg-white rounded-2xl border border-black/5 shadow-sm flex items-center justify-center text-green transition-all", suggestedMove === "RIGHT" && "bg-purple text-white scale-110 shadow-lg shadow-purple/20")}>
                <ChevronRight />
              </button>
            </div>
          </motion.div>
        )}

        {gameState === "LOST" && (
          <motion.div
            key="lost"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-6"
          >
            <div className="p-8 bg-red-50 rounded-[2rem] border border-red-100">
              <Trophy className="w-12 h-12 text-black/20 mx-auto mb-4" />
              <h3 className="text-2xl font-serif text-green mb-2" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                Neural Capacity Reached
              </h3>
              <p className="text-black/60 text-sm mb-6 font-medium">
                Final Score: <span className="font-bold text-green">{score}</span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={startGame}
                  className="dm-pill-button dm-pill-button-primary inline-flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  Retry Fusion
                </button>
                <WhatsAppShare 
                  gameName="Neural Fusion"
                  result={`${score} points`}
                  slug="neural-fusion"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
