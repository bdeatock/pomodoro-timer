interface DailyTrackerProps {
  totalDailyFocusTime: string;
}

const DailyTracker = ({ totalDailyFocusTime }: DailyTrackerProps) => {
  return <p>Today: {totalDailyFocusTime}</p>;
};

export default DailyTracker;
