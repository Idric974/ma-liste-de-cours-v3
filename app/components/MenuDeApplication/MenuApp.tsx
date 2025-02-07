"use client";

import React, { useState } from "react";
import { useAppContext } from "../../context/MenuContext";
import { AlignJustify } from "lucide-react";

export default function MenuApp() {
  const { setClicOnTheIconeMenuContext } = useAppContext();

  const [clickOnIcon, setClickOnIcon] = useState<boolean>(false);

  const clicOnTheIconeFunction = () => {
    setClickOnIcon((prev) => !prev);
    console.log("clickOnIcon : ", clickOnIcon);
    setClicOnTheIconeMenuContext(clickOnIcon);
  };

  return (
    <div className=" bg-blue-700 flex flex-row justify-between items-center">
      <div className="p-1 text-xl text-neutral-950 font-bold">
        Ma liste de courses
      </div>

      <div className="p-1 cursor-pointer text-lg">
        <AlignJustify
          className="w-10 h-10 cursor-pointer"
          onClick={clicOnTheIconeFunction}
        />
      </div>
    </div>
  );
}
