import { ChevronDown } from "lucide-react";
import { forwardRef, type PropsWithChildren, type ReactNode } from "react";
import type { AriaButtonProps } from "react-aria";
import { useButton, useObjectRef } from "react-aria";
import { Icon } from "../icon";
import {
  triggerSelect,
  triggerSelectContent,
  triggerSelectIcon,
  triggerSelectValue,
} from "./trigger-select.css";

export type TriggerSelectVariants = NonNullable<
  Parameters<typeof triggerSelect>[0]
>;

export interface TriggerSelectProps
  extends AriaButtonProps<"button">,
    PropsWithChildren,
    TriggerSelectVariants {
  /**
   * Whether select is open (for icon animation).
   */
  isOpen?: boolean;
  /**
   * Custom icon (ChevronDown by default).
   */
  icon?: ReactNode;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * Whether data is loading.
   */
  isLoading?: boolean;
}

/**
 * SelectTrigger - specialized button for the Select component.
 *
 * Differences from a regular Button:
 * - justifyContent: space-between (text left, icon right).
 * - Icon rotation animation when opened.
 * - Styles match the M3 Filled/Outlined Text Field.
 * - Supports the isInvalid state.
 */
export const TriggerSelect = forwardRef<HTMLButtonElement, TriggerSelectProps>(
  (
    {
      children,
      icon,
      className,
      variant = "outlined",
      size = "medium",
      isInvalid,
      isOpen = false,
      isLoading = false,
      ...ariaProps
    },
    ref,
  ) => {
    const objRef = useObjectRef(ref);
    const { buttonProps } = useButton(ariaProps, objRef);

    return (
      <button
        {...buttonProps}
        ref={objRef}
        className={triggerSelect({
          variant,
          size,
          isInvalid,
          isOpen,
        })}
        data-open={isOpen}
      >
        <div className={triggerSelectContent}>
          <span className={triggerSelectValue}>{children}</span>
          <span className={triggerSelectIcon} aria-hidden>
            {icon || <Icon icon={ChevronDown} />}
          </span>
        </div>
      </button>
    );
  },
);

TriggerSelect.displayName = "SelectTrigger";
