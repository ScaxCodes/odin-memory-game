import { GameState } from "../App";
import { getTotalTurns } from "../utils/getTotalTurns";

export function Header({ gameState }: { gameState: GameState }) {
  return (
    <div className="flex flex-col text-center m-2">
      <Title />
      <div className="flex justify-center gap-2">
        <CurrentScoreDisplay currentScore={gameState.currentScore} />
        <HighscoreDisplay highscore={gameState.highscore} />
      </div>
      <TurnDisplay
        turn={gameState.turn}
        turns={getTotalTurns(gameState.difficulty)}
      />
    </div>
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

function TurnDisplay({ turn, turns }: { turn: number; turns: 6 | 15 | 25 }) {
  return (
    <div>
      Turn: {turn > turns ? turns : turn}/{turns}
    </div>
  );
}
