import { Pokemon } from "../App";

export function shufflePokemon(pokemon: Pokemon[], turn: number = 1) {
  // Step 1: Shuffle the array
  const shuffledPokemon = [...pokemon]; // Copy the original array
  for (let i = shuffledPokemon.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledPokemon[i], shuffledPokemon[j]] = [
      shuffledPokemon[j],
      shuffledPokemon[i],
    ];
  }

  // Step 2: Determine how many already selected Pokémon should be in the first 5 elements of the array
  const minSelected = 1; // The minimum is 1 selected item
  const maxSelected = Math.min(turn, 5); // Max selected can be up to turn number but no more than 5.
  const numSelected = Math.floor(Math.random() * maxSelected) + minSelected;

  // Step 3: Get the selected and unselected Pokémon
  const selectedPokemon = shuffledPokemon.filter((pokemon) => pokemon.selected);
  const unselectedPokemon = shuffledPokemon.filter(
    (pokemon) => !pokemon.selected
  );

  // Step 4: Place the random amount of selected Pokémon in the first 6 positions
  const firstFivePositions: Pokemon[] = [];
  firstFivePositions.push(...selectedPokemon.splice(0, numSelected));

  // Step 5: Fill rest of the first 6 positions with unselected Pokémon
  firstFivePositions.push(...unselectedPokemon.splice(0, 6 - numSelected));

  // Step 6: Shuffle the first 6 positions
  for (let i = firstFivePositions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [firstFivePositions[i], firstFivePositions[j]] = [
      firstFivePositions[j],
      firstFivePositions[i],
    ];
  }

  // Step 7: Combine the rest of the Pokémon with the shuffled first 6 positions
  return [...firstFivePositions, ...unselectedPokemon, ...selectedPokemon];
}
