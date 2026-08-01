import { cloneElement, isValidElement, type ReactNode } from "react";
import { Button } from "../button";
import { useModalContext } from "./context-modal";

interface ModalTriggerProps {
  children: ReactNode;
}

export function ModalTrigger({ children }: ModalTriggerProps) {
  const { triggerProps, triggerRef } = useModalContext();

  if (isValidElement(children)) {
    return cloneElement(
      children as React.ReactElement<Record<string, unknown>>,
      {
        ...triggerProps,
        ref: triggerRef,
      },
    );
  }

  return (
    <Button {...triggerProps} ref={triggerRef}>
      {children}
    </Button>
  );
}
