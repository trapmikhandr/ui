import { forwardRef, type PropsWithChildren } from "react";
import type { AriaToggleButtonProps } from "react-aria";
import { useObjectRef, useToggleButton } from "react-aria";
import { useToggleState } from "react-stately";
import type { GroupedButtonPrivateProps } from "../button-group/button-group.types";
import {
  IconButtonBase,
  type IconButtonBaseProps,
  type IconButtonPublicVariants,
} from "./icon-button-base";

export interface IconButtonProps
  extends Omit<
      AriaToggleButtonProps<"button">,
      keyof IconButtonPublicVariants | "children" | "color"
    >,
    PropsWithChildren,
    IconButtonPublicVariants,
    GroupedButtonPrivateProps {
  className?: string;
  isChanging?: boolean;
  "aria-label": string;
  toggle?: boolean;
  width?: IconButtonBaseProps["width"];
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      children,
      toggle = false,
      isChanging,
      isDisabled,
      isSelected: _isSelected,
      defaultSelected: _defaultSelected,
      onChange: _onChange,
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
    const toggleProps = {
      onPress,
      onPressStart,
      onPressEnd,
      onPressChange,
      onPressUp,
      preventFocusOnPress,
      ...props,
      isDisabled,
      isSelected: _isSelected,
      defaultSelected: _defaultSelected,
      onChange: _onChange,
    };
    const toggleState = useToggleState(toggleProps);
    const { buttonProps: rawButtonProps, isPressed } = useToggleButton(
      toggleProps,
      toggleState,
      objRef,
    );

    const isToggle =
      toggle ||
      _isSelected !== undefined ||
      _defaultSelected !== undefined ||
      _onChange !== undefined;
    const buttonProps = isToggle
      ? rawButtonProps
      : { ...rawButtonProps, "aria-pressed": undefined };
    const { color: _buttonColor, ...cleanButtonProps } =
      buttonProps as typeof buttonProps & {
        color?: string;
      };
    const isSelected = isToggle ? toggleState.isSelected : false;

    return (
      <IconButtonBase
        {...props}
        {...cleanButtonProps}
        ref={objRef}
        isChanging={isChanging}
        isPressed={isPressed}
        isSelected={isSelected}
        isToggle={isToggle}
        __group={__group}
      >
        {children}
      </IconButtonBase>
    );
  },
);
