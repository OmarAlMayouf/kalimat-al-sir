// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
    apiKey: "AIzaSyDT3dBdcw9FERAJBASNDvSiH5DGH-carL0",
    authDomain: "saudia-connect-play.firebaseapp.com",
    projectId: "saudia-connect-play",
    storageBucket: "saudia-connect-play.firebasestorage.app",
    messagingSenderId: "872875755443",
    appId: "1:872875755443:web:4186cbbe1b677ce91eedc6",
    measurementId: "G-897NVF66RD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Call this once at app startup to ensure anonymous auth
export function signInAnon() {
  return signInAnonymously(auth);
}

