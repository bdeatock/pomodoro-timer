interface FocusUntilBreakProps {
  timeUntilBreak: string;
}

const FocusUntilBreak = ({ timeUntilBreak }: FocusUntilBreakProps) => {
  return <p>Focus until break: {timeUntilBreak}</p>;
};

export default FocusUntilBreak;
