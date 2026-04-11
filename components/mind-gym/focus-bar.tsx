"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FocusBarProps {
  progress: number; // 0 to 100
  level: number;
  className?: string;
}

export function FocusBar({ progress, level, className }: FocusBarProps) {
  return (
    <div className={cn("w-full space-y-1.5", className)}>
      <div className="flex justify-between items-end px-1">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-black/30">
          Focus Level {level}
        </span>
        <span className="text-[10px] font-black tabular-nums text-green">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1.5 w-full bg-black/5 rounded-full overflow-hidden border border-black/5">
        <motion.div
          className="h-full bg-green shadow-[0_0_10px_rgba(122,154,125,0.3)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </div>
    </div>
  );
}
