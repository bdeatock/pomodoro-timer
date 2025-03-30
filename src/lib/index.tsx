export const getExpiryTimestamp = (seconds: number) => {
  const now = new Date();
  now.setSeconds(now.getSeconds() + seconds);
  return now;
};

export const formatTime = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
};

export const formatTimeWithUnits = (seconds: number) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours >= 1) {
    return `${hours}h${minutes}m`;
  } else {
    return `${minutes}m`;
  }
};

export const isDateStringToday = (dateString: string) => {
  const today = new Date();
  return dateString === today.toDateString();
};
