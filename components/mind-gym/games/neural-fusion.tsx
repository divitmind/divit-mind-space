"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, RotateCcw, Trophy, Brain, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Undo2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Tile = {
  id: number;
  value: number;
  x: number;
  y: number;
  mergedFrom?: Tile[];
};

const GRID_SIZE = 4;

export function NeuralFusion() {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameState, setGameState] = useState<"START" | "PLAYING" | "WON" | "LOST">("START");
  const [history, setHistory] = useState<{ tiles: Tile[]; score: number }[]>([]);
  
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
    setGameState("PLAYING");
  };

  const move = useCallback((direction: "UP" | "DOWN" | "LEFT" | "RIGHT") => {
    if (gameState !== "PLAYING") return;

    setTiles(prevTiles => {
      const newTiles: Tile[] = [];
      let currentScore = score;
      let moved = false;

      // Save history for undo
      setHistory(prev => [...prev.slice(-4), { tiles: prevTiles, score: currentScore }]);

      const sortedTiles = [...prevTiles].sort((a, b) => {
        if (direction === "UP") return a.y - b.y;
        if (direction === "DOWN") return b.y - a.y;
        if (direction === "LEFT") return a.x - b.x;
        return b.x - a.x;
      });

      const mergedIds = new Set<number>();

      sortedTiles.forEach(tile => {
        let { x, y } = tile;
        let nextX = x;
        let nextY = y;

        while (true) {
          let stepX = nextX;
          let stepY = nextY;
          if (direction === "UP") stepY--;
          else if (direction === "DOWN") stepY++;
          else if (direction === "LEFT") stepX--;
          else if (direction === "RIGHT") stepX++;

          if (stepX < 0 || stepX >= GRID_SIZE || stepY < 0 || stepY >= GRID_SIZE) break;

          const targetTile = newTiles.find(t => t.x === stepX && t.y === stepY);
          if (targetTile) {
            if (targetTile.value === tile.value && !mergedIds.has(targetTile.id)) {
              // Merge
              targetTile.value *= 2;
              currentScore += targetTile.value;
              mergedIds.add(targetTile.id);
              moved = true;
              return; // Tile is merged and removed from active list
            }
            break;
          }

          nextX = stepX;
          nextY = stepY;
          moved = true;
        }

        newTiles.push({ ...tile, x: nextX, y: nextY });
      });

      if (!moved) return prevTiles;

      setScore(currentScore);
      if (currentScore > bestScore) setBestScore(currentScore);
      
      const tilesWithNew = addRandomTile(newTiles);
      
      // Check for game over
      if (getEmptyCells(tilesWithNew).length === 0) {
        // TODO: Check if any merges are possible
        setGameState("LOST");
      }

      return tilesWithNew;
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
              <p className="text-black/60 text-sm mb-8 font-medium leading-relaxed">
                A strategic challenge for pattern recognition and neural planning. Merge matching tiles to reach higher numbers.
              </p>
              <button
                onClick={startGame}
                className="dm-pill-button dm-pill-button-primary inline-flex items-center gap-2"
              >
                <Play className="w-4 h-4" />
                Initialize
              </button>
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
              <div className="flex gap-4">
                <div className="text-center bg-white px-4 py-2 rounded-2xl shadow-sm border border-black/5 min-w-[80px]">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-black/30">Score</div>
                  <div className="text-xl font-black text-green">{score}</div>
                </div>
                <div className="text-center bg-white px-4 py-2 rounded-2xl shadow-sm border border-black/5 min-w-[80px]">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-black/30">Best</div>
                  <div className="text-xl font-black text-purple">{bestScore}</div>
                </div>
              </div>
              <button 
                onClick={undo}
                disabled={history.length === 0}
                className="w-10 h-10 flex items-center justify-center bg-white rounded-full border border-black/5 shadow-sm text-green hover:border-purple/30 disabled:opacity-30"
              >
                <Undo2 className="w-4 h-4" />
              </button>
            </div>

            {/* Game Grid */}
            <div className="relative bg-black/5 p-3 rounded-[2rem] aspect-square grid grid-cols-4 grid-rows-4 gap-3">
              {/* Grid Background */}
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className="bg-white/40 rounded-xl" />
              ))}

              {/* Tiles */}
              <AnimatePresence>
                {tiles.map((tile) => (
                  <motion.div
                    key={tile.id}
                    layoutId={tile.id.toString()}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1,
                      x: tile.x * (100 / GRID_SIZE + 2.5), // Approximated
                      y: tile.y * (100 / GRID_SIZE + 2.5),
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
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

            {/* Mobile Controls */}
            <div className="grid grid-cols-3 gap-2 max-w-[180px] mx-auto pt-4 lg:hidden">
              <div />
              <button onClick={() => move("UP")} className="p-4 bg-white rounded-2xl border border-black/5 shadow-sm flex items-center justify-center text-green"><ChevronUp /></button>
              <div />
              <button onClick={() => move("LEFT")} className="p-4 bg-white rounded-2xl border border-black/5 shadow-sm flex items-center justify-center text-green"><ChevronLeft /></button>
              <button onClick={() => move("DOWN")} className="p-4 bg-white rounded-2xl border border-black/5 shadow-sm flex items-center justify-center text-green"><ChevronDown /></button>
              <button onClick={() => move("RIGHT")} className="p-4 bg-white rounded-2xl border border-black/5 shadow-sm flex items-center justify-center text-green"><ChevronRight /></button>
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
              <button
                onClick={startGame}
                className="dm-pill-button dm-pill-button-primary inline-flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" />
                Retry Fusion
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
