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
          className="text-center mb-8 lg:mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >


          <h2
            className="text-4xl lg:text-5xl font-serif text-black mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            {title}
          </h2>
          <p className="text-black/70 text-lg font-medium max-w-2xl mx-auto">
            {description}
          </p>
        </motion.div>


        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {points.map((reason, idx) => {
            const IconComponent = iconMap[reason.icon] || Sparkles;
            return (
              <motion.div
                key={idx}
                className="bg-[#FAF9F5] rounded-[2rem] p-10 border border-black/5 shadow-xl shadow-black/[0.01] hover:shadow-2xl hover:shadow-black/5 transition-all hover:-translate-y-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-14 h-14 rounded-2xl bg-[#7A9A7D]/10 flex items-center justify-center mb-8">
                  <IconComponent className="w-7 h-7 text-[#7A9A7D]" />
                </div>
                <h3 className="text-2xl font-bold text-black mb-4">{reason.title}</h3>
                <p className="text-base text-black/60 font-medium leading-relaxed">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


