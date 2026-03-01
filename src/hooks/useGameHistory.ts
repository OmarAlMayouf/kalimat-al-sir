import { GameState, HistoryEntry, CardType, Team } from "@/lib/gameState";

export interface UseGameHistoryReturn {
  history: HistoryEntry[];
  buildHintEntry: (team: Team, word: string, amount: number) => HistoryEntry;
  buildGuessEntry: (
    playerName: string,
    word: string,
    color: CardType,
  ) => HistoryEntry;
}

export function useGameHistory(game: GameState | null): UseGameHistoryReturn {
  // Backward-compat: older sessions may not have history; also guard null before Firebase loads
  const history: HistoryEntry[] = game?.history ?? [];

  const buildHintEntry = (
    team: Team,
    word: string,
    amount: number,
  ): HistoryEntry => ({
    type: "hint",
    team,
    word,
    amount,
    timestamp: Date.now(),
  });

  const buildGuessEntry = (
    playerName: string,
    word: string,
    color: CardType,
  ): HistoryEntry => ({
    type: "guess",
    player: playerName,
    word,
    color,
    timestamp: Date.now(),
  });

  return { history, buildHintEntry, buildGuessEntry };
}
