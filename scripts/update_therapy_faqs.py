"""
AEO FAQ Injector — Wave 2: Therapy Services
Targets: speech-therapy, occupational-therapy, behavioral-therapy, cognitive-therapy, group-therapy-sessions
Injects 10 "People Also Ask" style FAQs per service.
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

SERVICE_FAQS = {
    "speech-therapy": [
        {"question": "How much does speech therapy cost in Bangalore?",
         "answer": "Speech therapy sessions in Bangalore typically range from INR 800 to INR 2,500 per session at private clinics. The cost depends on the therapist's experience, session duration, and the complexity of the condition. Many centers, including Divit MindSpace, offer an initial free consultation to assess your child's needs before recommending a therapy plan."},
        {"question": "At what age should a child start speech therapy?",
         "answer": "Speech therapy can begin as early as 12-18 months if there are signs of delayed speech or language development. Early intervention is critical because the brain's language centers are most receptive during the first 3-5 years. If your child is not babbling by 12 months, not using single words by 18 months, or not combining words by age 2, consult a speech-language pathologist promptly."},
        {"question": "How long does speech therapy take to show results?",
         "answer": "Most children show noticeable improvement within 3-6 months of consistent weekly sessions. However, the timeline depends on the type and severity of the speech-language disorder, the child's age at intervention, frequency of sessions, and how actively parents practice recommended exercises at home between sessions."},
        {"question": "What is the difference between speech therapy and language therapy?",
         "answer": "Speech therapy focuses on the physical production of sounds — articulation, fluency (stuttering), and voice quality. Language therapy addresses comprehension and expression — vocabulary, sentence formation, understanding instructions, and social communication. Many children need both, and a qualified speech-language pathologist addresses both areas in an integrated approach."},
        {"question": "Can speech therapy help children with autism?",
         "answer": "Absolutely. Speech therapy is one of the most critical interventions for children with autism. It addresses verbal and non-verbal communication, social pragmatics (turn-taking, eye contact, conversational skills), and sometimes introduces alternative communication methods (AAC) for children who are non-verbal or minimally verbal."},
        {"question": "Does my child need speech therapy or will they outgrow it?",
         "answer": "While some children are simply 'late talkers' who catch up naturally, research shows that waiting and hoping carries risk. If your child shows persistent speech or language delays beyond typical milestones, a professional evaluation is essential. A speech-language pathologist can differentiate between a late bloomer and a child who needs intervention, preventing years of unnecessary struggle."},
        {"question": "What qualifications should a speech therapist have in India?",
         "answer": "A qualified speech therapist in India should hold a Bachelor's or Master's degree in Audiology and Speech-Language Pathology (BASLP or MASLP) and be registered with the Rehabilitation Council of India (RCI). Specialized pediatric experience is important when working with children, especially those with neurodevelopmental conditions."},
        {"question": "How often should my child attend speech therapy sessions?",
         "answer": "Most children benefit from 1-2 sessions per week, each lasting 30-45 minutes. For more intensive needs (such as severe delays or autism), 2-3 sessions per week may be recommended initially. Consistency is more important than frequency — regular weekly sessions with daily home practice yield the best outcomes."},
        {"question": "Can adults benefit from speech therapy?",
         "answer": "Yes. Adults seek speech therapy for various reasons including stuttering, voice disorders, accent modification, communication difficulties after stroke or brain injury, and social communication challenges related to autism or ADHD. Speech therapy techniques are effective across all ages with appropriately tailored approaches."},
        {"question": "What happens during a speech therapy assessment?",
         "answer": "A comprehensive speech therapy assessment typically takes 45-60 minutes. The therapist evaluates articulation, language comprehension, expressive language, oral motor function, fluency, voice quality, and social communication skills using standardized tools and clinical observation. Parents provide developmental history and specific concerns. A detailed report with recommendations is shared afterward."}
    ],

    "occupational-therapy": [
        {"question": "What does an occupational therapist do for children?",
         "answer": "A pediatric occupational therapist helps children develop the skills they need for daily life — fine motor skills (writing, buttoning, using scissors), sensory processing (managing sounds, textures, movement), self-care (dressing, eating, grooming), and school readiness. They use play-based, evidence-based activities to build these essential skills."},
        {"question": "How much does occupational therapy cost in Bangalore?",
         "answer": "Occupational therapy sessions in Bangalore typically range from INR 800 to INR 2,500 per session at private centers. Costs vary based on the therapist's qualifications, session duration, and whether specialized equipment (like sensory integration rooms) is used. An initial evaluation may be priced separately. We offer a free consultation to discuss your child's needs first."},
        {"question": "What is sensory integration therapy?",
         "answer": "Sensory integration therapy is a specialized form of occupational therapy that helps children who over-react or under-react to sensory input — touch, sound, movement, visual stimuli, or textures. Using specially designed equipment and activities, the therapist helps the child's nervous system process and respond to sensory information more effectively, reducing meltdowns and improving daily functioning."},
        {"question": "How do I know if my child needs occupational therapy?",
         "answer": "Signs that your child may benefit from OT include difficulty with handwriting or holding a pencil, avoidance of certain textures in food or clothing, clumsiness or poor coordination, difficulty with self-care tasks for their age, sensory sensitivities (covering ears, avoiding crowds), trouble sitting still in class, or difficulty with fine motor tasks like buttons, zippers, or scissors."},
        {"question": "What is the difference between occupational therapy and physiotherapy for children?",
         "answer": "Physiotherapy focuses on gross motor skills — walking, running, balance, strength, and posture. Occupational therapy focuses on fine motor skills, sensory processing, self-care, and functional independence in daily activities. Many children with developmental delays benefit from both therapies working together as part of a multidisciplinary approach."},
        {"question": "Can occupational therapy help with handwriting problems?",
         "answer": "Yes, handwriting difficulties are one of the most common reasons children are referred for OT. The therapist works on pencil grip, hand strength, letter formation, spacing, and visual-motor integration. They may also address underlying issues like poor core stability or sensory processing challenges that contribute to messy or labored handwriting."},
        {"question": "How long does a child need occupational therapy?",
         "answer": "The duration depends on the child's specific challenges and goals. For targeted issues like handwriting improvement, 3-6 months of weekly sessions may be sufficient. For more complex conditions involving sensory processing or developmental delays, therapy may continue for 6-12 months or longer. Progress is regularly reviewed and therapy is adjusted accordingly."},
        {"question": "Is occupational therapy effective for autism?",
         "answer": "OT is considered a core intervention for children with autism. It addresses sensory processing difficulties (which affect over 90% of children with autism), fine motor delays, self-care skills, and adaptive behavior. Sensory integration therapy, a specialized OT approach, helps reduce sensory-related meltdowns and improves the child's ability to participate in daily routines and school activities."},
        {"question": "What happens in a pediatric OT assessment?",
         "answer": "A comprehensive OT assessment evaluates fine motor skills, gross motor coordination, sensory processing, visual-motor integration, self-care abilities, and school-related skills. The therapist uses standardized assessment tools, clinical observation, and parent/teacher questionnaires. A detailed report is provided with specific goals and a recommended therapy plan tailored to your child's needs."},
        {"question": "Can occupational therapy be done at home?",
         "answer": "While formal OT sessions at a clinic provide access to specialized equipment and professional guidance, home-based activities are a crucial complement. Your occupational therapist will provide a 'home program' with specific activities to practice between sessions. Consistency with home practice significantly accelerates progress and helps skills generalize to everyday environments."}
    ],

    "behavioral-therapy": [
        {"question": "What is behavioral therapy for children?",
         "answer": "Behavioral therapy is an evidence-based approach that helps children learn new, positive behaviors and reduce challenging ones. It works on the principle that behaviors are learned and can be modified through structured techniques like positive reinforcement, modeling, and systematic desensitization. It is widely used for autism, ADHD, anxiety, ODD, and other behavioral challenges."},
        {"question": "What is the difference between ABA and behavioral therapy?",
         "answer": "Applied Behavior Analysis (ABA) is a specific, structured type of behavioral therapy commonly used for autism. General behavioral therapy encompasses a broader range of approaches including ABA, Positive Behavior Support (PBS), and Cognitive Behavioral Therapy (CBT). At Divit MindSpace, we use a neuro-affirming approach that respects each child's unique neurological profile while building functional skills."},
        {"question": "How does behavioral therapy help children with autism?",
         "answer": "Behavioral therapy helps children with autism develop communication skills, social interaction abilities, self-care routines, and adaptive behaviors while reducing challenging behaviors like meltdowns, self-stimulation that interferes with learning, or aggression. Modern approaches are neuro-affirming — they build on the child's strengths rather than trying to make them appear neurotypical."},
        {"question": "How long does behavioral therapy take to work?",
         "answer": "Initial improvements in specific target behaviors are often visible within 4-8 weeks with consistent sessions. However, building lasting behavioral patterns typically requires 6-12 months of regular therapy. The key factors are consistency, family involvement, and ensuring strategies are applied across all environments — home, school, and community."},
        {"question": "Can behavioral therapy help with aggression and tantrums?",
         "answer": "Yes. Behavioral therapy is highly effective for managing aggression, tantrums, and emotional outbursts. The therapist conducts a functional behavior assessment to understand what triggers the behavior and what the child is trying to communicate. Then a personalized plan replaces the challenging behavior with appropriate alternatives while teaching emotional regulation skills."},
        {"question": "Is behavioral therapy the same as discipline or punishment?",
         "answer": "Absolutely not. Behavioral therapy is the opposite of punishment. It focuses on positive reinforcement — rewarding desired behaviors to increase their frequency. Modern evidence-based behavioral therapy never uses punishment, shaming, or aversive techniques. It teaches children skills they are missing, builds confidence, and creates a supportive environment for learning new behaviors."},
        {"question": "How much does behavioral therapy cost in Bangalore?",
         "answer": "Behavioral therapy sessions in Bangalore typically range from INR 1,000 to INR 3,000 per session depending on the therapist's experience and the intensity of the program. Intensive programs (like structured ABA) with multiple weekly sessions may have package pricing. An initial behavioral assessment is usually conducted first to create a personalized intervention plan."},
        {"question": "Do parents need to be involved in behavioral therapy?",
         "answer": "Parent involvement is essential for success. Research consistently shows that behavioral therapy outcomes improve dramatically when parents are trained to implement strategies at home. Most programs include regular parent training sessions where you learn to use the same reinforcement techniques, maintain consistency, and handle challenging behaviors confidently between therapy sessions."},
        {"question": "What is a Functional Behavior Assessment (FBA)?",
         "answer": "An FBA is a systematic process used before starting behavioral therapy. The therapist observes the child, interviews parents and teachers, and collects data to understand the function (purpose) of challenging behaviors — whether the child is seeking attention, avoiding a task, sensory-seeking, or communicating an unmet need. This assessment ensures the intervention plan targets the root cause, not just the surface behavior."},
        {"question": "Can behavioral therapy help with ADHD?",
         "answer": "Yes. Behavioral therapy is a first-line treatment for ADHD, especially in children under 6. It helps develop organizational skills, impulse control, attention strategies, and social skills. Parent behavioral training teaches effective techniques for managing ADHD-related challenges at home. For many children, behavioral therapy combined with environmental modifications is effective without medication."}
    ],

    "cognitive-therapy": [
        {"question": "What is cognitive therapy and how does it work?",
         "answer": "Cognitive therapy helps individuals identify and change unhelpful thinking patterns that influence emotions and behavior. It is based on the principle that our thoughts shape how we feel and act. By learning to recognize distorted thinking (like catastrophizing or black-and-white thinking) and replace it with balanced, realistic thoughts, individuals develop healthier emotional responses and coping strategies."},
        {"question": "What is the difference between cognitive therapy and CBT?",
         "answer": "Cognitive therapy focuses specifically on changing thought patterns. CBT (Cognitive Behavioral Therapy) combines cognitive techniques with behavioral strategies. In practice, the terms are often used interchangeably because most modern therapists integrate both cognitive and behavioral approaches. At Divit MindSpace, our therapists use an integrated CBT approach tailored to each individual's needs."},
        {"question": "Can cognitive therapy help children?",
         "answer": "Yes. Cognitive therapy is adapted for children using age-appropriate techniques like stories, games, art, and role-playing. It is particularly effective for children aged 7 and above who have developed enough abstract thinking ability. For younger children, the therapist works primarily through the parents, teaching them cognitive-behavioral strategies to use at home."},
        {"question": "How effective is cognitive therapy for anxiety?",
         "answer": "Cognitive therapy is considered the gold standard treatment for anxiety disorders. Research consistently shows that 60-80% of individuals with anxiety experience significant improvement with cognitive therapy. It teaches specific skills for managing anxious thoughts, facing feared situations gradually, and building confidence — with effects that last long after therapy ends."},
        {"question": "How many sessions of cognitive therapy are needed?",
         "answer": "Cognitive therapy is typically a focused, time-limited treatment. For specific issues like anxiety or mild depression, 8-16 sessions over 3-4 months is common. For more complex or longstanding patterns, 16-24 sessions may be recommended. Unlike some open-ended therapies, cognitive therapy has clear goals and a structured roadmap, so both therapist and client know when objectives are met."},
        {"question": "Can cognitive therapy help with negative self-talk?",
         "answer": "This is one of cognitive therapy's primary strengths. The therapist helps you identify automatic negative thoughts (like 'I'm not good enough' or 'Everything always goes wrong'), examine the evidence for and against these thoughts, and develop more balanced, realistic self-statements. Over time, this rewires habitual thinking patterns and significantly improves self-esteem and emotional resilience."},
        {"question": "Is cognitive therapy helpful for teenagers?",
         "answer": "Extremely. Adolescence is a period of intense cognitive development, making teenagers highly receptive to cognitive therapy techniques. It is particularly effective for teen anxiety, depression, exam stress, social difficulties, body image concerns, and emotional regulation challenges. Teens often report that learning to 'catch and challenge' unhelpful thoughts is a life-changing skill."},
        {"question": "Does cognitive therapy work for depression?",
         "answer": "Cognitive therapy is one of the most researched and effective treatments for depression. It helps individuals identify the negative thinking triad (negative views of self, the world, and the future) that maintains depressive episodes. Studies show cognitive therapy is as effective as medication for mild to moderate depression, with significantly lower relapse rates after treatment ends."},
        {"question": "Can cognitive therapy be combined with medication?",
         "answer": "Yes, and research shows that the combination is often more effective than either approach alone, particularly for moderate to severe conditions. Medication can help stabilize mood or reduce anxiety enough for the individual to engage effectively in cognitive therapy, while therapy provides long-term skills that reduce the likelihood of relapse when medication is eventually tapered."},
        {"question": "What happens in a typical cognitive therapy session?",
         "answer": "A typical session lasts 45-50 minutes and follows a collaborative structure. You review progress since the last session, discuss current concerns, work together to identify and challenge unhelpful thinking patterns, learn and practice new coping techniques, and set homework activities to apply skills in real life. The therapist acts as a coach, teaching you to become your own therapist over time."}
    ],

    "group-therapy-sessions": [
        {"question": "What are group therapy sessions for children?",
         "answer": "Group therapy brings together a small group of children (typically 4-8) who share similar challenges, guided by a trained therapist. Children practice social skills, communication, emotional regulation, and problem-solving in a safe, structured environment. The group setting provides natural opportunities for peer interaction that cannot be replicated in individual therapy."},
        {"question": "What age groups are group therapy suitable for?",
         "answer": "Group therapy can be adapted for children as young as 4-5 years old (using play-based approaches) through adolescence and adulthood. Groups are typically organized by age and developmental level to ensure appropriate activities and peer matching. At Divit MindSpace, we offer groups specifically designed for children, pre-teens, and adults."},
        {"question": "How does group therapy help children with social skills difficulties?",
         "answer": "Group therapy is the single most effective intervention for social skills development because it provides real-time practice with peers. Children learn turn-taking, conversation skills, reading social cues, managing disagreements, and building friendships in a guided environment. The therapist facilitates interactions, provides immediate coaching, and helps children transfer these skills to school and home."},
        {"question": "Is group therapy effective for children with autism?",
         "answer": "Research strongly supports group therapy for children with autism, particularly for social skills development. Structured social skills groups help children with autism practice initiating conversations, understanding body language, sharing, cooperative play, and managing sensory challenges in social settings. The peer learning component is especially powerful — children learn from observing and interacting with each other."},
        {"question": "How is confidentiality maintained in group therapy?",
         "answer": "At the start of every group, clear ground rules about confidentiality are established. All participants and their parents agree that what is shared in the group stays in the group. The therapist reinforces these boundaries regularly. While absolute confidentiality cannot be guaranteed as in individual therapy, groups develop a strong culture of trust and mutual respect."},
        {"question": "Can my child do both individual and group therapy?",
         "answer": "Yes, and this combination is often recommended. Individual therapy provides personalized, focused attention on specific challenges, while group therapy offers a real-world social laboratory to practice new skills with peers. The two modalities complement each other — individual sessions can prepare a child for group interactions, and group experiences can inform individual therapy goals."},
        {"question": "How many children are in each group therapy session?",
         "answer": "Groups are intentionally kept small, typically 4-8 children, to ensure each participant receives adequate attention and has sufficient opportunities to practice skills. The exact size depends on the age group and the nature of the group — younger children and those with more intensive needs may be in smaller groups of 3-5 for more individualized support."},
        {"question": "What topics are covered in group therapy for children?",
         "answer": "Topics are tailored to the group's needs but commonly include making friends and starting conversations, understanding and expressing emotions, managing anger and frustration, dealing with bullying, building self-confidence, cooperative problem-solving, perspective-taking (understanding others' viewpoints), and navigating transitions like changing schools."},
        {"question": "How long does a group therapy program typically last?",
         "answer": "Most structured group therapy programs run for 8-12 weekly sessions, each lasting 60-90 minutes depending on the age group. Some centers offer ongoing open groups that children can join and participate in for as long as needed. Progress is reviewed midway and at the end of the program, with recommendations for continued practice or additional support."},
        {"question": "How do I know if group therapy is right for my child?",
         "answer": "Group therapy is ideal for children who struggle with making or keeping friends, have difficulty in social situations, need practice with emotional regulation around peers, or feel isolated. It may not be suitable if a child has severe behavioral challenges that could disrupt the group or is not yet ready for peer interaction. An individual assessment with a therapist can help determine readiness."}
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
    print("  AEO FAQ INJECTOR - Wave 2: Therapy Services")
    print("=" * 60)

    success_count = 0
    fail_count = 0

    for slug, faqs in SERVICE_FAQS.items():
        print(f"\n[TARGET] {slug}")
        doc_id = fetch_service(slug)
        if not doc_id:
            print(f"  [!!] Document not found for slug: {slug}")
            fail_count += 1
            continue

        print(f"  [OK] Found document: {doc_id}")
        ok, msg = inject_faqs(doc_id, faqs)
        if ok:
            print(f"  [OK] Injected {len(faqs)} AEO FAQs successfully!")
            success_count += 1
        else:
            print(f"  [FAIL] Failed: {msg}")
            fail_count += 1

    print("\n" + "=" * 60)
    print(f"  MISSION COMPLETE: {success_count} services updated, {fail_count} failed")
    print("=" * 60)

if __name__ == "__main__":
    main()
