const CentreTimer = ({
  remainingTime,
  resumeTimer,
  pauseTimer,
  isRunning,
}: {
  remainingTime: string;
  resumeTimer: () => void;
  pauseTimer: () => void;
  isRunning: boolean;
}) => {
  return (
    <button
      type="button"
      onClick={isRunning ? pauseTimer : resumeTimer}
      className="flex h-40 w-40 cursor-pointer items-center justify-center rounded-full bg-gray-800"
      aria-label="Pause/Resume timer"
    >
      <p>{remainingTime}</p>
    </button>
  );
};

export default CentreTimer;
