import { GameState, Pokemon } from "../App";

type GameboardType = {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  pokemon: Pokemon[];
  onClick: () => void;
};

export function Gameboard({
  gameState,
  setGameState,
  pokemon,
  onClick,
}: GameboardType) {
  return (
    <>
      {pokemon &&
        pokemon.slice(0, 5).map((pokemon) => {
          return (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
              onClick={onClick}
            />
          );
        })}
    </>
  );
}

type PokemonCardType = {
  name: string;
  image: string;
  onClick: () => void;
};

function PokemonCard({ name, image, onClick }: PokemonCardType) {
  return (
    <button
      className="h-64 w-40 bg-red-300 m-1 inline-block rounded-lg"
      onClick={onClick}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <img src={image} />
        <p>{name.toUpperCase()}</p>
      </div>
    </button>
  );
}
