import { Icon } from "@iconify/react";
import { useState } from "react";
import ModeSwitcher from "../components/mode-switcher";
import Timer from "../components/timer";

export type TimerMode = "focus" | "short break" | "long break";

const App = () => {
  const [mode, setMode] = useState<TimerMode>("focus");

  const [modeDurations, _setModeDurations] = useState<
    Record<TimerMode, number>
  >({
    focus: 25,
    "short break": 5,
    "long break": 15,
  });

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center gap-4 bg-gray-900 text-gray-100">
        <h1 className="absolute top-0 mt-4 text-4xl font-bold text-gray-100">
          Pomodoro Timer
        </h1>

        <ModeSwitcher mode={mode} setMode={setMode} />

        <Timer mode={mode} modeDurations={modeDurations} />

        <button type="button">
          <Icon icon="ic:round-settings" className="h-6 w-6 text-gray-300" />
        </button>
      </main>
    </>
  );
};

export default App;
