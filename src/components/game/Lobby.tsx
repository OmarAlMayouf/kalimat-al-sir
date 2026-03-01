import { GameState, LobbySettings, Team } from "@/lib/gameState";
import { Button } from "@/components/ui/button";
import { Copy, Share2, Crown, Users, Shield, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useLobbySettings } from "@/hooks/useLobbySettings";
import LobbyTimerConfig from "@/components/game/LobbyTimerConfig";

interface LobbyProps {
  game: GameState;
  playerId: string;
  onStart: () => void;
  onSwitchTeam: (playerId: string, team: Team) => void;
  onToggleSpymaster: (playerId: string) => void;
  onSettingsChange: (settings: LobbySettings) => void;
}

const Lobby = ({
  game,
  playerId,
  onStart,
  onSwitchTeam,
  onToggleSpymaster,
  onSettingsChange,
}: LobbyProps) => {
  const isHost = game.hostId === playerId;
  const redTeam = game.players.filter((p) => p.team === "red");
  const blueTeam = game.players.filter((p) => p.team === "blue");
  const navigate = useNavigate();
  const currentPlayer = game.players.find((p) => p.id === playerId);

  const {
    settings,
    toggleTimeLimit,
    toggleSpymasterTimer,
    toggleNormalTimer,
    setSpymasterDuration,
    setNormalDuration,
  } = useLobbySettings(game, isHost, onSettingsChange);

  const copyCode = () => {
    navigator.clipboard.writeText(game.roomCode);
    toast.success("تم نسخ الكود");
  };

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`انضم للعبة كلمة السر! 🎮\nكود الغرفة: ${game.roomCode}`)}`;
    window.open(url, "_blank");
  };

  const redHasSpymaster = redTeam.some((p) => p.isSpymaster);
  const blueHasSpymaster = blueTeam.some((p) => p.isSpymaster);
  const redHasPlayers = redTeam.some((p) => !p.isSpymaster);
  const blueHasPlayers = blueTeam.some((p) => !p.isSpymaster);
  const canStart =
    redHasSpymaster && blueHasSpymaster && redHasPlayers && blueHasPlayers;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Ambient background blobs */}
      <div className="absolute top-[-10%] left-[-5%] w-72 h-72 rounded-full bg-team-red/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-72 h-72 rounded-full bg-team-blue/10 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="w-full max-w-xl mx-auto animate-fade-in space-y-5 relative z-10">
        {/* Header row */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="text-muted-foreground hover:text-foreground gap-1 text-sm"
          >
            <ChevronRight className="w-4 h-4" />
            الرئيسية
          </Button>
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
            <Users className="w-3.5 h-3.5" />
            <span>
              {(() => {
                const n = game.players.length;
                if (n === 1) return "لاعب";
                if (n === 2) return "لاعبين";
                if (n >= 11) return `${n} لاعب`;
                return `${n} لاعبين`;
              })()}
            </span>
          </div>
        </div>

        {/* Title */}
        <div className="text-center space-y-1">
          <div className="flex items-center justify-center gap-2 mb-1">
            <h1 className="text-3xl font-bold tracking-tight">غرفة الانتظار</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            اختر فريقك وانتظر بدء المضيف
          </p>
        </div>

        {/* Room code card */}
        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-4">
          <p className="text-xs text-muted-foreground text-center font-medium uppercase tracking-widest">
            كود الغرفة
          </p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-4xl font-mono font-black tracking-[0.25em] text-primary select-all">
              {game.roomCode}
            </span>
            <button
              onClick={copyCode}
              className="p-2.5 rounded-xl bg-secondary hover:bg-secondary/80 transition-all hover:scale-105 active:scale-95"
              title="نسخ الكود"
            >
              <Copy className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={shareWhatsApp}
            className="gap-2 w-full"
          >
            <Share2 className="w-4 h-4" />
            مشاركة عبر واتساب
          </Button>
        </div>

        {/* Teams grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* Red team */}
          <div
            className={`rounded-2xl p-4 border transition-all duration-200 ${
              currentPlayer?.team === "red"
                ? "bg-team-red/15 border-team-red/40 shadow-[0_0_20px_hsl(var(--team-red)/0.12)]"
                : "bg-card border-border/50"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-team-red">الفريق الأحمر</h3>
              <span className="text-[10px] bg-team-red/10 text-team-red px-2 py-0.5 rounded-full font-semibold">
                {redTeam.length}
              </span>
            </div>

            <div className="space-y-1.5 min-h-[60px]">
              {redTeam.length === 0 && (
                <p className="text-[11px] text-muted-foreground text-center py-3">
                  لا يوجد لاعبون
                </p>
              )}
              {redTeam.map((p) => (
                <div
                  key={p.id}
                  className={`rounded-xl px-3 py-2 text-xs flex items-center justify-between gap-1 transition-colors ${
                    p.id === playerId
                      ? "bg-team-red/20 border border-team-red/30"
                      : "bg-background/60"
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    {p.isSpymaster && (
                      <Crown className="w-3 h-3 text-gold flex-shrink-0" />
                    )}
                    <span className="font-medium truncate">{p.name}</span>
                    {p.id === game.hostId && (
                      <Shield className="w-2.5 h-2.5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                  {p.isSpymaster && (
                    <span className="text-[9px] bg-gold/20 text-gold px-1.5 py-0.5 rounded-full font-bold flex-shrink-0">
                      رئيس
                    </span>
                  )}
                </div>
              ))}
            </div>

            {currentPlayer?.team !== "red" && (
              <button
                onClick={() => onSwitchTeam(playerId, "red")}
                className="mt-2 w-full text-[11px] text-team-red hover:bg-team-red/10 py-2 rounded-xl transition-colors font-semibold border border-dashed border-team-red/30 hover:border-team-red/50"
              >
                + انضم للأحمر
              </button>
            )}
          </div>

          {/* Blue team */}
          <div
            className={`rounded-2xl p-4 border transition-all duration-200 ${
              currentPlayer?.team === "blue"
                ? "bg-team-blue/15 border-team-blue/40 shadow-[0_0_20px_hsl(var(--team-blue)/0.12)]"
                : "bg-card border-border/50"
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-team-blue">
                الفريق الأزرق
              </h3>
              <span className="text-[10px] bg-team-blue/10 text-team-blue px-2 py-0.5 rounded-full font-semibold">
                {blueTeam.length}
              </span>
            </div>

            <div className="space-y-1.5 min-h-[60px]">
              {blueTeam.length === 0 && (
                <p className="text-[11px] text-muted-foreground text-center py-3">
                  لا يوجد لاعبون
                </p>
              )}
              {blueTeam.map((p) => (
                <div
                  key={p.id}
                  className={`rounded-xl px-3 py-2 text-xs flex items-center justify-between gap-1 transition-colors ${
                    p.id === playerId
                      ? "bg-team-blue/20 border border-team-blue/30"
                      : "bg-background/60"
                  }`}
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    {p.isSpymaster && (
                      <Crown className="w-3 h-3 text-gold flex-shrink-0" />
                    )}
                    <span className="font-medium truncate">{p.name}</span>
                    {p.id === game.hostId && (
                      <Shield className="w-2.5 h-2.5 text-muted-foreground flex-shrink-0" />
                    )}
                  </div>
                  {p.isSpymaster && (
                    <span className="text-[9px] bg-gold/20 text-gold px-1.5 py-0.5 rounded-full font-bold flex-shrink-0">
                      رئيس
                    </span>
                  )}
                </div>
              ))}
            </div>

            {currentPlayer?.team !== "blue" && (
              <button
                onClick={() => onSwitchTeam(playerId, "blue")}
                className="mt-2 w-full text-[11px] text-team-blue hover:bg-team-blue/10 py-2 rounded-xl transition-colors font-semibold border border-dashed border-team-blue/30 hover:border-team-blue/50"
              >
                + انضم للأزرق
              </button>
            )}
          </div>
        </div>

        {/* Readiness indicators */}
        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div
            className={`flex items-center gap-1.5 justify-center py-2 px-3 rounded-xl ${redHasSpymaster && redHasPlayers ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-muted/50 text-muted-foreground"}`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${redHasSpymaster && redHasPlayers ? "bg-green-500" : "bg-muted-foreground/40"}`}
            />
            الأحمر {redHasSpymaster && redHasPlayers ? "جاهز ✓" : "غير جاهز"}
          </div>
          <div
            className={`flex items-center gap-1.5 justify-center py-2 px-3 rounded-xl ${blueHasSpymaster && blueHasPlayers ? "bg-green-500/10 text-green-600 dark:text-green-400" : "bg-muted/50 text-muted-foreground"}`}
          >
            <div
              className={`w-1.5 h-1.5 rounded-full ${blueHasSpymaster && blueHasPlayers ? "bg-green-500" : "bg-muted-foreground/40"}`}
            />
            الأزرق {blueHasSpymaster && blueHasPlayers ? "جاهز ✓" : "غير جاهز"}
          </div>
        </div>

        {/* Timer configuration */}
        <LobbyTimerConfig
          settings={settings}
          isHost={isHost}
          onToggleTimeLimit={toggleTimeLimit}
          onToggleSpymasterTimer={toggleSpymasterTimer}
          onToggleNormalTimer={toggleNormalTimer}
          onSetSpymasterDuration={setSpymasterDuration}
          onSetNormalDuration={setNormalDuration}
        />

        {/* Spymaster toggle */}
        <button
          onClick={() => onToggleSpymaster(playerId)}
          className={`w-full py-3 rounded-2xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${
            currentPlayer?.isSpymaster
              ? "bg-gold/15 border-gold/40 text-gold hover:bg-gold/20"
              : "bg-card border-border/60 text-foreground hover:border-gold/40 hover:text-gold"
          }`}
        >
          <Crown className="w-4 h-4" />
          {currentPlayer?.isSpymaster
            ? "إلغاء دور رئيس الفريق"
            : "أكون رئيس الفريق"}
        </button>

        {/* Start button - host only */}
        {isHost && (
          <Button
            onClick={onStart}
            disabled={!canStart}
            className={`w-full h-14 text-base font-bold rounded-2xl tracking-wide transition-all duration-200 ${
              canStart
                ? "shadow-[0_4px_24px_hsl(var(--primary)/0.35)] hover:shadow-[0_6px_32px_hsl(var(--primary)/0.45)] hover:scale-[1.01] active:scale-[0.99]"
                : ""
            }`}
          >
            ابدأ اللعبة
          </Button>
        )}

        {!isHost && (
          <p className="text-center text-xs text-muted-foreground pb-2">
            في انتظار المضيف لبدء اللعبة...
          </p>
        )}
      </div>
    </div>
  );
};

export default Lobby;
