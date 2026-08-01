import { clsx } from "clsx";
import type { ReactNode } from "react";
import * as styles from "./top-app-bar.css";

export interface TopAppBarProps {
  leading?: ReactNode;
  trailing?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function TopAppBar({
  leading,
  trailing,
  children,
  className,
}: TopAppBarProps) {
  return (
    <header className={clsx(styles.bar, className)}>
      <div className={styles.slot}>{leading}</div>
      <div className={styles.title}>{children}</div>
      <div className={styles.slot}>{trailing}</div>
    </header>
  );
}

TopAppBar.displayName = "TopAppBar";
