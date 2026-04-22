"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

interface AudienceSection {
  audienceType: "children" | "teens" | "adults";
  title?: string;
  overview?: string;
  whoIsItFor?: string[];
  benefits?: string[];
  expectations?: string[];
}

interface AudienceTabsProps {
  sections: AudienceSection[];
}

export function AudienceTabs({ sections }: AudienceTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  if (!sections.length) return null;

  return (
    <div className="mb-12">
      {/* Tab Switcher */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {sections.map((section, idx) => {
          const isActive = activeTab === idx;
          const label = section.title || section.audienceType.charAt(0).toUpperCase() + section.audienceType.slice(1);
          
          return (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`
                relative px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-widest transition-all
                ${isActive ? "text-white" : "text-green/60 hover:text-green bg-white border border-green/10"}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-green rounded-full"
                  transition={{ type: "spring", duration: 0.5 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-2xl p-6 lg:p-10 border border-green/10 shadow-sm"
        >
          {/* Section Heading */}
          <div className="flex items-center gap-3 mb-8">
            <div className="px-3 py-1 rounded-full bg-green/10 text-green text-[10px] font-bold uppercase tracking-widest">
              {sections[activeTab].audienceType}
            </div>
            <h2
              className="text-2xl lg:text-3xl font-serif text-green"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              {sections[activeTab].title || `For ${sections[activeTab].audienceType.charAt(0).toUpperCase() + sections[activeTab].audienceType.slice(1)}`}
            </h2>
          </div>

          {/* Specific Overview */}
          {sections[activeTab].overview && (
            <div className="mb-8">
              <p className="text-black/70 font-medium leading-relaxed italic">
                {sections[activeTab].overview}
              </p>
            </div>
          )}

          {/* Who Is It For / Checklist */}
          {sections[activeTab].whoIsItFor && sections[activeTab].whoIsItFor!.length > 0 && (
            <div className="mb-10 p-6 lg:p-8 bg-green/5 rounded-xl border border-green/10">
              <h3 className="font-serif text-xl text-green mb-6">Is This Right for You or Your Loved Ones?</h3>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-12">
                {sections[activeTab].whoIsItFor!.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm lg:text-base text-black/70 font-medium leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Grid for Benefits and Expectations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
            {/* Benefits */}
            {sections[activeTab].benefits && sections[activeTab].benefits!.length > 0 && (
              <div>
                <h3 className="font-serif text-xl text-green mb-6 border-b border-green/10 pb-2">What You&apos;ll Gain</h3>
                <ul className="space-y-4">
                  {sections[activeTab].benefits!.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-1">
                        <svg className="w-4 h-4 text-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-sm lg:text-base text-black/70 font-medium leading-relaxed">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* Expectations */}
            {sections[activeTab].expectations && sections[activeTab].expectations!.length > 0 && (
              <div>
                <h3 className="font-serif text-xl text-green mb-6 border-b border-green/10 pb-2">What to Expect</h3>
                <ul className="space-y-4">
                  {sections[activeTab].expectations!.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D] flex-shrink-0 mt-2.5" />
                      <span className="text-sm lg:text-base text-black/70 font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
