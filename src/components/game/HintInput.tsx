import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Team } from "@/lib/gameState";
import { ArrowLeft, Minus, Plus } from "lucide-react";

interface HintInputProps {
  currentTeam: Team;
  onSubmitHint: (word: string, count: number) => void;
}

const HintInput = ({ currentTeam, onSubmitHint }: HintInputProps) => {
  const [hintWord, setHintWord] = useState("");
  const [hintCount, setHintCount] = useState(1);

  const handleSubmit = () => {
    if (!hintWord.trim()) return;
    onSubmitHint(hintWord.trim(), hintCount);
    setHintWord("");
    setHintCount(1);
  };

  const isRed = currentTeam === "red";

  return (
    <div
      className={`
      mx-auto max-w-lg rounded-2xl border-2 p-3 sm:p-4 animate-fade-in
      ${
        isRed
          ? "border-team-red/30 bg-team-red/5"
          : "border-team-blue/30 bg-team-blue/5"
      }
    `}
    >
      <h3 className="text-sm font-bold text-center mb-2.5 text-muted-foreground">
        أدخل التلميح
      </h3>

      <div className="flex flex-col xs:flex-row gap-2 items-stretch xs:items-end">
        {/* Hint word */}
        <div className="flex-1">
          <label className="text-[11px] text-muted-foreground mb-1 block font-medium">
            الكلمة
          </label>
          <Input
            value={hintWord}
            onChange={(e) => setHintWord(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            placeholder="التلميح..."
            className="h-10 text-center font-semibold"
            dir="rtl"
            autoFocus
          />
        </div>

        {/* Count stepper + Submit — same row on all sizes */}
        <div className="flex items-end gap-2">
          {/* Count stepper */}
          <div>
            <label className="text-[11px] text-muted-foreground mb-1 block font-medium text-center">
              العدد
            </label>
            <div className="flex items-center gap-1 h-10">
              <button
                onClick={() => setHintCount((c) => Math.max(1, c - 1))}
                className="w-8 h-8 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors active:scale-90"
                type="button"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="w-8 text-center font-bold text-base tabular-nums">
                {hintCount}
              </span>
              <button
                onClick={() => setHintCount((c) => Math.min(8, c + 1))}
                className="w-8 h-8 rounded-lg bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors active:scale-90"
                type="button"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!hintWord.trim()}
            type="button"
            className={`h-10 px-4 rounded-xl font-bold text-sm flex items-center gap-1.5 transition-all duration-200 active:scale-95 whitespace-nowrap
              ${
                hintWord.trim()
                  ? isRed
                    ? "bg-team-red text-team-red-foreground hover:opacity-90"
                    : "bg-team-blue text-team-blue-foreground hover:opacity-90"
                  : "bg-muted text-muted-foreground cursor-not-allowed"
              }
            `}
          >
            ابدأ
            <ArrowLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HintInput;
