import { useState } from "react";
import { ToggleMusicButton } from "./comps/ToggleMusicButton";
import { Header } from "./comps/Header";
import { Gameboard } from "./comps/Gameboard";
import { ModalContent } from "./comps/ModalContent";
import { shufflePokemon } from "./utils/shufflePokemon";

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

  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  function handleSelectDifficulty(difficulty: DifficultyType) {
    setModalStatus({ ...modalStatus, id: "loading" });
    setGameState({ ...gameState, difficulty });
  }

  function handleCardClick() {
    setPokemon(shufflePokemon(pokemon));
    setGameState((currentGameState) => ({
      ...gameState,
      currentScore: currentGameState.currentScore + 1,
      turn: currentGameState.turn + 1,
      highscore: currentGameState.highscore + 1,
    }));
  }

  return (
    <>
      <ToggleMusicButton />
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
    </>
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
