import { useState } from "react";

export function ToggleMusicButton() {
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);

  return <button>Toggle Music</button>;
}
