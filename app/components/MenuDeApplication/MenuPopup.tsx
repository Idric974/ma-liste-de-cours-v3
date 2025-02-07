import { Button } from "@/components/ui/button";
import { useAppContext } from "../../context/MenuContext";

export default function MenuPopup() {
  const { clicOnTheIconeMenuContext, setClicOnTheIconeMenuContext } =
    useAppContext();

  const { setClicOnPopupMenuContext } = useAppContext();

  const cilckOnListButton = () => {
    setClicOnPopupMenuContext("MyListConponent");
    setClicOnTheIconeMenuContext(false);
    // console.log(
    //   "MenuPopup | clic sur MyListConponent: ",
    //   clicOnTheIconeMenuContext
    // );
  };

  const cilckOnSuggestionsButton = () => {
    setClicOnPopupMenuContext("MySuggestionsConponent");
    setClicOnTheIconeMenuContext(false);
    // console.log(
    //   "MenuPopup | clic sur MySuggestionsConponent: ",
    //   clicOnTheIconeMenuContext
    // );
  };

  const cilckOnMesCartesButton = () => {
    setClicOnPopupMenuContext("MyCarteConponent");
    setClicOnTheIconeMenuContext(false);
    // console.log(
    //   "MenuPopup | clic sur MyCarteConponent: ",
    //   clicOnTheIconeMenuContext
    // );
  };

  return (
    <div className="flex flex-col items-center border border-zinc-950 rounded-sm p-1 w-40 shadow-l bg-white">
      <Button
        variant="outline"
        className="w-36 m-1 shadow-l"
        onClick={() => cilckOnListButton()}
      >
        Ma liste de cours
      </Button>

      <Button
        variant="outline"
        className="w-36 m-1 shadow-l"
        onClick={() => cilckOnSuggestionsButton()}
      >
        Mes suggestions
      </Button>
      <Button
        variant="outline"
        className="w-36 m-1 shadow-l"
        onClick={() => cilckOnMesCartesButton()}
      >
        Mes cartes
      </Button>
    </div>
  );
}
