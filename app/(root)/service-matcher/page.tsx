import { Metadata } from "next";
import { ServiceMatcher } from "@/components/services/service-matcher";

export const metadata: Metadata = {
  title: "Service Matcher | Divit MindSpace",
  description: "Unsure where to start? Use our interactive tool to find the perfect therapy or assessment for your needs.",
};

export default function ServiceMatcherPage() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] py-20 px-4">
      <div className="container mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-serif italic text-black leading-tight">
            Finding the Right Path
          </h1>
          <p className="text-lg text-black/60 font-medium max-w-xl mx-auto">
            Answer a few simple questions and we&apos;ll help you identify the best starting point for your family&apos;s journey.
          </p>
        </div>

        <ServiceMatcher />
      </div>
    </main>
  );
}
