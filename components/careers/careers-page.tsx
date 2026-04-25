"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { JobCard } from "./job-card";
import { Briefcase, Users, GraduationCap, Heart } from "lucide-react";
import type { CareerListItem } from "@/sanity/types";

// Department categories with icons
const departmentCategories = [
  { id: "all", label: "All Roles", icon: null },
  { id: "Clinical Services", label: "Clinical", icon: Heart },
  { id: "Education & Training", label: "Education", icon: GraduationCap },
  { id: "Psychology", label: "Psychology", icon: Users },
];

interface CareersPageProps {
  jobs: CareerListItem[];
  initialFilter?: string;
}

export function CareersPage({ jobs }: CareersPageProps) {
  const [activeDepartment, setActiveDepartment] = useState<string>("all");

  // Get unique departments from jobs
  const departments = useMemo(() => {
    return Array.from(new Set(jobs.map(j => j.department)));
  }, [jobs]);

  // Count jobs per department
  const departmentCounts = useMemo(() => {
    const counts: Record<string, number> = { all: jobs.length };
    jobs.forEach((job) => {
      counts[job.department] = (counts[job.department] || 0) + 1;
    });
    return counts;
  }, [jobs]);

  // Filter jobs by department
  const filteredJobs = useMemo(() => {
    if (activeDepartment === "all") return jobs;
    return jobs.filter((job) => job.department === activeDepartment);
  }, [activeDepartment, jobs]);

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section - matching homepage rhythm */}
      <section className="pt-2 pb-4 lg:pt-4 lg:pb-8 bg-[#FDFBF7]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Location Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
              Sarjapur Road, Bangalore
            </motion.div>

            {/* Title - Serif Italic like services */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-4 leading-tight italic"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Join Our Team
            </motion.h1>

            {/* Description - Unified Premium Style */}
            <div className="text-base md:text-lg text-black/70 mb-6 max-w-4xl mx-auto font-medium leading-relaxed text-center">
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
                    Helping <span className="text-green">Children</span>, <span className="text-green">Teens</span>, & <span className="text-green">Adults</span> of all ages.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <motion.div
              className="flex items-center justify-center gap-5 sm:gap-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-black">{jobs.length}</div>
                <div className="text-[9px] text-black/40 font-bold uppercase tracking-widest mt-1">Open Roles</div>
              </div>
              <div className="w-px h-10 bg-black/5" />
              <div className="text-center">
                <div className="text-2xl font-bold text-black">{departments.length}</div>
                <div className="text-[9px] text-black/40 font-bold uppercase tracking-widest mt-1">Departments</div>
              </div>
              <div className="w-px h-10 bg-black/5" />
              <div className="text-center">
                <div className="text-2xl font-bold text-black">Onsite</div>
                <div className="text-[9px] text-black/40 font-bold uppercase tracking-widest mt-1">Work Model</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Join Us - EVP Section - Integrated Flow */}
      <section className="pt-6 pb-6 lg:pt-10 lg:pb-10 bg-[#FDFBF7]">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Section Opening */}
            <div className="max-w-3xl mx-auto text-center mb-5 md:mb-10">
              <motion.h2
                className="text-3xl md:text-5xl font-serif italic text-black mb-4 md:mb-6"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Why Join Divit MindSpace?
              </motion.h2>
              <motion.div 
                className="w-12 h-px bg-[#7A9A7D]/30 mx-auto"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.8 }}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {[
                {
                  title: "Multidisciplinary Setup",
                  desc: "Work alongside specialists in Clinical Assessments, Speech, Occupational, Behavioral, Cognitive and Play Therapy, Group Sessions, Counselling, Special Education, NIOS Support, and Physiotherapy.",
                },
                {
                  title: "Neuro-Affirming Care",
                  desc: "We practice a strengths-based, neuro-affirming approach across 28+ services—celebrating individual differences through evidence-based excellence.",
                },
                {
                  title: "Continuous Learning",
                  desc: "Grow through case conferences and workshops across clinical psychology, speech therapy, and physiotherapy, with mentorship from senior specialists.",
                },
                {
                  title: "Lifespan Impact",
                  desc: "Make a real difference for children, teens, and adults—from Early Intervention and School Readiness to adult mental health and rehabilitative physiotherapy.",
                },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  className="group p-5 md:p-7 rounded-[1.5rem] md:rounded-[2rem] border border-black/5 bg-white hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="flex items-center gap-3 mb-2 md:mb-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D] opacity-40 group-hover:opacity-100 transition-opacity" />
                    <h3 className="text-lg md:text-xl font-bold text-black font-[family-name:var(--font-cormorant)] italic leading-tight">{item.title}</h3>
                  </div>
                  <p className="text-[13px] text-black/60 font-medium leading-relaxed pl-4.5">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Department Tabs - matching homepage rhythm */}
      <section className="py-4 bg-[#FDFBF7] sticky top-20 z-40 border-y border-black/5 backdrop-blur-md bg-[#FDFBF7]/90">
        <div className="container mx-auto px-4 relative">
          {/* Mobile Scroll Indicator */}
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#FDFBF7] via-[#FDFBF7]/80 to-transparent z-10 pointer-events-none md:hidden" />

          <div className="flex overflow-x-auto no-scrollbar md:flex-wrap items-center md:justify-center gap-3 pb-2 md:pb-0 pr-8 md:pr-0">
            {departmentCategories.map((cat) => {
              const isActive = activeDepartment === cat.id;
              const count = departmentCounts[cat.id] || 0;

              // Only show categories that have jobs
              if (cat.id !== "all" && !departments.includes(cat.id)) return null;

              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveDepartment(cat.id)}
                  className={`
                    inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all whitespace-nowrap shrink-0
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

      {/* Jobs Grid - matching homepage rhythm */}
      <section className="pt-4 pb-6 lg:pt-8 lg:pb-10 bg-[#FDFBF7]">
        <div className="container mx-auto px-4">
          {filteredJobs.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {filteredJobs.map((job, index) => (
                <motion.div
                  key={job._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <JobCard job={job} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-12">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 mx-auto mb-6 bg-black/5 rounded-full flex items-center justify-center">
                  <Briefcase className="w-8 h-8 text-black/20" />
                </div>
                <h3
                  className="text-xl font-serif italic text-black mb-2"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  No positions in this department yet
                </h3>
                <p className="text-black/50 text-sm">
                  Check other departments or contact us about upcoming opportunities.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
