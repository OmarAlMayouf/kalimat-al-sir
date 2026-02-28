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

const GamePage = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameState | null>(null);
  const [showTransition, setShowTransition] = useState(false);
  const [transitionTeam, setTransitionTeam] = useState<Team>('red');
  const playerId = sessionStorage.getItem('playerId') || '';

  useEffect(() => {
    if (!roomCode) return;
    const stored = sessionStorage.getItem(`game_${roomCode}`);
    if (stored) {
      setGame(JSON.parse(stored));
    } else {
      navigate('/');
    }
  }, [roomCode, navigate]);

  const saveGame = useCallback((newState: GameState) => {
    setGame(newState);
    sessionStorage.setItem(`game_${newState.roomCode}`, JSON.stringify(newState));
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
      guessesRemaining: count + 1, // +1 bonus guess like real Codenames
      timer: game.maxTime,
    });
  };

  const handleCardClick = (index: number) => {
    if (!game || game.phase !== 'playing' || game.turnPhase !== 'guessing') return;
    const prevTeam = game.currentTeam;
    const newState = revealCard(game, index);
    saveGame(newState);

    // Show transition if turn changed
    if (newState.phase === 'playing' && newState.currentTeam !== prevTeam) {
      setTransitionTeam(newState.currentTeam);
      setShowTransition(true);
    }
  };

  const handleRightClick = (index: number) => {
    if (!game) return;
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
    if (!game) return;
    const player = game.players.find(p => p.id === playerId);
    if (!player) return;
    const newGame = createGame(player.name);
    newGame.roomCode = game.roomCode;
    newGame.players = game.players;
    newGame.hostId = game.hostId;
    saveGame(newGame);
  };

  const handleSwitchTeam = (pId: string, team: Team) => {
    if (!game) return;
    const players = game.players.map(p => 
      p.id === pId ? { ...p, team } : p
    );
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

  // Timer - only runs during guessing phase
  useEffect(() => {
    if (!game || game.phase !== 'playing' || game.turnPhase !== 'guessing') return;
    const interval = setInterval(() => {
      setGame(prev => {
        if (!prev || prev.turnPhase !== 'guessing') return prev;
        if (prev.timer <= 0) {
          const nextTeam = (prev.currentTeam === 'red' ? 'blue' : 'red') as Team;
          const newState: GameState = {
            ...prev,
            currentTeam: nextTeam,
            timer: prev.maxTime,
            turnPhase: 'hint',
            currentHint: null,
            guessesRemaining: 0,
          };
          sessionStorage.setItem(`game_${newState.roomCode}`, JSON.stringify(newState));
          setTransitionTeam(nextTeam);
          setShowTransition(true);
          return newState;
        }
        const newState = { ...prev, timer: prev.timer - 1 };
        sessionStorage.setItem(`game_${newState.roomCode}`, JSON.stringify(newState));
        return newState;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [game?.phase, game?.turnPhase, game?.currentTeam]);

  if (!game) return null;

  const currentPlayer = game.players.find(p => p.id === playerId);
  const isSpymaster = currentPlayer?.isSpymaster || false;
  const isCurrentTeamSpymaster = isSpymaster && currentPlayer?.team === game.currentTeam;
  const canGuess = game.turnPhase === 'guessing';

  return (
    <div className="min-h-screen flex flex-col relative">
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
            <GameHeader 
              game={game} 
              onEndTurn={handleEndTurn}
            />
            
            <div className="flex-1 flex">
              {/* Right sidebar (RTL → appears on right) */}
              <div className="hidden md:block w-48 p-3 space-y-3">
                <TeamSidebar game={game} team="red" />
                <TeamSidebar game={game} team="blue" />
              </div>

              {/* Board */}
              <div className="flex-1 flex flex-col">
                {/* Hint input for spymaster */}
                {game.turnPhase === 'hint' && isCurrentTeamSpymaster && (
                  <div className="p-3">
                    <HintInput 
                      currentTeam={game.currentTeam} 
                      onSubmitHint={handleSubmitHint} 
                    />
                  </div>
                )}

                {/* Waiting for hint message */}
                {game.turnPhase === 'hint' && !isCurrentTeamSpymaster && (
                  <div className="p-4 text-center">
                    <div className="bg-secondary/60 rounded-xl py-4 px-6 inline-block animate-pulse">
                      <span className="text-muted-foreground text-sm">
                        ⏳ بانتظار التلميح من رئيس الفريق...
                      </span>
                    </div>
                  </div>
                )}

                <GameBoard
                  cards={game.cards}
                  isSpymaster={isSpymaster}
                  onCardClick={handleCardClick}
                  onRightClick={handleRightClick}
                  currentTeam={game.currentTeam}
                  canGuess={canGuess}
                />
              </div>
            </div>

            {/* Mobile team scores */}
            <div className="md:hidden flex gap-2 px-3 pb-3">
              <div className="flex-1">
                <TeamSidebar game={game} team="red" />
              </div>
              <div className="flex-1">
                <TeamSidebar game={game} team="blue" />
              </div>
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

      {/* Turn transition overlay */}
      {showTransition && (
        <TurnTransition 
          team={transitionTeam} 
          onComplete={() => setShowTransition(false)} 
        />
      )}
    </div>
  );
};

export default GamePage;
