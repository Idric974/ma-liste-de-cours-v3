"use client";

import { AlignJustify } from "lucide-react";

export default function Home() {
  return (
    <div className="relative h-screen border border-red-500 p-1">
      {/* Le menu */}
      <div className="fixed top-0 left-0 w-full h-[10%] bg-gray-300 flex flex-row justify-between items-center">
        <div className="p-1 text-lg">Ma liste de cours</div>
        <div className="p-1 cursor-pointer text-lg">
          <AlignJustify className="w-10 h-10" />
        </div>
      </div>

      {/* Le body */}
      <div className="pt-[20%] h-full overflow-y-auto">
        DEBUT Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Consectetur, eligendi repellat sit fugit pariatur, minus magni dolore
        officiis consequatur aliquid, tempora ipsa assumenda laudantium
        voluptate fuga. Rerum laborum dolorum est. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Consectetur, eligendi repellat sit fugit
        pariatur, minus magni dolore officiis consequatur aliquid, tempora ipsa
        assumenda laudantium voluptate fuga. Rerum laborum dolorum est. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Consectetur, eligendi
        repellat sit fugit pariatur, minus magni dolore officiis consequatur
        aliquid, tempora ipsa assumenda laudantium voluptate fuga. Rerum laborum
        dolorum est. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Consectetur, eligendi repellat sit fugit pariatur, minus magni dolore
        officiis consequatur aliquid, tempora ipsa assumenda laudantium
        voluptate fuga. Rerum laborum dolorum est. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Consectetur, eligendi repellat sit fugit
        pariatur, minus magni dolore officiis consequatur aliquid, tempora ipsa
        assumenda laudantium voluptate fuga. Rerum laborum dolorum est. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Consectetur, eligendi
        repellat sit fugit pariatur, minus magni dolore officiis consequatur
        aliquid, tempora ipsa assumenda laudantium voluptate fuga. Rerum laborum
        dolorum est. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Consectetur, eligendi repellat sit fugit pariatur, minus magni dolore
        officiis consequatur aliquid, tempora ipsa assumenda laudantium
        voluptate fuga. Rerum laborum dolorum est. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Consectetur, eligendi repellat sit fugit
        pariatur, minus magni dolore officiis consequatur aliquid, tempora ipsa
        assumenda laudantium voluptate fuga. Rerum laborum dolorum est. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Consectetur, eligendi
        repellat sit fugit pariatur, minus magni dolore officiis consequatur
        aliquid, tempora ipsa assumenda laudantium voluptate fuga. Rerum laborum
        dolorum est. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Consectetur, eligendi repellat sit fugit pariatur, minus magni dolore
        officiis consequatur aliquid, tempora ipsa assumenda laudantium
        voluptate fuga. Rerum laborum dolorum est. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Consectetur, eligendi repellat sit fugit
        pariatur, minus magni dolore officiis consequatur aliquid, tempora ipsa
        assumenda laudantium voluptate fuga. Rerum laborum dolorum est. Lorem
        ipsum dolor sit amet consectetur adipisicing elit. Consectetur, eligendi
        repellat sit fugit pariatur, minus magni dolore officiis consequatur
        aliquid, tempora ipsa assumenda laudantium voluptate fuga. Rerum laborum
        dolorum est. Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Consectetur, eligendi repellat sit fugit pariatur, minus magni dolore
        officiis consequatur aliquid, tempora ipsa assumenda laudantium
        voluptate fuga. Rerum laborum dolorum est. Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Consectetur, eligendi repellat sit fugit
        pariatur, minus magni dolore officiis consequatur aliquid, tempora ipsa
        assumenda laudantium voluptate fuga. Rerum laborum dolorum est FIN.
      </div>
    </div>
  );
}
