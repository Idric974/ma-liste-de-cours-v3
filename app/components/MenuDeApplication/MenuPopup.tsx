import { Button } from "@/components/ui/button";
import { useAppContext } from "../../context/MenuContext";

export default function MenuPopup() {
  const { setCloseMenuPopupContext, setClicOnPopupMenuContext } = useAppContext();

  const clickOnListButton = () => {
    setClicOnPopupMenuContext("MyListComponent");
    setCloseMenuPopupContext(true);
  };

  const clickOnSuggestionsButton = () => {
    setClicOnPopupMenuContext("MySuggestionsComponent");
    setCloseMenuPopupContext(true);
  };

  const clickOnMesCartesButton = () => {
    setClicOnPopupMenuContext("MyCarteComponent");
    setCloseMenuPopupContext(true);
  };

  return (
    <div className="flex flex-col items-center border border-zinc-950 rounded-sm p-1 w-40 shadow-l bg-white">
      <Button
        variant="outline"
        className="w-36 m-1 shadow-l"
        onClick={clickOnListButton}
        aria-label="Aller à ma liste de cours"
      >
        Ma liste de cours
      </Button>

      <Button
        variant="outline"
        className="w-36 m-1 shadow-l"
        onClick={clickOnSuggestionsButton}
        aria-label="Aller à mes suggestions"
      >
        Mes suggestions
      </Button>
      <Button
        variant="outline"
        className="w-36 m-1 shadow-l"
        onClick={clickOnMesCartesButton}
        aria-label="Aller à mes cartes"
      >
        Mes cartes
      </Button>
    </div>
  );
}
