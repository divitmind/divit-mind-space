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
      <section className="pt-10 pb-6 lg:pt-16 lg:pb-10 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-green mb-6 md:mb-8 leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Let&apos;s Build Your <br className="hidden md:block" />
              <span className="italic text-purple font-serif">Unique Journey</span> Together
            </h1>
            <p className="text-lg md:text-xl text-black/70 font-medium max-w-2xl mx-auto mb-8 md:mb-10">
              Professional therapy and developmental support for children, teens, adults, and families. 
              We&apos;re here to provide expert guidance whenever you&apos;re ready.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="pb-12 lg:pb-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {contactDetails.map((detail, idx) => (
              <motion.a
                key={idx}
                href={detail.link}
                target={detail.icon === MapPin ? "_blank" : undefined}
                rel={detail.icon === MapPin ? "noopener noreferrer" : undefined}
                className="bg-white p-8 lg:p-10 rounded-[2rem] border border-black/5 shadow-xl shadow-black/[0.02] hover:shadow-2xl hover:shadow-black/5 transition-all hover:-translate-y-1 group flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className={`w-14 h-14 lg:w-16 lg:h-16 rounded-2xl ${detail.color} flex items-center justify-center mb-6 lg:mb-8 group-hover:scale-110 transition-transform`}>
                  <detail.icon className="w-6 h-6 lg:w-8 lg:h-8" />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-green mb-2 lg:mb-3">{detail.title}</h3>
                <p className="text-lg lg:text-xl font-medium text-black/80 mb-3 lg:mb-4">{detail.value}</p>
                <p className="text-sm text-black/60 font-medium mb-6 lg:mb-8 max-w-[240px] leading-relaxed">{detail.description}</p>
                <div className="mt-auto flex items-center gap-2 text-[10px] lg:text-xs font-bold text-green uppercase tracking-[0.2em] group-hover:gap-3 transition-all border-b border-green/20 pb-1">
                  {detail.actionText} <ArrowRight className="w-3 h-3 lg:w-4 h-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* How We Support You Section */}
      <section className="py-12 lg:py-16 bg-cream px-4 border-y border-black/5">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-10 lg:mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-green mb-4 lg:mb-6" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              How We Support You <span className="italic text-purple">From Day 1</span>
            </h2>
            <p className="text-lg text-black/70 font-medium max-w-2xl mx-auto">
              Taking the first step can feel overwhelming. Here is our simple process to ensure you get the best care.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 relative">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx} 
                className="relative bg-white p-8 lg:p-10 rounded-[2rem] border border-black/5 shadow-lg shadow-black/[0.01]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="absolute -top-4 left-8 lg:left-10 bg-purple text-white w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-base lg:text-lg font-bold shadow-lg shadow-purple/20">
                  {idx + 1}
                </div>
                <h3 className="text-xl font-bold text-green mt-2 lg:mt-4 mb-3 lg:mb-4">{step.title}</h3>
                <p className="text-sm text-black/70 font-medium leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 lg:mt-16 text-center">
            <WhatsAppConsultationLink className="dm-pill-button px-10">
              Start Your Consultation Now
            </WhatsAppConsultationLink>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 lg:py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-3xl md:text-4xl font-serif text-green mb-4 lg:mb-6" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Common <span className="italic text-purple font-serif">Questions</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white p-6 lg:p-8 rounded-[2rem] border border-black/5 shadow-xl shadow-black/[0.02]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-3 lg:gap-4 mb-3 lg:mb-4">
                  <div className="w-6 h-6 rounded-full bg-green/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-3 h-3 text-green" />
                  </div>
                  <h4 className="text-lg font-bold text-green">{faq.question}</h4>
                </div>
                <p className="text-sm text-black/70 font-medium leading-relaxed pl-9 lg:pl-10">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-12 lg:pb-20 px-4">
        <div className="container mx-auto">
          <div className="rounded-[2.5rem] overflow-hidden h-[280px] md:h-[400px] shadow-2xl shadow-black/10 border-8 border-white relative group">
             <div className="absolute inset-0 bg-[#F5F1E9] flex items-center justify-center p-4">
                <div className="text-center max-w-md">
                    <div className="w-16 h-16 lg:w-20 lg:h-20 bg-green/5 rounded-full flex items-center justify-center mx-auto mb-6 lg:mb-8 group-hover:scale-110 transition-transform duration-500">
                        <MapPin className="w-8 h-8 lg:w-10 lg:h-10 text-green" />
                    </div>
                    <h3 className="text-xl lg:text-2xl font-serif text-green mb-3 lg:mb-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>Our Location</h3>
                    <p className="text-black/70 font-medium mb-6 lg:mb-8">Aadeshwar Chambers, Kasavanahalli, <br />Off Sarjapur Road, Bengaluru</p>
                    <a 
                        href="https://maps.google.com/?q=Aadeshwar+Chambers+Kasavanahalli+Bengaluru" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-[10px] lg:text-xs font-bold text-green uppercase tracking-widest border-b-2 border-green/20 pb-1 hover:border-green hover:gap-3 transition-all"
                    >
                        View on Google Maps <ArrowRight className="w-3 h-3 lg:w-4 lg:h-4" />
                    </a>
                </div>
             </div>
             <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#004540_1px,transparent_1px)] [background-size:24px_24px]" />
          </div>
        </div>
      </section>
    </div>
  );
}


