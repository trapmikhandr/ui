import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";
import {
  forwardRef,
  type InputHTMLAttributes,
  type RefObject,
  useRef,
} from "react";
import type { AriaButtonProps } from "react-aria";
import { useButton } from "react-aria";
import { Icon } from "../icon";
import {
  triggerCombobox,
  triggerComboboxIcon,
  triggerComboboxInput,
} from "./trigger-combobox.css";

export type TriggerComboboxVariants = NonNullable<
  Parameters<typeof triggerCombobox>[0]
>;

export interface TriggerComboboxProps extends TriggerComboboxVariants {
  inputProps: InputHTMLAttributes<HTMLInputElement>;
  inputRef: RefObject<HTMLInputElement | null>;
  buttonProps: AriaButtonProps;
  isOpen?: boolean;
  isDisabled?: boolean;
  className?: string;
}

/**
 * TriggerCombobox - Combobox field (input + arrow toggle button).
 *
 * Unlike TriggerSelect (which is a complete button), focus lives on the <input>,
 * so the wrapper uses :focus-within instead of :focus-visible.
 */
export const TriggerCombobox = forwardRef<HTMLDivElement, TriggerComboboxProps>(
  (
    {
      inputProps,
      inputRef,
      buttonProps,
      className,
      variant = "outlined",
      size = "medium",
      isInvalid,
      isOpen = false,
      isDisabled = false,
    },
    ref,
  ) => {
    const toggleRef = useRef<HTMLButtonElement>(null);
    const { buttonProps: cleanToggleProps } = useButton(
      { ...buttonProps, isDisabled },
      toggleRef,
    );

    return (
      <div
        ref={ref}
        className={clsx(
          triggerCombobox({ variant, size, isInvalid }),
          className,
        )}
        data-open={isOpen}
      >
        <input
          {...inputProps}
          ref={inputRef}
          disabled={isDisabled}
          className={triggerComboboxInput()}
        />
        <button
          {...cleanToggleProps}
          ref={toggleRef}
          type="button"
          className={triggerComboboxIcon}
        >
          <Icon icon={ChevronDown} />
        </button>
      </div>
    );
  },
);

TriggerCombobox.displayName = "TriggerCombobox";
