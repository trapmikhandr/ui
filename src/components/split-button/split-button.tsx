import type { RecipeVariants } from "@vanilla-extract/recipes";
import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import type { AriaButtonProps } from "react-aria";
import { useButton, useInteractOutside, useObjectRef } from "react-aria";
import {
  splitChevron,
  splitDivider,
  splitDropdown,
  splitDropdownItem,
  splitMain,
  splitRoot,
} from "./split-button.css";

type SplitVariant = NonNullable<RecipeVariants<typeof splitMain>>["variant"];
type SplitColor = NonNullable<RecipeVariants<typeof splitRoot>>["color"];

export interface SplitButtonOption {
  label: string;
  onSelect: () => void;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface SplitButtonProps
  extends Omit<AriaButtonProps<"button">, "children"> {
  label: string;
  leftIcon?: ReactNode;
  options: SplitButtonOption[];
  variant?: SplitVariant;
  color?: SplitColor;
  className?: string;
  "aria-label"?: string;
}

export function SplitButton({
  label,
  leftIcon,
  options,
  variant = "filled",
  color = "primary",
  className,
  "aria-label": ariaLabel,
  ...ariaProps
}: SplitButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const mainRef = useObjectRef<HTMLButtonElement>(null);
  const chevronRef = useObjectRef<HTMLButtonElement>(null);

  useInteractOutside({
    ref: containerRef,
    onInteractOutside: () => setIsOpen(false),
  });

  const { buttonProps: mainProps } = useButton(ariaProps, mainRef);
  const { buttonProps: chevronProps } = useButton(
    {
      onPress: () => setIsOpen((v) => !v),
      "aria-label": "More options",
      "aria-expanded": isOpen,
    },
    chevronRef,
  );

  return (
    <div
      ref={containerRef}
      className={clsx(splitRoot({ color }), className)}
      style={{ position: "relative" }}
    >
      <button
        {...mainProps}
        ref={mainRef}
        className={splitMain({ variant })}
        aria-label={ariaLabel ?? label}
      >
        {leftIcon && (
          <span style={{ display: "flex" }} aria-hidden>
            {leftIcon}
          </span>
        )}
        {label}
      </button>

      <div className={splitDivider({ variant })} aria-hidden />

      <button
        {...chevronProps}
        ref={chevronRef}
        className={splitChevron({ variant })}
      >
        <ChevronDown
          size={18}
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </button>

      {isOpen && (
        <div className={splitDropdown} role="menu">
          {options.map((option) => (
            <div key={option.label} role="none">
              <button
                type="button"
                role="menuitem"
                className={splitDropdownItem}
                disabled={option.disabled}
                onClick={() => {
                  option.onSelect();
                  setIsOpen(false);
                }}
              >
                {option.icon && (
                  <span
                    style={{ display: "flex", marginRight: "8px" }}
                    aria-hidden
                  >
                    {option.icon}
                  </span>
                )}
                {option.label}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
