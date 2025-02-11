import { Button } from "@/components/ui/button";
import { useAppContext } from "../../context/MenuContext";

export default function MenuPopup() {
  const { setCloseMenuPopupContext } = useAppContext();
  const { setClicOnPopupMenuContext } = useAppContext();

  const cilckOnListButton = () => {
    setClicOnPopupMenuContext("MyListConponent");
    setCloseMenuPopupContext(false);
  };

  const cilckOnSuggestionsButton = () => {
    setClicOnPopupMenuContext("MySuggestionsConponent");
    setCloseMenuPopupContext(false);
  };

  const cilckOnMesCartesButton = () => {
    setClicOnPopupMenuContext("MyCarteConponent");
    setCloseMenuPopupContext(false);
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
