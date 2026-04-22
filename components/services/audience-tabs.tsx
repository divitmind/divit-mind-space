"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2 } from "lucide-react";

interface AudienceSection {
  audienceType: "children" | "teens" | "adults";
  title?: string;
  shortDescription?: string;
  overview?: string;
  whoIsItFor?: string[];
  benefits?: string[];
  expectations?: string[];
}

interface AudienceTabsProps {
  sections: AudienceSection[];
}

export function AudienceTabs({ sections }: AudienceTabsProps) {
  const [activeTab, setActiveTab] = useState(sections[0]?.audienceType || "children");

  const activeData = sections.find((s) => s.audienceType === activeTab);

  if (!activeData) return null;

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Refined Inset Pill Switcher (Best-in-Class UX) */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-cream/50 border border-green/5 rounded-full relative w-full max-w-lg shadow-inner">
          {sections.map((section) => {
            const isActive = activeTab === section.audienceType;
            return (
              <button
                key={section.audienceType}
                onClick={() => setActiveTab(section.audienceType)}
                className={`
                  relative flex-1 py-2.5 lg:py-3 rounded-full text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 z-10
                  ${isActive ? "text-green" : "text-green/40 hover:text-green/60"}
                `}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-white rounded-full shadow-md border border-green/5 -z-10"
                    transition={{ type: "spring", bounce: 0.15, duration: 0.6 }}
                  />
                )}
                {section.audienceType}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-6 lg:space-y-8"
        >
          {/* Clinical Overview Block */}
          <div className="bg-white rounded-[2rem] p-6 lg:p-10 border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
              <div className="flex-1">
                <p className="text-black/70 text-base lg:text-xl leading-relaxed font-medium italic whitespace-pre-wrap">
                  {activeData.overview}
                </p>
              </div>
              
              {activeData.shortDescription && (
                <div className="w-full lg:w-80 shrink-0">
                  <div className="bg-white p-6 lg:p-8 rounded-[2rem] border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.04)] relative overflow-hidden group">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green"></span>
                      </span>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-green/60">Primary Outcome</p>
                    </div>
                    <p className="text-xl lg:text-2xl font-serif italic leading-tight font-bold text-green">
                      {activeData.shortDescription}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* High-Density Benefits Grid */}
          {activeData.benefits && activeData.benefits.length > 0 && (
            <div className="space-y-6">
              <h3 className="text-lg lg:text-xl font-serif text-green flex items-center gap-3">
                <div className="w-1 h-5 bg-green/20 rounded-full" />
                What You&apos;ll Gain
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {activeData.benefits.map((benefit, i) => (
                  <div 
                    key={i} 
                    className="p-6 lg:p-8 rounded-[1.5rem] bg-white border border-black/[0.03] shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-5 h-5 rounded-full bg-green/5 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3 h-3 text-green" />
                      </div>
                      <p className="text-sm lg:text-base text-black/70 font-medium leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Methodology Split: Expectations vs Is it right? */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            {activeData.expectations && activeData.expectations.length > 0 && (
              <div className="bg-white p-6 lg:p-10 rounded-[2rem] border border-black/[0.03] shadow-sm relative overflow-hidden">
                <h3 className="text-lg lg:text-xl font-serif text-green mb-8 flex items-center gap-3">
                  <div className="w-1 h-5 bg-green/20 rounded-full" />
                  What to Expect
                </h3>
                <div className="space-y-6 relative">
                  {/* Subtle Process Line */}
                  <div className="absolute left-[3px] top-2 bottom-2 w-px bg-green/10" />
                  
                  {activeData.expectations.map((item, i) => (
                    <div key={i} className="flex gap-4 relative z-10">
                      <div className="w-1.5 h-1.5 rounded-full bg-green mt-2.5 shrink-0 ring-4 ring-white" />
                      <p className="text-sm lg:text-base text-black/60 font-medium leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeData.whoIsItFor && activeData.whoIsItFor.length > 0 && (
              <div className="bg-white p-6 lg:p-10 rounded-[2rem] border border-black/[0.03] shadow-sm">
                <h3 className="text-lg lg:text-xl font-serif text-green mb-8 flex items-center gap-3">
                  <div className="w-1 h-5 bg-green/20 rounded-full" />
                  Is This Right for You?
                </h3>
                <div className="space-y-4">
                  {activeData.whoIsItFor.map((item, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <div className="w-5 h-5 rounded-full bg-green/5 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-green group-hover:text-white transition-all">
                        <CheckCircle2 className="w-3 h-3 text-green" />
                      </div>
                      <span className="text-sm lg:text-base text-black/70 font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
