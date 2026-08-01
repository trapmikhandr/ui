import clsx from "clsx";
import { type ReactNode, useCallback, useRef, useState } from "react";
import {
  AreaClickable,
  AreaInfo,
  ControlPlayPause,
  ControlTimeLine,
  LayoutOverlay,
  TimeDisplay,
  VolumeControl,
} from "./components";
import { ControlFullscreen } from "./components/control-fullscreen";
import { ControlLoop } from "./components/control-loop";
import {
  controlFullscreen,
  controlLoopContainer,
  controlsContainer,
  controlsWrapper,
  debugStatus,
  layoutControls,
  layoutInfo,
  layoutVideo,
  timeDisplayContainer,
  timelineContainer,
  videoElement,
  videoPlayer,
} from "./video-player.css";

export interface VideoPlayerProps {
  /** Video file URL. */
  src: string;
  /** CSS class for customization. */
  className?: string;
  /** Whether to show debug information. */
  showDebug?: boolean;
  /** Whether to enable modal mode. */
  enableOverlayMod?: boolean;
  topContent?: ReactNode;
  bottomContent?: ReactNode;
  width?: number;
}

export const VideoPlayer = ({
  src,
  className,
  showDebug = false,
  enableOverlayMod = false,
  topContent,
  bottomContent,
  width,
}: VideoPlayerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wasPlayingBeforeSeek = useRef(false);
  const isSeekingRef = useRef(false);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [isOverlay, setIsOverlay] = useState(false);

  // --- Playback controls ---
  const togglePlayPause = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }, []);

  // Modal state control.
  const handleModalToggle = useCallback(() => {
    if (enableOverlayMod && !isOverlay) {
      setIsOverlay(true);
    } else {
      togglePlayPause();
    }
  }, [enableOverlayMod, togglePlayPause, isOverlay]);

  const handleModalClose = useCallback(() => {
    setIsOverlay(false);
  }, []);

  // Synchronize the ref with state.
  const updateSeekingState = useCallback((seeking: boolean) => {
    isSeekingRef.current = seeking;
  }, []);

  // --- Video event handlers ---
  const handleLoadedMetadata = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setDuration(video.duration);
    video.volume = volume;
    video.muted = isMuted;
  }, [volume, isMuted]);

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current;
    if (!isSeekingRef.current && video) {
      setCurrentTime(video.currentTime);
    }
  }, []);

  const handlePlay = useCallback(() => {
    if (!isSeekingRef.current) {
      setIsPlaying(true);
    }
  }, []);

  const handlePause = useCallback(() => {
    if (!isSeekingRef.current) {
      setIsPlaying(false);
    }
  }, []);

  // Volume handlers.
  const handleVolumeChange = useCallback(
    (newVolume: number) => {
      setVolume(newVolume);
      if (videoRef.current) {
        videoRef.current.volume = newVolume;
      }
      // Unmute when the volume is set above zero.
      if (newVolume > 0 && isMuted) {
        setIsMuted(false);
        if (videoRef.current) {
          videoRef.current.muted = false;
        }
      }
    },
    [isMuted],
  );

  const handleMuteToggle = useCallback(() => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    if (videoRef.current) {
      videoRef.current.muted = newMuted;
    }
  }, [isMuted]);

  const handleLoopToggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsLoop((prev) => {
      const newLoopState = !prev;
      video.loop = newLoopState;
      return newLoopState;
    });
  }, []);

  const handleFullScreenToggle = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    try {
      if (!document.fullscreenElement) {
        await video.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      console.error("error fullscreen");
    }
  }, []);

  // --- Seeking controls ---
  const startSeeking = useCallback(
    (time: number | number[]) => {
      const video = videoRef.current;
      if (!video) return;

      const seekTime = Array.isArray(time) ? time[0] : time;

      if (!isSeekingRef.current) {
        wasPlayingBeforeSeek.current = !video.paused;
        updateSeekingState(true);
      }

      if (!video.paused) {
        video.pause();
      }

      setCurrentTime(seekTime);
    },
    [updateSeekingState],
  );

  const finishSeeking = useCallback(
    (time: number | number[]) => {
      const video = videoRef.current;
      if (!video) return;

      const seekTime = Array.isArray(time) ? time[0] : time;

      video.currentTime = seekTime;

      if (wasPlayingBeforeSeek.current) {
        video.play();
      }

      setIsPlaying(wasPlayingBeforeSeek.current);
      updateSeekingState(false);
    },
    [updateSeekingState],
  );

  // Debug information.
  const debugInfo = `Playing: ${isPlaying} | Time: ${currentTime.toFixed(1)}s / ${duration.toFixed(1)}s | Modal: ${isOverlay}`;

  return (
    <LayoutOverlay
      isPlaying={isPlaying}
      isOpen={isOverlay}
      onClose={handleModalClose}
      isDisabled={!enableOverlayMod}
      contentClassName={clsx(videoPlayer, className)}
      aria-label="Video player fullscreen mode"
    >
      {/* Video element — always the same element. */}
      <video
        disablePictureInPicture
        width={width}
        ref={videoRef}
        src={src}
        className={videoElement}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onPlay={handlePlay}
        onPause={handlePause}
        controls={!!document.fullscreenElement}
      >
        <track kind="captions" srcLang="en" label="English" default />
      </video>

      {/* Debug information. */}
      {showDebug && <div className={debugStatus}>{debugInfo}</div>}

      <div className={layoutVideo}>
        <div className={layoutInfo}>
          <AreaClickable
            onPress={handleModalToggle}
            aria-label={
              isOverlay ? "Exit fullscreen mode" : "Enter fullscreen mode"
            }
          />
          <AreaInfo bottomContent={bottomContent} topContent={topContent} />
        </div>
        {/* Controls. */}
        <div className={layoutControls}>
          <div className={controlsWrapper}>
            <div className={timelineContainer}>
              <ControlTimeLine
                aria-label="Video time scrubber"
                maxValue={duration}
                value={currentTime}
                onChange={startSeeking}
                onChangeEnd={finishSeeking}
                isDisabled={duration === 0}
              />
            </div>
            <div className={controlsContainer}>
              <ControlPlayPause
                isPlaying={isPlaying}
                onPress={togglePlayPause}
              />
              <VolumeControl
                volume={volume}
                onVolumeChange={handleVolumeChange}
                isMuted={isMuted}
                onMuteToggle={handleMuteToggle}
              />
              <div className={timeDisplayContainer}>
                <TimeDisplay
                  current={currentTime}
                  total={duration}
                  showRemaining={false} // Could be made configurable.
                />
              </div>
              <div className={controlLoopContainer}>
                <ControlLoop isActive={isLoop} onClick={handleLoopToggle} />
              </div>

              <div className={controlFullscreen}>
                <ControlFullscreen onClick={handleFullScreenToggle} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutOverlay>
  );
};
