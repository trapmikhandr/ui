import type { ReactNode } from "react";
import { useRef } from "react";
import { mergeProps, useButton, useFocusRing } from "react-aria";
import { tab, tabIcon, tabIndicator, tabList, tabListBorder } from "./tabs.css";

export type TabVariant = "primary" | "secondary";

export interface TabOption<T extends string = string> {
  value: T;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps<T extends string = string> {
  options: TabOption<T>[];
  value: T;
  onChange: (value: T) => void;
  variant?: TabVariant;
  "aria-label"?: string;
}

interface TabItemProps<T extends string> {
  option: TabOption<T>;
  isActive: boolean;
  variant: TabVariant;
  onChange: (value: T) => void;
}

function TabItem<T extends string>({
  option,
  isActive,
  variant,
  onChange,
}: TabItemProps<T>) {
  const ref = useRef<HTMLButtonElement>(null);
  const { buttonProps } = useButton(
    {
      onPress: () => onChange(option.value),
      isDisabled: option.disabled,
      // children: option.label
    },
    ref,
  );
  const { focusProps } = useFocusRing();

  return (
    <button
      {...mergeProps(buttonProps, focusProps)}
      ref={ref}
      className={tab({ variant, isActive })}
      aria-selected={isActive}
      role="tab"
    >
      {variant === "primary" && option.icon && (
        <span className={tabIcon({ isActive })}>{option.icon}</span>
      )}
      <span>{option.label}</span>
      <span className={tabIndicator({ variant, isActive })} />
    </button>
  );
}

export function Tabs<T extends string = string>({
  options,
  value,
  onChange,
  variant = "secondary",
  "aria-label": ariaLabel,
}: TabsProps<T>) {
  return (
    <div role="tablist" aria-label={ariaLabel} className={tabList}>
      <div className={tabListBorder} />
      {options.map((option) => (
        <TabItem
          key={option.value}
          option={option}
          isActive={option.value === value}
          variant={variant}
          onChange={onChange}
        />
      ))}
    </div>
  );
}

Tabs.displayName = "Tabs";
