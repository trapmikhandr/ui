import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react";
import { type ReactNode, useRef } from "react";
import type { AriaDialogProps } from "react-aria";
import {
  DismissButton,
  FocusScope,
  Overlay,
  useDialog,
  useModalOverlay,
} from "react-aria";
import { omitMotionConflictHandlers } from "@/shared/utils";
import * as styles from "./content-modal.css";
import { useModalContext } from "./context-modal";

interface ModalContentProps extends AriaDialogProps {
  children: ReactNode;
}

// M3 dialog enter/exit: fade + scale, matches Sheet's easing family
const TRANSITION_DURATION_S = 0.2;
const DIALOG_ENTER_SCALE = 0.9;

export function ModalContent(props: ModalContentProps) {
  const { state } = useModalContext();

  return (
    // domAnimation is enough here — unlike Sheet, dialogs don't drag, so the
    // heavier domMax (drag + layout) feature bundle isn't needed.
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {state.isOpen && <ModalContentInner {...props} />}
      </AnimatePresence>
    </LazyMotion>
  );
}

function ModalContentInner({ children, ...props }: ModalContentProps) {
  const { state, titleId } = useModalContext();
  const modalRef = useRef<HTMLDivElement>(null);

  const { modalProps, underlayProps } = useModalOverlay(
    { isDismissable: true },
    state,
    modalRef,
  );

  const { dialogProps } = useDialog(
    { ...props, "aria-labelledby": titleId },
    modalRef,
  );

  const safeUnderlayProps = omitMotionConflictHandlers(underlayProps);
  const safeModalProps = omitMotionConflictHandlers(modalProps);
  const safeDialogProps = omitMotionConflictHandlers(dialogProps);

  return (
    <Overlay>
      <m.div
        {...safeUnderlayProps}
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { duration: TRANSITION_DURATION_S },
        }}
        exit={{ opacity: 0, transition: { duration: TRANSITION_DURATION_S } }}
      >
        <FocusScope contain restoreFocus autoFocus>
          <m.div
            {...safeModalProps}
            {...safeDialogProps}
            ref={modalRef}
            className={styles.modal}
            initial={{ opacity: 0, scale: DIALOG_ENTER_SCALE }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: TRANSITION_DURATION_S },
            }}
            exit={{
              opacity: 0,
              scale: DIALOG_ENTER_SCALE,
              transition: { duration: TRANSITION_DURATION_S },
            }}
          >
            <DismissButton onDismiss={state.close} />
            {children}
            <DismissButton onDismiss={state.close} />
          </m.div>
        </FocusScope>
      </m.div>
    </Overlay>
  );
}
