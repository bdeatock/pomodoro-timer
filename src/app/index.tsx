import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState } from "react";
import ModeSwitcher from "../components/mode-switcher";
import Settings from "../components/settings";
import Timer from "../components/timer";

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

  // TODO: change structure, remove Timer comonent, and handle it in here.
  // Top 3 elements can be spaced normally, then remaining elements fit screen
  // with justify-evenly.

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-evenly gap-6 bg-background text-primary">
        <h1 className="mt-6 font-audiowide text-4xl font-normal tracking-wider text-primary">
          pomodoro
        </h1>

        <ModeSwitcher mode={mode} setMode={setMode} />

        <Timer
          mode={mode}
          modeDurations={modeDurations}
          setMode={setMode}
          pomosPerLongBreak={pomosPerLongBreak}
        />

        <div className="mb-12">
          <Settings
            modeDurations={modeDurations}
            setModeDurations={setModeDurations}
          />
        </div>
      </main>
    </>
  );
};

export default App;
