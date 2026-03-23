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
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";
import { Specialist } from "@/sanity/types";
import { PortableText } from "next-sanity";

type Person = {
  id: string;
  name: string;
  title: string;
  image: string;
  experience: string;
  specialties: string[];
  teaser: string;
  fullBio: string[];
};

const PEOPLE: Person[] = [
  {
    id: "debarati-basak",
    name: "Dr. Debarati Basak",
    title: "Psy.D · Founding Partner, Carpediem EdPsych Consultancy LLP · Chief Growth Officer",
    image: "/Debarati.jpeg",
    experience: "20+ years",
    specialties: ["Counselling", "Mental Health", "Inclusive Education", "Life Skills"],
    teaser:
      "I help children, teens, and adults navigate emotions and relationships through counselling and psychotherapy.",
    fullBio: [
      "Dr. Debarati is a practicing psychologist with 20+ years of experience in research, counselling, and psychotherapy. She has completed her M.Sc. in Psychology from Calcutta University and M.S in Psychotherapy & Counselling from a U.S. University.",
      "Her research areas are cognition, disability and parental role. She is a recipient of a scholarship from the Lady Tata Memorial Trust for her research in the field of disability.",
      "Her previous assignments include being the Head of a reputed school's Department of Special Needs and Center Head of a Counselling Center in Bangalore. She has extensive experience in school counselling, taking care of the mental health of stakeholders in the school, and supporting schools in their journey toward inclusion.",
      "She has conducted training sessions for students, teachers, and parents in mental health. She is a CBSE master trainer in Life Skills and Inclusion & Inclusive Practices. Her areas of interest are counselling and psychotherapy. She has an affinity for working with children, adolescents, and the adult population and has extensive experience working with students, teachers, and parents in mental health and relationship management.",
      "She is a Professor of Practice (Adjunct Faculty) at the Kristu Jayanti College, Autonomous, Bengaluru and a guest lecturer at various educational institutions. She is also a POSH Certified Trainer (TUV-SUD). She is a Professor of Practice at the Kristu Jayanti College, Bangalore and a guest faculty at Jyoti Nivas College, Autonomous Bangalore.",
    ],
  },
  {
    id: "pavithra-lakshmi-narasimhan",
    name: "Dr. Pavithra Lakshmi Narasimhan",
    title: "PhD · Clinical Psychologist · Child & Adolescent Behaviour Intervention Specialist · Certified Art Therapist · SEN (UK certified)",
    image: "/pavithra-lakshmi.png",
    experience: "18+ years",
    specialties: ["ADHD", "Behavioural Support", "Emotional Regulation", "Art Therapy"],
    teaser:
      "I help children and teens build emotional regulation and confidence through behavioural therapy and art-based approaches.",
    fullBio: [
      "Dr. Pavithra Lakshmi Narasimhan is a Clinical Psychologist, Behaviour Intervention Therapist, and Certified Art Therapist with over 18 years of experience in the fields of education, mental health counselling, and behavioural intervention. Her work is dedicated to supporting the emotional, behavioural, and developmental well-being of children, adolescents, and families.",
      "She holds a PhD in Clinical Psychology, along with a Master's degree in Psychology and a Bachelor of Education (B.Ed.), and has specialized training in Special Educational Needs (SEN), child counselling, trauma support, and expressive art therapy.",
      "Dr. Pavithra has extensive experience working in inclusive educational settings, providing individualized support for children with neurodivergent profiles such as ADHD, learning differences, behavioural regulation challenges, and emotional difficulties. She designs individualized behaviour intervention plans, psychological assessments, and therapeutic programs that help children build self-awareness, emotional regulation, and social confidence.",
      "Her therapeutic approach integrates evidence-based methods including Cognitive Behavioural Therapy (CBT), Dialectical Behaviour Therapy (DBT), Mindfulness-Based Therapy (MBT), Acceptance and Commitment Therapy (ACT), Functional Communication Training (FCT), and expressive art therapy techniques.",
      "Currently working as a Behaviour Intervention Specialist, Dr. Pavithra collaborates closely with parents, teachers, and multidisciplinary professionals to create supportive learning environments that nurture each child's unique potential.",
      "Dr. Pavithra believes that when children feel understood and supported, they gain the confidence to grow, learn, and thrive.",
    ],
  },
  {
    id: "dinesh-jayabalakrishnan",
    name: "Dinesh Jayabalakrishnan",
    title: "B.O.Th. · Table Tennis Coach",
    image: "/Dinesh.png",
    experience: "14+ years",
    specialties: ["Focus & Coordination", "Para-athletes", "Motor Skills", "Sports Therapy"],
    teaser:
      "I build focus, coordination, and confidence through Table Tennis — 1000+ students trained, including national champion para-athletes.",
    fullBio: [
      "In the fast-paced world of Table Tennis, Dinesh Jayabalakrishnan stands out as a dedicated coach and passionate advocate of this game. This game, known for enhancing reflexes, coordination, and concentration, has been Dinesh's lifelong passion. Despite Dinesh's academic achievements, his heart was set on Table Tennis. As a schoolboy in Tamil Nadu, he achieved state-ranking status during his sub-junior stage. He continued to excel in university, representing Bharathiar University in South Zone Inter-University competitions and leading his college team to multiple victories. Internationally, Dinesh played for PT 75 Club in Tampere, Finland, winning several tournaments and securing a ranking position in the SPTL. Back in India, he consistently won team and individual prizes in inter-corporate competitions from 2000 onwards.",
      "With over 14 years of coaching experience, Dinesh has trained over 1000 students, including more than 10 para-athletes. Dinesh has guided para-athletes to become national champions and international medalists. As the State Coach for Karnataka (2019-2022), his students have excelled in national ranking events, winning state championships in U-11 and U-13 categories. His students have also triumphed in CBSE school tournaments and various inter-school competitions.",
      "Dinesh is ITTF Level 1 (2012) and Level 2 Certified Coach (2014)—among the country's elite, being one of only 16 coaches to achieve this certification. He has completed 'Beginning Coaching: General Principles' from Australia (Certificate Number 286671/2011).",
      "Dinesh Jayabalakrishnan's journey is fueled by a singular goal: to promote the game of Table Tennis. He strives to teach the fundamentals of the game, coaching students to excel and supporting them to bring laurels to their institutions and training academies through competition success. His journey is a testament to the transformative power of dedication, passion, and the unyielding spirit to uplift others through sport.",
    ],
  },
  {
    id: "akhila-r-n",
    name: "Akhila R N",
    title: "M.Sc. (Audiology & Speech-Language Pathology) · RCI Licensed Speech Language Pathologist",
    image: "/akhila.png",
    experience: "8+ years",
    specialties: ["Autism", "Language Delays", "Apraxia", "Stuttering", "Speech Therapy"],
    teaser:
      "I help children find their voice — from first words to confident communication — and equip parents with practical strategies for home.",
    fullBio: [
      "Akhila R N is an accomplished Speech Language Pathologist with over 8 years of experience specializing in paediatric speech therapy. She holds an RCI license and has established a thriving practice that values individualized, child-led interventions and parent empowerment.",
      "Akhila completed her Bachelor's degree in Speech and Hearing from Mysore University and earned her Master's degree in Audiology and Speech-Language Pathology from Kasturba Medical College, Mangalore, Manipal University. She is certified in several internationally recognized programs, including the Hanen Programs (More Than Words and TalkAbility), Talk Tools (Levels 1 & 2), PROMPT Therapy (Introduction and Bridging), and Play Therapy. Additionally, she is a Certified Storyteller and a Life Member of the Indian Speech and Hearing Association (ISHA).",
      "Her clinical expertise covers a broad spectrum of communication disorders such as Autism Spectrum Disorders, Language Delays, Motor Speech Disorders (including Apraxia), Articulation Disorders, Stuttering, Social Communication challenges, Oral Motor issues, and Voice Disorders. Akhila is renowned for her ability to translate research into practical, everyday strategies for families, often conducting parent training workshops that create lasting impact.",
      "Akhila's therapeutic philosophy is built on the belief that active family involvement leads to the best outcomes. She systematically integrates meaningful changes into daily routines and equips parents with tools to foster their child's communication at home. Committed to lifelong learning, she continually pursues advanced training and certifications to further enhance the quality of her practice.",
      "By blending evidence-based methods with creative, holistic approaches, Akhila strives to make therapy both effective and enriching for children and their families."
    ],
  },
  {
    id: "mohamed-nowful",
    name: "Dr. S. Mohamed Nowful",
    title:
      "B.O.Th. · Licensed Occupational Therapist · IOTR, NCAHP, AIOTA Life Member · USA certified BLS, ACLS & OPT-1, CLASI Sensory Integration, oromotor stimulation",
    image: "/mohmed.jpeg",
    experience: "2+ years",
    specialties: ["ASD", "ADHD", "Sensory Processing", "Daily Living Skills", "Occupational Therapy"],
    teaser:
      "I help children and adults build independence through sensory regulation and daily living skills training.",
    fullBio: [
      "Dr. S. Mohamed Nowful is a licensed Occupational Therapist holding a Bachelor of Occupational Therapy (B.O.Th.) from JKK Munirajah Medical Research Foundation College of Occupational Therapy. He is a registered member of the Indian Occupational Therapy Registration (IOTR), the National Commission for Allied and Healthcare Professions (NCAHP), and holds Life Membership in the All India Occupational Therapists' Association (AIOTA). He is also USA certified in BLS, ACLS & OPT-1, CLASI Sensory Integration Modules-1, along with certification in oromotor stimulation.",
      "With over 2 years of specialized experience, Dr. Nowful focuses on developmental pediatrics, neurorehabilitation, and mental health. He is skilled in conducting assessments for children and individuals with developmental disorders, neurodevelopmental conditions, and disabilities.",
      "His key areas of expertise include sensory integration therapy, play therapy, reflex integration, daily living skills training, adaptive skills development, and promoting independence across the lifespan—from early intervention to adult lifestyle management.",
      "He provides specialized support for conditions such as Autism Spectrum Disorder (ASD), Cerebral Palsy (CP), Global Developmental Delay (GDD), Sensory Processing Disorders, learning and intellectual disabilities, Attention-Deficit/Hyperactivity Disorder (ADHD), and various genetic disorders. Dr. Nowful is also trained in mental health interventions, including screen addiction management, neuroplasticity-based approaches, and integrating occupational therapy with complementary therapies such as behavioral therapy.",
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

function PersonCard({ person }: { person: Specialist }) {
  return (
    <article className="flex flex-col rounded-3xl overflow-hidden h-full">
      {/* Image */}
      <div className="relative w-full aspect-square rounded-3xl shrink-0">
        {person.image?.asset?.url ? (
          <Image
            src={person.image.asset.url}
            alt={person.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover"
          />
        ) : (
          <PersonImagePlaceholder />
        )}
        {/* Experience Badge */}
        {person.experience && (
          <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-2.5 py-1 rounded-full shadow-sm">
            <span className="text-xs font-semibold text-[#004540]">{person.experience}</span>
          </div>
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

        {/* Specialty Tags */}
        <div className="mt-3 flex flex-wrap gap-1.5">
          {person.specialties?.slice(0, 3).map((specialty) => (
            <span
              key={specialty}
              className="inline-flex px-2 py-0.5 rounded-full bg-[#004540]/10 text-[10px] font-medium text-[#004540]"
            >
              {specialty}
            </span>
          ))}
        </div>

        <p className="mt-3 text-sm text-[#2F3E33]/90 leading-relaxed line-clamp-3">
          {person.teaser}
        </p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <Dialog>
            <DialogTrigger
              className={cn(
                "inline-flex items-center gap-2",
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
              <div className="overflow-y-auto flex-1 -mx-1 px-1 py-2 space-y-4 text-[#2F3E33]/90 text-sm leading-relaxed prose prose-sm prose-green max-w-none">
                <PortableText value={person.fullBio} />
              </div>
            </DialogContent>
          </Dialog>

          <WhatsAppConsultationLink
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full border-2 border-green px-3 text-xs font-semibold text-green hover:bg-green hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            WhatsApp Me
          </WhatsAppConsultationLink>
        </div>
      </div>
    </article>
  );
}

export function FoundersSpecialistsSection({ specialists }: { specialists: Specialist[] }) {
  // Use Sanity data if available, otherwise fallback to PEOPLE (but map PEOPLE to Specialist shape)
  const displayPeople = specialists.length > 0 ? specialists : PEOPLE.map(p => ({
    _id: p.id,
    name: p.name,
    title: p.title,
    image: { asset: { url: p.image } },
    experience: p.experience,
    specialties: p.specialties,
    teaser: p.teaser,
    fullBio: p.fullBio.map(text => ({ _type: 'block', children: [{ _type: 'span', text }] })),
    slug: { current: p.id }
  })) as Specialist[];

  return (
    <section className="py-12 lg:py-16 bg-cream" id="specialists">
      <div className="container mx-auto px-4">
        <div className="text-2xl flex items-center justify-center gap-2 sm:text-3xl text-center lg:text-4xl font-semibold text-purple tracking-tight mb-8 lg:mb-10">
          <Image src="/favorite_wing.svg" alt="Specialists" width={44} height={44} />
          <span>Our Specialists</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {displayPeople.map((person) => (
            <PersonCard key={person._id} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
