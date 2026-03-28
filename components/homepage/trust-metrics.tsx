"use client";

import { Star, Users, Award, Heart } from "lucide-react";

const metrics = [
  {
    icon: Users,
    value: "100+",
    label: "Families Served",
  },
  {
    icon: Award,
    value: "6+",
    label: "Expert Therapists",
  },
  {
    icon: Star,
    value: "4.9",
    label: "Parent Rating",
    showStars: true,
  },
  {
    icon: Heart,
    value: "Holistic",
    label: "Family Approach",
  },
];

export function TrustMetrics() {
  return (
    <section className="py-6 bg-[#FDFBF7]">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-16">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="flex items-center gap-4 group"
            >
              {/* Light warm beige icon container (matching reference) */}
              <div className="w-12 h-12 rounded-full bg-[#F5EBE0] flex items-center justify-center transition-all duration-300 group-hover:bg-[#EDE5D8] group-hover:scale-105">
                <metric.icon className="w-5 h-5 text-[#8B7355]" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-black group-hover:text-[#004540] transition-colors">
                    {metric.value}
                  </span>
                  {metric.showStars && (
                    <div className="flex -space-x-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#8B7355] text-[#8B7355]" />
                      ))}
                    </div>
                  )}
                </div>
                <span className="text-[10px] font-bold text-black/50 uppercase tracking-widest">
                  {metric.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
