interface DailyTrackerProps {
  totalDailyFocusTime: string;
}

const DailyTracker = ({ totalDailyFocusTime }: DailyTrackerProps) => (
  <p>Today: {totalDailyFocusTime}</p>
);

export default DailyTracker;
