"""
AEO FAQ Injector — Competitor Takedown Script
Targets: psychometric-assessments, psychoeducational-assessments, counselling
Injects 10 "People Also Ask" style FAQs per service to steal Google snippets.
"""
import requests, urllib.parse, json, uuid, os
from pathlib import Path

try:
    from dotenv import load_dotenv
    env_path = Path(__file__).parent.parent / ".env.local"
    if env_path.exists():
        load_dotenv(env_path)
except ImportError:
    pass

PROJECT_ID = "3c4uripz"
DATASET = "production"
API_VERSION = "2021-06-07"
WRITE_TOKEN = os.getenv("SANITY_WRITE_TOKEN")
if not WRITE_TOKEN:
    raise ValueError("SANITY_WRITE_TOKEN is missing")

BASE_URL = f"https://{PROJECT_ID}.api.sanity.io/v{API_VERSION}"
HEADERS = {"Authorization": f"Bearer {WRITE_TOKEN}", "Content-Type": "application/json"}

def gen_key():
    return str(uuid.uuid4())[:12]

# ──────────────────────────────────────────────────────────────
# AEO FAQ DATA — Competitor keyword targets
# Based on top-ranking competitor content from:
# Practo, Mindtalk/Cadabams, Beautiful Mind Healthcare, TMS Mindspace
# ──────────────────────────────────────────────────────────────

SERVICE_FAQS = {
    "psychometric-assessments": [
        {"question": "What is a psychometric assessment and how is it different from a regular test?", "answer": "A psychometric assessment is a standardized, scientifically validated evaluation administered by an RCI-licensed clinical psychologist. Unlike regular school tests that measure knowledge, psychometric tests measure cognitive abilities, personality traits, aptitude, and behavioral patterns. At Divit MindSpace, we use internationally recognized tools to provide a comprehensive profile of your strengths and areas for support."},
        {"question": "How much does a psychometric assessment cost in Bangalore?", "answer": "The cost of a psychometric assessment in Bangalore typically ranges from INR 3,000 to INR 15,000 depending on the type and depth of assessment required. Comprehensive neurodevelopmental assessments that include multiple standardized tests, clinical interviews, and a detailed report may be at the higher end. We recommend scheduling a free consultation first to understand exactly which assessments are needed for your specific situation."},
        {"question": "How long does ADHD testing take?", "answer": "A comprehensive ADHD assessment typically takes 2 to 4 sessions, each lasting 45 to 60 minutes. This includes a detailed clinical interview, standardized psychometric testing, behavioral observation, and collateral information gathering from parents or teachers. The thoroughness ensures an accurate diagnosis and rules out other conditions that may mimic ADHD symptoms."},
        {"question": "Can ADHD be diagnosed without medication?", "answer": "Yes, ADHD diagnosis does not involve medication at all. Diagnosis is done through comprehensive psychometric testing and clinical evaluation by a qualified psychologist. After diagnosis, treatment can include non-medication approaches such as Cognitive Behavioral Therapy (CBT), executive function coaching, behavioral interventions, and parent training — all of which are highly effective, especially for children."},
        {"question": "What is the difference between a psychometric and psychoeducational assessment?", "answer": "A psychometric assessment broadly evaluates cognitive abilities, personality, and behavioral traits using standardized tools. A psychoeducational assessment specifically focuses on learning — it identifies learning disabilities like dyslexia, dyscalculia, or dysgraphia, and evaluates academic achievement relative to cognitive potential. Both are conducted by clinical psychologists but serve different purposes."},
        {"question": "At what age should I get my child tested for ADHD?", "answer": "While ADHD symptoms can appear as early as age 3-4, a reliable clinical diagnosis is typically most accurate from age 6 onwards, when academic and social demands increase and behavioral patterns become more clearly distinguishable from typical early childhood development. If you notice persistent attention difficulties, hyperactivity, or impulsivity, consult a specialist for an initial screening."},
        {"question": "Which doctor should I see for ADHD in Bangalore?", "answer": "For ADHD assessment and diagnosis, consult an RCI-registered clinical psychologist who specializes in neurodevelopmental conditions. For medication management (if needed), a psychiatrist works alongside the psychologist. The best outcomes come from multidisciplinary centers that offer both psychological assessment and therapeutic intervention under one roof."},
        {"question": "Is ADHD covered by health insurance in India?", "answer": "Following recent IRDAI mandates, many comprehensive health insurance plans in India now cover mental health conditions including ADHD. Coverage typically includes outpatient consultations, psychometric assessments, and therapy sessions. We recommend checking with your specific insurance provider about the extent of coverage for neurodevelopmental assessments."},
        {"question": "How do I prepare my child for a psychometric assessment?", "answer": "Ensure your child gets a good night's sleep and has a nutritious meal before the assessment. Explain that there are no right or wrong answers — it's about understanding how they think and learn. Bring any previous school reports, medical records, or teacher observations. Most importantly, keep the atmosphere relaxed and positive so your child feels comfortable during the session."},
        {"question": "Can adults get tested for ADHD in Bangalore?", "answer": "Absolutely. Adult ADHD is increasingly recognized in India. Many adults discover they have ADHD only after their child is diagnosed. At Divit MindSpace, we offer comprehensive adult ADHD assessments using internationally recognized tools like the DIVA-5, along with counseling and CBT specifically tailored for adult ADHD challenges including workplace performance, relationship management, and executive functioning."}
    ],
    "psychoeducational-assessments": [
        {"question": "What is a psychoeducational assessment for children?", "answer": "A psychoeducational assessment is a comprehensive evaluation that examines how a child learns. It measures cognitive abilities (IQ), academic achievement, processing skills, and socio-emotional functioning to identify specific learning disabilities such as dyslexia, dyscalculia, or dysgraphia. The result is a detailed report with actionable recommendations for parents, teachers, and therapists."},
        {"question": "How do I know if my child has a learning disability?", "answer": "Key signs include persistent difficulty with reading, writing, or math despite adequate instruction and effort; inconsistency between intellectual ability and academic performance; frustration or avoidance around schoolwork; difficulty following multi-step instructions; and slow processing speed. If your child shows these patterns consistently for 6 months or more, a psychoeducational assessment can provide clarity."},
        {"question": "What is the difference between dyslexia and ADHD?", "answer": "Dyslexia is a specific learning disability that primarily affects reading, decoding, and spelling. ADHD is a neurodevelopmental condition affecting attention, impulse control, and executive functioning. They frequently co-occur — about 30-50% of children with dyslexia also have ADHD. A comprehensive psychoeducational assessment can differentiate between them and identify if both are present."},
        {"question": "Can a psychoeducational assessment help with school accommodations?", "answer": "Yes, this is one of the primary purposes. The detailed report from a psychoeducational assessment provides documented evidence that schools require to grant accommodations such as extra time on exams, use of assistive technology, modified assignments, or NIOS (National Institute of Open Schooling) enrollment. The report includes specific, actionable recommendations tailored to your child's learning profile."},
        {"question": "How long does a psychoeducational assessment take?", "answer": "A comprehensive psychoeducational assessment typically requires 3 to 5 sessions, each lasting about 45 to 60 minutes, spread over 1-2 weeks. This allows the psychologist to assess cognitive abilities, academic achievement, processing skills, and behavioral functioning without fatiguing the child. A detailed written report is provided within 7-10 working days after completion."},
        {"question": "What is dyscalculia and how is it diagnosed?", "answer": "Dyscalculia is a specific learning disability in mathematics. Children with dyscalculia struggle with number sense, mathematical reasoning, memorizing math facts, and performing calculations. It is diagnosed through standardized mathematical achievement tests compared against cognitive ability, along with clinical observation. Early identification and targeted intervention significantly improve outcomes."},
        {"question": "Is dysgraphia the same as bad handwriting?", "answer": "No. While poor handwriting can be a symptom, dysgraphia is a neurological condition that affects written expression. It involves difficulty with letter formation, spacing, spelling, organizing thoughts on paper, and the physical act of writing. Children with dysgraphia often have good verbal skills but struggle significantly when asked to express the same ideas in writing."},
        {"question": "What happens after a learning disability diagnosis?", "answer": "After diagnosis, a personalized intervention plan is created. This typically includes specialized remedial education sessions, specific therapy (such as occupational therapy for handwriting difficulties), school accommodation recommendations, assistive technology suggestions, and parent guidance. Regular progress reviews ensure the intervention remains effective and is adjusted as needed."},
        {"question": "Can learning disabilities be cured?", "answer": "Learning disabilities are lifelong neurological differences, not diseases to be cured. However, with early identification and the right evidence-based interventions, children can develop effective compensatory strategies and achieve academic success. Many highly successful professionals have learning disabilities — the key is understanding your unique learning profile and building on strengths."},
        {"question": "Should I get my child assessed at school or at a private center?", "answer": "While some schools offer basic screenings, a comprehensive psychoeducational assessment from a private clinical psychology center provides significantly more depth, accuracy, and actionable detail. Private assessments use internationally standardized tools, provide legally recognized documentation for accommodations, and offer personalized recommendations that go far beyond what a school screening can provide."}
    ],
    "counselling": [
        {"question": "What is the difference between counselling and therapy?", "answer": "While the terms are often used interchangeably, counselling typically focuses on specific issues and is shorter-term, while therapy (psychotherapy) may explore deeper patterns over a longer period. At Divit MindSpace, our counselling integrates evidence-based therapeutic techniques like CBT and solution-focused approaches to provide comprehensive support regardless of the label."},
        {"question": "How much does counselling cost in Bangalore?", "answer": "Counselling session fees in Bangalore typically range from INR 1,000 to INR 3,500 per session depending on the practitioner's experience and specialization. Some centers offer package rates for ongoing therapy. We recommend scheduling a free initial consultation to understand your needs and discuss the recommended approach before committing to sessions."},
        {"question": "How do I know if my child needs counselling?", "answer": "Consider counselling if your child shows persistent behavioral changes lasting more than 2-3 weeks, such as withdrawal from activities they enjoyed, sudden academic decline, excessive worry or fearfulness, sleep disturbances, frequent anger outbursts, difficulty making friends, or regression to younger behaviors. Early intervention can prevent minor challenges from developing into more significant concerns."},
        {"question": "Is online counselling as effective as in-person sessions?", "answer": "Research consistently shows that online counselling is comparably effective to in-person sessions for most conditions including anxiety, depression, and behavioral challenges. Online sessions offer added convenience, eliminate commute stress, and allow children to participate from the comfort of their home environment. We offer both formats to suit your family's needs."},
        {"question": "What does a first counselling session look like?", "answer": "The first session is primarily about building rapport and understanding your concerns. The counsellor will ask about the presenting issue, relevant history, family dynamics, and what you hope to achieve. For child counselling, parents typically join for part of the session. No judgments are made — it is a safe, confidential space to share openly."},
        {"question": "Can counselling help with exam anxiety and academic stress?", "answer": "Absolutely. Exam anxiety and academic stress are among the most common reasons families seek counselling. Through techniques like CBT, relaxation training, and study skills coaching, counselling helps students manage performance anxiety, build healthy study habits, develop time management skills, and improve self-confidence — leading to better academic outcomes."},
        {"question": "How many counselling sessions will my child need?", "answer": "The number of sessions varies based on the concern and the child's response. For specific issues like exam anxiety or a recent transition, 6-8 sessions may be sufficient. For more complex challenges like anxiety disorders or behavioral difficulties, 12-20 sessions may be recommended. Progress is reviewed regularly, and the plan is adjusted accordingly."},
        {"question": "Do you offer parent counselling and family therapy?", "answer": "Yes. We provide individual parent counselling, couples counselling focused on co-parenting, and family therapy sessions. Many childhood behavioral challenges are best addressed when parents are equipped with effective strategies. Our parent counselling helps you understand your child's needs, manage challenging behaviors, and strengthen the parent-child relationship."},
        {"question": "Is everything my child says in counselling confidential?", "answer": "Yes, confidentiality is a cornerstone of the therapeutic relationship. What your child shares in sessions remains private, which is essential for building trust. The only exceptions are if the counsellor believes the child is at risk of harm to themselves or others. General progress updates (without specific details) are shared with parents to keep them informed."},
        {"question": "What qualifications should a child counsellor have in India?", "answer": "A qualified child counsellor in India should have a Master's degree in Clinical Psychology or Counselling Psychology and be registered with the Rehabilitation Council of India (RCI). Look for practitioners with specific training or experience in child and adolescent mental health. At Divit MindSpace, all our counsellors meet these standards and have specialized experience with children."}
    ]
}

def fetch_service(slug):
    query = f'*[_type == "services" && slug.current == "{slug}" && !(_id in path("drafts.**"))][0]._id'
    url = f"{BASE_URL}/data/query/{DATASET}?query={urllib.parse.quote(query)}"
    r = requests.get(url, headers=HEADERS)
    if r.status_code == 200:
        return r.json().get("result")
    return None

def inject_faqs(doc_id, faqs):
    sanity_faqs = [{"_key": gen_key(), "question": f["question"], "answer": f["answer"]} for f in faqs]
    mutation = {"mutations": [{"patch": {"id": doc_id, "set": {"faqs": sanity_faqs}}}]}
    url = f"{BASE_URL}/data/mutate/{DATASET}"
    r = requests.post(url, headers=HEADERS, json=mutation)
    return r.status_code == 200, r.text

def main():
    print("=" * 60)
    print("  AEO FAQ INJECTOR — Competitor Takedown")
    print("=" * 60)
    
    for slug, faqs in SERVICE_FAQS.items():
        print(f"\n[TARGET] {slug}")
        doc_id = fetch_service(slug)
        if not doc_id:
            print(f"  [!!] Document not found for slug: {slug}")
            continue
        
        print(f"  [OK] Found document: {doc_id}")
        ok, msg = inject_faqs(doc_id, faqs)
        if ok:
            print(f"  [OK] Injected {len(faqs)} AEO FAQs successfully!")
        else:
            print(f"  [FAIL] Failed: {msg}")
    
    print("\n" + "=" * 60)
    print("  MISSION COMPLETE")
    print("=" * 60)

if __name__ == "__main__":
    main()
