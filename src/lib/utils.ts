import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns the correctly pluralized Arabic word for a word count.
 * 1        → كلمة
 * 2        → كلمتان
 * 3–10     → {n} كلمات
 * 11+      → {n} كلمة
 */
export function formatArabicWordCount(count: number): string {
  if (count === 1) return "كلمة واحدة";
  if (count === 2) return "كلمتان";
  if (count >= 3 && count <= 10) return `${count} كلمات`;
  return `${count} كلمة`;
}

/**
 * Returns a full Arabic instruction sentence for the guessing phase.
 * Uses singular (يمكنك) when guessingPlayersCount === 1,
 * plural (يمكنكم) otherwise.
 * Total allowed guesses = amount + 1 (Codenames rule).
 */
export function getGuessInstruction(
  amount: number,
  guessingPlayersCount: number,
): string {
  const total = amount + 1;
  const verb = guessingPlayersCount === 1 ? "يمكنك" : "يمكنكم";
  return `${verb} التخمين حتى ${formatArabicWordCount(total)}`;
}
