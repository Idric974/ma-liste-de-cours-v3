"use client";

import { createContext, useState, useContext } from "react";

//* Définir le type du contexte, avec clicOnTheIconeMenu et setClicOnTheIconeMenu.
type ContextType = {
  clicOnTheIconeMenuContext: boolean;
  setClicOnTheIconeMenuContext: (clicOnTheIconeMenuContext: boolean) => void;

  clicOnPopupMenuContext: string;
  setClicOnPopupMenuContext: (button: string) => void;
};

//* Créer le contexte avec une valeur par défaut pour éviter les erreurs.
const AppContext = createContext<ContextType>({
  clicOnTheIconeMenuContext: false,
  setClicOnTheIconeMenuContext: () => {},

  clicOnPopupMenuContext: "",
  setClicOnPopupMenuContext: () => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  //* Clic sur l'icone du menu sandwitch du menu.

  const [clicOnTheIconeMenuContext, setClicOnTheIconeMenuContext] =
    useState(false);

  //* Clic sur un des boutons du menu popup.
  const [clicOnPopupMenuContext, setClicOnPopupMenuContext] =
    useState("MyListConponent");

  return (
    <AppContext.Provider
      value={{
        clicOnTheIconeMenuContext,
        setClicOnTheIconeMenuContext,
        clicOnPopupMenuContext,
        setClicOnPopupMenuContext,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
