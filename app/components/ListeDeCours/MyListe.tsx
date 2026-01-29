import React from "react";
import { Trash2 } from "lucide-react";

type ItemType = {
  id: string;
  articles: string;
  createdAt: string;
  updatedAt: string;
};

interface MyListeProps {
  item: ItemType;
  onDelete: (id: string) => void;
}

export default function MyListe({ item, onDelete }: MyListeProps) {
  return (
    <div className="p-1 text-lg text-slate-950 text">
      <div className="flex items-center justify-between border shadow-lg max-w-full rounded-lg p-1">
        <p className="font-bold flex-1">{item.articles}</p>
        <button
          onClick={() => onDelete(item.id)}
          className="ml-2 p-1 text-red-600 hover:text-red-800 hover:bg-red-100 rounded transition-colors"
          aria-label={`Supprimer ${item.articles}`}
        >
          <Trash2 className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
