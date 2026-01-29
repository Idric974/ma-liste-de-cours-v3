import React from "react";
import { Trash2, Pen } from "lucide-react";

type ItemType = {
  id: number;
  newSuggestions: string;
  createdAt: string;
  updatedAt: string;
};

interface MyListeProps {
  item: ItemType;
}

export default function MySuggestions({ item }: MyListeProps) {
  const addItemToList = async () => {
    try {
      const response = await fetch("/api/listes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: item.newSuggestions }),
      });
      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout à la liste");
      }
      alert("Article ajouté à la liste!");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible d'ajouter l'article.");
    }
  };

  const editSuggestion = () => {
    // TODO: Implémenter la modification
    alert("Fonctionnalité d'édition à implémenter");
  };

  const deleteSuggestion = async () => {
    if (!confirm("Voulez-vous vraiment supprimer cette suggestion?")) {
      return;
    }
    try {
      const response = await fetch(`/api/suggestes?id=${item.id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression");
      }
      window.location.reload();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de supprimer la suggestion.");
    }
  };

  return (
    <div className="p-1 my-1 text-lg text-slate-950 text flex flex-row justify-between shadow-md rounded-sm bg-slate-100">
      <button
        className="w-4/5 rounded-lg p-1 font-bold text-left"
        onClick={addItemToList}
        aria-label={`Ajouter ${item.newSuggestions} à la liste`}
      >
        {item.newSuggestions}
      </button>
      <div className="flex flex-row w-1/5 justify-between items-center">
        <button
          onClick={editSuggestion}
          aria-label={`Éditer ${item.newSuggestions}`}
        >
          <Pen className="m-1" aria-hidden="true" />
        </button>
        <button
          onClick={deleteSuggestion}
          aria-label={`Supprimer ${item.newSuggestions}`}
        >
          <Trash2 className="m-1" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
