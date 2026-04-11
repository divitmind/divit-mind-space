"use client";

import { motion } from "motion/react";
import { Brain, Sparkles, Target, Zap, Share2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MindGymItem } from "@/sanity/types";

interface MindGymPageProps {
  initialGames: MindGymItem[];
}

const defaultGames: Partial<MindGymItem>[] = [
  {
    title: "Pulse Check",
    slug: "pulse-check",
    focusArea: "Processing Speed",
    ageGroup: "All Ages",
    shortDescription: "Test your raw reaction time and neural efficiency with this simple benchmark test.",
  },
  {
    title: "Schulte Table",
    slug: "schulte-table",
    focusArea: "Visual Scanning & Focus",
    ageGroup: "All Ages",
    shortDescription: "Improve peripheral vision and speed reading by finding numbers in a grid sequence.",
  },
  {
    title: "Stroop Test",
    slug: "stroop-test",
    focusArea: "Cognitive Flexibility",
    ageGroup: "Teens & Adults",
    shortDescription: "Train your brain to overcome conflicting information between word meaning and color.",
  },
  {
    title: "Neural Fusion",
    slug: "neural-fusion",
    focusArea: "Strategic Planning",
    ageGroup: "Teens & Adults",
    shortDescription: "A logic-based numbers game that builds pattern recognition and long-term strategic thinking.",
  },
  {
    title: "Mindful Paths",
    slug: "mindful-paths",
    focusArea: "Spatial Reasoning",
    ageGroup: "All Ages",
    shortDescription: "A meditative spatial puzzle. Rotate the tiles to align the flow and connect patterns.",
  }
];

export function MindGymPage({ initialGames }: MindGymPageProps) {
  const games = initialGames.length > 0 ? initialGames : (defaultGames as MindGymItem[]);

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Hero Section - Reduced Padding */}
      <section className="relative pt-20 pb-8 lg:pt-32 lg:pb-12 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 text-purple text-[10px] font-bold uppercase tracking-widest mb-6">
              <Brain className="w-3 h-3" />
              Cognitive Development Hub
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-green leading-[1.1] mb-6 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Mind Gym
            </h1>
            <p className="text-base md:text-lg text-black/60 max-w-2xl mx-auto font-medium leading-relaxed">
              Interactive brain training designed to enhance focus, memory, and cognitive flexibility for all ages. Free, science-led, and mindful.
            </p>
          </motion.div>
        </div>

        <div className="absolute top-0 left-0 w-64 h-64 bg-purple/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </section>

      {/* Why Mind Gym? - Tighter Spacing */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {[
              { icon: Target, title: "Enhance Focus", desc: "Training tasks to boost concentration.", bg: "bg-green/5", color: "text-green" },
              { icon: Zap, title: "Build Flexibility", desc: "Improve adaptive thinking.", bg: "bg-purple/5", color: "text-purple" },
              { icon: Sparkles, title: "Open to All", desc: "Free resources for everyone.", bg: "bg-yellow/5", color: "text-yellow-600" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-black/5">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", item.bg)}>
                  <item.icon className={cn("w-5 h-5", item.color)} />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-green">{item.title}</h3>
                  <p className="text-xs text-black/50 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Games Grid - Optimized Cards */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {games.map((game, idx) => (
              <motion.div
                key={game.slug}
                className="group bg-white rounded-3xl overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:shadow-purple/5 transition-all duration-500 flex flex-col"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="aspect-[16/10] relative bg-purple/5 overflow-hidden">
                  {game.coverImage?.asset?.url ? (
                    <Image
                      src={game.coverImage.asset.url}
                      alt={game.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                      <Brain className="w-20 h-20 text-purple" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-[9px] font-bold text-green uppercase tracking-widest border border-green/10">
                      {game.focusArea}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-3">
                    <h2 className="text-2xl font-serif text-green" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                      {game.title}
                    </h2>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-purple/50 bg-purple/5 px-2 py-1 rounded-md">
                      {game.ageGroup}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-black/50 font-medium leading-relaxed mb-6 flex-grow">
                    {game.shortDescription}
                  </p>
                  <Link 
                    href={`/mind-gym/${game.slug}`}
                    className="dm-pill-button dm-pill-button-primary w-full text-xs py-3 inline-flex items-center justify-center gap-2"
                  >
                    Enter Exercise
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
