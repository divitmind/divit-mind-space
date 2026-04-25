import Link from "next/link";
import { ArrowRight, FileText, Heart, Users, GraduationCap, Compass, ClipboardList, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceCategoryCard } from "@/lib/types";

// Default fallback services
const DEFAULT_SERVICES = [
    {
        id: "assessments",
        label: "Assessments Hub",
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
        <section className="pt-0 pb-4 lg:pb-8 bg-[#FDFBF7]">
            <div className="container">

                {/* Bridge Text */}
                <div className="flex items-center gap-4 mt-4 mb-6 lg:mt-6 lg:mb-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                    <span className="text-black/40 text-[10px] font-bold uppercase tracking-widest">
                        Here&apos;s how we help
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 lg:gap-6">
                    {services.map((service, idx) => {
                        const IconComponent = iconMap[service.icon as keyof typeof iconMap] || FileText;
                        const isLastOnMobile = idx === services.length - 1;
                        return (
                            <Link
                                key={service.id}
                                href={service.route}
                                className={cn(
                                    "group relative flex flex-col p-4 lg:p-6 xl:p-8 rounded-[1.5rem] lg:rounded-[2rem] border border-black/5 transition-all duration-500 bg-white hover:shadow-2xl hover:shadow-black/5 hover:border-black/10"
                                )}
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

            </div>
        </section>
    );
}
