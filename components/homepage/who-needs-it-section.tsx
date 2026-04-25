import { Users, School, Briefcase, Building } from "lucide-react";
import { cn } from "@/lib/utils";
import type { WhoNeedsItCard } from "@/lib/types";

// Default fallback items
const DEFAULT_ITEMS = [
    {
        id: "families",
        title: "Families",
        description: "Understand what's going on and learn how to help at home.",
        icon: "users" as const,
    },
    {
        id: "schools",
        title: "Schools",
        description: "Train your educators to create truly inclusive classrooms.",
        icon: "building" as const,
    },
    {
        id: "professionals",
        title: "Professionals",
        description: "Grow your expertise with certifications built for working therapists.",
        icon: "briefcase" as const,
    },
];

// Icon mapping
const iconMap = {
    users: Users,
    building: Building,
    briefcase: Briefcase,
    school: School,
};

interface WhoNeedsItSectionProps {
    title?: string;
    items?: WhoNeedsItCard[];
}

export function WhoNeedsItSection({ title, items: sanityItems }: WhoNeedsItSectionProps) {
    // Use Sanity data with fallback to defaults
    const items = sanityItems?.length ? sanityItems.map((item, idx) => ({
        id: `item-${idx}`,
        title: item.title,
        description: item.description,
        icon: item.icon || "users",
    })) : DEFAULT_ITEMS;

    const sectionTitle = title || "Here's who we're here for";
    return (
        <section className="pt-2 pb-6 lg:pt-4 lg:pb-10 bg-[#FDFBF7]">

            <div className="container">
                {/* Bridge Text - Original Wording */}
                <div className="flex items-center gap-4 mt-2 mb-6 lg:mb-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                    <span className="text-black/40 text-[10px] font-bold uppercase tracking-widest text-center">
                        {sectionTitle}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                </div>


                {/* Cards Grid: Unified Rhythm with Services */}
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-8 max-w-6xl mx-auto">
                    {items.map((item, idx) => {
                        const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Users;
                        const isLastOnMobile = idx === items.length - 1;
                        return (
                            <div
                                key={item.id}
                                className={cn(
                                    "group relative flex flex-col bg-white rounded-[1.5rem] lg:rounded-[2rem] p-5 lg:p-8 border border-black/5 hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5",
                                    isLastOnMobile && "col-span-2 lg:col-span-1"
                                )}
                            >
                                <div className="h-10 w-10 lg:h-12 lg:w-12 rounded-xl lg:rounded-2xl flex items-center justify-center mb-4 lg:mb-6 bg-[#E8D5B7] transition-color group-hover:bg-[#E8D5B7]/80">
                                    <IconComponent className="h-5 w-5 lg:h-6 lg:w-6 text-[#7A9A7D]" />
                                </div>

                                {/* Title (Serif Italic - Unified) */}
                                <h3 className="text-lg lg:text-xl font-bold text-black mb-2 lg:mb-3 font-[family-name:var(--font-cormorant)] italic leading-tight">
                                    {item.title}
                                </h3>

                                {/* Description (Sans Medium - Unified) */}
                                <p className="text-[12px] lg:text-sm text-black/60 font-medium leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
