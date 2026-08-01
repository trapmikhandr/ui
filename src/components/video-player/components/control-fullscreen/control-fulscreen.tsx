import { Maximize } from "lucide-react";
import { IconButton } from "@/components/button/icon-button";

interface ControlFullscreenProps {
  onClick: () => void;
}
export const ControlFullscreen = ({ onClick }: ControlFullscreenProps) => {
  return (
    <IconButton onClick={onClick} aria-label="fullscreen-button">
      <Maximize size={24} />
    </IconButton>
  );
};
