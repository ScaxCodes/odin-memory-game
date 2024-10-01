import { GameState } from "../App";

export function Gameboard({ gameState }: { gameState: GameState }) {
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
