import { useState } from "react";
import CentreTimer from "./centre-timer/centre-timer";
import ModeSwitcher from "./mode-switcher/mode-switcher";

export type TimerMode = "focus" | "short break" | "long break";

const Timer = () => {
  const [mode, setMode] = useState<TimerMode>("focus");

  return (
    <>
      <ModeSwitcher mode={mode} setMode={setMode} />
      <p>Time until long break: 48m</p>
      <CentreTimer />
      <p>Today: 2h 15m</p>
    </>
  );
};

export default Timer;
