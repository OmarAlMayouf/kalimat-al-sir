import { doc, setDoc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";
import { GameState } from "./gameState";

export async function createGameSession(game: GameState) {
  const ref = doc(db, "games", game.roomCode);
  await setDoc(ref, {
    ...game,
    createdAt: new Date(),
  });
}

export async function joinGameSession(roomCode: string) {
  const ref = doc(db, "games", roomCode);
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data();
}

export async function updateGameSession(roomCode: string, data: any) {
  const ref = doc(db, "games", roomCode);
  await updateDoc(ref, data);
}

export function listenToGame(roomCode: string, callback: (data: any) => void) {
  const ref = doc(db, "games", roomCode);
  return onSnapshot(ref, (snap) => {
    if (snap.exists()) {
      callback(snap.data());
    }
  });
}
