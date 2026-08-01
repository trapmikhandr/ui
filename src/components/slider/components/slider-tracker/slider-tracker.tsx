import clsx from "clsx";
import type { FC, ReactNode } from "react";
import { useSliderContext } from "../../context";

interface SliderTrackerProps {
  className?: string;
  children: ReactNode;
}

export const SliderTracker: FC<SliderTrackerProps> = ({
  className,
  children,
}) => {
  const { trackRef, trackProps } = useSliderContext();

  return (
    <div {...trackProps} ref={trackRef} className={clsx(className)}>
      {children}
    </div>
  );
};
