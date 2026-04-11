"use client";

import { AwarenessHero } from "./awareness-hero";
import { motion } from "motion/react";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { CheckCircle2, Users, GraduationCap, Heart, School, LucideIcon, Sparkles } from "lucide-react";
import Image from "next/image";
import { Awareness } from "@/sanity/types";

interface AwarenessPageProps {
  data?: Awareness;
}

const iconMap: Record<string, LucideIcon> = {
  GraduationCap, Users, Heart, School, Sparkles
};

// Helper to handle both Sanity assets and hardcoded string paths
function getImageUrl(image: any, fallback: string): string {
  if (!image) return fallback;
  if (typeof image === 'string') return image;
  if (image.asset && typeof image.asset === 'object' && 'url' in image.asset) {
    return image.asset.url as string;
  }
  if (typeof image.asset === 'string') return image.asset;
  return fallback;
}

const defaultBenefits = [
  {
    icon: "GraduationCap",
    title: "Teacher Training",
    description: "Equip your staff to recognize early signs and support neurodivergent students effectively."
  },
  {
    icon: "Users",
    title: "Parent Awareness",
    description: "Help parents understand neurodivergence, reducing stigma and encouraging early action."
  },
  {
    icon: "Heart",
    title: "Inclusive Culture",
    description: "Build a more understanding and supportive environment for all children."
  },
  {
    icon: "School",
    title: "No Cost to You",
    description: "All sessions are completely FREE. We believe awareness should be accessible to everyone."
  }
];

const defaultHighlights = {
  title: "What We Cover",
  description: "Each session is tailored to your audience—whether teachers, parents, or students. Here's what participants learn:",
  items: [
    "Understanding neurodivergence (Autism, ADHD, Learning Disabilities)",
    "Recognizing early signs in children",
    "Breaking myths and reducing stigma",
    "Practical tips for teachers and parents",
    "When and how to seek professional help",
    "Q&A with experienced therapists"
  ],
  image: { asset: { url: "/awareness-tisb.jpg" }, alt: "What we cover" }
};

const defaultPastSessions = {
  title: "Sessions We've Conducted",
  subtitle: "Real impact in schools and colleges across Bangalore",
  sessions: [
    {
      venue: "Jyoti Nivas College, Koramangala",
      audience: "Education Students & Faculty",
      image: { asset: { url: "/awareness-jyoti-nivas.jpeg" }, alt: "Awareness session at Jyoti Nivas College" }
    },
    {
      venue: "TISB School, Domasandra",
      audience: "Teachers & Staff",
      image: { asset: { url: "/awareness-tisb.jpg" }, alt: "Awareness session at TISB School" }
    }
  ]
};

const defaultCTA = {
  title: "Want to Host a Session?",
  description: "Bring awareness to your school, college, or organization—completely free. Just reach out and we'll coordinate everything.",
  buttonText: "Request a Free Session"
};

export function AwarenessPage({ data }: AwarenessPageProps) {
  const benefits = data?.benefits || { title: "What Your School Gets", subtitle: "Tangible benefits for your institution and community", items: defaultBenefits };
  const highlights = data?.highlights || defaultHighlights;
  const pastSessions = data?.pastSessions || defaultPastSessions;
  const cta = data?.cta || defaultCTA;

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Hero Section */}
      <AwarenessHero data={data?.hero} />

      {/* What Your School Gets - WIIFM Section */}
      <section className="py-12 lg:py-16 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif text-green mb-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              {benefits.title}
            </h2>
            <p className="text-black/70 font-medium max-w-2xl mx-auto">{benefits.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {(benefits.items || defaultBenefits).map((benefit, idx) => {
              const IconComponent = (benefit.icon && iconMap[benefit.icon]) || Sparkles;
              return (
                <motion.div
                  key={idx}
                  className="bg-white rounded-2xl p-8 border border-black/5 shadow-xl shadow-black/[0.02] hover:shadow-2xl hover:shadow-black/5 transition-all hover:-translate-y-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-purple/10 flex items-center justify-center mb-6">
                    <IconComponent className="w-6 h-6 text-purple" />
                  </div>
                  <h3 className="text-xl font-bold text-green mb-3">{benefit.title}</h3>
                  <p className="text-sm text-black/70 font-medium leading-relaxed">{benefit.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="py-12 lg:py-16 bg-[#FAF9F5]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-serif text-green mb-6" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                {highlights.title}
              </h2>
              <p className="text-black/70 mb-8 font-medium leading-relaxed max-w-xl">
                {highlights.description}
              </p>
              <ul className="space-y-4">
                {(highlights.items || []).map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple mt-0.5 shrink-0" />
                    <span className="text-black/70 font-medium">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-purple/10 rounded-[2rem] transform rotate-2 translate-x-2 translate-y-2" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border-4 border-white shadow-2xl">
                <Image
                  src={getImageUrl(highlights.image, defaultHighlights.image.asset.url)}
                  alt={highlights.image?.alt || "What we cover"}
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Past Sessions Gallery */}
      <section className="py-12 lg:py-16 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif text-green mb-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              {pastSessions.title}
            </h2>
            <p className="text-black/70 font-medium">{pastSessions.subtitle}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {(pastSessions.sessions || []).map((session, idx) => (
              <motion.div
                key={idx}
                className="group relative rounded-[2rem] overflow-hidden shadow-2xl border border-black/5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={getImageUrl(session.image, idx === 0 ? "/awareness-jyoti-nivas.jpeg" : "/awareness-tisb.jpg")}
                    alt={session.image?.alt || `Awareness session at ${session.venue}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <h3 className="font-serif italic text-2xl mb-2">{session.venue}</h3>
                  <p className="text-white/80 text-xs font-bold uppercase tracking-widest">{session.audience}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16 bg-[#FAF9F5]">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-3xl mx-auto text-center bg-white rounded-[2rem] p-10 lg:p-16 border border-black/5 shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif text-green mb-6 italic" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              {cta.title}
            </h2>
            <p className="text-black/70 mb-10 text-lg font-medium leading-relaxed">
              {cta.description}
            </p>
            <WhatsAppConsultationLink className="dm-pill-button dm-pill-button-primary scale-110">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {cta.buttonText}
            </WhatsAppConsultationLink>

            <p className="mt-8 text-[10px] text-black/40 font-bold uppercase tracking-widest">
              We&apos;ll get back to you within 24 hours
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
