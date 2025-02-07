"use client";

import MenuPopup from "./components/MenuDeApplication/MenuPopup";
import MyListe from "./components/ListeDeCours/MyListe";
import MenuApp from "./components/MenuDeApplication/MenuApp";
import { useAppContext } from "./context/MenuContext";

export default function Home() {
  const { clicOnTheIconeMenuContext, setClicOnTheIconeMenuContext } =
    useAppContext();

  const myToggle = clicOnTheIconeMenuContext;
  console.log("myToggle dans la page ==>", myToggle);

  return (
    <div className="relative border p-0">
      {/* La popup */}
      <div
        className={`
          absolute top-0 right-0 z-50 p-1
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
      <div className=" w-full">
        <MyListe />
      </div>
    </div>
  );
}
