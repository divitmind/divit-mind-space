"use client";

import { AwarenessHero } from "./awareness-hero";
import { motion } from "motion/react";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Smartphone,
  ShieldCheck,
  Lock,
  HeartHandshake,
  BookOpen,
  Users,
  Briefcase,
  ChevronRight,
} from "lucide-react";
import type { Awareness } from "@/sanity/types";
import {
  AWARENESS_MISSION_PARAGRAPHS,
  AWARENESS_INSTITUTIONS,
  AWARENESS_WORKSHOP_TITLES,
  AWARENESS_FAQS,
} from "@/lib/awareness-content";

interface AwarenessPageProps {
  data?: Awareness;
}

// Real photos from past sessions — all live under public/gallery/ and public/.
// Filenames preserved verbatim; Next Image handles URL-encoding of spaces.
const PAST_SESSION_PHOTOS: {
  src: string;
  venue: string;
  audience: string;
  featured?: boolean;
}[] = [
  {
    src: "/gallery/Bishop Cotton Girls School_KG Orientation Program_ Screen Time 4.jpeg",
    venue: "Bishop Cotton Girls School",
    audience: "KG Orientation · Screen Time",
    featured: true,
  },
  {
    src: "/gallery/DPS EAST Teachers Awareness Session.jpeg",
    venue: "DPS East",
    audience: "Teachers Awareness Session",
    featured: true,
  },
  {
    src: "/awareness-jyoti-nivas.jpeg",
    venue: "Jyoti Niwas College",
    audience: "Education Students & Faculty",
  },
  {
    src: "/awareness-tisb.jpg",
    venue: "TISB",
    audience: "Teachers & Staff",
  },
  {
    src: "/gallery/Bishop Cotton Girls School_KG Orientation Program_ Screen Time 1.jpeg",
    venue: "Bishop Cotton Girls School",
    audience: "KG Orientation",
  },
  {
    src: "/gallery/Bishop Cotton Girls School_KG Orientation Program_ Screen Time 5.jpeg",
    venue: "Bishop Cotton Girls School",
    audience: "Parents Awareness",
  },
  {
    src: "/gallery/DPS EAST Teachers Awareness Session 3.jpeg",
    venue: "DPS East",
    audience: "Teachers Training",
  },
  {
    src: "/gallery/DPS EAST Teachers Awareness Session 5.jpeg",
    venue: "DPS East",
    audience: "Inclusive Classrooms",
  },
  {
    src: "/gallery/Bishop Cotton Girls School_KG Orientation Program_ Screen Time 7.jpeg",
    venue: "Bishop Cotton Girls School",
    audience: "Workshop in Action",
  },
  {
    src: "/gallery/DPS EAST Teachers Awareness Session 8.jpeg",
    venue: "DPS East",
    audience: "Q&A Discussion",
  },
];

// Icon + blurb + motion profile per workshop. Titles live in
// lib/awareness-content.ts (verbatim from awareness.txt); motion keeps cards
// visually alive without being distracting. Each topic gets a different
// infinite loop so the 8 cards read as 8 distinct tiles, not a uniform grid.
type Motion =
  | "pulse"
  | "rotate"
  | "bounce"
  | "wiggle"
  | "float"
  | "breath"
  | "tilt"
  | "heartbeat";

const WORKSHOP_META: Record<
  string,
  { icon: typeof Baby; blurb: string; motion: Motion }
> = {
  "Child Growth and Development": {
    icon: Baby,
    blurb: "Developmental milestones parents and teachers should track.",
    motion: "breath",
  },
  "Screen Time Management": {
    icon: Smartphone,
    blurb: "Healthy digital habits for children, teens, and classrooms.",
    motion: "tilt",
  },
  "Bullying Prevention": {
    icon: ShieldCheck,
    blurb: "Spotting, stopping, and preventing bullying in school settings.",
    motion: "pulse",
  },
  "Cybersecurity Awareness": {
    icon: Lock,
    blurb: "Online safety basics for students, parents, and educators.",
    motion: "heartbeat",
  },
  "Connecting with Your Students": {
    icon: HeartHandshake,
    blurb: "Practical strategies teachers use to build trust in the classroom.",
    motion: "bounce",
  },
  "Building Emotionally Healthy Classrooms": {
    icon: BookOpen,
    blurb: "Emotionally safe, inclusive learning environments.",
    motion: "float",
  },
  "Classroom Management": {
    icon: Users,
    blurb: "Evidence-based techniques for handling group dynamics.",
    motion: "wiggle",
  },
  "Employee Assistance Programs (EAPs) for Corporates": {
    icon: Briefcase,
    blurb: "Mental-health support built for the workplace.",
    motion: "rotate",
  },
};

// Motion profiles — each is a continuous, calm loop (Mind Gym style).
// Kept subtle (small amplitude, long duration) so cards feel "alive" without
// being nauseating when 8 animate at once.
const MOTION_PROFILES = {
  pulse: { scale: [1, 1.08, 1] },
  rotate: { rotate: [0, 360] },
  bounce: { y: [0, -4, 0] },
  wiggle: { rotate: [-4, 4, -4] },
  float: { y: [0, -3, 0], x: [0, 2, 0] },
  breath: { scale: [1, 1.05, 1], opacity: [1, 0.9, 1] },
  tilt: { rotate: [-8, 8, -8] },
  heartbeat: { scale: [1, 1.1, 1, 1.1, 1] },
} satisfies Record<Motion, Record<string, number[]>>;

const MOTION_DURATIONS: Record<Motion, number> = {
  pulse: 2.5,
  rotate: 14,
  bounce: 2,
  wiggle: 3,
  float: 4,
  breath: 3.5,
  tilt: 5,
  heartbeat: 2.2,
};

// Decorative image for the mission section — a candid session photo.
const MISSION_IMAGE = {
  src: "/awareness-jyoti-nivas.jpeg",
  alt: "Awareness session at Jyoti Niwas College — educators engaging with real content",
};

export function AwarenessPage({ data }: AwarenessPageProps) {
  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Hero */}
      <AwarenessHero data={data?.hero} />

      {/* Brand-promise banner — verbatim from awareness.txt. Sits between hero
          and mission so the "interactive, insightful, customisable" promise
          frames the entire page, not just the workshops section.
          data-speakable hints Google Assistant for voice search. */}
      <section className="py-1 lg:py-2 bg-[#FAF9F5]">
        <div className="container mx-auto px-4">
          <motion.blockquote
            className="relative max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <motion.div
              className="absolute -inset-1 rounded-[2.5rem] opacity-60"
              style={{
                background:
                  "linear-gradient(110deg, #7A9A7D 0%, #E8D5B7 50%, #52154E 100%)",
              }}
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative rounded-[2.25rem] bg-gradient-to-br from-white via-cream to-green-lite/30 px-8 py-8 lg:px-14 lg:py-10 shadow-2xl">
              <motion.div
                className="absolute -top-5 -left-3 lg:-top-8 lg:-left-6 text-[6rem] lg:text-[9rem] leading-none font-serif text-green/20 select-none pointer-events-none"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                aria-hidden
              >
                &ldquo;
              </motion.div>

              <p
                data-speakable
                className="relative z-10 text-xl lg:text-3xl font-serif italic text-green leading-snug text-center"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Every workshop is interactive and insightful, thoughtfully
                designed, and fully customisable to match the requirements and
                profile of your audience.
              </p>

              <div className="relative z-10 mt-4 flex items-center justify-center gap-3">
                <div className="h-px w-10 bg-green/30" />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-green/60">
                  Divit MindSpace
                </span>
                <div className="h-px w-10 bg-green/30" />
              </div>
            </div>
          </motion.blockquote>
        </div>
      </section>

      {/* Section 3 — 15+ Institutions Reached */}
      <section className="pt-4 pb-4 lg:pt-6 lg:pb-6 bg-[#FAF9F5]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 text-purple text-[10px] font-bold uppercase tracking-widest mb-1">
              Real Impact
            </div>
            <h2
              className="text-3xl lg:text-5xl font-serif text-green leading-tight mb-2"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              15+ Schools & Organisations Reached
            </h2>
            <p className="text-black/70 font-medium leading-relaxed text-base lg:text-lg">
              We have successfully designed and facilitated awareness programs
              in more than 15 organisations, reaching communities of teachers,
              parents, and children. These include prominent institutions such
              as:
            </p>
          </motion.div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 max-w-5xl mx-auto">
            {AWARENESS_INSTITUTIONS.map((name, idx) => (
              <motion.li
                key={name}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-black/5 shadow-sm hover:shadow-lg hover:border-green/30 hover:-translate-y-0.5 transition-all"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
              >
                {/* Pulsing green dot — subtle heartbeat that loops */}
                <motion.div
                  className="w-2 h-2 rounded-full bg-green shrink-0"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (idx % 4) * 0.3,
                  }}
                />
                <span className="text-sm lg:text-base font-semibold text-black/80">
                  {name}
                </span>
              </motion.li>
            ))}
            <motion.li
              className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-green/5 border border-green/20"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: AWARENESS_INSTITUTIONS.length * 0.04 }}
            >
              <div className="w-2 h-2 rounded-full bg-green/60 shrink-0" />
              <span className="text-sm lg:text-base font-semibold italic text-green/80">
                …and many more
              </span>
            </motion.li>
          </ul>
        </div>
      </section>

      {/* Section 4 — Real Sessions Gallery */}
      <section className="pt-4 pb-6 lg:pt-6 lg:pb-8 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-2xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow/30 text-black/70 text-[10px] font-bold uppercase tracking-widest mb-1">
              Moments from the Field
            </div>
            <h2
              className="text-3xl lg:text-5xl font-serif text-green leading-tight mb-1"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Real sessions, real classrooms
            </h2>
            <p className="text-black/70 font-medium text-sm lg:text-base">
              A glimpse of teachers, parents, and students we have worked with
              across Bangalore.
            </p>
          </motion.div>

          {/* Masonry-style grid — featured items span more height */}
          <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[180px] md:auto-rows-[200px] gap-3 lg:gap-4 max-w-6xl mx-auto">
            {PAST_SESSION_PHOTOS.map((photo, idx) => (
              <motion.div
                key={photo.src}
                className={`group relative rounded-2xl overflow-hidden shadow-lg border border-black/5 ${
                  photo.featured ? "row-span-2" : ""
                }`}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.04 }}
              >
                <Image
                  src={photo.src}
                  alt={`${photo.venue} — ${photo.audience}`}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 lg:p-4 text-white">
                  <div className="font-serif italic text-sm lg:text-base leading-tight mb-0.5">
                    {photo.venue}
                  </div>
                  <div className="text-white/75 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest">
                    {photo.audience}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="text-center mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-green/20 text-green font-bold text-xs uppercase tracking-widest hover:bg-green hover:text-white transition-all"
            >
              See more moments in our gallery
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section 5 — Customised Workshops */}
      <section className="pt-4 pb-6 lg:pt-6 lg:pb-8 bg-[#FAF9F5]">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple/10 text-purple text-[10px] font-bold uppercase tracking-widest mb-1">
              Beyond Awareness
            </div>
            <h2
              className="text-3xl lg:text-5xl font-serif text-green leading-tight mb-2"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Customised Workshops
            </h2>
            <p className="text-black/70 font-medium leading-relaxed text-base lg:text-lg">
              In addition, we offer customised workshops tailored to the
              specific needs and audience of various organisations, including
              schools, colleges, corporates, hospitals, and apartment
              communities. Popular topics include:
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 max-w-6xl mx-auto">
            {AWARENESS_WORKSHOP_TITLES.map((title, idx) => {
              const meta = WORKSHOP_META[title];
              const Icon = meta?.icon ?? Users;
              const motionKey = meta?.motion ?? "pulse";
              return (
                <motion.div
                  key={title}
                  className="group relative bg-white rounded-2xl p-5 lg:p-6 border border-black/5 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {/* Corner sheen that shimmers on hover */}
                  <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-purple/5 blur-2xl group-hover:bg-purple/20 transition-all duration-700" />

                  {/* Animated icon bubble — continuous loop keyed per topic */}
                  <motion.div
                    className="relative w-11 h-11 rounded-xl bg-purple/10 flex items-center justify-center mb-3"
                    animate={MOTION_PROFILES[motionKey]}
                    transition={{
                      duration: MOTION_DURATIONS[motionKey],
                      repeat: Infinity,
                      ease: motionKey === "rotate" ? "linear" : "easeInOut",
                    }}
                  >
                    <Icon className="w-5 h-5 text-purple" />
                  </motion.div>

                  <h3 className="relative text-sm lg:text-base font-bold text-green mb-1 leading-tight">
                    {title}
                  </h3>
                  <p className="relative text-xs text-black/60 font-medium leading-relaxed">
                    {meta?.blurb}
                  </p>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Section 6 — FAQ (AEO citation lever) */}
      <section className="py-6 lg:py-10 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto mb-5 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green/10 text-green text-[10px] font-bold uppercase tracking-widest mb-2">
              Frequently Asked
            </div>
            <h2
              className="text-3xl lg:text-5xl font-serif text-green leading-tight"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Answers for schools and organisers
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto space-y-4">
            {AWARENESS_FAQS.map((faq, idx) => (
              <motion.details
                key={faq.question}
                className="group bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <summary className="flex items-center justify-between p-5 lg:p-6 cursor-pointer list-none">
                  <h3 className="font-bold text-black text-sm lg:text-base pr-4">
                    {faq.question}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-green shrink-0 transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-5 lg:px-6 pb-5 lg:pb-6 text-black/70 font-medium text-sm lg:text-base leading-relaxed">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7 — Bottom CTA (request a session) */}
      <section className="pt-6 pb-10 lg:pt-10 lg:pb-14 bg-[#FAF9F5] px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-black/5 p-5 md:p-10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-10 shadow-2xl shadow-black/5"
          >
            <div className="flex flex-row md:flex-row items-center gap-4 md:gap-8">
              <div className="w-14 h-14 md:w-20 md:h-20 rounded-full bg-[#7A9A7D] flex items-center justify-center shrink-0 shadow-lg">
                <svg className="w-7 h-7 md:w-10 md:h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>

              <div className="text-left">
                <h2 className="text-xl md:text-4xl font-bold text-black font-[family-name:var(--font-cormorant)] italic mb-0.5 md:mb-1">
                  Want to host a session?
                </h2>
                <p className="text-sm md:text-lg text-black/60 font-medium">
                  We design free sessions for schools, colleges, corporates,
                  hospitals and apartment communities. Message us on WhatsApp
                  with your audience details.
                </p>
              </div>
            </div>

            <WhatsAppConsultationLink className="dm-pill-button dm-pill-button-primary w-full md:w-auto md:scale-125 whitespace-nowrap">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Schedule a Free Session
            </WhatsAppConsultationLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
