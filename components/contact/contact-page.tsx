"use client";

import { motion } from "motion/react";
import { Phone, Mail, MapPin, MessageCircle, Clock, CheckCircle2, ArrowRight } from "lucide-react";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import Image from "next/image";

const contactDetails = [
  {
    icon: MessageCircle,
    title: "WhatsApp & Call",
    value: "+91 99016 66139",
    description: "Best for quick inquiries and booking consultations.",
    link: "https://wa.me/919901666139",
    actionText: "Chat with us",
    color: "bg-green/10 text-green",
  },
  {
    icon: Mail,
    title: "Email Support",
    value: "divitmindspace@gmail.com",
    description: "Send us your reports or detailed queries.",
    link: "mailto:divitmindspace@gmail.com",
    actionText: "Send an email",
    color: "bg-purple/10 text-purple",
  },
  {
    icon: MapPin,
    title: "Visit Our Center",
    value: "Aadeshwar Chambers, Kasavanahalli, Off Sarjapur Road, Bengaluru",
    description: "Open Monday - Saturday, 10:00 AM - 7:00 PM.",
    link: "https://maps.google.com/?q=Aadeshwar+Chambers+Kasavanahalli+Bengaluru",
    actionText: "Get directions",
    color: "bg-amber-100 text-amber-700",
  },
];

const steps = [
  {
    title: "Initial Consultation",
    description: "A 15-minute free call or chat to understand your needs and guide you on the right path.",
  },
  {
    title: "Comprehensive Evaluation",
    description: "In-depth clinical or educational assessment by our expert team to identify strengths and needs.",
  },
  {
    title: "Tailored Support Plan",
    description: "A personalized roadmap with evidence-based interventions designed for your specific goals.",
  },
];

const faqs = [
  {
    question: "Do I need a prior diagnosis to contact you?",
    answer: "No, you don't. We provide full diagnostic assessments for all age groups. You can reach out even if you just have concerns or questions.",
  },
  {
    question: "How soon can I get an appointment?",
    answer: "We typically schedule initial consultations within 24-48 hours. Clinical assessments are scheduled based on specialist availability.",
  },
  {
    question: "Do you offer support for adults?",
    answer: "Yes, we support neurodivergent individuals of all ages — children, teens, and adults — through assessments and guidance.",
  },
];

export function ContactPage() {
  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="pt-8 pb-4 lg:pt-12 lg:pb-8 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif text-green mb-4 md:mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Let&apos;s Build Your <br className="hidden md:block" />
              <span className="italic text-purple">Unique Journey</span> Together
            </h1>
            <p className="text-base md:text-lg text-green/70 max-w-2xl mx-auto mb-8 md:mb-10">
              Professional therapy and developmental support for children, teens, adults, and families. 
              We&apos;re here to provide expert guidance whenever you&apos;re ready.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-8 md:pb-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {contactDetails.map((detail, idx) => (
              <motion.a
                key={idx}
                href={detail.link}
                target={detail.icon === MapPin ? "_blank" : undefined}
                rel={detail.icon === MapPin ? "noopener noreferrer" : undefined}
                className="bg-white p-6 md:p-8 rounded-2xl border border-green/5 shadow-sm hover:shadow-md transition-all group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl ${detail.color} flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform`}>
                  <detail.icon className="w-5 h-5 md:w-6 md:h-6" />
                </div>
                <h3 className="text-lg md:text-xl font-bold text-green mb-2">{detail.title}</h3>
                <p className="text-base md:text-lg font-medium text-green/90 mb-2 md:mb-3">{detail.value}</p>
                <p className="text-xs md:text-sm text-green/60 mb-4 md:mb-6">{detail.description}</p>
                <div className="flex items-center gap-2 text-[10px] md:text-sm font-bold text-green uppercase tracking-wider group-hover:gap-3 transition-all">
                  {detail.actionText} <ArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* WIIFM Section - What to Expect */}
      <section className="py-8 md:py-12 bg-cream px-4 border-y border-green/5">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-6 md:mb-10">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-green mb-3 md:mb-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              How We Support You From Day 1
            </h2>
            <p className="text-sm md:text-base text-green/70">
              Taking the first step can feel overwhelming. Here is our simple process to ensure you get the best care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-1/4 left-0 right-0 h-0.5 bg-green/5 -z-10" />
            
            {steps.map((step, idx) => (
              <motion.div 
                key={idx} 
                className="relative bg-white p-6 md:p-8 rounded-2xl border border-green/5"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="absolute -top-3 md:-top-4 left-6 md:left-8 bg-green text-white w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-sm md:text-base font-bold">
                  {idx + 1}
                </div>
                <h3 className="text-lg md:text-xl font-bold text-green mt-2 mb-2 md:mb-3">{step.title}</h3>
                <p className="text-xs md:text-sm text-green/70 leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 md:mt-10 text-center">
            <WhatsAppConsultationLink className="inline-flex items-center justify-center gap-2 h-10 md:h-12 px-6 md:px-8 rounded-full bg-green text-white text-sm md:text-base font-semibold hover:bg-green/90 transition-all">
              Start Your Consultation Now
            </WhatsAppConsultationLink>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-8 md:py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-green mb-3 md:mb-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Common Questions
            </h2>
          </div>
          <div className="space-y-4 md:space-y-6">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white p-5 md:p-6 rounded-xl border border-green/5 shadow-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-sm md:text-base font-bold text-green mb-2">{faq.question}</h4>
                <p className="text-xs md:text-sm text-green/70 leading-relaxed">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-8 md:pb-12 px-4">
        <div className="container mx-auto">
          <div className="rounded-2xl md:rounded-3xl overflow-hidden h-[180px] md:h-[220px] shadow-lg border-2 md:border-4 border-white relative group">
             {/* Placeholder for map */}
             <div className="absolute inset-0 bg-green/5 flex items-center justify-center p-4">
                <div className="text-center">
                    <MapPin className="w-10 h-10 md:w-12 md:h-12 text-green/20 mx-auto mb-3 md:mb-4" />
                    <p className="text-sm md:text-base text-green/40 font-medium">Map Location: Kasavanahalli, Bengaluru</p>
                    <a 
                        href="https://maps.google.com/?q=Aadeshwar+Chambers+Kasavanahalli+Bengaluru" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="mt-3 md:mt-4 inline-block text-xs md:text-sm font-bold text-green underline underline-offset-4"
                    >
                        View on Google Maps
                    </a>
                </div>
             </div>
             {/* Simple visual representation of a map area */}
             <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#004540_1px,transparent_1px)] [background-size:20px_20px]" />
          </div>
        </div>
      </section>
    </div>
  );
}
