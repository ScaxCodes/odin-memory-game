import { GameState, Pokemon } from "../App";

type GameboardType = {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  pokemon: Pokemon[];
};

export function Gameboard({ gameState, setGameState, pokemon }: GameboardType) {
  return (
    <>
      {pokemon &&
        pokemon.map((pokemon) => {
          return (
            <PokemonCard
              key={pokemon.id}
              name={pokemon.name}
              image={pokemon.image}
            />
          );
        })}
    </>
  );
}

type PokemonCardType = {
  name: string;
  image: string;
};

function PokemonCard({ name, image }: PokemonCardType) {
  return (
    <div className="h-64 w-40 bg-red-300 m-1 inline-block rounded-lg">
      <div className="flex flex-col items-center justify-center h-full">
        <img src={image} />
        <p>{name.toUpperCase()}</p>
      </div>
    </div>
  );
}
