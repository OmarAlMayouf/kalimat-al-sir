import { GameState, Team } from '@/lib/gameState';

interface TeamSidebarProps {
  game: GameState;
  team: Team;
}

const TeamSidebar = ({ game, team }: TeamSidebarProps) => {
  const players = game.players.filter(p => p.team === team);
  const isActive = game.currentTeam === team;
  const score = game.scores[team];
  const target = game.targetScores[team];

  const teamColors = team === 'red' 
    ? { bg: 'bg-team-red/10', border: 'border-team-red/20', text: 'text-team-red', badge: 'bg-team-red', label: 'الأحمر' }
    : { bg: 'bg-team-blue/10', border: 'border-team-blue/20', text: 'text-team-blue', badge: 'bg-team-blue', label: 'الأزرق' };

  return (
    <div className={`
      ${teamColors.bg} border ${teamColors.border} rounded-xl p-3 
      ${isActive ? 'ring-2 ring-gold' : ''}
      transition-all duration-300
    `}>
      {/* Score */}
      <div className="text-center mb-3">
        <div className={`${teamColors.badge} text-white rounded-lg py-2 px-3 inline-flex items-center gap-2`}>
          <span className="text-lg font-bold">{score}</span>
          <span className="text-xs opacity-80">/ {target}</span>
        </div>
        <div className={`text-xs font-semibold mt-1 ${teamColors.text}`}>
          {teamColors.label}
        </div>
      </div>

      {/* Active indicator */}
      {isActive && (
        <div className={`text-[10px] text-center font-bold ${teamColors.text} mb-2`}>
          ▶ الدور الحالي
        </div>
      )}

      {/* Players */}
      <div className="space-y-1.5">
        {players.map(p => (
          <div key={p.id} className="bg-card/60 rounded-md px-2 py-1.5 text-xs flex items-center justify-between gap-1">
            <span className="font-medium truncate">{p.name}</span>
            {p.isSpymaster && (
              <span className="text-[9px] bg-gold/20 text-gold px-1 py-0.5 rounded font-semibold shrink-0">
                رئيس
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Hint display */}
      {isActive && game.currentHint && (
        <div className={`mt-3 p-2 rounded-lg border ${teamColors.border} ${teamColors.bg} text-center`}>
          <div className="text-[10px] text-muted-foreground mb-1">التلميح</div>
          <div className={`font-bold text-sm ${teamColors.text}`}>{game.currentHint.word}</div>
          <div className="text-xs text-muted-foreground">{game.currentHint.count} كلمات</div>
        </div>
      )}
    </div>
  );
};

export default TeamSidebar;
