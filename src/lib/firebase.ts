import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {firebaseConfig} from "@/lib/firebaseConfig.ts";
import { getAuth, signInAnonymously } from "firebase/auth";

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

export function signInAnon() {
    return signInAnonymously(auth);
}
