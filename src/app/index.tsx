import { useState } from "react";
import ModeSwitcher from "../components/mode-switcher";
import Timer from "../components/timer";
import Settings from "../components/settings";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export type TimerMode = "focus" | "short break" | "long break";

const App = () => {
  const [mode, setMode] = useState<TimerMode>("focus");
  const [modeDurations, setModeDurations] = useLocalStorage<
    Record<TimerMode, number>
  >({
    key: "modeDurations",
    defaultValue: {
      focus: 25,
      "short break": 5,
      "long break": 15,
    },
  });

  const pomosPerLongBreak = 4;

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center gap-4 bg-background text-primary">
        <h1 className="absolute top-0 mt-4 text-4xl font-bold text-primary">
          Pomodoro Timer
        </h1>

        <ModeSwitcher mode={mode} setMode={setMode} />

        <Timer
          mode={mode}
          modeDurations={modeDurations}
          setMode={setMode}
          pomosPerLongBreak={pomosPerLongBreak}
        />

        <Settings
          modeDurations={modeDurations}
          setModeDurations={setModeDurations}
        />
      </main>
    </>
  );
};

export default App;
