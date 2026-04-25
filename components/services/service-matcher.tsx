"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, RefreshCcw, MessageSquare } from "lucide-react";
import Link from "next/link";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";

const questions = [
  {
    id: "audience",
    question: "Who are you seeking support for?",
    options: [
      { label: "Child or Teenager", value: "child" },
      { label: "Adult (Self or Other)", value: "adult" },
    ],
  },
  {
    id: "concern",
    question: "What is your primary area of concern?",
    options: [
      { label: "Speech & Communication", value: "speech" },
      { label: "Focus, Hyperactivity or Learning", value: "adhd" },
      { label: "Daily Skills & Sensory Processing", value: "sensory" },
      { label: "Emotional Support or Counseling", value: "emotional" },
      { label: "Physical Mobility or Pain", value: "physical" },
    ],
  },
  {
    id: "goal",
    question: "What is your immediate goal?",
    options: [
      { label: "I need a formal clinical assessment", value: "assessment" },
      { label: "I need ongoing therapy or support", value: "therapy" },
    ],
  },
];

const recommendations: Record<string, { title: string; slug: string; description: string }> = {
  "child-speech-therapy": {
    title: "Speech Therapy",
    slug: "speech-therapy",
    description: "Expert support for language development, articulation, and communication confidence.",
  },
  "child-adhd-assessment": {
    title: "Psychometric Assessments",
    slug: "psychometric-assessments",
    description: "Formal evaluations for ADHD, autism, and learning styles to create a roadmap for school.",
  },
  "child-sensory-therapy": {
    title: "Occupational Therapy",
    slug: "occupational-therapy",
    description: "Developing motor skills and managing sensory needs for daily life success.",
  },
  "adult-physical-therapy": {
    title: "Physiotherapy",
    slug: "pain-management",
    description: "Professional care for pain management, rehab, and physical well-being.",
  },
  // Fallback / default
  "default": {
    title: "Free Consultation",
    slug: "",
    description: "Every journey is unique. Speak directly with our clinical leads to find the perfect path.",
  }
};

export function ServiceMatcher() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<typeof recommendations["default"] | null>(null);

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (finalAnswers: Record<string, string>) => {
    const key = `${finalAnswers.audience}-${finalAnswers.concern}-${finalAnswers.goal}`;
    
    // Logic for matching
    let match = recommendations[key];
    
    if (!match) {
      if (finalAnswers.concern === "speech") match = recommendations["child-speech-therapy"];
      else if (finalAnswers.goal === "assessment") match = recommendations["child-adhd-assessment"];
      else if (finalAnswers.physical === "physical") match = recommendations["adult-physical-therapy"];
      else match = recommendations["default"];
    }
    
    setResult(match);
  };

  const reset = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
  };

  return (
    <div className="max-w-2xl mx-auto min-h-[400px] flex flex-col justify-center">
      <AnimatePresence mode="wait">
        {!result ? (
          <motion.div
            key={`step-${step}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            <div className="space-y-2 text-center md:text-left">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green/60">
                Step {step + 1} of {questions.length}
              </span>
              <h2 className="text-3xl md:text-4xl font-serif italic text-black">
                {questions[step].question}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {questions[step].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className="p-6 text-left bg-white border border-black/5 rounded-[1.5rem] hover:border-green hover:bg-green/5 transition-all group flex items-center justify-between"
                >
                  <span className="text-lg font-medium text-black/70 group-hover:text-green">
                    {option.label}
                  </span>
                  <ChevronRight className="w-5 h-5 text-black/10 group-hover:text-green group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center space-y-8 p-8 bg-white rounded-[2.5rem] border border-black/5 shadow-2xl"
          >
            <div className="w-16 h-16 bg-green/10 rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="w-8 h-8 text-green" />
            </div>
            
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-green/60">We Recommend</span>
              <h2 className="text-3xl md:text-4xl font-serif italic text-black">{result.title}</h2>
              <p className="text-black/60 font-medium max-w-md mx-auto leading-relaxed">
                {result.description}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {result.slug ? (
                <Link href={`/services/${result.slug}`} className="dm-pill-button dm-pill-button-primary">
                  Learn About {result.title}
                </Link>
              ) : (
                <WhatsAppConsultationLink className="dm-pill-button dm-pill-button-primary">
                  Ask a Specialist
                </WhatsAppConsultationLink>
              )}
              
              <button 
                onClick={reset}
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-black/5 text-black/40 hover:text-black transition-all text-xs font-bold uppercase tracking-widest"
              >
                <RefreshCcw className="w-3.5 h-3.5" />
                Start Over
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
