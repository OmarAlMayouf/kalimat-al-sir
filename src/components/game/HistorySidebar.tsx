import { useEffect, useRef } from "react";
import { HistoryEntry } from "@/lib/gameState";
import { History } from "lucide-react";

interface HistorySidebarProps {
  history: HistoryEntry[];
}

const COLOR_CLASSES: Record<string, string> = {
  red: "text-team-red font-semibold",
  blue: "text-team-blue font-semibold",
  neutral: "text-foreground",
  assassin: "text-foreground font-bold",
};

const COLOR_BG: Record<string, string> = {
  red: "bg-team-red/10 border-team-red/20",
  blue: "bg-team-blue/10 border-team-blue/20",
  neutral: "bg-secondary/40 border-border/30",
  assassin: "bg-foreground/10 border-foreground/20",
};

const COLOR_LABEL: Record<string, string> = {
  red: "الأحمر",
  blue: "الأزرق",
  neutral: "محايد",
  assassin: "القاتل",
};

function HintRow({
  entry,
}: {
  entry: Extract<HistoryEntry, { type: "hint" }>;
}) {
  const isRed = entry.team === "red";
  return (
    <div
      className={`rounded-xl border px-3 py-2 text-xs overflow-hidden ${
        isRed
          ? "bg-team-red/10 border-team-red/20"
          : "bg-team-blue/10 border-team-blue/20"
      }`}
    >
      <span
        className={`text-[10px] font-bold uppercase tracking-wide ${
          isRed ? "text-team-red" : "text-team-blue"
        }`}
      >
        {isRed ? "● الأحمر" : "● الأزرق"}
      </span>
      <div className="mt-0.5 flex items-baseline gap-1.5 min-w-0 overflow-hidden">
        <span className="font-bold text-foreground text-sm min-w-0 truncate block">{entry.word}</span>
        <span className="text-muted-foreground shrink-0">({entry.amount})</span>
      </div>
    </div>
  );
}

function GuessRow({
  entry,
}: {
  entry: Extract<HistoryEntry, { type: "guess" }>;
}) {
  return (
    <div
      className={`rounded-xl border px-3 py-2 text-xs ${COLOR_BG[entry.color]}`}
    >
      <span className="text-muted-foreground truncate block">{entry.player} خمّن:</span>
      <div className="flex items-center justify-between gap-1 mt-0.5 min-w-0">
        <span className={`text-sm min-w-0 truncate ${COLOR_CLASSES[entry.color]}`}>
          {entry.word}
        </span>
        <span
          className={`text-[10px] px-1.5 py-0.5 rounded-md border shrink-0 ${COLOR_BG[entry.color]} ${COLOR_CLASSES[entry.color]}`}
        >
          {COLOR_LABEL[entry.color]}
        </span>
      </div>
    </div>
  );
}

function TurnEndRow({
  entry,
}: {
  entry: Extract<HistoryEntry, { type: "turn_end" }>;
}) {
  const isRed = entry.team === "red";
  const label = entry.reason === "timeout" ? "انتهى الوقت" : "أنهى الدور";
  return (
    <div className="flex items-center gap-2 px-1 py-0.5">
      <div className="flex-1 h-px bg-border/40" />
      <span
        className={`text-[10px] font-medium shrink-0 ${
          isRed ? "text-team-red/70" : "text-team-blue/70"
        }`}
      >
        {label}
      </span>
      <div className="flex-1 h-px bg-border/40" />
    </div>
  );
}

const HistorySidebar = ({ history }: HistorySidebarProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new entries
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history.length]);

  return (
    <div
      className="
        flex flex-col
        h-full max-h-[calc(100dvh-6rem)]
        bg-card border border-border/50
        rounded-2xl overflow-hidden
        shadow-sm
      "
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-border/40 bg-muted/30 shrink-0">
        <History className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="text-xs font-semibold text-muted-foreground tracking-wide">
          السجل
        </span>
        {history.length > 0 && (
          <span className="mr-auto text-[10px] font-medium text-muted-foreground/60 tabular-nums">
            {history.length}
          </span>
        )}
      </div>

      {/* Entries */}
      <div
        className="
          flex-1 min-h-0
          overflow-y-auto overflow-x-hidden
          px-3 py-2
          scrollbar-thin
        "
        style={{
          scrollbarWidth: "thin",
          scrollbarColor: "hsl(var(--muted-foreground) / 0.25) transparent",
        }}
      >
        {history.length === 0 ? (
          <p className="text-[11px] text-muted-foreground/50 text-center py-6">
            لا يوجد تاريخ بعد
          </p>
        ) : (
          <div className="space-y-1.5 pb-2 overflow-hidden">
            {history.map((entry, i) =>
              entry.type === "hint" ? (
                <HintRow key={i} entry={entry} />
              ) : entry.type === "guess" ? (
                <GuessRow key={i} entry={entry} />
              ) : (
                <TurnEndRow key={i} entry={entry} />
              ),
            )}
            <div ref={bottomRef} />
          </div>
        )}
      </div>
    </div>
  );
};

export default HistorySidebar;
