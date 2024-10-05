import musicOn from "../assets/music.png";
import musicOff from "../assets/music-off.png";

type ToggleMusicButtonType = {
  isMusicEnabled: boolean;
  setIsMusicEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ToggleMusicButton({
  isMusicEnabled,
  setIsMusicEnabled,
}: ToggleMusicButtonType) {
  return (
    <button
      className="fixed top-0 left-0 m-4"
      onClick={() => setIsMusicEnabled(!isMusicEnabled)}
    >
      <img src={isMusicEnabled ? musicOn : musicOff} />
    </button>
  );
}
