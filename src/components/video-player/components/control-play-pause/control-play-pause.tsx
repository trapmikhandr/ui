import { Pause, Play } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { IconButton } from "@/components/button/icon-button";

export interface ControlPlayPauseProps {
  /** Whether the video is playing. */
  isPlaying: boolean;
  /** Callback invoked on press. */
  onPress: () => void;
  /** Whether the button is disabled. */
  isDisabled?: boolean;
  /** CSS class name. */
  className?: string;
}

export const ControlPlayPause: React.FC<ControlPlayPauseProps> = ({
  isPlaying,
  onPress,
  isDisabled = false,
  className,
}) => {
  const [isChanging, setIsChanging] = useState(false);

  const handlePress = () => {
    // Animate the icon transition.
    setIsChanging(true);
    setTimeout(() => setIsChanging(false), 150);

    onPress();
  };

  return (
    <IconButton
      onPress={handlePress}
      isDisabled={isDisabled}
      isChanging={isChanging}
      aria-label={isPlaying ? "Pause" : "Play"}
      className={className}
    >
      {isPlaying ? <Pause size={24} /> : <Play size={24} />}
    </IconButton>
  );
};
