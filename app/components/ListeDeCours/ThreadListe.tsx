import MyListe from "./MyListe";
import React, { useEffect, useState } from "react";

//* Définition de l'interface en dehors du composant
interface Liste {
  id: string;
  title: string;
  content: string;
  articles: string;
  createdAt: string;
  updatedAt: string;
}

export default function ThreadListe() {
  const [items, setItems] = useState<Liste[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/listes");
        if (!response.ok) {
          throw new Error(`Erreur API: ${response.statusText}`);
        }
        const myListes: Liste[] = await response.json();
        setItems(myListes);
      } catch (err) {
        console.error("Erreur lors de la récupération des listes:", err);
        setError("Impossible de charger les listes.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/listes?id=${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de la suppression: ${response.statusText}`);
      }

      // Mettre à jour l'état local pour retirer l'item supprimé
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression de l'item:", err);
      setError("Impossible de supprimer l'item. Veuillez réessayer.");
    }
  };

  return (
    <div className="pt-[14%] h-full overflow-y-auto">
      <p>Ma liste de courses</p>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : isLoading ? (
        <p>Chargement de la liste de courses...</p>
      ) : items.length > 0 ? (
        <div>
          {items.map((item) => (
            <MyListe item={item} key={item.id} onDelete={handleDelete} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-4">
          <p>La liste de courses est vide</p>
        </div>
      )}
    </div>
  );
}
