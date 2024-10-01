import { useState } from "react";
import { ToggleMusicButton } from "./comps/ToggleMusicButton";
import { Header } from "./comps/Header";
import { Gameboard } from "./comps/Gameboard";
import { ModalContent } from "./comps/ModalContent";

type ModalStatus = {
  isOpen: boolean;
  id: ModalStatusId;
};

export type ModalStatusId = "welcome" | "loading" | "won" | "lost";

export type GameState = {
  currentScore: number;
  highscore: number;
  turn: number;
  difficulty: "easy" | "medium" | "hard";
};

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

  return (
    <>
      <ToggleMusicButton />
      <Header gameState={gameState} />
      <Gameboard gameState={gameState} />
      {modalStatus.isOpen && (
        <Modal>
          <ModalContent
            modalStatusId={modalStatus.id}
            onSelectDifficulty={() =>
              setModalStatus({ ...modalStatus, isOpen: false })
            }
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
