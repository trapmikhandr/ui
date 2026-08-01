import { clsx } from "clsx";
import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { useField } from "react-aria";
import { Text } from "../text";
import * as styles from "./input.css";

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  errorMessage?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;

  // M3 has filled and outlined variants; start with one variant.
  variant?: "outlined";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      errorMessage,
      helperText,
      leftIcon,
      rightIcon,
      className,
      id,
      disabled,
      value,
      ...props
    },
    ref,
  ) => {
    const reservesErrorSpace = Boolean(errorMessage || helperText);
    const { labelProps, fieldProps, descriptionProps, errorMessageProps } =
      useField({
        id,
        label,
        description: helperText,
        errorMessage,
        isInvalid: !!errorMessage,
      });

    return (
      <div
        className={clsx(
          styles.container,
          reservesErrorSpace && styles.comboboxError,
          className,
        )}
      >
        {/* Label */}
        {label && (
          // biome-ignore lint/a11y/noLabelWithoutControl: React Aria connects label via labelProps
          <label {...labelProps} className={styles.labelStyle}>
            {label}
          </label>
        )}

        <div style={{ position: "relative" }}>
          {/* Left Icon */}
          {leftIcon && (
            <div className={styles.iconContainer({ position: "left" })}>
              {leftIcon}
            </div>
          )}

          {/* Input Field */}
          <input
            ref={ref}
            disabled={disabled}
            className={styles.inputRecipe({
              error: !!errorMessage,
              hasLeftIcon: !!leftIcon,
              hasRightIcon: !!rightIcon,
            })}
            // A11y
            aria-invalid={!!errorMessage}
            value={value === null ? "" : value}
            {...fieldProps}
            {...props}
          />

          {/* Right Icon */}
          {rightIcon && (
            <div className={styles.iconContainer({ position: "right" })}>
              {rightIcon}
            </div>
          )}
        </div>

        {/* Support Text (Error or Helper) */}
        {(errorMessage || helperText) && (
          <div className={styles.supportTextStyle}>
            <Text
              as="span"
              variant="labelSmall"
              color={errorMessage ? "error" : "primary"}
              role={errorMessage ? "alert" : undefined}
              {...(errorMessage ? errorMessageProps : descriptionProps)}
            >
              {errorMessage || helperText}
            </Text>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
