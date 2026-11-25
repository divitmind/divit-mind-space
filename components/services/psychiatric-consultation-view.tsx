import Link from "next/link";
import { Users, GraduationCap } from "lucide-react";
import { WhatsAppConsultationLink } from "@/components/whatsapp-consultation-link";

interface PsychiatricConsultationViewProps {
  title?: string;
}

export function PsychiatricConsultationView({ title = "Psychiatric Consultation" }: PsychiatricConsultationViewProps) {
  const childReasons = [
    {
      title: "Experiences Persistent Emotional Distress",
      desc: "Frequently experiences sadness, excessive worry, irritability, emotional outbursts, or difficulty managing emotions.",
    },
    {
      title: "Shows Changes in Behaviour",
      desc: "Displays significant or recurring changes in behaviour, including aggression, withdrawal, impulsivity, or unusual behavioural patterns.",
    },
    {
      title: "Faces Attention and Concentration Difficulties",
      desc: "Struggles with maintaining attention, managing impulsive behaviour, or regulating activity levels in ways that affect everyday functioning.",
    },
    {
      title: "Experiences Social or Developmental Concerns",
      desc: "Faces difficulties with social interactions, communication, or age-appropriate developmental milestones that may require further evaluation.",
    },
    {
      title: "Has Sleep or Eating Difficulties",
      desc: "Experiences persistent changes in sleep patterns, appetite, or eating habits that affect overall well-being.",
    },
    {
      title: "Struggles at School",
      desc: "Shows changes in academic performance, school participation, motivation, or adjustment that may be associated with emotional or behavioural difficulties.",
    },
    {
      title: "Experiences Significant Life Changes",
      desc: "Has difficulty coping with family changes, loss, bullying, stressful experiences, or other challenging situations.",
    },
    {
      title: "Shows Concerning Changes in Functioning",
      desc: "Experiences difficulties that interfere with relationships, daily activities, learning, or overall quality of life.",
    },
  ];

  const adultReasons = [
    {
      title: "Experience Persistent Changes in Mood",
      desc: "Frequently feel sad, low, irritable, emotionally overwhelmed, or experience significant changes in mood.",
    },
    {
      title: "Struggle with Anxiety or Excessive Worry",
      desc: "Experience persistent worry, fear, panic, restlessness, or difficulty managing everyday stress.",
    },
    {
      title: "Notice Changes in Sleep or Appetite",
      desc: "Experience ongoing sleep disturbances, changes in eating habits, or alterations in daily routines.",
    },
    {
      title: "Face Difficulties in Everyday Functioning",
      desc: "Find it increasingly difficult to manage work, studies, personal responsibilities, or relationships because of emotional or psychological concerns.",
    },
    {
      title: "Experience Changes in Thoughts or Behaviour",
      desc: "Notice recurring patterns of distressing thoughts, unusual perceptions, changes in behaviour, or difficulties with concentration and decision-making.",
    },
    {
      title: "Have Concerns About Substance Use",
      desc: "Experience difficulties related to alcohol or other substance use and wish to seek professional guidance.",
    },
    {
      title: "Navigate Major Life Changes",
      desc: "Experience emotional difficulties following loss, relationship challenges, significant transitions, or stressful life experiences.",
    },
    {
      title: "Notice Changes in Later Life",
      desc: "Observe changes in memory, mood, behaviour, sleep, or daily functioning that may require further assessment.",
    },
    {
      title: "Need a Professional Mental Health Evaluation",
      desc: "Wish to understand persistent psychological concerns, seek clarification about an existing diagnosis, or explore treatment options recommended by a healthcare professional.",
    },
  ];

  return (
    <div className="space-y-8 lg:space-y-12">
      {/* Intro Banner - 5:7 split matching Assessments Hub */}
      <section className="bg-white rounded-[2.5rem] border border-black/5 p-6 lg:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute -right-8 -top-8 w-64 h-64 bg-green/5 rounded-full blur-3xl opacity-60 pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-5">
            <h2
              className="text-3xl lg:text-4xl font-serif text-black leading-tight italic"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              {title}
            </h2>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-3 text-black/70 text-base lg:text-lg font-medium leading-relaxed border-l-2 border-green/10 pl-6 lg:pl-8 py-1">
              <p>
                Professional psychiatric consultations for the assessment and management of emotional, behavioural, and mental health concerns in <strong>Children</strong>, <strong>Teens</strong>, <strong>Adults</strong>, and <strong>Geriatrics</strong>.
              </p>
              <p>
                Individualised mental health care, treatment guidance, and ongoing support at Divit MindSpace, Bangalore.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Two Column Grid (5:7 ratio) matching Assessments Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
        {/* Left Column (5 cols): Children & Adolescents */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-green/5 flex items-center justify-center shrink-0">
              <Users className="w-6 h-6 text-green" />
            </div>
            <h3 className="text-xl lg:text-2xl font-serif text-black italic">
              <strong>Children</strong> & <strong>Adolescents</strong>
            </h3>
          </div>

          {/* Top Box: Core clinical narrative and consultation details */}
          <div className="bg-white rounded-[2rem] border border-black/5 p-6 lg:p-7 shadow-sm flex flex-col justify-between flex-1">
            <div className="space-y-4 text-black/75 text-[15px] leading-relaxed font-medium">
              <p className="border-l-2 border-green/10 pl-4 italic">
                Children and adolescents experience several emotional, behavioural, social, and developmental changes as they grow. Sometimes, these changes may be accompanied by difficulties that affect their relationships, learning, behaviour, or everyday functioning.
              </p>
              <p>
                A psychiatric consultation helps explore these concerns by understanding the child&apos;s emotional and behavioural experiences, developmental history, family environment, and overall well-being.
              </p>
              <p>
                At Divit MindSpace, consultations aim to provide a better understanding of the challenges children and adolescents may be experiencing. The psychiatrist may assess concerns related to attention, mood, behaviour, anxiety, sleep, and other aspects of mental health. Parents and caregivers may also be involved in the consultation to provide relevant information and support the child&apos;s care.
              </p>
            </div>
            <div className="mt-5 pt-5 border-t border-black/5 bg-[#FAF9F5] -mx-6 -mb-6 p-6 rounded-b-[2rem]">
              <p className="text-green font-bold italic tracking-wide text-xs sm:text-sm">
                Based on the assessment, appropriate recommendations may include further evaluation, medication when clinically indicated, behavioural support, or referrals for psychological interventions.
              </p>
            </div>
          </div>

          {/* Bottom Box: When to Reach Out */}
          <div className="bg-white rounded-[2rem] border border-black/5 p-6 lg:p-7 shadow-sm flex flex-col justify-between flex-1">
            <div>
              <h4 className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3 px-1">
                When to Reach Out:
              </h4>
              <p className="text-xs text-black/60 mb-5 italic">
                Children may not always have the words to express what they are feeling or experiencing. Changes in behaviour or emotions may indicate that they need additional support. A consultation may be helpful when a child or adolescent:
              </p>
              <ul className="space-y-4">
                {childReasons.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-green mt-2 shrink-0" />
                    <p className="text-[14px] text-black/70 leading-relaxed">
                      <strong className="text-black font-bold">{item.title}:</strong> {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-5 border-t border-black/5">
              <p className="text-xs text-black/70 italic leading-relaxed">
                Seeking a consultation can help parents and caregivers better understand these concerns, explore possible underlying factors, and identify appropriate support for the child&apos;s well-being.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Adults & Geriatrics */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-green/5 flex items-center justify-center shrink-0">
              <GraduationCap className="w-6 h-6 text-green" />
            </div>
            <h3 className="text-xl lg:text-2xl font-serif text-black italic">
              <strong>Adults</strong> & <strong>Geriatrics</strong>
            </h3>
          </div>

          {/* Top Box: Core clinical narrative and consultation details */}
          <div className="bg-white rounded-[2rem] border border-black/5 p-6 lg:p-7 shadow-sm flex flex-col justify-between flex-1">
            <div className="space-y-4 text-black/75 text-[15px] leading-relaxed font-medium">
              <p className="border-l-2 border-green/10 pl-4 italic">
                Mental health is an important part of overall well-being at every stage of adulthood. Personal responsibilities, relationships, work-related pressures, health concerns, and major life transitions can sometimes affect an individual&apos;s emotional and psychological functioning.
              </p>
              <p>
                A psychiatric consultation provides an opportunity to discuss these experiences and explore concerns that may be affecting everyday life. It involves understanding an individual&apos;s symptoms, personal and medical history, emotional experiences, and overall mental health.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-black/5">
                  <h5 className="font-bold text-black text-sm mb-1">For Adults</h5>
                  <p className="text-xs text-black/70 leading-relaxed">
                    Consultations may address concerns related to mood, anxiety, stress, sleep, behavioural changes, and other mental health difficulties. The psychiatrist works towards understanding the nature of these concerns and identifying appropriate treatment options.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-[#FAF9F5] border border-black/5">
                  <h5 className="font-bold text-black text-sm mb-1">For Older Adults (Geriatrics)</h5>
                  <p className="text-xs text-black/70 leading-relaxed">
                    Psychiatric consultations may also explore changes in mood, memory, behaviour, sleep, and everyday functioning, which may be influenced by psychological, physical, or age-related factors.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-5 pt-5 border-t border-black/5 bg-[#FAF9F5] -mx-6 -mb-6 p-6 rounded-b-[2rem]">
              <p className="text-green font-bold italic tracking-wide text-xs sm:text-sm">
                At Divit MindSpace, consultations are guided by individual needs and aim to provide appropriate assessment, treatment recommendations, and continued support. Depending on findings, care may involve medication, further investigations, psychological interventions, or referrals to other healthcare professionals.
              </p>
            </div>
          </div>

          {/* Bottom Box: When to Reach Out */}
          <div className="bg-white rounded-[2rem] border border-black/5 p-6 lg:p-7 shadow-sm flex flex-col justify-between flex-1">
            <div>
              <h4 className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em] text-black/40 mb-3 px-1">
                When to Reach Out:
              </h4>
              <p className="text-xs text-black/60 mb-5 italic">
                Mental health concerns can affect individuals in different ways and may not always be immediately recognised. Seeking professional guidance can help explore appropriate ways to manage your concerns:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                {adultReasons.map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-green mt-2 shrink-0" />
                    <p className="text-[14px] text-black/70 leading-relaxed">
                      <strong className="text-black font-bold">{item.title}:</strong> {item.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-5 border-t border-black/5">
              <p className="text-xs text-black/70 italic leading-relaxed">
                A psychiatric consultation can help identify possible underlying concerns, clarify treatment needs, and establish an appropriate plan of care. Seeking help early can make it easier to understand and address mental health difficulties.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Booking CTA at the Bottom */}
      <section className="bg-gradient-to-br from-[#7A9A7D]/10 via-white to-[#E8D5B7]/20 rounded-[2.5rem] border border-[#7A9A7D]/20 p-8 lg:p-12 shadow-sm">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h4
            className="text-2xl lg:text-4xl font-serif text-black italic leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            Take the First Step Toward Clarity & Care
          </h4>
          <p className="text-black/70 text-base lg:text-lg leading-relaxed font-medium">
            Whether you are seeking guidance for your child, teen, yourself, or an older family member, our experienced clinical team is here to listen and help.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <WhatsAppConsultationLink className="dm-pill-button dm-pill-button-primary w-full sm:w-auto">
              Book a Psychiatric Consultation
            </WhatsAppConsultationLink>
            <Link
              href="/contact-us"
              className="dm-pill-button dm-pill-button-secondary w-full sm:w-auto"
            >
              Contact Our Center
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
