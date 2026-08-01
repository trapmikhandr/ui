import { memo } from "react";
import type { AriaSliderProps } from "react-aria";
import { Slider } from "@/components/slider/slider";
import {
  controlTimeLine,
  progressFill,
  thumb,
  track,
} from "./control-time-line.css";

interface TimeLineProps extends AriaSliderProps {
  onChangeStart?: () => void;
}

export const ControlTimeLine = memo<TimeLineProps>((props) => {
  return (
    <Slider {...props} className={controlTimeLine}>
      <Slider.Tracker className={track}>
        <Slider.Progress className={progressFill} />
        <Slider.Thumb className={thumb} />
      </Slider.Tracker>
    </Slider>
  );
});

ControlTimeLine.displayName = "TimeLine";
