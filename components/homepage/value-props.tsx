
import { Award, Heart, Users, Activity } from "lucide-react";

const features = [
    {
        icon: Award,
        title: "Licensed Experts",
        description: "All our specialists are certified professionals dedicated to excellence.",
    },
    {
        icon: Heart,
        title: "Child-Centered",
        description: "We see children, not diagnoses. Every plan is tailored to their unique needs.",
    },
    {
        icon: Users,
        title: "Family Focused",
        description: "Supporting the whole family journey with guidance and empathy.",
    },
    {
        icon: Activity,
        title: "Proven Results",
        description: "Hundreds of families helped through evidence-based therapies.",
    },
];

export function ValueProps() {
    return (
        <section className="py-16 bg-white border-y border-[#E8ECE9]/50">
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {features.map((feature, index) => (
                        <div
                            key={feature.title}
                            className="flex flex-col items-center text-center space-y-4 p-6 rounded-2xl transition-colors hover:bg-[#FDFBF7]"
                        >
                            <div className="h-14 w-14 rounded-full bg-[#7C9082]/10 flex items-center justify-center text-[#7C9082]">
                                <feature.icon className="h-7 w-7" />
                            </div>
                            <div className="space-y-2">
                                <h3 className="font-bold text-xl text-[#2F3E33]">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
