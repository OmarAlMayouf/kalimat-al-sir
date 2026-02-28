import { GameCard, Team } from '@/lib/gameState';

interface GameBoardProps {
  cards: GameCard[];
  isSpymaster: boolean;
  onCardClick: (index: number) => void;
  onRightClick: (index: number) => void;
  currentTeam: Team;
  canGuess: boolean;
}

const GameBoard = ({ cards, isSpymaster, onCardClick, onRightClick, currentTeam, canGuess }: GameBoardProps) => {
  const getCardStyle = (card: GameCard) => {
    if (card.revealed || isSpymaster) {
      switch (card.type) {
        case 'red':
          return card.revealed 
            ? 'bg-team-red text-team-red-foreground opacity-90' 
            : 'bg-team-red/20 border-team-red text-team-red ring-1 ring-team-red/30';
        case 'blue':
          return card.revealed 
            ? 'bg-team-blue text-team-blue-foreground opacity-90' 
            : 'bg-team-blue/20 border-team-blue text-team-blue ring-1 ring-team-blue/30';
        case 'assassin':
          return card.revealed 
            ? 'bg-card-assassin text-primary-foreground' 
            : 'bg-card-assassin/20 border-foreground/30 text-foreground ring-1 ring-foreground/20';
        default:
          return card.revealed 
            ? 'bg-card-neutral text-muted-foreground opacity-70' 
            : 'bg-card-neutral/50 border-border text-muted-foreground ring-1 ring-border';
      }
    }
    const highlightRing = card.highlighted ? 'ring-2 ring-gold' : '';
    const clickable = canGuess && !isSpymaster
      ? 'cursor-pointer hover:bg-secondary hover:border-primary/30 hover:shadow-md active:scale-[0.97]'
      : 'cursor-default opacity-80';
    return `bg-card border-border text-foreground transition-all duration-200 ${clickable} ${highlightRing}`;
  };

  const handleContextMenu = (e: React.MouseEvent, index: number) => {
    e.preventDefault();
    if (!cards[index].revealed) {
      onRightClick(index);
    }
  };

  return (
    <div className="flex-1 p-3 sm:p-4">
      <div className="max-w-3xl mx-auto grid grid-cols-5 gap-1.5 sm:gap-2.5">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => canGuess && !isSpymaster && !card.revealed && onCardClick(index)}
            onContextMenu={(e) => handleContextMenu(e, index)}
            disabled={card.revealed || !canGuess || isSpymaster}
            className={`
              relative rounded-lg border p-1.5 sm:p-3 
              min-h-[3rem] sm:min-h-[4rem]
              flex items-center justify-center text-center
              font-semibold text-[11px] sm:text-sm
              transition-all duration-300 animate-scale-in
              ${getCardStyle(card)}
            `}
            style={{ animationDelay: `${index * 20}ms` }}
          >
            <span className="leading-tight">{card.word.word}</span>
            {card.revealed && card.type === 'assassin' && (
              <span className="absolute top-0.5 left-0.5 text-xs">💀</span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
