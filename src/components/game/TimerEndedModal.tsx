import { useEffect, useRef, useState } from "react";
import { Team } from "@/lib/gameState";

interface TimerEndedModalProps {
  team: Team;
  phase: "hint" | "guessing";
  onComplete: () => void;
}

const TimerEndedModal = ({ team, phase, onComplete }: TimerEndedModalProps) => {
  const [visible, setVisible] = useState<"enter" | "hold" | "exit">("enter");
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const hold = setTimeout(() => setVisible("hold"), 80);
    const exit = setTimeout(() => setVisible("exit"), 2400);
    const done = setTimeout(() => onCompleteRef.current(), 2800);
    return () => {
      clearTimeout(hold);
      clearTimeout(exit);
      clearTimeout(done);
    };
  }, []);

  const isRed = team === "red";
  const isHint = phase === "hint";

  return (
    <div
      className={`
        fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm
        transition-opacity duration-300
        ${visible === "enter" ? "opacity-0" : visible === "hold" ? "opacity-100" : "opacity-0"}
        ${isRed ? "bg-team-red/15" : "bg-team-blue/15"}
      `}
    >
      <div
        className={`
          relative z-10 text-center px-10 py-8 rounded-3xl border shadow-2xl max-w-xs w-full mx-4
          transform transition-all duration-300
          ${visible === "hold" ? "scale-100 opacity-100" : "scale-90 opacity-0"}
          ${isRed ? "bg-team-red border-team-red/20" : "bg-team-blue border-team-blue/20"}
        `}
      >
        <div className="text-5xl mb-4">⏰</div>
        <h2 className="text-xl font-black text-white mb-1">انتهى الوقت!</h2>
        <p className="text-white/70 text-sm">
          {isHint
            ? `لم يعطِ ${isRed ? "الفريق الأحمر" : "الفريق الأزرق"} تلميحاً في الوقت المحدد`
            : `انتهى وقت ${isRed ? "الفريق الأحمر" : "الفريق الأزرق"} للتخمين`}
        </p>

        <div className="mt-5 w-full h-0.5 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/60 rounded-full"
            style={{ animation: "shrink 2.4s linear forwards" }}
          />
        </div>
      </div>

      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export default TimerEndedModal;
