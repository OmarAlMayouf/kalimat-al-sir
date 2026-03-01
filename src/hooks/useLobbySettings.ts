import { useCallback, useMemo } from "react";
import {
  GameState,
  LobbySettings,
  TimeDuration,
  DEFAULT_LOBBY_SETTINGS,
} from "@/lib/gameState";

export interface UseLobbySettingsReturn {
  settings: LobbySettings;
  toggleTimeLimit: () => void;
  toggleSpymasterTimer: () => void;
  toggleNormalTimer: () => void;
  setSpymasterDuration: (duration: TimeDuration) => void;
  setNormalDuration: (duration: TimeDuration) => void;
}

export function useLobbySettings(
  game: GameState,
  isHost: boolean,
  onSave: (settings: LobbySettings) => void,
): UseLobbySettingsReturn {
  const settings: LobbySettings = useMemo(
    () => game.lobbySettings ?? { ...DEFAULT_LOBBY_SETTINGS },
    [game.lobbySettings],
  );

  const save = useCallback(
    (patch: Partial<LobbySettings>) => {
      if (!isHost) return;
      onSave({ ...settings, ...patch });
    },
    [isHost, onSave, settings],
  );

  const toggleTimeLimit = useCallback(() => {
    if (!isHost) return;
    save({ timeLimitEnabled: !settings.timeLimitEnabled });
  }, [isHost, save, settings.timeLimitEnabled]);

  const toggleSpymasterTimer = useCallback(() => {
    if (!isHost) return;
    const nextSpymaster = !settings.spymasterTimerEnabled;
    const nextNormal = settings.normalTimerEnabled;
    const nextParent =
      nextSpymaster || nextNormal ? settings.timeLimitEnabled : false;
    save({
      spymasterTimerEnabled: nextSpymaster,
      timeLimitEnabled: nextParent,
    });
  }, [isHost, save, settings]);

  const toggleNormalTimer = useCallback(() => {
    if (!isHost) return;
    const nextNormal = !settings.normalTimerEnabled;
    const nextSpymaster = settings.spymasterTimerEnabled;
    const nextParent =
      nextNormal || nextSpymaster ? settings.timeLimitEnabled : false;
    save({ normalTimerEnabled: nextNormal, timeLimitEnabled: nextParent });
  }, [isHost, save, settings]);

  const setSpymasterDuration = useCallback(
    (duration: TimeDuration) => {
      if (!isHost) return;
      save({ spymasterDuration: duration });
    },
    [isHost, save],
  );

  const setNormalDuration = useCallback(
    (duration: TimeDuration) => {
      if (!isHost) return;
      save({ normalDuration: duration });
    },
    [isHost, save],
  );

  return {
    settings,
    toggleTimeLimit,
    toggleSpymasterTimer,
    toggleNormalTimer,
    setSpymasterDuration,
    setNormalDuration,
  };
}
