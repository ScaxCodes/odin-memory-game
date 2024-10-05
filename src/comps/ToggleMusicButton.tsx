import { useState } from "react";

export function ToggleMusicButton() {
  const [isMusicEnabled, setIsMusicEnabled] = useState(false);

  return <button className="fixed top-0 left-0 m-2">Toggle Music</button>;
}
