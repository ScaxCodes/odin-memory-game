export function getTotalTurns(
  difficulty: "easy" | "medium" | "hard"
): 6 | 15 | 25 {
  switch (difficulty) {
    case "easy":
      return 6;
    case "medium":
      return 15;
    case "hard":
      return 25;
    default:
      throw new Error("Invalid difficulty level");
  }
}
