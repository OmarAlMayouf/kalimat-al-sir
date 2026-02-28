export interface Word {
  word: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  region?: string;
}

export const categories = {
  proverbs: 'أمثال سعودية',
  food: 'أكلات',
  cities: 'مدن سعودية',
  traditions: 'عادات وتقاليد',
  dialect: 'لهجة عامية',
  celebrities: 'شخصيات معروفة',
} as const;

export const wordDatabase: Word[] = [
  // أمثال سعودية
  { word: 'اللي ما يعرف الصقر يشويه', category: 'أمثال سعودية', difficulty: 'medium' },
  { word: 'الطول طول نخلة', category: 'أمثال سعودية', difficulty: 'easy' },
  { word: 'كل شارد له وارد', category: 'أمثال سعودية', difficulty: 'medium' },
  { word: 'يد واحدة ما تصفق', category: 'أمثال سعودية', difficulty: 'easy' },
  { word: 'الصبر مفتاح الفرج', category: 'أمثال سعودية', difficulty: 'easy' },

  // أكلات
  { word: 'كبسة', category: 'أكلات', difficulty: 'easy', region: 'عام' },
  { word: 'جريش', category: 'أكلات', difficulty: 'easy', region: 'نجد' },
  { word: 'مطبق', category: 'أكلات', difficulty: 'easy', region: 'حجاز' },
  { word: 'عريكة', category: 'أكلات', difficulty: 'easy', region: 'جنوب' },
  { word: 'مرقوق', category: 'أكلات', difficulty: 'medium', region: 'نجد' },
  { word: 'سليق', category: 'أكلات', difficulty: 'easy', region: 'حجاز' },
  { word: 'هريسة', category: 'أكلات', difficulty: 'easy', region: 'عام' },
  { word: 'معصوب', category: 'أكلات', difficulty: 'easy', region: 'حجاز' },
  { word: 'مندي', category: 'أكلات', difficulty: 'easy', region: 'جنوب' },
  { word: 'حنيني', category: 'أكلات', difficulty: 'medium', region: 'نجد' },

  // مدن سعودية
  { word: 'الرياض', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'جدة', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'مكة المكرمة', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'المدينة المنورة', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'أبها', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'الطائف', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'تبوك', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'الدمام', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'العلا', category: 'مدن سعودية', difficulty: 'medium' },
  { word: 'نيوم', category: 'مدن سعودية', difficulty: 'medium' },

  // عادات وتقاليد
  { word: 'القهوة العربية', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'العرضة', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'الدلال', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'البخور', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'المجلس', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'الفزعة', category: 'عادات وتقاليد', difficulty: 'medium' },
  { word: 'التمر والقهوة', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'البشت', category: 'عادات وتقاليد', difficulty: 'medium' },
  { word: 'السدو', category: 'عادات وتقاليد', difficulty: 'hard' },
  { word: 'المزمار', category: 'عادات وتقاليد', difficulty: 'medium' },

  // لهجة عامية
  { word: 'يا زين', category: 'لهجة عامية', difficulty: 'easy' },
  { word: 'وش لون', category: 'لهجة عامية', difficulty: 'easy' },
  { word: 'يا وجه الخير', category: 'لهجة عامية', difficulty: 'easy' },
  { word: 'طناخ', category: 'لهجة عامية', difficulty: 'medium' },
  { word: 'هيلق', category: 'لهجة عامية', difficulty: 'hard' },
  { word: 'قرقوش', category: 'لهجة عامية', difficulty: 'hard' },
  { word: 'خشم', category: 'لهجة عامية', difficulty: 'medium' },
  { word: 'مشكلنجي', category: 'لهجة عامية', difficulty: 'medium' },
  { word: 'يلعن بوك', category: 'لهجة عامية', difficulty: 'easy' },
  { word: 'حيل', category: 'لهجة عامية', difficulty: 'easy' },

  // شخصيات معروفة (cultural figures, not political)
  { word: 'طلال مداح', category: 'شخصيات معروفة', difficulty: 'medium' },
  { word: 'محمد عبده', category: 'شخصيات معروفة', difficulty: 'easy' },
  { word: 'فهد بلان', category: 'شخصيات معروفة', difficulty: 'hard' },
  { word: 'ماجد عبدالله', category: 'شخصيات معروفة', difficulty: 'easy' },
  { word: 'سامي الجابر', category: 'شخصيات معروفة', difficulty: 'easy' },
];

export function getRandomWords(count: number = 25): Word[] {
  const shuffled = [...wordDatabase].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
