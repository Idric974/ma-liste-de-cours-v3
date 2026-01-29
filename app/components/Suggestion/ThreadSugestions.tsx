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
      } catch (err) {
        console.error("Erreur lors de la récupération des suggestions:", err);
        setError("Impossible de charger les suggestions.");
      }
    };

    fetchData();
  }, []);

  const addOneSuggest = async () => {
    const suggestionName = prompt("Entrez le nom de la suggestion:");
    if (!suggestionName) return;

    try {
      const response = await fetch("/api/suggestes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: suggestionName }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de la suggestion");
      }
      window.location.reload();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible d'ajouter la suggestion.");
    }
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

      <button
        className="z-50 p-1 bg-orange-500 rounded-lg fixed bottom-1 right-1 hover:bg-orange-600 transition-colors"
        onClick={addOneSuggest}
        aria-label="Ajouter une nouvelle suggestion"
      >
        <SquarePlus className="w-12 h-12" aria-hidden="true" />
      </button>
    </div>
  );
}
