import { Team } from '@/lib/gameState';
import {Home, RotateCcw, TrophyIcon} from 'lucide-react';

interface GameOverDialogProps {
    winner: Team | null;
    scores: { red: number; blue: number };
    onRestart: () => void;
    onHome: () => void;
}

const GameOverDialog = ({ winner, scores, onRestart, onHome }: GameOverDialogProps) => {
    const isRed = winner === 'red';

    return (
        <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
            {/* Ambient blob matching winner */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none ${
                isRed ? 'bg-team-red/15' : 'bg-team-blue/15'
            }`} />

            <div className="relative z-10 bg-card border border-border/60 rounded-2xl p-8 max-w-sm w-full text-center animate-scale-in shadow-xl space-y-6">

                {/* Trophy */}
                <div className="flex flex-col items-center gap-2">
                    <TrophyIcon  className="h-10 w-full"/>
                    <div className={`text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full ${
                        isRed ? 'bg-team-red/15 text-team-red' : 'bg-team-blue/15 text-team-blue'
                    }`}>
                        انتهت اللعبة
                    </div>
                    <h2 className="text-2xl font-bold mt-1">
                        فاز {isRed ? 'الفريق الأحمر' : 'الفريق الأزرق'}!
                    </h2>
                </div>

                {/* Score comparison */}
                <div className="flex items-center justify-center gap-4">
                    {/* Red */}
                    <div className="text-center flex-1">
                        <div className={`w-full py-3 rounded-xl font-black text-2xl flex items-center justify-center transition-all ${
                            isRed ? 'bg-team-red text-team-red-foreground ring-2 ring-team-red/50 shadow-lg' : 'bg-team-red/10 text-team-red'
                        }`}>
                            {scores.red}
                        </div>
                        <span className="text-[11px] text-muted-foreground mt-1.5 block font-medium">أحمر</span>
                    </div>

                    <span className="text-muted-foreground/40 font-bold text-lg pb-5">–</span>

                    {/* Blue */}
                    <div className="text-center flex-1">
                        <div className={`w-full py-3 rounded-xl font-black text-2xl flex items-center justify-center transition-all ${
                            !isRed ? 'bg-team-blue text-team-blue-foreground ring-2 ring-team-blue/50 shadow-lg' : 'bg-team-blue/10 text-team-blue'
                        }`}>
                            {scores.blue}
                        </div>
                        <span className="text-[11px] text-muted-foreground mt-1.5 block font-medium">أزرق</span>
                    </div>
                </div>

                {/* Actions */}
                <div className="space-y-2.5 pt-1">
                    <button
                        onClick={onRestart}
                        className={`w-full h-12 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]
              ${isRed
                            ? 'bg-team-red text-team-red-foreground shadow-[0_4px_20px_hsl(var(--team-red)/0.35)]'
                            : 'bg-team-blue text-team-blue-foreground shadow-[0_4px_20px_hsl(var(--team-blue)/0.35)]'
                        }`}
                    >
                        <RotateCcw className="w-4 h-4" />
                        لعبة جديدة
                    </button>
                    <button
                        onClick={onHome}
                        className="w-full h-11 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 border border-border/60 bg-background/60 hover:bg-secondary/60 transition-all duration-200 text-muted-foreground hover:text-foreground"
                    >
                        <Home className="w-4 h-4" />
                        الصفحة الرئيسية
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GameOverDialog;