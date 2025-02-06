"use client";

import { createContext, useState, useContext } from "react";

// Définir le type du contexte, avec button et setButton
type ContextType = {
  button: string;
  setButton: (button: string) => void; // Ajout de la fonction setButton dans le type
};

// Créer le contexte avec une valeur par défaut pour éviter les erreurs
const AppContext = createContext<ContextType>({
  button: "converter",
  setButton: () => {}, // Valeur par défaut pour setButton
});

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const [button, setButton] = useState("converter");

  return (
    <AppContext.Provider value={{ button, setButton }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
