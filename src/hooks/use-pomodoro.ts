import type { TimerMode } from "../app/app";
import { useEffect } from "react";
import { useStopwatch, useTimer } from "react-timer-hook";
import { formatTime, getExpiryTimestamp } from "../lib";
import { useLocalStorageWithDailyReset } from "./use-local-storage";

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
const usePomodoro = ({
  mode,
  modeDurations,
  setMode,
  targetPomodoroCount,
  onExpire,
  onPlayPause,
}: UsePomodoroOptions) => {
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

  // Update the focus time in local storage when the stopwatch changes
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

  // Restart the timer when the mode changes
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
      timer.resume();
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

  // Update the document title when the timer mode changes
  useEffect(() => {
    document.title = `${mode} - ${formatTime(timer.totalSeconds)}`;
  }, [mode, timer.totalSeconds]);

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
};

export default usePomodoro;
