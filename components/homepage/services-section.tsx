import Link from "next/link";
import { ArrowRight, FileText, Heart, Users, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceListItem } from "@/sanity/types";

const services = [
    {
        id: "assessments",
        label: "Assessments",
        icon: FileText,
        outcome: "Stop guessing. Get answers and a clear path forward",
        route: "/services?category=assessments",
        color: "bg-white",
        iconBg: "bg-black/5",
        textColor: "text-black",
    },
    {
        id: "therapy",
        label: "Therapy",
        icon: Heart,
        outcome: "See real progress in confidence and daily life",
        route: "/services?category=therapy",
        color: "bg-white",
        iconBg: "bg-black/5",
        textColor: "text-black",
    },
    {
        id: "parent-guidance",
        label: "Guidance",
        icon: Users,
        outcome: "Know exactly how to help & see it work",
        route: "/services?category=guidance",
        color: "bg-white",
        iconBg: "bg-black/5",
        textColor: "text-black",
    },
    {
        id: "learning",
        label: "Programs",
        icon: GraduationCap,
        outcome: "Learn in ways that actually click",
        route: "/services?category=programs",
        color: "bg-white",
        iconBg: "bg-black/5",
        textColor: "text-black",
    },
];

interface ServicesSectionProps {
    therapyServices?: ServiceListItem[];
}

export function ServicesSection({ therapyServices = [] }: ServicesSectionProps) {
    return (
        <section className="pt-2 pb-4 lg:pt-4 lg:pb-8 bg-[#FDFBF7]">
            <div className="container">

                {/* Bridge Text */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                    <span className="text-black/40 text-[10px] font-bold uppercase tracking-widest">
                        Here&apos;s how we help
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">
                    {services.map((service) => (
                        <Link
                            key={service.id}
                            href={service.route}
                            className={cn(
                                "group relative flex flex-col p-10 rounded-[2rem] border border-black/5 transition-all duration-500 hover:border-black/10 card-premium shadow-premium-sm hover:shadow-premium-lg",
                                service.color
                            )}
                        >
                            {/* Icon */}
                            <div className={cn(
                                "w-12 h-12 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500 group-hover:bg-black/10 group-hover:scale-110",
                                service.iconBg
                            )}>
                                <service.icon className={cn("h-6 w-6 text-black transition-transform duration-500 group-hover:scale-105")} />
                            </div>

                            {/* Title (Serif Italic - Unified) */}
                            <h3 className="text-2xl font-bold text-black mb-4 font-[family-name:var(--font-cormorant)] italic leading-tight">
                                {service.label}
                            </h3>

                            {/* Description (Outcome - Unified Sans) */}
                            <p className="text-base text-black/60 font-medium leading-relaxed mb-8 flex-grow">
                                {service.outcome}
                            </p>

                            {/* Footer Link */}
                            <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                                Explore Service
                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
