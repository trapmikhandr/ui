import { Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { memo, useCallback, useState } from "react";
import { IconButton } from "@/components/button/icon-button";
import { VolumeSlider } from "./components";
import {
  controlVolume,
  volumeSliderContainer,
  volumeSliderWrapper,
} from "./control-volume.css";

export interface ControlVolumeProps {
  /** Current volume level (0-1). */
  volume: number;
  /** Callback invoked when the volume changes. */
  onVolumeChange: (volume: number) => void;
  /** Whether audio is muted. */
  isMuted: boolean;
  /** Callback invoked when mute is toggled. */
  onMuteToggle: () => void;
}

export const VolumeControl = memo<ControlVolumeProps>(
  ({ volume, onVolumeChange, isMuted, onMuteToggle }) => {
    const [isSliderActive, setIsSliderActive] = useState(false);

    const handleVolumeChange = useCallback(
      (newVolume: number | number[]) => {
        setIsSliderActive(true);
        const volumeValue = Array.isArray(newVolume) ? newVolume[0] : newVolume;
        onVolumeChange(volumeValue / 100);
      },
      [onVolumeChange],
    );

    const handleSliderEnd = useCallback(() => {
      setIsSliderActive(false);
    }, []);

    // Determine which icon to show.
    const getVolumeIcon = () => {
      if (isMuted || volume === 0) {
        return <VolumeX size={24} />;
      } else if (volume < 0.3) {
        return <Volume size={24} />;
      } else if (volume < 0.7) {
        return <Volume1 size={24} />;
      } else {
        return <Volume2 size={24} />;
      }
    };

    return (
      <div className={controlVolume} data-slider-active={isSliderActive}>
        <IconButton
          onPress={onMuteToggle}
          aria-label={isMuted ? "Unmute" : "Mute"}
        >
          {getVolumeIcon()}
        </IconButton>

        {/* Expandable slider. */}
        <div className={volumeSliderContainer}>
          <div className={volumeSliderWrapper}>
            <VolumeSlider
              aria-label="Volume"
              minValue={0}
              maxValue={100}
              value={isMuted ? 0 : volume * 100}
              onChange={handleVolumeChange}
              onChangeEnd={handleSliderEnd}
              step={1}
            />
          </div>
        </div>
      </div>
    );
  },
);

VolumeControl.displayName = "VolumeControl";
