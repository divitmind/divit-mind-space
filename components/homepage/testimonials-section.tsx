import { Marquee } from "@/components/ui/marquee";
import { TestimonialCard } from "@/components/homepage/testimonial-card";

const testimonials = [
    {
        name: "Priya M.",
        role: "Parent of 8-year-old with ADHD",
        quote: "For the first time, someone truly understood my son. The team at Divit MindSpace didn't try to 'fix' him—they helped us see his strengths. Now he's thriving.",
        initial: "P",
    },
    {
        name: "Rahul & Sneha K.",
        role: "Parents of 6-year-old with Autism",
        quote: "We were so lost before finding Divit MindSpace. The assessment gave us clarity, and the ongoing support has been life-changing for our whole family.",
        initial: "R",
    },
    {
        name: "Anita S.",
        role: "Parent of 10-year-old with learning differences",
        quote: "The parent guidance sessions helped me stop feeling guilty and start feeling empowered. I now have real strategies that work for our daily life.",
        initial: "A",
    },
    // Duplicating for marquee effect volume
    {
        name: "Priya M.",
        role: "Parent of 8-year-old with ADHD",
        quote: "For the first time, someone truly understood my son. The team at Divit MindSpace didn't try to 'fix' him—they helped us see his strengths. Now he's thriving.",
        initial: "P",
    },
    {
        name: "Rahul & Sneha K.",
        role: "Parents of 6-year-old with Autism",
        quote: "We were so lost before finding Divit MindSpace. The assessment gave us clarity, and the ongoing support has been life-changing for our whole family.",
        initial: "R",
    },
];

export function TestimonialsSection() {
    return (
        <section className="py-20 lg:py-28 bg-[#FDFBF7] overflow-hidden">
            <div className="container mb-16 text-center">
                <div className="inline-flex items-center justify-center px-3 py-1 rounded-full bg-[#E8ECE9] text-[#2F3E33] text-xs font-semibold tracking-wide uppercase mb-4">
                    Parent Stories
                </div>
                <h2 className="text-3xl lg:text-5xl font-bold text-[#222222] mb-4">
                    Why Families Trust Us
                </h2>
                <p className="text-gray-600 text-lg max-w-xl mx-auto">
                    Real stories from real parents who found clarity, support, and hope.
                </p>
            </div>

            <div className="relative w-full">
                {/* First Marquee - Left Direction */}
                <Marquee pauseOnHover className="pb-8">
                    {testimonials.map((t, i) => (
                        <TestimonialCard key={`t1-${i}`} {...t} />
                    ))}
                </Marquee>

                {/* Second Marquee - Right Direction (Optional, if we had more content but let's stick to one nice row since we only have 3 uniques) */}
                {/* Let's double down on one really good row or duplicate to make it long enough */}
            </div>
        </section>
    );
}
