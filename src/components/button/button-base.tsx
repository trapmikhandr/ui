import { clsx } from "clsx";
import { Loader } from "lucide-react";
import {
  type ButtonHTMLAttributes,
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  type PropsWithChildren,
  type ReactNode,
} from "react";
import { mergeProps } from "react-aria";
import type { GroupedButtonPrivateProps } from "../button-group/button-group.types";
import { Icon } from "../icon";
import {
  button,
  buttonContent,
  buttonIcon,
  buttonIconOverlay,
  buttonTextHidden,
} from "./button.css";

export type ButtonVariants = NonNullable<Parameters<typeof button>[0]>;
export type ButtonPublicVariants = Omit<
  ButtonVariants,
  | "groupVariant"
  | "groupOrientation"
  | "groupSize"
  | "groupShape"
  | "groupPosition"
  | "groupInteraction"
  | "toggle"
  | "selected"
>;

type ButtonBaseDomProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  keyof ButtonPublicVariants | "children" | "color"
>;

export interface ButtonBaseProps
  extends ButtonBaseDomProps,
    PropsWithChildren,
    ButtonPublicVariants,
    GroupedButtonPrivateProps {
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  asChild?: boolean;
  isPressed?: boolean;
  isSelected?: boolean;
  isToggle?: boolean;
}

export const ButtonBase = forwardRef<HTMLButtonElement, ButtonBaseProps>(
  (
    {
      children,
      leftIcon,
      rightIcon,
      className,
      variant = "filled",
      color,
      size = "s",
      shape = "round",
      fullWidth,
      isLoading,
      asChild = false,
      isPressed = false,
      isSelected = false,
      isToggle = false,
      __group,
      ...buttonProps
    },
    ref,
  ) => {
    const resolvedColor =
      color ?? (variant === "tonal" ? "secondary" : "primary");
    const hasIcons = leftIcon || rightIcon;

    const loaderIcon = () => <Icon spinning={isLoading} icon={Loader} />;

    const buttonClassName = clsx(
      button({
        variant,
        color: resolvedColor,
        size,
        shape,
        toggle: isToggle,
        selected: isSelected,
        fullWidth,
        isLoading,
        groupVariant: __group?.variant ?? "none",
        groupOrientation: __group?.orientation ?? "horizontal",
        groupSize: __group?.size ?? "m",
        groupShape: __group?.shape ?? "round",
        groupPosition: __group?.position ?? "only",
        groupInteraction: __group?.interaction ?? "idle",
      }),
      className,
    );

    const content = (
      <div className={buttonContent}>
        {leftIcon && (
          <span className={buttonIcon} aria-hidden>
            {isLoading ? loaderIcon() : leftIcon}
          </span>
        )}

        {children && (
          <span
            className={isLoading && !hasIcons ? buttonTextHidden : undefined}
          >
            {children}
          </span>
        )}

        {rightIcon && (
          <span className={buttonIcon} aria-hidden>
            {isLoading ? loaderIcon() : rightIcon}
          </span>
        )}

        {isLoading && !hasIcons && (
          <span className={buttonIconOverlay} aria-hidden>
            {loaderIcon()}
          </span>
        )}
      </div>
    );

    const dataProps = {
      "data-pressed": isPressed,
      "data-selected": isSelected,
      "data-loading": isLoading,
      "data-group-interaction": __group?.interaction,
    };

    if (asChild) {
      const child = Children.only(children);

      if (isValidElement<React.HTMLAttributes<HTMLElement>>(child)) {
        const mergedProps = mergeProps(buttonProps, child.props, {
          ...dataProps,
          className: clsx(buttonClassName, child.props.className),
        });

        return cloneElement(child, mergedProps, child.props.children);
      }
    }

    return (
      <button
        {...buttonProps}
        {...dataProps}
        ref={ref}
        className={buttonClassName}
        disabled={buttonProps.disabled}
      >
        {content}
      </button>
    );
  },
);
