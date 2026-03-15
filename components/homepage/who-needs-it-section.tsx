import { Users, School, Briefcase } from "lucide-react";

const items = [
    {
        id: "families",
        title: "Families",
        description: "Understand your child's needs and get strategies that actually work at home.",
        icon: Users,
        dark: false,
    },
    {
        id: "schools",
        title: "Schools",
        description: "Train your educators to create truly inclusive classrooms.",
        icon: School,
        dark: true,
    },
    {
        id: "professionals",
        title: "Professionals",
        description: "Grow your expertise with certifications built for working therapists.",
        icon: Briefcase,
        dark: true,
    },
];

export function WhoNeedsItSection() {
    return (
        <section className="pt-6 pb-16 lg:pt-8 lg:pb-24 bg-cream">
            <div className="container">
                {/* Bridge Line */}
                <div className="flex items-center gap-4 mb-8">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green/15 to-transparent" />
                    <span className="text-green/50 text-xs font-semibold uppercase tracking-[0.15em]">
                        Here&apos;s who we&apos;re here for
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green/15 to-transparent" />
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-white rounded-3xl p-8 border-2 border-transparent hover:border-green-lite hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div
                                className={`h-14 w-14 rounded-2xl flex items-center justify-center mb-5 ${
                                    item.dark
                                        ? "bg-green text-white"
                                        : "bg-cream text-green"
                                }`}
                            >
                                <item.icon className="h-6 w-6" />
                            </div>
                            <h3 className="text-xl font-bold text-green mb-3">
                                {item.title}
                            </h3>
                            <p className="text-green/80 leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
