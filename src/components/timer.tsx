import type { TimerMode } from "../app";
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
      console.warn("Timer expired");
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
