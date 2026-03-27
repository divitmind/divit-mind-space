"use client";

import { AwarenessHero } from "./awareness-hero";
import { motion } from "motion/react";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { CheckCircle2, Users, GraduationCap, Heart, School } from "lucide-react";
import Image from "next/image";
import { AwarenessProgram } from "@/sanity/types";

const benefits = [
  {
    icon: GraduationCap,
    title: "Teacher Training",
    description: "Equip your staff to recognize early signs and support neurodivergent students effectively."
  },
  {
    icon: Users,
    title: "Parent Awareness",
    description: "Help parents understand neurodivergence, reducing stigma and encouraging early action."
  },
  {
    icon: Heart,
    title: "Inclusive Culture",
    description: "Build a more understanding and supportive environment for all children."
  },
  {
    icon: School,
    title: "No Cost to You",
    description: "All sessions are completely FREE. We believe awareness should be accessible to everyone."
  }
];

const defaultHighlights = [
  "Understanding neurodivergence (Autism, ADHD, Learning Disabilities)",
  "Recognizing early signs in children",
  "Breaking myths and reducing stigma",
  "Practical tips for teachers and parents",
  "When and how to seek professional help",
  "Q&A with experienced therapists"
];

const defaultPastSessions = [
  {
    venue: "Jyoti Nivas College, Koramangala",
    audience: "Education Students & Faculty",
    image: "/awareness-jyoti-nivas.jpeg"
  },
  {
    venue: "TISB School, Domasandra",
    audience: "Teachers & Staff",
    image: "/awareness-tisb.jpg"
  }
];

export function AwarenessPage({ data }: { data?: AwarenessProgram }) {
  const pastSessions = data?.events?.map(event => ({
    venue: event.name,
    audience: event.location,
    description: event.description,
    image: "/awareness-tisb.jpg" // Default image if none provided in events array
  })) || defaultPastSessions;

  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Hero Section */}
      <AwarenessHero data={data} />

      {/* What Your School Gets - WIIFM Section */}
      <section className="py-12 lg:py-16 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif text-green mb-3" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              What Your School Gets
            </h2>
            <p className="text-green/60">Tangible benefits for your institution</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-xl p-6 border border-green/5 hover:shadow-lg transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-10 h-10 rounded-lg bg-purple/10 flex items-center justify-center mb-4">
                  <benefit.icon className="w-5 h-5 text-purple" />
                </div>
                <h3 className="font-bold text-green mb-2">{benefit.title}</h3>
                <p className="text-sm text-green/70">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Cover */}
      <section className="py-12 lg:py-16 bg-[#FAF9F5]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-serif text-green mb-6" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                What We Cover
              </h2>
              <p className="text-green/70 mb-6">
                Each session is tailored to your audience—whether teachers, parents, or students. Here's what participants learn:
              </p>
              <ul className="space-y-3">
                {defaultHighlights.map((item, idx) => (
                  <motion.li
                    key={idx}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-purple mt-0.5 shrink-0" />
                    <span className="text-green/80">{item}</span>
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
              <div className="absolute inset-0 bg-purple/10 rounded-2xl transform rotate-2 translate-x-2 translate-y-2" />
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-lg">
                <Image
                  src="/awareness-tisb.jpg"
                  alt="Teacher training session at TISB"
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
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-serif text-green mb-3" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Sessions We've Conducted
            </h2>
            <p className="text-green/60">Real impact in schools and colleges</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {pastSessions.map((session: any, idx: number) => (
              <motion.div
                key={idx}
                className="group relative rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="aspect-[4/3] relative">
                  <Image
                    src={session.image}
                    alt={`Awareness session at ${session.venue}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green/80 via-green/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                  <h3 className="font-bold text-lg">{session.venue}</h3>
                  <p className="text-white/80 text-sm">{session.audience}</p>
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
            className="max-w-2xl mx-auto text-center bg-white rounded-2xl p-8 lg:p-10 border border-green/10 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl lg:text-3xl font-serif text-green mb-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Want to Host a Session?
            </h2>
            <p className="text-green/70 mb-6">
              Bring awareness to your school, college, or organization—completely free. Just reach out and we'll coordinate everything.
            </p>
            <WhatsAppConsultationLink className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-green text-white font-semibold hover:bg-green/90 transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Request a Free Session
          </WhatsAppConsultationLink>

          <p className="mt-4 text-sm text-green/50">
            We'll get back to you within 24 hours
          </p>
        </motion.div>
      </div>
    </section>
  </div>
);
}
