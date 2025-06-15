import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(count: string): string {
  const num = parseInt(count);
  if (isNaN(num)) return "0";

  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

// Keep formatViewCount for backward compatibility
export const formatViewCount = formatNumber;

export function getTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInHours = Math.floor(
    (now.getTime() - date.getTime()) / (1000 * 60 * 60)
  );

  if (diffInHours < 1) return "Just now";
  if (diffInHours < 24) return `${diffInHours}h ago`;

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) return `${diffInDays}d ago`;

  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) return `${diffInWeeks}w ago`;

  const diffInMonths = Math.floor(diffInDays / 30);
  return `${diffInMonths}mo ago`;
}

export function isWithinTimeRange(
  publishedAt: string,
  timeRange: string
): boolean {
  const publishDate = new Date(publishedAt);
  const now = new Date();
  const diffInHours =
    (now.getTime() - publishDate.getTime()) / (1000 * 60 * 60);

  switch (timeRange) {
    case "24h":
      return diffInHours <= 24;
    case "7d":
      return diffInHours <= 168; // 7 * 24
    case "30d":
      return diffInHours <= 720; // 30 * 24
    case "all":
    default:
      return true;
  }
}
