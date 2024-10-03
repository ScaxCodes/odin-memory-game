import { Pokemon } from "../App";

export function shufflePokemon(array: Pokemon[], turn: number = 1) {
  const shuffledArray = [...array]; // Create a copy of the original array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;

  switch (turn) {
    case 1:
      break;

    default:
      break;
  }
}

/* Shuffle Algo:
15 cards
T1: egal
T2: 1 selected, 4 no selected
case turn === 2
shuffle, filter selected, filter unselected, push new array
T3: 1-2 selected, 3-4 no selected
shuffle, filter selected, filter unseelcted, getrandomnumber 1-2, push 1-2, push 5-1-2
T4: 1-3 selected, 2-4 no selected
same with number +1
T5: 1-4 selected, 1-4 no selected
same with numner +1
T6: ^^



*/
