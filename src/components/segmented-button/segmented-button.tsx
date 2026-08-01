import { clsx } from "clsx";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { useRef } from "react";
import { mergeProps, useButton, useFocusRing } from "react-aria";
import {
  segmentButton,
  segmentedButtonGroup,
  segmentNum,
} from "./segmented-button.css";

export interface SegmentedButtonOption<T extends string> {
  value: T;
  label: string;
  icon?: ReactNode;
  num?: string;
  disabled?: boolean;
}

export type SegmentedButtonSize = "small" | "medium" | "large";

export interface SegmentedButtonProps<T extends string> {
  options: SegmentedButtonOption<T>[];
  value: T | null;
  onChange: (value: T | null) => void;
  size?: SegmentedButtonSize;
  showCheckmark?: boolean;
  className?: string;
  "aria-label"?: string;
}

/**
 * @deprecated Use ButtonGroup instead.
 */
export function SegmentedButton<T extends string>({
  options,
  value,
  onChange,
  size = "medium",
  showCheckmark = true,
  className,
  "aria-label": ariaLabel,
}: SegmentedButtonProps<T>) {
  return (
    <fieldset
      className={clsx(segmentedButtonGroup, className)}
      aria-label={ariaLabel}
    >
      {options.map((option) => (
        <Segment
          key={option.value}
          option={option}
          isSelected={value === option.value}
          size={size}
          showCheckmark={showCheckmark}
          onPress={() => {
            onChange(value === option.value ? null : option.value);
          }}
        />
      ))}
    </fieldset>
  );
}

interface SegmentProps<T extends string> {
  option: SegmentedButtonOption<T>;
  isSelected: boolean;
  size: SegmentedButtonSize;
  showCheckmark: boolean;
  onPress: () => void;
}

function Segment<T extends string>({
  option,
  isSelected,
  size,
  showCheckmark,
  onPress,
}: SegmentProps<T>) {
  const ref = useRef<HTMLButtonElement>(null);

  const { buttonProps, isPressed } = useButton(
    { onPress, isDisabled: option.disabled },
    ref,
  );

  const { focusProps, isFocusVisible } = useFocusRing();

  const leadingIcon =
    isSelected && showCheckmark ? (
      <Check size={18} aria-hidden />
    ) : option.icon ? (
      <span style={{ display: "flex" }} aria-hidden>
        {option.icon}
      </span>
    ) : null;

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={segmentButton({ isSelected, size })}
      data-selected={isSelected}
      data-pressed={isPressed}
      data-focus-visible={isFocusVisible}
      aria-pressed={isSelected}
    >
      {option.num && <span className={segmentNum}>{option.num}</span>}
      {leadingIcon}
      {option.label}
    </button>
  );
}

SegmentedButton.displayName = "SegmentedButton";
