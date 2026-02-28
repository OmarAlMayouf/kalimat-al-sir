import { GameState } from '@/lib/gameState';
import { Button } from '@/components/ui/button';

interface GameHeaderProps {
  game: GameState;
  onEndTurn: () => void;
}

const GameHeader = ({ game, onEndTurn }: GameHeaderProps) => {
  const minutes = Math.floor(game.timer / 60);
  const seconds = game.timer % 60;
  const isLowTime = game.timer <= 15;
  const isGuessing = game.turnPhase === 'guessing';

  return (
    <div className="bg-card/80 backdrop-blur-sm border-b px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Current team & hint */}
        <div className="flex items-center gap-3 flex-1">
          <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
            game.currentTeam === 'red' 
              ? 'bg-team-red text-team-red-foreground' 
              : 'bg-team-blue text-team-blue-foreground'
          }`}>
            {game.currentTeam === 'red' ? 'الأحمر' : 'الأزرق'}
          </span>
          {game.currentHint && (
            <div className="flex items-center gap-2 bg-secondary rounded-lg px-3 py-1.5">
              <span className="text-sm font-bold text-foreground">{game.currentHint.word}</span>
              <span className="text-xs text-muted-foreground">({game.currentHint.count})</span>
              {isGuessing && (
                <span className="text-xs text-gold font-semibold">
                  متبقي: {game.guessesRemaining}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Timer */}
        {isGuessing && (
          <div className={`text-xl font-bold tabular-nums ${isLowTime ? 'text-destructive animate-pulse' : 'text-foreground'}`}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
        )}

        {/* End turn button */}
        {isGuessing && (
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onEndTurn}
            className="text-sm"
          >
            إنهاء الدور
          </Button>
        )}
      </div>
    </div>
  );
};

export default GameHeader;
