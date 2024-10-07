import { GameState } from "../App";

export function Header({ gameState }: { gameState: GameState }) {
  return (
    <div className="flex flex-col text-center mt-4 mb-8 min-[512px]:mb-16">
      <Title />
      <div className="flex justify-center gap-8 mt-4 text-sm min-[512px]:text-base">
        <CurrentScoreDisplay currentScore={gameState.currentScore} />
        <HighscoreDisplay highscore={gameState.highscore} />
      </div>
    </div>
  );
}

function Title() {
  return (
    <div className="min-[512px]:text-3xl text-2xl">
      <span className="text-red-600">Poké</span>
      <span>Memo</span>
      <span className="text-red-600">N</span>
    </div>
  );
}

function CurrentScoreDisplay({ currentScore }: { currentScore: number }) {
  return <div>Score:{currentScore}</div>;
}

function HighscoreDisplay({ highscore }: { highscore: number }) {
  return <div>Highscore:{highscore}</div>;
}
