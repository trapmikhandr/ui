import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import { useButton } from "react-aria";
import { Popover } from "../popover";
import { useMenuContext } from "./context-menu";

interface TriggerMenuProps {
  children: ReactNode;
}

export function TriggerMenu({ children }: TriggerMenuProps) {
  const { menuTriggerProps, triggerRef } = useMenuContext();

  if (isValidElement(children)) {
    return (
      <Popover.Trigger>
        <NativeTriggerElement
          child={children as ReactElement<Record<string, unknown>>}
          menuTriggerProps={menuTriggerProps}
          triggerRef={triggerRef}
        />
      </Popover.Trigger>
    );
  }

  return (
    <Popover.Trigger>
      <NativeTriggerElement
        menuTriggerProps={menuTriggerProps}
        triggerRef={triggerRef}
      >
        {children}
      </NativeTriggerElement>
    </Popover.Trigger>
  );
}

interface NativeTriggerElementProps {
  child?: ReactElement<Record<string, unknown>>;
  children?: ReactNode;
  menuTriggerProps: ReturnType<typeof useMenuContext>["menuTriggerProps"];
  triggerRef: ReturnType<typeof useMenuContext>["triggerRef"];
}

function NativeTriggerElement({
  child,
  children,
  menuTriggerProps,
  triggerRef,
}: NativeTriggerElementProps) {
  const childProps = child?.props ?? {};
  const { buttonProps } = useButton(
    {
      ...childProps,
      ...menuTriggerProps,
    },
    triggerRef,
  );

  if (child) {
    // biome-ignore lint/suspicious/noExplicitAny: cloneElement ref types are broken in React 19
    return cloneElement(child as ReactElement<any>, {
      ...buttonProps,
      ref: triggerRef,
    });
  }

  return (
    <button {...buttonProps} ref={triggerRef}>
      {children}
    </button>
  );
}
