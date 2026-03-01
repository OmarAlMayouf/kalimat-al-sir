import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Users,
  Target,
  Skull,
  Trophy,
  HelpCircle,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import patternBg from "@/assets/pattern-bg.png";

const Section = ({
  icon,
  title,
  children,
  accent = "primary",
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
  accent?: "primary" | "red" | "blue" | "gold" | "assassin";
}) => {
  const [open, setOpen] = useState(true);

  const accentMap = {
    primary: "text-primary border-primary/30 bg-primary/8",
    red: "text-team-red border-team-red/30 bg-team-red/8",
    blue: "text-team-blue border-team-blue/30 bg-team-blue/8",
    gold: "text-gold border-gold/30 bg-gold/8",
    assassin: "text-foreground border-border bg-card-neutral/60",
  };

  const iconBgMap = {
    primary: "bg-primary/15 text-primary",
    red: "bg-team-red/15 text-team-red",
    blue: "bg-team-blue/15 text-team-blue",
    gold: "bg-gold/15 text-gold",
    assassin: "bg-muted text-muted-foreground",
  };

  return (
    <div
      className={`rounded-2xl border ${accentMap[accent]} backdrop-blur-sm overflow-hidden transition-all duration-300`}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-3 p-4 text-right"
      >
        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${iconBgMap[accent]}`}
        >
          {icon}
        </div>
        <span className="flex-1 font-bold text-base text-foreground">
          {title}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-4 pb-4 pt-0 text-sm text-foreground/80 leading-relaxed space-y-2 border-t border-current/10">
          {children}
        </div>
      </div>
    </div>
  );
};

const CardBadge = ({
  color,
  label,
  count,
}: {
  color: string;
  label: string;
  count: string;
}) => (
  <div className="flex items-center gap-2.5">
    <div className={`w-8 h-8 rounded-lg flex-shrink-0 ${color} shadow-sm`} />
    <div>
      <p className="font-semibold text-sm text-foreground">{label}</p>
      <p className="text-xs text-muted-foreground">{count}</p>
    </div>
  </div>
);

const RulesPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-8 relative overflow-hidden">
      {/* Pattern bg */}
      <div
        className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{
          backgroundImage: `url(${patternBg})`,
          backgroundSize: "300px",
        }}
      />

      {/* Ambient blobs */}
      <div className="absolute top-[-10%] right-[-10%] w-72 h-72 rounded-full bg-team-red/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-72 h-72 rounded-full bg-team-blue/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-sm mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 rounded-xl bg-card border border-border/60 flex items-center justify-center hover:bg-secondary/60 transition-colors"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-foreground leading-tight">
              قواعد اللعبة
            </h1>
            <p className="text-xs text-muted-foreground">
              كلمة السر · دليل اللاعبين
            </p>
          </div>
          <div className="mr-auto">
            <HelpCircle className="w-6 h-6 text-muted-foreground/50" />
          </div>
        </div>

        {/* Quick summary card */}
        <div className="bg-primary/10 border border-primary/25 rounded-2xl p-4 mb-5">
          <p className="text-sm text-foreground/90 leading-relaxed text-center font-medium">
            فريقان يتنافسان لاكتشاف كلماتهم السرية قبل الخصم. العميل السري يعطي
            أدلة بكلمة واحدة!
          </p>
        </div>

        {/* Card legend */}
        <div className="bg-card border border-border/60 rounded-2xl p-4 mb-5">
          <h3 className="font-bold text-sm text-muted-foreground mb-3 uppercase tracking-wider">
            أنواع البطاقات
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <CardBadge
              color="bg-team-red"
              label="فريق أحمر"
              count="٨-٩ بطاقات"
            />
            <CardBadge
              color="bg-team-blue"
              label="فريق أزرق"
              count="٨-٩ بطاقات"
            />
            <CardBadge
              color="bg-card-neutral border border-border"
              label="محايد"
              count="٧ بطاقات"
            />
            <CardBadge
              color="bg-card-assassin border border-border"
              label="القاتل ☠"
              count="١ بطاقة"
            />
          </div>
        </div>

        {/* Rules sections */}
        <div className="space-y-3">
          <Section
            icon={<Users className="w-4 h-4" />}
            title="تشكيل الفرق"
            accent="primary"
          >
            <p className="mt-2">
              ينقسم اللاعبون إلى <strong>فريقين: الأحمر والأزرق</strong>. كل
              فريق يختار <strong>عميلاً سرياً (Spymaster)</strong> واحداً،
              والباقون يكونون <strong>عملاء ميدانيين</strong>.
            </p>
            <p>
              يرى العميل السري خريطة الألوان السرية ويعرف أين توجد كل الكلمات.
            </p>
          </Section>

          <Section
            icon={<Eye className="w-4 h-4" />}
            title="دور العميل السري"
            accent="gold"
          >
            <p className="mt-2">
              في كل دور يعطي العميل السري <strong>كلمة واحدة + عدداً</strong>.
            </p>
            <ul className="space-y-1 list-none">
              <li className="flex gap-2">
                <span className="text-gold font-bold">•</span>
                <span>الكلمة: دلالة تربط بكلمات فريقه</span>
              </li>
              <li className="flex gap-2">
                <span className="text-gold font-bold">•</span>
                <span>العدد: كم كلمة في اللوحة تنطبق على الدلالة</span>
              </li>
            </ul>
            <p className="bg-gold/10 border border-gold/20 rounded-xl px-3 py-2 text-xs mt-2">
              مثال: "حيوانات ٣" تعني أن ٣ كلمات في اللوحة لها علاقة بالحيوانات
            </p>
          </Section>

          <Section
            icon={<Target className="w-4 h-4" />}
            title="دور العملاء الميدانيين"
            accent="blue"
          >
            <p className="mt-2">
              يتشاور العملاء الميدانيون ويختارون بطاقة من اللوحة:
            </p>
            <ul className="space-y-1 list-none">
              <li className="flex gap-2">
                <span className="text-team-blue font-bold">✓</span>
                <span>
                  <strong>كلمة فريقكم</strong> - استمر في التخمين (حتى العدد +
                  ١)
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-muted-foreground font-bold">○</span>
                <span>
                  <strong>كلمة محايدة</strong> - ينتهي دورك
                </span>
              </li>
              <li className="flex gap-2">
                <span className="text-team-red font-bold">✗</span>
                <span>
                  <strong>كلمة الفريق الآخر</strong> - ينتهي دورك وتفيد الخصم!
                </span>
              </li>
            </ul>
          </Section>

          <Section
            icon={<Skull className="w-4 h-4" />}
            title="بطاقة القاتل ☠"
            accent="assassin"
          >
            <p className="mt-2">
              إذا اختار فريقك <strong>بطاقة القاتل</strong>، تخسر اللعبة فوراً!
            </p>
            <p className="text-xs text-muted-foreground">
              هذه أخطر بطاقة في اللوحة - تجنبها بأي ثمن.
            </p>
          </Section>

          <Section
            icon={<EyeOff className="w-4 h-4" />}
            title="قيود العميل السري"
            accent="primary"
          >
            <p className="mt-2">لا يجوز للعميل السري:</p>
            <ul className="space-y-1 list-none">
              <li className="flex gap-2">
                <span className="text-destructive font-bold">✗</span>
                <span>استخدام كلمة موجودة في اللوحة</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive font-bold">✗</span>
                <span>إعطاء أكثر من كلمة دلالة</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive font-bold">✗</span>
                <span>الإشارة أو إعطاء تلميحات بالإيماءات</span>
              </li>
            </ul>
          </Section>

          <Section
            icon={<Trophy className="w-4 h-4" />}
            title="الفوز والخسارة"
            accent="gold"
          >
            <p className="mt-2">
              <strong>تفوز</strong> إذا اكتشف فريقك جميع كلماته قبل الفريق
              الآخر.
            </p>
            <p>
              <strong>تخسر فوراً</strong> إذا:
            </p>
            <ul className="space-y-1 list-none">
              <li className="flex gap-2">
                <span className="text-destructive font-bold">•</span>
                <span>اخترت بطاقة القاتل</span>
              </li>
              <li className="flex gap-2">
                <span className="text-destructive font-bold">•</span>
                <span>اكتشف الفريق الآخر جميع كلماته أولاً</span>
              </li>
            </ul>
          </Section>
        </div>

        {/* CTA */}
        <div className="mt-6 mb-4">
          <button
            onClick={() => navigate("/")}
            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2.5 shadow-[0_4px_24px_hsl(var(--primary)/0.35)] hover:shadow-[0_6px_32px_hsl(var(--primary)/0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
          >
            ابدأ اللعب الآن
            <ArrowRight className="w-5 h-5 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesPage;
