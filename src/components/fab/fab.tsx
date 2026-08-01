import type { RecipeVariants } from "@vanilla-extract/recipes";
import { clsx } from "clsx";
import type { ReactNode } from "react";
import { forwardRef } from "react";
import type { AriaButtonProps } from "react-aria";
import { useButton, useObjectRef } from "react-aria";
import { fab } from "./fab.css";

type FabRecipe = NonNullable<RecipeVariants<typeof fab>>;

export interface FabProps
  extends AriaButtonProps<"button">,
    Omit<FabRecipe, "extended"> {
  children: ReactNode;
  label?: string;
  className?: string;
  "aria-label": string;
}

export const Fab = forwardRef<HTMLButtonElement, FabProps>(
  (
    {
      children,
      label,
      color = "surface",
      size = "medium",
      lowered = false,
      className,
      "aria-label": ariaLabel,
      ...ariaProps
    },
    ref,
  ) => {
    const objRef = useObjectRef(ref);
    const { buttonProps, isPressed } = useButton(ariaProps, objRef);
    const extended = !!label;

    return (
      <button
        {...buttonProps}
        ref={objRef}
        className={clsx(fab({ color, size, extended, lowered }), className)}
        data-pressed={isPressed}
        aria-label={ariaLabel}
      >
        <span style={{ display: "flex", flexShrink: 0 }}>{children}</span>
        {label && <span>{label}</span>}
      </button>
    );
  },
);

Fab.displayName = "Fab";
