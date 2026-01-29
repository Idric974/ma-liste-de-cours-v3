import MyListe from "./MyListe";
import React, { useEffect, useState } from "react";

//* Définition de l'interface en dehors du composant
interface Liste {
  id: number;
  title: string;
  content: string;
  articles: string;
  createdAt: string;
  updatedAt: string;
}

export default function ThreadListe() {
  const [items, setItems] = useState<Liste[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/listes");
        if (!response.ok) {
          throw new Error(`Erreur API: ${response.statusText}`);
        }
        const myListes: Liste[] = await response.json();
        setItems(myListes);
      } catch (err) {
        console.error("Erreur lors de la récupération des listes:", err);
        setError("Impossible de charger les listes.");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="pt-[14%] h-full overflow-y-auto">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div>
          {items.length > 0 ? (
            items.map((item) => <MyListe item={item} key={item.id} />)
          ) : (
            <p>Chargement de la liste de courses...</p>
          )}
        </div>
      )}
    </div>
  );
}
