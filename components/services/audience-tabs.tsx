"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";

interface ContentBlock {
  _type: string;
  _key: string;
  // Duo-Grid fields
  leftColumn?: { title: string; kicker?: string; items: string[]; style: 'tick' | 'number' };
  rightColumn?: { title: string; kicker?: string; items: string[]; style: 'tick' | 'number' };
  // Index fields
  title?: string;
  intro?: string;
  groups?: { heading: string; items: string[] }[];
  // Full width list fields
  items?: string[];
  backgroundColor?: 'white' | 'sage';
}

interface AudienceSection {
  audienceType: "children" | "teens" | "adults";
  title: string;
  hero?: {
    shortDescription?: string;
    overview?: string;
  };
  contentBlocks?: ContentBlock[];
  // Legacy Fallbacks
  shortDescription?: string;
  overview?: string;
  benefits?: string[];
  expectations?: string[];
  expectationsIntro?: string;
  whoIsItFor?: string[];
  whoIsItForIntro?: string;
  supportedItems?: (string | { heading?: string; items: string[] })[];
  supportedItemsTitle?: string;
  supportedItemsIntro?: string;
  approachItems?: string[];
  whyChooseItems?: string[];
  additionalSections?: { title: string; intro?: string; items: string[]; color?: string }[];
}

interface AudienceTabsProps {
  sections: AudienceSection[];
  globalOverview?: string;
}

export function AudienceTabs({ sections, globalOverview }: AudienceTabsProps) {
  const [activeTab, setActiveTab] = useState(sections[0]?.audienceType || "children");
  const activeData = sections.find((s) => s.audienceType === activeTab);

  if (!activeData) return null;

  // Helper: Smart Bold Parsing (Before Colon or Em-Dash)
  const renderItemText = (text: string) => {
    // Look for first occurrence of ":" or "—"
    const colonIndex = text.indexOf(':');
    const dashIndex = text.indexOf('—');
    
    // Find which one comes first (and is not -1)
    let separatorIndex = -1;
    if (colonIndex !== -1 && dashIndex !== -1) {
      separatorIndex = Math.min(colonIndex, dashIndex);
    } else if (colonIndex !== -1) {
      separatorIndex = colonIndex;
    } else if (dashIndex !== -1) {
      separatorIndex = dashIndex;
    }

    if (separatorIndex === -1) return text;

    return (
      <>
        <strong className="text-black font-bold">{text.slice(0, separatorIndex + 1)}</strong>
        {text.slice(separatorIndex + 1)}
      </>
    );
  };

  // Generic List Renderer
  const renderList = (title?: string, items?: string[], kicker?: string, style: 'tick' | 'number' = 'tick', isCompact = false) => {
    if (!items || items.length === 0) return null;

    return (
      <div className={`rounded-[2.5rem] flex flex-col h-full ${
        isCompact 
          ? 'bg-[#7A9A7D]/5 border border-[#7A9A7D]/10 px-5 py-8 lg:px-10 lg:py-12' 
          : 'bg-white border border-black/[0.03] shadow-sm p-6 lg:p-12'
      }`}>
        <div className={`flex flex-col ${isCompact ? '-mt-6 lg:-mt-10 mb-4 lg:mb-6' : 'mb-8 lg:mb-10'}`}>
          <h3 className="text-lg lg:text-xl font-serif text-green flex items-baseline flex-wrap gap-x-3">
            <span>{title}</span>
            {kicker && isCompact && (
              <span className="text-black/40 text-[11px] lg:text-[13px] font-sans font-medium italic">
                — {kicker}
              </span>
            )}
          </h3>
          {kicker && !isCompact && (
            <p className="mt-4 text-black/60 text-[14px] lg:text-[16px] font-medium leading-relaxed">
              {kicker}
            </p>
          )}
        </div>

        <ul className="flex flex-col gap-y-3 flex-1">
          {items.map((item, i) => (
            <li key={i} className={`flex items-start h-fit ${isCompact ? 'bg-white/50 backdrop-blur-sm pl-3 pr-4 py-4 lg:pl-3 lg:pr-4 lg:py-4 rounded-2xl border border-green/5 gap-2.5' : 'gap-5'}`}>
              {style === 'tick' ? (
                <CheckCircle2 className="w-5 h-5 text-green shrink-0 mt-0.5" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-green/10 flex items-center justify-center shrink-0 mt-0.5 text-green font-serif italic text-xs">
                  {i + 1}
                </div>
              )}
              <span className="text-[14px] lg:text-[16px] text-black/70 font-medium leading-relaxed">
                {renderItemText(item)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Tab Switcher */}
      {sections.length > 1 && (
        <div className="flex justify-center">
          <div className="inline-flex p-1.5 bg-cream/50 border border-green/5 rounded-full relative w-full max-lg shadow-inner">
            {sections.map((section) => {
              const isActive = activeTab === section.audienceType;
              return (
                <button
                  key={section.audienceType}
                  onClick={() => setActiveTab(section.audienceType)}
                  className={`relative flex-1 py-2.5 lg:py-3 rounded-full text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 z-10 ${isActive ? "text-green" : "text-green/40 hover:text-green/60"}`}
                >
                  {isActive && (
                    <motion.div layoutId="activePill" className="absolute inset-0 bg-white rounded-full shadow-md border border-green/5 -z-10" transition={{ type: "spring", bounce: 0.15, duration: 0.6 }} />
                  )}
                  {section.title}
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
          className="space-y-2 lg:space-y-4"
        >
          {/* Hero Section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="lg:col-span-5 flex">
              <div className="bg-green p-6 lg:p-12 rounded-[2.5rem] text-white shadow-xl shadow-green/10 relative overflow-hidden group flex flex-col w-full">
                <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none"> 
                  <Sparkles className="w-48 h-48 text-white" />
                </div>
                <div className="relative z-10">
                  <div className="-mt-4 lg:-mt-6 mb-6">
                    <p className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.3em] text-white/70">Primary Outcome</p>
                  </div>
                  <p className="text-2xl lg:text-3xl font-serif italic leading-[1.4] font-bold text-white">
                    {activeData.hero?.shortDescription}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex">
              <div className="bg-white rounded-[2.5rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 lg:p-12 flex flex-col w-full relative overflow-hidden">
                <div className="relative z-10">
                  <div className="-mt-4 lg:-mt-6 mb-6">
                    <h3 className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.3em] text-green/60">Overview</h3>
                  </div>
                  <p className="text-black/70 text-base lg:text-lg leading-relaxed font-medium italic whitespace-pre-wrap">
                    {activeData.hero?.overview || globalOverview}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Blocks */}
          {activeData.contentBlocks?.map((block) => {
            switch (block._type) {
              case 'duoGridBlock':
                return (
                  <div key={block._key} className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
                    {renderList(block.leftColumn?.title, block.leftColumn?.items, block.leftColumn?.kicker, block.leftColumn?.style, true)}
                    {renderList(block.rightColumn?.title, block.rightColumn?.items, block.rightColumn?.kicker, block.rightColumn?.style, true)}
                  </div>
                );

              case 'clinicalIndexBlock':
                return (
                  <div key={block._key} className={`rounded-[2.5rem] border border-black/[0.03] shadow-sm p-6 lg:p-12 ${block.backgroundColor === 'sage' ? 'bg-[#7A9A7D]/5' : 'bg-white'}`}>
                    <div className="-mt-6 lg:-mt-10 mb-6 lg:mb-8">
                      <p className="text-[14px] lg:text-[16px] text-black/70 font-medium leading-relaxed">
                        <strong className="text-black font-bold">{block.title} — </strong>
                        {block.intro}
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-10">
                      {block.groups?.map((group, idx) => (
                        <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                          <div className="lg:col-span-3 lg:sticky lg:top-12 h-fit pt-5">
                            <div className="flex items-start gap-4">
                              <div className="w-px h-12 bg-green/20 shrink-0" />
                              <h4 className="text-[12px] lg:text-[13px] font-bold uppercase tracking-[0.2em] text-green/80 leading-relaxed">{group.heading}</h4>
                            </div>
                          </div>
                          <div className="lg:col-span-9">
                            <ul className="grid grid-cols-1 bg-white/40 rounded-3xl border border-green/5 overflow-hidden shadow-sm">
                              {group.items.map((item, i) => (
                                <li key={i} className={`flex items-start gap-4 px-5 py-5 lg:px-8 lg:py-6 hover:bg-white/60 group/item transition-all duration-300 ${i !== group.items.length - 1 ? 'border-b border-green/[0.03]' : ''}`}>
                                  <CheckCircle2 className="w-5 h-5 text-green shrink-0 mt-0.5" />
                                  <span className="text-[14px] lg:text-[16px] text-black/70 font-medium leading-relaxed group-hover/item:text-black">{renderItemText(item)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );

              case 'fullWidthListBlock':
                return (
                  <div key={block._key} className={`rounded-[2.5rem] border border-black/[0.03] p-6 lg:p-12 ${block.backgroundColor === 'sage' ? 'bg-[#7A9A7D]/5' : 'bg-white'}`}>
                    <h3 className="text-lg lg:text-xl font-serif text-green mb-8">{block.title}</h3>
                    {block.intro && <p className="mb-8 text-black/60 text-sm lg:text-base font-medium leading-relaxed">{block.intro}</p>}
                    <div className="flex flex-col gap-y-4">
                      {block.items?.map((item, i) => (
                        <div key={i} className="flex items-start gap-5 group">
                          <div className="w-6 h-6 rounded-full bg-green/5 flex items-center justify-center shrink-0 mt-0.5">
                            <CheckCircle2 className="w-4 h-4 text-green" />
                          </div>
                          <span className="text-[14px] lg:text-[17px] text-black/70 font-medium leading-relaxed">{renderItemText(item)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              default:
                return null;
            }
          })}

          {/* Legacy Fallbacks (Visible only if no Modular Blocks exist) */}
          {!activeData.contentBlocks && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
                {renderList("What Your Child Will Gain", activeData.benefits, undefined, 'tick', true)}
                {renderList("What to Expect", activeData.expectations, activeData.expectationsIntro, 'tick', true)}
              </div>

              {activeData.whoIsItFor && activeData.whoIsItFor.length > 0 && (
                <div className="bg-white p-6 lg:p-12 rounded-[2.5rem] border border-black/[0.03] shadow-sm">
                  <h3 className="text-lg lg:text-xl font-serif text-green mb-8">Is This the Right Space?</h3>
                  {activeData.whoIsItForIntro && <p className="mb-8 text-black/60 text-sm lg:text-base font-medium">{activeData.whoIsItForIntro}</p>}
                  <div className="flex flex-col gap-y-4">
                    {activeData.whoIsItFor.map((item, i) => (
                      <div key={i} className="flex items-start gap-5 group">
                        <div className="w-6 h-6 rounded-full bg-green/5 flex items-center justify-center shrink-0 mt-0.5">
                          <CheckCircle2 className="w-4 h-4 text-green" />
                        </div>
                        <span className="text-[14px] lg:text-[17px] text-black/70 font-medium leading-relaxed">{renderItemText(item)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeData.supportedItems && activeData.supportedItems.length > 0 && (
                <div className="bg-white rounded-[2.5rem] border border-black/[0.03] shadow-sm p-6 lg:p-12">
                  <div className="-mt-6 lg:-mt-10 mb-6 lg:mb-8">
                    <p className="text-[14px] lg:text-[16px] text-black/70 font-medium leading-relaxed max-w-3xl">
                      <strong className="text-black font-bold">{activeData.supportedItemsTitle || "Clinical Index"} — </strong>
                      {activeData.supportedItemsIntro}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-10">
                    {(() => {
                      const groups: { heading: string; items: string[] }[] = [];
                      activeData.supportedItems.forEach((item) => {
                        const text = typeof item === 'string' ? item : item.items.join(', ');
                        if (text.startsWith('## ')) {
                          groups.push({ heading: text.replace('## ', ''), items: [] });
                        } else {
                          if (groups.length === 0) groups.push({ heading: 'Details', items: [] });
                          groups[groups.length - 1].items.push(text);
                        }
                      });

                      return groups.map((group, idx) => (
                        <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                          <div className="lg:col-span-3 lg:sticky lg:top-12 h-fit pt-5">
                            <div className="flex items-start gap-4">
                              <div className="w-px h-12 bg-green/20 shrink-0" />
                              <h4 className="text-[12px] lg:text-[13px] font-bold uppercase tracking-[0.2em] text-green/80 leading-relaxed">{group.heading}</h4>
                            </div>
                          </div>
                          <div className="lg:col-span-9">
                            <ul className="grid grid-cols-1 bg-white/40 rounded-3xl border border-green/5 overflow-hidden shadow-sm">
                              {group.items.map((item, i) => (
                                <li key={i} className={`flex items-start gap-4 px-5 py-5 lg:px-8 lg:py-6 hover:bg-white/60 group/item transition-all duration-300 ${i !== group.items.length - 1 ? 'border-b border-green/[0.03]' : ''}`}>
                                  <CheckCircle2 className="w-5 h-5 text-green shrink-0 mt-0.5" />
                                  <span className="text-[14px] lg:text-[16px] text-black/70 font-medium leading-relaxed group-hover/item:text-black">{renderItemText(item)}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {renderList("Our Approach", activeData.approachItems, undefined, 'tick', true)}
                {renderList("Why Families Choose Us", activeData.whyChooseItems, undefined, 'tick', true)}
              </div>
            </>
          )}

          {/* Additional Sections (Common to both Modular & Legacy) */}
          {activeData.additionalSections?.map((section, idx) => (
            <div key={idx} className={`rounded-[2.5rem] border border-black/[0.03] p-6 lg:p-12 ${section.color === 'sage' ? 'bg-[#7A9A7D]/5' : 'bg-white shadow-sm'}`}>
              <h3 className="text-lg lg:text-xl font-serif text-green mb-8">{section.title}</h3>
              {section.intro && <p className="mb-8 text-black/60 text-sm lg:text-base font-medium leading-relaxed">{section.intro}</p>}
              <div className="flex flex-col gap-y-4">
                {section.items?.map((item, i) => (
                  <div key={i} className="flex items-start gap-5 group">
                    <div className="w-6 h-6 rounded-full bg-green/5 flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-4 h-4 text-green" />
                    </div>
                    <span className="text-[14px] lg:text-[17px] text-black/70 font-medium leading-relaxed">{renderItemText(item)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

