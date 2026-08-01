import clsx from "clsx";
import type React from "react";
import type { CSSProperties } from "react";
import { useSliderContext } from "../../context";

interface SliderProgressProps {
  className?: string;
}

export const SliderProgress: React.FC<SliderProgressProps> = ({
  className,
}) => {
  const { state } = useSliderContext();

  // Calculate the filled percentage.
  const progressPercentage = state.getThumbPercent(0);

  const progressStyle = {
    transform: `scaleX(${progressPercentage})`,
    transformOrigin: "left center",
  } as CSSProperties;

  return <div style={progressStyle} className={clsx(className)} />;
};
