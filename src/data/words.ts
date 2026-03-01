export interface Word {
  word: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  region?: string;
}

export const wordDatabase = [
  // ===== FOOD =====
  { word: "كبسة", category: "food", difficulty: "easy" },
  { word: "مندي", category: "food", difficulty: "easy" },
  { word: "جريش", category: "food", difficulty: "easy" },
  { word: "مرقوق", category: "food", difficulty: "medium" },
  { word: "مطازيز", category: "food", difficulty: "medium" },
  { word: "قرصان", category: "food", difficulty: "medium" },
  { word: "عريكة", category: "food", difficulty: "easy" },
  { word: "سليق", category: "food", difficulty: "easy" },
  { word: "معصوب", category: "food", difficulty: "easy" },
  { word: "حنيني", category: "food", difficulty: "medium" },
  { word: "كليجا", category: "food", difficulty: "medium" },
  { word: "مضبي", category: "food", difficulty: "hard" },
  { word: "سمبوسة", category: "food", difficulty: "easy" },
  { word: "تمر", category: "food", difficulty: "easy" },
  { word: "هريسة", category: "food", difficulty: "easy" },

  // ===== CITIES =====
  { word: "الرياض", category: "cities", difficulty: "easy" },
  { word: "جدة", category: "cities", difficulty: "easy" },
  { word: "مكة", category: "cities", difficulty: "easy" },
  { word: "المدينة", category: "cities", difficulty: "easy" },
  { word: "الدمام", category: "cities", difficulty: "easy" },
  { word: "الخبر", category: "cities", difficulty: "easy" },
  { word: "أبها", category: "cities", difficulty: "easy" },
  { word: "تبوك", category: "cities", difficulty: "easy" },
  { word: "حائل", category: "cities", difficulty: "easy" },
  { word: "نجران", category: "cities", difficulty: "easy" },
  { word: "العلا", category: "cities", difficulty: "medium" },
  { word: "الطائف", category: "cities", difficulty: "easy" },
  { word: "جازان", category: "cities", difficulty: "easy" },

  // ===== TRADITIONS =====
  { word: "العرضة", category: "traditions", difficulty: "easy" },
  { word: "البشت", category: "traditions", difficulty: "medium" },
  { word: "العقال", category: "traditions", difficulty: "easy" },
  { word: "الغترة", category: "traditions", difficulty: "easy" },
  { word: "الشماغ", category: "traditions", difficulty: "easy" },
  { word: "السدو", category: "traditions", difficulty: "hard" },
  { word: "المجلس", category: "traditions", difficulty: "easy" },
  { word: "الدلال", category: "traditions", difficulty: "easy" },
  { word: "المزمار", category: "traditions", difficulty: "medium" },
  { word: "التمر", category: "traditions", difficulty: "easy" },

  // ===== DIALECT (CLEAN ONLY) =====
  { word: "سنعة", category: "dialect", difficulty: "medium" },
  { word: "كشخة", category: "dialect", difficulty: "easy" },
  { word: "هرجة", category: "dialect", difficulty: "easy" },
  { word: "مشوار", category: "dialect", difficulty: "easy" },
  { word: "زحمة", category: "dialect", difficulty: "easy" },
  { word: "خشم", category: "dialect", difficulty: "medium" },
  { word: "حيل", category: "dialect", difficulty: "easy" },

  // ===== CELEBRITIES =====
  { word: "محمد عبده", category: "celebrities", difficulty: "easy" },
  { word: "ماجد عبدالله", category: "celebrities", difficulty: "easy" },
  { word: "سامي الجابر", category: "celebrities", difficulty: "easy" },
  { word: "ياسر القحطاني", category: "celebrities", difficulty: "easy" },
  { word: "طلال مداح", category: "celebrities", difficulty: "medium" },

  // ===== LANDMARKS =====
  { word: "الكعبة", category: "landmarks", difficulty: "easy" },
  { word: "مدائن صالح", category: "landmarks", difficulty: "medium" },
  { word: "الدرعية", category: "landmarks", difficulty: "medium" },
  { word: "برج الفيصلية", category: "landmarks", difficulty: "easy" },
  { word: "المملكة", category: "landmarks", difficulty: "easy" },

  // ===== ANIMALS =====
  { word: "صقر", category: "animals", difficulty: "easy" },
  { word: "ناقة", category: "animals", difficulty: "easy" },
  { word: "مها", category: "animals", difficulty: "medium" },
  { word: "وعل", category: "animals", difficulty: "hard" },
  { word: "ضب", category: "animals", difficulty: "medium" },

  // ===== SPORTS =====
  { word: "الهلال", category: "sports", difficulty: "easy" },
  { word: "النصر", category: "sports", difficulty: "easy" },
  { word: "الاتحاد", category: "sports", difficulty: "easy" },
  { word: "الأهلي", category: "sports", difficulty: "easy" },
  { word: "الشباب", category: "sports", difficulty: "easy" },
  { word: "رالي", category: "sports", difficulty: "medium" },

  // ===== NATURE =====
  { word: "صحراء", category: "nature", difficulty: "easy" },
  { word: "نخلة", category: "nature", difficulty: "easy" },
  { word: "رمل", category: "nature", difficulty: "easy" },
  { word: "جبل", category: "nature", difficulty: "easy" },
  { word: "وادي", category: "nature", difficulty: "easy" },

  // ===== OBJECTS =====
  { word: "مفتاح", category: "objects", difficulty: "easy" },
  { word: "ساعة", category: "objects", difficulty: "easy" },
  { word: "هاتف", category: "objects", difficulty: "easy" },
  { word: "كتاب", category: "objects", difficulty: "easy" },
  { word: "قلم", category: "objects", difficulty: "easy" },

  // ===== PROFESSIONS =====
  { word: "طبيب", category: "professions", difficulty: "easy" },
  { word: "مهندس", category: "professions", difficulty: "easy" },
  { word: "معلم", category: "professions", difficulty: "easy" },
  { word: "شرطي", category: "professions", difficulty: "easy" },
  { word: "تاجر", category: "professions", difficulty: "easy" },
];

export function getRandomWords(count: number = 25) {
  const valid = wordDatabase.filter(
    (w) => w.word.trim().split(/\s+/).length <= 2,
  );

  const shuffled = [...valid].sort(() => Math.random() - 0.5);

  const result: typeof wordDatabase = [];
  const categoryCounter: Record<string, number> = {};

  for (const word of shuffled) {
    if (result.length >= count) break;

    const cat = word.category;
    categoryCounter[cat] = categoryCounter[cat] || 0;

    if (categoryCounter[cat] < 4) {
      result.push(word);
      categoryCounter[cat]++;
    }
  }

  return result;
}
