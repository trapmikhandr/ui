import { AnimatePresence, domAnimation, LazyMotion, m } from "motion/react";
import { type PropsWithChildren, type RefObject, useRef } from "react";
import { DismissButton, Overlay, usePopover } from "react-aria";
import { omitMotionConflictHandlers } from "@/shared/utils";
import { ArrowPopover } from "./arrow-popover";
import * as styles from "./content-popover.css";
import { usePopoverContext } from "./context-popover";

// M3 menu/popover enter/exit: fade + scale, same family as Modal/Sheet
const TRANSITION_DURATION_S = 0.15;
const POPOVER_ENTER_SCALE = 0.95;

// ============================================
// POPOVER CONTENT
// ============================================

type ContentPopoverProps = PropsWithChildren & {
  /**
   * Removes all container styles (padding, background, border, shadow).
   * Use when the content already contains a styled component (for example ListBox).
   */
  unstyled?: boolean;
  /**
   * External ref for the popover element, needed when an outside hook (for example useComboBox)
   * also needs this DOM node for positioning or focus.
   */
  popoverRef?: RefObject<HTMLDivElement | null>;
  /**
   * Non-modal mode is for popovers where focus remains outside (Combobox:
   * focus stays in the input while the list is displayed). Removes the underlay
   * (which would cover the input and consume clicks), page scroll lock, and
   * modal focus management that would pull the cursor out of the input.
   */
  isNonModal?: boolean;
};

export function ContentPopover(props: ContentPopoverProps) {
  const { state } = usePopoverContext();

  return (
    // domAnimation — the popover is not dragged, so the heavier domMax is unnecessary.
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {state.isOpen && <ContentPopoverInner {...props} />}
      </AnimatePresence>
    </LazyMotion>
  );
}

function ContentPopoverInner({
  children,
  unstyled = false,
  isNonModal = false,
  popoverRef: externalPopoverRef,
}: ContentPopoverProps) {
  const {
    state,
    triggerRef,
    placement: placementContext,
    showArrow,
    offset,
  } = usePopoverContext();
  const internalPopoverRef = useRef<HTMLDivElement>(null);
  const popoverRef = externalPopoverRef ?? internalPopoverRef;

  const { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      triggerRef,
      popoverRef,
      placement: placementContext,
      offset,
      isNonModal,
    },
    state,
  );

  const safePopoverProps = omitMotionConflictHandlers(popoverProps);

  return (
    <Overlay>
      <div>
        {!isNonModal && <div {...underlayProps} className={styles.underlay} />}

        <m.div
          {...safePopoverProps}
          ref={popoverRef}
          className={unstyled ? undefined : styles.popover}
          style={{
            ...popoverProps.style,
            overflowY: "auto",
            overscrollBehavior: "contain",
          }}
          initial={{ opacity: 0, scale: POPOVER_ENTER_SCALE }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: { duration: TRANSITION_DURATION_S },
          }}
          exit={{
            opacity: 0,
            scale: POPOVER_ENTER_SCALE,
            transition: { duration: TRANSITION_DURATION_S },
          }}
        >
          {!isNonModal && <DismissButton onDismiss={state.close} />}
          {children}
          <DismissButton onDismiss={state.close} />
          {showArrow && (
            <ArrowPopover arrowProps={arrowProps} placement={placement} />
          )}
        </m.div>
      </div>
    </Overlay>
  );
}
