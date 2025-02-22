"use client";

import { useEffect } from "react";
import { useAppContext } from "./context/MenuContext";
// import MenuPopup from "./components/MenuDeApplication/MenuPopup";
import MenuApp from "./components/MenuDeApplication/MenuApp";
import ThreadListe from "./components/ListeDeCours/ThreadListe";
import ThreadSugestions from "./components/Suggestion/ThreadSugestions";
import MyCarte from "./components/CarteDeFidelite/MyCarte";

export default function Home() {
  const { clicOnPopupMenuContext, setClicOnPopupMenuContext } = useAppContext();

  useEffect(() => {
    setClicOnPopupMenuContext(clicOnPopupMenuContext);
  }, [clicOnPopupMenuContext, setClicOnPopupMenuContext]);

  // console.log("🟢 clicOnPopupMenuContext : ", clicOnPopupMenuContext);

  const renderComponent = () => {
    switch (clicOnPopupMenuContext) {
      case "MyListConponent":
        return <ThreadListe />;
      case "MySuggestionsConponent":
        return <ThreadSugestions />;
      case "MyCarteConponent":
        return <MyCarte />;
      default:
        return null;
    }
  };

  return (
    <div className="relative p-1">
      {/* Le menu */}
      <div className="fixed top-0 left-0 w-full">
        <MenuApp />
      </div>

      {/* Le body */}
      <div className=" w-full">{renderComponent()}</div>
    </div>
  );
}
