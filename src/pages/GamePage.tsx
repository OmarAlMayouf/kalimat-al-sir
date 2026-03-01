import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameState, revealCard, Team, createGame, toggleHighlight } from '@/lib/gameState';
import GameBoard from '@/components/game/GameBoard';
import Lobby from '@/components/game/Lobby';
import GameHeader from '@/components/game/GameHeader';
import GameOverDialog from '@/components/game/GameOverDialog';
import TeamSidebar from '@/components/game/TeamSidebar';
import HintInput from '@/components/game/HintInput';
import TurnTransition from '@/components/game/TurnTransition';
import patternBg from '@/assets/pattern-bg.png';
import { listenToGame, updateGameSession } from "@/lib/gameService";

const GamePage = () => {
    const { roomCode } = useParams<{ roomCode: string }>();
    const navigate = useNavigate();
    const [game, setGame] = useState<GameState | null>(null);
    const [showTransition, setShowTransition] = useState(false);
    const [transitionTeam, setTransitionTeam] = useState<Team>('red');
    const playerId = sessionStorage.getItem('playerId') || '';

    useEffect(() => {
        if (!roomCode) return;
        const unsubscribe = listenToGame(roomCode, (data) => setGame(data));
        return () => unsubscribe();
    }, [roomCode]);

    const saveGame = useCallback(async (newState: GameState) => {
        setGame(newState);
        await updateGameSession(newState.roomCode, newState);
    }, []);

    const handleStartGame = () => {
        if (!game) return;
        const newState = { ...game, phase: 'playing' as const, turnPhase: 'hint' as const };
        saveGame(newState);
        setTransitionTeam('red');
        setShowTransition(true);
    };

    const handleSubmitHint = (word: string, count: number) => {
        if (!game) return;
        saveGame({
            ...game,
            turnPhase: 'guessing',
            currentHint: { word, count },
            guessesRemaining: count + 1,
            timer: game.maxTime,
        });
    };

    const handleCardClick = (index: number) => {
        if (!game || game.phase !== 'playing' || game.turnPhase !== 'guessing') return;
        const currentPlayer = game.players.find(p => p.id === playerId);
        if (!currentPlayer) return;
        if (currentPlayer.team !== game.currentTeam) return;
        if (currentPlayer.isSpymaster) return;

        const prevTeam = game.currentTeam;
        const newState = revealCard(game, index);
        saveGame(newState);

        if (newState.phase === 'playing' && newState.currentTeam !== prevTeam) {
            setTransitionTeam(newState.currentTeam);
            setShowTransition(true);
        }
    };

    const handleRightClick = (index: number) => {
        if (!game) return;

        const player = game.players.find(p => p.id === playerId);

        if (!player) return;

        const canHighlight =
            game.turnPhase === 'guessing' &&
            player.team === game.currentTeam &&
            !player.isSpymaster;

        if (!canHighlight) return;

        saveGame(toggleHighlight(game, index));
    };

    const handleEndTurn = () => {
        if (!game) return;
        const nextTeam = game.currentTeam === 'red' ? 'blue' : 'red';
        saveGame({
            ...game,
            currentTeam: nextTeam,
            timer: game.maxTime,
            turnPhase: 'hint',
            currentHint: null,
            guessesRemaining: 0,
        });
        setTransitionTeam(nextTeam);
        setShowTransition(true);
    };

    const handleRestart = () => {
        const player = game.players.find(p => p.id === playerId);
        if (!game || !player) return;
        const newGame = createGame(player.name);
        newGame.roomCode = game.roomCode;
        newGame.players = game.players;
        newGame.hostId = game.hostId;
        saveGame(newGame);
    };

    const handleSwitchTeam = (pId: string, team: Team) => {
        if (!game) return;
        const players = game.players.map(p => p.id === pId ? { ...p, team } : p);
        saveGame({ ...game, players });
    };

    const handleToggleSpymaster = (pId: string) => {
        if (!game) return;
        const player = game.players.find(p => p.id === pId);
        if (!player) return;
        const players = game.players.map(p => {
            if (p.id === pId) return { ...p, isSpymaster: !p.isSpymaster };
            if (p.team === player.team && p.isSpymaster) return { ...p, isSpymaster: false };
            return p;
        });
        saveGame({ ...game, players });
    };

    const currentPlayer = game?.players.find(p => p.id === playerId);
    const isHost = currentPlayer?.isHost;

    useEffect(() => {
        if (!game || !isHost) return;
        if (game.phase !== 'playing' || game.turnPhase !== 'guessing') return;

        const interval = setInterval(async () => {
            if (game.timer <= 0) {
                const nextTeam = game.currentTeam === 'red' ? 'blue' : 'red';
                await updateGameSession(game.roomCode, {
                    currentTeam: nextTeam,
                    timer: game.maxTime,
                    turnPhase: 'hint',
                    currentHint: null,
                    guessesRemaining: 0,
                });
            } else {
                await updateGameSession(game.roomCode, { timer: game.timer - 1 });
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [game, isHost]);

    if (!game) return null;

    const isSpymaster = currentPlayer?.isSpymaster || false;
    const isMyTeamTurn = currentPlayer?.team === game.currentTeam;
    const isCurrentTeamSpymaster = isSpymaster && isMyTeamTurn;
    const canGuess = game.turnPhase === 'guessing';

    return (
        <div className="min-h-screen flex flex-col relative bg-background">
            {/* Pattern overlay */}
            <div
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ backgroundImage: `url(${patternBg})`, backgroundSize: '300px' }}
            />

            <div className="relative z-10 flex flex-col min-h-screen">
                {game.phase === 'lobby' && (
                    <Lobby
                        game={game}
                        playerId={playerId}
                        onStart={handleStartGame}
                        onSwitchTeam={handleSwitchTeam}
                        onToggleSpymaster={handleToggleSpymaster}
                    />
                )}

                {game.phase === 'playing' && (
                    <>
                        <GameHeader game={game} onEndTurn={handleEndTurn} />

                        <div className="flex-1 flex overflow-hidden">
                            {/* Desktop sidebar */}
                            <div className="hidden md:flex flex-col w-48 p-3 gap-3 shrink-0">
                                <TeamSidebar game={game} team="red" />
                                <TeamSidebar game={game} team="blue" />
                            </div>

                            {/* Main content */}
                            <div className="flex-1 flex flex-col min-w-0">

                                {/* Status banner */}
                                {!isCurrentTeamSpymaster && currentPlayer && !isMyTeamTurn && (
                                    <div className="px-3 pt-3">
                                        <div className="bg-secondary/50 border border-border/40 rounded-xl py-2.5 px-4 text-center">
                      <span className="text-muted-foreground text-sm font-medium">
                        ⏳ بانتظار دور الفريق الآخر
                      </span>
                                        </div>
                                    </div>
                                )}

                                {/* Hint input (spymaster) */}
                                {game.turnPhase === 'hint' && isCurrentTeamSpymaster && (
                                    <div className="p-3">
                                        <HintInput currentTeam={game.currentTeam} onSubmitHint={handleSubmitHint} />
                                    </div>
                                )}

                                {/* Waiting for hint (non-spymaster, own team's turn) */}
                                {game.turnPhase === 'hint' && !isCurrentTeamSpymaster && isMyTeamTurn && (
                                    <div className="px-3 pt-3">
                                        <div className={`border rounded-xl py-2.5 px-4 text-center animate-pulse ${
                                            game.currentTeam === 'red'
                                                ? 'bg-team-red/5 border-team-red/20'
                                                : 'bg-team-blue/5 border-team-blue/20'
                                        }`}>
                      <span className="text-sm text-muted-foreground">بانتظار التلميح من رئيس الفريق...
                      </span>
                                        </div>
                                    </div>
                                )}

                                {/* Current hint display during guessing */}
                                {game.turnPhase === 'guessing' && game.currentHint && (
                                    <div className="px-3 pt-3">
                                        <div className={`border rounded-xl py-2.5 px-5 text-center ${
                                            game.currentTeam === 'red'
                                                ? 'bg-team-red/5 border-team-red/20'
                                                : 'bg-team-blue/5 border-team-blue/20'
                                        }`}>
                                            <div className="flex items-center justify-center gap-3">
                                                <span className="font-bold text-base text-foreground">{game.currentHint.word}</span>
                                                <span className="text-sm text-muted-foreground">({game.currentHint.count})</span>
                                                <span className="text-sm font-semibold text-gold">· {game.guessesRemaining > 0 ? game.guessesRemaining : 0} متبقي</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <GameBoard
                                    cards={game.cards}
                                    isSpymaster={isSpymaster}
                                    onCardClick={handleCardClick}
                                    currentPlayer={currentPlayer}
                                    onRightClick={handleRightClick}
                                    currentTeam={game.currentTeam}
                                    canGuess={canGuess}
                                />
                            </div>
                        </div>

                        {/* Mobile team scores */}
                        <div className="md:hidden flex gap-2 px-3 pb-3">
                            <div className="flex-1"><TeamSidebar game={game} team="red" /></div>
                            <div className="flex-1"><TeamSidebar game={game} team="blue" /></div>
                        </div>
                    </>
                )}

                {game.phase === 'finished' && (
                    <GameOverDialog
                        winner={game.winner}
                        scores={game.scores}
                        onRestart={handleRestart}
                        onHome={() => navigate('/')}
                    />
                )}
            </div>

            {showTransition && (
                <TurnTransition team={transitionTeam} onComplete={() => setShowTransition(false)} />
            )}
        </div>
    );
};

export default GamePage;
