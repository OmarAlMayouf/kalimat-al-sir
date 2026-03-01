import { Team } from "@/lib/gameState";
import { useEffect, useRef, useState } from "react";

interface TurnTransitionProps {
  team: Team;
  onComplete: () => void;
}

const TurnTransition = ({ team, onComplete }: TurnTransitionProps) => {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 1600);
    const doneTimer = setTimeout(() => {
      setVisible(false);
      onCompleteRef.current();
    }, 2000);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  if (!visible) return null;

  const isRed = team === "red";

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm transition-opacity duration-300 ${
        exiting ? "opacity-0" : "opacity-100 animate-fade-in"
      } ${isRed ? "bg-team-red/20" : "bg-team-blue/20"}`}
    >
      {/* Ambient glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
          isRed ? "bg-team-red/30" : "bg-team-blue/30"
        }`}
      />

      <div
        className={`
        relative rounded-2xl px-12 py-10 text-center animate-scale-in shadow-2xl border
        ${
          isRed
            ? "bg-team-red border-team-red/20"
            : "bg-team-blue border-team-blue/20"
        }
      `}
      >
        <div className="text-4xl mb-4">🎯</div>
        <h2 className="text-3xl font-black text-white mb-2 tracking-tight">
          {isRed ? "الفريق الأحمر" : "الفريق الأزرق"}
        </h2>
        <p className="text-white/70 text-base font-medium">
          دوركم الآن — استعدوا!
        </p>

        {/* Animated countdown bar */}
        <div className="mt-5 w-full h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-white/60 rounded-full"
            style={{
              animation: "shrink 1.6s linear forwards",
            }}
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

export default TurnTransition;
