import { useEffect, useState } from "react";
import { DifficultyType, ModalStatus, Pokemon } from "../App";
import { getTotalTurns } from "../utils/getTotalTurns";
import pikachuWon from "../assets/win.webp";
import pikachuLost from "../assets/loose.webp";
import musicWon from "../assets/gamewon-cut.mp3";
import musicLost from "../assets/gamelost.mp3";
import ReactHowler from "react-howler";

type ModalContentProps = {
  modalStatus: ModalStatus;
  setModalStatus: React.Dispatch<React.SetStateAction<ModalStatus>>;
  difficulty: DifficultyType;
  onSelectDifficulty: (difficulty: DifficultyType) => void;
  setPokemon: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  setIsMusicEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ModalContent({
  modalStatus,
  setModalStatus,
  difficulty,
  onSelectDifficulty,
  setPokemon,
  setIsMusicEnabled,
}: ModalContentProps) {
  const [isLoading, setIsLoading] = useState(false);

  async function fetchPokemon() {
    const pokemon: Pokemon[] = [];
    const totalTurns = getTotalTurns(difficulty);

    while (pokemon.length < totalTurns) {
      // Generation I (Kanto): 151 Pokémon (Pokémon #001-#151)
      // Introduced in Pokémon Red/Blue/Green/Yellow (1996)
      const randomId = Math.floor(Math.random() * 151) + 1;

      const duplicationFound = pokemon.some((p) => p.id === randomId);
      if (duplicationFound) {
        console.log(`Duplication Found - Skipping Pokémon! ID: ${randomId}`);
        continue; // Skip to the next iteration if duplication is found
      }

      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${randomId}`
      );
      const data = await response.json();

      pokemon.push({
        id: randomId,
        name: data.name,
        image: data.sprites.front_default,
        selected: false,
      });
    }

    setPokemon(pokemon);
    setIsLoading(false);
    setTimeout(() => {
      setModalStatus({ ...modalStatus, isOpen: false });
    }, 1000);
  }

  useEffect(() => {
    if (modalStatus.id === "won" || modalStatus.id === "lost")
      setIsMusicEnabled(false);

    if (modalStatus.id === "loading") {
      setIsLoading(true);
      fetchPokemon();
    }
  }, [modalStatus.id]);

  switch (modalStatus.id) {
    case "welcome":
      return (
        <>
          <p>Select a difficulty...</p>
          <GameOverButtons />
        </>
      );
    case "loading":
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
      return <GameOverMessage status={"lost"} />;
    case "won":
      // Return won modal
      return <GameOverMessage status={"won"} />;
    default:
      throw new Error("Invalid modal id");
  }

  function DifficultyButton({ difficulty }: { difficulty: DifficultyType }) {
    return (
      <button
        className="mt-4 bg-yellow-400 text-black font-bold px-3 py-1 rounded-md border-2 border-black shadow-retro hover:bg-yellow-300 transition-all"
        onClick={() => onSelectDifficulty(difficulty)}
      >
        {difficulty.toUpperCase()}
      </button>
    );
  }

  function GameOverMessage({ status }: { status: "lost" | "won" }) {
    return (
      <>
        <img src={status === "lost" ? pikachuLost : pikachuWon} />
        <p className="mt-4">
          You {status === "lost" ? "lost" : "won"} the game!
        </p>
        <p className="mt-4">Try again?</p>
        <GameOverButtons />
        <ReactHowler
          src={status === "lost" ? musicLost : musicWon}
          playing={true}
          volume={0.2}
        />
      </>
    );
  }

  function GameOverButtons() {
    return (
      <div className="flex gap-4 justify-center">
        <DifficultyButton difficulty="easy" />
        <DifficultyButton difficulty="medium" />
        <DifficultyButton difficulty="hard" />
      </div>
    );
  }
}
