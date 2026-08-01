import type { RecipeVariants } from "@vanilla-extract/recipes";
import { clsx } from "clsx";
import type { PropsWithChildren } from "react";
import * as styles from "./toolbar.css";

type ToolbarVariants = NonNullable<RecipeVariants<typeof styles.toolbar>>;

export interface ToolbarProps extends PropsWithChildren, ToolbarVariants {
  "aria-label": string;
  className?: string;
}

export function Toolbar({
  children,
  className,
  colorScheme = "standard",
  variant = "docked",
  orientation = "horizontal",
  rounded = false,
  "aria-label": ariaLabel,
}: ToolbarProps) {
  return (
    <div
      className={clsx(
        styles.toolbar({ colorScheme, variant, orientation, rounded }),
        className,
      )}
      role="toolbar"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}
