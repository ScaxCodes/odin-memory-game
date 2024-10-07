import musicOn from "../assets/music.png";
import musicOff from "../assets/music-off.png";
import ReactHowler from "react-howler";
import bgMusic from "../assets/bgmusic.mp3";

type ToggleMusicButtonType = {
  isMusicEnabled: boolean;
  setIsMusicEnabled: React.Dispatch<React.SetStateAction<boolean>>;
};

export function ToggleMusicButton({
  isMusicEnabled,
  setIsMusicEnabled,
}: ToggleMusicButtonType) {
  return (
    <>
      <button
        className="absolute top-0 left-0 m-4 focus:ring-8 focus:ring-blue-500 rounded-lg"
        onClick={() => setIsMusicEnabled(!isMusicEnabled)}
      >
        <img
          src={isMusicEnabled ? musicOn : musicOff}
          className="w-3/4 min-[512px]:w-full"
        />
      </button>
      {isMusicEnabled && (
        <ReactHowler
          src={bgMusic}
          playing={true}
          loop={true}
          volume={0.2}
          html5={true}
        />
      )}
    </>
  );
}
