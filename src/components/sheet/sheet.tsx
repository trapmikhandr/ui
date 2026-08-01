import { X } from "lucide-react";
import {
  AnimatePresence,
  domMax,
  LazyMotion,
  m,
  type PanInfo,
  useDragControls,
  type Variants,
} from "motion/react";
import type React from "react";
import { useId, useRef } from "react";
import {
  type AriaDialogProps,
  FocusScope,
  ModalProvider,
  useDialog,
  useModal,
  useOverlay,
  usePreventScroll,
} from "react-aria";
import { createPortal } from "react-dom";
import { useOverlayTriggerState } from "react-stately";
import { omitMotionConflictHandlers } from "@/shared/utils";
import { IconButton } from "../button";
import {
  dragHandle,
  dragHandleArea,
  sheetBody,
  sheetHeader,
  sheetOverlay,
  sheetRecipe,
  sheetTitle,
  sheetTitleWrapper,
} from "./sheet.css";

// M3 Emphasized easing, 300ms — scrim fade and panel slide must stay in sync
const TRANSITION_DURATION_S = 0.3;
const EMPHASIZED_EASING: [number, number, number, number] = [0.2, 0, 0, 1];
// Dragging the bottom sheet down farther than this closes it
const DRAG_CLOSE_THRESHOLD_PX = 100;

export interface SheetProps extends AriaDialogProps {
  /** Controlled open state */
  isOpen: boolean;
  /** Callback when open state changes */
  onOpenChange: (isOpen: boolean) => void;
  /** Which side the sheet should anchor to */
  side?: "right" | "left" | "bottom";
  /** Whether the sheet acts as a modal (blocks background interaction) */
  isModal?: boolean;
  /** Icon to display before the title */
  startIcon?: React.ReactNode;
  /** Sheet title */
  title?: React.ReactNode;
  /** Sheet content */
  children: React.ReactNode;
  /** Hide close button */
  hideCloseButton?: boolean;
}

export const Sheet = (props: SheetProps) => {
  const { isOpen } = props;

  if (typeof document === "undefined") return null;

  return createPortal(
    // ModalProvider gives useModal a child context whose parent is the app's
    // root OverlayProvider, so an open modal sheet aria-hides the app tree;
    // without a root provider it degrades to a no-op instead of throwing.
    // LazyMotion + m instead of motion: domMax is required (not domAnimation)
    // because the bottom sheet uses framer's own drag gesture system.
    <ModalProvider>
      <LazyMotion features={domMax} strict>
        <AnimatePresence>
          {isOpen && <SheetContent {...props} />}
        </AnimatePresence>
      </LazyMotion>
    </ModalProvider>,
    document.body,
  );
};

const SheetContent = (props: SheetProps) => {
  const {
    isOpen,
    onOpenChange,
    side = "right",
    isModal = true,
    startIcon,
    title,
    children,
    hideCloseButton = false,
  } = props;

  const ref = useRef<HTMLDivElement | null>(null);
  const fallbackTitleId = useId();
  const dragControls = useDragControls();

  const state = useOverlayTriggerState({
    isOpen,
    onOpenChange,
  });

  const { overlayProps, underlayProps } = useOverlay(
    {
      isOpen,
      onClose: state.close,
      isDismissable: true,
      shouldCloseOnInteractOutside: () => isModal,
    },
    ref,
  );

  usePreventScroll({ isDisabled: !isModal });
  const { modalProps } = useModal({ isDisabled: !isModal });

  const { dialogProps, titleProps } = useDialog(props, ref);

  const regionProps = {
    role: "region",
    "aria-label": typeof title === "string" ? title : props["aria-label"],
    "aria-labelledby":
      typeof title !== "string" && title ? fallbackTitleId : undefined,
  };

  const safeDialogProps = omitMotionConflictHandlers(dialogProps);
  const safeModalProps = omitMotionConflictHandlers(modalProps);
  const safeOverlayProps = omitMotionConflictHandlers(overlayProps);

  const activeAriaProps = isModal
    ? { ...safeDialogProps, ...safeModalProps, "aria-modal": true }
    : regionProps;
  const activeTitleProps = isModal ? titleProps : { id: fallbackTitleId };

  const handleDragEnd = (
    _event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (side === "bottom" && info.offset.y > DRAG_CLOSE_THRESHOLD_PX) {
      state.close();
    }
  };

  const motionVariants: Variants = {
    initial: {
      x: side === "right" ? "100%" : side === "left" ? "-100%" : 0,
      y: side === "bottom" ? "100%" : 0,
    },
    animate: {
      x: 0,
      y: 0,
      transition: { duration: TRANSITION_DURATION_S, ease: EMPHASIZED_EASING },
    },
    exit: {
      x: side === "right" ? "100%" : side === "left" ? "-100%" : 0,
      y: side === "bottom" ? "100%" : 0,
      transition: { duration: TRANSITION_DURATION_S, ease: EMPHASIZED_EASING },
    },
  };

  const safeUnderlayProps = omitMotionConflictHandlers(underlayProps);

  return (
    <>
      {isModal && (
        <m.div
          className={sheetOverlay}
          {...safeUnderlayProps}
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { duration: TRANSITION_DURATION_S },
          }}
          exit={{ opacity: 0, transition: { duration: TRANSITION_DURATION_S } }}
        />
      )}
      <FocusScope contain={isModal} restoreFocus={isModal} autoFocus={isModal}>
        <m.div
          {...safeOverlayProps}
          {...activeAriaProps}
          ref={ref}
          className={sheetRecipe({ side, isModal })}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={motionVariants}
          drag={side === "bottom" ? "y" : false}
          dragListener={false}
          dragControls={dragControls}
          dragConstraints={
            side === "bottom" ? { top: 0, bottom: 0 } : undefined
          }
          onDragEnd={side === "bottom" ? handleDragEnd : undefined}
        >
          {side === "bottom" && (
            <div
              className={dragHandleArea}
              onPointerDown={(event) => dragControls.start(event)}
            >
              <div className={dragHandle} />
            </div>
          )}

          {(title || startIcon || !hideCloseButton) && (
            <div className={sheetHeader}>
              {(title || startIcon) && (
                <div className={sheetTitleWrapper}>
                  {startIcon}
                  {title && (
                    <h2 {...activeTitleProps} className={sheetTitle}>
                      {title}
                    </h2>
                  )}
                </div>
              )}
              {!hideCloseButton && (
                <IconButton onPress={state.close} aria-label="Close sheet">
                  <X />
                </IconButton>
              )}
            </div>
          )}

          <div className={sheetBody}>{children}</div>
        </m.div>
      </FocusScope>
    </>
  );
};
