import { DifficultyType, ModalStatusId } from "../App";

type ModalContentProps = {
  modalStatusId: ModalStatusId;
  onSelectDifficulty: (difficulty: DifficultyType) => void;
};

export function ModalContent({
  modalStatusId,
  onSelectDifficulty,
}: ModalContentProps) {
  switch (modalStatusId) {
    case "welcome":
      return (
        <>
          <p>Welcome to my game!</p>
          <p>Please select a difficulty...</p>
          <div className="flex gap-2">
            <DifficultyButton difficulty="easy" />
            <DifficultyButton difficulty="medium" />
            <DifficultyButton difficulty="hard" />
          </div>
        </>
      );
    case "loading":
      return (
        <>
          <p>Please wait...</p>
          <p>Pokémon are loading...</p>
        </>
      );
    case "lost":
      // Return lost modal
      return <p>You have lost the game!</p>;
    case "won":
      // Return won modal
      return <p>You have won the game!</p>;
    default:
      throw new Error("Invalid modal id");
  }

  function DifficultyButton({ difficulty }: { difficulty: DifficultyType }) {
    return (
      <button
        className="mt-2 bg-yellow-400 text-black font-bold px-3 py-1 rounded-md border-2 border-black shadow-retro hover:bg-yellow-300 transition-all"
        onClick={() => onSelectDifficulty(difficulty)}
      >
        {difficulty.toUpperCase()}
      </button>
    );
  }
}
