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

type Person = {
  id: string;
  name: string;
  title: string;
  image: string; 
  teaser: string;
  fullBio: string[];
};

const PEOPLE: Person[] = [
  {
    id: "pooja-mittal",
    name: "Pooja Mittal",
    title: "Co-Founder & Special Educator",
    image: "/founder1.png",
    teaser:
      "My journey into neurodivergent care began with a deeply personal challenge. When my younger son, Divyam, was first diagnosed, he was non-verbal. With determination and continuous effort, he can now speak fluently in both Hindi and English. Out of this vision, Divit Health was born—a place of inspiration, support, and holistic care for neurodivergent children and their families.",
    fullBio: [
      "My journey into neurodivergent care began with a deeply personal challenge. When my younger son, Divyam, was first diagnosed, he was non-verbal. The early days of his therapy were filled with uncertainty, and I was told that he might never be able to speak. But as a mother, I held onto hope and remained committed to a path of relentless support. With determination and continuous effort, Divyam can now speak fluently in both Hindi and English. Today, he thrives as an independent teenager, and his progress from non-verbal to fluent stands as a powerful transformation—a journey from darkness to light, from uncertainty to hope, and from struggle to immense joy and achievement.",
      "This journey not only deepened my understanding of the unique challenges faced by neurodivergent children and their families, but it also ignited a profound desire to offer similar support to others. I am deeply aware of the resilience and dedication required by parents on this journey and strive to provide empathy and guidance to those navigating a similar path.",
      "Out of this vision, Divit Health was born. As Co-Founder, COO and CFO, my focus is on establishing Divit Health as a place of inspiration, support, and holistic care for neurodivergent children and their families. At Divit Health, we are committed to redefining healthcare for neurodivergent children through a comprehensive approach centered on each child's well-being and unique potential. Our goals include establishing a state-of-the-art Child Development Center (CDC) and a 'Residential school' for children with special needs, designed to provide a nurturing, inclusive environment where children can learn, grow, and develop independence.",
      "Through Divit Health, I am committed to fostering a supportive community where families feel empowered, and every child is given the opportunity to flourish. Together, we are building a foundation for a brighter, more inclusive future for neurodivergent children and their loved ones.",
    ],
  },
  {
    id: "akshaya-gnanashree",
    name: "Mrs Akshaya Gnanashree",
    title: "Clinical Psychologist",
    image: "https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teaser:
      "RCI Licensed Clinical Psychologist with M.Sc in Clinical Psychology from Manipal University and M.Phil from Institute of Mental Health Chennai. Trained in IQ tests, ADHD and Autism assessments, and psychotherapies including CBT, DBT, and IPT. Experienced in support groups, teaching, and mentoring.",
    fullBio: [
      "Mrs Akshaya Gnanashree is an RCI Licensed Clinical Psychologist with a M.Sc in Clinical Psychology from Manipal University and M.Phil in Clinical Psychology from Institute of Mental Health Chennai. She has 4 years of experience and is trained in taking assessments for various conditions such as IQ tests, Behaviour problem assessments, ADHD and Autism tests for children, adolescents and adults.",
      "She is also trained in diagnosing, assessing and treating a range of psychiatric conditions. She is also experienced in providing psychotherapies such as CBT, DBT, IPT, Grief therapies based on the clients needs. Akshaya is also involved in facilitating support groups and in teaching and mentoring for young psychology aspirants. She conducts internships, workshops and supervision for therapists.",
    ],
  },
  {
    id: "pavithra-dp",
    name: "Dr. Pavithra DP",
    title: "Expert in Pediatric Physical Therapy",
    image: "https://plus.unsplash.com/premium_photo-1677368598732-b944defee32c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teaser:
      "Highly accomplished physical therapist specializing in pediatric therapy, with gold medal achievements and certifications in Dynamic Movement Intervention (DMI), Sensory Integration, and Play Therapy. Member of the Indian Association of Physiotherapists (MIAP).",
    fullBio: [
      "Dr. Pavithra DP is a highly accomplished physical therapist specializing in pediatric therapy, recognized for her gold medal achievements and extensive certifications. She is a member of the Indian Association of Physiotherapists (MIAP), with the license number L-56294.",
      "Certifications and Specializations: Dynamic Movement Intervention (DMI) Levels A and B: Dr. Pavithra is certified in DMI, a therapeutic approach that uses dynamic exercises to enhance motor function in children with developmental and neurological disorders. This certification highlights her ability to apply advanced techniques to improve physical outcomes in her young patients.",
      "Sensory Integration (USA) Level 1: Sensory integration therapy helps children with sensory processing issues. Dr. Pavithra's certification in this area allows her to provide structured sensory experiences to assist children in coping with and overcoming sensory challenges.",
      "Play Therapy: As a certified play therapist, Dr. Pavithra uses therapeutic play activities to address psychological and emotional challenges in children. This approach helps children express their feelings, develop problem-solving skills, and improve social interactions.",
      "Professional Approach: Dr. Pavithra combines her diverse training and certifications to provide comprehensive and individualized care. Her multifaceted approach integrates dynamic movement, sensory integration and play therapy, ensuring that each child receives holistic and effective treatment. Her dedication to continuous learning and application of diverse therapeutic techniques underscores her commitment to improving the quality of life for children with various developmental and neurological conditions.",
      "Dr. Pavithra's expertise and compassionate approach make her a leading figure in pediatric physical therapy, offering specialized care that addresses both physical and emotional needs of her young patients.",
    ],
  },
  {
    id: "ankita-rastogi",
    name: "Ankita Rastogi",
    title: "Occupational Therapist",
    image: "https://plus.unsplash.com/premium_photo-1690395794791-e85944b25c0f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    teaser:
      "Distinguished occupational therapist and child counsellor with a Master's in Psychology (IGNOU) and BOT from Delhi University (2nd rank). Certified in Sensory Integration, Handwriting Without Tears, and Yoga. Specializations include sensory integration therapy, NDT, and behavioural modification.",
    fullBio: [
      "Ankita Rastogi is a distinguished occupational therapist and child counsellor with a robust academic background and extensive professional experience. Born on June 14, 1987, in Ghaziabad, she holds a Master's degree in Psychology from IGNOU and a Bachelor of Occupational Therapy from Delhi University, where she graduated with a 72% score, earning the 2nd rank. Her educational credentials are further bolstered by certifications in Sensory Integration Praxis from the University of Southern California, Handwriting Without Tears from the U.S., and Yoga from Vishwa Bharti Yoga Sansthan, among others.",
      "Ankita has completed internships at the Pandit Deendayal Upadhyaya Institute for Physically Handicapped, New Delhi, gaining valuable experience in various departments. Professionally, she has worked as an occupational therapist at Orkids, Noida, and Children First, and as a child counsellor at Excelsior American School and Soch Gurgaon. Her consultancy roles include positions at Green Ribbon International School and as the head of ABHIVYAKTI, where she dealt with conditions such as Autism, PDD, SPD, learning disabilities, and behavioural issues.",
      "Ankita has attended numerous workshops and conferences, enhancing her expertise in ergonomics, cerebral palsy, autism, non-verbal learning disabilities, and behavioural modification. She has also received a scholarship from Northampton University, London for her master's in occupational therapy. Her specializations include sensory integration therapy, neurodevelopmental therapy, and behavioural modification.",
      "Ankita's commitment to improving children's independence and health is reflected in her diverse project work, including developing balance aids and innovative therapeutic tools. Her extra-curricular activities showcase her leadership and organizational skills, having participated in national-level dance competitions and organizing college events. Ankita is dedicated to providing holistic care and fostering a supportive environment for children's development.",
    ],
  },
];

function PersonImagePlaceholder() {
  return (
    <div className="w-full aspect-square rounded-3xl flex flex-col items-center justify-center text-center px-4">
      <div className="w-14 h-14 rounded-full bg-[#2F3E33]/10 flex items-center justify-center text-[#2F3E33]/50 shrink-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
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
      <p className="mt-3 text-xs text-[#2F3E33]/50 font-medium">Photo</p>
      <p className="mt-0.5 text-[10px] text-[#2F3E33]/40">Placeholder</p>
    </div>
  );
}

function PersonCard({ person }: { person: Person }) {
  return (
    <article className="flex flex-col rounded-3xl overflow-hidden h-full">
      {/* Image */}
      <div className="relative w-full aspect-square rounded-3xl shrink-0">
        {person.image ? (
          <Image
            src={person.image}
            alt={person.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <PersonImagePlaceholder />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 py-4">
        <h3 className="text-lg font-semibold text-[#2F3E33] tracking-tight">
          {person.name}
        </h3>
        <p className="mt-1 text-xs font-medium text-[#2F3E33]/70 uppercase tracking-wider">
          {person.title}
        </p>
        <p className="mt-3 text-sm text-[#2F3E33]/90 leading-relaxed line-clamp-4">
          {person.teaser}
        </p>

        <Dialog>
          <DialogTrigger
            className={cn(
              "mt-4 inline-flex items-center gap-2 self-start",
              "text-[#2F3E33] font-medium text-sm",
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
                {person.name}
              </DialogTitle>
              <p className="text-sm text-[#2F3E33]/80 uppercase tracking-wider font-medium">
                {person.title}
              </p>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 -mx-1 px-1 py-2 space-y-4 text-[#2F3E33]/90 text-sm leading-relaxed">
              {person.fullBio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  );
}

export function FoundersSpecialistsSection() {
  return (
    <section className="py-20 lg:py-20 " id="founders-specialists">
      <div className="px-4 md:px-6 ">
        <h2 className="text-2xl sm:text-3xl text-center lg:text-5xl font-semibold text-[#2F3E33] tracking-tight mb-10 lg:mb-12">
          Founders & Specialists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {PEOPLE.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
