import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MyCarte() {
  const [openCard, setOpenCard] = useState<string | null>(null);

  const toggleCard = (cardName: string) => {
    setOpenCard(openCard === cardName ? null : cardName);
  };

  return (
    <div className="p-1 mt-16 text-lg text-slate-950 flex flex-col shadow-md rounded-sm border">
      <h1 className="font-bold text-2xl mb-4">Mes cartes</h1>

      <div>
        <Button
          variant="outline"
          className="w-36 m-1 shadow-l"
          onClick={() => toggleCard("carrefour")}
          aria-label="Afficher la carte Carrefour"
          aria-expanded={openCard === "carrefour"}
        >
          Carrefour
        </Button>

        {openCard === "carrefour" && (
          <div className="mt-2 p-2 border rounded-lg">
            <Image
              src="/carrefour.webp"
              width={500}
              height={500}
              alt="Carte de fidélité Carrefour"
            />
          </div>
        )}

        <Button
          variant="outline"
          className="w-36 m-1 shadow-l"
          onClick={() => toggleCard("leclerc")}
          aria-label="Afficher la carte Leclerc"
          aria-expanded={openCard === "leclerc"}
        >
          Leclerc
        </Button>

        {openCard === "leclerc" && (
          <div className="mt-2 p-2 border rounded-lg">
            <Image
              src="/leclerc.webp"
              width={500}
              height={500}
              alt="Carte de fidélité Leclerc"
            />
          </div>
        )}
      </div>
    </div>
  );
}
