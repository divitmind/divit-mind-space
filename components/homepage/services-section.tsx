import Link from "next/link";
import { ArrowRight, FileText, Heart, Users, GraduationCap, Compass, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceListItem } from "@/sanity/types";
import type { ServiceCategoryCard } from "@/lib/types";

// Default fallback services
const DEFAULT_SERVICES = [
    {
        id: "assessments",
        label: "Assessments",
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
        label: "Guidance",
        icon: "compass" as const,
        outcome: "Know exactly how to help & see it work",
        route: "/services?category=guidance",
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
};

interface ServicesSectionProps {
    therapyServices?: ServiceListItem[];
    serviceCategories?: ServiceCategoryCard[];
}

export function ServicesSection({ therapyServices = [], serviceCategories }: ServicesSectionProps) {
    // Use Sanity data with fallback to defaults
    const services = serviceCategories?.length ? serviceCategories.map((cat, idx) => ({
        id: `cat-${idx}`,
        label: cat.title,
        icon: cat.icon || "clipboard",
        outcome: cat.outcome,
        route: cat.href,
    })) : DEFAULT_SERVICES;

    return (
        <section className="pt-0 pb-6 lg:pb-10 bg-[#FDFBF7]">
            <div className="container">

                {/* Bridge Text */}
                <div className="flex items-center gap-4 mt-8 mb-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                    <span className="text-black/40 text-[10px] font-bold uppercase tracking-widest">
                        Here&apos;s how we help
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {services.map((service) => {
                        const IconComponent = iconMap[service.icon as keyof typeof iconMap] || FileText;
                        return (
                            <Link
                                key={service.id}
                                href={service.route}
                                className="group relative flex flex-col p-10 rounded-[2rem] border border-black/5 transition-all duration-500 bg-white hover:shadow-2xl hover:shadow-black/5 hover:border-black/10"
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-8 transition-all group-hover:scale-105 bg-[#E8D5B7]">
                                    <IconComponent className="h-6 w-6 text-[#7A9A7D]" />
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
                        );
                    })}
                </div>

            </div>
        </section>
    );
}
