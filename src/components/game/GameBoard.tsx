import { GameCard, Team } from '@/lib/gameState';

interface GameBoardProps {
    cards: GameCard[];
    isSpymaster: boolean;
    currentPlayer?: {
        id: string;
        team: Team;
        isSpymaster: boolean;
    } | null;
    onCardClick: (index: number) => void;
    onRightClick: (index: number) => void;
    currentTeam: Team;
    canGuess: boolean;
}

const GameBoard = ({ currentPlayer, cards, isSpymaster, onCardClick, onRightClick, currentTeam, canGuess }: GameBoardProps) => {
    const getCardStyle = (card: GameCard) => {
        if (card.revealed) {
            switch (card.type) {
                case 'red':
                    return 'bg-team-red text-white border-team-red shadow-inner';
                case 'blue':
                    return 'bg-team-blue text-white border-team-blue shadow-inner';
                case 'assassin':
                    return 'bg-gray-900 text-white border-gray-900 dark:bg-black dark:border-black';
                default:
                    return 'bg-muted text-muted-foreground border-muted opacity-70';
            }
        }

        if (isSpymaster) {
            switch (card.type) {
                case 'red':
                    return 'bg-red-500 dark:bg-red-700 text-white border-red-600 font-bold';
                case 'blue':
                    return 'bg-blue-500 dark:bg-blue-700 text-white border-blue-600 font-bold';
                case 'assassin':
                    return 'bg-gray-900 dark:bg-black text-white border-gray-700 font-bold';
                default:
                    // Neutral — warm cream in light mode, visible muted in dark
                    return 'bg-stone-100 dark:bg-muted text-stone-500 dark:text-muted-foreground border-stone-300 dark:border-border';
            }
        }

        // Regular player view (unrevealed)
        const highlightRing = card.highlighted ? 'ring-2 ring-gold shadow-[0_0_12px_hsl(var(--gold)/0.4)]' : '';
        const clickable = canGuess && !isSpymaster && currentPlayer?.team === currentTeam
            ? 'cursor-pointer hover:bg-secondary hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.97] active:translate-y-0'
            : 'cursor-default';
        return `bg-card border-border/70 text-foreground transition-all duration-200 ${clickable} ${highlightRing}`;
    };

    const handleContextMenu = (e: React.MouseEvent, index: number) => {
        e.preventDefault();
        if (!cards[index].revealed) {
            onRightClick(index);
        }
    };

    const isMyTurn = canGuess && currentPlayer?.team === currentTeam && !currentPlayer?.isSpymaster;

    return (
        <div className="flex-1 px-2 py-3 sm:px-3 sm:py-4">
            <div
                className="w-full max-w-4xl mx-auto grid grid-cols-5 gap-1.5 sm:gap-2"
                style={{ gridAutoRows: '1fr', aspectRatio: '5 / 5' }}
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
              transition-all duration-200 animate-scale-in
              select-none
              ${!isMyTurn || card.revealed ? 'cursor-default' : 'cursor-pointer'}
              ${getCardStyle(card)}
            `}
                        style={{ animationDelay: `${index * 18}ms` }}
                    >
            <span className="leading-tight break-words w-full px-0.5">
              {card?.word?.word ?? ''}
            </span>
                        {card?.revealed && card.type === 'assassin' && (
                            <span className="absolute top-1 right-1 text-[10px]">💀</span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default GameBoard;