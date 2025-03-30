import { formatTimeWithUnits } from "../lib";

interface FocusUntilBreakProps {
  secondsUntilBreak: number;
}

const FocusUntilBreak = ({ secondsUntilBreak }: FocusUntilBreakProps) => {
  const timeRemainingMsg = `Long break in ${formatTimeWithUnits(secondsUntilBreak)}`;
  const longBreakMsg = "Long break time!";
  const isLongBreakReady = secondsUntilBreak <= 0;

  return (
    <p className="p-12 font-mono text-lg">
      {isLongBreakReady ? longBreakMsg : timeRemainingMsg}
    </p>
  );
};

export default FocusUntilBreak;
