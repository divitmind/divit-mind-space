import { HeroSection } from "@/components/homepage/hero-section";
import { WhyJoinSection } from "@/components/homepage/why-join-section";
import { ServicesSection } from "@/components/homepage/services-section";
import { WhoNeedsItSection } from "@/components/homepage/who-needs-it-section";
import { TestimonialsSection } from "@/components/homepage/testimonials-section";
import { FaqSection } from "@/components/homepage/faq-section";
import { CtaSection } from "@/components/homepage/cta-section";
import { ValueProps } from "@/components/homepage/value-props";

export default function Page() {
    return (
        <main>
            <HeroSection />
            <ValueProps />
            <WhyJoinSection />
            <ServicesSection />
            <WhoNeedsItSection />
            <TestimonialsSection />
            <FaqSection />
            <CtaSection />
        </main>
    );
}