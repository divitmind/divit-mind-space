"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { ClipboardCheck, Heart, Users, GraduationCap, Activity, CheckCircle2 } from "lucide-react";
import { urlFor } from "@/sanity/lib/image";
import type { SiteSettings, TrustMetrics } from "@/lib/types";

interface SanityService {
  _id: string;
  title: string;
  slug: { current: string };
  description: string;
  popular: boolean;
  isTherapy: boolean;
  category: string;
  image?: {
    asset?: { _ref: string };
    hotspot?: { x: number; y: number; height: number; width: number };
    crop?: { top: number; bottom: number; left: number; right: number };
    alt?: string;
  };
}

const DEFAULT_METRICS: TrustMetrics = {
  familiesCount: "100+",
  specialistsCount: "12+",
  servicesCount: "21+",
  googleRating: "4.9 / 5",
  googleReviewsUrl: "",
};

const categories = [
  { id: "all", label: "All Services", icon: null },
  { id: "assessments", label: "Assessments Hub", icon: ClipboardCheck },
  { id: "therapy", label: "Therapy", icon: Heart },
  { id: "guidance", label: "Counselling", icon: Users },
  { id: "programs", label: "Programs", icon: GraduationCap },
  { id: "physiotherapy", label: "Physiotherapy", icon: Activity },
];

const categoryDescriptions: Record<string, React.ReactNode> = {
  all: (
    <div className="text-base md:text-lg text-black/70 font-medium max-w-4xl mx-auto leading-relaxed text-center">
      <div className="inline-block text-center md:text-left">
        <span className="text-green font-bold block mb-2">
          Bangalore&apos;s Leading Center for <span className="md:whitespace-nowrap">Mental Health,</span> <span className="md:whitespace-nowrap">Neurodevelopment &</span> <span className="md:whitespace-nowrap">Physiotherapy</span>
        </span>
        <p className="mb-3 text-sm lg:text-base leading-relaxed">
          Neuro-affirming care covering Clinical Assessments, Speech, Occupational, Behavioral, Cognitive and Play <br className="hidden md:block" /> Therapy, Group Sessions, Counselling, Special Education, NIOS Support and Physiotherapy.
        </p>
        <div className="mt-6 flex items-center justify-center md:justify-start gap-3">
          <div className="h-px w-8 bg-black/10 hidden md:block" />
          <p className="text-sm lg:text-base italic text-black font-semibold">
            Helping <strong>Children</strong>, <strong>Teens</strong>, & <strong>Adults</strong> of all ages.
          </p>
        </div>
      </div>
    </div>
  ),
  assessments: (
    <>
      Comprehensive clinical assessments for <strong>ADHD</strong>, <strong>Autism</strong>, <strong>Learning Disabilities</strong>, <strong>Anxiety</strong>, <strong>Depression</strong>, <strong>Stress</strong>, <strong>Addiction</strong>, and other psychological & psychoeducational evaluations for <strong>Children</strong>, <strong>Adolescents</strong> and <strong>Adults</strong>.
    </>
  ),
  therapy: (
    <>
      Speech therapy, occupational therapy, ABA, sensory integration, and play therapy for <strong>Children</strong>, <strong>Teens</strong>, and <strong>Adults</strong>. Expert neurodevelopmental care at our Kasavanahalli center, Bangalore.
    </>
  ),
  guidance: (
    <>
      Professional mental health support for <strong>Children</strong>, <strong>Teens</strong>, and <strong>Adults</strong> including adolescent counseling and parent guidance programs. Available at our HSR Layout and Bellandur centers, Bangalore.
    </>
  ),
  programs: (
    <>
      Early intervention, special education, school readiness, and NIOS support programs for <strong>Children</strong>, <strong>Teens</strong>, and <strong>Adults</strong>. Structured developmental programs at our center off Sarjapur Road, Bangalore.
    </>
  ),
  physiotherapy: (
    <>
      Pain Management, Gym & Sports Injury Sessions, and Rehabilitation for <strong>Children</strong>, <strong>Teens</strong>, and <strong>Adults</strong>. Expert physical therapy at our Kasavanahalli center off Sarjapur Road, Bangalore.
    </>
  ),
};

interface ServicesPageProps {
  title?: string;
  services: SanityService[];
  siteSettings?: SiteSettings | null;
}

export default function ServicesPage({ title: propTitle = "Our Services", services, siteSettings }: ServicesPageProps) {
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState("all");

  // Process services to handle manual category overrides
  const processedServices = useMemo(() => {
    return services.map(s => {
      const updated = { ...s };
      if (s.title === "Customized Workshops" || s.title === "Parental Training Program") {
        updated.category = "programs";
      }
      // Specific renames for ranking match
      if (s.title === "Teacher Training Program") {
        updated.title = "Training Program (Shadow Teacher Training)";
      }
      if (s.title === "Physiotherapy — Pain Management") {
        updated.title = "Pain Management";
      }
      if (s.title === "Physiotherapy for Gym and Sports Injuries") {
        updated.title = "Gym & Sports Injury Sessions";
      }
      if (s.title === "Physiotherapy — Pain Modalities") {
        updated.title = "Pain Modalities";
      }
      if (s.title === "Assistive Devices Assessment and Training") {
        updated.title = "Assistive Devices";
      }
      return updated;
    });
  }, [services]);

  // Dynamic title based on category
  const dynamicTitle = useMemo(() => {
    if (activeCategory === "all") return propTitle;
    const cat = categories.find(c => c.id === activeCategory);
    return cat ? cat.label : propTitle;
  }, [activeCategory, propTitle]);

  // Read category from URL on mount and scroll to top — this is a legitimate
  // URL → state sync pattern (the React team has clarified these are valid
  // uses of useEffect despite the generic "don't setState in effects" guidance).
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categories.some((c) => c.id === categoryParam)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveCategory(categoryParam);
      // Scroll to top of page
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [searchParams]);

  const filteredServices = useMemo(() => {
    const result = activeCategory === "all"
      ? processedServices
      : processedServices.filter((s) => s.category === activeCategory);

    // Apply custom ranking for therapy category
    if (activeCategory === "therapy") {
      const therapyRanking = [
        "Speech Therapy",
        "Occupational Therapy",
        "Cognitive Therapy",
        "Behavioral Therapy",
        "Sensory Integration Therapy",
        "Group Therapy Sessions",
        "Play Therapy",
        "Brain Gym",
      ];

      return [...result].sort((a, b) => {
        const indexA = therapyRanking.indexOf(a.title);
        const indexB = therapyRanking.indexOf(b.title);

        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.title.localeCompare(b.title);
      });
    }

    // Apply custom ranking for programs category
    if (activeCategory === "programs") {
      const programsRanking = [
        "Training Program (Shadow Teacher Training)",
        "School Readiness Program",
        "Early Intervention Program",
        "NIOS Support Program",
        "Certificate in Special Education",
        "Diploma in Special Education",
      ];

      return [...result].sort((a, b) => {
        const indexA = programsRanking.indexOf(a.title);
        const indexB = programsRanking.indexOf(b.title);

        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.title.localeCompare(b.title);
      });
    }

    // Apply custom ranking for physiotherapy category
    if (activeCategory === "physiotherapy") {
      const physioRanking = [
        "Pain Management",
        "Gym & Sports Injury Sessions",
        "Post-Surgical Rehabilitation",
        "Wheelchair Training",
        "Pain Modalities",
        "Assistive Devices",
      ];

      return [...result].sort((a, b) => {
        const indexA = physioRanking.indexOf(a.title);
        const indexB = physioRanking.indexOf(b.title);

        if (indexA !== -1 && indexB !== -1) return indexA - indexB;
        if (indexA !== -1) return -1;
        if (indexB !== -1) return 1;
        return a.title.localeCompare(b.title);
      });
    }

    return result;
  }, [activeCategory, processedServices]);

  // Count services per category
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: processedServices.length };
    processedServices.forEach((s) => {
      counts[s.category] = (counts[s.category] || 0) + 1;
    });
    return counts;
  }, [processedServices]);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section - Matched to About Us rhythm */}
      <section className="relative pt-2 lg:pt-4 pb-6 lg:pb-10 bg-[#FDFBF7]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Title - Dynamic and Elegant */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight italic"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {dynamicTitle}
            </motion.h1>

            {/* Description */}
            <motion.div
              className="text-lg text-black/70 mb-6 max-w-4xl mx-auto font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {categoryDescriptions[activeCategory]}
            </motion.div>

            {/* Quick Stats Bar - Matching About Us style */}
            <motion.div
              className="flex items-center justify-center gap-5 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center group">
                <div className="text-xl font-bold text-black">{services.length}+</div>
                <div className="text-[9px] text-black/50 font-bold uppercase tracking-widest">Services</div>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="text-center group">
                <div className="text-xl font-bold text-black">6+</div>
                <div className="text-[9px] text-black/50 font-bold uppercase tracking-widest">Specialists</div>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="text-center group">
                <div className="text-xl font-bold text-black">100+</div>
                <div className="text-[9px] text-black/50 font-bold uppercase tracking-widest">Families</div>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="flex items-center gap-2 group">
                <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span className="text-xl font-serif italic text-green leading-none" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>4.9 / 5</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      <section id="category-tabs" className="py-4 bg-[#FDFBF7] sticky top-20 z-40 border-y border-black/5">
        <div className="container mx-auto px-4 relative">
          {/* Mobile Scroll Indicator (Fade) */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent z-10 pointer-events-none md:hidden" />

          <div className="flex overflow-x-auto no-scrollbar md:flex-wrap items-center md:justify-center gap-3 pb-2 md:pb-0 pr-8 md:pr-0">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap shrink-0
                    ${isActive
                      ? "bg-[#7A9A7D] text-white shadow-lg shadow-[#7A9A7D]/20"
                      : "bg-white text-black/60 hover:bg-[#7A9A7D]/10 border border-black/5"
                    }
                  `}
                >
                  {cat.icon && <cat.icon className="w-3.5 h-3.5" />}
                  {cat.label}
                  {count > 0 && (
                    <span className={`
                      text-[9px] px-1.5 py-0.5 rounded-full
                      ${isActive ? "bg-white/20" : "bg-black/10"}
                    `}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pt-4 lg:pt-6 pb-4 lg:pb-6 bg-[#FDFBF7]">
        <div className="container mx-auto px-4">
          {/* Assessment Hub Foundational Info - Shown only for Assessments Hub category */}
          {activeCategory === "assessments" && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-6xl mx-auto mb-10 space-y-8"
            >
              {/* Intro Banner - Optimized for horizontal space with 5:7 split */}
              <div className="bg-white rounded-[2.5rem] border border-black/5 p-6 lg:p-12 shadow-sm relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-64 h-64 bg-green/5 rounded-full blur-3xl opacity-60" />
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-5">
                    <h2 className="text-3xl lg:text-4xl font-serif text-black leading-tight italic">
                      Assessment Hub: <br className="hidden lg:block" />
                      Mapping Your Unique Blueprint
                    </h2>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-lg lg:text-xl text-black/70 font-medium leading-relaxed border-l-2 border-green/10 pl-6 lg:pl-8 py-2">
                      An assessment is more than a diagnosis — it is a compassionate roadmap to understanding your inner world. By combining evidence-based clinical tools with an empathetic, neuro-affirming approach, we identify your strengths and pinpoint the precise support you need to thrive.
                    </p>
                  </div>
                </div>
              </div>

              {/* Two Column Section: Children & Adults - Balanced with 5:7 Ratio */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
                {/* Children & Adolescents */}
                <div className="lg:col-span-5 flex flex-col gap-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-green/5 flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-green" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-serif text-black italic">Assessment for Children & Adolescents</h3>
                  </div>
                  
                  {/* Top Box: Core Features */}
                  <div className="bg-white rounded-[2rem] border border-black/5 p-6 lg:p-7 shadow-sm">
                    <div className="lg:min-h-[420px] flex flex-col">
                      <p className="text-black/70 font-medium leading-relaxed mb-5 italic border-l-2 border-green/10 pl-6">
                        We take a holistic view of a child’s cognitive, emotional, and social development. We translate complex behaviors into clear, actionable insights that support success at home and school.
                      </p>
                      <ul className="space-y-6 flex-grow">
                        {[
                          { title: "Autism", text: "Beyond surface symptoms, we explore social communication, sensory profiles, and special interests to help the child feel truly seen and understood." },
                          { title: "ADHD & Executive Function", text: "We look beyond hyperactivity to assess attention, organization, impulse control, and emotional regulation, while differentiating ADHD from anxiety or learning differences." },
                          { title: "Learning Disabilities (LD)", text: "Focused evaluations for reading, writing, and math to uncover the root causes of academic struggles." }
                        ].map((item) => (
                          <li key={item.title} className="flex gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-green mt-2 shrink-0" />
                            <p className="text-[15px] text-black/70 leading-relaxed">
                              <strong className="text-black font-bold">{item.title}:</strong> {item.text}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-5 border-t border-black/5">
                        <p className="text-green font-bold italic tracking-wide text-sm">Goal: To foster self-understanding, secure appropriate school accommodations, and create a personalized educational roadmap.</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Box: When to Reach Out */}
                  <div className="bg-white rounded-[2rem] border border-black/5 p-6 lg:p-7 shadow-sm h-full">
                    <h4 className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 mb-8 px-1">When to Reach Out:</h4>
                    <ul className="space-y-6">
                      {[
                        { title: "Developmental gaps", text: "missed milestones in speech, social interaction, or motor skills" },
                        { title: "Academic roadblocks", text: "high effort with low results or increasing resistance to school" },
                        { title: "Emotional volatility", text: "frequent intense meltdowns or sudden withdrawal from hobbies and friends" },
                        { title: "Behavioral puzzles", text: "repetitive behaviors, sensory sensitivities, or actions that are hard to understand" },
                        { title: "School Recommendations", text: "teacher or caregiver requests for additional learning support or accommodations" }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-green mt-2 shrink-0" />
                          <p className="text-[15px] text-black/70 leading-relaxed">
                            <strong className="text-black font-bold">{item.title}:</strong> {item.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Adults & Geriatrics */}
                <div className="lg:col-span-7 flex flex-col gap-6">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="w-12 h-12 rounded-2xl bg-green/5 flex items-center justify-center shrink-0">
                      <GraduationCap className="w-6 h-6 text-green" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-serif text-black italic">Assessment for Adults & Geriatrics</h3>
                  </div>

                  {/* Top Box: Core Features */}
                  <div className="bg-white rounded-[2rem] border border-black/5 p-6 lg:p-7 shadow-sm">
                    <div className="lg:min-h-[420px] flex flex-col">
                      <p className="text-black/70 font-medium leading-relaxed mb-5 italic border-l-2 border-green/10 pl-6">
                        Understanding your past to empower your future.
                      </p>
                      <ul className="grid grid-cols-1 xl:grid-cols-2 gap-x-8 gap-y-6 flex-grow">
                        {[
                          { title: "Stress", text: "We identify your specific triggers and help your nervous system move from survival mode to sustainable balance." },
                          { title: "Anxiety", text: "Support for OCD, Panic Disorder, Social Anxiety, and other patterns — providing clarity and practical regulation tools." },
                          { title: "Depression", text: "Compassionate support through depressive episodes and burnout, including specialized maternal mental health screening and postpartum guidance." },
                          { title: "Adult Autism & Adult ADHD", text: "Neuro-affirming assessments for late-identified individuals, helping differentiate neurodivergence from burnout or anxiety." },
                          { title: "Trauma & Grief", text: "Safe, trauma-informed evaluations that respect your pace and support recovery." },
                          { title: "Substance Use & Addiction", text: "Non-judgmental assessments to understand underlying patterns and co-occurring needs." },
                          { title: "Geriatric Care (55+)", text: "Dignified assessment of memory, mood, cognitive changes, and functional abilities to support independence and emotional well-being." }
                        ].map((item) => (
                          <li key={item.title} className="flex gap-4">
                            <div className="w-1.5 h-1.5 rounded-full bg-green mt-2 shrink-0" />
                            <p className="text-[15px] text-black/70 leading-relaxed">
                              <strong className="text-black font-bold">{item.title}:</strong> {item.text}
                            </p>
                          </li>
                        ))}
                      </ul>
                      <div className="mt-auto pt-5 border-t border-black/5">
                        <p className="text-green font-bold italic tracking-wide text-sm">Goal: To promote radical self-acceptance, develop effective workplace or daily strategies, and create personalized plans for long-term emotional well-being.</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Box: When to Reach Out */}
                  <div className="bg-white rounded-[2rem] border border-black/5 p-6 lg:p-7 shadow-sm h-full">
                    <h4 className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 mb-8 px-1">When to Reach Out:</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                      {[
                        { title: "Trauma & Grief", text: "ready to process past experiences at your own pace" },
                        { title: "Persistent anxiety", text: "intrusive thoughts, panic, or social fears that limit daily life" },
                        { title: "Habit awareness", text: "wanting to understand substance use or addictive patterns without judgment" },
                        { title: "Chronic burnout", text: "feeling stuck in survival mode where stress outweighs coping ability" },
                        { title: "Late-life clarity", text: "seeking to understand lifelong patterns of Adult ADHD or Autism" },
                        { title: "Cognitive changes (55+)", text: "noticing shifts in memory, mood, or independence" }
                      ].map((item, i) => (
                        <li key={i} className="flex gap-4">
                          <div className="w-1.5 h-1.5 rounded-full bg-green mt-2 shrink-0" />
                          <p className="text-[15px] text-black/70 leading-relaxed">
                            <strong className="text-black font-bold">{item.title}:</strong> {item.text}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bridge Text before Grid */}
              <div className="text-center pt-4 border-t border-black/5">
                <h4 className="text-2xl font-serif text-black italic">Explore our Specialized Assessments</h4>
              </div>
            </motion.div>
          )}

          {filteredServices.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredServices.map((service, index) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-6 bg-black/5 rounded-full flex items-center justify-center">
                  <ClipboardCheck className="w-8 h-8 text-black/20" />
                </div>
                <h3 className="text-xl font-serif italic text-black mb-2">
                  No services in this category yet
                </h3>
                <p className="text-black/50 text-sm">
                  Check other categories or contact us to learn about upcoming services.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA - matching homepage style */}
      <section className="pt-2 lg:pt-6 pb-6 lg:pb-10 bg-[#FDFBF7] px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-black/5 p-5 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 shadow-2xl shadow-black/5"
          >
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
              <div className="text-center md:text-left">
                <h2 className="text-xl md:text-4xl font-bold text-black font-[family-name:var(--font-cormorant)] italic mb-1 md:mb-2">
                  Not ready to book?
                </h2>
                <p className="text-sm md:text-lg text-black/60 font-medium">
                  Message us on WhatsApp. Ask us anything, we&apos;re here to help.
                </p>
              </div>
            </div>
            <WhatsAppConsultationLink className="dm-pill-button dm-pill-button-primary w-full md:w-auto md:scale-125 whitespace-nowrap">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Chat With Us
            </WhatsAppConsultationLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// Inline Service Card Component
function ServiceCard({ service }: { service: SanityService }) {
  const imageUrl = service.image
    ? urlFor(service.image).width(800).height(600).fit('crop').auto('format').url()
    : '/placeholder-service.png';

  return (
    <Link
      href={`/services/${service.slug.current}`}
      className="group relative bg-white overflow-hidden rounded-[2rem] border border-black/5 hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5"
    >
      <div className="relative h-64 w-full overflow-hidden bg-black/5">
        <Image
          src={imageUrl}
          alt={service.image?.alt || service.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      <div className="p-8 space-y-4">
        <h3 className="text-2xl font-serif italic text-black leading-tight line-clamp-2 group-hover:text-purple transition-colors duration-300">
          {service.title}
        </h3>

        <p className="text-black/60 line-clamp-3 leading-relaxed font-medium">
          {service.description}
        </p>

        <div className="pt-4 flex items-center gap-2 text-black/40 group-hover:text-black transition-all duration-300 uppercase text-[10px] font-bold tracking-widest">
          <span>Explore Service</span>
          <svg
            className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
