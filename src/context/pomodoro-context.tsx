import type { TimerMode } from "@/app/app";
import type { ReactNode } from "react";
import useAudio from "@/hooks/use-audio";
import { useLocalStorage } from "@/hooks/use-local-storage";
import usePomodoro from "@/hooks/use-pomodoro";
import { showNotification } from "@/lib";
import { createContext, use, useState } from "react";
import alarmSoundFile from "../assets/alarm.wav";
import clickSoundFile from "../assets/click.wav";

interface PomodoroContextType {
  mode: TimerMode;
  setMode: (mode: TimerMode) => void;
  modeDurations: Record<TimerMode, number>;
  setModeDurations: (modeDurations: Record<TimerMode, number>) => void;

  isTimerActive: boolean;
  remainingTime: number;
  toggleTimer: () => void;

  isFocusActive: boolean;
  focusTimeUntilNextLongBreak: number;
  totalDailyFocusTime: number;
}

const PomodoroContext = createContext<PomodoroContextType | null>(null);

interface PomodoroProviderProps {
  children: ReactNode;
}

export function PomodoroProvider({ children }: PomodoroProviderProps) {
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

  const alarmAudio = useAudio({ audioSrc: alarmSoundFile });
  const clickAudio = useAudio({ audioSrc: clickSoundFile });
  const [mode, setMode] = useState<TimerMode>("focus");

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
      void alarmAudio.play();
      showNotification("Pomodoro complete!", {
        body: `Your ${mode} timer is complete!`,
      });
    },
    onPlayPause: () => {
      void clickAudio.play();
    },
    targetPomodoroCount: pomosPerLongBreak,
  });

  const value: PomodoroContextType = {
    mode,
    setMode,
    isTimerActive: timer.isRunning,
    remainingTime: timer.totalSeconds,
    toggleTimer,
    isFocusActive: focusTimeStopwatch.isRunning,
    focusTimeUntilNextLongBreak,
    totalDailyFocusTime: focusTimeStopwatch.totalSeconds,
    modeDurations,
    setModeDurations,
  };

  return <PomodoroContext value={value}>{children}</PomodoroContext>;
}

export function usePomodoroContext() {
  const context = use(PomodoroContext);
  if (!context) {
    throw new Error(
      "usePomodoroContext must be used within a PomodoroProvider",
    );
  }
  return context;
}
