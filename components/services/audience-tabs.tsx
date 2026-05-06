"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

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
  audienceType: "children" | "teens" | "adults" | "geriatrics";
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
  isMultiAudience?: boolean;
  universalBenefits?: string[];
  universalExpectations?: string[];
  globalApproachItems?: string[];
  globalWhyChooseItems?: string[];
  globalAdditionalSections?: { title: string; intro?: string; items: string[]; color?: string }[];
}

export function AudienceTabs({ 
  sections, 
  globalOverview, 
  isMultiAudience,
  universalBenefits,
  universalExpectations,
  globalApproachItems,
  globalWhyChooseItems,
  globalAdditionalSections
}: AudienceTabsProps) {
  const [activeTab, setActiveTab] = useState(sections[0]?.audienceType || "children");
  const activeData = sections.find((s) => s.audienceType === activeTab);

  if (!activeData) return null;

  // Extract "Is This the Right Support for You?" block to show in header
  const rightSupportBlock = activeData.contentBlocks?.find(b => b.title?.toLowerCase().includes("right support"));
  const remainingBlocks = activeData.contentBlocks?.filter(b => b !== rightSupportBlock);

  // Helper: render text with markdown-style bold (**text**)
  const renderTextWithBold = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold">{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  // Helper: Smart Bold Parsing (Before Colon or Em-Dash) + Markdown Bold
  const renderItemText = (text: string) => {
    if (!text) return null;

    // First, strip markdown header artifacts if they exist
    const cleanText = text.replace(/^#+\s*/, '');
    
    // Check for markdown bold since it's explicit
    if (cleanText.includes('**')) {
      return renderTextWithBold(cleanText);
    }

    const colonIndex = cleanText.indexOf(':');
    const dashIndex = cleanText.indexOf('—');
    
    let separatorIndex = -1;
    if (colonIndex !== -1 && dashIndex !== -1) {
      separatorIndex = Math.min(colonIndex, dashIndex);
    } else if (colonIndex !== -1) {
      separatorIndex = colonIndex;
    } else if (dashIndex !== -1) {
      separatorIndex = dashIndex;
    }

    if (separatorIndex === -1) return cleanText;

    return (
      <>
        <strong className="text-black font-bold">{cleanText.slice(0, separatorIndex + 1)}</strong>
        {cleanText.slice(separatorIndex + 1)}
      </>
    );
  };

  /**
   * Renders a clean list without any surrounding boxes, backgrounds, or borders.
   * Used for "Our Approach", "Why Families Choose Us", and "Is This Right for You?".
   */
  const renderCleanList = (title: string, items?: string[], isGrid = false, intro?: string) => {
    if (!items || items.length === 0) return null;

    return (
      <div className="flex flex-col w-full pt-0 pb-4 lg:pb-6">
        <div className="mb-6 lg:mb-8 border-l-2 border-green/20 pl-4">
          <h3 className="text-xl lg:text-2xl font-serif text-green italic">
            {title}
          </h3>
        </div>

        {intro && (
          <p className="mb-6 text-[15px] lg:text-[16px] text-black/60 font-medium leading-relaxed italic">
            {renderTextWithBold(intro)}
          </p>
        )}

        <ul className={cn(
          isGrid ? "grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-4" : "flex flex-col gap-y-4"
        )}>
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 py-1">
              <CheckCircle2 className="w-5 h-5 text-green shrink-0 mt-0.5 opacity-80" />
              <span className="text-[15px] lg:text-[16px] text-black/70 font-medium leading-relaxed">
                {renderItemText(item)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  /**
   * Renders a boxed list with a background and border.
   * Used for "What Your Child Will Gain" and "What to Expect".
   */
  const renderBoxedList = (title?: string, items?: string[], kicker?: string, style: 'tick' | 'number' = 'tick') => {
    if (!items || items.length === 0) return null;

    return (
      <div className="rounded-[2.5rem] flex flex-col h-full bg-[#7A9A7D]/5 border border-[#7A9A7D]/10 px-5 py-8 lg:px-10 lg:py-12">
        <div className="-mt-6 lg:-mt-10 mb-4 lg:mb-6 flex flex-col">
          <h3 className="text-lg lg:text-xl font-serif text-green flex items-baseline flex-wrap gap-x-3">
            <span>{title}</span>
            {kicker && (
              <span className="text-black/40 text-[11px] lg:text-[13px] font-sans font-medium italic">
                — {kicker}
              </span>
            )}
          </h3>
        </div>

        <ul className="flex flex-col gap-y-3 flex-1">
          {items.map((item, i) => (
            <li key={i} className="flex items-start bg-white/50 backdrop-blur-sm pl-3 pr-4 py-4 lg:pl-3 lg:pr-4 lg:py-4 rounded-2xl border border-green/5 gap-2.5 h-fit">
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
      {/* Tab Switcher & Audience-Specific Focus */}
      {sections.length > 1 && (
        <div className="space-y-6 lg:space-y-8">
          <div className="flex justify-center">
            <div className="inline-flex p-1.5 bg-cream/50 border border-green/5 rounded-full relative w-full max-w-md shadow-inner">
              {sections.map((section) => {
                const isActive = activeTab === section.audienceType;
                // Normalize Label: Only show Children, Teens, Adults, unless custom label provided
                let displayTitle = section.title;
                if (displayTitle.toLowerCase().includes("children") && (displayTitle.toLowerCase().includes("teen") || displayTitle.toLowerCase().includes("adolescent"))) displayTitle = "Children & Teens";
                else if (displayTitle.toLowerCase().includes("children")) displayTitle = "Children";
                else if (displayTitle.toLowerCase().includes("teen") || displayTitle.toLowerCase().includes("adolescent")) displayTitle = "Adolescents";
                else if (displayTitle.toLowerCase().includes("adult")) displayTitle = "Adults";
                else if (displayTitle.toLowerCase().includes("geriatric") || displayTitle.toLowerCase().includes("late-life")) displayTitle = "Geriatrics";

                return (
                  <button
                    key={section.audienceType}
                    onClick={() => setActiveTab(section.audienceType)}
                    className={`relative flex-1 py-2.5 lg:py-3 rounded-full text-[11px] lg:text-[11px] font-bold uppercase tracking-[0.22em] transition-all duration-300 z-10 ${isActive ? "text-green" : "text-green/40 hover:text-green/60"}`}
                  >
                    {isActive && (
                      <motion.div layoutId="activePill" className="absolute inset-0 bg-white rounded-full shadow-md border border-green/5 -z-10" transition={{ type: "spring", bounce: 0.15, duration: 0.6 }} />
                    )}
                    {displayTitle}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Audience-Specific Primary Outcome Description */}
          <motion.div 
            key={`${activeTab}-desc`}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-start gap-4 lg:gap-6 bg-white/40 backdrop-blur-sm p-5 lg:p-7 rounded-[2rem] border border-green/5 max-w-4xl"
          >
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-green/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 lg:w-6 lg:h-6 text-green" />
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-green/60">Support Focus</span>
              <p className="text-base lg:text-lg text-black/80 font-serif italic font-medium leading-relaxed">
                {renderTextWithBold(activeData.hero?.shortDescription || activeData.shortDescription || "")}
              </p>
            </div>
          </motion.div>

          {/* Audience-Specific "Is This the Right Support for You?" - Placed in Header */}
          {rightSupportBlock && (
            <motion.div
              key={`${activeTab}-right-support`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="pt-2"
            >
              {renderCleanList(
                rightSupportBlock.title || "Is This the Right Support for You?", 
                rightSupportBlock.items, 
                true,
                rightSupportBlock.intro
              )}
            </motion.div>
          )}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="space-y-4 lg:space-y-6"
        >
          {/* Hero Section - Shown only for single-audience services (Multi-audience has global overview) */}
          {!isMultiAudience && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
              <div className="lg:col-span-4 flex">
                <div className="bg-green p-6 lg:p-12 rounded-[2.5rem] text-white shadow-xl shadow-green/10 relative overflow-hidden group flex flex-col w-full">
                  <div className="absolute -right-4 -bottom-4 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none"> 
                    <Sparkles className="w-48 h-48 text-white" />
                  </div>
                  <div className="relative z-10 flex flex-col">
                    <div className="lg:-mt-6 mb-6">
                      <p className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-white/70">Primary Outcome</p>
                    </div>
                    <p className="text-2xl lg:text-3xl font-serif italic leading-[1.4] font-bold text-white max-w-2xl">
                      {activeData.hero?.shortDescription || activeData.shortDescription}
                    </p>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-8 bg-white rounded-[2.5rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)] p-6 lg:p-12 flex flex-col w-full relative overflow-hidden">
                <div className="relative z-10 flex flex-col">
                  <div className="lg:-mt-6 mb-6">
                    <h3 className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.3em] text-green/60">Overview</h3>
                  </div>
                  <p className="text-black/70 text-base lg:text-lg leading-relaxed font-medium italic whitespace-pre-wrap">
                    {renderTextWithBold(activeData.hero?.overview || activeData.overview || globalOverview || "")}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Benefits & Expectations Duo-Grid (Priority: Specific > Universal) */}
          {((activeData.benefits?.length || universalBenefits?.length) || (activeData.expectations?.length || universalExpectations?.length)) ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
              {/* Benefits Column */}
              {(activeData.benefits?.length || universalBenefits?.length) ? renderBoxedList(
                activeData.audienceType === "children" ? "What Your Child Will Gain" : "What You Will Gain", 
                activeData.benefits || universalBenefits
              ) : null}
              
              {/* Expectations Column */}
              {(activeData.expectations?.length || universalExpectations?.length) ? renderBoxedList(
                "What to Expect", 
                activeData.expectations || universalExpectations, 
                activeData.expectationsIntro
              ) : null}
            </div>
          ) : null}

          {/* Dynamic Blocks */}
          {remainingBlocks?.map((block) => {
            switch (block._type) {
              case 'duoGridBlock':
                // Audit: Check if this duo block contains Approach or Why Choose Us
                const isApproachDuo = block.leftColumn?.title?.toLowerCase().includes("approach") || block.rightColumn?.title?.toLowerCase().includes("approach");
                const isWhyChooseDuo = block.leftColumn?.title?.toLowerCase().includes("choose") || block.rightColumn?.title?.toLowerCase().includes("choose");

                if (isApproachDuo || isWhyChooseDuo) {
                  return (
                    <div key={block._key} className="flex flex-col gap-8 lg:gap-12 py-4">
                      {isApproachDuo && (
                        renderCleanList(
                          block.leftColumn?.title?.toLowerCase().includes("approach") ? block.leftColumn.title : block.rightColumn?.title || "",
                          block.leftColumn?.title?.toLowerCase().includes("approach") ? block.leftColumn.items : block.rightColumn?.items,
                          true
                        )
                      )}
                      {isWhyChooseDuo && (
                        renderCleanList(
                          block.leftColumn?.title?.toLowerCase().includes("choose") ? block.leftColumn.title : block.rightColumn?.title || "",
                          block.leftColumn?.title?.toLowerCase().includes("choose") ? block.leftColumn.items : block.rightColumn?.items,
                          true
                        )
                      )}
                    </div>
                  );
                }

                return (
                  <div key={block._key} className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:gap-8">
                    {renderBoxedList(block.leftColumn?.title, block.leftColumn?.items, block.leftColumn?.kicker, block.leftColumn?.style)}
                    {renderBoxedList(block.rightColumn?.title, block.rightColumn?.items, block.rightColumn?.kicker, block.rightColumn?.style)}
                  </div>
                );

              case 'clinicalIndexBlock':
                // Audit: Check if this index block is Approach or Why Choose
                if (block.title?.toLowerCase().includes("approach") || block.title?.toLowerCase().includes("choose")) {
                  return (
                    <div key={block._key} className="py-4">
                      {renderCleanList(block.title, block.groups?.flatMap(g => g.items), block.title.toLowerCase().includes("approach"))}
                    </div>
                  );
                }

                return (
                  <div key={block._key} className={`rounded-[2.5rem] border border-black/[0.03] shadow-sm px-5 py-8 lg:p-12 ${block.backgroundColor === 'sage' ? 'bg-[#7A9A7D]/5' : 'bg-white'}`}>
                    <div className="-mt-2 lg:-mt-10 mb-6 lg:mb-8">
                      <p className="text-[14px] lg:text-[16px] text-black/70 font-medium leading-relaxed">
                        <strong className="text-black font-bold">{block.title} — </strong>
                        {renderTextWithBold(block.intro || "")}
                      </p>
                    </div>
                    <div className="flex flex-col gap-y-8 lg:gap-y-10">
                      {block.groups?.map((group, idx) => (
                        <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-8">
                          <div className="lg:col-span-3 lg:sticky lg:top-12 h-fit lg:pt-5">
                            <div className="flex items-start gap-4">
                              <div className="w-px h-8 lg:h-12 bg-green/20 shrink-0" />
                              <h4 className="text-[13px] lg:text-[13px] font-bold uppercase tracking-[0.2em] text-green/80 leading-relaxed">{group.heading}</h4>
                            </div>
                          </div>
                          <div className="lg:col-span-9">
                            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2 lg:gap-x-12">
                              {group.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 py-2 lg:py-3 border-b border-green/[0.05] last:border-0 md:[&:nth-last-child(2)]:border-0 md:last:border-0">
                                  <CheckCircle2 className="w-5 h-5 text-green shrink-0 mt-0.5 opacity-70" />
                                  <span className="text-[14px] lg:text-[15px] text-black/70 font-medium leading-relaxed">{renderItemText(item)}</span>
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
                // Audit: Check if full width list is Approach or Why Choose or Right Support
                if (block.title?.toLowerCase().includes("approach") || block.title?.toLowerCase().includes("choose") || block.title?.toLowerCase().includes("right support")) {
                  return (
                    <div key={block._key} className="py-4">
                      {renderCleanList(block.title, block.items, true)}
                    </div>
                  );
                }

                return (
                  <div key={block._key} className={`rounded-[2.5rem] border border-black/[0.03] shadow-sm p-6 lg:p-12 ${block.backgroundColor === 'sage' ? 'bg-[#7A9A7D]/5' : 'bg-white'}`}>
                    <h3 className="text-lg lg:text-xl font-serif text-green mb-8">{block.title}</h3>
                    {block.intro && <p className="mb-8 text-black/60 text-sm lg:text-base font-medium leading-relaxed">{renderTextWithBold(block.intro)}</p>}
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
              {activeData.whoIsItFor && activeData.whoIsItFor.length > 0 && (
                <div className="bg-white p-6 lg:p-12 rounded-[2.5rem] border border-black/[0.03] shadow-sm">
                  <h3 className="text-lg lg:text-xl font-serif text-green mb-8">Is This the Right Space?</h3>
                  {activeData.whoIsItForIntro && <p className="mb-8 text-black/60 text-sm lg:text-base font-medium">{renderTextWithBold(activeData.whoIsItForIntro)}</p>}
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
                <div className="bg-white rounded-[2.5rem] border border-black/[0.03] shadow-sm px-5 py-8 lg:p-12">
                  <div className="-mt-2 lg:-mt-10 mb-6 lg:mb-8">
                    <p className="text-[14px] lg:text-[16px] text-black/70 font-medium leading-relaxed max-w-3xl">
                      <strong className="text-black font-bold">{activeData.supportedItemsTitle || "Clinical Index"} — </strong>
                      {renderTextWithBold(activeData.supportedItemsIntro || "")}
                    </p>
                  </div>
                  <div className="flex flex-col gap-y-8 lg:gap-y-10">
                    {(() => {
                      const groups: { heading: string; items: string[] }[] = [];
                      activeData.supportedItems?.forEach((item) => {
                        const text = typeof item === 'string' ? item : item.items.join(', ');
                        if (text.startsWith('## ') || text.startsWith('#### ')) {
                          groups.push({ 
                            heading: text.replace(/^#+\s*/, ''), 
                            items: [] 
                          });
                        } else {
                          if (groups.length === 0) groups.push({ heading: 'Details', items: [] });
                          groups[groups.length - 1].items.push(text);
                        }
                      });

                      return groups.map((group, idx) => (
                        <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-1 lg:gap-8">
                          <div className="lg:col-span-3 lg:sticky lg:top-12 h-fit lg:pt-5">
                            <div className="flex items-start gap-4">
                              <div className="w-px h-8 lg:h-12 bg-green/20 shrink-0" />
                              <h4 className="text-[13px] lg:text-[13px] font-bold uppercase tracking-[0.2em] text-green/80 leading-relaxed">{group.heading}</h4>
                            </div>
                          </div>
                          <div className="lg:col-span-9">
                            <ul className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-2 lg:gap-x-12">
                              {group.items.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 py-2 lg:py-3 border-b border-green/[0.05] last:border-0 md:[&:nth-last-child(2)]:border-0 md:last:border-0">
                                  <CheckCircle2 className="w-5 h-5 text-green shrink-0 mt-0.5 opacity-70" />
                                  <span className="text-[14px] lg:text-[15px] text-black/70 font-medium leading-relaxed">{renderItemText(item)}</span>
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
            </>
          )}

          {/* Additional Sections (Common to both Modular & Legacy) */}
          {activeData.additionalSections?.map((section, idx) => (
            <div key={idx} className={`rounded-[2.5rem] border border-black/[0.03] p-6 lg:p-12 ${section.color === 'sage' ? 'bg-[#7A9A7D]/5' : 'bg-white shadow-sm'}`}>
              <h3 className="text-lg lg:text-xl font-serif text-green mb-8">{section.title}</h3>
              {section.intro && <p className="mb-8 text-black/60 text-sm lg:text-base font-medium leading-relaxed">{renderTextWithBold(section.intro)}</p>}
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

      {/* Global Core Sections (Always Visible) - Clean Layout (No Boxes) */}
      {(globalApproachItems?.length || globalWhyChooseItems?.length || globalAdditionalSections?.length) && (
        <div className="flex flex-col gap-8 lg:gap-12 mt-8 pt-8 border-t border-green/5">
          {globalApproachItems?.length ? renderCleanList("Our Approach", globalApproachItems, true) : null}
          {globalWhyChooseItems?.length ? renderCleanList(
            (activeTab === "adults" || activeTab === "geriatrics") ? "Why Families & Individuals Choose Divit MindSpace" : "Why Families Choose Us", 
            globalWhyChooseItems, 
            true
          ) : null}
          
          {globalAdditionalSections?.map((section, idx) => (
            <div key={idx} className="pt-2">
              {renderCleanList(section.title, section.items, true, section.intro)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
