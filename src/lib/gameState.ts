import { getRandomWords, Word } from '@/data/words';

export type Team = 'red' | 'blue';
export type CardType = 'red' | 'blue' | 'neutral' | 'assassin';
export type GamePhase = 'lobby' | 'playing' | 'finished';
export type TurnPhase = 'hint' | 'guessing';

export interface GameCard {
  word: Word;
  type: CardType;
  revealed: boolean;
  highlighted: boolean; // right-click temporary highlight
}

export interface Hint {
  word: string;
  count: number;
}

export interface GameState {
  roomCode: string;
  phase: GamePhase;
  turnPhase: TurnPhase;
  cards: GameCard[];
  currentTeam: Team;
  scores: { red: number; blue: number };
  targetScores: { red: number; blue: number };
  timer: number;
  maxTime: number;
  players: Player[];
  winner: Team | null;
  hostId: string;
  currentHint: Hint | null;
  guessesRemaining: number;
}

export interface Player {
  id: string;
  name: string;
  team: Team;
  isSpymaster: boolean;
  isHost: boolean;
}

function generateRoomCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 5; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function assignCardTypes(): CardType[] {
  const types: CardType[] = [];
  // 8 red, 8 blue, 8 neutral, 1 assassin = 25
  for (let i = 0; i < 8; i++) types.push('red');
  for (let i = 0; i < 8; i++) types.push('blue');
  for (let i = 0; i < 8; i++) types.push('neutral');
  types.push('assassin');
  return types.sort(() => Math.random() - 0.5);
}

export function createGame(hostName: string): GameState {
  const words = getRandomWords(25);
  const types = assignCardTypes();
  const cards: GameCard[] = words.map((word, i) => ({
    word,
    type: types[i],
    revealed: false,
    highlighted: false,
  }));

  const hostId = crypto.randomUUID();

  return {
    roomCode: generateRoomCode(),
    phase: 'lobby',
    turnPhase: 'hint',
    cards,
    currentTeam: 'red',
    scores: { red: 0, blue: 0 },
    targetScores: { red: 8, blue: 8 },
    timer: 90,
    maxTime: 90,
    players: [{
      id: hostId,
      name: hostName,
      team: 'red',
      isSpymaster: false,
      isHost: true,
    }],
    winner: null,
    hostId,
    currentHint: null,
    guessesRemaining: 0,
  };
}

export function revealCard(state: GameState, cardIndex: number): GameState {
  const newState = { ...state };
  const card = { ...newState.cards[cardIndex] };
  
  if (card.revealed) return state;
  
  card.revealed = true;
  newState.cards = [...state.cards];
  newState.cards[cardIndex] = card;

  // Assassin = instant loss
  if (card.type === 'assassin') {
    newState.phase = 'finished';
    newState.winner = state.currentTeam === 'red' ? 'blue' : 'red';
    return newState;
  }

  // Score the card
  if (card.type === 'red') {
    newState.scores = { ...state.scores, red: state.scores.red + 1 };
  } else if (card.type === 'blue') {
    newState.scores = { ...state.scores, blue: state.scores.blue + 1 };
  }

  // Check win conditions
  if (newState.scores.red >= newState.targetScores.red) {
    newState.phase = 'finished';
    newState.winner = 'red';
    return newState;
  } else if (newState.scores.blue >= newState.targetScores.blue) {
    newState.phase = 'finished';
    newState.winner = 'blue';
    return newState;
  }

  // Neutral or wrong team → end turn immediately
  if (card.type !== state.currentTeam) {
    newState.currentTeam = state.currentTeam === 'red' ? 'blue' : 'red';
    newState.timer = newState.maxTime;
    newState.turnPhase = 'hint';
    newState.currentHint = null;
    newState.guessesRemaining = 0;
    return newState;
  }

  // Correct team card → decrement guesses
  newState.guessesRemaining = Math.max(0, state.guessesRemaining - 1);
  if (newState.guessesRemaining === 0) {
    newState.currentTeam = state.currentTeam === 'red' ? 'blue' : 'red';
    newState.timer = newState.maxTime;
    newState.turnPhase = 'hint';
    newState.currentHint = null;
  }

  return newState;
}

export function toggleHighlight(state: GameState, cardIndex: number): GameState {
  const newState = { ...state };
  newState.cards = [...state.cards];
  newState.cards[cardIndex] = {
    ...state.cards[cardIndex],
    highlighted: !state.cards[cardIndex].highlighted,
  };
  return newState;
}
