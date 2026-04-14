"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { SpecialistCard } from "@/components/ui/specialist-card";
import { Specialist } from "@/sanity/types";

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
    title: "Clinical Psychologist | Child & Adolescent Behaviour Intervention Specialist | Certified Art therapist | SEN (uk certified)",
    image: "/pavithra-lakshmi.png",
    experience: "18+ years",
    specialties: ["ADHD", "Behavioural Support", "Emotional Regulation", "Art Therapy"],
    teaser:
      "PhD Clinical Psychologist using CBT, DBT, and art therapy to help children build emotional regulation.",
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
      "ITTF Level 2 certified coach — trained 1000+ students and guided para-athletes to national championships.",
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
      "Hanen & PROMPT certified Speech Therapist — helping children with autism, apraxia, and stuttering find their voice.",
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
    <section className="py-12 lg:py-20 bg-cream" id="specialists">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <Image src="/favorite_wing.svg" alt="Specialists" width={44} height={44} className="opacity-80" />
            <h2 className="text-3xl lg:text-5xl font-serif italic text-green tracking-tight">
              Our Specialists
            </h2>
          </div>
          <p className="text-black/70 font-medium max-w-2xl mx-auto">
            A multidisciplinary team of dedicated experts working together to support your child&apos;s growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {displayPeople.map((person, idx) => (
            <motion.div
              key={person._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
            >
              <SpecialistCard specialist={person} variant="full" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
