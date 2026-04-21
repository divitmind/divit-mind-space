"use client";

import { motion } from "motion/react";
import { Mail, MapPin, MessageCircle, CheckCircle2, ArrowRight, ShieldCheck, Clock, Navigation, ParkingCircle, ArrowUpCircle } from "lucide-react";
import Image from "next/image";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import type { FAQ, SiteSettings } from "@/lib/types";
import { urlFor } from "@/sanity/lib/image";

interface ContactPageProps {
  faqs: FAQ[];
  faqTitle?: string;
  settings?: SiteSettings | null;
}

const steps = [
  {
    title: "Initial Consultation",
    description: "A free call or chat to understand your needs and guide you on the right path.",
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

export function ContactPage({ faqs, faqTitle = "Frequently Asked Questions", settings }: ContactPageProps) {
  const workingHours = settings?.contact?.workingHours || "Mon - Sat, 9:00 AM - 6:00 PM";
  const trustBadge1 = settings?.contactPage?.trustBadge1 || "HIPAA-Grade Data Privacy & Patient Confidentiality";
  const trustBadge2 = settings?.contactPage?.trustBadge2 || "Response within 15 mins";
  
  // Resolve QR code from Sanity or fallback to local file
  let qrCodeUrl = "/QR_divitmindspace.jpeg";
  if (settings?.contactPage?.qrCode?.asset) {
    try {
      const imgUrl = urlFor(settings.contactPage.qrCode).url();
      if (imgUrl) qrCodeUrl = imgUrl;
    } catch (e) {
      console.error("Error generating QR code URL:", e);
    }
  }

  // Ensure faqs is an array
  const safeFaqs = Array.isArray(faqs) ? faqs : [];

  return (
    <div className="min-h-screen bg-[#FDFBF7]">
      {/* Hero Section */}
      <section className="pt-4 pb-4 lg:pt-6 lg:pb-8 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-serif text-green mb-4 md:mb-6 leading-tight" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              Let&apos;s Build Your <br className="hidden md:block" />
              <span className="italic text-purple font-serif">Unique Journey</span> Together
            </h1>
            {/* AI-First Summary: Optimized for SGE/LLM/GEO */}
            <div className="text-base md:text-lg text-black/70 font-medium max-w-4xl mx-auto mb-8 leading-relaxed">
              <span className="text-green font-bold block mb-2">Bangalore&apos;s Leading Center for Mental Health, Neurodevelopment & Physiotherapy</span>
              <p className="mb-2 text-sm lg:text-base">
                Neuro-affirming care covering Clinical Assessments, Speech, Occupational, Behavioral, Cognitive and Play Therapy, Group Sessions, Counselling, Special Education, NIOS Support and Physiotherapy.
              </p>
              <p className="text-sm lg:text-base italic">
                Helping <span className="font-bold text-black">Children</span>, <span className="font-bold text-black">Teens</span>, & <span className="font-bold text-black">Adults</span> of all ages.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Channels */}
      <section className="pb-8 lg:pb-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
            {/* Featured WhatsApp & QR Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2 bg-white p-6 lg:p-8 rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/[0.02] flex flex-col md:flex-row gap-6 lg:gap-8 items-center"
            >
              <div className="flex-1 text-center md:text-left">
                <div className="w-12 h-12 rounded-2xl bg-green/10 text-green flex items-center justify-center mb-4 mx-auto md:mx-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-green mb-1">WhatsApp & Call</h3>
                <p className="text-lg lg:text-xl font-medium text-black/80 mb-3">+91 99016 66139</p>
                <p className="text-xs text-black/60 font-medium mb-6 leading-relaxed max-w-xs">
                  Best for quick inquiries, booking consultations, and instant support.
                </p>
                <WhatsAppConsultationLink className="dm-pill-button px-8">
                  Chat with us <ArrowRight className="w-4 h-4 ml-2" />
                </WhatsAppConsultationLink>
              </div>
              
              <div className="w-full md:w-px h-px md:h-32 bg-black/5" />

              <div className="w-40 flex-shrink-0 text-center">
                <div className="relative w-28 h-28 lg:w-32 lg:h-32 mx-auto bg-cream rounded-2xl p-2 border border-black/5 mb-3 group">
                  <Image 
                    src={qrCodeUrl}
                    alt="Scan to Connect"
                    fill
                    className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <p className="text-[9px] font-bold text-purple uppercase tracking-[0.2em]">Scan to Connect</p>
              </div>
            </motion.div>

            {/* Email Card */}
            <motion.a
              href="mailto:divitmindspace@gmail.com"
              className="lg:col-span-1 bg-white p-6 lg:p-8 rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/[0.02] hover:shadow-2xl hover:shadow-black/5 transition-all hover:-translate-y-1 group flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-purple/10 text-purple flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-green mb-1">Email Support</h3>
              <p className="text-sm font-medium text-black/80 mb-3 break-all">divitmindspace@gmail.com</p>
              <p className="text-xs text-black/60 font-medium mb-6 leading-relaxed">Send us your reports or detailed queries.</p>
              <div className="mt-auto flex items-center gap-2 text-[10px] font-bold text-green uppercase tracking-[0.2em] group-hover:gap-3 transition-all border-b border-green/20 pb-1">
                Send email <ArrowRight className="w-3 h-3" />
              </div>
            </motion.a>

            {/* Visit Card */}
            <motion.a
              href="https://maps.google.com/?q=Aadeshwar+Chambers+Kasavanahalli+Bengaluru"
              target="_blank"
              rel="noopener noreferrer"
              className="lg:col-span-1 bg-white p-6 lg:p-8 rounded-[2.5rem] border border-black/5 shadow-xl shadow-black/[0.02] hover:shadow-2xl hover:shadow-black/5 transition-all hover:-translate-y-1 group flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-green mb-1">Visit Center</h3>
              <p className="text-xs font-medium text-black/80 mb-3 leading-relaxed">Aadeshwar Chambers, Kasavanahalli, Bangalore 560035</p>
              <p className="text-[10px] text-black/60 font-medium mb-6 leading-relaxed uppercase tracking-wider">{workingHours}</p>
              <div className="mt-auto flex items-center gap-2 text-[10px] font-bold text-green uppercase tracking-[0.2em] group-hover:gap-3 transition-all border-b border-green/20 pb-1">
                Directions <ArrowRight className="w-3 h-3" />
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Map & Landmark Section: The GEO-Engine */}
      <section className="pb-8 lg:pb-12 px-4">
        <div className="container mx-auto">
          <div className="bg-white rounded-[2.5rem] border border-black/5 shadow-2xl shadow-black/[0.02] overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-6 lg:p-12 border-b lg:border-b-0 lg:border-r border-black/5">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green/10 text-green text-[10px] font-bold uppercase tracking-widest mb-4">
                  <Navigation className="w-3.5 h-3.5" />
                  How to reach us
                </div>
                <h2 className="text-2xl lg:text-3xl font-serif text-green mb-6" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
                  Find Us in the <br />
                  <span className="italic text-purple">Heart of Kasavanahalli</span>
                </h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green mb-0.5 text-base">Address Details</h4>
                      <p className="text-xs text-black/60 font-medium leading-relaxed">
                        <span className="text-purple font-bold">Aadeshwar Chambers</span>, Kasavanahalli, Off Sarjapur Road, Bangalore - 560035. Located on the 1st Cross Rd, IAS Layout area.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green mb-0.5 text-base">Key Landmarks</h4>
                      <p className="text-xs text-black/60 font-medium">We are in the <span className="text-purple font-bold">same building as ICICI Bank</span>, opposite Aishwarya Value Mart and right next to La Casa Brewery + Kitchen.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green mb-0.5 text-base">Facility & Accessibility</h4>
                      <div className="flex flex-wrap gap-4 mt-1">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-black/60 uppercase">
                          <ParkingCircle className="w-4 h-4 text-purple" />
                          Ample Basement Parking
                        </div>
                        <div className="flex items-center gap-2 text-[10px] font-bold text-black/60 uppercase">
                          <ArrowUpCircle className="w-4 h-4 text-purple" />
                          Lift Access Available
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green" />
                    </div>
                    <div>
                      <h4 className="font-bold text-green mb-0.5 text-base">Regional Coverage</h4>
                      <p className="text-xs text-black/60 font-medium leading-relaxed">
                        Serving <span className="text-purple font-bold">HSR Layout, Haralur Road, Bellandur, Carmelaram, Varthur</span>, and families within 2 hours from <span className="text-purple font-bold">Hosur, Anekal, Malur, Chandapura</span>, and <span className="text-purple font-bold">Sarjapur Town</span>.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <a 
                    href="https://maps.google.com/?q=Aadeshwar+Chambers+Kasavanahalli+Bengaluru" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="dm-pill-button px-8 inline-flex items-center gap-2"
                  >
                    Open in Google Maps <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div className="h-[300px] lg:h-auto min-h-[300px] bg-cream relative grayscale-[0.2] hover:grayscale-0 transition-all duration-700">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.947239121989!2d77.6744!3d12.9081!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13915f400001%3A0x6d2c4b0b1c0b0b0b!2sAadeshwar%20Chambers!5e0!3m2!1sen!2sin!4v1713500000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                  title="Divit MindSpace Location"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Support You Section */}
      <section className="pt-4 lg:pt-6 pb-6 lg:pb-8 bg-cream px-4 border-y border-black/5">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-6 lg:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-green mb-3 lg:mb-4" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              How We Support You <span className="italic text-purple">From Day 1</span>
            </h2>
            <p className="text-sm text-black/70 font-medium max-w-2xl mx-auto">
              Taking the first step can feel overwhelming. Here is our simple process to ensure you get the best care.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 relative">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx} 
                className="relative bg-white p-6 lg:p-8 rounded-[2rem] border border-black/5 shadow-lg shadow-black/[0.01]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <div className="absolute -top-3 left-6 lg:left-8 bg-purple text-white w-7 h-7 lg:w-8 lg:h-8 rounded-full flex items-center justify-center text-sm lg:text-base font-bold shadow-lg shadow-purple/20">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-green mt-1 lg:mt-2 mb-2 lg:mb-3">{step.title}</h3>
                <p className="text-xs text-black/70 font-medium leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pt-6 lg:pt-8 pb-8 lg:pb-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-6 lg:mb-8">
            <h2 className="text-2xl md:text-3xl font-serif text-green" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
              <span className="italic text-purple font-serif">{faqTitle}</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {safeFaqs.map((faq, idx) => (
              <motion.div 
                key={idx} 
                className="bg-white p-5 lg:p-6 rounded-[2rem] border border-black/5 shadow-xl shadow-black/[0.02]"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="flex items-start gap-3 lg:gap-4 mb-2 lg:mb-3">
                  <div className="w-5 h-5 rounded-full bg-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-green" />
                  </div>
                  <h4 className="text-base font-bold text-green">{faq.question}</h4>
                </div>
                <p className="text-xs text-black/70 font-medium leading-relaxed pl-8 lg:pl-9">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
