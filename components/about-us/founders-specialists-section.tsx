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
  // {
  //   id: "pooja-mittal",
  //   name: "Pooja Mittal",
  //   title: "Founder, Psychologist & Special Educator",
  //   image: "/founder1.png",
  //   teaser:
  //     "My journey into neurodivergent care began with a deeply personal challenge. When my younger son, Divyam, was first diagnosed, he was non-verbal. With determination and continuous effort, he can now speak fluently in both Hindi and English. Out of this vision, Divit Health was born—a place of inspiration, support, and holistic care for neurodivergent children and their families.",
  //   fullBio: [
  //     "My journey into neurodivergent care began with a deeply personal challenge. When my younger son, Divyam, was first diagnosed, he was non-verbal. The early days of his therapy were filled with uncertainty, and I was told that he might never be able to speak. But as a mother, I held onto hope and remained committed to a path of relentless support. With determination and continuous effort, Divyam can now speak fluently in both Hindi and English. Today, he thrives as an independent teenager, and his progress from non-verbal to fluent stands as a powerful transformation—a journey from darkness to light, from uncertainty to hope, and from struggle to immense joy and achievement.",
  //     "This journey not only deepened my understanding of the unique challenges faced by neurodivergent children and their families, but it also ignited a profound desire to offer similar support to others. I am deeply aware of the resilience and dedication required by parents on this journey and strive to provide empathy and guidance to those navigating a similar path.",
  //     "Out of this vision, Divit Health was born. As Co-Founder, COO and CFO, my focus is on establishing Divit Health as a place of inspiration, support, and holistic care for neurodivergent children and their families. At Divit Health, we are committed to redefining healthcare for neurodivergent children through a comprehensive approach centered on each child's well-being and unique potential. Our goals include establishing a state-of-the-art Child Development Center (CDC) and a 'Residential school' for children with special needs, designed to provide a nurturing, inclusive environment where children can learn, grow, and develop independence.",
  //     "Through Divit Health, I am committed to fostering a supportive community where families feel empowered, and every child is given the opportunity to flourish. Together, we are building a foundation for a brighter, more inclusive future for neurodivergent children and their loved ones.",
  //   ],
  // },
  // {
  //   id: "akshaya-gnanashree",
  //   name: "Mrs Akshaya Gnanashree",
  //   title: "Clinical Psychologist",
  //   image: "https://plus.unsplash.com/premium_photo-1688740375397-34605b6abe48?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   teaser:
  //     "RCI Licensed Clinical Psychologist with M.Sc in Clinical Psychology from Manipal University and M.Phil from Institute of Mental Health Chennai. Trained in IQ tests, ADHD and Autism assessments, and psychotherapies including CBT, DBT, and IPT. Experienced in support groups, teaching, and mentoring.",
  //   fullBio: [
  //     "Mrs Akshaya Gnanashree is an RCI Licensed Clinical Psychologist with a M.Sc in Clinical Psychology from Manipal University and M.Phil in Clinical Psychology from Institute of Mental Health Chennai. She has 4 years of experience and is trained in taking assessments for various conditions such as IQ tests, Behaviour problem assessments, ADHD and Autism tests for children, adolescents and adults.",
  //     "She is also trained in diagnosing, assessing and treating a range of psychiatric conditions. She is also experienced in providing psychotherapies such as CBT, DBT, IPT, Grief therapies based on the clients needs. Akshaya is also involved in facilitating support groups and in teaching and mentoring for young psychology aspirants. She conducts internships, workshops and supervision for therapists.",
  //   ],
  // },
  // {
  //   id: "pavithra-dp",
  //   name: "Dr. Pavithra DP",
  //   title: "Expert in Pediatric Physical Therapy",
  //   image: "https://plus.unsplash.com/premium_photo-1677368598732-b944defee32c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   teaser:
  //     "Highly accomplished physical therapist specializing in pediatric therapy, with gold medal achievements and certifications in Dynamic Movement Intervention (DMI), Sensory Integration, and Play Therapy. Member of the Indian Association of Physiotherapists (MIAP).",
  //   fullBio: [
  //     "Dr. Pavithra DP is a highly accomplished physical therapist specializing in pediatric therapy, recognized for her gold medal achievements and extensive certifications. She is a member of the Indian Association of Physiotherapists (MIAP), with the license number L-56294.",
  //     "Certifications and Specializations: Dynamic Movement Intervention (DMI) Levels A and B: Dr. Pavithra is certified in DMI, a therapeutic approach that uses dynamic exercises to enhance motor function in children with developmental and neurological disorders. This certification highlights her ability to apply advanced techniques to improve physical outcomes in her young patients.",
  //     "Sensory Integration (USA) Level 1: Sensory integration therapy helps children with sensory processing issues. Dr. Pavithra's certification in this area allows her to provide structured sensory experiences to assist children in coping with and overcoming sensory challenges.",
  //     "Play Therapy: As a certified play therapist, Dr. Pavithra uses therapeutic play activities to address psychological and emotional challenges in children. This approach helps children express their feelings, develop problem-solving skills, and improve social interactions.",
  //     "Professional Approach: Dr. Pavithra combines her diverse training and certifications to provide comprehensive and individualized care. Her multifaceted approach integrates dynamic movement, sensory integration and play therapy, ensuring that each child receives holistic and effective treatment. Her dedication to continuous learning and application of diverse therapeutic techniques underscores her commitment to improving the quality of life for children with various developmental and neurological conditions.",
  //     "Dr. Pavithra's expertise and compassionate approach make her a leading figure in pediatric physical therapy, offering specialized care that addresses both physical and emotional needs of her young patients.",
  //   ],
  // },
  // {
  //   id: "ankita-rastogi",
  //   name: "Ankita Rastogi",
  //   title: "Occupational Therapist",
  //   image: "https://plus.unsplash.com/premium_photo-1690395794791-e85944b25c0f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //   teaser:
  //     "Distinguished occupational therapist and child counsellor with a Master's in Psychology (IGNOU) and BOT from Delhi University (2nd rank). Certified in Sensory Integration, Handwriting Without Tears, and Yoga. Specializations include sensory integration therapy, NDT, and behavioural modification.",
  //   fullBio: [
  //     "Ankita Rastogi is a distinguished occupational therapist and child counsellor with a robust academic background and extensive professional experience. Born on June 14, 1987, in Ghaziabad, she holds a Master's degree in Psychology from IGNOU and a Bachelor of Occupational Therapy from Delhi University, where she graduated with a 72% score, earning the 2nd rank. Her educational credentials are further bolstered by certifications in Sensory Integration Praxis from the University of Southern California, Handwriting Without Tears from the U.S., and Yoga from Vishwa Bharti Yoga Sansthan, among others.",
  //     "Ankita has completed internships at the Pandit Deendayal Upadhyaya Institute for Physically Handicapped, New Delhi, gaining valuable experience in various departments. Professionally, she has worked as an occupational therapist at Orkids, Noida, and Children First, and as a child counsellor at Excelsior American School and Soch Gurgaon. Her consultancy roles include positions at Green Ribbon International School and as the head of ABHIVYAKTI, where she dealt with conditions such as Autism, PDD, SPD, learning disabilities, and behavioural issues.",
  //     "Ankita has attended numerous workshops and conferences, enhancing her expertise in ergonomics, cerebral palsy, autism, non-verbal learning disabilities, and behavioural modification. She has also received a scholarship from Northampton University, London for her master's in occupational therapy. Her specializations include sensory integration therapy, neurodevelopmental therapy, and behavioural modification.",
  //     "Ankita's commitment to improving children's independence and health is reflected in her diverse project work, including developing balance aids and innovative therapeutic tools. Her extra-curricular activities showcase her leadership and organizational skills, having participated in national-level dance competitions and organizing college events. Ankita is dedicated to providing holistic care and fostering a supportive environment for children's development.",
  //   ],
  // },
  // Migrated from our-advisor-section
  {
    id: "akhila-r-n",
    name: "Akhila R N",
    title: "M.Sc. (Audiology & Speech-Language Pathology) · RCI Licensed Speech Language Pathologist",
    image: "/akhila.png",
    teaser:
      "Speech Language Pathologist with over 8 years of dedicated experience in paediatric speech therapy. Licensed RCI professional focused on individualized, child-led therapy and empowering parents.",
    fullBio: [
      "Akhila R N is an accomplished Speech Language Pathologist with over 8 years of experience specializing in paediatric speech therapy. She holds an RCI license and has established a thriving practice that values individualized, child-led interventions and parent empowerment.",
      "Akhila completed her Bachelor's degree in Speech and Hearing from Mysore University and earned her Master's degree in Audiology and Speech-Language Pathology from Kasturba Medical College, Mangalore, Manipal University. She is certified in several internationally recognized programs, including the Hanen Programs (More Than Words and TalkAbility), Talk Tools (Levels 1 & 2), PROMPT Therapy (Introduction and Bridging), and Play Therapy. Additionally, she is a Certified Storyteller and a Life Member of the Indian Speech and Hearing Association (ISHA).",
      "Her clinical expertise covers a broad spectrum of communication disorders such as Autism Spectrum Disorders, Language Delays, Motor Speech Disorders (including Apraxia), Articulation Disorders, Stuttering, Social Communication challenges, Oral Motor issues, and Voice Disorders. Akhila is renowned for her ability to translate research into practical, everyday strategies for families, often conducting parent training workshops that create lasting impact.",
      "Akhila’s therapeutic philosophy is built on the belief that active family involvement leads to the best outcomes. She systematically integrates meaningful changes into daily routines and equips parents with tools to foster their child’s communication at home. Committed to lifelong learning, she continually pursues advanced training and certifications to further enhance the quality of her practice.",
      "By blending evidence-based methods with creative, holistic approaches, Akhila strives to make therapy both effective and enriching for children and their families."
    ],
  },
  {
    id: "debarati-basak",
    name: "Dr. Debarati Basak",
    title: "Psy.D · Founding Partner, Carpediem EdPsych Consultancy LLP · Chief Growth Officer",
    image: "/Debarati.jpeg",
    teaser:
      "A practicing psychologist with 20+ years of experience in research, counselling, and psychotherapy. She is dedicated to mental health, inclusive education, and supporting schools, teachers, and families.",
    fullBio: [
      "Dr. Debarati is a practicing psychologist with 20+ years of experience in research, counselling, and psychotherapy. She has completed her M.Sc. in Psychology from Calcutta University and M.S in Psychotherapy & Counselling from a U.S. University.",
      "Her research areas are cognition, disability and parental role. She is a recipient of a scholarship from the Lady Tata Memorial Trust for her research in the field of disability.",
      "Her previous assignments include being the Head of a reputed school's Department of Special Needs and Center Head of a Counselling Center in Bangalore. She has extensive experience in school counselling, taking care of the mental health of stakeholders in the school, and supporting schools in their journey toward inclusion.",
      "She has conducted training sessions for students, teachers, and parents in mental health. She is a CBSE master trainer in Life Skills and Inclusion & Inclusive Practices. Her areas of interest are counselling and psychotherapy. She has an affinity for working with children, adolescents, and the adult population and has extensive experience working with students, teachers, and parents in mental health and relationship management.",
      "She is a Professor of Practice (Adjunct Faculty) at the Kristu Jayanti College, Autonomous, Bengaluru and a guest lecturer at various educational institutions. She is also a POSH Certified Trainer (TUV-SUD). She is a Professor of Practice at the Kristu Jayanti College, Bangalore and a guest faculty at Jyoti Nivas College, Autonomous Bangalore.",
    ],
  },
  {
    id: "mohamed-nowful",
    name: "Dr. S. Mohamed Nowful",
    title:
      "B.O.Th. · Licensed Occupational Therapist · IOTR, NCAHP, AIOTA Life Member · USA certified BLS, ACLS & OPT-1, CLASI Sensory Integration, oromotor stimulation",
    image: "/mohmed.jpeg",
    teaser:
      "With over 2 years of specialized experience, Dr. Nowful focuses on developmental pediatrics, neurorehabilitation, and mental health. He is skilled in conducting assessments for children and individuals with developmental disorders and disabilities. His key expertise includes sensory integration therapy, play therapy, reflex integration, daily living skills training, and support for ASD, CP, GDD, ADHD, and mental health interventions.",
    fullBio: [
      "Dr. S. Mohamed Nowful is a licensed Occupational Therapist holding a Bachelor of Occupational Therapy (B.O.Th.) from JKK Munirajah Medical Research Foundation College of Occupational Therapy. He is a registered member of the Indian Occupational Therapy Registration (IOTR), the National Commission for Allied and Healthcare Professions (NCAHP), and holds Life Membership in the All India Occupational Therapists' Association (AIOTA). He is also USA certified in BLS, ACLS & OPT-1, CLASI Sensory Integration Modules-1, along with certification in oromotor stimulation.",
      "With over 2 years of specialized experience, Dr. Nowful focuses on developmental pediatrics, neurorehabilitation, and mental health. He is skilled in conducting assessments for children and individuals with developmental disorders, neurodevelopmental conditions, and disabilities.",
      "His key areas of expertise include sensory integration therapy, play therapy, reflex integration, daily living skills training, adaptive skills development, and promoting independence across the lifespan—from early intervention to adult lifestyle management.",
      "He provides specialized support for conditions such as Autism Spectrum Disorder (ASD), Cerebral Palsy (CP), Global Developmental Delay (GDD), Sensory Processing Disorders, learning and intellectual disabilities, Attention-Deficit/Hyperactivity Disorder (ADHD), and various genetic disorders. Dr. Nowful is also trained in mental health interventions, including screen addiction management, neuroplasticity-based approaches, and integrating occupational therapy with complementary therapies such as behavioral therapy.",
    ],
  },
  {
    id: "dinesh-jayabalakrishnan",
    name: "Dinesh Jayabalakrishnan",
    title: "B.O.Th. · Table Tennis Coach",
    image: "/Dinesh.png",
    teaser:
      "A dedicated coach and passionate advocate of Table Tennis with over 14 years of coaching experience. Dinesh has trained over 1000 students, including more than 10 para-athletes, and served as State Coach for Karnataka (2019-2022). ITTF Level 1 and Level 2 Certified Coach—one of only 16 in the country—with a mission to promote the game and help students excel.",
    fullBio: [
      "In the fast-paced world of Table Tennis, Dinesh Jayabalakrishnan stands out as a dedicated coach and passionate advocate of this game. This game, known for enhancing reflexes, coordination, and concentration, has been Dinesh's lifelong passion. Despite Dinesh's academic achievements, his heart was set on Table Tennis. As a schoolboy in Tamil Nadu, he achieved state-ranking status during his sub-junior stage. He continued to excel in university, representing Bharathiar University in South Zone Inter-University competitions and leading his college team to multiple victories. Internationally, Dinesh played for PT 75 Club in Tampere, Finland, winning several tournaments and securing a ranking position in the SPTL. Back in India, he consistently won team and individual prizes in inter-corporate competitions from 2000 onwards.",
      "With over 14 years of coaching experience, Dinesh has trained over 1000 students, including more than 10 para-athletes. Dinesh has guided para-athletes to become national champions and international medalists. As the State Coach for Karnataka (2019-2022), his students have excelled in national ranking events, winning state championships in U-11 and U-13 categories. His students have also triumphed in CBSE school tournaments and various inter-school competitions.",
      "Dinesh is ITTF Level 1 (2012) and Level 2 Certified Coach (2014)—among the country's elite, being one of only 16 coaches to achieve this certification. He has completed 'Beginning Coaching: General Principles' from Australia (Certificate Number 286671/2011).",
      "Dinesh Jayabalakrishnan's journey is fueled by a singular goal: to promote the game of Table Tennis. He strives to teach the fundamentals of the game, coaching students to excel and supporting them to bring laurels to their institutions and training academies through competition success. His journey is a testament to the transformative power of dedication, passion, and the unyielding spirit to uplift others through sport.",
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
    <section className="py-12 lg:py-16 bg-cream" id="founders-specialists">
      <div className="container mx-auto px-4">
        <div className="text-2xl flex items-center justify-center gap-2 sm:text-3xl text-center lg:text-4xl font-semibold text-purple tracking-tight mb-8 lg:mb-10">
          <Image src="/favorite_wing.svg" alt="Consultants" width={44} height={44} />
          <span>Consultants</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-4">
          {PEOPLE.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </div>
      </div>
    </section>
  );
}
