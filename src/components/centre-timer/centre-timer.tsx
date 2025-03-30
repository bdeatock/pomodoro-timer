import type { TimerMode } from "@/app";

interface CentreTimerProps {
  remainingTime: string;
  toggleTimer: () => void;
  isFocusActive: boolean;
  isTimerActive: boolean;
  mode: TimerMode;
}

const CentreTimer = ({
  mode,
  remainingTime,
  toggleTimer,
  isFocusActive,
  isTimerActive,
}: CentreTimerProps) => (
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
    } relative z-10 flex h-80 w-80 items-center justify-center rounded-full bg-background bg-linear-300 from-foreground to-background transition-all duration-300 hover:scale-105`}
  >
    <div className="z-20 flex h-72 w-72 cursor-pointer flex-col items-center justify-center rounded-full bg-background">
      <p className="absolute top-16 text-center font-audiowide text-lg text-focus/60">
        {isFocusActive ? "FOCUS ACTIVE" : ""}
      </p>
      <span className="absolute top-1/2 mt-[-32px] text-center font-mono text-7xl tracking-wider">
        {remainingTime}
      </span>
    </div>
  </button>
);

export default CentreTimer;
