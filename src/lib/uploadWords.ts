import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import { wordDatabase } from "@/data/words.ts"; // your existing array file

export async function uploadWords() {
  try {
    console.log("Uploading words...");

    for (const word of wordDatabase) {
      await addDoc(collection(db, "words"), {
        ...word,
        isActive: true, // optional but recommended
        createdAt: new Date(),
      });
    }

    console.log("Upload complete ✅");
  } catch (error) {
    console.error("Error uploading words:", error);
  }
}
