"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Info, Brain } from "lucide-react";
import { motion } from "motion/react";
import { GameInfoModal } from "./game-info-modal";
import { FocusBar } from "./focus-bar";
import { MindGymProvider, useMindGym } from "./mind-gym-context";

interface GameLayoutProps {
  children: React.ReactNode;
  title: string;
  focusArea: string;
  ageGroup: string;
  science: any;
  tips: string[];
  slug: string;
}

function GameLayoutContent({ 
  children, 
  title, 
  focusArea, 
  ageGroup, 
  science, 
  tips,
  slug 
}: GameLayoutProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { progress, level } = useMindGym();

  return (
    <div className="h-screen bg-[#FAF9F5] flex flex-col overflow-hidden">
      {/* Immersive Header */}
      <header className="h-20 flex items-center justify-between px-6 md:px-10 border-b border-black/5 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-6">
          <Link 
            href="/mind-gym"
            className="w-10 h-10 rounded-full border border-black/5 flex items-center justify-center text-black/40 hover:text-green hover:border-green/30 transition-all shadow-sm"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="hidden md:block h-8 w-px bg-black/5" />
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-serif text-green leading-none" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              {title}
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-widest text-black/30 mt-1">
              {focusArea} • {ageGroup}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:block w-48 lg:w-64 mr-4">
            <FocusBar progress={progress} level={level} />
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-10 h-10 rounded-full bg-purple/5 border border-purple/10 flex items-center justify-center text-purple hover:bg-purple hover:text-white transition-all shadow-sm"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Game Area - Centered and Locked */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-green/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="w-full max-w-4xl h-full flex flex-col items-center justify-center relative z-1 overflow-hidden">
          {children}
        </div>
      </main>

      <GameInfoModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={title}
        science={science}
        tips={tips}
      />
    </div>
  );
}

export function GameLayout(props: GameLayoutProps) {
  return (
    <MindGymProvider>
      <GameLayoutContent {...props} />
    </MindGymProvider>
  );
}
