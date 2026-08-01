import { createContext, type RefObject, useContext } from "react";
import type { useOverlayTrigger } from "react-aria";
import type { useOverlayTriggerState } from "react-stately";

interface ModalContextValue {
  state: ReturnType<typeof useOverlayTriggerState>;
  triggerRef: RefObject<HTMLButtonElement | null>;
  triggerProps: ReturnType<typeof useOverlayTrigger>["triggerProps"];
  titleId: string;
}

export const ModalContext = createContext<ModalContextValue | null>(null);

export function useModalContext() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within <Modal>");
  }
  return context;
}
