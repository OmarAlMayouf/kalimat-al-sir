import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { createGame } from '@/lib/gameState';
import patternBg from '@/assets/pattern-bg.png';
import { createGameSession, joinGameSession, updateGameSession } from "@/lib/gameService";
import { Users, Plus, LogIn, ArrowRight } from 'lucide-react';

const Index = () => {
    const navigate = useNavigate();
    const [playerName, setPlayerName] = useState('');
    const [joinCode, setJoinCode] = useState('');
    const [mode, setMode] = useState<'home' | 'create' | 'join'>('home');
    const [isLoadingCreate, setIsLoadingCreate] = useState(false);
    const [isLoadingJoin, setIsLoadingJoin] = useState(false);

    const handleCreate = async () => {
        if (!playerName.trim()) return;
        setIsLoadingCreate(true);
        try {
            const game = createGame(playerName.trim());
            await createGameSession(game);
            sessionStorage.setItem("playerId", game.hostId);
            navigate(`/game/${game.roomCode}`);
        } finally {
            setIsLoadingCreate(false);
        }
    };

    const handleJoin = async () => {
        if (!playerName.trim() || !joinCode.trim()) return;
        setIsLoadingJoin(true);
        try {
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
            await updateGameSession(code, { players: game.players });
            sessionStorage.setItem("playerId", playerId);
            navigate(`/game/${code}`);
        } finally {
            setIsLoadingJoin(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
            {/* Pattern bg */}
            <div
                className="absolute inset-0 opacity-[0.06] pointer-events-none"
                style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '300px' }}
            />

            {/* Ambient blobs */}
            <div className="absolute top-[-15%] right-[-10%] w-80 h-80 rounded-full bg-team-red/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-15%] left-[-10%] w-80 h-80 rounded-full bg-team-blue/10 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="relative z-10 w-full max-w-sm mx-auto animate-fade-in">

                {/* Logo & title */}
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary shadow-[0_8px_32px_hsl(var(--primary)/0.35)] mb-5">
                        <span className="text-3xl font-bold text-primary-foreground">ك</span>
                    </div>
                    <h1 className="text-4xl font-bold text-foreground mb-2 tracking-tight">كلمة السر</h1>
                    <p className="text-muted-foreground text-base">لعبة الكلمات الجماعية</p>
                </div>

                {/* Home mode */}
                {mode === 'home' && (
                    <div className="space-y-3 animate-fade-in">
                        <button
                            onClick={() => setMode('create')}
                            className="w-full h-14 rounded-2xl bg-primary text-primary-foreground font-bold text-base flex items-center justify-center gap-2.5 shadow-[0_4px_24px_hsl(var(--primary)/0.35)] hover:shadow-[0_6px_32px_hsl(var(--primary)/0.45)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-200"
                        >
                            <Plus className="w-5 h-5" />
                            إنشاء غرفة جديدة
                        </button>
                        <button
                            onClick={() => setMode('join')}
                            className="w-full h-14 rounded-2xl bg-card border border-border/60 text-foreground font-bold text-base flex items-center justify-center gap-2.5 hover:border-primary/40 hover:bg-secondary/60 transition-all duration-200"
                        >
                            <LogIn className="w-5 h-5" />
                            انضم لغرفة
                        </button>

                        {/* Decorative player count hint */}
                        <div className="flex items-center justify-center gap-1.5 pt-3 text-xs text-muted-foreground">
                            <Users className="w-3.5 h-3.5" />
                            <span>٤ لاعبين أو أكثر للعب</span>
                        </div>
                    </div>
                )}

                {/* Create mode */}
                {mode === 'create' && (
                    <div className="space-y-3 animate-fade-in">
                        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-4">
                            <h2 className="text-lg font-bold text-center">إنشاء غرفة</h2>
                            <div>
                                <label className="text-xs text-muted-foreground mb-1.5 block font-medium">اسمك</label>
                                <Input
                                    placeholder="أدخل اسمك..."
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                                    className="h-12 text-center text-base"
                                    dir="rtl"
                                    autoFocus
                                />
                            </div>
                            <button
                                onClick={handleCreate}
                                disabled={!playerName.trim() || isLoadingCreate}
                                className={`w-full h-12 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200
                  ${playerName.trim() && !isLoadingCreate
                                    ? 'bg-primary text-primary-foreground shadow-[0_4px_20px_hsl(var(--primary)/0.3)] hover:scale-[1.01] active:scale-[0.99]'
                                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                                }`}
                            >
                                {isLoadingCreate ? (
                                    <span className="animate-pulse">جارٍ الإنشاء...</span>
                                ) : (
                                    <>ابدأ اللعبة <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                        <button
                            onClick={() => setMode('home')}
                            className="w-full py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            رجوع
                        </button>
                    </div>
                )}

                {/* Join mode */}
                {mode === 'join' && (
                    <div className="space-y-3 animate-fade-in">
                        <div className="bg-card border border-border/60 rounded-2xl p-5 shadow-sm space-y-4">
                            <h2 className="text-lg font-bold text-center">انضم لغرفة</h2>
                            <div>
                                <label className="text-xs text-muted-foreground mb-1.5 block font-medium">اسمك</label>
                                <Input
                                    placeholder="أدخل اسمك..."
                                    value={playerName}
                                    onChange={(e) => setPlayerName(e.target.value)}
                                    className="h-12 text-center text-base"
                                    dir="rtl"
                                    autoFocus
                                />
                            </div>
                            <div>
                                <label className="text-xs text-muted-foreground mb-1.5 block font-medium">كود الغرفة</label>
                                <Input
                                    placeholder="X X X X X"
                                    value={joinCode}
                                    onChange={(e) => setJoinCode(e.target.value.toUpperCase())}
                                    onKeyDown={(e) => e.key === 'Enter' && handleJoin()}
                                    className="h-12 text-center text-xl tracking-[0.4em] font-mono font-bold"
                                    maxLength={6}
                                    dir="ltr"
                                />
                            </div>
                            <button
                                onClick={handleJoin}
                                disabled={!playerName.trim() || joinCode.length < 5 || isLoadingJoin}
                                className={`w-full h-12 rounded-xl font-bold text-base flex items-center justify-center gap-2 transition-all duration-200
                  ${playerName.trim() && joinCode.length >= 5 && !isLoadingJoin
                                    ? 'bg-primary text-primary-foreground shadow-[0_4px_20px_hsl(var(--primary)/0.3)] hover:scale-[1.01] active:scale-[0.99]'
                                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                                }`}
                            >
                                {isLoadingJoin ? (
                                    <span className="animate-pulse">جارٍ الانضمام...</span>
                                ) : (
                                    <>انضم <ArrowRight className="w-4 h-4" /></>
                                )}
                            </button>
                        </div>
                        <button
                            onClick={() => setMode('home')}
                            className="w-full py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                        >
                            رجوع
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Index;