import { formatDistanceToNow } from "date-fns";

/**
 * Returns human-readable time difference
 * e.g. "just now", "5 minutes ago", "2 hours ago"
 */
export const timeFrom = (timestamp) => {
  if (!timestamp) return "—";

  const date = new Date(timestamp);
  const diffInSeconds = (Date.now() - date.getTime()) / 1000;

  if (diffInSeconds < 60) {
    return "just now";
  }

   let formatted = formatDistanceToNow(date, { addSuffix: true });

  // Remove "about " if present
  formatted = formatted.replace(/^about\s/, "");
  return formatted;
};
