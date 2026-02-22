"use client";

import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const ADVISOR = {
  name: "Dr. Debarati Basak",
  credential: "Psy.D",
  role: "Founding Partner, Carpediem EdPsych Consultancy LLP · Chief Growth Officer",
  teaser:
    "A practicing psychologist with 20+ years of experience in research, counselling, and psychotherapy. She is dedicated to mental health, inclusive education, and supporting schools, teachers, and families.",
  fullBio: [
    "Dr. Debarati is a practicing psychologist with 20+ years of experience in research, counselling, and psychotherapy. She has completed her M.Sc. in Psychology from Calcutta University and M.S in Psychotherapy & Counselling from a U.S. University.",
    "Her research areas are cognition, disability and parental role. She is a recipient of a scholarship from the Lady Tata Memorial Trust for her research in the field of disability.",
    "Her previous assignments include being the Head of a reputed school's Department of Special Needs and Center Head of a Counselling Center in Bangalore. She has extensive experience in school counselling, taking care of the mental health of stakeholders in the school, and supporting schools in their journey toward inclusion.",
    "She has conducted training sessions for students, teachers, and parents in mental health. She is a CBSE master trainer in Life Skills and Inclusion & Inclusive Practices. Her areas of interest are counselling and psychotherapy. She has an affinity for working with children, adolescents, and the adult population and has extensive experience working with students, teachers, and parents in mental health and relationship management.",
    "She is a Professor of Practice (Adjunct Faculty) at the Kristu Jayanti College, Autonomous, Bengaluru and a guest lecturer at various educational institutions. She is also a POSH Certified Trainer (TUV-SUD). She is a Professor of Practice at the Kristu Jayanti College, Bangalore and a guest faculty at Jyoti Nivas College, Autonomous Bangalore.",
  ],
};

const PLACEHOLDER_IMAGE = "/Debarati.jpeg"; // Replace with real image path when ready

export function OurAdvisorSection() {
  return (
    <section className="py-20 lg:py-24 " id="our-advisor">
      <div className="px-4 md:px-6">
        <div
          className={cn(
            "rounded-3xl overflow-hidden",
            "bg-[#ffff]",
            "shadow-[0_2px_24px_rgba(47,62,51,0.06)]",
            "flex flex-col lg:flex-row h-[600px]",
          )}
        >
          {/* Left: Text */}
          <div className="flex-1 flex flex-col justify-center p-8 lg:p-10 lg:pr-12">
            <h2 className="text-2xl sm:text-3xl lg:text-5xl font-semibold text-[#2F3E33] tracking-tight">
              Our Advisor
            </h2>
            <p className="mt-4 text-[#2F3E33] text-base lg:text-xl leading-relaxed">
              <span className="font-semibold">
                {ADVISOR.name}, {ADVISOR.credential}
              </span>
              <br />
              <span className="text-[#2F3E33]/80 text-sm lg:text-xl">
                {ADVISOR.role}
              </span>
            </p>
            <p className="mt-4 text-[#2F3E33]/90 text-sm lg:text-xl leading-relaxed">
              {ADVISOR.teaser}
            </p>
            <Dialog>
              <DialogTrigger
                className={cn(
                  "mt-6 inline-flex items-center gap-2 self-start",
                  "text-[#2F3E33] font-medium text-sm lg:text-base",
                  "underline underline-offset-4 decoration-2 decoration-[#2F3E33]/40",
                  "hover:decoration-[#2F3E33] transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2F3E33] focus-visible:ring-offset-2 rounded"
                )}
              >
                Read more
              </DialogTrigger>
              <DialogContent
                className="sm:max-w-[560px] max-h-[85vh] overflow-hidden flex flex-col rounded-3xl bg-[#FDFBF7] border-[#2F3E33]/10"
                showCloseButton
              >
                <DialogHeader>
                  <DialogTitle className="text-xl sm:text-2xl font-semibold text-[#2F3E33] pr-8">
                    {ADVISOR.name}, {ADVISOR.credential}
                  </DialogTitle>
                  <p className="text-sm text-[#2F3E33]/80">{ADVISOR.role}</p>
                </DialogHeader>
                <div className="overflow-y-auto flex-1 -mx-1 px-1 py-2 space-y-4 text-[#2F3E33]/90 text-sm leading-relaxed">
                  {ADVISOR.fullBio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Right: Image (placeholder) */}
          <div className="relative w-full md:m-4 m-0 rounded-3xl lg:w-[45%] lg:min-w-[320px] aspect-4/3 lg:aspect-auto lg:min-h-[380px] bg-[#E8E4DE] flex items-center justify-center shrink-0">
            {PLACEHOLDER_IMAGE ? (
              <Image
                src={PLACEHOLDER_IMAGE}
                alt={`${ADVISOR.name}, Our Advisor`}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-[50%_10%] rounded-3xl w-full h-full"
              />
            ) : (
              <div className="text-center px-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#2F3E33]/10 flex items-center justify-center text-[#2F3E33]/50">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
                <p className="mt-3 text-sm text-[#2F3E33]/50 font-medium">
                  Advisor photo
                </p>
                <p className="mt-1 text-xs text-[#2F3E33]/40">
                  Placeholder — add your image
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
