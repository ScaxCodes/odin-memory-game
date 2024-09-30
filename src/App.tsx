import { useState } from "react";

type ModalStatus = {
  isOpen: boolean;
  id: "welcome" | "loading" | "won" | "lost";
};

type GameState = {
  currentScore: number;
  highscore: number;
  turn: number;
  difficulty: "easy" | "medium" | "hard";
};

function App() {
  const [gameState, setGameState] = useState<GameState>({
    currentScore: 0,
    highscore: 0,
    turn: 0,
    difficulty: "easy",
  });

  const [modalStatus, setModalstatus] = useState<ModalStatus>({
    isOpen: true,
    id: "welcome",
  });

  return (
    <>
      <ToggleMusicButton />
      <Header gameState={gameState} />
      <Gameboard gameState={gameState} />
    </>
  );
}

export default App;

function ToggleMusicButton() {
  const [isMusicEnabled, setIsMusicEnabled] = useState<boolean>(false);

  return <button>Toggle Music</button>;
}

function Header({ gameState }: { gameState: GameState }) {
  return (
    <>
      <Title />
      <CurrentScoreDisplay />
      <HighscoreDisplay />
      <TurnDisplay />
    </>
  );
}

function Title() {
  return (
    <div>
      <span className="text-red-600">Poké</span>
      <span>Memo</span>
      <span className="text-red-600">N</span>
    </div>
  );
}

function CurrentScoreDisplay({ currentScore = 0 }) {
  return <div>Score: {currentScore}</div>;
}

function HighscoreDisplay() {
  return <div>Highscore: </div>;
}

function TurnDisplay() {
  return <div>Turn: </div>;
}

function Gameboard({ gameState }: { gameState: GameState }) {
  return (
    <>
      <PokemonCard />
      <PokemonCard />
    </>
  );
}

function PokemonCard() {
  return (
    <div className="h-64 w-40 bg-red-300 mr-1 inline-block rounded-lg"></div>
  );
}
