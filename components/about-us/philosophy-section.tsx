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
    title: "Child-First Approach",
    description: "We focus on each child's unique strengths, not just their challenges. Every plan is personalized."
  },
  {
    icon: "Users",
    title: "Family Involvement",
    description: "Parents are partners in therapy. We equip you with strategies that work at home too."
  },
  {
    icon: "Shield",
    title: "Safe & Nurturing",
    description: "A warm, sensory-friendly environment where children feel comfortable and supported."
  },
  {
    icon: "Sparkles",
    title: "Holistic Development",
    description: "We address communication, motor skills, behavior, academics, and social skills together."
  },
  {
    icon: "Clock",
    title: "Early Intervention Focus",
    description: "The earlier we start, the better the outcomes. We work with children as young as 18 months."
  }
];

export function PhilosophySection({ data }: { data?: AboutUsPhilosophyData }) {
  const title = data?.title || "Why Families Choose Us";
  const description = data?.description || "What sets Divit MindSpace apart from other centers";
  const points = data?.points || defaultReasons;

  return (
    <section className="py-12 lg:py-16 bg-cream">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl lg:text-4xl font-serif text-green mb-3"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            {title}
          </h2>
          <p className="text-green/60 max-w-xl mx-auto">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {points.map((reason, idx) => {
            const IconComponent = iconMap[reason.icon] || Sparkles;
            return (
              <motion.div
                key={idx}
                className="bg-white rounded-xl p-6 border border-green/5 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-10 h-10 rounded-lg bg-purple/10 flex items-center justify-center mb-4">
                  <IconComponent className="w-5 h-5 text-purple" />
                </div>
                <h3 className="font-bold text-green mb-2">{reason.title}</h3>
                <p className="text-sm text-green/70">{reason.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
