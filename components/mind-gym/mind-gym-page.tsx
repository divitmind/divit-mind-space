"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Sparkles, Target, Zap, ArrowRight, Activity, Eye, Compass, Lightbulb, Focus, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MindGymItem } from "@/sanity/types";
import { cn } from "@/lib/utils";
import { GameThumbnail } from "./game-thumbnail";

// Temporary extended type until Sanity re-generates types.ts
interface ExtendedMindGymItem extends MindGymItem {
  category?: string;
  benefit?: string;
}

interface MindGymPageProps {
  initialGames: ExtendedMindGymItem[];
}

const CATEGORIES = [
  { id: "all", label: "All Exercises", icon: Brain, color: "text-purple", bg: "bg-purple/5" },
  { id: "focus", label: "Focus & Attention", icon: Target, color: "text-green", bg: "bg-green/5" },
  { id: "memory", label: "Working Memory", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
  { id: "spatial", label: "Spatial Logic", icon: Compass, color: "text-yellow-600", bg: "bg-yellow-50" },
  { id: "flexibility", label: "Flexibility", icon: Zap, color: "text-purple", bg: "bg-purple/5" },
];

const defaultGames: Partial<ExtendedMindGymItem>[] = [
  {
    title: "Pulse Check",
    slug: { current: "pulse-check", _type: "slug" } as any,
    focusArea: "Processing Speed",
    ageGroup: "All Ages",
    shortDescription: "Test your raw reaction time and neural efficiency with this simple benchmark test.",
    category: "focus",
    benefit: "Enhances neural efficiency and information processing speed between eyes and brain."
  },
  {
    title: "Schulte Table",
    slug: { current: "schulte-table", _type: "slug" } as any,
    focusArea: "Visual Scanning & Focus",
    ageGroup: "All Ages",
    shortDescription: "Improve peripheral vision and speed reading by finding numbers in a grid sequence.",
    category: "focus",
    benefit: "Trains peripheral vision and sustained attention by maintaining a central gaze."
  },
  {
    title: "Stroop Test",
    slug: { current: "stroop-test", _type: "slug" } as any,
    focusArea: "Cognitive Flexibility",
    ageGroup: "Teens & Adults",
    shortDescription: "Train your brain to overcome conflicting information between word meaning and color.",
    category: "flexibility",
    benefit: "Strengthens executive function by filtering out distracting visual data."
  },
  {
    title: "Neural Fusion",
    slug: { current: "neural-fusion", _type: "slug" } as any,
    focusArea: "Strategic Planning",
    ageGroup: "Teens & Adults",
    shortDescription: "A logic-based numbers game that builds pattern recognition and long-term strategic thinking.",
    category: "memory",
    benefit: "Develops advanced strategic planning and working memory capacity."
  },
  {
    title: "Mindful Paths",
    slug: { current: "mindful-paths", _type: "slug" } as any,
    focusArea: "Spatial Reasoning",
    ageGroup: "All Ages",
    shortDescription: "A meditative spatial puzzle. Rotate the tiles to align the flow and connect patterns.",
    category: "spatial",
    benefit: "Improves mental rotation skills and spatial relationship processing."
  }
];

export function MindGymPage({ initialGames }: MindGymPageProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const games = initialGames.length > 0 ? initialGames : (defaultGames as ExtendedMindGymItem[]);

  const filteredGames = useMemo(() => {
    if (activeCategory === "all") return games;
    return games.filter(g => g.category === activeCategory || g.focusArea?.toLowerCase().includes(activeCategory));
  }, [activeCategory, games]);

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Immersive Hero Section - Tightened Padding */}
      <section className="relative pt-20 pb-12 lg:pt-32 lg:pb-20 overflow-hidden bg-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/5 text-green text-[10px] font-black uppercase tracking-[0.3em] mb-6 border border-green/10">
              <Brain className="w-3 h-3" />
              The Cognitive Sanctuary
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-green leading-[1.1] mb-8 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Mind Gym
            </h1>
            <p className="text-base md:text-lg text-black/40 max-w-3xl mx-auto font-medium leading-relaxed italic">
              Browse our brain training games for children, teens, and adults. Sharpen your attention, memory, and reaction precision through daily practice. Challenge a friend on WhatsApp to win a complimentary specialist session or workshops.
            </p>
          </motion.div>
        </div>

        {/* Abstract Background Fades */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Choose Your Focus - Refined sticky nav with more space */}
      <section className="py-10 md:py-14 border-y border-black/5 bg-[#FAF9F5]/80 sticky top-0 z-40 backdrop-blur-md shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            <div className="flex items-center gap-5 shrink-0">
              <div className="w-12 h-12 rounded-2xl bg-white shadow-md border border-black/5 flex items-center justify-center">
                <Focus className="w-6 h-6 text-green" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-green leading-none">Targeted Training</h3>
                <p className="text-[11px] text-black/40 font-bold uppercase tracking-widest mt-2">Select your mental goal</p>
              </div>
            </div>
            
            {/* Horizontal scroll on mobile for categories */}
            <div className="w-full lg:w-auto overflow-x-auto no-scrollbar pb-2 lg:pb-0">
              <div className="flex justify-start lg:justify-end gap-4 px-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-3 border whitespace-nowrap shrink-0",
                      activeCategory === cat.id 
                        ? "bg-green text-white border-green shadow-xl shadow-green/20 scale-105" 
                        : "bg-white text-black/50 border-black/5 hover:border-green/20 hover:text-green"
                    )}
                  >
                    <cat.icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid - Polished Cards */}
      <section className="py-16 md:py-24 lg:py-32">
        <div className="container mx-auto px-4">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 lg:gap-16"
          >
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game, idx) => {
                const gameSlug = typeof game.slug === 'object' && game.slug !== null 
                  ? (game.slug as { current?: string }).current 
                  : game.slug;
                
                return (
                  <motion.div
                    key={gameSlug as string}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group bg-white rounded-[3.5rem] overflow-hidden border border-black/5 shadow-sm hover:shadow-2xl hover:shadow-purple/10 transition-all duration-500 flex flex-col h-full"
                  >
                    {/* Card Visual Header */}
                    <div className="aspect-[16/10] relative bg-[#FAF9F5] overflow-hidden">
                      {game.coverImage?.asset?.url ? (
                        <Image
                          src={game.coverImage.asset.url}
                          alt={game.title || "Game"}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                        />
                      ) : (
                        <GameThumbnail slug={gameSlug as string} />
                      )}
                      
                      {/* Cognitive Tags - Fixed positioning and separation */}
                      <div className="absolute top-6 left-6 flex flex-col items-start gap-2 pointer-events-none z-10">
                        <div className="px-4 py-2 rounded-full bg-white/95 backdrop-blur-md text-[9px] font-black text-green uppercase tracking-[0.2em] border border-green/10 shadow-lg leading-none">
                          {game.focusArea}
                        </div>
                        <div className="px-4 py-2 rounded-full bg-purple/90 backdrop-blur-md text-[9px] font-black text-white uppercase tracking-[0.2em] border border-purple/10 shadow-lg leading-none">
                          {game.ageGroup}
                        </div>
                      </div>
                    </div>

                    {/* Card Content - Refined Spacing */}
                    <div className="p-10 md:p-12 flex flex-col flex-grow">
                      <h2 className="text-3xl md:text-4xl font-serif text-green mb-5 italic group-hover:text-purple transition-colors duration-500 leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                        {game.title}
                      </h2>
                      
                      <p className="text-sm md:text-base text-black/50 font-medium leading-relaxed mb-10 line-clamp-2">
                        {game.shortDescription}
                      </p>

                      {/* Benefit Section - Inspiration from FreeFocusGames */}
                      <div className="bg-[#FAF9F5] rounded-[2.5rem] p-8 mb-12 border border-black/5 group-hover:bg-green/5 transition-colors duration-500">
                        <div className="flex items-center gap-3 mb-4">
                          <Lightbulb className="w-4 h-4 text-green" />
                          <span className="text-[11px] font-black uppercase tracking-widest text-green">The Benefit</span>
                        </div>
                        <p className="text-xs md:text-sm text-black/60 font-medium leading-relaxed italic">
                          &ldquo;{game.benefit || "Strengthens neural pathways and enhances cognitive agility through repeated exposure."}&rdquo;
                        </p>
                      </div>

                      <div className="mt-auto">
                        <Link 
                          href={`/mind-gym/${gameSlug}`}
                          className="dm-pill-button dm-pill-button-primary w-full text-[11px] py-5 inline-flex items-center justify-center gap-3 group-hover:scale-[1.02] transition-transform"
                        >
                          Enter Training Session
                          <ArrowRight className="w-5 h-5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* The Divit Approach - Refined Section */}
      <section className="py-20 md:py-32 bg-green text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-6xl font-serif mb-8 md:mb-12 italic leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                The Science of Neuroplasticity
              </h2>
              <p className="text-base md:text-xl text-white/80 font-medium leading-relaxed mb-12 md:mb-16 max-w-3xl mx-auto">
                Mind Gym exercises are built on the principles of neuroplasticity—the brain&apos;s innate ability to reorganize itself by forming new neural connections. Regular cognitive training is like physical exercise for your mind; it helps maintain acuity and sharpens executive function.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                {[
                  { title: "Daily Rituals", desc: "Just 10 minutes a day can lead to measurable improvements in focus." },
                  { title: "Targeted Goals", desc: "Select exercises based on your specific developmental needs." },
                  { title: "Evidence Based", desc: "Inspired by gold-standard neuropsychological assessments." }
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-[2.5rem] p-8 md:p-10 border border-white/10 text-left transition-transform hover:scale-[1.02] duration-500">
                    <CheckCircle2 className="w-6 h-6 text-white/40 mb-5" />
                    <h4 className="text-sm font-bold uppercase tracking-widest mb-3">{item.title}</h4>
                    <p className="text-xs text-white/60 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Subtle Background Detail */}
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-y-1/2" />
      </section>
    </div>
  );
}
