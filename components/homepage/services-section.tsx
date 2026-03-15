import Link from "next/link";
import { ArrowRight, FileText, Heart, Users, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ServiceListItem } from "@/sanity/types";

const services = [
    {
        id: "assessments",
        label: "Assessments",
        icon: FileText,
        outcome: "Get clear answers about your child's needs",
        route: "/services/psychometric-assessments",
        color: "bg-[#004540]",
        iconBg: "bg-white/15",
        textColor: "text-white",
    },
    {
        id: "therapy",
        label: "Therapy",
        icon: Heart,
        outcome: "Help your child build confidence and coping skills",
        route: "/services?therapy=true",
        color: "bg-blue",
        iconBg: "bg-[#004540]/10",
        textColor: "text-purple",
    },
    {
        id: "parent-guidance",
        label: "Guidance",
        icon: Users,
        outcome: "Gain practical parenting strategies that work",
        route: "/services/counselling-teenagers--adults",
        color: "bg-yellow",
        iconBg: "bg-[#004540]/10",
        textColor: "text-purple",
    },
    {
        id: "learning",
        label: "Programs",
        icon: GraduationCap,
        outcome: "Find learning approaches tailored to your child",
        route: "/services/training-program-shadow-teacher-training-program",
        color: "bg-purple",
        iconBg: "bg-white/15",
        textColor: "text-white",
    },
];

interface ServicesSectionProps {
    therapyServices?: ServiceListItem[];
}

export function ServicesSection({ therapyServices = [] }: ServicesSectionProps) {
    return (
        <section className="pt-8 pb-16 lg:pt-6 lg:pb-20">
            <div className="container">

                {/* Bridge Text */}
                <div className="flex items-center gap-4 mb-6">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#004540]/15 to-transparent" />
                    <span className="text-[#004540]/50 text-xs font-semibold uppercase tracking-[0.15em]">
                        Here's how we help
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#004540]/15 to-transparent" />
                </div>

                {/* Services Grid: Outcome-First, Always Visible */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {services.map((service) => (
                        <Link
                            key={service.id}
                            href={service.route}
                            className={cn(
                                "group relative flex flex-col p-6 rounded-2xl transition-all duration-300",
                                "hover:-translate-y-1 hover:shadow-xl",
                                service.color
                            )}
                        >
                            {/* Icon */}
                            <div className={cn(
                                "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
                                service.iconBg
                            )}>
                                <service.icon className={cn("h-5 w-5", service.textColor)} />
                            </div>

                            {/* Outcome (Primary) */}
                            <p className={cn(
                                "text-base font-semibold leading-snug mb-3 flex-grow",
                                service.textColor
                            )}>
                                {service.outcome}
                            </p>

                            {/* Label + Arrow (Secondary) */}
                            <span className={cn(
                                "flex items-center gap-2 text-xs font-bold uppercase tracking-wide opacity-70",
                                service.textColor
                            )}>
                                {service.label}
                                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                            </span>
                        </Link>
                    ))}
                </div>

            </div>
        </section>
    );
}
