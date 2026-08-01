import type React from "react";
import type { AriaSliderProps } from "react-aria";
import { Slider } from "@/components/slider";
import {
  volumeSlider,
  volumeSliderProgress,
  volumeSliderThumb,
  volumeSliderTracker,
} from "./volume-slider.css";

interface VolumeSliderProps extends AriaSliderProps {
  className?: string;
}

export const VolumeSlider: React.FC<VolumeSliderProps> = ({
  className,
  ...props
}) => {
  return (
    <Slider {...props} className={volumeSlider}>
      <Slider.Tracker className={volumeSliderTracker}>
        <Slider.Progress className={volumeSliderProgress} />
        <Slider.Thumb className={volumeSliderThumb} />
      </Slider.Tracker>
    </Slider>
  );
};
