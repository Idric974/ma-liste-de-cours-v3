import React from "react";
import { Button } from "@/components/ui/button";

export default function MenuPopup() {
  const cilcKOnSuggestionsButton = () => {
    console.log("Clic sur le bouton Suggestions");
  };

  const cilcKOnMesCartesButton = () => {
    console.log("Clic sur le bouton Mes cartes");
  };

  return (
    <div className="flex flex-col items-center border border-zinc-950 rounded-sm p-1 w-40 shadow-l bg-white">
      <Button
        variant="outline"
        className="w-36 m-1 shadow-l"
        onClick={() => cilcKOnSuggestionsButton()}
      >
        Suggestions
      </Button>
      <Button
        variant="outline"
        className="w-36 m-1 shadow-l"
        onClick={() => cilcKOnMesCartesButton()}
      >
        Mes cartes
      </Button>
    </div>
  );
}
