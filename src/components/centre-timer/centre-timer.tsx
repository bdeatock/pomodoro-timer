import type { TimerMode } from "@/app";
import { formatTime } from "@/lib";
import { CircularProgressbar } from "react-circular-progressbar";

interface CentreTimerProps {
  remainingTime: number;
  toggleTimer: () => void;
  isFocusActive: boolean;
  isTimerActive: boolean;
  mode: TimerMode;
  modeDurations: Record<TimerMode, number>;
}

const CentreTimer = ({
  mode,
  remainingTime,
  toggleTimer,
  isFocusActive,
  isTimerActive,
  modeDurations,
}: CentreTimerProps) => {
  const pathColor = `var(--color-${mode}-darker)`;

  return (
    <button
      type="button"
      onClick={toggleTimer}
      aria-label="Toggle timer"
      className={`${
        isFocusActive
          ? "main-timer-box-shadow-focussed"
          : isTimerActive && mode === "short break"
            ? "main-timer-box-shadow-short-break"
            : isTimerActive && mode === "long break"
              ? "main-timer-box-shadow-long-break"
              : "main-timer-box-shadow"
      } relative z-10 flex h-96 w-96 items-center justify-center rounded-full bg-background bg-linear-300 from-foreground to-background p-6 transition-all duration-300 hover:scale-105`}
    >
      <div className="z-20 flex h-full flex-1 cursor-pointer flex-col items-center justify-center rounded-full bg-background p-3">
        <CircularProgressbar
          className="absolute z-30 h-full w-full p-8"
          value={remainingTime}
          maxValue={modeDurations[mode] * 60}
          strokeWidth={3}
          styles={{
            path: {
              stroke: pathColor,
              strokeLinecap: "round",
              transition: "stroke-dashoffset 1s ease 0s",
            },
          }}
        />
        <p className="absolute top-20 text-center font-audiowide text-lg text-focus/60">
          {isFocusActive ? "FOCUS ACTIVE" : ""}
        </p>
        <span className="absolute top-1/2 mt-[-32px] text-center font-mono text-7xl tracking-wider">
          {formatTime(remainingTime)}
        </span>
      </div>
    </button>
  );
};

export default CentreTimer;
