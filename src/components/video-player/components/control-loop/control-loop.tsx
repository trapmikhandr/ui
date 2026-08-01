import { Repeat } from "lucide-react";
import { useState } from "react";
import { IconButton } from "@/components/button/icon-button";

export interface ControlLoopProps {
  onClick: (isChanging: boolean) => void;
  isActive: boolean;
}

export const ControlLoop = ({ onClick, isActive }: ControlLoopProps) => {
  const [isChanging, setIsChanging] = useState(false);
  const handleChangingToggle = () => {
    setIsChanging((prev) => {
      onClick(!prev);
      return !prev;
    });
  };
  return (
    <IconButton
      data-active={isActive}
      isChanging={isChanging}
      onClick={handleChangingToggle}
      aria-label="repeat-button"
    >
      <Repeat size={20} />
    </IconButton>
  );
};
