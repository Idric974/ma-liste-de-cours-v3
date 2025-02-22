import React, { useEffect, useState } from "react";
import MySuggestions from "./MySuggestions";
import { SquarePlus } from "lucide-react";

//* Définition de l'interface en dehors du composant
interface Suggest {
  id: number;
  title: string;
  content: string;
  newSuggestions: string;
  createdAt: string;
  updatedAt: string;
}

export default function ThreadSugestions() {
  // Utilisation de useState pour stocker les suggestions
  const [items, setItems] = useState<Suggest[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/suggestes");
        if (!response.ok) {
          throw new Error(`Erreur API: ${response.statusText}`);
        }
        const mySuggests: Suggest[] = await response.json();
        setItems(mySuggests);
        console.log("mySuggests : ", mySuggests);
      } catch (err) {
        console.error("Erreur lors de la récupération des suggestions:", err);
        setError("Impossible de charger les suggestions.");
      }
    };

    fetchData();
  }, []);

  const addOneSuggest = () => {
    console.log("clickOnIcon");
  };

  return (
    <div className="pt-[14%] h-full overflow-y-auto">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          {items.length > 0 ? (
            items.map((item) => <MySuggestions item={item} key={item.id} />)
          ) : (
            <p>Chargement des suggestions...</p>
          )}
        </div>
      )}

      <div
        className="z-50 p-1 bg-orange-500 rounded-lg fixed bottom-1 right-1"
        onClick={addOneSuggest}
      >
        <SquarePlus className="w-12 h-12" />
      </div>
    </div>
  );
}
