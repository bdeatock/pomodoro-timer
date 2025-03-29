import type { TimerMode } from "../app";
import { useEffect } from "react";
import { useTimer } from "react-timer-hook";
import { formatTime, getExpiryTimestamp } from "../utils";
import CentreTimer from "./centre-timer/centre-timer";

const Timer = ({
  mode,
  modeDurations,
}: {
  mode: TimerMode;
  modeDurations: Record<TimerMode, number>;
}) => {
  const {
    totalSeconds: remainingSeconds,
    isRunning,
    resume,
    pause,
    restart,
  } = useTimer({
    expiryTimestamp: getExpiryTimestamp(modeDurations[mode] * 60),
    interval: 200,
    autoStart: false,
    onExpire: () => {
      console.warn("expired");
    },
  });

  useEffect(() => {
    restart(getExpiryTimestamp(modeDurations[mode] * 60), false);
  }, [mode, modeDurations, restart]);

  return (
    <>
      <p>Time until long break: 48m</p>
      <CentreTimer
        remainingTime={formatTime(remainingSeconds)}
        resumeTimer={resume}
        pauseTimer={pause}
        isRunning={isRunning}
      />
      <p>Today: 2h 15m</p>
    </>
  );
};

export default Timer;
