import type React from "react";
import { useRef } from "react";
import type { AriaButtonProps } from "react-aria";
import { useButton } from "react-aria";
import { areaClickable } from "./area-clickable.css";

export interface AreaClickableProps extends AriaButtonProps {
  /** Area content, usually controls. */
  /** CSS class name. */
  className?: string;
}

export const AreaClickable: React.FC<AreaClickableProps> = ({
  className,
  ...ariaProps
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(ariaProps, ref);

  return (
    <button
      {...buttonProps}
      ref={ref}
      className={areaClickable}
      type="button"
    />
  );
};
