"use client";

import { useAppContext } from "./context/MenuContext";
import MenuApp from "./components/MenuDeApplication/MenuApp";
import ThreadListe from "./components/ListeDeCours/ThreadListe";
import ThreadSugestions from "./components/Suggestion/ThreadSugestions";
import MyCarte from "./components/CarteDeFidelite/MyCarte";

export default function Home() {
  const { clicOnPopupMenuContext, setClicOnPopupMenuContext } = useAppContext();


  const renderComponent = () => {
    switch (clicOnPopupMenuContext) {
      case "MyListComponent":
        return <ThreadListe />;
      case "MySuggestionsComponent":
        return <ThreadSugestions />;
      case "MyCarteComponent":
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
      <div className="w-full">{renderComponent()}</div>
    </div>
  );
}
