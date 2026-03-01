import { GameState } from "@/lib/gameState";
import { Timer, ChevronLeft } from "lucide-react";

interface GameHeaderProps {
  game: GameState;
  onEndTurn: () => void;
}

const GameHeader = ({ game, onEndTurn }: GameHeaderProps) => {
  const minutes = Math.floor(game.timer / 60);
  const seconds = game.timer % 60;
  const isLowTime = game.timer <= 15;
  const isGuessing = game.turnPhase === "guessing";
  const isRed = game.currentTeam === "red";

  return (
    <div className="bg-card/80 backdrop-blur-sm border-b border-border/50 px-4 py-2.5 sticky top-0 z-20">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-3">
        {/* Team badge + hint */}
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <span
            className={`shrink-0 text-xs font-bold px-3 py-1.5 rounded-full transition-colors ${
              isRed
                ? "bg-team-red text-team-red-foreground"
                : "bg-team-blue text-team-blue-foreground"
            }`}
          >
            {isRed ? "الأحمر" : "الأزرق"}
          </span>

          {game.currentHint ? (
            <div className="flex items-center gap-2 bg-secondary/80 rounded-xl px-3 py-1.5 min-w-0 overflow-hidden">
              <span className="font-bold text-sm text-foreground truncate">
                {game.currentHint.word}
              </span>
              <span className="text-xs text-muted-foreground shrink-0">
                ({game.currentHint.count})
              </span>
              {isGuessing && (
                <span className="text-xs font-semibold text-gold shrink-0">
                  · {game.guessesRemaining} متبقي
                </span>
              )}
            </div>
          ) : (
            <span className="text-xs text-muted-foreground">
              {game.turnPhase === "hint" ? "في انتظار التلميح..." : ""}
            </span>
          )}
        </div>

        {/* Timer */}
        {isGuessing && (
          <div
            className={`flex items-center gap-1.5 shrink-0 font-mono font-bold text-lg tabular-nums transition-colors ${
              isLowTime ? "text-destructive animate-pulse" : "text-foreground"
            }`}
          >
            <Timer
              className={`w-4 h-4 ${isLowTime ? "text-destructive" : "text-muted-foreground"}`}
            />
            {minutes}:{seconds.toString().padStart(2, "0")}
          </div>
        )}

        {/* End turn button */}
        {isGuessing && (
          <button
            onClick={onEndTurn}
            className="shrink-0 flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl border border-border/60 bg-background/60 hover:bg-secondary/80 hover:border-border transition-all duration-150 active:scale-95"
          >
            إنهاء الدور
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};

export default GameHeader;
