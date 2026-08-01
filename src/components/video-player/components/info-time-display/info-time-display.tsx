import { memo } from "react";
import {
  currentTime,
  duration,
  separator,
  timeDisplay,
} from "./info-time-display.css";

export interface TimeDisplayProps {
  /** Current time in seconds. */
  current: number;
  /** Total duration in seconds. */
  total: number;
  /** CSS class name. */
  className?: string;
  /** Whether to show remaining time instead of total duration. */
  showRemaining?: boolean;
}

/**
 * Formats seconds as MM:SS or HH:MM:SS.
 */
export const formatTime = (timeInSeconds: number): string => {
  if (!Number.isFinite(timeInSeconds) || Number.isNaN(timeInSeconds)) {
    return "0:00";
  }

  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = Math.floor(timeInSeconds % 60);

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const TimeDisplay = memo<TimeDisplayProps>(
  ({ current, total, className, showRemaining = false }) => {
    const currentFormatted = formatTime(current);
    const totalFormatted = formatTime(total);
    const remainingFormatted = formatTime(total - current);

    return (
      <div className={`${timeDisplay} ${className || ""}`}>
        <span className={currentTime}>{currentFormatted}</span>
        <span className={separator}>/</span>
        <span className={duration}>
          {showRemaining ? `-${remainingFormatted}` : totalFormatted}
        </span>
      </div>
    );
  },
);

TimeDisplay.displayName = "TimeDisplay";
