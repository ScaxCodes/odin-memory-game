export function getInitialHighscore() {
  const storedHighscore = localStorage.getItem("highscore");
  return storedHighscore ? parseInt(storedHighscore) : 0;
}
