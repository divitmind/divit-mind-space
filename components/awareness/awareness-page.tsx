"use client";

import { AwarenessHero } from "./awareness-hero";
import { ProgramCard } from "./program-card";
import { motion } from "motion/react";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { Button } from "@/components/ui/button";

interface Program {
  title: string;
  content: string[];
  image: string;
  imageAlt: string;
}

const programs: Program[] = [
  {
    title: "Awareness Workshop at Jyoti Nivas College, Koramangala",
    content: [
      "At Divit MindSpace, our Awareness Program targets the critical lack of awareness, knowledge, and persistent myths about early intervention for neurodivergent children. These gaps often result in children missing out on essential therapies, limiting their ability to reach their full potential. We see this as a shared responsibility to educate and empower communities for meaningful change.",
      "We provide FREE awareness sessions across preschools, schools, colleges, institutes, and organizations, ensuring broad access for teachers, parents, and individuals. These sessions highlight the importance of early intervention, its proven benefits, and its role in fostering growth and independence. Our aim is to equip attendees with clear, actionable understanding.",
    ],
    image: "/awareness-jyoti-nivas.jpeg",
    imageAlt: "Awareness workshop session at Jyoti Nivas College with teachers and educators learning about early intervention for neurodivergent children"
  },
  {
    title: "Awareness Session for Teachers at TISB School, Domasandra",
    content: [
      "Participants learn to recognize early signs of neurodivergence and explore practical ways to support and guide those in need, from connecting families to resources to offering informed support. We also focus on breaking the stigma tied to neurodivergence, replacing myths with facts to build a more compassionate perspective. This empowers communities to act with confidence.",
      "By fostering awareness and encouraging responsibility, we strive to create a truly inclusive society where neurodivergent children can thrive and families feel supported. This effort not only uplifts individual lives but also aligns with Divit MindSpace's mission to drive lasting impact. Together, we're building a future where every child's potential is unlocked."
    ],
    image: "/awareness-tisb.jpg",
    imageAlt: "Teacher awareness session at TISB School focusing on recognizing early signs of neurodivergence and creating inclusive classrooms"
  }
];

export function AwarenessPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Hero Section */}
      <AwarenessHero />

      {/* Introduction Section */}
      <section className="py-16 md:py-20 bg-[#FAF9F5]">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-green leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Our Mission: Education for Impact
            </h2>
            <p className="text-lg md:text-xl text-green/70 leading-relaxed">
              We believe awareness is the foundation of change. Through our community outreach programs, we bridge the gap between knowledge and action, empowering educators, parents, and individuals to recognize, support, and advocate for neurodivergent children.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Programs Section */}
      <section className="py-20 md:py-28 bg-linear-to-b from-[#FAF9F5] to-cream">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <motion.div
            className="max-w-3xl mb-16 md:mb-24"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-green mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Community Workshops
            </h2>
            <div className="h-1 w-32 bg-linear-to-r from-yellow via-purple to-transparent rounded-full" />
          </motion.div>

          {/* Program Cards with Generous Spacing */}
          <div className="space-y-32 md:space-y-40">
            {programs.map((program, index) => (
              <ProgramCard
                key={index}
                title={program.title}
                content={program.content}
                image={program.image}
                imageAlt={program.imageAlt}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-20 md:py-24 bg-cream">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-6xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { value: "100%", label: "Free Sessions", color: "yellow" },
                { value: "Schools & Colleges", label: "Community Reach", color: "purple" },
                { value: "Breaking Stigma", label: "Building Understanding", color: "green-lite" }
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  className="text-center flex flex-col items-center justify-center space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <div className={`text-4xl md:text-5xl lg:text-6xl text-green font-bold`}>
                    {stat.value}
                  </div>
                  <div className="text-base md:text-lg text-green/70">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-[#FAF9F5] relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-linear-to-br from-purple/5 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-linear-to-tr from-yellow/5 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-green leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Request an Awareness Session
            </h2>
            <p className="text-lg md:text-xl text-green/70 leading-relaxed max-w-2xl mx-auto">
              Interested in hosting an awareness session at your school, college, or organization?
              We&apos;d love to bring our program to your community—completely free of charge.
            </p>

            <motion.div
              className="pt-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                asChild
                className="h-14 px-8 text-lg bg-green hover:bg-green/90 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <WhatsAppConsultationLink>
                  Get in Touch
                </WhatsAppConsultationLink>
              </Button>
            </motion.div>

            {/* Decorative elements */}
            <div className="flex justify-center items-center gap-4 pt-8">
              <div className="h-px w-24 bg-linear-to-r from-transparent via-green/20 to-green/20" />
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow" />
                <div className="w-2 h-2 rounded-full bg-purple" />
                <div className="w-2 h-2 rounded-full bg-green-lite" />
              </div>
              <div className="h-px w-24 bg-linear-to-l from-transparent via-green/20 to-green/20" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
