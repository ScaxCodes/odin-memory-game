import { useState } from "react";
import { getTotalTurns } from "./utils/getTotalTurns";

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
      <CurrentScoreDisplay currentScore={gameState.currentScore} />
      <HighscoreDisplay highscore={gameState.highscore} />
      <TurnDisplay
        turn={gameState.turn}
        turns={getTotalTurns(gameState.difficulty)}
      />
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

function CurrentScoreDisplay({ currentScore }: { currentScore: number }) {
  return <div>Score: {currentScore}</div>;
}

function HighscoreDisplay({ highscore }: { highscore: number }) {
  return <div>Highscore: {highscore}</div>;
}

function TurnDisplay({ turn, turns }: { turn: number; turns: 5 | 15 | 25 }) {
  return (
    <div>
      Turn: {turn}/{turns}
    </div>
  );
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
