import { Users, School, Briefcase, Building } from "lucide-react";
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
        <section className="pt-4 pb-6 lg:pt-8 lg:pb-10 bg-[#FDFBF7]">

            <div className="container">
                {/* Bridge Text - Original Wording */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                    <span className="text-black/40 text-[10px] font-bold uppercase tracking-widest">
                        {sectionTitle}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                </div>


                {/* Cards Grid: Unified Typography */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {items.map((item) => {
                        const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Users;
                        return (
                            <div
                                key={item.id}
                                className="group bg-white rounded-[2.5rem] p-10 border border-black/5 hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5"
                            >
                                <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-8 bg-[#E8D5B7] transition-colors group-hover:bg-[#E8D5B7]/80">
                                    <IconComponent className="h-6 w-6 text-[#7A9A7D]" />
                                </div>

                                {/* Title (Serif Italic - Unified) */}
                                <h3 className="text-2xl font-bold text-black mb-4 font-[family-name:var(--font-cormorant)] italic leading-tight">
                                    {item.title}
                                </h3>

                                {/* Description (Sans Medium - Unified) */}
                                <p className="text-base text-black/60 font-medium leading-relaxed">
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
