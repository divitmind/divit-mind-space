"use client";

import { useState, useMemo } from "react";
import { motion } from "motion/react";
import { JobCard } from "./job-card";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
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

export function CareersPage({ jobs, initialFilter }: CareersPageProps) {
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
      {/* Hero Section - matching services page rhythm */}
      <section className="pt-4 lg:pt-8 pb-6 lg:pb-10 bg-[#FDFBF7]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            {/* Location Badge */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full bg-black/5 text-black text-[10px] font-bold uppercase tracking-widest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#7A9A7D]" />
              Sarjapur Road, Bengaluru
            </motion.div>

            {/* Title - Serif Italic like services */}
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-black mb-6 leading-tight italic"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              Join Our Team
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg text-black/70 mb-6 max-w-2xl mx-auto font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Join Bangalore&apos;s leading center for mental health, neurodevelopment, and physiotherapy.
              Serving families across Kasavanahalli, HSR Layout, Bellandur, and Bengaluru.
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              className="flex items-center justify-center gap-5 sm:gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center">
                <div className="text-xl font-bold text-black">{jobs.length}</div>
                <div className="text-[9px] text-black/50 font-bold uppercase tracking-widest">Open Roles</div>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="text-center">
                <div className="text-xl font-bold text-black">{departments.length}</div>
                <div className="text-[9px] text-black/50 font-bold uppercase tracking-widest">Departments</div>
              </div>
              <div className="w-px h-8 bg-black/10" />
              <div className="text-center">
                <div className="text-xl font-bold text-black">Onsite</div>
                <div className="text-[9px] text-black/50 font-bold uppercase tracking-widest">Work Model</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Department Tabs - matching services category tabs */}
      <section className="py-4 bg-[#FDFBF7] sticky top-20 z-40 border-y border-black/5">
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

      {/* Jobs Grid - matching services grid */}
      <section className="pt-4 lg:pt-6 pb-4 lg:pb-6 bg-[#FDFBF7]">
        <div className="container mx-auto px-4">
          {filteredJobs.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-6 md:grid-cols-2"
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
            <div className="flex flex-row md:flex-row items-center gap-4 md:gap-8">
              {/* WhatsApp Icon Circle */}
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#7A9A7D] flex items-center justify-center shrink-0 shadow-lg">
                <svg className="w-7 h-7 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>

              {/* Text */}
              <div className="text-left">
                <h2 className="text-xl md:text-4xl font-bold text-black font-[family-name:var(--font-cormorant)] italic mb-1 md:mb-2">
                  Ready to Join Our Team?
                </h2>
                <p className="text-sm md:text-lg text-black/60 font-medium">
                  Message us on WhatsApp to start a conversation.
                </p>
              </div>
            </div>

            <WhatsAppConsultationLink
              className="dm-pill-button dm-pill-button-primary w-full md:w-auto md:scale-125 whitespace-nowrap"
              message="Hi! I'm interested in career opportunities at Divit MindSpace, Bangalore. I'd like to know more about the open positions at your Sarjapur Road center."
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Apply Now
            </WhatsAppConsultationLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
