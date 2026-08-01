import { type PropsWithChildren, type ReactNode, useRef } from "react";
import type { AriaButtonProps } from "react-aria";
import { useButton, useToggleButtonGroupItem } from "react-aria";
import type { ToggleGroupState } from "react-stately";
import { ButtonBase, type ButtonPublicVariants } from "../button/button-base";
import {
  IconButtonBase,
  type IconButtonBaseProps,
  type IconButtonPublicVariants,
} from "../button/icon-button-base";
import { useButtonGroupContext } from "./button-group.context";
import type { ButtonGroupKey, ButtonGroupState } from "./button-group.types";

type PressHandler = AriaButtonProps<"button">["onPress"];

type ButtonGroupButtonVisualProps = ButtonPublicVariants & {
  className?: string;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
};

type IconButtonVisualProps = IconButtonPublicVariants & {
  className?: string;
  isChanging?: boolean;
  width?: IconButtonBaseProps["width"];
};

type WithGroupInjected = {
  __group?: ButtonGroupState;
};

export interface ButtonGroupButtonProps
  extends PropsWithChildren,
    ButtonGroupButtonVisualProps {
  id: ButtonGroupKey;
  "aria-label"?: string;
  isDisabled?: boolean;
  onPress?: PressHandler;
}

export interface ButtonGroupIconButtonProps
  extends PropsWithChildren,
    IconButtonVisualProps {
  id: ButtonGroupKey;
  "aria-label": string;
  isDisabled?: boolean;
  onPress?: PressHandler;
}

type ButtonGroupButtonAllProps = ButtonGroupButtonProps & WithGroupInjected;
type ButtonGroupIconButtonAllProps = ButtonGroupIconButtonProps &
  WithGroupInjected;

export function ButtonGroupButton(props: ButtonGroupButtonAllProps) {
  const { selectionMode } = useButtonGroupContext();

  if (selectionMode === "none") {
    return <ButtonGroupActionButton {...props} />;
  }

  return <ButtonGroupSelectableButton {...props} />;
}

function ButtonGroupActionButton({
  id,
  __group,
  isDisabled,
  onPress,
  "aria-label": ariaLabel,
  ...props
}: ButtonGroupButtonAllProps) {
  const context = useButtonGroupContext();
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(
    {
      isDisabled,
      "aria-label": ariaLabel,
      onPress: (event) => {
        onPress?.(event);
        context.onAction?.(id);
      },
    },
    ref,
  );
  const { color: _color, ...cleanButtonProps } =
    buttonProps as typeof buttonProps & { color?: string };

  return (
    <ButtonBase
      {...props}
      {...cleanButtonProps}
      aria-label={ariaLabel}
      ref={ref}
      isPressed={isPressed}
      isSelected={false}
      isToggle={false}
      __group={__group}
    />
  );
}

function ButtonGroupSelectableButton({
  __group,
  id,
  isDisabled,
  onPress,
  "aria-label": ariaLabel,
  ...props
}: ButtonGroupButtonAllProps) {
  const context = useButtonGroupContext();
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed, isSelected } = useToggleButtonGroupItem(
    {
      id,
      isDisabled,
      "aria-label": ariaLabel,
      onPress: (event) => {
        onPress?.(event);
        context.onAction?.(id);
      },
    },
    context.state as ToggleGroupState,
    ref,
  );
  const { color: _color, ...cleanButtonProps } =
    buttonProps as typeof buttonProps & { color?: string };

  return (
    <ButtonBase
      {...props}
      {...cleanButtonProps}
      aria-label={ariaLabel}
      ref={ref}
      isPressed={isPressed}
      isSelected={isSelected}
      isToggle
      __group={__group}
    />
  );
}

export function ButtonGroupIconButton(props: ButtonGroupIconButtonAllProps) {
  const { selectionMode } = useButtonGroupContext();

  if (selectionMode === "none") {
    return <ButtonGroupActionIconButton {...props} />;
  }

  return <ButtonGroupSelectableIconButton {...props} />;
}

function ButtonGroupActionIconButton({
  id,
  __group,
  isDisabled,
  onPress,
  "aria-label": ariaLabel,
  ...props
}: ButtonGroupIconButtonAllProps) {
  const context = useButtonGroupContext();
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton(
    {
      isDisabled,
      "aria-label": ariaLabel,
      onPress: (event) => {
        onPress?.(event);
        context.onAction?.(id);
      },
    },
    ref,
  );
  const { color: _color, ...cleanButtonProps } =
    buttonProps as typeof buttonProps & { color?: string };

  return (
    <IconButtonBase
      {...props}
      {...cleanButtonProps}
      aria-label={ariaLabel}
      ref={ref}
      isPressed={isPressed}
      isSelected={false}
      isToggle={false}
      __group={__group}
    />
  );
}

function ButtonGroupSelectableIconButton({
  __group,
  id,
  isDisabled,
  onPress,
  "aria-label": ariaLabel,
  ...props
}: ButtonGroupIconButtonAllProps) {
  const context = useButtonGroupContext();
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed, isSelected } = useToggleButtonGroupItem(
    {
      id,
      isDisabled,
      "aria-label": ariaLabel,
      onPress: (event) => {
        onPress?.(event);
        context.onAction?.(id);
      },
    },
    context.state as ToggleGroupState,
    ref,
  );
  const { color: _color, ...cleanButtonProps } =
    buttonProps as typeof buttonProps & { color?: string };

  return (
    <IconButtonBase
      {...props}
      {...cleanButtonProps}
      aria-label={ariaLabel}
      ref={ref}
      isPressed={isPressed}
      isSelected={isSelected}
      isToggle
      __group={__group}
    />
  );
}
