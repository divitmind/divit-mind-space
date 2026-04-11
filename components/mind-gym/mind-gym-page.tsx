"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Sparkles, Target, Zap, ArrowRight, Activity, Eye, Compass, Lightbulb, Focus, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MindGymItem } from "@/sanity/types";
import { cn } from "@/lib/utils";

interface MindGymPageProps {
  initialGames: MindGymItem[];
}

const CATEGORIES = [
  { id: "all", label: "All Exercises", icon: Brain, color: "text-purple", bg: "bg-purple/5" },
  { id: "focus", label: "Focus & Attention", icon: Target, color: "text-green", bg: "bg-green/5" },
  { id: "memory", label: "Working Memory", icon: Activity, color: "text-blue-600", bg: "bg-blue-50" },
  { id: "spatial", label: "Spatial Logic", icon: Compass, color: "text-yellow-600", bg: "bg-yellow-50" },
  { id: "flexibility", label: "Flexibility", icon: Zap, color: "text-purple", bg: "bg-purple/5" },
];

const defaultGames: Partial<MindGymItem>[] = [
  {
    title: "Pulse Check",
    slug: "pulse-check",
    focusArea: "Processing Speed",
    ageGroup: "All Ages",
    shortDescription: "Test your raw reaction time and neural efficiency with this simple benchmark test.",
    category: "focus",
    benefit: "Enhances neural efficiency and information processing speed between eyes and brain."
  },
  {
    title: "Schulte Table",
    slug: "schulte-table",
    focusArea: "Visual Scanning & Focus",
    ageGroup: "All Ages",
    shortDescription: "Improve peripheral vision and speed reading by finding numbers in a grid sequence.",
    category: "focus",
    benefit: "Trains peripheral vision and sustained attention by maintaining a central gaze."
  },
  {
    title: "Stroop Test",
    slug: "stroop-test",
    focusArea: "Cognitive Flexibility",
    ageGroup: "Teens & Adults",
    shortDescription: "Train your brain to overcome conflicting information between word meaning and color.",
    category: "flexibility",
    benefit: "Strengthens executive function by filtering out distracting visual data."
  },
  {
    title: "Neural Fusion",
    slug: "neural-fusion",
    focusArea: "Strategic Planning",
    ageGroup: "Teens & Adults",
    shortDescription: "A logic-based numbers game that builds pattern recognition and long-term strategic thinking.",
    category: "memory",
    benefit: "Develops advanced strategic planning and working memory capacity."
  },
  {
    title: "Mindful Paths",
    slug: "mindful-paths",
    focusArea: "Spatial Reasoning",
    ageGroup: "All Ages",
    shortDescription: "A meditative spatial puzzle. Rotate the tiles to align the flow and connect patterns.",
    category: "spatial",
    benefit: "Improves mental rotation skills and spatial relationship processing."
  }
];

export function MindGymPage({ initialGames }: MindGymPageProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const games = initialGames.length > 0 ? initialGames : (defaultGames as any[]);

  const filteredGames = useMemo(() => {
    if (activeCategory === "all") return games;
    return games.filter(g => g.category === activeCategory || g.focusArea?.toLowerCase().includes(activeCategory));
  }, [activeCategory, games]);

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Immersive Hero Section */}
      <section className="relative pt-24 pb-12 lg:pt-36 lg:pb-20 overflow-hidden bg-white">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/5 text-green text-[10px] font-black uppercase tracking-[0.3em] mb-8 border border-green/10">
              <Brain className="w-3 h-3" />
              The Cognitive Sanctuary
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-green leading-[1.05] mb-8 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Mind Gym
            </h1>
            <p className="text-lg md:text-xl text-black/40 max-w-2xl mx-auto font-medium leading-relaxed italic">
              Cultivate clarity, strengthen focus, and nurture resilience through scientifically-inspired cognitive rituals.
            </p>
          </motion.div>
        </div>

        {/* Abstract Background Fades */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-green/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* Choose Your Focus - Prescription Navigation */}
      <section className="py-12 border-y border-black/5 bg-[#FAF9F5]/50 sticky top-0 z-40 backdrop-blur-md">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-black/5 flex items-center justify-center">
                <Focus className="w-5 h-5 text-green" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-widest text-green">Targeted Training</h3>
                <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest mt-0.5">Choose your mental goal</p>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-3">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 border",
                    activeCategory === cat.id 
                      ? "bg-green text-white border-green shadow-lg shadow-green/20 scale-105" 
                      : "bg-white text-black/40 border-black/5 hover:border-green/20 hover:text-green"
                  )}
                >
                  <cat.icon className="w-3.5 h-3.5" />
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid - Benefit-Rich Cards */}
      <section className="py-20 lg:py-28">
        <div className="container mx-auto px-4">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredGames.map((game, idx) => (
                <motion.div
                  key={game.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  className="group bg-white rounded-[3rem] overflow-hidden border border-black/5 shadow-sm hover:shadow-2xl hover:shadow-purple/5 transition-all duration-700 flex flex-col h-full"
                >
                  {/* Card Visual Header */}
                  <div className="aspect-[16/9] relative bg-[#FAF9F5] overflow-hidden">
                    {game.coverImage?.asset?.url ? (
                      <Image
                        src={game.coverImage.asset.url}
                        alt={game.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-purple/5 flex items-center justify-center group-hover:scale-110 transition-transform duration-700">
                          <Brain className="w-10 h-10 text-purple/20" />
                        </div>
                      </div>
                    )}
                    
                    {/* Cognitive Tags */}
                    <div className="absolute top-6 left-6 flex flex-wrap gap-2">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[9px] font-black text-green uppercase tracking-[0.2em] border border-green/10 shadow-sm">
                        {game.focusArea}
                      </span>
                      <span className="px-3 py-1 rounded-full bg-purple/90 backdrop-blur-md text-[9px] font-black text-white uppercase tracking-[0.2em] border border-purple/10 shadow-sm">
                        {game.ageGroup}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-8 md:p-10 flex flex-col flex-grow">
                    <h2 className="text-3xl font-serif text-green mb-4 italic group-hover:text-purple transition-colors duration-500" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                      {game.title}
                    </h2>
                    
                    <p className="text-sm text-black/60 font-medium leading-relaxed mb-8 line-clamp-2">
                      {game.shortDescription}
                    </p>

                    {/* Benefit Section - Inspiration from FreeFocusGames */}
                    <div className="bg-[#FAF9F5] rounded-[2rem] p-6 mb-10 border border-black/5 group-hover:bg-green/5 transition-colors duration-500">
                      <div className="flex items-center gap-2 mb-3">
                        <Lightbulb className="w-3.5 h-3.5 text-green" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-green">The Benefit</span>
                      </div>
                      <p className="text-xs text-black/50 font-medium leading-relaxed italic">
                        &ldquo;{game.benefit || "Strengthens neural pathways and enhances cognitive agility through repeated exposure."}&rdquo;
                      </p>
                    </div>

                    <div className="mt-auto">
                      <Link 
                        href={`/mind-gym/${game.slug}`}
                        className="dm-pill-button dm-pill-button-primary w-full text-[10px] py-4 inline-flex items-center justify-center gap-3 group-hover:scale-[1.02] transition-transform"
                      >
                        Enter Training Session
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* The Divit Approach - Scientific Credibility Section */}
      <section className="py-24 bg-green text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-serif mb-8 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                The Science of Neuroplasticity
              </h2>
              <p className="text-lg text-white/80 font-medium leading-relaxed mb-12">
                Mind Gym exercises are built on the principles of neuroplasticity—the brain&apos;s innate ability to reorganize itself by forming new neural connections throughout life. Regular cognitive training is like physical exercise for your mind; it helps maintain acuity, improves resilience to stress, and sharpens executive function.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: "Daily Rituals", desc: "Just 10 minutes a day can lead to measurable improvements in focus." },
                  { title: "Targeted Goals", desc: "Select exercises based on your specific developmental needs." },
                  { title: "Evidence Based", desc: "Inspired by gold-standard neuropsychological assessments." }
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-[2rem] p-8 border border-white/10 text-left">
                    <CheckCircle2 className="w-6 h-6 text-white/40 mb-4" />
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
