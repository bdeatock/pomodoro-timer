import { formatTimeWithUnits } from "../lib";

interface FocusUntilBreakProps {
  secondsUntilBreak: number;
}

const FocusUntilBreak = ({ secondsUntilBreak }: FocusUntilBreakProps) => {
  const timeRemainingMsg = `Focus time until next long break: ${formatTimeWithUnits(secondsUntilBreak)}`;
  const longBreakMsg = "Long break time!";
  const isLongBreakReady = secondsUntilBreak <= 0;

  return <p>{isLongBreakReady ? longBreakMsg : timeRemainingMsg}</p>;
};

export default FocusUntilBreak;
