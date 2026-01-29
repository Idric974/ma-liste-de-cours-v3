"use client";

import React, { useState, useEffect } from "react";
import { AlignJustify, X } from "lucide-react";
import MenuPopup from "./MenuPopup";
import { useAppContext } from "../../context/MenuContext";

export default function MenuApp() {
  const [clickOnIcon, setClickOnIcon] = useState<boolean>(false);
  const { closeMenuPopupContext, setCloseMenuPopupContext } = useAppContext();

  const clicOnTheSandwich = () => {
    setClickOnIcon((prev) => !prev);
  };

  useEffect(() => {
    if (closeMenuPopupContext) {
      setClickOnIcon(false);
      setCloseMenuPopupContext(false);
    }
  }, [closeMenuPopupContext, setCloseMenuPopupContext]);

  return (
    <div className=" bg-blue-700 flex flex-row justify-between items-center">
      <div className="p-1 text-xl text-neutral-950 font-bold">
        Ma liste de courses
      </div>

      {/* La popup */}
      <div
        className={`
          absolute top-16 right-0 z-50 p-1
          transform transition-transform duration-300 ease-in-out
          ${
            clickOnIcon
              ? "scale-100 opacity-100"
              : "scale-75 opacity-0 pointer-events-none"
          }
        `}
      >
        <MenuPopup />
      </div>

      <button
        className="p-1 cursor-pointer text-lg"
        onClick={clicOnTheSandwich}
        aria-label={clickOnIcon ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={clickOnIcon}
      >
        {clickOnIcon ? (
          <X className="w-10 h-10" aria-hidden="true" />
        ) : (
          <AlignJustify className="w-10 h-10" aria-hidden="true" />
        )}
      </button>
    </div>
  );
}
