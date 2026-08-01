import { forwardRef, type PropsWithChildren, type ReactNode } from "react";
import type { AriaButtonProps } from "react-aria";
import { useButton, useObjectRef } from "react-aria";
import type { GroupedButtonPrivateProps } from "../button-group/button-group.types";
import { ButtonBase, type ButtonPublicVariants } from "./button-base";

export type { ButtonPublicVariants as ButtonVariants } from "./button-base";

// A regular button is not a toggle button: in M3, toggles for non-icon
// buttons exist only inside ButtonGroup (see button-group-items.tsx) or
// in a segmented button. An icon toggle button is a separate pattern (icon-button.tsx).
export interface ButtonProps
  extends Omit<
      AriaButtonProps<"button">,
      keyof ButtonPublicVariants | "children" | "color"
    >,
    PropsWithChildren,
    ButtonPublicVariants,
    GroupedButtonPrivateProps {
  isLoading?: boolean;
  isDisabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  className?: string;
  asChild?: boolean;
  type?: "button" | "submit" | "reset";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      isLoading,
      isDisabled,
      __group,
      onPress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
      preventFocusOnPress,
      ...props
    },
    ref,
  ) => {
    const objRef = useObjectRef(ref);
    const { buttonProps, isPressed } = useButton(
      {
        onPress,
        onPressStart,
        onPressEnd,
        onPressChange,
        onPressUp,
        preventFocusOnPress,
        ...props,
        isDisabled,
      },
      objRef,
    );
    const { color: _buttonColor, ...cleanButtonProps } =
      buttonProps as typeof buttonProps & { color?: string };

    return (
      <ButtonBase
        {...props}
        {...cleanButtonProps}
        ref={objRef}
        isLoading={isLoading}
        isPressed={isPressed}
        __group={__group}
      />
    );
  },
);
