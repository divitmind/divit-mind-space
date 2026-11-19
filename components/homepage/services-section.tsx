import Link from "next/link";
import { ArrowRight, FileText, Heart, Users, GraduationCap, Compass, ClipboardList, Activity, Sparkles } from "lucide-react";
import type { ServiceCategoryCard } from "@/lib/types";

// Default fallback services
const DEFAULT_SERVICES = [
    {
        id: "assessments",
        label: "Assessments HUB",
        icon: "clipboard" as const,
        outcome: "Stop guessing. Get answers and a clear path forward",
        route: "/services?category=assessments",
    },
    {
        id: "therapy",
        label: "Therapy",
        icon: "heart" as const,
        outcome: "See real progress in confidence and daily life",
        route: "/services?category=therapy",
    },
    {
        id: "parent-guidance",
        label: "Counselling",
        icon: "compass" as const,
        outcome: "Know exactly how to help & see it work",
        route: "/services?category=guidance",
    },
    {
        id: "physiotherapy",
        label: "Physiotherapy",
        icon: "activity" as const,
        outcome: "Expert care for movement, strength and recovery",
        route: "/services?category=physiotherapy",
    },
    {
        id: "learning",
        label: "Programs",
        icon: "graduation" as const,
        outcome: "Learn in ways that actually click",
        route: "/services?category=programs",
    },
];

// Icon mapping
const iconMap = {
    clipboard: ClipboardList,
    heart: Heart,
    compass: Compass,
    graduation: GraduationCap,
    users: Users,
    filetext: FileText,
    activity: Activity,
};

interface ServicesSectionProps {
    serviceCategories?: ServiceCategoryCard[];
}

export function ServicesSection({ serviceCategories }: ServicesSectionProps) {
    // Use Sanity data with fallback to defaults
    const services = serviceCategories?.length ? serviceCategories.map((cat, idx) => ({
        id: `cat-${idx}`,
        label: cat.title,
        icon: cat.icon || "clipboard",
        outcome: cat.outcome,
        route: cat.href,
    })) : DEFAULT_SERVICES;

    return (
        <section className="py-6 lg:py-8 bg-[#FDFBF7]">
            <div className="container">

                {/* Bridge Text */}
                <div className="flex items-center gap-4 mt-4 mb-6 lg:mt-6 lg:mb-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                    <span className="text-black/40 text-[10px] font-bold uppercase tracking-widest">
                        Here&apos;s how we help
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                </div>

                {/* Services Grid - Optimized for Tablet Stability (3 cols on tablets, 5 on desktop) */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-6">
                    {services.map((service, idx) => {
                        const IconComponent = iconMap[service.icon as keyof typeof iconMap] || FileText;
                        return (
                            <Link
                                key={service.id}
                                href={service.route}
                                className="group relative flex flex-col p-4 lg:p-6 xl:p-8 rounded-[1.5rem] lg:rounded-[2rem] border border-black/5 transition-all duration-500 bg-white hover:shadow-2xl hover:shadow-black/5 hover:border-black/10"
                            >
                                {/* Icon */}
                                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 transition-all group-hover:scale-105 bg-[#E8D5B7]">
                                    <IconComponent className="h-5 w-5 lg:h-6 lg:w-6 text-[#7A9A7D]" />
                                </div>

                                {/* Title (Serif Italic - Unified) */}
                                <h3 className="text-lg lg:text-xl font-bold text-black mb-2 lg:mb-3 font-[family-name:var(--font-cormorant)] italic leading-tight">
                                    {service.label}
                                </h3>

                                {/* Description (Outcome - Unified Sans) */}
                                <p className="text-[12px] lg:text-sm text-black/60 font-medium leading-relaxed mb-4 lg:mb-6 flex-grow line-clamp-3 lg:line-clamp-none">
                                    {service.outcome}
                                </p>

                                {/* Footer Link */}
                                <span className="flex items-center gap-2 text-[9px] lg:text-[10px] font-bold uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                                    Explore Service
                                    <ArrowRight className="h-3 w-3 lg:h-3.5 lg:w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                                </span>
                            </Link>
                        );
                    })}
                </div>

                {/* Highlighted Service: Psychiatric Consultation */}
                <div className="mt-6 lg:mt-8">
                    <div className="relative overflow-hidden rounded-[1.5rem] lg:rounded-[2rem] border border-black/5 bg-white p-5 lg:p-8 shadow-xl shadow-black/[0.02] hover:border-black/10 transition-all duration-500">
                        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                            <div className="flex items-start gap-4 lg:gap-6">
                                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center shrink-0 bg-[#E8D5B7] transition-all">
                                    <Sparkles className="h-6 w-6 lg:h-7 lg:w-7 text-[#7A9A7D]" />
                                </div>
                                <div className="space-y-1.5 max-w-3xl">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="px-2.5 py-0.5 rounded-full text-[9px] lg:text-[10px] font-bold uppercase tracking-widest bg-[#7A9A7D] text-white">
                                            Specialist Care
                                        </span>
                                        <span className="text-[11px] font-medium text-black/50">
                                            Children • Teens • Adults • Geriatrics
                                        </span>
                                    </div>
                                    <h3 className="text-xl lg:text-2xl font-bold text-black font-[family-name:var(--font-cormorant)] italic leading-tight">
                                        Psychiatric Consultation
                                    </h3>
                                    <p className="text-[13px] lg:text-sm text-black/60 font-medium leading-relaxed">
                                        Professional psychiatric consultations for children, adolescents, adults, and older adults, with individualised assessment, treatment guidance, and ongoing mental health support.
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/services/psychiatric-consultation"
                                className="dm-pill-button dm-pill-button-primary w-full sm:w-auto whitespace-nowrap shrink-0 group flex items-center justify-center gap-2"
                            >
                                <span>Explore Psychiatric Consultation</span>
                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
