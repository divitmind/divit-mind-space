"use client";

import { AffiliationsHero } from "./affiliations-hero";
import { PartnershipShowcase } from "./partnership-showcase";
import { motion } from "motion/react";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";

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

      {/* CTA Section - matching homepage style */}
      <section className="pt-2 lg:pt-6 pb-6 lg:pb-10 bg-[#FAF9F5] px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-[2.5rem] border border-black/5 p-6 md:p-10 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-black/5"
          >
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* WhatsApp Icon Circle */}
              <div className="w-20 h-20 rounded-full bg-[#7A9A7D] flex items-center justify-center shrink-0 shadow-lg">
                <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>

              {/* Text */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-4xl font-bold text-black font-[family-name:var(--font-cormorant)] italic mb-2">
                  Explore Partnership Opportunities
                </h2>
                <p className="text-lg text-black/60 font-medium">
                  Message us on WhatsApp to learn more.
                </p>
              </div>
            </div>

            <WhatsAppConsultationLink className="dm-pill-button dm-pill-button-primary scale-125 whitespace-nowrap">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Get in Touch
            </WhatsAppConsultationLink>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
