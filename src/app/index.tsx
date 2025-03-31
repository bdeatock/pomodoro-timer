import CentreTimer from "@/components/centre-timer/centre-timer";
import DailyTracker from "@/components/daily-tracker";
import FocusUntilBreak from "@/components/focus-until-break";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { usePomodoro } from "@/hooks/usePomodoro";
import { formatTimeWithUnits } from "@/lib";
import { useRef, useState } from "react";
import alarmSoundFile from "../assets/alarm.wav";
import clickSoundFile from "../assets/click.wav";

import ModeSwitcher from "../components/mode-switcher";
import Settings from "../components/settings";

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

  const clickRef = useRef<HTMLAudioElement | null>(null);
  const alarmRef = useRef<HTMLAudioElement | null>(null);
  if (clickRef.current === null) clickRef.current = new Audio(clickSoundFile);
  if (alarmRef.current === null) alarmRef.current = new Audio(alarmSoundFile);

  const pomosPerLongBreak = 4;

  const {
    timer,
    focusTimeStopwatch,
    toggleTimer,
    focusTimeUntilNextLongBreak,
  } = usePomodoro({
    mode,
    modeDurations,
    setMode,
    onExpire: () => {
      void alarmRef.current?.play();
    },
    onPlayPause: () => {
      void clickRef.current?.play();
    },
    targetPomodoroCount: pomosPerLongBreak,
  });

  return (
    <>
      <div className="w-screen bg-background text-primary">
        <div className="container mx-auto flex h-screen flex-col">
          <header className="flex justify-center">
            <h1 className="mt-6 font-audiowide text-4xl font-normal tracking-wider text-primary">
              pomodoro
            </h1>
          </header>
          <main className="mt-14 flex flex-1 flex-col items-center">
            <ModeSwitcher mode={mode} setMode={setMode} />
            <FocusUntilBreak secondsUntilBreak={focusTimeUntilNextLongBreak} />
            <div className="flex flex-1 flex-col items-center justify-around">
              <div />
              <CentreTimer
                remainingTime={timer.totalSeconds}
                toggleTimer={toggleTimer}
                isFocusActive={focusTimeStopwatch.isRunning}
                isTimerActive={timer.isRunning}
                mode={mode}
                modeDurations={modeDurations}
              />

              <DailyTracker
                totalDailyFocusTime={formatTimeWithUnits(
                  focusTimeStopwatch.totalSeconds,
                )}
              />
              <div className="mb-12">
                <Settings
                  modeDurations={modeDurations}
                  setModeDurations={setModeDurations}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default App;
