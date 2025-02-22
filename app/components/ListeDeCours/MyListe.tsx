import React from "react";

type ItemType = {
  id: number;
  articles: string;
  createdAt: string;
  updatedAt: string;
};

interface MyListeProps {
  item: ItemType;
}

export default function MyListe({ item }: MyListeProps) {
  console.log("Liste de courses =======> ", item);

  return (
    <div className="p-1 text-lg text-slate-950 text">
      <div>
        <p className="border shadow-lg max-w-full rounded-lg p-1 font-bold">
          {item.articles}
        </p>
      </div>
    </div>
  );
}
