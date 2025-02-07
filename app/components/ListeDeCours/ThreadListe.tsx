import React from "react";
import MyListe from "./MyListe";

export function ThreadListe() {
  const items = [
    {
      id: 1,
      newSuggestions: "Pommes",
      createdAt: "2025-02-07T10:00:00.000Z",
      updatedAt: "2025-02-07T10:15:00.000Z",
    },
    {
      id: 2,
      newSuggestions: "Bananes",
      createdAt: "2025-02-07T10:05:00.000Z",
      updatedAt: "2025-02-07T10:20:00.000Z",
    },
    {
      id: 3,
      newSuggestions: "Pain complet",
      createdAt: "2025-02-07T10:10:00.000Z",
      updatedAt: "2025-02-07T10:25:00.000Z",
    },
    {
      id: 4,
      newSuggestions: "Yaourt nature",
      createdAt: "2025-02-07T10:12:00.000Z",
      updatedAt: "2025-02-07T10:30:00.000Z",
    },
    {
      id: 5,
      newSuggestions: "Œufs bio",
      createdAt: "2025-02-07T10:15:00.000Z",
      updatedAt: "2025-02-07T10:35:00.000Z",
    },
  ];

  return (
    <div className="pt-[20%] h-full overflow-y-auto">
      <div>
        {items.map((item) => {
          return <MyListe item={item} key={item.id} />;
        })}
      </div>
    </div>
  );
}
