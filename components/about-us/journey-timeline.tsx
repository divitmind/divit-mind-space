"use client";

import { motion } from "motion/react";
import { Phone, Search, Puzzle, TrendingUp } from "lucide-react";

const journeySteps = [
  {
    day: "Day 1",
    title: "Discovery Call",
    description: "A gentle conversation to understand your concerns and guide you toward the right specialist.",
    icon: Phone,
    color: "bg-sage/20",
    iconColor: "text-sage",
  },
  {
    day: "Week 1",
    title: "Clinical Assessment",
    description: "An in-depth, strength-based evaluation to create a clear developmental roadmap for your child.",
    icon: Search,
    color: "bg-purple/10",
    iconColor: "text-purple",
  },
  {
    day: "Week 2",
    title: "Therapy Integration",
    description: "Evidence-based sessions begin, tailored to your child's unique interests and sensory needs.",
    icon: Puzzle,
    color: "bg-ochre/10",
    iconColor: "text-ochre",
  },
  {
    day: "Month 1",
    title: "Progress Review",
    description: "A collaborative review to celebrate wins and refine our approach based on real-world progress.",
    icon: TrendingUp,
    color: "bg-green/10",
    iconColor: "text-green",
  },
];

export function JourneyTimeline() {
  return (
    <section className="py-20 bg-[#FAF9F5] overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
            Your Path to Progress
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-serif italic text-black mb-6">
            The First 30 Days
          </h2>
          <p className="text-lg text-black/60 font-medium max-w-2xl mx-auto">
            We believe in transparency. Here is exactly what your journey at Divit MindSpace looks like from the very first call.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Central Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-black/5 -translate-x-1/2" />

          <div className="space-y-12 lg:space-y-0">
            {journeySteps.map((step, index) => {
              const isEven = index % 2 === 1;
              return (
                <div key={index} className={`relative flex flex-col lg:flex-row items-center ${isEven ? "lg:flex-row-reverse" : ""}`}>
                  {/* Content */}
                  <div className="flex-1 w-full lg:w-1/2 p-4 lg:p-12">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white p-8 rounded-[2.5rem] border border-black/5 shadow-2xl shadow-black/[0.02] relative"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/30 block mb-2">{step.day}</span>
                      <h3 className="text-2xl font-serif italic text-black mb-4">{step.title}</h3>
                      <p className="text-black/60 leading-relaxed font-medium">{step.description}</p>
                    </motion.div>
                  </div>

                  {/* Icon Node */}
                  <div className="relative z-10 flex items-center justify-center w-12 h-12 lg:w-16 lg:h-16 rounded-full bg-white border border-black/5 shadow-xl">
                    <step.icon className={`w-6 h-6 lg:w-8 lg:h-8 ${step.iconColor}`} />
                  </div>

                  {/* Empty space for alignment */}
                  <div className="hidden lg:block flex-1 w-1/2" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
