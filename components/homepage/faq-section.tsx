"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

interface FaqItem {
    id: string;
    question: string;
    answer: string | string[];
}

const faqs: FaqItem[] = [
    {
        id: "item-1",
        question: "Why Should I opt for Divit MindSpace for my child development?",
        answer: "Experienced and Qualified Staff: Divit MindSpace has a team of experienced and qualified professionals who are passionate about child development. They have the knowledge and expertise to help your child reach their full potential.",
    },
    {
        id: "item-2",
        question: "How do I trust if my child will get the best treatment at Divit CDC?",
        answer: [
            "It's understandable that you want to make sure your child gets the best possible care at Divit MindSpace. Here are a few things you can do to build your trust:",
            "",
            "• Visit the center in person: This will give you a chance to see the facilities firsthand and meet the staff. You can also ask questions about the curriculum, safety procedures, and anything else that is important to you.",
            "",
            "• Talk to other parents: If you know other parents who have used Divit CDC, ask them about their experiences. They can give you valuable insights into the quality of care that their children received.",
            "",
            "• Read online reviews: There are many websites where parents can leave reviews of child care centers. Reading these reviews can give you a sense of what other parents think of Divit CDC.",
            "",
            "• Schedule a meeting with the director: The director of Divit CDC should be happy to meet with you and answer any questions you have. This is a great opportunity to learn more about the center's philosophy and approach to child development.",
            "",
            "• Follow up with your child: After your child starts attending Divit CDC, be sure to talk to them about their experience. Ask them what they like and dislike about the center, and if they feel like they are learning and growing.",
        ],
    },
    {
        id: "item-3",
        question: "What is the importance of Counseling at Divit CDC?",
        answer: [
            "The importance of counseling at a Divit Child Development Center (CDC) is multifaceted and plays a crucial role in supporting the healthy growth and well-being of children. Here are some key areas where counseling can be incredibly beneficial:",
            "",
            "Emotional Well-being:",
            "",
            "• Developing healthy coping mechanisms: Children face various challenges, from peer pressure to academic struggles, and counseling can equip them with healthy ways to manage their emotions, express themselves, and navigate difficult situations.",
            "",
            "• Addressing anxiety and depression: Children can experience anxiety, depression, and other mental health concerns just like adults. Counseling provides a safe space for them to discuss their feelings, understand their emotions, and learn healthy coping strategies.",
            "",
            "• Trauma support: If a child has experienced trauma, such as abuse or neglect, counseling can be essential in processing their emotions, healing from the experience, and developing resilience.",
            "",
            "Social and Development Skills:",
            "",
            "• Improving communication and social skills: Counseling can help children build confidence in social interactions, develop healthy communication skills, and resolve conflicts constructively.",
            "",
            "• Building self-esteem and self-confidence: By exploring their strengths and challenges, children can develop a positive self-image and gain confidence in their abilities.",
            "",
            "• Supporting transitions and changes: Starting school, making new friends, or experiencing family changes can be challenging for children. Counseling can help them adapt to these transitions and develop resilience.",
            "",
            "Academic Achievement:",
            "",
            "• Identifying and addressing learning difficulties: Counseling can help identify underlying reasons for academic struggles, such as anxiety, attention difficulties, or processing challenges. Through collaborative efforts with teachers and parents, appropriate support can be provided to address these difficulties and improve academic performance.",
            "",
            "• Building motivation and academic skills: Counseling can help children develop study habits, improve time management, and increase their motivation to learn.",
            "",
            "Parental Support:",
            "",
            "• Providing guidance and support for parents: Parenting can be challenging, and counselors can offer guidance and support to parents on understanding their child's behavior, setting boundaries, and establishing healthy communication.",
            "",
            "• Facilitating family communication: Counseling can help families improve communication, resolve conflicts constructively, and build stronger relationships.",
            "",
            "Overall, counseling at a CDC can be a valuable resource for families raising children, promoting their emotional well-being, social and cognitive development, and academic success. By providing early intervention and support, counseling can equip children with the tools and skills needed to navigate life's challenges and thrive.",
            "",
            "Remember, if you are considering counseling for your child, it's important to choose a qualified and experienced counselor who specializes in working with children.",
        ],
    },
];

function renderAnswer(answer: FaqItem["answer"]) {
    if (typeof answer === "string") {
        return <p>{answer}</p>;
    }
    return (
        <div className="space-y-2">
            {answer.map((line, i) => {
                if (line === "") {
                    return <div key={i} className="h-2" aria-hidden />;
                }
                if (line.startsWith("• ")) {
                    return (
                        <div key={i} className="flex gap-2">
                            <span className="text-green shrink-0 font-medium">•</span>
                            <span>{line.slice(2)}</span>
                        </div>
                    );
                }
                if (line.endsWith(":") && line.length < 80) {
                    return (
                        <h4
                            key={i}
                            className="font-semibold text-[#2F3E33] mt-4 mb-1 first:mt-0 text-base"
                        >
                            {line}
                        </h4>
                    );
                }
                return <p key={i}>{line}</p>;
            })}
        </div>
    );
}

export function FaqSection() {
    const [openId, setOpenId] = useState<string | null>("item-1");

    return (
        <section className="py-16 lg:py-24 bg-cream relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center text-purple text-sm font-bold tracking-widest uppercase mb-3">
                        Common Queries
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold text-green mb-4 tracking-tight">
                        Frequently Asked Questions
                    </h2>
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
                                        : "bg-white border-transparent hover:bg-gray-50"
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
                                        isOpen ? "bg-green text-white rotate-180" : "bg-[#E8ECE9] text-green group-hover:bg-[#dce2de]"
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
                                                {renderAnswer(faq.answer)}
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
            <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-transparent via-gray-200 to-transparent" />
            <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#E8ECE9]/50 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#FDFBF7] rounded-full blur-3xl -z-10" />

        </section>
    );
}
