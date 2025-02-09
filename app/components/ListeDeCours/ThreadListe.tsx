import React, { useEffect, useState } from "react";
import MyListe from "./MyListe"; // Assurez-vous que ce composant est bien défini

// Définition de l'interface en dehors du composant
interface Suggest {
  id: number;
  title: string;
  content: string;
  newSuggestions: any; // Remplace `any` par le bon type si connu
  createdAt?: string;
  updatedAt?: string;
}

export default function ThreadListe() {
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

  return (
    <div className="pt-[20%] h-full overflow-y-auto">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          {items.length > 0 ? (
            items.map((item) => <MyListe item={item} key={item.id} />)
          ) : (
            <p>Chargement des suggestions...</p>
          )}
        </div>
      )}
    </div>
  );
}
