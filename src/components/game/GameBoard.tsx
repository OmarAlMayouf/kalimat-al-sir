import { GameCard, Team } from '@/lib/gameState';

interface GameBoardProps {
  cards: GameCard[];
  isSpymaster: boolean;
  onCardClick: (index: number) => void;
  currentTeam: Team;
}

const GameBoard = ({ cards, isSpymaster, onCardClick, currentTeam }: GameBoardProps) => {
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
    return 'bg-card hover:bg-secondary border-border hover:border-primary/30 text-foreground cursor-pointer hover:shadow-md transition-all duration-200 active:scale-[0.97]';
  };

  return (
    <div className="flex-1 p-3 sm:p-4">
      <div className="max-w-4xl mx-auto grid grid-cols-5 gap-2 sm:gap-3">
        {cards.map((card, index) => (
          <button
            key={index}
            onClick={() => !card.revealed && onCardClick(index)}
            disabled={card.revealed}
            className={`
              relative rounded-lg border p-2 sm:p-3 
              min-h-[3.5rem] sm:min-h-[4.5rem]
              flex items-center justify-center text-center
              font-semibold text-xs sm:text-sm
              transition-all duration-300 animate-scale-in
              ${getCardStyle(card)}
            `}
            style={{ animationDelay: `${index * 20}ms` }}
          >
            <span className="leading-tight">{card.word.word}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default GameBoard;
