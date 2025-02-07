import React from "react";

type ItemType = {
  id: number;
  newSuggestions: string;
  createdAt: string;
  updatedAt: string;
};

interface MyListeProps {
  item: ItemType;
}

export default function MyListe({ item }: MyListeProps) {
  console.log("item =======> ", item);

  return (
    <div className="pt-[20%] h-full overflow-y-auto">
      <div>
        <p>{item.newSuggestions}</p>
      </div>
    </div>
  );
}
