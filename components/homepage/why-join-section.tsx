
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";

export function WhyJoinSection() {
    return (
        <section className="py-20 lg:py-28 bg-[#FDFBF7]">
            <div className="container space-y-24">

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
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-green-lite/10 rounded-full blur-3xl -z-10" />
                    </div>

                    <div className="flex-1 order-1 lg:order-2 space-y-8">
                        <h2 className="text-3xl lg:text-5xl font-semibold text-green">
                            Who Can Join?
                        </h2>
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
    
function ListItem({ title, description }: { title: string, description: string }) {
    return (
        <div className="flex gap-4">
            <div className="mt-1">
                <div className="h-6 w-6 rounded-full bg-cream flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-green" />
                </div>
            </div>
            <div>
                <h4 className="font-bold text-green text-lg">{title}</h4>
                <p className="text-green">{description}</p>
            </div>
        </div>
    );
}
