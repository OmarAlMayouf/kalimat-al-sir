export interface Word {
    word: string;
    category: string;
    region?: string;
}

/**
 * The wordDatabase represents the Firestore `words` collection.
 * It is NOT used to fetch words at runtime — Firebase is the source of truth.
 * This file is used for:
 *   1. Uploading the initial seed data to Firebase.
 *   2. Referencing the algorithm (getRandomWords) locally during development.
 */
export const wordDatabase: Word[] = [
    // ===== FOOD =====
    { word: "كبسة", category: "food" },
    { word: "مندي", category: "food" },
    { word: "جريش", category: "food" },
    { word: "مرقوق", category: "food" },
    { word: "مطازيز", category: "food" },
    { word: "قرصان", category: "food" },
    { word: "عريكة", category: "food" },
    { word: "سليق", category: "food" },
    { word: "معصوب", category: "food" },
    { word: "حنيني", category: "food" },
    { word: "كليجا", category: "food" },
    { word: "مضبي", category: "food" },
    { word: "سمبوسة", category: "food" },
    { word: "تمر", category: "food" },
    { word: "هريسة", category: "food" },
    { word: "مكبوس", category: "food" },
    { word: "بريانی", category: "food" },
    { word: "شاورما", category: "food" },
    { word: "فول", category: "food" },
    { word: "متبل", category: "food" },
    { word: "حمص", category: "food" },
    { word: "فلافل", category: "food" },
    { word: "كنافة", category: "food" },
    { word: "قطايف", category: "food" },
    { word: "مهلبية", category: "food" },
    { word: "لقيمات", category: "food" },
    { word: "بلاليط", category: "food" },
    { word: "عصيدة", category: "food" },
    { word: "مسكوف", category: "food" },
    { word: "قوزي", category: "food" },
    { word: "منسف", category: "food" },
    { word: "ثريد", category: "food" },
    { word: "مرق", category: "food" },
    { word: "مفطح", category: "food" },
    { word: "خبز", category: "food" },
    { word: "مرتديلا", category: "food" },
    { word: "محمر", category: "food" },
    { word: "قهوة", category: "food" },
    { word: "شاي", category: "food" },
    { word: "عرق سوس", category: "food" },
    { word: "تمر هندي", category: "food" },
    { word: "لبن", category: "food" },
    { word: "كشك", category: "food" },
    { word: "صالونة", category: "food" },
    { word: "مرق دجاج", category: "food" },
    { word: "حساء عدس", category: "food" },
    { word: "فتة", category: "food" },
    { word: "كبدة", category: "food" },
    { word: "مشاوي", category: "food" },
    { word: "رشوف", category: "food" },

    // ===== CITIES =====
    { word: "الرياض", category: "cities" },
    { word: "جدة", category: "cities" },
    { word: "مكة", category: "cities" },
    { word: "المدينة", category: "cities" },
    { word: "الدمام", category: "cities" },
    { word: "الخبر", category: "cities" },
    { word: "أبها", category: "cities" },
    { word: "تبوك", category: "cities" },
    { word: "حائل", category: "cities" },
    { word: "نجران", category: "cities" },
    { word: "العلا", category: "cities" },
    { word: "الطائف", category: "cities" },
    { word: "جازان", category: "cities" },
    { word: "سكاكا", category: "cities" },
    { word: "عرعر", category: "cities" },
    { word: "القطيف", category: "cities" },
    { word: "الأحساء", category: "cities" },
    { word: "ينبع", category: "cities" },
    { word: "خميس مشيط", category: "cities" },
    { word: "بريدة", category: "cities" },
    { word: "عنيزة", category: "cities" },
    { word: "القصيم", category: "cities" },
    { word: "الجوف", category: "cities" },
    { word: "الباحة", category: "cities" },
    { word: "الليث", category: "cities" },
    { word: "القنفذة", category: "cities" },
    { word: "وادي الدواسر", category: "cities" },
    { word: "رفحاء", category: "cities" },
    { word: "الزلفي", category: "cities" },
    { word: "شرورة", category: "cities" },

    // ===== TRADITIONS & CULTURE =====
    { word: "العرضة", category: "traditions" },
    { word: "البشت", category: "traditions" },
    { word: "العقال", category: "traditions" },
    { word: "الغترة", category: "traditions" },
    { word: "الشماغ", category: "traditions" },
    { word: "السدو", category: "traditions" },
    { word: "المجلس", category: "traditions" },
    { word: "الدلال", category: "traditions" },
    { word: "المزمار", category: "traditions" },
    { word: "الحناء", category: "traditions" },
    { word: "الدف", category: "traditions" },
    { word: "الرواية", category: "traditions" },
    { word: "المهر", category: "traditions" },
    { word: "الوليمة", category: "traditions" },
    { word: "السمر", category: "traditions" },
    { word: "المبارك", category: "traditions" },
    { word: "الكيل", category: "traditions" },
    { word: "الخرج", category: "traditions" },
    { word: "العيد", category: "traditions" },
    { word: "رمضان", category: "traditions" },
    { word: "الزكاة", category: "traditions" },
    { word: "الحج", category: "traditions" },
    { word: "العمرة", category: "traditions" },
    { word: "الأذان", category: "traditions" },
    { word: "الصلاة", category: "traditions" },
    { word: "الضيافة", category: "traditions" },
    { word: "البخور", category: "traditions" },
    { word: "العطر", category: "traditions" },
    { word: "المسواك", category: "traditions" },
    { word: "السفرة", category: "traditions" },

    // ===== SAUDI DIALECT =====
    { word: "سنعة", category: "dialect" },
    { word: "كشخة", category: "dialect" },
    { word: "هرجة", category: "dialect" },
    { word: "مشوار", category: "dialect" },
    { word: "زحمة", category: "dialect" },
    { word: "خشم", category: "dialect" },
    { word: "حيل", category: "dialect" },
    { word: "طق", category: "dialect" },
    { word: "يهبل", category: "dialect" },
    { word: "تفشخر", category: "dialect" },
    { word: "مزة", category: "dialect" },
    { word: "ثقيل", category: "dialect" },
    { word: "شكل", category: "dialect" },
    { word: "ودعة", category: "dialect" },
    { word: "غلط", category: "dialect" },
    { word: "بلوى", category: "dialect" },
    { word: "صراحة", category: "dialect" },
    { word: "على طول", category: "dialect" },
    { word: "ما عليه", category: "dialect" },
    { word: "قدام", category: "dialect" },
    { word: "وراه", category: "dialect" },
    { word: "زين", category: "dialect" },
    { word: "عشم", category: "dialect" },
    { word: "ترس", category: "dialect" },
    { word: "لقف", category: "dialect" },

    // ===== CELEBRITIES & PUBLIC FIGURES =====
    { word: "محمد عبده", category: "celebrities" },
    { word: "ماجد عبدالله", category: "celebrities" },
    { word: "سامي الجابر", category: "celebrities" },
    { word: "ياسر القحطاني", category: "celebrities" },
    { word: "طلال مداح", category: "celebrities" },
    { word: "عبدالمجيد عبدالله", category: "celebrities" },
    { word: "رابح صقر", category: "celebrities" },
    { word: "عبادي الجوهر", category: "celebrities" },
    { word: "أحمد عطية", category: "celebrities" },
    { word: "محمد الشمري", category: "celebrities" },
    { word: "فهد بالنفس", category: "celebrities" },
    { word: "أصيل أبو بكر", category: "celebrities" },
    { word: "فؤاد عبدالواحد", category: "celebrities" },
    { word: "عبدالله الرويشد", category: "celebrities" },
    { word: "نوال الكويتية", category: "celebrities" },
    { word: "حسين الجسمي", category: "celebrities" },

    // ===== LANDMARKS =====
    { word: "الكعبة", category: "landmarks" },
    { word: "مدائن صالح", category: "landmarks" },
    { word: "الدرعية", category: "landmarks" },
    { word: "برج الفيصلية", category: "landmarks" },
    { word: "برج المملكة", category: "landmarks" },
    { word: "العلا", category: "landmarks" },
    { word: "نيوم", category: "landmarks" },
    { word: "البحر الأحمر", category: "landmarks" },
    { word: "تروجينا", category: "landmarks" },
    { word: "القدية", category: "landmarks" },
    { word: "الخزامى", category: "landmarks" },
    { word: "جبل عمر", category: "landmarks" },
    { word: "البلد", category: "landmarks" },
    { word: "الفيلا", category: "landmarks" },
    { word: "وادي حنيفة", category: "landmarks" },
    { word: "منتزه الملك", category: "landmarks" },
    { word: "مسجد قباء", category: "landmarks" },
    { word: "الروضة الشريفة", category: "landmarks" },
    { word: "مقام إبراهيم", category: "landmarks" },
    { word: "بئر زمزم", category: "landmarks" },

    // ===== ANIMALS =====
    { word: "صقر", category: "animals" },
    { word: "ناقة", category: "animals" },
    { word: "مها", category: "animals" },
    { word: "وعل", category: "animals" },
    { word: "ضب", category: "animals" },
    { word: "نمر عربي", category: "animals" },
    { word: "حمامة", category: "animals" },
    { word: "عقاب", category: "animals" },
    { word: "أرنب", category: "animals" },
    { word: "ذئب", category: "animals" },
    { word: "ثعلب", category: "animals" },
    { word: "قنفذ", category: "animals" },
    { word: "دلفين", category: "animals" },
    { word: "سلحفاة", category: "animals" },
    { word: "قرش", category: "animals" },
    { word: "بعير", category: "animals" },
    { word: "حصان", category: "animals" },
    { word: "خروف", category: "animals" },
    { word: "تيس", category: "animals" },
    { word: "دجاجة", category: "animals" },

    // ===== SPORTS =====
    { word: "الهلال", category: "sports" },
    { word: "النصر", category: "sports" },
    { word: "الاتحاد", category: "sports" },
    { word: "الأهلي", category: "sports" },
    { word: "الشباب", category: "sports" },
    { word: "دوري روشن", category: "sports" },
    { word: "كأس الملك", category: "sports" },
    { word: "رالي داكار", category: "sports" },
    { word: "كرة القدم", category: "sports" },
    { word: "السلة", category: "sports" },
    { word: "التنس", category: "sports" },
    { word: "السباحة", category: "sports" },
    { word: "الفروسية", category: "sports" },
    { word: "الهجن", category: "sports" },
    { word: "صيد الصقور", category: "sports" },
    { word: "الغوص", category: "sports" },
    { word: "التزلج", category: "sports" },

    // ===== NATURE =====
    { word: "صحراء", category: "nature" },
    { word: "نخلة", category: "nature" },
    { word: "رمال", category: "nature" },
    { word: "جبل", category: "nature" },
    { word: "وادي", category: "nature" },
    { word: "خشب", category: "nature" },
    { word: "بركان", category: "nature" },
    { word: "شلال", category: "nature" },
    { word: "كثيب", category: "nature" },
    { word: "سماء", category: "nature" },
    { word: "نجم", category: "nature" },
    { word: "قمر", category: "nature" },
    { word: "شمس", category: "nature" },
    { word: "غيوم", category: "nature" },
    { word: "مطر", category: "nature" },
    { word: "برق", category: "nature" },
    { word: "رعد", category: "nature" },
    { word: "موج", category: "nature" },
    { word: "شاطئ", category: "nature" },
    { word: "جزيرة", category: "nature" },

    // ===== OBJECTS / EVERYDAY =====
    { word: "مفتاح", category: "objects" },
    { word: "ساعة", category: "objects" },
    { word: "هاتف", category: "objects" },
    { word: "كتاب", category: "objects" },
    { word: "قلم", category: "objects" },
    { word: "مرآة", category: "objects" },
    { word: "سجادة", category: "objects" },
    { word: "مصباح", category: "objects" },
    { word: "نافذة", category: "objects" },
    { word: "باب", category: "objects" },
    { word: "طاولة", category: "objects" },
    { word: "كرسي", category: "objects" },
    { word: "حقيبة", category: "objects" },
    { word: "عطر", category: "objects" },
    { word: "خاتم", category: "objects" },
    { word: "سوار", category: "objects" },
    { word: "قلادة", category: "objects" },
    { word: "نظارة", category: "objects" },
    { word: "محفظة", category: "objects" },
    { word: "سيارة", category: "objects" },

    // ===== PROFESSIONS =====
    { word: "طبيب", category: "professions" },
    { word: "مهندس", category: "professions" },
    { word: "معلم", category: "professions" },
    { word: "شرطي", category: "professions" },
    { word: "تاجر", category: "professions" },
    { word: "محامي", category: "professions" },
    { word: "طيار", category: "professions" },
    { word: "صياد", category: "professions" },
    { word: "نجار", category: "professions" },
    { word: "حداد", category: "professions" },
    { word: "خياط", category: "professions" },
    { word: "صيدلاني", category: "professions" },
    { word: "ممرض", category: "professions" },
    { word: "مصور", category: "professions" },
    { word: "مذيع", category: "professions" },
    { word: "سائق", category: "professions" },
    { word: "فلاح", category: "professions" },
    { word: "رسام", category: "professions" },
    { word: "موسيقار", category: "professions" },
    { word: "ممثل", category: "professions" },

    // ===== CONCEPTS & EMOTIONS =====
    { word: "حنين", category: "concepts" },
    { word: "فخر", category: "concepts" },
    { word: "شوق", category: "concepts" },
    { word: "كرم", category: "concepts" },
    { word: "وفاء", category: "concepts" },
    { word: "أمل", category: "concepts" },
    { word: "سلام", category: "concepts" },
    { word: "عدل", category: "concepts" },
    { word: "شجاعة", category: "concepts" },
    { word: "حكمة", category: "concepts" },
    { word: "صبر", category: "concepts" },
    { word: "تواضع", category: "concepts" },
    { word: "إخلاص", category: "concepts" },
    { word: "رحمة", category: "concepts" },
    { word: "غيرة", category: "concepts" },
    { word: "حسد", category: "concepts" },
    { word: "خوف", category: "concepts" },
    { word: "أمان", category: "concepts" },
    { word: "حرية", category: "concepts" },
    { word: "وحدة", category: "concepts" },

    // ===== ENTERTAINMENT =====
    { word: "مسلسل", category: "entertainment" },
    { word: "فيلم", category: "entertainment" },
    { word: "أغنية", category: "entertainment" },
    { word: "مسرحية", category: "entertainment" },
    { word: "ألعاب", category: "entertainment" },
    { word: "سينما", category: "entertainment" },
    { word: "يوتيوب", category: "entertainment" },
    { word: "بودكاست", category: "entertainment" },
    { word: "تويتش", category: "entertainment" },
    { word: "سناب", category: "entertainment" },
    { word: "تيك توك", category: "entertainment" },
    { word: "قناة", category: "entertainment" },
    { word: "نتفليكس", category: "entertainment" },
    { word: "فيفا", category: "entertainment" },
    { word: "ببجي", category: "entertainment" },

    // ===== TRANSPORTATION =====
    { word: "طائرة", category: "transportation" },
    { word: "قطار", category: "transportation" },
    { word: "سفينة", category: "transportation" },
    { word: "حافلة", category: "transportation" },
    { word: "دراجة", category: "transportation" },
    { word: "مترو", category: "transportation" },
    { word: "تاكسي", category: "transportation" },
    { word: "مروحية", category: "transportation" },
    { word: "قارب", category: "transportation" },
    { word: "جمل", category: "transportation" },

    // ===== TECHNOLOGY =====
    { word: "ذكاء اصطناعي", category: "technology" },
    { word: "إنترنت", category: "technology" },
    { word: "برنامج", category: "technology" },
    { word: "كمبيوتر", category: "technology" },
    { word: "لاب توب", category: "technology" },
    { word: "تطبيق", category: "technology" },
    { word: "شبكة", category: "technology" },
    { word: "كاميرا", category: "technology" },
    { word: "شاشة", category: "technology" },
    { word: "مكبر صوت", category: "technology" },
];

// ─────────────────────────────────────────────
// PRODUCTION ALGORITHM
// ─────────────────────────────────────────────

/**
 * How many words to pull per selected category.
 * 25 words / 5 categories = 5 words each → clean, hintable board.
 * We pick 5 categories, pull 5 words from each.
 */
const WORDS_PER_CATEGORY = 5;
const CATEGORIES_PER_GAME = 5;

/**
 * Category weights — higher = more likely to be selected for a game.
 * We bias toward culturally rich, fun categories.
 */
const CATEGORY_WEIGHTS: Record<string, number> = {
    food: 9,
    traditions: 9,
    dialect: 10,
    landmarks: 8,
    cities: 7,
    celebrities: 6,
    animals: 7,
    sports: 8,
    nature: 7,
    concepts: 8,
    entertainment: 8,
    professions: 6,
    objects: 5,
    transportation: 5,
    technology: 6,
};

function isValidWord(word: Word): boolean {
    const parts = word.word.trim().split(/\s+/);
    if (parts.length > 2) return false;
    if (word.word.replace(/\s/g, "").length < 2) return false;
    return true;
}

/** Fisher-Yates shuffle */
function shuffle<T>(arr: T[]): T[] {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

/**
 * Pick N categories using weighted random sampling WITHOUT replacement.
 * This ensures we get exactly CATEGORIES_PER_GAME distinct categories.
 */
function pickCategories(available: string[], count: number): string[] {
    const pool = available.map((cat) => ({
        cat,
        weight: CATEGORY_WEIGHTS[cat] ?? 5,
    }));

    const selected: string[] = [];

    while (selected.length < count && pool.length > 0) {
        const total = pool.reduce((sum, e) => sum + e.weight, 0);
        let rand = Math.random() * total;
        let idx = 0;
        for (; idx < pool.length - 1; idx++) {
            rand -= pool[idx].weight;
            if (rand <= 0) break;
        }
        selected.push(pool[idx].cat);
        pool.splice(idx, 1);
    }

    return selected;
}

/**
 * Production-grade word selector.
 *
 * Strategy:
 * 1. Group all valid words by category.
 * 2. Only consider categories that have enough words (≥ WORDS_PER_CATEGORY).
 * 3. Weighted-randomly pick exactly CATEGORIES_PER_GAME categories.
 * 4. From each selected category, randomly pick exactly WORDS_PER_CATEGORY words.
 * 5. Shuffle the final 25 cards to distribute categories across the board.
 *
 * Result: Every game has exactly 5 categories × 5 words = 25 cards.
 * Spymasters can craft meaningful hints; players face real thematic ambiguity.
 */
export function getRandomWords(count: number = 25): Word[] {
    const valid = wordDatabase.filter(isValidWord);

    // Group by category
    const byCategory: Record<string, Word[]> = {};
    for (const word of valid) {
        if (!byCategory[word.category]) byCategory[word.category] = [];
        byCategory[word.category].push(word);
    }

    // Only use categories with enough words
    const eligibleCategories = Object.keys(byCategory).filter(
        (cat) => byCategory[cat].length >= WORDS_PER_CATEGORY
    );

    const wordsPerCat = Math.floor(count / CATEGORIES_PER_GAME);
    const numCategories = Math.min(CATEGORIES_PER_GAME, eligibleCategories.length);

    // Pick categories using weighted sampling
    const selectedCategories = pickCategories(eligibleCategories, numCategories);

    // Pull random words from each selected category
    const result: Word[] = [];
    for (const cat of selectedCategories) {
        const picked = shuffle(byCategory[cat]).slice(0, wordsPerCat);
        result.push(...picked);
    }

    // Handle remainder if count isn't perfectly divisible (edge case)
    // Pull from a random remaining category
    if (result.length < count) {
        const usedCats = new Set(selectedCategories);
        const remaining = valid.filter(
            (w) => !usedCats.has(w.category) && !result.includes(w)
        );
        const extras = shuffle(remaining).slice(0, count - result.length);
        result.push(...extras);
    }

    // Final shuffle — mix categories across the board positions
    return shuffle(result);
}
