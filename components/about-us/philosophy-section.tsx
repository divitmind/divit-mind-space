"use client";

import { motion } from "motion/react";
import { Heart, Users, Brain, Shield, Sparkles, Clock, LucideIcon } from "lucide-react";

interface AboutUsPhilosophyData {
  title?: string;
  description?: string;
  points?: {
    title: string;
    description: string;
    icon: string;
  }[];
}

const iconMap: Record<string, LucideIcon> = {
  Heart, Users, Brain, Shield, Sparkles, Clock
};

const defaultReasons = [
  {
    icon: "Brain",
    title: "Expert-Led Care",
    description: "Our team includes licensed psychologists, speech therapists, occupational therapists, and special educators."
  },
  {
    icon: "Heart",
    title: "Strength-Based, Neuro-Affirming Approach",
    description: "We focus on each individual's unique strengths, not just their challenges. Every plan is personalized, neuro-affirming, and tailored to your age and needs."
  },
  {
    icon: "Users",
    title: "Families & Caregivers as Partners",
    description: "Families and caregivers are partners in therapy. We equip you with strategies that work at home, school, and work too."
  },
  {
    icon: "Shield",
    title: "Safe & Sensory-Friendly Space",
    description: "A warm, sensory-friendly environment where individuals of all ages feel comfortable and supported."
  },
  {
    icon: "Sparkles",
    title: "Holistic Development",
    description: "We address communication, motor skills, behavior, academics, and social skills together."
  },
  {
    icon: "Clock",
    title: "Lifespan Care — Early Intervention to Adult Support",
    description: "From early intervention for children as young as 18 months to late-diagnosis support for teenagers and adults, we meet you where you are."
  }
];

// Migration map: when Sanity still holds the old child-specific titles, swap to the new all-ages copy at render time
const legacyTitleRemap: Record<string, { title: string; description: string; icon: string }> = {
  "Child-First Approach": {
    title: "Strength-Based, Neuro-Affirming Approach",
    description: "We focus on each individual's unique strengths, not just their challenges. Every plan is personalized, neuro-affirming, and tailored to your age and needs.",
    icon: "Heart",
  },
  "Family Involvement": {
    title: "Families & Caregivers as Partners",
    description: "Families and caregivers are partners in therapy. We equip you with strategies that work at home, school, and work too.",
    icon: "Users",
  },
  "Safe & Nurturing": {
    title: "Safe & Sensory-Friendly Space",
    description: "A warm, sensory-friendly environment where individuals of all ages feel comfortable and supported.",
    icon: "Shield",
  },
  "Early Intervention Focus": {
    title: "Lifespan Care — Early Intervention to Adult Support",
    description: "From early intervention for children as young as 18 months to late-diagnosis support for teenagers and adults, we meet you where you are.",
    icon: "Clock",
  },
};

export function PhilosophySection({ data }: { data?: AboutUsPhilosophyData }) {
  const title = "Why Bangalore Families Choose Divit MindSpace";
  const description = data?.description || "What sets our center apart from other facilities in Bengaluru";
  const rawPoints = data?.points || defaultReasons;
  const points = rawPoints.map((p) => legacyTitleRemap[p.title] ?? p);

  return (
    <section className="py-8 lg:pt-6 lg:pb-6 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-6 lg:mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >


          <h2
            className="text-4xl lg:text-5xl font-serif text-black mb-4"
          >
            {title}
          </h2>
          <p className="text-black/70 text-lg font-medium max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((reason, idx) => {
            const IconComponent = iconMap[reason.icon] || Sparkles;
            return (
              <motion.div
                key={idx}
                className="group relative flex flex-col p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] border border-black/5 transition-all duration-500 bg-white hover:shadow-2xl hover:shadow-black/5 hover:border-black/10 hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Icon Container - Matching Services Hub style */}
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 transition-transform group-hover:scale-105 bg-[#E8D5B7]">
                  <IconComponent className="h-5 w-5 lg:h-6 lg:w-6 text-[#7A9A7D]" />
                </div>

                {/* Title - Unified Serif Italic */}
                <h3 className="text-lg lg:text-xl font-bold text-black mb-2 lg:mb-3 font-serif italic leading-tight">
                  {reason.title}
                </h3>

                {/* Description - Unified Sans */}
                <p className="text-[13px] lg:text-sm text-black/60 font-medium leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


