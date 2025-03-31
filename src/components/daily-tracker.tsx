interface DailyTrackerProps {
  totalDailyFocusTime: string;
}

const DailyTracker = ({ totalDailyFocusTime }: DailyTrackerProps) => (
  <p className="font-mono text-lg">Today: {totalDailyFocusTime}</p>
);

export default DailyTracker;
