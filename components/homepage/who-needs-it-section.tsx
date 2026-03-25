import { Users, School, Briefcase } from "lucide-react";

const items = [
    {
        id: "families",
        title: "Families",
        description: "Understand what's going on and learn how to help at home.",
        icon: Users,
    },
    {
        id: "schools",
        title: "Schools",
        description: "Train your educators to create truly inclusive classrooms.",
        icon: School,
    },
    {
        id: "professionals",
        title: "Professionals",
        description: "Grow your expertise with certifications built for working therapists.",
        icon: Briefcase,
    },
];

export function WhoNeedsItSection() {
    return (
        <section className="py-2 lg:py-4 bg-[#FDFBF7]">

            <div className="container">
                {/* Bridge Text - Original Wording */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                    <span className="text-black/40 text-[10px] font-bold uppercase tracking-widest">
                        Here&apos;s who we&apos;re here for
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />
                </div>


                {/* Cards Grid: Unified Typography */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-[2.5rem] p-10 border border-black/5 hover:border-black/10 transition-all duration-500 hover:shadow-2xl hover:shadow-black/5"
                        >
                            <div className="h-14 w-14 rounded-2xl flex items-center justify-center mb-8 bg-black/5 transition-colors group-hover:bg-black/10">
                                <item.icon className="h-6 w-6 text-black" />
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
                    ))}
                </div>
            </div>
        </section>
    );
}
