"use client";

import { motion } from "motion/react";
import { HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faqs: FAQItem[];
}

export function ServiceFAQ({ faqs }: ServiceFAQProps) {
  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="py-12 bg-[#FAF9F5]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-green/10 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-green" />
            </div>
            <h2
              className="text-2xl lg:text-3xl font-serif text-green"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 lg:p-8 border border-green/10 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-serif text-green mb-3 leading-tight italic">
                  {faq.question}
                </h3>
                <p className="text-black/70 leading-relaxed font-medium">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
