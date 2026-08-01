import type { RecipeVariants } from "@vanilla-extract/recipes";
import { clsx } from "clsx";
import type { HTMLAttributes, ReactNode } from "react";
import { badgeRecipe } from "./badge.css";

type BadgeRecipeVariants = NonNullable<RecipeVariants<typeof badgeRecipe>>;

export interface BadgeProps
  extends BadgeRecipeVariants,
    Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
  children: ReactNode;
  className?: string;
}

export function Badge({
  children,
  className,
  color = "default",
  size = "medium",
  ...props
}: BadgeProps) {
  return (
    <span className={clsx(badgeRecipe({ color, size }), className)} {...props}>
      {children}
    </span>
  );
}
