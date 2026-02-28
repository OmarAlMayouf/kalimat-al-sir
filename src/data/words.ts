export interface Word {
  word: string;
  category: string;
  difficulty: 'easy' | 'medium' | 'hard';
  region?: string;
}

export const categories = {
  food: 'أكلات',
  cities: 'مدن سعودية',
  traditions: 'عادات وتقاليد',
  dialect: 'لهجة عامية',
  celebrities: 'شخصيات معروفة',
  landmarks: 'معالم',
  animals: 'حيوانات',
  sports: 'رياضة',
} as const;

export const wordDatabase: Word[] = [
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
  { word: 'مطازيز', category: 'أكلات', difficulty: 'medium', region: 'نجد' },
  { word: 'صالونة', category: 'أكلات', difficulty: 'easy', region: 'عام' },
  { word: 'مضبي', category: 'أكلات', difficulty: 'hard', region: 'جنوب' },
  { word: 'قرصان', category: 'أكلات', difficulty: 'medium', region: 'نجد' },
  { word: 'كليجا', category: 'أكلات', difficulty: 'medium', region: 'قصيم' },

  // مدن سعودية
  { word: 'الرياض', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'جدة', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'مكة', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'المدينة', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'أبها', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'الطائف', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'تبوك', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'الدمام', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'العلا', category: 'مدن سعودية', difficulty: 'medium' },
  { word: 'نيوم', category: 'مدن سعودية', difficulty: 'medium' },
  { word: 'الخبر', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'حائل', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'نجران', category: 'مدن سعودية', difficulty: 'easy' },
  { word: 'الباحة', category: 'مدن سعودية', difficulty: 'medium' },
  { word: 'جازان', category: 'مدن سعودية', difficulty: 'easy' },

  // عادات وتقاليد
  { word: 'العرضة', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'الدلال', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'البخور', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'المجلس', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'الفزعة', category: 'عادات وتقاليد', difficulty: 'medium' },
  { word: 'البشت', category: 'عادات وتقاليد', difficulty: 'medium' },
  { word: 'السدو', category: 'عادات وتقاليد', difficulty: 'hard' },
  { word: 'المزمار', category: 'عادات وتقاليد', difficulty: 'medium' },
  { word: 'الشيلة', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'العقال', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'الغترة', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'الشماغ', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'التمر', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'القهوة', category: 'عادات وتقاليد', difficulty: 'easy' },
  { word: 'الخنجر', category: 'عادات وتقاليد', difficulty: 'medium' },

  // لهجة عامية
  { word: 'طناخ', category: 'لهجة عامية', difficulty: 'medium' },
  { word: 'هيلق', category: 'لهجة عامية', difficulty: 'hard' },
  { word: 'قرقوش', category: 'لهجة عامية', difficulty: 'hard' },
  { word: 'خشم', category: 'لهجة عامية', difficulty: 'medium' },
  { word: 'حيل', category: 'لهجة عامية', difficulty: 'easy' },
  { word: 'سنعة', category: 'لهجة عامية', difficulty: 'medium' },
  { word: 'زحمة', category: 'لهجة عامية', difficulty: 'easy' },
  { word: 'هرجة', category: 'لهجة عامية', difficulty: 'easy' },
  { word: 'مشوار', category: 'لهجة عامية', difficulty: 'easy' },
  { word: 'كشخة', category: 'لهجة عامية', difficulty: 'easy' },

  // شخصيات معروفة
  { word: 'محمد عبده', category: 'شخصيات معروفة', difficulty: 'easy' },
  { word: 'ماجد عبدالله', category: 'شخصيات معروفة', difficulty: 'easy' },
  { word: 'سامي الجابر', category: 'شخصيات معروفة', difficulty: 'easy' },
  { word: 'طلال مداح', category: 'شخصيات معروفة', difficulty: 'medium' },
  { word: 'ياسر القحطاني', category: 'شخصيات معروفة', difficulty: 'easy' },

  // معالم
  { word: 'الكعبة', category: 'معالم', difficulty: 'easy' },
  { word: 'مدائن صالح', category: 'معالم', difficulty: 'medium' },
  { word: 'برج الفيصلية', category: 'معالم', difficulty: 'easy' },
  { word: 'المملكة', category: 'معالم', difficulty: 'easy' },
  { word: 'الدرعية', category: 'معالم', difficulty: 'medium' },
  { word: 'بوليفارد', category: 'معالم', difficulty: 'easy' },
  { word: 'موسم', category: 'معالم', difficulty: 'easy' },

  // حيوانات
  { word: 'صقر', category: 'حيوانات', difficulty: 'easy' },
  { word: 'ناقة', category: 'حيوانات', difficulty: 'easy' },
  { word: 'مها', category: 'حيوانات', difficulty: 'medium' },
  { word: 'وعل', category: 'حيوانات', difficulty: 'hard' },
  { word: 'ضب', category: 'حيوانات', difficulty: 'medium' },
  { word: 'حمام', category: 'حيوانات', difficulty: 'easy' },

  // رياضة
  { word: 'الهلال', category: 'رياضة', difficulty: 'easy' },
  { word: 'النصر', category: 'رياضة', difficulty: 'easy' },
  { word: 'الأهلي', category: 'رياضة', difficulty: 'easy' },
  { word: 'الاتحاد', category: 'رياضة', difficulty: 'easy' },
  { word: 'الشباب', category: 'رياضة', difficulty: 'easy' },
  { word: 'رالي', category: 'رياضة', difficulty: 'medium' },
];

export function getRandomWords(count: number = 25): Word[] {
  // Validate: only words with max 2 tokens
  const valid = wordDatabase.filter(w => w.word.split(' ').length <= 2);
  const shuffled = [...valid].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
