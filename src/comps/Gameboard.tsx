import { GameState, Pokemon } from "../App";
import { getTotalTurns } from "../utils/getTotalTurns";

type GameboardType = {
  gameState: GameState;
  pokemon: Pokemon[];
  onClick: (id: number) => void;
};

export function Gameboard({ gameState, pokemon, onClick }: GameboardType) {
  return (
    <>
      <div className="text-center text-xl">
        {" "}
        <TurnDisplay
          turn={gameState.turn}
          turns={getTotalTurns(gameState.difficulty)}
        />
      </div>
      <div className="flex justify-center flex-wrap">
        {pokemon &&
          pokemon.slice(0, 6).map((pokemon, index) => {
            return (
              <PokemonCard
                key={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                onClick={() => onClick(index)}
              />
            );
          })}
      </div>
    </>
  );
}

type PokemonCardType = {
  key: number;
  name: string;
  image: string;
  onClick: () => void;
};

function PokemonCard({ name, image, onClick }: PokemonCardType) {
  return (
    <button
      className="h-52 w-40 bg-red-300 m-1 inline-block rounded-lg opacity-90"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center h-full text-sm">
        <img src={image} width="200%" />
        <p>{name.toUpperCase()}</p>
      </div>
    </button>
  );
}

function TurnDisplay({ turn, turns }: { turn: number; turns: 6 | 15 | 25 }) {
  return (
    <div>
      Turn: {turn > turns ? turns : turn}/{turns}
    </div>
  );
}
