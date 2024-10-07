import { useEffect, useState } from "react";
import { ToggleMusicButton } from "./comps/ToggleMusicButton";
import { Header } from "./comps/Header";
import { Gameboard } from "./comps/Gameboard";
import { ModalContent } from "./comps/ModalContent";
import { shufflePokemon } from "./utils/shufflePokemon";
import { getTotalTurns } from "./utils/getTotalTurns";
import { getInitialHighscore } from "./utils/getInitialHighscore";
import clickSound from "./assets/cardflip.mp3";

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
    highscore: getInitialHighscore(),
    turn: 1,
    difficulty: "easy",
  });
  const [modalStatus, setModalStatus] = useState<ModalStatus>({
    isOpen: true,
    id: "welcome",
  });
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);
  const [forceMusicOff, setForceMusicOff] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);

  // Save highscore to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("highscore", gameState.highscore.toString());
  }, [gameState.highscore]);

  function handleSelectDifficulty(difficulty: DifficultyType) {
    // Reset score and turn state, if its not the first game
    if (modalStatus.id !== "welcome")
      setGameState({ ...gameState, currentScore: 0, turn: 1 });
    setModalStatus({ ...modalStatus, id: "loading" });
    setGameState((currentGameState) => ({ ...currentGameState, difficulty }));
    if (!forceMusicOff) setIsMusicEnabled(true);
  }

  function handleCardClick(index: number) {
    // Save users music settings
    if (!isMusicEnabled) setForceMusicOff(true);
    else if (forceMusicOff) setForceMusicOff(false);

    // Check loosing condition
    if (pokemon[index].selected === true)
      return setModalStatus({ isOpen: true, id: "lost" });

    // Mark clicked pokémon as selected
    const pokemonCopy = pokemon.map((p, i) =>
      i === index ? { ...p, selected: true } : p
    );

    // Shuffle card deck
    setPokemon(shufflePokemon(pokemonCopy, gameState.turn));

    // Proceed to next turn
    setGameState({
      ...gameState,
      currentScore: gameState.currentScore + 1,
      turn: gameState.turn + 1,
      highscore:
        gameState.currentScore === gameState.highscore
          ? gameState.highscore + 1
          : gameState.highscore,
    });

    // Check winning condition
    if (gameState.turn === getTotalTurns(gameState.difficulty))
      return setModalStatus({ isOpen: true, id: "won" });

    // Play audio only when game continues
    const clickAudio = new Audio(clickSound);
    clickAudio.volume = 0.3;
    clickAudio.play();
  }

  return (
    <div className="bg-[url('./assets/background.jpg')] min-h-screen bg-cover bg-center bg-fixed overflow-y-auto font-retro">
      <ToggleMusicButton
        isMusicEnabled={isMusicEnabled}
        setIsMusicEnabled={setIsMusicEnabled}
      />
      <Header gameState={gameState} />
      {!modalStatus.isOpen && (
        <Gameboard
          gameState={gameState}
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
            setIsMusicEnabled={setIsMusicEnabled}
          />
        </Modal>
      )}
    </div>
  );
}

function Modal({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
      <div className="relative p-4 bg-white border border-black z-10">
        {children}
      </div>
    </div>
  );
}

export default App;
