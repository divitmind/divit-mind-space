import Link from "next/link";
import { CheckCircle2, Sparkles, Users, GraduationCap, ShieldCheck } from "lucide-react";
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
    <div className="space-y-12 lg:space-y-16">
      {/* SECTION 1: Brief Introduction Hero Banner */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-white border border-black/5 p-6 lg:p-12 shadow-sm">
        <div className="absolute -right-12 -top-12 w-80 h-80 bg-green/5 rounded-full blur-3xl opacity-70 pointer-events-none" />
        <div className="relative z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-green/10 text-green text-[11px] font-bold uppercase tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            Specialist Mental Health Care
          </div>
          <h2
            className="text-3xl lg:text-5xl font-serif text-black leading-tight italic mb-6"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            {title}
          </h2>
          <div className="space-y-4 text-black/80 text-base lg:text-xl font-medium leading-relaxed border-l-2 border-green/20 pl-6 lg:pl-8">
            <p>
              Professional psychiatric consultations for the assessment and management of emotional, behavioural, and mental health concerns in <strong>Children</strong>, <strong>Teens</strong>, <strong>Adults</strong>, and <strong>Geriatrics</strong>.
            </p>
            <p className="text-black/70">
              Individualised mental health care, treatment guidance, and ongoing support at Divit MindSpace, Bangalore.
            </p>
          </div>
          <div className="mt-8 pt-6 border-t border-black/5 flex flex-wrap items-center gap-3">
            <span className="text-[11px] font-bold uppercase tracking-widest text-black/40">Serving:</span>
            {["Children", "Teens", "Adults", "Older Adults / Geriatrics"].map((demo) => (
              <span
                key={demo}
                className="px-3.5 py-1 rounded-full bg-[#FAF9F5] border border-black/5 text-xs font-semibold text-black/70"
              >
                {demo}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2 & 3: Children & Adolescents */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-green/10 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-green" />
          </div>
          <div>
            <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-green">
              Developmental & Youth Care
            </span>
            <h3
              className="text-2xl lg:text-4xl font-serif text-black italic"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Children & Adolescents
            </h3>
          </div>
        </div>

        {/* Narrative Clinical Content */}
        <div className="bg-white rounded-[2rem] border border-black/5 p-6 lg:p-10 shadow-sm space-y-5 text-black/75 text-base lg:text-lg leading-relaxed font-medium">
          <p>
            Children and adolescents experience several emotional, behavioural, social, and developmental changes as they grow. Sometimes, these changes may be accompanied by difficulties that affect their relationships, learning, behaviour, or everyday functioning.
          </p>
          <p>
            A psychiatric consultation helps explore these concerns by understanding the child&apos;s emotional and behavioural experiences, developmental history, family environment, and overall well-being.
          </p>
          <p>
            At Divit MindSpace, consultations aim to provide a better understanding of the challenges children and adolescents may be experiencing. The psychiatrist may assess concerns related to attention, mood, behaviour, anxiety, sleep, and other aspects of mental health. Parents and caregivers may also be involved in the consultation to provide relevant information and support the child&apos;s care.
          </p>
          <p className="bg-[#FAF9F5] p-5 rounded-2xl border border-black/5 text-black/80 italic">
            Based on the assessment, appropriate recommendations may include further evaluation, medication when clinically indicated, behavioural support, or referrals for psychological interventions.
          </p>
        </div>

        {/* When to Reach Out – Children & Adolescents */}
        <div className="bg-white rounded-[2rem] border border-black/5 p-6 lg:p-10 shadow-sm space-y-8">
          <div className="border-l-2 border-green/20 pl-4">
            <h4
              className="text-xl lg:text-2xl font-serif text-green italic"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              When to Reach Out – Children & Adolescents
            </h4>
          </div>

          <div className="space-y-3 text-black/70 text-base font-medium leading-relaxed">
            <p>
              Children may not always have the words to express what they are feeling or experiencing. Changes in their behaviour, emotions, or everyday functioning may sometimes indicate that they need additional support.
            </p>
            <p className="font-semibold text-black/90">
              A psychiatric consultation may be helpful when a child or adolescent:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {childReasons.map((item, index) => (
              <div
                key={index}
                className="p-5 lg:p-6 rounded-2xl bg-[#FAF9F5] border border-black/5 hover:border-green/30 transition-all flex items-start gap-4"
              >
                <div className="w-6 h-6 rounded-full bg-green/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-green" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-black text-[15px] lg:text-[16px]">
                    {item.title}
                  </h5>
                  <p className="text-black/70 text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-green/[0.06] to-transparent border border-green/15 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-green shrink-0 mt-0.5" />
            <p className="text-sm lg:text-base text-black/80 font-medium italic leading-relaxed">
              Seeking a consultation can help parents and caregivers better understand these concerns, explore possible underlying factors, and identify appropriate support for the child&apos;s well-being.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 4 & 5: Adults & Geriatrics */}
      <section className="space-y-8">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-12 h-12 rounded-2xl bg-green/10 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-green" />
          </div>
          <div>
            <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-widest text-green">
              Lifespan & Senior Well-Being
            </span>
            <h3
              className="text-2xl lg:text-4xl font-serif text-black italic"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Adults & Geriatrics
            </h3>
          </div>
        </div>

        {/* Narrative Clinical Content */}
        <div className="bg-white rounded-[2rem] border border-black/5 p-6 lg:p-10 shadow-sm space-y-5 text-black/75 text-base lg:text-lg leading-relaxed font-medium">
          <p>
            Mental health is an important part of overall well-being at every stage of adulthood. Personal responsibilities, relationships, work-related pressures, health concerns, and major life transitions can sometimes affect an individual&apos;s emotional and psychological functioning.
          </p>
          <p>
            A psychiatric consultation provides an opportunity to discuss these experiences and explore concerns that may be affecting everyday life. It involves understanding an individual&apos;s symptoms, personal and medical history, emotional experiences, and overall mental health.
          </p>
          <p>
            For adults, consultations may address concerns related to mood, anxiety, stress, sleep, behavioural changes, and other mental health difficulties. The psychiatrist works towards understanding the nature of these concerns and identifying appropriate treatment options.
          </p>
          <p>
            For older adults, psychiatric consultations may also explore changes in mood, memory, behaviour, sleep, and everyday functioning. These concerns may be influenced by various psychological, physical, or age-related factors and may require further evaluation.
          </p>
          <p className="bg-[#FAF9F5] p-5 rounded-2xl border border-black/5 text-black/80 italic">
            At Divit MindSpace, consultations are guided by individual needs and aim to provide appropriate assessment, treatment recommendations, and continued support. Depending on the findings, care may involve medication, further investigations, psychological interventions, or referrals to other healthcare professionals.
          </p>
        </div>

        {/* When to Reach Out – Adults & Geriatrics */}
        <div className="bg-white rounded-[2rem] border border-black/5 p-6 lg:p-10 shadow-sm space-y-8">
          <div className="border-l-2 border-green/20 pl-4">
            <h4
              className="text-xl lg:text-2xl font-serif text-green italic"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              When to Reach Out – Adults & Geriatrics
            </h4>
          </div>

          <div className="space-y-3 text-black/70 text-base font-medium leading-relaxed">
            <p>
              Mental health concerns can affect individuals in different ways and may not always be immediately recognised. Seeking professional guidance can help individuals understand what they are experiencing and explore appropriate ways to manage their concerns.
            </p>
            <p className="font-semibold text-black/90">
              A psychiatric consultation may be beneficial if you:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {adultReasons.map((item, index) => (
              <div
                key={index}
                className="p-5 lg:p-6 rounded-2xl bg-[#FAF9F5] border border-black/5 hover:border-green/30 transition-all flex items-start gap-4"
              >
                <div className="w-6 h-6 rounded-full bg-green/10 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-green" />
                </div>
                <div className="space-y-1">
                  <h5 className="font-bold text-black text-[15px] lg:text-[16px]">
                    {item.title}
                  </h5>
                  <p className="text-black/70 text-sm leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Conclusion */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-green/[0.06] to-transparent border border-green/15 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-green shrink-0 mt-0.5" />
            <p className="text-sm lg:text-base text-black/80 font-medium italic leading-relaxed">
              A psychiatric consultation can help identify possible underlying concerns, clarify treatment needs, and establish an appropriate plan of care. Seeking help early can make it easier to understand and address mental health difficulties.
            </p>
          </div>
        </div>
      </section>

      {/* Consultation CTA Banner */}
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
