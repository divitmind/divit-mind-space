"use client";

import { motion } from "motion/react";

interface AboutUsStoryData {
  title?: string;
  paragraphs?: string[];
}

const defaultParagraphs = [
  "Divit MindSpace was born from a deeply personal journey. Firsthand experience raising a neurodivergent child revealed the gaps in accessible, compassionate care.",
  "What started as a search for answers became a mission: to create a space where every individual is seen for their potential, not their diagnosis.",
  "Today, we combine clinical expertise with genuine understanding—because we&apos;ve walked this path ourselves. Every family that comes to us is treated like our own."
];

export function StorySection({ data }: { data?: AboutUsStoryData }) {
  const title = data?.title || "Our Journey";
  const paragraphs = data?.paragraphs || defaultParagraphs;

  return (
    <section className="py-8 lg:py-6 bg-[#FAF9F5]">
      <div className="container mx-auto px-4">
        <motion.div
          className="max-w-3xl mx-auto space-y-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="space-y-4">
            <h2
              className="text-4xl lg:text-5xl font-serif text-black leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              {title}
            </h2>
            <p className="text-[#7A9A7D] font-bold uppercase tracking-widest text-[10px]">
              Rooted in Compassion, Built on Expertise
            </p>
          </div>

          <div className="space-y-6 text-lg text-black/70 font-medium leading-relaxed text-left">
            {paragraphs.map((p, i) => (
              <p key={i} dangerouslySetInnerHTML={{ __html: p }} />
            ))}

            <div className="p-8 bg-white rounded-3xl border border-black/5 shadow-xl shadow-black/[0.02]">
              <p className="text-black font-semibold text-xl mb-3">Local Care for Bangalore Families</p>
              <p className="text-base">
                Located off <span className="text-[#7A9A7D]">Sarjapur Road</span>, we provide trusted care for families across <span className="font-bold">Kasavanahalli, HSR Layout, Bellandur, and Bengaluru</span>. Our center is a safe haven designed for neurodivergent individuals and families across all ages.
              </p>
            </div>
          </div>

          <div className="pt-8 border-t border-black/5">
            <div className="flex items-center justify-center gap-6">
              <div className="w-1.5 h-14 bg-[#7A9A7D]/20 rounded-full" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1">Our Core Mission</span>
                <span className="text-xl font-serif italic text-black">Empowering potential through compassionate, evidence-based care.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


