"""
AEO FAQ Injector — Wave 3: Training & Specialized Programs
Targets: training-program-shadow-teacher-training-program, parental-training-program, play-therapy, brain-gym
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
    "training-program-shadow-teacher-training-program": [
        {"question": "What is a shadow teacher and what do they do?",
         "answer": "A shadow teacher (also called a learning support assistant or inclusion aide) is a trained professional who works one-on-one with a child in a mainstream classroom setting. They help the child follow lessons, manage behaviors, navigate social interactions, and complete academic tasks — essentially bridging the gap between the child's needs and the classroom environment."},
        {"question": "Who needs a shadow teacher?",
         "answer": "Shadow teachers are commonly recommended for children with autism, ADHD, learning disabilities, developmental delays, or behavioral challenges who are enrolled in mainstream schools. They are especially helpful during school transitions, when a child needs temporary support to build independence, or when the school lacks adequate special education resources."},
        {"question": "What qualifications does a shadow teacher need in India?",
         "answer": "An effective shadow teacher should have training in special education, child development, or behavioral therapy. Formal qualifications like a Certificate or Diploma in Special Education, along with training in Applied Behavior Analysis (ABA) or positive behavior support, are highly valued. Our Shadow Teacher Training Program provides comprehensive, hands-on preparation covering all these areas."},
        {"question": "How long does shadow teacher training take?",
         "answer": "Professional shadow teacher training programs typically range from 3 to 6 months depending on the depth of the curriculum. Our program covers child development, neurodevelopmental conditions (autism, ADHD, learning disabilities), classroom management strategies, behavior intervention techniques, communication support, and supervised practicum with real classroom experience."},
        {"question": "Is shadow teacher training available online in Bangalore?",
         "answer": "Yes. Many programs now offer hybrid formats combining online theoretical modules with in-person practical training. This allows participants to learn at their own pace while still getting essential hands-on experience. At Divit MindSpace, our program includes both classroom and practical components to ensure graduates are fully prepared for the role."},
        {"question": "What is the salary of a shadow teacher in Bangalore?",
         "answer": "Shadow teacher salaries in Bangalore typically range from INR 15,000 to INR 35,000 per month depending on qualifications, experience, and the school. Certified shadow teachers with specialized training in autism or ADHD support command higher compensation. Demand for qualified shadow teachers significantly exceeds supply in Bangalore, making it a strong career opportunity."},
        {"question": "Can parents become shadow teachers for their own child?",
         "answer": "While parents can absolutely learn shadow teaching techniques to support their child at home, most schools prefer an external trained professional as the in-class shadow teacher. This maintains appropriate boundaries and allows the child to develop independence from parents in the school setting. However, parent training in these strategies dramatically improves outcomes across all environments."},
        {"question": "What is the difference between a shadow teacher and a special educator?",
         "answer": "A special educator designs and delivers specialized curriculum and remedial education, often in a separate setting or resource room. A shadow teacher works within the mainstream classroom, supporting the child to access the regular curriculum alongside peers. Both roles are complementary — the special educator creates the plan, and the shadow teacher helps implement it in real-time."},
        {"question": "How does a shadow teacher help a child with autism in school?",
         "answer": "For children with autism, a shadow teacher provides real-time support with following classroom routines, understanding instructions, managing sensory overload, facilitating peer interactions during breaks, breaking down complex tasks into manageable steps, and implementing behavioral strategies. The goal is always to gradually reduce support as the child builds independence."},
        {"question": "Is there a demand for shadow teachers in Bangalore?",
         "answer": "The demand is extremely high and growing rapidly. With increasing awareness of neurodevelopmental conditions and more inclusive education policies, mainstream schools in Bangalore actively seek trained shadow teachers. Many schools now require shadow teacher support as a condition for enrolling children with special needs, creating a significant shortage of qualified professionals."}
    ],

    "parental-training-program": [
        {"question": "What is a parental training program?",
         "answer": "A parental training program teaches parents evidence-based strategies for managing their child's behavioral, emotional, and developmental challenges. Rather than focusing solely on the child, it empowers parents with practical tools — positive reinforcement techniques, effective communication, routine building, and behavior management — that transform the home environment and accelerate the child's progress."},
        {"question": "Why is parent training important for children with special needs?",
         "answer": "Research consistently shows that parent involvement is the single strongest predictor of positive outcomes for children with special needs. Children spend the majority of their time at home — if parents are equipped with the right strategies, every interaction becomes a learning opportunity. Parent training ensures that therapeutic gains made in clinic sessions are reinforced and maintained at home."},
        {"question": "What topics are covered in parent training?",
         "answer": "Topics typically include understanding your child's diagnosis (autism, ADHD, learning disabilities), positive behavior management techniques, communication strategies, building daily routines and structure, managing meltdowns and challenging behaviors, supporting social skills development, collaborating with schools and therapists, self-care for caregivers, and navigating the Indian special education system."},
        {"question": "How long is a parental training program?",
         "answer": "Programs vary from intensive weekend workshops to structured 8-12 week courses with weekly sessions. At Divit MindSpace, our parental training program is designed to provide both foundational knowledge and ongoing support. Each session builds on the previous one, allowing parents to practice strategies at home and discuss real-world challenges in subsequent sessions."},
        {"question": "Is parent training available for fathers too?",
         "answer": "Absolutely, and we strongly encourage both parents to participate. Research shows that outcomes improve significantly when both caregivers are aligned on strategies. Our programs are designed to be inclusive and practical for all caregivers — mothers, fathers, grandparents, and other family members who are actively involved in the child's care."},
        {"question": "Can parent training help reduce tantrums and meltdowns?",
         "answer": "Yes, this is one of the most immediate and visible benefits. Parent training teaches you to identify triggers before a meltdown escalates, use de-escalation techniques effectively, implement preventive strategies (visual schedules, transition warnings, sensory breaks), and respond to challenging behaviors in ways that reduce their frequency over time rather than inadvertently reinforcing them."},
        {"question": "How much does parent training cost in Bangalore?",
         "answer": "Parent training programs in Bangalore range from INR 5,000 to INR 25,000 depending on the format (group workshop vs. individual coaching), duration, and depth of the program. Group programs are more affordable while still providing excellent value. Many centers, including ours, offer free initial consultations to help you determine the right level of support."},
        {"question": "Is online parent training effective?",
         "answer": "Yes. Multiple studies confirm that online parent training produces outcomes comparable to in-person programs. Online formats offer added flexibility for busy parents, eliminate commute time, and allow both parents to participate from home. Our programs include live interactive sessions (not just pre-recorded videos), ensuring personalized feedback and real-time problem-solving."},
        {"question": "What is the difference between parent counselling and parent training?",
         "answer": "Parent counselling focuses on the emotional well-being of the parent — managing stress, grief, guilt, or relationship strain related to raising a child with special needs. Parent training focuses on teaching specific, practical skills and strategies for managing the child's behavior and development. Both are valuable, and many families benefit from a combination of the two."},
        {"question": "Will parent training make me a better parent?",
         "answer": "Parent training is not about fixing 'bad parenting' — it is about equipping already loving, dedicated parents with specialized tools they were never taught. Raising a child with neurodevelopmental differences requires specific strategies that are not intuitive. Parents who complete training consistently report feeling more confident, less stressed, and more connected to their child."}
    ],

    "play-therapy": [
        {"question": "What is play therapy and how does it work?",
         "answer": "Play therapy is a developmentally appropriate, evidence-based therapeutic approach that uses play — a child's natural language — to help them express feelings, process experiences, and develop coping skills. Through carefully selected toys, games, art, and creative activities, a trained therapist creates a safe environment where children can communicate and heal without the pressure of verbal conversation."},
        {"question": "What age is play therapy suitable for?",
         "answer": "Play therapy is most commonly used with children aged 3 to 12, though it can be adapted for older children and even adolescents. It is particularly effective for younger children (3-8 years) who lack the verbal and cognitive maturity for traditional talk therapy. The therapist adapts the complexity of play activities to match the child's developmental level."},
        {"question": "What issues can play therapy help with?",
         "answer": "Play therapy is effective for a wide range of concerns including anxiety, depression, trauma, grief and loss, divorce adjustment, behavioral problems, social difficulties, selective mutism, school refusal, low self-esteem, anger management, and adjustment to life changes. It is also used alongside other therapies for children with autism, ADHD, and developmental delays."},
        {"question": "How is play therapy different from just playing?",
         "answer": "While play therapy looks like 'just playing' to an observer, it is a highly structured clinical intervention. The therapist carefully selects materials, observes play themes and patterns, reflects the child's emotions, sets therapeutic limits, and guides the process toward healing. Every toy in the playroom is chosen for its therapeutic potential, and the therapist's responses are intentionally therapeutic."},
        {"question": "How long does play therapy take?",
         "answer": "A typical play therapy course involves weekly 30-45 minute sessions over 12-20 weeks. Some children show significant improvement in 8-10 sessions, while others with more complex needs may benefit from longer-term support. The therapist regularly reviews progress with parents and adjusts the plan accordingly. Most children look forward to their sessions and are eager to attend."},
        {"question": "Do parents participate in play therapy sessions?",
         "answer": "In most play therapy models, the child attends sessions alone to establish a private therapeutic relationship. However, parents are actively involved through regular feedback sessions where the therapist shares themes and progress (without breaking the child's confidentiality), teaches parents play-based strategies for home, and sometimes conducts parent-child interaction sessions to strengthen the relationship."},
        {"question": "How much does play therapy cost in Bangalore?",
         "answer": "Play therapy sessions in Bangalore typically range from INR 1,000 to INR 2,500 per session. The cost depends on the therapist's qualifications, session duration, and the clinic's location. Many centers offer package rates for the recommended course of 12-20 sessions. An initial assessment session may be priced separately to evaluate the child's needs and create a therapy plan."},
        {"question": "What qualifications should a play therapist have?",
         "answer": "A qualified play therapist should have a Master's degree in Clinical Psychology, Counselling Psychology, or Child Development, along with specialized training in play therapy techniques (such as Child-Centered Play Therapy or Directive Play Therapy). Registration with the Rehabilitation Council of India (RCI) and supervised clinical experience with children are essential credentials to verify."},
        {"question": "Can play therapy help with school refusal?",
         "answer": "Yes. School refusal often stems from underlying anxiety, social difficulties, bullying, or unprocessed emotional experiences that children struggle to articulate verbally. Play therapy provides a safe outlet to explore and process these feelings through metaphor and symbolic play. As the child gains emotional clarity and develops coping strategies, school attendance typically improves."},
        {"question": "Is play therapy effective for children with autism?",
         "answer": "Yes, adapted play therapy approaches (like Floortime/DIR) are highly effective for children with autism. They meet the child at their developmental level, build engagement and interaction through the child's interests, develop social reciprocity, and expand imaginative play skills. The therapist follows the child's lead while gently stretching their communication and social capacities."}
    ],

    "brain-gym": [
        {"question": "What is Brain Gym and how does it help children?",
         "answer": "Brain Gym is a program of simple, targeted physical movements designed to enhance learning readiness, focus, coordination, and cognitive functioning. Based on the connection between movement and brain development, these exercises activate different brain areas responsible for reading, writing, memory, and attention. It is used as a complementary support for children with learning difficulties, ADHD, and developmental delays."},
        {"question": "What age group is Brain Gym suitable for?",
         "answer": "Brain Gym exercises can be adapted for children as young as 4 years through adolescence and even adults. The movements are simple enough for young children to follow and can be progressively modified for older participants. It is particularly popular for school-age children (5-14 years) who are experiencing academic or attention challenges."},
        {"question": "Does Brain Gym help with ADHD?",
         "answer": "Many families and educators report positive results using Brain Gym exercises for children with ADHD. The targeted movements help improve focus, reduce restlessness, and support self-regulation. While Brain Gym should not replace evidence-based therapies, it serves as a valuable complementary tool — especially when integrated into daily routines at home and school alongside other interventions."},
        {"question": "What exercises are included in Brain Gym?",
         "answer": "Brain Gym includes 26 specific movements organized into categories: midline movements (like Cross Crawl, which improves bilateral coordination), lengthening activities (which release tension), energy exercises (which improve focus), and deepening attitudes (which build emotional readiness). Each exercise targets specific learning and coordination skills and takes only 1-2 minutes to perform."},
        {"question": "How long does a Brain Gym session last?",
         "answer": "A typical Brain Gym session lasts 30-45 minutes and includes a combination of targeted exercises, movement activities, and integration tasks. Many practitioners recommend short daily Brain Gym routines of 5-10 minutes at home or before school to maintain the benefits. Consistency with brief daily practice is more effective than infrequent longer sessions."},
        {"question": "Can Brain Gym improve handwriting?",
         "answer": "Yes. Several Brain Gym exercises specifically target the visual-motor integration and fine motor coordination needed for handwriting. Movements like Lazy 8s (figure-eight arm movements) improve hand-eye coordination, while Double Doodle activities strengthen bilateral integration. When combined with occupational therapy, Brain Gym can accelerate handwriting improvement."},
        {"question": "Is Brain Gym the same as occupational therapy?",
         "answer": "No. Occupational therapy is a comprehensive clinical intervention conducted by a licensed therapist addressing a wide range of functional skills. Brain Gym is a specific movement-based program that can be used by therapists, teachers, and parents as a complementary tool. OTs often incorporate Brain Gym exercises into their therapy plans as one component of a broader intervention strategy."},
        {"question": "Can Brain Gym help with reading difficulties?",
         "answer": "Brain Gym exercises are designed to improve the visual tracking, bilateral coordination, and left-right brain integration that underpin reading skills. Exercises like Cross Crawl and Lazy 8s specifically target the eye movements and hemispheric coordination needed for fluent reading. For children with dyslexia, Brain Gym can be a helpful supplement to specialized reading intervention."},
        {"question": "How much does Brain Gym cost in Bangalore?",
         "answer": "Brain Gym sessions in Bangalore typically range from INR 500 to INR 1,500 per session when offered as part of a therapy program. Some centers offer group Brain Gym workshops at lower per-session rates. Many occupational therapists incorporate Brain Gym exercises into their regular OT sessions at no additional cost."},
        {"question": "Can parents learn Brain Gym exercises to do at home?",
         "answer": "Absolutely, and this is strongly encouraged. The 26 Brain Gym movements are simple enough for parents to learn and practice daily with their child at home. Many therapists teach parents the key exercises during sessions and provide visual guides or videos for home practice. A consistent 5-10 minute daily routine at home significantly amplifies the benefits of clinic-based sessions."}
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
    print("  AEO FAQ INJECTOR - Wave 3: Training & Specialized")
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
