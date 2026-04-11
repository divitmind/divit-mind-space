"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Sparkles, Target, Zap, ArrowRight, Activity, Eye, Compass, Lightbulb, Focus, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MindGymItem } from "@/sanity/types";
import { cn } from "@/lib/utils";

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
      <section className="relative pt-20 pb-8 lg:pt-32 lg:pb-16 overflow-hidden bg-white">
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
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-green leading-[1.1] mb-6 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Mind Gym
            </h1>
            <p className="text-base md:text-lg text-black/40 max-w-xl mx-auto font-medium leading-relaxed italic">
              Cultivate clarity, strengthen focus, and nurture resilience through scientifically-inspired cognitive rituals.
            </p>
          </motion.div>
        </div>

        {/* Abstract Background Fades */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Choose Your Focus - Refined sticky nav */}
      <section className="py-6 md:py-8 border-y border-black/5 bg-[#FAF9F5]/80 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 rounded-xl bg-white shadow-sm border border-black/5 flex items-center justify-center">
                <Focus className="w-4 h-4 text-green" />
              </div>
              <div>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-green leading-none">Targeted Training</h3>
                <p className="text-[9px] text-black/30 font-bold uppercase tracking-widest mt-1">Select mental goal</p>
              </div>
            </div>
            
            {/* Horizontal scroll on mobile for categories */}
            <div className="w-full lg:w-auto overflow-x-auto no-scrollbar pb-2 lg:pb-0">
              <div className="flex justify-start lg:justify-end gap-2 px-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-4 py-2.5 rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border whitespace-nowrap shrink-0",
                      activeCategory === cat.id 
                        ? "bg-green text-white border-green shadow-md shadow-green/10 scale-105" 
                        : "bg-white text-black/40 border-black/5 hover:border-green/20 hover:text-green"
                    )}
                  >
                    <cat.icon className="w-3 h-3" />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid - Polished Cards */}
      <section className="py-12 md:py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10"
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
                    className="group bg-white rounded-[2.5rem] overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:shadow-purple/5 transition-all duration-500 flex flex-col h-full"
                  >
                    {/* Card Visual Header */}
                    <div className="aspect-[16/10] relative bg-[#FAF9F5] overflow-hidden">
                      {game.coverImage?.asset?.url ? (
                        <Image
                          src={game.coverImage.asset.url}
                          alt={game.title || "Game"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-20 h-24 rounded-full bg-purple/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                            <Brain className="w-8 h-8 text-purple/20" />
                          </div>
                        </div>
                      )}
                      
                      {/* Cognitive Tags - Tightened */}
                      <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-[8px] font-black text-green uppercase tracking-[0.15em] border border-green/10 shadow-sm">
                          {game.focusArea}
                        </span>
                        <span className="px-2.5 py-1 rounded-full bg-purple/90 backdrop-blur-md text-[8px] font-black text-white uppercase tracking-[0.15em] border border-purple/10 shadow-sm">
                          {game.ageGroup}
                        </span>
                      </div>
                    </div>

                    {/* Card Content - Refined Spacing */}
                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <h2 className="text-2xl font-serif text-green mb-3 italic group-hover:text-purple transition-colors duration-500 leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                        {game.title}
                      </h2>
                      
                      <p className="text-xs md:text-sm text-black/50 font-medium leading-relaxed mb-6 line-clamp-2">
                        {game.shortDescription}
                      </p>

                      {/* Benefit Section - Inspiration from FreeFocusGames */}
                      <div className="bg-[#FAF9F5] rounded-2xl p-5 mb-8 border border-black/5 group-hover:bg-green/5 transition-colors duration-500">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb className="w-3 h-3 text-green" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-green">The Benefit</span>
                        </div>
                        <p className="text-[11px] text-black/50 font-medium leading-relaxed italic">
                          &ldquo;{game.benefit || "Strengthens neural pathways and enhances cognitive agility through repeated exposure."}&rdquo;
                        </p>
                      </div>

                      <div className="mt-auto">
                        <Link 
                          href={`/mind-gym/${gameSlug}`}
                          className="dm-pill-button dm-pill-button-primary w-full text-[9px] py-3.5 inline-flex items-center justify-center gap-2.5 group-hover:scale-[1.01] transition-transform"
                        >
                          Enter Training Session
                          <ArrowRight className="w-3.5 h-3.5" />
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
      <section className="py-16 md:py-24 bg-green text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-serif mb-6 md:mb-8 italic leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                The Science of Neuroplasticity
              </h2>
              <p className="text-base md:text-lg text-white/80 font-medium leading-relaxed mb-10 md:mb-12 max-w-3xl mx-auto">
                Mind Gym exercises are built on the principles of neuroplasticity—the brain&apos;s innate ability to reorganize itself by forming new neural connections. Regular cognitive training is like physical exercise for your mind; it helps maintain acuity and sharpens executive function.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {[
                  { title: "Daily Rituals", desc: "Just 10 minutes a day can lead to measurable improvements in focus." },
                  { title: "Targeted Goals", desc: "Select exercises based on your specific developmental needs." },
                  { title: "Evidence Based", desc: "Inspired by gold-standard neuropsychological assessments." }
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-[2rem] p-6 md:p-8 border border-white/10 text-left transition-transform hover:scale-[1.02] duration-500">
                    <CheckCircle2 className="w-5 h-5 text-white/40 mb-4" />
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-2">{item.title}</h4>
                    <p className="text-[11px] text-white/60 font-medium leading-relaxed">{item.desc}</p>
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
