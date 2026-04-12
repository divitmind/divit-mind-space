"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Brain, Sparkles, Target, Zap, ArrowRight, Activity, Eye, Compass, Lightbulb, Focus, CheckCircle2, MessageCircle, Share2, Award, Trophy, TrendingUp, Users, Gift, Microscope, Flame, Calendar, BarChart3, Star, Lock, CheckCircle, ShieldCheck, Info } from "lucide-react";
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
  { id: "all", label: "All Training", icon: Brain, color: "text-purple", bg: "bg-purple/5" },
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
  const [streak, setStreak] = useState(0);

  // Robust Streak Logic
  useEffect(() => {
    const savedStreak = localStorage.getItem("divit-mind-streak");
    const lastPlayedDate = localStorage.getItem("divit-last-played");
    
    const today = new Date().toDateString();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayString = yesterday.toDateString();

    if (!savedStreak || !lastPlayedDate) {
      // First visit ever
      localStorage.setItem("divit-mind-streak", "1");
      localStorage.setItem("divit-last-played", today);
      setStreak(1);
    } else {
      const currentStreak = parseInt(savedStreak);
      
      if (lastPlayedDate === today) {
        // Already played today, just show current streak
        setStreak(currentStreak);
      } else if (lastPlayedDate === yesterdayString) {
        // Success! They came back exactly one day later
        const newStreak = currentStreak + 1;
        localStorage.setItem("divit-mind-streak", newStreak.toString());
        localStorage.setItem("divit-last-played", today);
        setStreak(newStreak);
      } else {
        // They missed a day or more, reset to 1
        localStorage.setItem("divit-mind-streak", "1");
        localStorage.setItem("divit-last-played", today);
        setStreak(1);
      }
    }
  }, []);

  const games = initialGames.length > 0 ? initialGames : (defaultGames as ExtendedMindGymItem[]);

  const filteredGames = useMemo(() => {
    if (activeCategory === "all") return games;
    return games.filter(g => g.category === activeCategory || g.focusArea?.toLowerCase().includes(activeCategory));
  }, [activeCategory, games]);

  const handleWhatsAppShare = (title: string, level: string = "ELITE") => {
    const text = `🧠 DIVIT MIND GYM 🧠\n\nActivity: ${title}\nNeuro-Efficiency: 🟩🟩🟩🟩🟩 [${level}]\nTraining Streak: ${streak} Days 🔥\n\nCan you beat my focus? Challenge me to win a specialist session:\nhttps://divitmindspace.com/mind-gym`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleClaimReward = () => {
    const text = `Hi Divit Team! 🧠\n\nI just hit a ${streak}-Day Streak at the Mind Gym! 🔥\n\nI'd like to claim my complimentary specialist session/workshop. Looking forward to it!`;
    window.open(`https://wa.me/919910604104?text=${encodeURIComponent(text)}`, '_blank');
  };

  const scrollToGym = () => {
    const floor = document.getElementById('gym-floor');
    if (floor) floor.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Immersive Hero Section - Maximum Tightness */}
      <section className="relative pt-6 pb-8 lg:pt-8 lg:pb-10 overflow-hidden bg-white text-center">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-green leading-[1.05] mb-4 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Mind Gym
            </h1>
            <p className="text-base md:text-lg text-black/40 max-w-2xl mx-auto font-medium leading-relaxed italic">
              Browse our brain training games for children, teens, and adults. Sharpen your attention, memory, and reaction precision through daily practice. Challenge a friend on WhatsApp to win a complimentary specialist session or workshops.
            </p>
          </motion.div>
        </div>

        {/* Abstract Background Fades */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-purple/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-green/5 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />
      </section>

      {/* The "Direct-to-WhatsApp" Claim Card */}
      <section className="pb-10 bg-white relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green rounded-[2.5rem] p-8 md:p-10 relative overflow-hidden shadow-2xl shadow-green/20"
          >
            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-white text-[10px] font-black uppercase tracking-widest mb-4 border border-white/10 backdrop-blur-sm">
                  <TrendingUp className="w-4 h-4" />
                  Divit Performance Reward
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white italic mb-4 leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                  Unlock a Specialist Neuro-Audit
                </h2>
                <p className="text-white/70 text-base md:text-lg font-medium leading-relaxed mb-8 italic">
                  Complete your **3-Day Training Streak** and challenge a friend to qualify for a complimentary clinical assessment with our specialists. {streak >= 3 ? "Your reward is now available!" : "Continue training to unlock."}
                  <span className="block mt-4 text-[10px] text-white/40 font-bold uppercase tracking-[0.1em] not-italic">
                    <ShieldCheck className="w-3 h-3 inline-block mr-1 -mt-0.5" />
                    Progress saved privately to this browser • No login required
                  </span>
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                  <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm relative group">
                    <Flame className={cn("w-5 h-5", streak >= 1 ? "text-orange-400 fill-orange-400" : "text-white/40")} />
                    {streak >= 1 && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]" />
                    )}
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-none">Streak Status</p>
                      <p className="text-sm font-bold text-white mt-1">{Math.min(streak, 3)}/3 Days Active</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                    <Award className={cn("w-5 h-5", streak >= 3 ? "text-yellow-400" : "text-white/40")} />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40 leading-none">Reward</p>
                      <p className="text-sm font-bold text-white mt-1">Specialist Consultation</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="shrink-0 flex flex-col gap-4 w-full lg:w-auto">
                {streak >= 3 ? (
                  <button 
                    onClick={handleClaimReward}
                    className="px-10 py-5 rounded-full bg-white text-green text-[12px] font-black uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(255,255,255,0.2)] hover:scale-105 transition-all flex items-center justify-center gap-4 group animate-pulse"
                  >
                    Claim My Session
                    <MessageCircle className="w-5 h-5" />
                  </button>
                ) : (
                  <button 
                    onClick={scrollToGym}
                    className="px-10 py-5 rounded-full bg-white text-green text-[12px] font-black uppercase tracking-[0.2em] shadow-xl hover:scale-105 transition-all flex items-center justify-center gap-4 group"
                  >
                    Continue Training
                    <Lock className="w-4 h-4 opacity-40 group-hover:opacity-100 transition-opacity" />
                  </button>
                )}
                
                <button 
                  onClick={() => handleWhatsAppShare("Divit Mind Gym Challenge")}
                  className="px-10 py-4 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/20 transition-all flex items-center justify-center gap-3"
                >
                  <MessageCircle className="w-4 h-4" />
                  Challenge a Friend to Win
                </button>
              </div>
            </div>

            {/* Abstract Decorative Circles */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.03] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-black/[0.05] rounded-full translate-y-1/2 -translate-x-1/2" />
          </motion.div>
        </div>
      </section>

      {/* Targeted Training sticky nav */}
      <section className="py-4 md:py-6 border-y border-black/5 bg-[#FAF9F5]/90 sticky top-0 z-40 backdrop-blur-xl shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 shrink-0">
              <div className="w-10 h-10 rounded-2xl bg-white shadow-sm border border-black/5 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-green" />
              </div>
              <div>
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-green leading-none">Targeted Training</h3>
                <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest mt-1.5">Select Your Focus</p>
              </div>
            </div>
            
            <div className="w-full lg:w-auto overflow-x-auto no-scrollbar pb-1 lg:pb-0">
              <div className="flex justify-start lg:justify-end gap-3 px-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={cn(
                      "px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2.5 border whitespace-nowrap shrink-0",
                      activeCategory === cat.id 
                        ? "bg-green text-white border-green shadow-lg shadow-green/20 scale-105" 
                        : "bg-white text-black/50 border-black/5 hover:border-green/20 hover:text-green"
                    )}
                  >
                    <cat.icon className="w-3.5 h-3.5" />
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Game floor */}
      <section id="gym-floor" className="py-6 md:py-8 lg:py-10">
        <div className="container mx-auto px-4">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
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
                    className="group bg-white rounded-[2.5rem] overflow-hidden border border-black/5 shadow-sm hover:shadow-xl hover:shadow-purple/5 transition-all duration-500 flex flex-col h-full relative"
                  >
                    {/* Visual Header */}
                    <div className="aspect-[16/10] relative bg-[#FAF9F5] overflow-hidden">
                      {game.coverImage?.asset?.url ? (
                        <Image
                          src={game.coverImage.asset.url}
                          alt={game.title || "Game"}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                      ) : (
                        <GameThumbnail slug={gameSlug as string} />
                      )}
                      
                      <div className="absolute top-5 left-5 flex flex-col items-start gap-1.5 pointer-events-none z-10">
                        <div className="px-3 py-1.5 rounded-full bg-green/5 backdrop-blur-md text-[8px] font-black text-green uppercase tracking-[0.15em] border border-green/10 shadow-sm leading-none">
                          {game.focusArea}
                        </div>
                        <div className="px-3 py-1.5 rounded-full bg-green/5 backdrop-blur-md text-[8px] font-black text-green uppercase tracking-[0.15em] border border-green/10 shadow-sm leading-none">
                          {game.ageGroup}
                        </div>
                      </div>

                      {/* Rank/Flex Badge */}
                      <div className="absolute top-5 right-5 flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple text-white text-[8px] font-black uppercase tracking-widest shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-90 group-hover:scale-100">
                        <Star className="w-2.5 h-2.5 fill-current" />
                        Elite Status
                      </div>
                    </div>

                    <div className="p-6 md:p-8 flex flex-col flex-grow">
                      <h2 className="text-2xl md:text-3xl font-serif text-green mb-2 italic group-hover:text-purple transition-colors duration-500 leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                        {game.title}
                      </h2>
                      
                      <p className="text-sm text-black/50 font-medium leading-relaxed mb-5 line-clamp-2 italic">
                        {game.shortDescription}
                      </p>

                      <div className="bg-green/5 rounded-[1.5rem] p-5 mb-6 border border-green/10 group-hover:bg-green/10 transition-all duration-500">
                        <div className="flex items-center gap-2 mb-2">
                          <Activity className="w-3 h-3 text-green" />
                          <span className="text-[9px] font-black uppercase tracking-widest text-green">Brain Impact</span>
                        </div>
                        <p className="text-[11px] text-black/50 font-medium leading-relaxed italic">
                          &ldquo;{game.benefit || "Strengthens neural pathways and enhances cognitive agility through repeated exposure."}&rdquo;
                        </p>
                      </div>

                      <div className="mt-auto flex flex-col gap-2">
                        <Link 
                          href={`/mind-gym/${gameSlug}`}
                          className="dm-pill-button dm-pill-button-primary w-full text-[10px] py-4 inline-flex items-center justify-center gap-3 group-hover:scale-[1.01] transition-all"
                        >
                          Start Training
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                        
                        <button 
                          onClick={() => handleWhatsAppShare(game.title || "Brain Exercise")}
                          className="w-full flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.15em] text-green/40 hover:text-green transition-colors py-1.5"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          Challenge a Friend to Win
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Science section */}
      <section className="pt-4 pb-10 md:pt-6 md:pb-16 bg-green text-white overflow-hidden relative">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-5xl font-serif mb-3 italic leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                The Science of Neuroplasticity
              </h2>
              <p className="text-base md:text-lg text-white/80 font-medium leading-relaxed mb-6 max-w-3xl mx-auto italic">
                Our Mind Gym exercises are built on the principles of neuroplasticity—the brain&apos;s innate ability to reorganize itself by forming new neural connections. Regular training helps maintain acuity and sharpens executive function across all ages.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: "Daily Practice", desc: "Just 10 minutes a day leads to measurable improvements in focus and mental agility." },
                  { title: "Targeted Training", desc: "Select exercises based on your specific developmental needs and goals." },
                  { title: "Evidence Based", desc: "Inspired by gold-standard neuropsychological assessments and clinical practices." }
                ].map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 md:p-5 border border-white/10 text-left transition-all duration-500 h-full flex flex-col justify-center">
                    <h4 className="text-sm font-bold uppercase tracking-[0.2em] mb-1.5 text-white/90 leading-tight">{item.title}</h4>
                    <p className="text-xs text-white/60 font-medium leading-relaxed italic">{item.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

