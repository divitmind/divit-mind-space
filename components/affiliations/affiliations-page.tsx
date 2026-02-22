"use client";

import { AffiliationsHero } from "./affiliations-hero";
import { PartnershipShowcase } from "./partnership-showcase";
import { motion } from "motion/react";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { Button } from "@/components/ui/button";

export function AffiliationsPage() {
  return (
    <div className="min-h-screen bg-[#FAF9F5]">
      {/* Hero Section */}
      <AffiliationsHero />

      {/* Partnership Showcase */}
      <PartnershipShowcase />


      {/* Benefits Section */}
      <section className="py-20 md:py-24 bg-[#FAF9F5]">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-serif text-green text-center mb-12 md:mb-16"
            >
              Partnership Benefits
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "Comprehensive Training",
                  description: "Access to evidence-based programs designed by experts in neurodivergent care and education."
                },
                {
                  title: "Professional Development",
                  description: "Skill enhancement courses that prepare educators and professionals for real-world challenges."
                },
                {
                  title: "Parent Empowerment",
                  description: "Specialized guidance for parents to effectively support their neurodivergent children at home."
                },
                {
                  title: "Industry Recognition",
                  description: "Certification and credentials backed by GD Goenka's established reputation in education."
                }
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <div className="relative overflow-hidden rounded-xl bg-white/40 backdrop-blur-sm border border-green/10 p-6 md:p-8 hover:shadow-lg transition-all duration-500 group-hover:border-blue/20">
                    <h3 className="text-xl md:text-2xl font-serif text-green mb-3" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                      {benefit.title}
                    </h3>
                    <p className="text-base text-green/70 leading-relaxed">
                      {benefit.description}
                    </p>

                    {/* Accent dot */}
                    <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-blue opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-linear-to-br from-cream via-[#FAF9F5] to-cream relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-linear-to-br from-blue/10 to-transparent blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-linear-to-tr from-green-lite/10 to-transparent blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            className="max-w-4xl mx-auto text-center space-y-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-serif text-green leading-tight" 
            >
              Explore Partnership Opportunities
            </h2>
            <p className="text-lg md:text-xl text-green/70 leading-relaxed max-w-2xl mx-auto">
              Learn more about our specialized training programs and how you can benefit 
              from this collaborative approach to neurodivergent care and education.
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
              <div className="h-px w-24 bg-linear-to-r from-transparent via-blue/20 to-blue/20" />
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-blue" />
                <div className="w-2 h-2 rounded-full bg-green-lite" />
                <div className="w-2 h-2 rounded-full bg-purple" />
              </div>
              <div className="h-px w-24 bg-linear-to-l from-transparent via-blue/20 to-blue/20" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
