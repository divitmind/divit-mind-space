import Image from "next/image";

export function BentoGridSection() {
  return (
    <section className="py-20 lg:py-18 bg-[#FDFBF7]">
      <div className="px-6">
        <div className="flex flex-col gap-4">
          {/* Top Row: 3 Square Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Item 1: City/Community scene */}
            <div className="relative aspect-3/2 md:aspect-4/5 lg:aspect-square rounded-3xl overflow-hidden bg-gray-100">
              <Image
                src="/about_pic1.png"
                alt="Divit MindSpace Community - Supporting neurodivergent children across neighborhoods"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                quality={90}
                priority
              />
            </div>

            {/* Item 2: Office/Clinical space */}
            <div className="relative aspect-3/2 md:aspect-4/5 lg:aspect-square rounded-3xl overflow-hidden bg-gray-100">
              <Image
                src="/about_pic2.png"
                alt="Clinical Assessment Space - Professional environment for comprehensive evaluations"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                quality={90}
                priority
              />
            </div>

            {/* Item 3: Technology/Phone mockup */}
            <div className="relative aspect-3/2 md:aspect-4/5 lg:aspect-square rounded-3xl overflow-hidden bg-gray-100">
              <Image
                src="/about_pic3.png"
                alt="Educational Technology - Digital tools for specialized learning programs"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                quality={90}
                loading="lazy"
              />
            </div>
          </div>

          {/* Bottom Row: 2 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Item 4: Statistics/Chart visual */}
            <div className="relative lg:col-span-1 aspect-3/2 md:aspect-square lg:aspect-square rounded-3xl overflow-hidden bg-gray-100">
              <Image
                src="/about_pic4.png"
                alt="Impact Statistics - Measurable outcomes and success metrics"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                quality={90}
                loading="lazy"
              />
            </div>

            {/* Item 5: Professional/Training scene */}
            <div className="relative lg:col-span-2 aspect-3/2 md:aspect-video lg:aspect-[2/1] rounded-3xl overflow-hidden bg-gray-100">
              <Image
                src="/about_pic5.png"
                alt="Professional Training - Empowering educators and therapists"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 66vw"
                className="object-cover"
                quality={90}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
