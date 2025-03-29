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
