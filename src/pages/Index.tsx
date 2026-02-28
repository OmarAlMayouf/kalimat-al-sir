import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createGame } from '@/lib/gameState';
import patternBg from '@/assets/pattern-bg.png';
import { createGameSession, joinGameSession, updateGameSession } from "@/lib/gameService";

const Index = () => {
  const navigate = useNavigate();
  const [playerName, setPlayerName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [mode, setMode] = useState<'home' | 'create' | 'join'>('home');

    const handleCreate = async () => {
        if (!playerName.trim()) return;

        const game = createGame(playerName.trim());

        await createGameSession(game);

        sessionStorage.setItem("playerId", game.hostId);

        navigate(`/game/${game.roomCode}`);
    };

    const handleJoin = async () => {
        if (!playerName.trim() || !joinCode.trim()) return;

        const code = joinCode.trim().toUpperCase();
        const game = await joinGameSession(code);

        if (!game) return;

        const playerId = crypto.randomUUID();

        game.players.push({
            id: playerId,
            name: playerName.trim(),
            team: "red",
            isSpymaster: false,
            isHost: false,
        });

        await updateGameSession(code, {
            players: game.players
        });

        sessionStorage.setItem("playerId", playerId);

        navigate(`/game/${code}`);
    };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '300px' }}
      />
      
      <div className="relative z-10 w-full max-w-md mx-auto animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary mb-4">
            <span className="text-3xl font-bold text-primary-foreground">ك</span>
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">كلمة السر</h1>
          <p className="text-muted-foreground text-lg">لعبة الكلمات الجماعية</p>
        </div>

        {mode === 'home' && (
          <div className="space-y-4 animate-fade-in">
            <Button 
              onClick={() => setMode('create')} 
              className="w-full h-14 text-lg font-semibold bg-primary hover:bg-primary/90"
            >
              إنشاء غرفة جديدة
            </Button>
            <Button 
              onClick={() => setMode('join')}
              variant="outline"
              className="w-full h-14 text-lg font-semibold border-2"
            >
              انضم لغرفة
            </Button>
          </div>
        )}

        {mode === 'create' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-card rounded-xl p-6 border space-y-4">
              <h2 className="text-xl font-semibold text-center">إنشاء غرفة</h2>
              <Input
                placeholder="اسمك"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="h-12 text-center text-lg"
                dir="rtl"
              />
              <Button 
                onClick={handleCreate} 
                className="w-full h-12 text-lg font-semibold"
                disabled={!playerName.trim()}
              >
                ابدأ اللعبة
              </Button>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setMode('home')}
              className="w-full text-muted-foreground"
            >
              رجوع
            </Button>
          </div>
        )}

        {mode === 'join' && (
          <div className="space-y-4 animate-fade-in">
            <div className="bg-card rounded-xl p-6 border space-y-4">
              <h2 className="text-xl font-semibold text-center">انضم لغرفة</h2>
              <Input
                placeholder="اسمك"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="h-12 text-center text-lg"
                dir="rtl"
              />
              <Input
                placeholder="كود الغرفة"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                className="h-12 text-center text-lg tracking-[0.3em] font-mono"
                maxLength={5}
                dir="ltr"
              />
              <Button 
                onClick={handleJoin} 
                className="w-full h-12 text-lg font-semibold"
                disabled={!playerName.trim() || joinCode.length < 5}
              >
                انضم
              </Button>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => setMode('home')}
              className="w-full text-muted-foreground"
            >
              رجوع
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
