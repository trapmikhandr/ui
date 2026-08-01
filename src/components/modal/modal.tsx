import { type ReactNode, useRef } from "react";
import { useOverlayTrigger } from "react-aria";
import type { OverlayTriggerProps } from "react-stately";
import { useOverlayTriggerState } from "react-stately";
import { ModalClose } from "./close-modal";
import { ModalContent } from "./content-modal";
import { ModalContext } from "./context-modal";
import { ModalTitle } from "./title-modal";
import { ModalTrigger } from "./trigger-modal";

interface ModalProps extends OverlayTriggerProps {
  children: ReactNode;
}

function ModalRoot({ children, ...props }: ModalProps) {
  const state = useOverlayTriggerState(props);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { triggerProps } = useOverlayTrigger(
    { type: "dialog" },
    state,
    triggerRef,
  );

  const titleId = useRef(
    `modal-title-${Math.random().toString(36).slice(2)}`,
  ).current;

  return (
    <ModalContext.Provider
      value={{
        state,
        triggerRef,
        triggerProps,
        titleId,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}

export const Modal = Object.assign(ModalRoot, {
  Trigger: ModalTrigger,
  Content: ModalContent,
  Title: ModalTitle,
  Close: ModalClose,
});
