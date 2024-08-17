import { differenceInSeconds, formatDistanceToNow } from "date-fns";

export const formatTimeDifference = (date: string) => {
  const now = new Date();
  const seconds = differenceInSeconds(now, date);

  if (seconds < 60) return `${seconds} secs`;

  // Handle the case when the time difference is greater than 60 seconds
  //  formatDistanceToNow here for larger units (minutes, hours, etc.)

  return formatDistanceToNow(date, { addSuffix: false })
    .replace(/\babout\b|\bago\b/g, "")
    .trim();
};
