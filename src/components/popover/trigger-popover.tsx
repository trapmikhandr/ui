import { cloneElement, type ReactElement } from "react";
import { useButton } from "react-aria";
import { usePopoverContext } from "./context-popover";

interface PopoverTriggerProps {
  children: ReactElement;
}

export function TriggerPopover({ children }: PopoverTriggerProps) {
  const { triggerProps, triggerRef } = usePopoverContext();
  const childProps = children.props as Record<string, unknown>;
  const { buttonProps } = useButton(
    {
      ...childProps,
      ...triggerProps,
    },
    triggerRef,
  );

  // biome-ignore lint/suspicious/noExplicitAny: cloneElement ref types are broken in React 19
  return cloneElement(children as ReactElement<any>, {
    ...buttonProps,
    ref: triggerRef,
  });
}
