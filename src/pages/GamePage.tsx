import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameState, revealCard, Team, createGame } from '@/lib/gameState';
import GameBoard from '@/components/game/GameBoard';
import Lobby from '@/components/game/Lobby';
import GameHeader from '@/components/game/GameHeader';
import GameOverDialog from '@/components/game/GameOverDialog';
import patternBg from '@/assets/pattern-bg.png';

const GamePage = () => {
  const { roomCode } = useParams<{ roomCode: string }>();
  const navigate = useNavigate();
  const [game, setGame] = useState<GameState | null>(null);
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
    saveGame({ ...game, phase: 'playing' });
  };

  const handleCardClick = (index: number) => {
    if (!game || game.phase !== 'playing') return;
    const newState = revealCard(game, index);
    saveGame(newState);
  };

  const handleEndTurn = () => {
    if (!game) return;
    saveGame({
      ...game,
      currentTeam: game.currentTeam === 'red' ? 'blue' : 'red',
      timer: game.maxTime,
    });
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
      // Only one spymaster per team
      if (p.team === player.team && p.isSpymaster) return { ...p, isSpymaster: false };
      return p;
    });
    saveGame({ ...game, players });
  };

  // Timer
  useEffect(() => {
    if (!game || game.phase !== 'playing') return;
    const interval = setInterval(() => {
      setGame(prev => {
        if (!prev || prev.timer <= 0) {
          // Auto end turn
          const newState = {
            ...prev!,
            currentTeam: (prev!.currentTeam === 'red' ? 'blue' : 'red') as Team,
            timer: prev!.maxTime,
          };
          sessionStorage.setItem(`game_${newState.roomCode}`, JSON.stringify(newState));
          return newState;
        }
        const newState = { ...prev, timer: prev.timer - 1 };
        sessionStorage.setItem(`game_${newState.roomCode}`, JSON.stringify(newState));
        return newState;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [game?.phase, game?.currentTeam]);

  if (!game) return null;

  const currentPlayer = game.players.find(p => p.id === playerId);
  const isSpymaster = currentPlayer?.isSpymaster || false;

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
            <GameBoard
              cards={game.cards}
              isSpymaster={isSpymaster}
              onCardClick={handleCardClick}
              currentTeam={game.currentTeam}
            />
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
    </div>
  );
};

export default GamePage;
