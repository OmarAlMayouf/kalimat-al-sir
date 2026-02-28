import { Team } from '@/lib/gameState';
import { Button } from '@/components/ui/button';

interface GameOverDialogProps {
  winner: Team | null;
  scores: { red: number; blue: number };
  onRestart: () => void;
  onHome: () => void;
}

const GameOverDialog = ({ winner, scores, onRestart, onHome }: GameOverDialogProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="bg-card border rounded-2xl p-8 max-w-sm w-full text-center animate-scale-in space-y-6">
        <div className="text-5xl mb-2">🏆</div>
        <h2 className="text-2xl font-bold">
          فاز {winner === 'red' ? 'الفريق الأحمر' : 'الفريق الأزرق'}!
        </h2>
        
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-team-red flex items-center justify-center text-team-red-foreground font-bold text-xl mx-auto">
              {scores.red}
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">أحمر</span>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 rounded-lg bg-team-blue flex items-center justify-center text-team-blue-foreground font-bold text-xl mx-auto">
              {scores.blue}
            </div>
            <span className="text-xs text-muted-foreground mt-1 block">أزرق</span>
          </div>
        </div>

        <div className="space-y-3">
          <Button onClick={onRestart} className="w-full h-12 text-lg font-semibold">
            لعبة جديدة 🔄
          </Button>
          <Button variant="outline" onClick={onHome} className="w-full">
            الصفحة الرئيسية
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GameOverDialog;
