import { differenceInSeconds, formatDistanceToNow, parseISO } from "date-fns";

export const formatTimeDifference = (date: string) => {
  const now = new Date();
  const parsedDate = parseISO(date);
  const seconds = differenceInSeconds(now, parsedDate);

  if (seconds <= 0) return `1 secs`;
  if (seconds < 60) return `${seconds} secs`;

  // Handle the case when the time difference is greater than 60 seconds
  //  formatDistanceToNow here for larger units (minutes, hours, etc.)
  return formatDistanceToNow(parsedDate, { addSuffix: false })
    .replace(/\babout\b|\bago\b/g, "")
    .trim();
};
