import clsx from "clsx";
import type React from "react";
import { useRef } from "react";
import {
  type AriaSliderProps,
  useNumberFormatter,
  useSlider,
} from "react-aria";

import { useSliderState } from "react-stately";
import { SliderProgress, SliderThumb, SliderTracker } from "./components";
import { SliderContext } from "./context";

interface SliderProps extends AriaSliderProps {
  className?: string;
  children: React.ReactNode;
  onChangeStart?: () => void;
}

const SliderRoot: React.FC<SliderProps> = ({
  className,
  children,
  ...ariaProps
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const numberFormatter = useNumberFormatter({
    style: "unit",
    unit: "second",
    unitDisplay: "narrow",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const state = useSliderState({ ...ariaProps, numberFormatter });
  const { groupProps, trackProps } = useSlider(ariaProps, state, trackRef);

  const contextValue = {
    state,
    trackRef,
    groupProps,
    trackProps,
    isDisabled: ariaProps.isDisabled,
  };

  return (
    <SliderContext.Provider value={contextValue}>
      <div
        {...groupProps}
        className={clsx(className)}
        data-disabled={ariaProps.isDisabled}
      >
        {children}
      </div>
    </SliderContext.Provider>
  );
};

// Compound component
export const Slider: typeof SliderRoot & {
  Tracker: typeof SliderTracker;
  Progress: typeof SliderProgress;
  Thumb: typeof SliderThumb;
} = Object.assign(SliderRoot, {
  Tracker: SliderTracker,
  Progress: SliderProgress,
  Thumb: SliderThumb,
});
