
import Image from "next/image";
import { GraduationCap, Users, Clock, FileText, CheckCircle2 } from "lucide-react";

export function WhyJoinSection() {
    return (
        <section className="py-20 lg:py-28 bg-[#FDFBF7]">
            <div className="container space-y-24">

                {/* Section 1: Why you should join US? */}
                <div className="space-y-12">
                    <div className="text-center space-y-4">
                        <h2 className="text-3xl lg:text-4xl font-bold text-[#222222]">
                            Why you should join <span className="text-[#2F3E33]">US?</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We provide the ecosystem you need to grow, learn, and make a real difference.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <Card
                            icon={GraduationCap}
                            title="Scholarship Programs"
                            description="We believe in making education accessible to all. Our scholarship programs provide financial assistance to deserving candidates."
                        />
                        <Card
                            icon={Users}
                            title="Group Discounts"
                            description="Learning together is impactful! We offer special discounts for groups, making it easier for teams to upskill collectively."
                        />
                        <Card
                            icon={Clock}
                            title="Flexibility"
                            description="Our training programs are designed to fit into your schedule, offering both online and offline learning options."
                        />
                        <Card
                            icon={FileText}
                            title="Worksheets & Resources"
                            description="Gain access to well-structured worksheets and resource materials that reinforce learning and support real-world application."
                        />
                    </div>
                </div>

                {/* Section 2: Who Can Join? */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <div className="flex-1 order-2 lg:order-1 relative">
                        <div className="relative aspect-square w-full max-w-md mx-auto rounded-3xl overflow-hidden shadow-2xl border-4 border-white transform -rotate-2 hover:rotate-0 transition-transform duration-500">
                            <Image
                                src="/who-can-join.png"
                                alt="Who Can Join"
                                fill
                                className="object-cover"
                            />
                        </div>
                        {/* Decorative blob */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#7C9082]/10 rounded-full blur-3xl -z-10" />
                    </div>

                    <div className="flex-1 order-1 lg:order-2 space-y-8">
                        <h3 className="text-3xl font-bold text-[#222222]">Who Can Join?</h3>
                        <div className="space-y-6">
                            <ListItem title="Parents" description="Gain knowledge and skills to support your child’s development." />
                            <ListItem title="Educators" description="Enhance teaching methodologies for students with special needs." />
                            <ListItem title="Therapists" description="Expand your expertise with specialized certifications." />
                            <ListItem title="Aspiring Professionals" description="Build a rewarding career in special education and therapy." />
                        </div>
                    </div>
                </div>



            </div>
        </section>
    );
}

function Card({ icon: Icon, title, description }: { icon: any, title: string, description: string }) {
    return (
        <div className="bg-white/80 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-[#E8ECE9] hover:border-[#7C9082]/30 group">
            <div className="h-12 w-12 rounded-xl bg-[#FDFBF7] flex items-center justify-center text-[#2F3E33] mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold text-[#222222] mb-3">{title}</h3>
            <p className="text-gray-600 leading-relaxed text-sm">
                {description}
            </p>
        </div>
    );
}

function ListItem({ title, description }: { title: string, description: string }) {
    return (
        <div className="flex gap-4">
            <div className="mt-1">
                <div className="h-6 w-6 rounded-full bg-[#E8ECE9] flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-[#2F3E33]" />
                </div>
            </div>
            <div>
                <h4 className="font-bold text-[#222222] text-lg">{title}</h4>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
}
