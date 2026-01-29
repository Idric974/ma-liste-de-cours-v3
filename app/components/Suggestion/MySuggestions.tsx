import React, { useState } from "react";
import { Pen, Trash2 } from "lucide-react";

type ItemType = {
  id: number;
  newSuggestions: string;
  createdAt: string;
  updatedAt: string;
};

interface MyListeProps {
  item: ItemType;
  isInList: boolean;
  onItemAdded: (articleName: string) => void;
}

export default function MySuggestions({
  item,
  isInList,
  onItemAdded,
}: MyListeProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedName, setEditedName] = useState(item.newSuggestions);
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
      onItemAdded(item.newSuggestions);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible d'ajouter l'article.");
    }
  };

  const openModal = () => {
    setEditedName(item.newSuggestions);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditedName(item.newSuggestions);
  };

  const handleSave = async () => {
    if (editedName.trim() === item.newSuggestions) {
      closeModal();
      return;
    }

    if (editedName.trim() === "") {
      alert("Le nom de la suggestion ne peut pas être vide.");
      return;
    }

    try {
      const response = await fetch("/api/suggestes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: item.id, name: editedName.trim() }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la modification");
      }

      window.location.reload();
    } catch (error) {
      console.error("Erreur:", error);
      alert("Impossible de modifier la suggestion.");
    }
  };

  const handleDelete = async () => {
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
    <>
      <div className="p-1 my-1 text-lg text-slate-950 text flex flex-row justify-between shadow-md rounded-sm bg-slate-100">
        <button
          className={`w-4/5 rounded-lg p-1 font-bold text-left ${
            isInList
              ? "bg-green-500 text-white cursor-not-allowed"
              : "hover:bg-slate-200"
          }`}
          onClick={isInList ? undefined : addItemToList}
          disabled={isInList}
          aria-label={
            isInList
              ? `${item.newSuggestions} (déjà dans la liste)`
              : `Ajouter ${item.newSuggestions} à la liste`
          }
        >
          {item.newSuggestions}
        </button>
        <button
          onClick={openModal}
          className="ml-2 p-1"
          aria-label={`Éditer ou supprimer ${item.newSuggestions}`}
        >
          <Pen className="m-1" aria-hidden="true" />
        </button>
      </div>

      {/* Modal d'édition */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md mx-4">
            <h3 className="text-xl font-bold mb-4 text-gray-800">
              Modifier la suggestion
            </h3>
            <input
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              className="w-full border-2 border-gray-300 rounded-lg px-4 py-3 mb-6 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              autoFocus
            />
            <div className="flex flex-col gap-3">
              <button
                onClick={handleDelete}
                className="w-full px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 active:bg-red-800 flex items-center justify-center gap-2 shadow-md"
                aria-label="Supprimer la suggestion"
              >
                <Trash2 className="w-5 h-5" />
                Supprimer
              </button>
              <div className="flex gap-3">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 active:bg-gray-600 shadow-md"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSave}
                  className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 active:bg-blue-800 shadow-md"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
