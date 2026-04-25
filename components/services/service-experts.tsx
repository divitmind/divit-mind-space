"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { User } from "lucide-react";
import { SpecialistCard } from "@/components/ui/specialist-card";
import { Specialist } from "@/sanity/types";

interface ServiceExpertsProps {
  specialists: Specialist[];
  onDemand?: boolean;
}

export function ServiceExperts({ specialists, onDemand }: ServiceExpertsProps) {
  const showLeadership = onDemand || specialists.length === 0;

  return (
    <section className="bg-white -mt-8 lg:-mt-12">
      <div className="container mx-auto px-4 pt-0 pb-6 lg:pb-8">
        <div className="max-w-4xl mx-auto">
          <h2
            className="text-2xl lg:text-3xl font-serif text-green mb-1.5"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            {showLeadership ? "Professional Specialist Oversight" : "Meet the Specialists"}
          </h2>

          {showLeadership ? (
            <div className="bg-[#FAF9F5] rounded-xl px-5 pb-5 pt-3 lg:px-6 lg:pb-6 lg:pt-4 border border-green/10 relative overflow-hidden group">
              {/* Subtle background accent */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-green/5 rounded-bl-full -mr-16 -mt-16 blur-2xl pointer-events-none" />

              <div className="flex flex-col md:flex-row gap-5 lg:gap-8 items-start md:items-center relative z-10">
                <div className="w-14 h-14 rounded-full bg-white border border-green/10 shadow-sm flex items-center justify-center flex-shrink-0 transition-transform duration-500 group-hover:scale-110">
                  <User className="w-7 h-7 text-green/40" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg lg:text-xl font-serif text-green mb-1">Expert-Led Service Continuity</h3>
                  <p className="text-sm lg:text-base text-black/60 leading-relaxed font-medium max-w-2xl">
                    This service is overseen by our Senior Clinical Specialists and delivered by qualified consultants on-demand to ensure the highest standards of care and clinical excellence.
                  </p>
                  <Link
                    href="/about-us#specialists"
                    className="inline-flex items-center gap-1.5 mt-3 text-[10px] font-bold uppercase tracking-[0.15em] text-green hover:text-green/70 transition-colors"
                  >
                    View our full team of specialists
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {specialists.map((specialist, index) => (
                <motion.div
                  key={specialist._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <SpecialistCard specialist={specialist} variant="compact" />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
