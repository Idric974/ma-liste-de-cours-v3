"use client";

import { useEffect } from "react";
import { useAppContext } from "./context/MenuContext";
import MenuPopup from "./components/MenuDeApplication/MenuPopup";
import MenuApp from "./components/MenuDeApplication/MenuApp";
import MyListe from "./components/ListeDeCours/MyListe";
import MySuggestions from "./components/Suggestion/MySuggestions";
import MyCarte from "./components/CarteDeFidelite/MyCarte";

export default function Home() {
  const { clicOnTheIconeMenuContext } = useAppContext();
  const myToggle = clicOnTheIconeMenuContext;

  const { clicOnPopupMenuContext, setClicOnPopupMenuContext } = useAppContext();

  useEffect(() => {
    setClicOnPopupMenuContext(clicOnPopupMenuContext);
  }, [clicOnPopupMenuContext, setClicOnPopupMenuContext]);

  console.log("🟢 clicOnPopupMenuContext : ", clicOnPopupMenuContext);

  const renderComponent = () => {
    switch (clicOnPopupMenuContext) {
      case "MyListConponent":
        return <MyListe />;
      case "MySuggestionsConponent":
        return <MySuggestions />;
      case "MyCarteConponent":
        return <MyCarte />;
      default:
        return null;
    }
  };

  return (
    <div className="relative border p-0">
      {/* La popup */}
      <div
        className={`
          absolute top-16 right-0 z-50 p-1
          transform transition-transform duration-300 ease-in-out
          ${
            myToggle
              ? "scale-100 opacity-100"
              : "scale-75 opacity-0 pointer-events-none"
          }
        `}
      >
        <MenuPopup />
      </div>

      {/* Le menu */}
      <div className="fixed top-0 left-0 w-full">
        <MenuApp />
      </div>

      {/* Le body */}
      <div className=" w-full">{renderComponent()}</div>
    </div>
  );
}
