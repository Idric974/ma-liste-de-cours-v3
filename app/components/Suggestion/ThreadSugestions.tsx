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
  const [existingArticles, setExistingArticles] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les suggestions
        const suggestResponse = await fetch("/api/suggestes");
        if (!suggestResponse.ok) {
          throw new Error(`Erreur API: ${suggestResponse.statusText}`);
        }
        const mySuggests: Suggest[] = await suggestResponse.json();
        setItems(mySuggests);

        // Récupérer la liste des courses existantes
        const listesResponse = await fetch("/api/listes");
        if (listesResponse.ok) {
          const listes = await listesResponse.json();
          const articlesSet = new Set<string>(
            listes.map((item: { articles: string }) => item.articles)
          );
          setExistingArticles(articlesSet);
        }
      } catch (err) {
        console.error("Erreur lors de la récupération des données:", err);
        setError("Impossible de charger les suggestions.");
      }
    };

    fetchData();
  }, []);

  const handleItemAdded = (articleName: string) => {
    setExistingArticles((prev) => new Set(prev).add(articleName));
  };

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
      <p>Mes suggestions </p>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          {items.length > 0 ? (
            items.map((item) => (
              <MySuggestions
                item={item}
                key={item.id}
                isInList={existingArticles.has(item.newSuggestions)}
                onItemAdded={handleItemAdded}
              />
            ))
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
