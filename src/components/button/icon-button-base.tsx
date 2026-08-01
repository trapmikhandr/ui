import type { RecipeVariants } from "@vanilla-extract/recipes";
import { clsx } from "clsx";
import {
  type ButtonHTMLAttributes,
  forwardRef,
  type PropsWithChildren,
} from "react";
import type { GroupedButtonPrivateProps } from "../button-group/button-group.types";
import { iconButton } from "./icon-button.css";

type IconButtonRecipe = NonNullable<RecipeVariants<typeof iconButton>>;

export type IconButtonPublicVariants = Omit<
  IconButtonRecipe,
  | "toggle"
  | "selected"
  | "widthMode"
  | "groupVariant"
  | "groupOrientation"
  | "groupSize"
  | "groupShape"
  | "groupPosition"
  | "groupInteraction"
>;

type IconButtonBaseDomProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof IconButtonPublicVariants | "children" | "color"
>;

export interface IconButtonBaseProps
  extends IconButtonBaseDomProps,
    PropsWithChildren,
    IconButtonPublicVariants,
    GroupedButtonPrivateProps {
  isChanging?: boolean;
  isPressed?: boolean;
  isSelected?: boolean;
  isToggle?: boolean;
  width?: IconButtonRecipe["widthMode"];
}

export const IconButtonBase = forwardRef<
  HTMLButtonElement,
  IconButtonBaseProps
>(
  (
    {
      children,
      className,
      isChanging = false,
      isPressed = false,
      isSelected = false,
      isToggle = false,
      variant = "standard",
      color = "neutral",
      size = "s",
      width = "default",
      shape = "round",
      __group,
      ...buttonProps
    },
    ref,
  ) => {
    return (
      <button
        {...buttonProps}
        ref={ref}
        className={clsx(
          iconButton({
            variant,
            color,
            size,
            widthMode: width,
            shape,
            toggle: isToggle,
            selected: isSelected,
            groupVariant: __group?.variant ?? "none",
            groupOrientation: __group?.orientation ?? "horizontal",
            groupSize: __group?.size ?? "m",
            groupShape: __group?.shape ?? "round",
            groupPosition: __group?.position ?? "only",
            groupInteraction: __group?.interaction ?? "idle",
          }),
          className,
        )}
        data-changing={isChanging}
        data-pressed={isPressed}
        data-selected={isSelected}
        data-group-interaction={__group?.interaction}
      >
        {children}
      </button>
    );
  },
);
