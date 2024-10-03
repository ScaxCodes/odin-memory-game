import { useEffect, useState } from "react";
import { DifficultyType, ModalStatusId } from "../App";

type ModalContentProps = {
  modalStatusId: ModalStatusId;
  onSelectDifficulty: (difficulty: DifficultyType) => void;
};

type Pokemon = {
  id: number;
  name: string;
  imageUrl: string;
  selected: boolean;
};

export function ModalContent({
  modalStatusId,
  onSelectDifficulty,
}: ModalContentProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function fetchPokemon() {
    const pokemon: Pokemon[] = [];

    while (pokemon.length < 5) {
      const randomId = Math.floor(Math.random() * 151) + 1;
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const data = await response.json();
      console.log(data);

      pokemon.push({
        id: randomId,
        name: data.name,
        imageUrl: data.sprites.front_default,
        selected: false,
      });
    }

    console.log(pokemon);
    setIsLoading(false);
  }

  useEffect(() => {
    if (modalStatusId === "loading") {
      setIsLoading(true);
      fetchPokemon();
    }
  }, [modalStatusId]);

  switch (modalStatusId) {
    case "welcome":
      return (
        <>
          <p>Welcome to my game!</p>
          <p>Please select a difficulty...</p>
          <div className="flex gap-2">
            <DifficultyButton difficulty="easy" />
            <DifficultyButton difficulty="medium" />
            <DifficultyButton difficulty="hard" />
          </div>
        </>
      );
    case "loading":
      // Load 151 Pokémon
      // Generation I (Kanto): 151 Pokémon (Pokémon #001-#151)
      // Introduced in Pokémon Red/Blue/Green/Yellow (1996)
      // fetch(`https://pokeapi.co/api/v2/pokemon/${id}`
      return (
        <>
          {isLoading && (
            <>
              <p>Please wait...</p>
              <p>Pokémon are loading...</p>
            </>
          )}
          {!isLoading && <>Pokémon loaded!</>}
        </>
      );
    case "lost":
      // Return lost modal
      return <p>You have lost the game!</p>;
    case "won":
      // Return won modal
      return <p>You have won the game!</p>;
    default:
      throw new Error("Invalid modal id");
  }

  function DifficultyButton({ difficulty }: { difficulty: DifficultyType }) {
    return (
      <button
        className="mt-2 bg-yellow-400 text-black font-bold px-3 py-1 rounded-md border-2 border-black shadow-retro hover:bg-yellow-300 transition-all"
        onClick={() => onSelectDifficulty(difficulty)}
      >
        {difficulty.toUpperCase()}
      </button>
    );
  }
}
