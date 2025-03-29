interface CentreTimerProps {
  remainingTime: string;
  toggleTimer: () => void;
}

const CentreTimer = ({ remainingTime, toggleTimer }: CentreTimerProps) => {
  return (
    <button
      type="button"
      onClick={toggleTimer}
      className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-full bg-gray-800"
      aria-label="Toggle timer"
    >
      <p>{remainingTime}</p>
    </button>
  );
};

export default CentreTimer;
