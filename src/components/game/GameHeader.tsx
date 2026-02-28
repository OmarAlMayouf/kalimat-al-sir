import { GameState, Team } from '@/lib/gameState';
import { Button } from '@/components/ui/button';

interface GameHeaderProps {
  game: GameState;
  onEndTurn: () => void;
}

const GameHeader = ({ game, onEndTurn }: GameHeaderProps) => {
  const minutes = Math.floor(game.timer / 60);
  const seconds = game.timer % 60;
  const isLowTime = game.timer <= 15;

  return (
    <div className="bg-card/80 backdrop-blur-sm border-b px-4 py-3">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Red score */}
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-lg bg-team-red flex items-center justify-center text-team-red-foreground font-bold text-lg ${game.currentTeam === 'red' ? 'animate-pulse-gold ring-2 ring-gold' : ''}`}>
            {game.scores.red}
          </div>
          <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
            / {game.targetScores.red}
          </span>
        </div>

        {/* Timer and turn */}
        <div className="flex flex-col items-center gap-1">
          <div className={`text-2xl font-bold tabular-nums ${isLowTime ? 'text-destructive' : 'text-foreground'}`}>
            {minutes}:{seconds.toString().padStart(2, '0')}
          </div>
          <div className="flex items-center gap-2">
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
              game.currentTeam === 'red' 
                ? 'bg-team-red text-team-red-foreground' 
                : 'bg-team-blue text-team-blue-foreground'
            }`}>
              {game.currentTeam === 'red' ? 'الفريق الأحمر' : 'الفريق الأزرق'}
            </span>
          </div>
        </div>

        {/* Blue score */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground hidden sm:inline">
            {game.targetScores.blue} /
          </span>
          <div className={`w-10 h-10 rounded-lg bg-team-blue flex items-center justify-center text-team-blue-foreground font-bold text-lg ${game.currentTeam === 'blue' ? 'animate-pulse-gold ring-2 ring-gold' : ''}`}>
            {game.scores.blue}
          </div>
        </div>
      </div>

      {/* End turn button */}
      <div className="max-w-4xl mx-auto mt-2 flex justify-center">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onEndTurn}
          className="text-sm"
        >
          إنهاء الدور
        </Button>
      </div>
    </div>
  );
};

export default GameHeader;
