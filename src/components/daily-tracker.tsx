interface DailyTrackerProps {
  totalDailyFocusTime: string;
}

const DailyTracker = ({ totalDailyFocusTime }: DailyTrackerProps) => (
  <p className="font-mono text-lg">Total focus today: {totalDailyFocusTime}</p>
);

export default DailyTracker;
