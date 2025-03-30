interface DailyTrackerProps {
  totalDailyFocusTime: string;
}

const DailyTracker = ({ totalDailyFocusTime }: DailyTrackerProps) => (
  <p className="font-audiowide text-lg">Today: {totalDailyFocusTime}</p>
);

export default DailyTracker;
