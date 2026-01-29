"use client";

import { createContext, useState, useContext } from "react";

//? Définir le type du contexte, avec clicOnTheIconeMenu et setClicOnTheIconeMenu.
type ContextType = {
  //* Fermer le menu popup.
  closeMenuPopupContext: boolean;
  setCloseMenuPopupContext: (closeMenuPopupContext: boolean) => void;

  //* Transmettre le bouton cliqué.
  clicOnPopupMenuContext: string;
  setClicOnPopupMenuContext: (button: string) => void;
};

//? Créer le contexte avec une valeur par défaut pour éviter les erreurs.
const AppContext = createContext<ContextType>({
  closeMenuPopupContext: false,
  setCloseMenuPopupContext: () => {},

  clicOnPopupMenuContext: "",
  setClicOnPopupMenuContext: () => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  //* Clic sur l'icone du menu sandwitch du menu.

  const [closeMenuPopupContext, setCloseMenuPopupContext] = useState(false);

  //* Clic sur un des boutons du menu popup.
  const [clicOnPopupMenuContext, setClicOnPopupMenuContext] =
    useState("MyListComponent");

  return (
    <AppContext.Provider
      value={{
        closeMenuPopupContext,
        setCloseMenuPopupContext,
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
