import { GameState, Team } from '@/lib/gameState';
import { Button } from '@/components/ui/button';
import { Copy, Share2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

interface LobbyProps {
  game: GameState;
  playerId: string;
  onStart: () => void;
  onSwitchTeam: (playerId: string, team: Team) => void;
  onToggleSpymaster: (playerId: string) => void;
}

const Lobby = ({ game, playerId, onStart, onSwitchTeam, onToggleSpymaster }: LobbyProps) => {
  const isHost = game.hostId === playerId;
  const redTeam = game.players.filter(p => p.team === 'red');
  const blueTeam = game.players.filter(p => p.team === 'blue');
  const navigate = useNavigate();

  const copyCode = () => {
    navigator.clipboard.writeText(game.roomCode);
    toast.success('تم نسخ الكود');
  };

  const shareWhatsApp = () => {
    const url = `https://wa.me/?text=${encodeURIComponent(`انضم للعبة كلمة السر! 🎮\nكود الغرفة: ${game.roomCode}`)}`;
    window.open(url, '_blank');
  };

  // Check if both teams have a spymaster
  const redHasSpymaster = redTeam.some(p => p.isSpymaster);
  const blueHasSpymaster = blueTeam.some(p => p.isSpymaster);
  const canStart = redHasSpymaster && blueHasSpymaster;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg mx-auto animate-fade-in space-y-6">
        {/* Home button */}
        <div className="flex justify-end">
          <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
            الصفحة الرئيسية
          </Button>
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">غرفة الانتظار</h1>
          <div className="inline-flex items-center gap-2 bg-card border rounded-xl px-4 py-3">
            <span className="text-2xl font-mono font-bold tracking-[0.2em] text-primary">{game.roomCode}</span>
            <button onClick={copyCode} className="p-1.5 rounded-md hover:bg-secondary transition-colors">
              <Copy className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
          <div className="mt-3">
            <Button variant="outline" size="sm" onClick={shareWhatsApp} className="gap-2">
              <Share2 className="w-4 h-4" />
              مشاركة عبر واتساب
            </Button>
          </div>
        </div>

        {/* Teams */}
        <div className="grid grid-cols-2 gap-4">
          {/* Red team */}
          <div className="bg-team-red/10 border border-team-red/20 rounded-xl p-4">
            <h3 className="text-sm font-bold text-team-red mb-3 text-center">الفريق الأحمر</h3>
            <div className="space-y-2">
              {redTeam.map(p => (
                <div key={p.id} className="bg-card/60 rounded-lg px-3 py-2 text-sm flex items-center justify-between">
                  <span className="font-medium">{p.name}</span>
                  {p.isSpymaster && <span className="text-[10px] bg-gold/20 text-gold px-1.5 py-0.5 rounded font-semibold">رئيس</span>}
                </div>
              ))}
              {game.players.find(p => p.id === playerId)?.team !== 'red' && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onSwitchTeam(playerId, 'red')}
                  className="w-full text-xs text-team-red hover:bg-team-red/10"
                >
                  انضم للأحمر
                </Button>
              )}
            </div>
          </div>

          {/* Blue team */}
          <div className="bg-team-blue/10 border border-team-blue/20 rounded-xl p-4">
            <h3 className="text-sm font-bold text-team-blue mb-3 text-center">الفريق الأزرق</h3>
            <div className="space-y-2">
              {blueTeam.map(p => (
                <div key={p.id} className="bg-card/60 rounded-lg px-3 py-2 text-sm flex items-center justify-between">
                  <span className="font-medium">{p.name}</span>
                  {p.isSpymaster && <span className="text-[10px] bg-gold/20 text-gold px-1.5 py-0.5 rounded font-semibold">رئيس</span>}
                </div>
              ))}
              {game.players.find(p => p.id === playerId)?.team !== 'blue' && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onSwitchTeam(playerId, 'blue')}
                  className="w-full text-xs text-team-blue hover:bg-team-blue/10"
                >
                  انضم للأزرق
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Spymaster toggle */}
        <div className="text-center">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onToggleSpymaster(playerId)}
            className="gap-2"
          >
            {game.players.find(p => p.id === playerId)?.isSpymaster ? 'إلغاء دور الرئيس' : 'أكون رئيس الفريق'}
          </Button>
        </div>

        {/* Start button (host only) */}
        {isHost && (
          <Button 
            onClick={onStart} 
            className="w-full h-14 text-lg font-semibold"
            disabled={!canStart}
          >
            ابدأ اللعبة
          </Button>
        )}
      </div>
    </div>
  );
};

export default Lobby;
