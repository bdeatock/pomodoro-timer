import { usePomodoroContext } from "@/context/pomodoro-context";
import { formatTimeWithUnits } from "../lib";

const FocusUntilBreak = () => {
  const { focusTimeUntilNextLongBreak } = usePomodoroContext();

  const timeRemainingMsg = `Long break in ${formatTimeWithUnits(
    focusTimeUntilNextLongBreak,
  )}`;
  const longBreakMsg = "Long break time!";
  const isLongBreakReady = focusTimeUntilNextLongBreak <= 0;

  return (
    <p className="p-12 font-mono text-lg">
      {isLongBreakReady ? longBreakMsg : timeRemainingMsg}
    </p>
  );
};

export default FocusUntilBreak;
