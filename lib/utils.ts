import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Normalizes specialist data for UI display:
 * 1. Ankita Bhatnagar: splits combined "Anxiety & Depression" into separate tags ("Stress", "Anxiety", "Depression")
 * 2. Dr. S. Mohamed Nowful: moves "Occupational Therapy" (OT) to first position in specialties
 * 3. Dr. Srinithi: corrects any "Dementias" variation to "Dementia"
 */
export function normalizeSpecialist<T extends { slug?: string | { current?: string }; specialties?: string[] }>(specialist: T): T {
  if (!specialist || !specialist.specialties) return specialist;

  const rawSlug = typeof specialist.slug === "string" ? specialist.slug : specialist.slug?.current || "";
  let specialties = [...specialist.specialties];

  if (rawSlug === "ankita-bhatnagar") {
    const withoutAnxietyDepression = specialties.filter((s) => !/anxiety\s*&\s*depression/i.test(s.trim()));
    specialties = ["Stress", "Anxiety", "Depression", ...withoutAnxietyDepression];
  } else if (rawSlug === "mohamed-nowful") {
    const otIndex = specialties.findIndex((s) => /occupational\s*therapy|^ot$/i.test(s.trim()));
    if (otIndex > 0) {
      const [otItem] = specialties.splice(otIndex, 1);
      specialties.unshift(otItem);
    }
  } else if (rawSlug === "srinithi-s-o-") {
    specialties = specialties.map((s) => s.replace(/\bDementias\b/gi, "Dementia"));
  }

  return {
    ...specialist,
    specialties,
  };
}
