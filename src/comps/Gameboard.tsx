import { useEffect, useRef, useState } from "react";
import { GameState, Pokemon } from "../App";
import { getTotalTurns } from "../utils/getTotalTurns";
import Tilt from "react-parallax-tilt";

type GameboardType = {
  gameState: GameState;
  pokemon: Pokemon[];
  onClick: (id: number) => void;
};

export function Gameboard({ gameState, pokemon, onClick }: GameboardType) {
  return (
    <>
      <div className="text-center text-xl mb-4">
        <TurnDisplay
          turn={gameState.turn}
          turns={getTotalTurns(gameState.difficulty)}
        />
      </div>
      <div className="flex justify-center flex-wrap gap-4 w-fit min-[540px]:w-[540px] min-[1070px]:w-full m-auto">
        {pokemon &&
          pokemon.slice(0, 6).map((pokemon, index) => {
            return (
              <Tilt
                key={gameState.turn + "." + pokemon.id}
                tiltReverse={true}
                tiltMaxAngleX={25}
                tiltMaxAngleY={25}
                glareEnable={true}
                glareMaxOpacity={0.8}
                glarePosition="all"
                scale={1.1}
              >
                <PokemonCard
                  name={pokemon.name}
                  image={pokemon.image}
                  onClick={() => onClick(index)}
                />
              </Tilt>
            );
          })}
      </div>
    </>
  );
}

type PokemonCardType = {
  name: string;
  image: string;
  onClick: () => void;
};

function PokemonCard({ name, image, onClick }: PokemonCardType) {
  const [isAnimating, setIsAnimating] = useState(true);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      button.addEventListener("animationend", () => setIsAnimating(false));
    }

    return () => {
      if (button) {
        button.removeEventListener("animationend", () => setIsAnimating(false));
      }
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`h-52 w-40 bg-red-300 inline-block rounded-lg opacity-90 animate-fadeIn`}
      onClick={!isAnimating ? onClick : undefined} // Only allow click if not animating
    >
      <div className="flex flex-col items-center justify-center h-full text-sm">
        <img src={image} alt={name} width="200%" draggable="false" />
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
