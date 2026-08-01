import type { PlacementAxis } from "react-aria";
import * as styles from "./arrow-popover.css";

interface ArrowPopoverProps {
  arrowProps: React.HTMLAttributes<HTMLDivElement> & {
    style?: React.CSSProperties;
  };
  placement: PlacementAxis | null;
}

export function ArrowPopover({
  arrowProps,
  placement = null,
}: ArrowPopoverProps) {
  return (
    <div
      {...arrowProps}
      className={styles.arrow}
      data-placement={placement}
      style={arrowProps.style}
    />
  );
}
