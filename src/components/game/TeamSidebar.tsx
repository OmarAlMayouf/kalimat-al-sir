import { GameState, Team } from '@/lib/gameState';
import { Crown } from 'lucide-react';

interface TeamSidebarProps {
    game: GameState;
    team: Team;
}

const TeamSidebar = ({ game, team }: TeamSidebarProps) => {
    const players = game.players.filter(p => p.team === team);
    const isActive = game.currentTeam === team;
    const score = game.scores[team];
    const target = game.targetScores[team];
    const progress = Math.round((score / target) * 100);

    const isRed = team === 'red';
    const colors = isRed
        ? { bg: 'bg-team-red/10', border: 'border-team-red/25', text: 'text-team-red', badge: 'bg-team-red', bar: 'bg-team-red', label: 'الأحمر' }
        : { bg: 'bg-team-blue/10', border: 'border-team-blue/25', text: 'text-team-blue', badge: 'bg-team-blue', bar: 'bg-team-blue', label: 'الأزرق' };

    return (
        <div className={`
      ${colors.bg} border ${colors.border} rounded-2xl p-3
      ${isActive ? 'ring-2 ring-gold shadow-[0_0_16px_hsl(var(--gold)/0.2)]' : ''}
      transition-all duration-300
    `}>
            {/* Active indicator */}
            {isActive && (
                <div className={`text-[9px] text-center font-bold ${colors.text} mb-2 tracking-widest uppercase`}>
                    ● الدور الحالي
                </div>
            )}

            {/* Score */}
            <div className="text-center mb-3">
                <div className={`${colors.badge} text-white rounded-xl py-2 px-4 inline-flex items-baseline gap-1.5`}>
                    <span className="text-2xl font-black">{score}</span>
                    <span className="text-xs opacity-70 font-medium">/ {target}</span>
                </div>
                <div className={`text-[11px] font-bold mt-1.5 ${colors.text}`}>{colors.label}</div>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-background/60 rounded-full mb-3 overflow-hidden">
                <div
                    className={`h-full rounded-full ${colors.bar} transition-all duration-500`}
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Players */}
            <div className="space-y-1">
                {players.map(p => (
                    <div key={p.id} className="bg-background/50 rounded-xl px-2.5 py-1.5 text-[11px] flex items-center justify-between gap-1">
                        <div className="flex items-center gap-1.5 min-w-0">
                            {p.isSpymaster && <Crown className="w-2.5 h-2.5 text-gold flex-shrink-0" />}
                            <span className="font-medium truncate">{p.name}</span>
                        </div>
                        {p.isSpymaster && (
                            <span className="text-[9px] bg-gold/20 text-gold px-1.5 py-0.5 rounded-full font-bold shrink-0">رئيس</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Active hint */}
            {isActive && game.currentHint && (
                <div className={`mt-2.5 p-2.5 rounded-xl border ${colors.border} ${colors.bg} text-center`}>
                    <div className="text-[9px] text-muted-foreground mb-0.5 tracking-wide">التلميح الحالي</div>
                    <div className={`font-bold text-sm ${colors.text}`}>{game.currentHint.word}</div>
                    <div className="text-[10px] text-muted-foreground">{game.currentHint.count} كلمات</div>
                </div>
            )}
        </div>
    );
};

export default TeamSidebar;