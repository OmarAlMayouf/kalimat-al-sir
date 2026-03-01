import { GameCard, Team } from "@/lib/gameState";
import { useEffect, useRef, useState } from "react";

interface GameBoardProps {
  cards: GameCard[];
  isSpymaster: boolean;
  currentPlayer?: { id: string; team: Team; isSpymaster: boolean } | null;
  onCardClick: (index: number) => void;
  onRightClick: (index: number) => void;
  currentTeam: Team;
  canGuess: boolean;
}

const GameBoard = ({
  currentPlayer,
  cards,
  isSpymaster,
  onCardClick,
  onRightClick,
  currentTeam,
  canGuess,
}: GameBoardProps) => {
  // Track which card indices are currently playing the reveal animation
  const [revealingIndices, setRevealingIndices] = useState<Set<number>>(
    new Set(),
  );
  const prevCardsRef = useRef<GameCard[]>(cards);

  useEffect(() => {
    const prev = prevCardsRef.current;
    const newlyRevealed: number[] = [];
    cards.forEach((card, i) => {
      if (card.revealed && !prev[i]?.revealed) {
        newlyRevealed.push(i);
      }
    });
    if (newlyRevealed.length > 0) {
      setRevealingIndices((s) => {
        const next = new Set(s);
        newlyRevealed.forEach((i) => next.add(i));
        return next;
      });
      // Remove after animation completes (600ms)
      const t = setTimeout(() => {
        setRevealingIndices((s) => {
          const next = new Set(s);
          newlyRevealed.forEach((i) => next.delete(i));
          return next;
        });
      }, 650);
      return () => clearTimeout(t);
    }
    prevCardsRef.current = cards;
  }, [cards]);

  useEffect(() => {
    prevCardsRef.current = cards;
  }, [cards]);

  const getRevealedStyle = (card: GameCard) => {
    if (isSpymaster) {
      switch (card.type) {
        case "red":
          return "bg-red-900/50 text-red-300/60 border-red-900/40 opacity-50 line-through";
        case "blue":
          return "bg-blue-900/50 text-blue-300/60 border-blue-900/40 opacity-50 line-through";
        case "assassin":
          return "bg-gray-950 text-gray-600 border-gray-800 opacity-50 line-through";
        default:
          return "bg-muted/30 text-muted-foreground/40 border-muted/20 opacity-50 line-through";
      }
    }
    switch (card.type) {
      case "red":
        return "bg-team-red text-white border-team-red shadow-inner";
      case "blue":
        return "bg-team-blue text-white border-team-blue shadow-inner";
      case "assassin":
        return "bg-gray-900 text-white border-gray-900 dark:bg-black dark:border-black";
      default:
        return "bg-muted text-muted-foreground border-muted opacity-70";
    }
  };

  const getCardStyle = (card: GameCard) => {
    if (card.revealed) return getRevealedStyle(card);

    if (isSpymaster) {
      let baseStyle = "";
      switch (card.type) {
        case "red":
          baseStyle =
            "bg-red-500 dark:bg-red-700 text-white border-red-600 font-bold";
          break;
        case "blue":
          baseStyle =
            "bg-blue-500 dark:bg-blue-700 text-white border-blue-600 font-bold";
          break;
        case "assassin":
          baseStyle =
            "bg-gray-900 dark:bg-black text-white border-gray-700 font-bold";
          break;
        default:
          baseStyle =
            "bg-stone-100 dark:bg-muted text-stone-500 dark:text-muted-foreground border-stone-300 dark:border-border";
      }
      const highlightRing = card.highlighted
        ? "ring-[3px] ring-gold border-gold shadow-[0_0_24px_hsl(var(--gold)/0.8),inset_0_0_12px_hsl(var(--gold)/0.25)] z-10 brightness-110"
        : "";
      return `${baseStyle} ${highlightRing}`;
    }

    const highlightRing = card.highlighted
      ? "ring-2 ring-gold shadow-[0_0_12px_hsl(var(--gold)/0.4)]"
      : "";
    const clickable =
      canGuess && currentPlayer?.team === currentTeam && !isSpymaster
        ? "cursor-pointer hover:bg-secondary hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0"
        : "cursor-default";
    return `bg-card border-border/70 text-foreground transition-all duration-200 ${clickable} ${highlightRing}`;
  };

  const handleContextMenu = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    if (!cards[index].revealed) onRightClick(index);
  };

  const isMyTurn =
    canGuess &&
    currentPlayer?.team === currentTeam &&
    !currentPlayer?.isSpymaster;

  return (
    <div className="flex-1 px-2 py-3 sm:px-3 sm:py-4">
      <style>{`
        @keyframes card-flip {
          0%   { transform: rotateY(0deg) scale(1); }
          40%  { transform: rotateY(90deg) scale(1.08); }
          60%  { transform: rotateY(90deg) scale(1.08); }
          100% { transform: rotateY(0deg) scale(1); }
        }
        .card-flipping {
          animation: card-flip 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }
      `}</style>
      <div
        className="w-full max-w-3xl mx-auto grid grid-cols-5 gap-1.5 sm:gap-2"
        style={{ gridAutoRows: "1fr", aspectRatio: "5 / 5" }}
      >
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => {
              if (!card?.word || !isMyTurn || card.revealed) return;
              onCardClick(index);
            }}
            onContextMenu={(e) => handleContextMenu(e, index)}
            disabled={!isMyTurn || card.revealed}
            className={`
              relative rounded-xl border-2 p-1.5 sm:p-2.5
              min-h-0 min-w-0 aspect-square
              flex items-center justify-center text-center
              font-semibold text-[10px] sm:text-xl
              animate-scale-in select-none
              ${revealingIndices.has(index) ? "card-flipping" : "transition-all duration-300"}
              ${!isMyTurn || card.revealed ? "cursor-default" : "cursor-pointer"}
              ${getCardStyle(card)}
            `}
            style={{
              animationDelay: revealingIndices.has(index)
                ? "0ms"
                : `${index * 18}ms`,
            }}
          >
            <span className="leading-tight break-words w-full px-0.5">
              {card?.word?.word ?? ""}
            </span>
            {card?.revealed && card.type === "assassin" && (
              <span className="absolute top-1 right-1 text-[10px]">💀</span>
            )}
            {card?.revealed && isSpymaster && (
              <span className="absolute inset-0 flex items-center justify-center rounded-xl pointer-events-none">
                <span className="text-lg opacity-40">✕</span>
              </span>
            )}
            {!card?.revealed && isSpymaster && card.highlighted && (
              <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 rounded-full bg-gold text-[9px] font-black text-black shadow-md">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
