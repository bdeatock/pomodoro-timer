import type { TimerMode } from "../app";
import { useEffect, useRef } from "react";
import alarmSound from "../assets/alarm.wav";
import clickSound from "../assets/click.wav";
import { usePomodoro } from "../hooks/usePomodoro";
import { formatTime, formatTimeWithUnits } from "../lib";
import CentreTimer from "./centre-timer/centre-timer";
import DailyTracker from "./daily-tracker";
import FocusUntilBreak from "./focus-until-break";

interface TimerProps {
  mode: TimerMode;
  modeDurations: Record<TimerMode, number>;
  setMode: (mode: TimerMode) => void;
  pomosPerLongBreak: number;
}

const Timer = ({
  mode,
  modeDurations,
  setMode,
  pomosPerLongBreak,
}: TimerProps) => {
  const clickRef = useRef<HTMLAudioElement | null>(null);
  const alarmRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (clickRef.current === null) clickRef.current = new Audio(clickSound);
    if (alarmRef.current === null) alarmRef.current = new Audio(alarmSound);
  }, []);

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
      <FocusUntilBreak secondsUntilBreak={focusTimeUntilNextLongBreak} />
      <CentreTimer
        remainingTime={formatTime(timer.totalSeconds)}
        toggleTimer={toggleTimer}
        isFocusActive={focusTimeStopwatch.isRunning}
      />
      <DailyTracker
        totalDailyFocusTime={formatTimeWithUnits(
          focusTimeStopwatch.totalSeconds,
        )}
      />
    </>
  );
};

export default Timer;
