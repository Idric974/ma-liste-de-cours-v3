import { initializeApp, getApps } from "firebase/app";
import { getFirestore, collection, addDoc, Timestamp } from "firebase/firestore";
import * as fs from "fs";
import * as path from "path";
import * as dotenv from "dotenv";
import { fileURLToPath } from "url";

// Obtenir le chemin du répertoire courant en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, "..", ".env.local") });

// Configuration Firebase
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialiser Firebase
if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const db = getFirestore();

async function importSuggests() {
  try {
    // Lire le fichier JSON
    const dataPath = path.join(__dirname, "..", "Data", "suggests-firebase.json");
    const fileContent = fs.readFileSync(dataPath, "utf-8");
    const data = JSON.parse(fileContent);

    console.log("Début de l'importation des suggestions...");

    const suggestsCollection = collection(db, "suggests");
    let count = 0;
    let errors = 0;

    // Parcourir toutes les suggestions
    for (const key in data.suggests) {
      const suggest = data.suggests[key];

      try {
        // Ajouter la suggestion à Firestore
        await addDoc(suggestsCollection, {
          newSuggestions: suggest.newSuggestions,
          quantity: 1, // Valeur par défaut
          createdAt: Timestamp.fromDate(new Date(suggest.createdAt)),
          updatedAt: Timestamp.fromDate(new Date(suggest.updatedAt)),
        });

        count++;
        console.log(`✓ Ajouté: ${suggest.newSuggestions} (${count})`);
      } catch (error) {
        errors++;
        console.error(`✗ Erreur pour "${suggest.newSuggestions}":`, error);
      }
    }

    console.log("\n=================================");
    console.log(`Importation terminée !`);
    console.log(`Total ajouté: ${count}`);
    console.log(`Erreurs: ${errors}`);
    console.log("=================================");

    process.exit(0);
  } catch (error) {
    console.error("Erreur lors de l'importation:", error);
    process.exit(1);
  }
}

importSuggests();
