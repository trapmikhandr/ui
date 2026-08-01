import clsx from "clsx";
import { forwardRef, useRef } from "react";
import {
  mergeProps,
  useFocusRing,
  useSliderThumb,
  VisuallyHidden,
} from "react-aria";
import { useSliderContext } from "../../context";

interface SliderThumbProps {
  className?: string;
  index?: number;
}

export const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>(
  ({ className, index = 0 }, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const { state, trackRef, isDisabled } = useSliderContext();

    const { thumbProps, inputProps } = useSliderThumb(
      {
        index,
        trackRef,
        inputRef,
        isDisabled,
      },
      state,
    );

    const { focusProps } = useFocusRing();

    return (
      <div
        ref={ref}
        {...thumbProps}
        className={clsx(className)}
        data-disabled={isDisabled}
      >
        <VisuallyHidden>
          <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
        </VisuallyHidden>
      </div>
    );
  },
);

SliderThumb.displayName = "SliderThumb";
