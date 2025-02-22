import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function MyCarte() {
  return (
    <div className="p-1 mt-16 text-lg text-slate-950 text flex flex-col justify-between shadow-md rounded-sm border">
      <h1>Mes cartes</h1>

      <div>
        <Button
          popoverTarget="carrefour"
          variant="outline"
          className="w-36 m-1 shadow-l"
        >
          {"Carrefour"}
        </Button>

        <div popover="auto" id="carrefour">
          <Image
            src="/carrefour.webp"
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </div>

        <Button
          popoverTarget="leclerc"
          variant="outline"
          className="w-36 m-1 shadow-l"
        >
          {"Leclerc"}
        </Button>

        <div popover="auto" id="leclerc">
          <Image src="/leclerc.webp" width={500} height={500} alt="leclerc" />
        </div>
      </div>
    </div>
  );
}
