import { usePomodoroContext } from "@/context/pomodoro-context";
import { formatTimeWithUnits } from "@/lib";

const DailyTracker = () => {
  const { totalDailyFocusTime } = usePomodoroContext();

  const totalDailyFocusTimeStr = formatTimeWithUnits(totalDailyFocusTime);

  return <p className="font-mono text-lg">Today: {totalDailyFocusTimeStr}</p>;
};

export default DailyTracker;
