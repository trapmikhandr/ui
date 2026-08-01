import { createContext, type DOMAttributes, useContext } from "react";
import type { SliderState } from "react-stately";

interface SliderContextType {
  state: SliderState;
  trackRef: React.RefObject<HTMLDivElement | null>;
  groupProps: DOMAttributes<HTMLDivElement>;
  trackProps: DOMAttributes<HTMLDivElement>;
  isDisabled?: boolean;
}

export const SliderContext = createContext<SliderContextType | null>(null);

export const useSliderContext = () => {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error("Slider components must be used within a Slider");
  }
  return context;
};
