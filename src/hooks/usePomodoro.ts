import type { TimerMode } from "../app";
import { useEffect } from "react";
import { useStopwatch, useTimer } from "react-timer-hook";
import { getExpiryTimestamp } from "../lib";
import { useLocalStorageWithDailyReset } from "./useLocalStorage";

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
  onExpire?: () => void;
  /** Callback function to execute when the timer is played */
  onPlayPause?: () => void;
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
  onPlayPause,
}: UsePomodoroOptions) {
  // TODO: Switch to long break mode if focus is running and short break is active?
  // ^ Req focus stopwatch to stop running when user changes mode

  const totalSecondsBetweenLongBreaks =
    modeDurations.focus * targetPomodoroCount * 60;

  const [focusTime, setFocusTime] = useLocalStorageWithDailyReset<number>({
    key: "focusTime",
    defaultValue: 0,
  });

  const [longBreakOffset, setLongBreakOffset] =
    useLocalStorageWithDailyReset<number>({
      key: "longBreakOffset",
      defaultValue: 0,
    });

  const focusTimeOffsetTimestamp = new Date();
  focusTimeOffsetTimestamp.setSeconds(
    focusTimeOffsetTimestamp.getSeconds() + focusTime,
  );

  const focusTimeStopwatch = useStopwatch({
    autoStart: false,
    interval: 200,
    offsetTimestamp: focusTimeOffsetTimestamp,
  });

  useEffect(() => {
    setFocusTime(focusTimeStopwatch.totalSeconds);
  }, [focusTimeStopwatch.totalSeconds, setFocusTime]);

  const focusTimeUntilNextLongBreak =
    totalSecondsBetweenLongBreaks +
    longBreakOffset -
    focusTimeStopwatch.totalSeconds;

  const timer = useTimer({
    expiryTimestamp: getExpiryTimestamp(modeDurations[mode] * 60),
    interval: 200,
    autoStart: false,
    onExpire: () => {
      if (mode === "short break" || mode === "long break") {
        setMode("focus");
      } else if (focusTimeUntilNextLongBreak <= 0) {
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

      if (mode === "long break") {
        setLongBreakOffset(focusTimeStopwatch.totalSeconds);
      }
    }

    onPlayPause?.();
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
    focusTimeUntilNextLongBreak,
  };
}
