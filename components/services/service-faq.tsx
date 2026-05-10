"use client";

import { motion } from "motion/react";
import { HelpCircle, Plus, Minus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <section className="pt-4 pb-2 bg-[#FAF9F5]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
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

          {/* Accordion List */}
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-white rounded-2xl border border-green/10 shadow-sm hover:shadow-md transition-all overflow-hidden border-none"
              >
                <AccordionTrigger className="px-6 lg:px-8 py-5 hover:no-underline group focus:outline-none border-none">
                  <span className="text-lg lg:text-xl font-serif text-green text-left leading-tight italic pr-8">
                    {faq.question}
                  </span>
                  {/* Custom icons to override default chevrons if needed, but we'll use a wrapper style */}
                </AccordionTrigger>
                <AccordionContent className="px-6 lg:px-8 pb-6 lg:pb-8">
                  <p className="text-black/70 text-sm lg:text-base leading-relaxed font-medium">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
              },
            })),
          }),
        }}
      />
    </section>
  );
}
