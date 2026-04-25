"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type Advisor = {
  name: string;
  credential: string;
  role: string;
  teaser: string;
  fullBio: string[];
  image: string;
};

const ADVISORS: Advisor[] = [
  {
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
    image: "/Debarati.jpeg",
  },
  {
    name: "Dr. S. Mohamed Nowful",
    credential: "B.O.Th.",
    role:
      "Licensed Occupational Therapist · IOTR, NCAHP, AIOTA Life Member · USA certified BLS, ACLS & OPT-1, CLASI Sensory Integration, oromotor stimulation",
    teaser:
      "With over 2 years of specialized experience, Dr. Nowful focuses on developmental pediatrics, neurorehabilitation, and mental health. He is skilled in conducting assessments for children and individuals with developmental disorders and disabilities. His key expertise includes sensory integration therapy, play therapy, reflex integration, daily living skills training, and support for ASD, CP, GDD, ADHD, and mental health interventions.",
    fullBio: [
      "Dr. S. Mohamed Nowful is a licensed Occupational Therapist holding a Bachelor of Occupational Therapy (B.O.Th.) from JKK Munirajah Medical Research Foundation College of Occupational Therapy. He is a registered member of the Indian Occupational Therapy Registration (IOTR), the National Commission for Allied and Healthcare Professions (NCAHP), and holds Life Membership in the All India Occupational Therapists' Association (AIOTA). He is also USA certified in BLS, ACLS & OPT-1, CLASI Sensory Integration Modules-1, along with certification in oromotor stimulation.",
      "With over 2 years of specialized experience, Dr. Nowful focuses on developmental pediatrics, neurorehabilitation, and mental health. He is skilled in conducting assessments for children and individuals with developmental disorders, neurodevelopmental conditions, and disabilities.",
      "His key areas of expertise include sensory integration therapy, play therapy, reflex integration, daily living skills training, adaptive skills development, and promoting independence across the lifespan—from early intervention to adult lifestyle management.",
      "He provides specialized support for conditions such as Autism Spectrum Disorder (ASD), Cerebral Palsy (CP), Global Developmental Delay (GDD), Sensory Processing Disorders, learning and intellectual disabilities, Attention-Deficit/Hyperactivity Disorder (ADHD), and various genetic disorders. Dr. Nowful is also trained in mental health interventions, including screen addiction management, neuroplasticity-based approaches, and integrating occupational therapy with complementary therapies such as behavioral therapy.",
    ],
    image: "/mohmed.jpeg",
  },
  {
    name: "Dinesh Jayabalakrishnan",
    credential: "B.O.Th.",
    role: "Table Tennis Coach",
    teaser:
      "A dedicated coach and passionate advocate of Table Tennis with over 14 years of coaching experience. Dinesh has trained over 1000 students, including more than 10 para-athletes, and served as State Coach for Karnataka (2019-2022). ITTF Level 1 and Level 2 Certified Coach—one of only 16 in the country—with a mission to promote the game and help students excel.",
    fullBio: [
      "In the fast-paced world of Table Tennis, Dinesh Jayabalakrishnan stands out as a dedicated coach and passionate advocate of this game. This game, known for enhancing reflexes, coordination, and concentration, has been Dinesh's lifelong passion. Despite Dinesh's academic achievements, his heart was set on Table Tennis. As a schoolboy in Tamil Nadu, he achieved state-ranking status during his sub-junior stage. He continued to excel in university, representing Bharathiar University in South Zone Inter-University competitions and leading his college team to multiple victories. Internationally, Dinesh played for PT 75 Club in Tampere, Finland, winning several tournaments and securing a ranking position in the SPTL. Back in India, he consistently won team and individual prizes in inter-corporate competitions from 2000 onwards.",
      "With over 14 years of coaching experience, Dinesh has trained over 1000 students, including more than 10 para-athletes. Dinesh has guided para-athletes to become national champions and international medalists. As the State Coach for Karnataka (2019-2022), his students have excelled in national ranking events, winning state championships in U-11 and U-13 categories. His students have also triumphed in CBSE school tournaments and various inter-school competitions.",
      "Dinesh is ITTF Level 1 (2012) and Level 2 Certified Coach (2014)—among the country's elite, being one of only 16 coaches to achieve this certification. He has completed 'Beginning Coaching: General Principles' from Australia (Certificate Number 286671/2011).",
      "Dinesh Jayabalakrishnan's journey is fueled by a singular goal: to promote the game of Table Tennis. He strives to teach the fundamentals of the game, coaching students to excel and supporting them to bring laurels to their institutions and training academies through competition success. His journey is a testament to the transformative power of dedication, passion, and the unyielding spirit to uplift others through sport.",
    ],
    image: "/Dinesh.png",
  },
];

export function OurAdvisorSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const advisor = ADVISORS[currentIndex];

  const goPrev = () => setCurrentIndex((i) => (i - 1 + ADVISORS.length) % ADVISORS.length);
  const goNext = () => setCurrentIndex((i) => (i + 1) % ADVISORS.length);

  return (
    <section className="py-20 lg:py-24 " id="our-advisor">
      <div className="px-4 md:px-6 space-y-6">
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
                {advisor.name}
                {advisor.credential ? `, ${advisor.credential}` : ""}
              </span>
              <br />
              <span className="text-[#2F3E33]/80 text-sm lg:text-xl">
                {advisor.role}
              </span>
            </p>
            <p className="mt-4 text-[#2F3E33]/90 text-sm lg:text-xl leading-relaxed">
              {advisor.teaser}
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
                    {advisor.name}
                    {advisor.credential ? `, ${advisor.credential}` : ""}
                  </DialogTitle>
                  <p className="text-sm text-[#2F3E33]/80">{advisor.role}</p>
                </DialogHeader>
                <div className="overflow-y-auto flex-1 -mx-1 px-1 py-2 space-y-4 text-[#2F3E33]/90 text-sm leading-relaxed">
                  {advisor.fullBio.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Right: Image */}
          <div className="relative w-full md:m-4 m-0 rounded-3xl lg:w-[45%] lg:min-w-[320px] aspect-4/3 lg:aspect-auto lg:min-h-[380px] bg-[#E8E4DE] flex items-center justify-center shrink-0">
            {advisor.image ? (
              <Image
                src={advisor.image}
                alt={`${advisor.name}, Our Advisor`}
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

        {/* Carousel controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={goPrev}
            className="size-12 rounded-full bg-white border border-[#2F3E33]/20 shadow-md flex items-center justify-center text-[#2F3E33] hover:bg-[#FDFBF7] hover:border-[#2F3E33]/40 transition-colors"
            aria-label="Previous advisor"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <div className="flex gap-2" role="tablist" aria-label="Advisor slides">
            {ADVISORS.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                role="tab"
                aria-selected={currentIndex === i}
                aria-label={`Go to advisor ${i + 1}`}
                className={cn(
                  "size-2.5 rounded-full transition-colors",
                  currentIndex === i
                    ? "bg-[#2F3E33] scale-110"
                    : "bg-[#2F3E33]/30 hover:bg-[#2F3E33]/50"
                )}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={goNext}
            className="size-12 rounded-full bg-white border border-[#2F3E33]/20 shadow-md flex items-center justify-center text-[#2F3E33] hover:bg-[#FDFBF7] hover:border-[#2F3E33]/40 transition-colors"
            aria-label="Next advisor"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      </div>
    </section>
  );
}
