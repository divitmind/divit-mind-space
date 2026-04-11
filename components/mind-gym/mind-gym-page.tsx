"use client";

import { motion } from "motion/react";
import { Brain, Sparkles, Target, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MindGymItem } from "@/sanity/types";

interface MindGymPageProps {
  initialGames: MindGymItem[];
}

const defaultGames: Partial<MindGymItem>[] = [
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
  }
];

export function MindGymPage({ initialGames }: MindGymPageProps) {
  const games = initialGames.length > 0 ? initialGames : (defaultGames as MindGymItem[]);

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 lg:pt-24 lg:pb-16 overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 text-purple text-xs font-bold uppercase tracking-widest mb-6">
              <Brain className="w-4 h-4" />
              Cognitive Development Hub
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-green leading-[1.1] mb-6 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Mind Gym
            </h1>
            <p className="text-lg text-black/70 max-w-2xl mx-auto font-medium leading-relaxed">
              Explore our collection of interactive brain training exercises. These scientifically inspired games are designed to enhance focus, memory, and cognitive flexibility for all ages.
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </section>

      {/* Why Mind Gym? */}
      <section className="py-12 bg-cream/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-xl shadow-black/[0.02]">
              <div className="w-12 h-12 rounded-2xl bg-green/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-green" />
              </div>
              <h3 className="text-lg font-bold text-green mb-2">Enhance Focus</h3>
              <p className="text-sm text-black/60 font-medium">Training tasks designed to minimize distractions and boost concentration.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-xl shadow-black/[0.02]">
              <div className="w-12 h-12 rounded-2xl bg-purple/10 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-purple" />
              </div>
              <h3 className="text-lg font-bold text-green mb-2">Build Flexibility</h3>
              <p className="text-sm text-black/60 font-medium">Improve cognitive switching and adaptive thinking through interactive challenges.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-3xl shadow-xl shadow-black/[0.02]">
              <div className="w-12 h-12 rounded-2xl bg-yellow/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-bold text-green mb-2">Open to All</h3>
              <p className="text-sm text-black/60 font-medium">Completely free resources tailored for children, teens, and adults.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Games Grid */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {games.map((game, idx) => (
              <motion.div
                key={game.slug}
                className="group bg-white rounded-[2rem] overflow-hidden border border-black/5 shadow-2xl hover:shadow-purple/10 transition-all duration-500"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="aspect-[16/9] relative bg-purple/5 overflow-hidden">
                  {game.coverImage?.asset?.url ? (
                    <Image
                      src={game.coverImage.asset.url}
                      alt={game.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center opacity-20">
                      <Brain className="w-24 h-24 text-purple" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                    <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[10px] font-bold text-green uppercase tracking-widest border border-green/10">
                      {game.focusArea}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-purple text-white text-[10px] font-bold uppercase tracking-widest">
                      {game.ageGroup}
                    </span>
                  </div>
                </div>
                <div className="p-8 lg:p-10">
                  <h2 className="text-3xl font-serif text-green mb-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                    {game.title}
                  </h2>
                  <p className="text-black/60 font-medium leading-relaxed mb-8">
                    {game.shortDescription}
                  </p>
                  <Link 
                    href={`/mind-gym/${game.slug}`}
                    className="dm-pill-button dm-pill-button-primary inline-flex items-center gap-2 group/btn"
                  >
                    Play Exercise
                    <Target className="w-4 h-4 group-hover/btn:rotate-45 transition-transform" />
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
