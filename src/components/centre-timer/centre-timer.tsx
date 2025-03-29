interface CentreTimerProps {
  remainingTime: string;
  toggleTimer: () => void;
  isFocusActive: boolean;
}

const CentreTimer = ({
  remainingTime,
  toggleTimer,
  isFocusActive,
}: CentreTimerProps) => {
  return (
    <button
      type="button"
      onClick={toggleTimer}
      className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-full bg-foreground"
      aria-label="Toggle timer"
    >
      <p className={isFocusActive ? "text-focus" : ""}>{remainingTime}</p>
    </button>
  );
};

export default CentreTimer;
