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
  // console.log("item =======> ", item);

  const addItemToList = () => {
    const itemId = item.id;
    console.log("id de l'item:", itemId);
  };

  return (
    <div className="p-1 my-1 text-lg text-slate-950 text flex flex-row justify-between shadow-md rounded-sm bg-slate-100">
      <p
        className=" w-4/5 rounded-lg p-1 font-bold"
        onClick={() => addItemToList()}
      >
        {item.newSuggestions}
      </p>
      <div className="flex flex-row w-1/5 justify-between items-center">
        <Pen className="m-1 " />
        <Trash2 className="m-1" />
      </div>
    </div>
  );
}
