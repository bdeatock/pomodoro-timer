import type { TimerMode } from "../app";
import { useEffect } from "react";
import { useStopwatch, useTimer } from "react-timer-hook";
import { getExpiryTimestamp } from "../utils";

interface UsePomodoroOptions {
  /** Current timer mode (focus, short break, long break) */
  mode: TimerMode;
  /** Function to set the timer mode */
  setMode: (mode: TimerMode) => void;
  /** Duration in minutes for each timer mode */
  modeDurations: Record<TimerMode, number>;
  /** Number of pomodoros to complete before a long break (default: 4) */
  targetPomodoroCount: number;
  /** Callback function to execute when the timer expires */
  onExpire: () => void;
}

/**
 * This hook handles the timer logic for a Pomodoro timer,
 * including tracking total focus time (time from focus mode starting and break actually starting) and managing breaks.
 */
export function usePomodoro({
  mode,
  modeDurations,
  setMode,
  targetPomodoroCount,
  onExpire,
}: UsePomodoroOptions) {
  const totalSecondsBetweenLongBreaks =
    modeDurations["long break"] * targetPomodoroCount * 60;

  const focusTimeStopwatch = useStopwatch({
    autoStart: false,
    interval: 200,
  });

  const timer = useTimer({
    expiryTimestamp: getExpiryTimestamp(modeDurations[mode] * 60),
    interval: 200,
    autoStart: false,
    onExpire: () => {
      if (mode === "short break" || mode === "long break") {
        setMode("focus");
      } else if (
        totalSecondsBetweenLongBreaks - focusTimeStopwatch.totalSeconds <
        0
      ) {
        setMode("long break");
      } else {
        setMode("short break");
      }

      onExpire?.();
    },
  });

  useEffect(() => {
    timer.restart(getExpiryTimestamp(modeDurations[mode] * 60), false);
  }, [mode, modeDurations, timer.restart]);

  /**
   * Toggle the timer between running and paused states
   * Also manages the focus time stopwatch based on the current mode
   */
  const toggleTimer = () => {
    if (timer.isRunning) {
      timer.pause();
      focusTimeStopwatch.pause();
    } else {
      timer.start();
      if (mode === "focus") {
        focusTimeStopwatch.start();
      } else {
        focusTimeStopwatch.pause();
      }
    }
  };

  return {
    timer: {
      totalSeconds: timer.totalSeconds,
      isRunning: timer.isRunning,
      restart: timer.restart,
    },
    focusTimeStopwatch: {
      totalSeconds: focusTimeStopwatch.totalSeconds,
      isRunning: focusTimeStopwatch.isRunning,
    },
    toggleTimer,
    totalSecondsBetweenLongBreaks,
  };
}
