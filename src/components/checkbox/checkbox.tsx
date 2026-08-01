/**
 * Checkbox.tsx - Checkbox component.
 *
 * Uses:
 * - React Aria for accessibility.
 * - vanilla-extract for styling (M3).
 * - CSS variables for theming.
 *
 * @example
 * ```tsx
 * // Basic usage.
 * <Checkbox>I agree to the terms</Checkbox>
 *
 * // Controlled
 * <Checkbox isSelected={checked} onChange={setChecked}>
 *   Subscribe to the newsletter
 * </Checkbox>
 *
 * // With a description.
 * <Checkbox description="We will send important updates">
 *   Receive notifications
 * </Checkbox>
 *
 * // Indeterminate (partially selected).
 * <Checkbox isIndeterminate>
 *   Select all (3/5)
 * </Checkbox>
 *
 * // With an error.
 * <Checkbox isInvalid>
 *   Required field
 * </Checkbox>
 * ```
 */

// For convenient class merging (template strings are an alternative if this library is unavailable).
import { clsx } from "clsx";
import { Check, Minus } from "lucide-react";
import { forwardRef, type ReactNode } from "react";
import type { AriaCheckboxProps } from "react-aria";
import {
  mergeProps,
  useCheckbox,
  useFocusRing,
  useObjectRef,
  VisuallyHidden,
} from "react-aria";
import { useToggleState } from "react-stately";

// ! Fixed import (added the .ts extension).
import * as styles from "./checkbox.css";

export interface CheckboxProps extends AriaCheckboxProps {
  children?: ReactNode;
  description?: ReactNode;
  className?: string;
  isInvalid?: boolean;
  size?: "small" | "medium" | "large";
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (props, ref) => {
    const {
      children,
      description,
      className, // Extracted above, now apply it.
      isInvalid,
      size = "medium",
      ...ariaProps
    } = props;

    const inputRef = useObjectRef(ref);
    const state = useToggleState(ariaProps);
    const { inputProps } = useCheckbox(
      { ...ariaProps, children },
      state,
      inputRef,
    );
    const { isFocusVisible, focusProps } = useFocusRing();

    const isChecked = state.isSelected;
    const isIndeterminate = ariaProps.isIndeterminate;
    const isDisabled = ariaProps.isDisabled;

    const iconSizes = {
      small: 12,
      medium: 14,
      large: 16,
    };
    const iconSize = iconSizes[size];

    return (
      <label
        className={clsx(styles.checkboxContainer, className)}
        data-checked={isChecked}
        data-indeterminate={isIndeterminate}
        data-disabled={isDisabled}
        data-focus-visible={isFocusVisible}
      >
        <VisuallyHidden>
          <input
            {...mergeProps(inputProps, focusProps)}
            ref={inputRef}
            className={styles.checkboxInput}
          />
        </VisuallyHidden>

        <span
          className={styles.checkboxBox({ error: isInvalid })}
          aria-hidden="true"
        >
          <span
            className={styles.checkboxIcon()}
            data-checked={isChecked || undefined}
            data-indeterminate={isIndeterminate || undefined}
          >
            {isIndeterminate ? (
              <Minus strokeWidth={3} size={iconSize} />
            ) : (
              <Check strokeWidth={3} size={iconSize} />
            )}
          </span>
        </span>

        {(children || description) && (
          <span className={styles.checkboxContent}>
            {children && (
              <span className={styles.checkboxLabel}>{children}</span>
            )}
            {description && (
              <span className={styles.checkboxDescription}>{description}</span>
            )}
          </span>
        )}
      </label>
    );
  },
);
