"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Baby, Users, School, Briefcase, CheckCircle2 } from "lucide-react";

const items = [
    {
        id: "children",
        title: "Children",
        subtitle: "With Learning Needs",
        description: "Whether it's bridging gaps in school, building social confidence, or developing daily life skills, we provide personalized support that meets them where they are.",
        icon: Baby,
        color: "bg-[#FDFBF7]",
        accent: "text-[#2F3E33]",
    },
    {
        id: "parents",
        title: "Parents",
        subtitle: "Seeking Guidance",
        description: "Parenting is a journey, and you don't have to walk it alone. We equip you with practical strategies, emotional support, and resources to foster your child's growth at home.",
        icon: Users,
        color: "bg-[#E8ECE9]",
        accent: "text-[#2F3E33]",
    },
    {
        id: "schools",
        title: "Schools",
        subtitle: "& Institutions",
        description: "Create truly inclusive classrooms. We offer expert training for educators and consultation services to help institutions support every student effectively.",
        icon: School,
        color: "bg-[#2F3E33]",
        accent: "text-white",
        dark: true,
    },
    {
        id: "professionals",
        title: "Professionals",
        subtitle: "In Special Ed",
        description: "Advance your career and impact. Our specialized certification programs and workshops are designed to deepen your expertise in special education and therapy.",
        icon: Briefcase,
        color: "bg-[#7C9082]",
        accent: "text-white",
        dark: true,
    },
];

export function WhoNeedsItSection() {
    const [activeId, setActiveId] = useState<string>("children");
    const sectionRef = useRef<HTMLElement>(null);

    // Simple scroll spy logic
    useEffect(() => {
        const handleScroll = () => {
            if (!sectionRef.current) return;

            const cardElements = document.querySelectorAll(".who-needs-it-card");

            cardElements.forEach((card) => {
                const rect = card.getBoundingClientRect();
                // Check if card is roughly in the center of the viewport
                if (rect.top >= 0 && rect.top <= window.innerHeight / 2) {
                    const id = card.getAttribute("data-id");
                    if (id) setActiveId(id);
                }
            });
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="py-20 lg:py-28 bg-white relative">
            <div className="container">

                <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">

                    {/* Left Side: Sticky Image */}
                    <div className="hidden lg:block lg:w-1/2 relative">
                        <div className="sticky top-32 h-[600px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                            <Image
                                src="/who-needs-it.png" // User provided image
                                alt="Who Needs It"
                                fill
                                className="object-cover"
                                priority
                            />
                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-black/10" />

                            {/* Decorative Badge */}
                            <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/50 shadow-lg">
                                <p className="text-[#2F3E33] text-lg font-medium leading-relaxed">
                                    "Every individual has a unique potential waiting to be unlocked. We are here to help find the key."
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right Side: Scrollable Content */}
                    <div className="lg:w-1/2 space-y-24 py-12">

                        <div className="mb-12">
                            <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#E8ECE9] text-[#2F3E33] text-xs font-semibold tracking-wide uppercase mb-4">
                                Who We Serve
                            </div>
                            <h2 className="text-4xl lg:text-5xl font-bold text-[#222222] mb-6">
                                Who Needs It?
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Whether you are seeking support or looking to provide it, we have a place for you.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    data-id={item.id}
                                    className={cn(
                                        "who-needs-it-card group relative p-8 rounded-3xl transition-all duration-500 border-2",
                                        activeId === item.id
                                            ? "bg-white border-[#2F3E33]/10 shadow-xl scale-100 opacity-100"
                                            : "bg-transparent border-transparent opacity-50 scale-95 hover:opacity-80"
                                    )}
                                >
                                    <div className="flex items-start gap-6">
                                        <div className={cn(
                                            "h-14 w-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors duration-300",
                                            item.dark ? "bg-[#2F3E33]" : "bg-[#E8ECE9]",
                                            item.dark ? "text-white" : "text-[#2F3E33]"
                                        )}>
                                            <item.icon className="h-7 w-7" />
                                        </div>
                                        <div className="space-y-3">
                                            <div>
                                                <h3 className="text-2xl font-bold text-[#222222]">{item.title}</h3>
                                                <p className="text-[#2F3E33] font-medium opacity-80">{item.subtitle}</p>
                                            </div>
                                            <p className="text-gray-600 leading-relaxed">
                                                {item.description}
                                            </p>

                                            <div className="pt-2 flex items-center gap-2 text-sm font-bold text-[#2F3E33] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <CheckCircle2 className="h-4 w-4" />
                                                <span>Learn More</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>


                <div className="lg:hidden mb-12 relative h-64 w-full rounded-3xl overflow-hidden shadow-lg border-2 border-white -mt-8">
                    <Image
                        src="/who-needs-it.png"
                        alt="Who Needs It"
                        fill
                        className="object-cover"
                    />
                </div>

            </div>
        </section>
    );
}
