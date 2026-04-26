"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";

interface AudienceSection {
  audienceType: "children" | "teens" | "adults";
  title?: string;
  shortDescription?: string;
  overview?: string;
  whoIsItFor?: string[];
  benefits?: string[];
  expectations?: string[];
  supportedItems?: string[];
  supportedItemsTitle?: string;
  supportedItemsIntro?: string;
  approachItems?: string[];
  whyChooseItems?: string[];
  additionalSections?: { title: string; items: string[]; color?: string }[];
}

interface AudienceTabsProps {
  sections: AudienceSection[];
  globalOverview?: string;
}

export function AudienceTabs({ sections, globalOverview }: AudienceTabsProps) {
  const [activeTab, setActiveTab] = useState(sections[0]?.audienceType || "children");

  const activeData = sections.find((s) => s.audienceType === activeTab);

  if (!activeData) return null;

  // Helper to render a dedicated list block
  const renderListBlock = (title: string, items?: string[], color: string = '#7A9A7D', intro?: string, icon?: React.ReactNode) => {
    if (!items || items.length === 0) return null;
    
    return (
      <div className="bg-white rounded-[2.5rem] p-6 lg:p-12 border border-black/[0.03] shadow-sm">
        <div className="flex flex-col mb-8 lg:mb-10">
          <h3 className="text-lg lg:text-xl font-serif text-green">
            {title}
          </h3>
          {intro && (
            <p className="mt-4 text-black/60 text-[14px] lg:text-[16px] font-medium leading-relaxed">
              {intro}
            </p>
          )}
        </div>
        
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
          {items.map((item, itemIdx) => {
            // Check for Group Header (starts with ##)
            if (item.startsWith('##')) {
              return (
                <li key={itemIdx} className="col-span-full mt-4 first:mt-0">
                  <h4 className="text-[13px] lg:text-[14px] font-bold uppercase tracking-[0.2em] text-[#7A9A7D] mb-2">
                    {item.replace('##', '').trim()}
                  </h4>
                  <div className="h-px w-12 bg-[#7A9A7D]/20 mb-4" />
                </li>
              );
            }

            const hasColon = item.includes(':');
            const colonIndex = item.indexOf(':');
            const [label, content] = colonIndex !== -1 
              ? [item.slice(0, colonIndex), item.slice(colonIndex + 1)] 
              : [null, item];
            
            return (
              <li key={itemIdx} className="flex items-start gap-5">
                {icon ? (
                  <div className="mt-0.5 flex-shrink-0">
                    {icon}
                  </div>
                ) : (
                  <div
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[10px]"
                    style={{ backgroundColor: color }}
                  />
                )}
                <span className="text-[14px] lg:text-[17px] text-black/70 font-medium leading-relaxed">
                  {hasColon ? (
                    <>
                      <strong className="text-black font-bold">{label}:</strong>
                      {content}
                    </>
                  ) : (
                    item
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Refined Inset Pill Switcher (Only visible if 2+ audiences exist) */}
      {sections.length > 1 && (
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-cream/50 border border-green/5 rounded-full relative w-full max-lg shadow-inner">
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
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-8 lg:space-y-12"
        >
          {/* Duo-Section: Primary Outcome (WIIFM) & Philosophy (Overview) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            {/* 1. Primary Outcome - High Contrast Hook (Left) */}
            <div className="lg:col-span-5 flex">
              <div className="bg-green p-6 lg:p-12 rounded-[2.5rem] text-white shadow-xl shadow-green/10 relative overflow-hidden group flex flex-col w-full">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none"> 
                  <Sparkles className="w-48 h-48 text-white" />
                </div>
                
                <div className="relative z-10 pt-1">
                  <div className="mb-6">
                    <p className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">Primary Outcome</p>
                  </div>
                  
                  <p className="text-2xl lg:text-3xl font-serif italic leading-[1.4] font-bold text-white">
                    {activeData.shortDescription}
                  </p>
                </div>
              </div>
            </div>

            {/* 2. Philosophy - Context & Methodology (Right) */}
            {(activeData.overview?.trim() || (globalOverview && globalOverview.trim())) && (
              <div className="lg:col-span-7 flex">
                <div className="bg-white rounded-[2.5rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 lg:p-12 flex flex-col w-full relative overflow-hidden">
                  <div className="relative z-10 pt-1">
                    <div className="mb-6">
                      <h3 className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.3em] text-green/60">Overview</h3>
                    </div>
                    
                    <p className="text-black/70 text-base lg:text-lg leading-relaxed font-medium italic whitespace-pre-wrap">
                      {activeData.overview?.trim() ? activeData.overview : globalOverview}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Unified Benefits Block */}
          {renderListBlock(
            "What Your Child Will Gain", 
            activeData.benefits, 
            undefined, 
            undefined,
            <div className="w-6 h-6 rounded-full bg-green/5 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-green" />
            </div>
          )}

          {/* Methodology Split: Expectations vs Is it right? */}
          <div className="grid grid-cols-1 gap-6 lg:gap-8">
            {activeData.expectations && activeData.expectations.length > 0 && (
              <div className="bg-white p-6 lg:p-12 rounded-[2.5rem] border border-black/[0.03] shadow-sm relative overflow-hidden">
                <h3 className="text-lg lg:text-xl font-serif text-green mb-8 lg:mb-10">
                  What to Expect
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 relative">
                  {/* Subtle Process Line - only on larger screens where it makes sense */}
                  <div className="hidden md:block absolute left-1/2 top-2 bottom-2 w-px bg-green/5" />
                  
                  {activeData.expectations.map((item, i) => (
                    <div key={i} className="flex gap-5 relative z-10">
                      <div className="w-2 h-2 rounded-full bg-green mt-2.5 shrink-0 ring-4 ring-green/5" />
                      <p className="text-[14px] lg:text-[17px] text-black/60 font-medium leading-relaxed">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeData.whoIsItFor && activeData.whoIsItFor.length > 0 && (
              <div className="bg-white p-6 lg:p-12 rounded-[2.5rem] border border-black/[0.03] shadow-sm">
                <h3 className="text-lg lg:text-xl font-serif text-green mb-8 lg:mb-10">
                  Is This the Right Space for Your Child?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                  {activeData.whoIsItFor.map((item, i) => (
                    <div key={i} className="flex items-start gap-5 group">
                      <div className="w-6 h-6 rounded-full bg-green/5 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-green group-hover:text-white transition-all">
                        <CheckCircle2 className="w-4 h-4 text-green group-hover:text-white" />
                      </div>
                      <span className="text-[14px] lg:text-[17px] text-black/70 font-medium leading-relaxed">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dedicated Blocks */}
          {renderListBlock(
            activeData.supportedItemsTitle || "Individuals We Support", 
            activeData.supportedItems,
            undefined,
            activeData.supportedItemsIntro
          )}
          {renderListBlock("Our Approach", activeData.approachItems)}
          {renderListBlock("Why Families Choose Us", activeData.whyChooseItems)}

          {/* Legacy/Custom Additional Blocks (if any) */}
          {activeData.additionalSections?.map((section, idx) => (
            <div
              key={idx}
              className="bg-white rounded-[2.5rem] p-6 lg:p-12 border border-black/[0.03] shadow-sm"
            >
              <h3 className="text-lg lg:text-2xl font-serif text-green mb-8 lg:mb-10">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.items.map((item, itemIdx) => {
                  const hasColon = item.includes(':');
                  const colonIndex = item.indexOf(':');
            const [label, content] = colonIndex !== -1 
              ? [item.slice(0, colonIndex), item.slice(colonIndex + 1)] 
              : [null, item];
                  
                  return (
                    <li key={itemIdx} className="flex items-start gap-4">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[10px]"
                        style={{ backgroundColor: section.color || '#7A9A7D' }}
                      />
                      <span className="text-[13px] lg:text-base text-black/70 font-medium leading-relaxed">
                        {hasColon ? (
                          <>
                            <strong className="text-black font-bold">{label}:</strong>
                            {content}
                          </>
                        ) : (
                          item
                        )}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
