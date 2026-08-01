import * as styles from "./progress-bar.css";

export interface ProgressBarProps {
  /** Whether to show the progress bar. */
  isVisible?: boolean;
}

/**
 * Global loading indicator at the top of the page.
 * Displays an indeterminate progress bar.
 */
export function ProgressBar({ isVisible = true }: ProgressBarProps) {
  if (!isVisible) return null;

  return (
    <div
      className={styles.container}
      role="progressbar"
      aria-label="Loading"
      aria-busy="true"
    >
      <div className={styles.bar} />
    </div>
  );
}
