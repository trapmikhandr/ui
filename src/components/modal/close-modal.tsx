import { cloneElement, isValidElement, type ReactNode } from "react";
import { Button } from "../button";
import { useModalContext } from "./context-modal";

interface ModalCloseProps {
  children: ReactNode;
}

export function ModalClose({ children }: ModalCloseProps) {
  const { state } = useModalContext();

  if (isValidElement(children)) {
    return cloneElement(
      children as React.ReactElement<Record<string, unknown>>,
      {
        onPress: state.close,
        onClick: state.close,
      },
    );
  }

  return <Button onPress={state.close}>{children}</Button>;
}
