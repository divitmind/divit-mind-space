import Image from "next/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const cards = [
    {
        type: "testimonial" as const,
        title: "Licensed Experts",
        description:
            "All our specialists are certified professionals dedicated to excellence.",
        imageUrl:
            "https://plus.unsplash.com/premium_photo-1688350808212-4e6908a03925?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        subtitle: "Pooja Mittal, Co-Founder & Special Educator",
        href: "/blogs/understanding-neurodivergent-children-why-early-support-and-inclusive-education-matter",
    },
    {
        type: "stat-image" as const,
        title: "95%",
        subtitle: "Child-Centered Approach",
        description:
            "We see children, not diagnoses. Every plan is tailored to their unique needs.",
        imageUrl:
            "https://images.pexels.com/photos/8535617/pexels-photo-8535617.jpeg",
        href: "/blogs/child-centered-approach-therapy-education",
    },
    {
        type: "stat" as const,
        title: "4x",
        subtitle: "Family Focused",
        description:
            "Supporting the whole family journey with guidance and empathy.",
        href: "/blogs/adolescent-adult-counseling-services",
    },
    {
        type: "stat-image" as const,
        title: "80%",
        subtitle: "Proven Results",
        description:
            "Hundreds of families helped through evidence-based therapies.",
        imageUrl:
            "https://images.pexels.com/photos/6476789/pexels-photo-6476789.jpeg",
        href: "/blogs/parent-education-training-child-development",
    },
];

export function ValueProps() {
    return (
        <section className="relative overflow-hidden bg-cream py-16 lg:py-24">
            {/* Background decorations */}
            <div
                className="absolute left-0 top-0 z-0 w-[min(100%,32rem)] opacity-90 pointer-events-none"
                aria-hidden
            >
                <Image
                    src="/service-bg1.svg"
                    alt=""
                    width={741}
                    height={741}
                    className="object-contain object-top-left rotate-180 w-full h-auto -translate-x-1/4 -translate-y-1/4"
                />
            </div>
            <div
                className="absolute left-0 bottom-0 z-0 w-[min(100%,32rem)] opacity-90 pointer-events-none"
                aria-hidden
            >
                <Image
                    src="/service-bg1.svg"
                    alt=""
                    width={741}
                    height={741}
                    className="object-contain object-bottom-right w-full h-auto translate-x-1/4 -translate-y-1/4 scale-x-[-1]"
                />
            </div>

            <div className="container relative z-10">
                <div className="text-center space-y-3 mb-10 lg:mb-14">
                    <div className="inline-flex items-center justify-center text-sm font-bold tracking-widest uppercase mb-1 text-purple">
                        Real world results
                    </div>
                    <h2 className="text-3xl lg:text-5xl font-bold text-green tracking-tight">
                        What families achieve with us
                    </h2>
                </div>

                {/* Bento Grid Layout - Exact Reference Match */}
                <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-fr gap-4">
                    <Link
                        href={cards[0].href}
                        className="group relative flex flex-col justify-between rounded-3xl bg-[#0A3D3D] p-6 lg:p-8 text-white overflow-hidden md:row-span-2 min-h-[320px] md:min-h-[420px]"
                    >
                        <div className="flex-1">
                            <p className="text-base lg:text-lg font-normal leading-relaxed">
                                &ldquo;Our approach puts families and children first—personalized, compassionate care from a multidisciplinary team who truly listens and adapts to your child’s unique strengths and needs.&rdquo;
                            </p>
                        </div>

                        <div className="space-y-6">
                            {/* Example alternative content—statistic or service icon could go here */}
                            {/* <div className="flex items-center gap-4">
                                <svg width="32" height="32" fill="none"><circle cx="16" cy="16" r="16" fill="#38BDF8" /><text x="50%" y="56%" textAnchor="middle" fontSize="18" fill="white" dy=".3em">98%</text></svg>
                                <p className="text-sm font-semibold">Family Satisfaction</p>
                            </div> */}

                            <div className="flex items-center justify-end gap-2 text-white/90">
                                <span className="text-xs font-medium">Read on</span>
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 2: Stat-Image - Top middle (reduced width) */}
                    <Link
                        href={cards[1].href}
                        className="group relative rounded-3xl overflow-hidden min-h-[200px]"
                    >
                        <Image
                            src={cards[1].imageUrl || ""}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 33vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/60" aria-hidden />

                        <div className="absolute inset-0 flex flex-col justify-between p-5 lg:p-6 text-white">
                            <div className="flex-1">
                                <p className="text-4xl lg:text-5xl font-bold mb-1">{cards[1].title}</p>
                                <p className="text-xs lg:text-sm font-medium">{cards[1].subtitle}</p>
                            </div>

                            <div className="flex items-center justify-end gap-2 text-white/90">
                                <span className="text-xs font-medium">Read on</span>
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Card 3: Stat - Top right (reduced width) */}
                    <Link
                        href={cards[2].href}
                        className="group relative flex flex-col justify-between rounded-3xl bg-[#D4D9F5] p-5 lg:p-6 text-[#2D1B4E] overflow-hidden min-h-[200px]"
                    >
                        <div className="flex-1">
                            <p className="text-4xl lg:text-5xl font-bold mb-1">{cards[2].title}</p>
                            <p className="text-xs lg:text-sm font-medium">{cards[2].subtitle}</p>
                        </div>

                        <div className="flex items-center justify-end gap-2 text-[#2D1B4E]/80 mt-3">
                            <span className="text-xs font-medium">Read on</span>
                            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#2D1B4E]/10 group-hover:bg-[#2D1B4E]/20 transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </div>
                        </div>
                    </Link>

                    {/* Card 4: Stat-Image - Bottom right (spans 2 columns) */}
                    <Link
                        href={cards[3].href}
                        className="group relative rounded-3xl overflow-hidden min-h-[200px] md:col-span-2"
                    >
                        <Image
                            src={cards[3].imageUrl || ""}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(min-width: 768px) 66vw, 100vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/30 to-black/60" aria-hidden />

                        <div className="absolute inset-0 flex flex-col justify-between p-5 lg:p-6 text-white">
                            <div className="flex-1">
                                <p className="text-4xl lg:text-5xl font-bold mb-1">{cards[3].title}</p>
                                <p className="text-xs lg:text-sm font-medium">{cards[3].subtitle}</p>
                            </div>

                            <div className="flex items-center justify-end gap-2 text-white/90">
                                <span className="text-xs font-medium">Read on</span>
                                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}