import type { RecipeVariants } from "@vanilla-extract/recipes";
import { clsx } from "clsx";
import { type ReactNode, useRef } from "react";
import { mergeProps, useButton, useFocusRing } from "react-aria";
import * as styles from "./list-item.css";

type ItemVariants = NonNullable<RecipeVariants<typeof styles.item>>;
type AvatarVariants = NonNullable<RecipeVariants<typeof styles.avatarSlot>>;

export interface ListItemProps {
  leading?: ReactNode;
  headline: ReactNode;
  supporting?: ReactNode;
  trailing?: ReactNode;
  onPress?: () => void;
  isDisabled?: boolean;
  variant?: ItemVariants["variant"];
  context?: ItemVariants["context"];
  className?: string;
}

export interface ListItemIconProps {
  children: ReactNode;
  className?: string;
}

export interface ListItemAvatarProps {
  children: ReactNode;
  tone?: AvatarVariants["tone"];
  className?: string;
}

// 24dp leading icon slot — on-surface-variant, no background per M3 spec
function ListItemIcon({ children, className }: ListItemIconProps) {
  return <div className={clsx(styles.iconSlot, className)}>{children}</div>;
}

// 40dp circular avatar slot — primary-container bg per M3 spec
function ListItemAvatar({
  children,
  tone = "primary",
  className,
}: ListItemAvatarProps) {
  return (
    <div className={clsx(styles.avatarSlot({ tone }), className)}>
      {children}
    </div>
  );
}

function ListItemRoot({
  leading,
  headline,
  supporting,
  trailing,
  onPress,
  isDisabled = false,
  variant = "card",
  context = "page",
  className,
}: ListItemProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps, isPressed } = useButton({ onPress, isDisabled }, ref);
  const { focusProps, isFocusVisible } = useFocusRing();

  const isInteractive = !!onPress;
  const itemClass = clsx(
    styles.item({ variant, context, isInteractive }),
    className,
  );

  const inner = (
    <>
      {leading && <div className={styles.leading}>{leading}</div>}
      <div className={styles.content}>
        <div className={styles.headlineText}>{headline}</div>
        {supporting && (
          <div className={styles.supportingText}>{supporting}</div>
        )}
      </div>
      {trailing && <div className={styles.trailing}>{trailing}</div>}
    </>
  );

  if (isInteractive) {
    return (
      <button
        {...mergeProps(buttonProps, focusProps)}
        ref={ref}
        className={itemClass}
        data-pressed={isPressed}
        data-focus-visible={isFocusVisible}
      >
        {inner}
      </button>
    );
  }

  return <div className={itemClass}>{inner}</div>;
}

export const ListItem = Object.assign(ListItemRoot, {
  Icon: ListItemIcon,
  Avatar: ListItemAvatar,
});
