import { useState } from "react";

export function ToggleMusicButton() {
  const [isMusicEnabled, setIsMusicEnabled] = useState<boolean>(false);

  return <button>Toggle Music</button>;
}
