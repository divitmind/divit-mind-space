"use client";

import { motion } from "motion/react";
import { Phone, Search, Puzzle, TrendingUp } from "lucide-react";

const journeySteps = [
  {
    number: "01",
    day: "Day 1",
    title: "Discovery Call",
    description: "A gentle conversation to understand your concerns and guide you toward the right specialist.",
    icon: Phone,
    accent: "#7A9A7D",
    bg: "#F2F5F2",
  },
  {
    number: "02",
    day: "Week 1",
    title: "Clinical Assessment",
    description: "An in-depth, strength-based evaluation to create a clear developmental roadmap for your child.",
    icon: Search,
    accent: "#9B8EC4",
    bg: "#F5F3F9",
  },
  {
    number: "03",
    day: "Week 2",
    title: "Your Care Begins",
    description: "Evidence-based support begins — therapy, specialist programmes, counselling, or education, tailored precisely to your needs.",
    icon: Puzzle,
    accent: "#C8956C",
    bg: "#FAF4EE",
  },
  {
    number: "04",
    day: "Month 1",
    title: "Progress Review",
    description: "A collaborative review to celebrate wins and refine our approach based on real-world progress.",
    icon: TrendingUp,
    accent: "#7A9A7D",
    bg: "#F2F5F2",
  },
];

export function JourneyTimeline() {
  return (
    <section className="pt-4 pb-10 bg-[#FDFBF7] overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-[10px] font-bold uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
            Your Path to Progress
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-cormorant)] italic text-black mb-6">
            The First 30 Days
          </h2>
          <p className="text-lg text-black/60 font-medium leading-relaxed max-w-2xl mx-auto">
            We believe in transparency. Here is exactly what your journey looks like from the very first call.
          </p>
        </div>

        {/* Cards */}
        <div className="relative max-w-6xl mx-auto">
          {/* Connector thread — desktop only */}
          <div className="hidden lg:block absolute top-[2.75rem] left-[12.5%] right-[12.5%] h-px bg-black/8 z-0" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {journeySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative"
                >
                  {/* Dot on connector thread — desktop */}
                  <div
                    className="hidden lg:flex absolute top-[2.75rem] left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white border-2 items-center justify-center z-10 transition-all duration-300 group-hover:scale-125"
                    style={{ borderColor: step.accent }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: step.accent }} />
                  </div>

                  {/* Card body */}
                  <div
                    className="relative lg:mt-[2.75rem] p-6 pt-8 rounded-[2rem] border border-black/[0.04] overflow-hidden transition-all duration-500 group-hover:shadow-xl group-hover:-translate-y-1.5"
                    style={{ backgroundColor: step.bg }}
                  >
                    {/* Top accent bar */}
                    <div
                      className="absolute top-0 left-6 right-6 h-[3px] rounded-full"
                      style={{ backgroundColor: step.accent }}
                    />

                    {/* Watermark number */}
                    <div
                      aria-hidden
                      className="absolute -bottom-3 -right-1 font-[family-name:var(--font-cormorant)] italic font-bold leading-none select-none pointer-events-none"
                      style={{ color: step.accent, opacity: 0.07, fontSize: "8rem" }}
                    >
                      {step.number}
                    </div>

                    {/* Day label */}
                    <div
                      className="text-[8px] font-black uppercase tracking-[0.3em] mb-4"
                      style={{ color: step.accent }}
                    >
                      {step.day}
                    </div>

                    {/* Icon */}
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${step.accent}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: step.accent }} />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-[family-name:var(--font-cormorant)] italic text-black mb-3 leading-tight">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-black/55 font-medium leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
