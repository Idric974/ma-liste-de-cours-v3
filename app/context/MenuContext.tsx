"use client";

import { createContext, useState, useContext } from "react";

//* Définir le type du contexte, avec clicOnTheIconeMenu et setClicOnTheIconeMenu.
type ContextType = {
  clicOnTheIconeMenuContext: boolean;
  setClicOnTheIconeMenuContext: (clicOnTheIconeMenuContext: boolean) => void;
};

//* Créer le contexte avec une valeur par défaut pour éviter les erreurs.
const AppContext = createContext<ContextType>({
  clicOnTheIconeMenuContext: false,
  setClicOnTheIconeMenuContext: () => {},
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [clicOnTheIconeMenuContext, setClicOnTheIconeMenuContext] =
    useState(false);

  return (
    <AppContext.Provider
      value={{ clicOnTheIconeMenuContext, setClicOnTheIconeMenuContext }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
