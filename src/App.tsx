import { useState } from "react";
import { ToggleMusicButton } from "./comps/ToggleMusicButton";
import { Header } from "./comps/Header";
import { Gameboard } from "./comps/Gameboard";
import { ModalContent } from "./comps/ModalContent";
import { shufflePokemon } from "./utils/shufflePokemon";
import { getTotalTurns } from "./utils/getTotalTurns";

export type ModalStatus = {
  isOpen: boolean;
  id: ModalStatusId;
};

export type ModalStatusId = "welcome" | "loading" | "won" | "lost";

export type GameState = {
  currentScore: number;
  highscore: number;
  turn: number;
  difficulty: DifficultyType;
};

export type Pokemon = {
  id: number;
  name: string;
  image: string;
  selected: boolean;
};

export type DifficultyType = "easy" | "medium" | "hard";

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentScore: 0,
    highscore: 0,
    turn: 1,
    difficulty: "easy",
  });

  const [modalStatus, setModalStatus] = useState<ModalStatus>({
    isOpen: true,
    id: "welcome",
  });

  const [isMusicEnabled, setIsMusicEnabled] = useState(false);

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  console.log(pokemon);

  function handleSelectDifficulty(difficulty: DifficultyType) {
    setModalStatus({ ...modalStatus, id: "loading" });
    setGameState({ ...gameState, difficulty });
    setIsMusicEnabled(true);
  }

  function handleCardClick(index: number) {
    // Check loosing condition
    if (pokemon[index].selected === true)
      return setModalStatus({ isOpen: true, id: "lost" });

    // Check winning condition
    if (gameState.turn === getTotalTurns(gameState.difficulty))
      setModalStatus({ isOpen: true, id: "won" });

    // Mark clicked pokémon as selected
    const pokemonCopy = pokemon.map((p, i) =>
      i === index ? { ...p, selected: true } : p
    );

    // Shuffle card deck
    setPokemon(shufflePokemon(pokemonCopy, gameState.turn));

    // Proceed to next turn
    setGameState((currentGameState) => ({
      ...currentGameState,
      currentScore: currentGameState.currentScore + 1,
      turn: currentGameState.turn + 1,
      highscore: currentGameState.highscore + 1,
    }));
  }

  return (
    <div className="bg-[url('./assets/background.jpg')] h-screen bg-cover bg-center bg-fixed overflow-y-auto font-retro">
      <ToggleMusicButton
        isMusicEnabled={isMusicEnabled}
        setIsMusicEnabled={setIsMusicEnabled}
      />
      <Header gameState={gameState} />
      {!modalStatus.isOpen && (
        <Gameboard
          gameState={gameState}
          setGameState={setGameState}
          pokemon={pokemon}
          onClick={handleCardClick}
        />
      )}
      {modalStatus.isOpen && (
        <Modal>
          <ModalContent
            modalStatus={modalStatus}
            setModalStatus={setModalStatus}
            difficulty={gameState.difficulty}
            onSelectDifficulty={(difficulty) =>
              handleSelectDifficulty(difficulty)
            }
            setPokemon={setPokemon}
          />
        </Modal>
      )}
    </div>
  );
}

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 bg-gray-800 flex items-center justify-center opacity-50">
      <div className="p-4 bg-white border border-black z-1">{children}</div>
    </div>
  );
}

export default App;
