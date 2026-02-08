"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
    id: string;
    question: string;
    answer: string;
}

const faqs: FaqItem[] = [
    {
        id: "item-1",
        question: "Do I need a referral to book an assessment?",
        answer: "No, you do not need a referral. You can book an appointment directly with us. However, if you have any reports from schools or other professionals, please bring them along.",
    },
    {
        id: "item-2",
        question: "What happens during the initial consultation?",
        answer: "The initial consultation is a casual conversation where we listen to your concerns, understand your child's history, and discuss your goals. It helps us recommend the right assessments or therapy plan.",
    },
    {
        id: "item-3",
        question: "Do you offer online therapy sessions?",
        answer: "Yes, we offer online options for parent guidance and certain types of therapy. However, assessments and some interventions are best conducted in person for accuracy and effectiveness.",
    },
    {
        id: "item-4",
        question: "How long does a typical assessment take?",
        answer: "A comprehensive assessment usually takes 2-3 sessions, spread over a few days. This ensures your child is comfortable and performs their best without fatigue.",
    },
    {
        id: "item-5",
        question: "My child is very young. Is it too early to seek help?",
        answer: "Early intervention is key. If you have concerns about your child's development, it is never too early to seek professional advice. We work with children as young as 18 months.",
    },
];

export function FaqSection() {
    const [openId, setOpenId] = useState<string | null>("item-1");

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#E8ECE9] text-[#2F3E33] text-xs font-semibold tracking-wide uppercase mb-4">
                        Common Queries
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold text-[#222222] mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Answers to common questions about our services and process.
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq) => {
                        const isOpen = openId === faq.id;

                        return (
                            <div
                                key={faq.id}
                                onClick={() => setOpenId(isOpen ? null : faq.id)}
                                className={cn(
                                    "group rounded-2xl border transition-all duration-300 cursor-pointer overflow-hidden",
                                    isOpen
                                        ? "bg-[#FDFBF7] border-[#2F3E33]/20 shadow-sm"
                                        : "bg-white border-transparent hover:bg-gray-50 border-gray-100"
                                )}
                            >
                                <div className="p-6 flex items-center justify-between gap-4">
                                    <h3 className={cn(
                                        "text-lg font-bold transition-colors duration-300",
                                        isOpen ? "text-[#2F3E33]" : "text-[#222222]"
                                    )}>
                                        {faq.question}
                                    </h3>
                                    <div className={cn(
                                        "h-8 w-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300",
                                        isOpen ? "bg-[#2F3E33] text-white rotate-180" : "bg-[#E8ECE9] text-[#2F3E33] group-hover:bg-[#dce2de]"
                                    )}>
                                        {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                                    </div>
                                </div>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        >
                                            <div className="px-6 pb-6 pt-0 text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#E8ECE9]/50 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FDFBF7] rounded-full blur-3xl -z-10" />

        </section>
    );
}
