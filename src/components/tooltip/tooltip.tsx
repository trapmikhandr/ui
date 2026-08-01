import React, { useRef } from "react";
import {
  mergeProps,
  OverlayContainer,
  type TooltipTriggerProps,
  useOverlayPosition,
  useTooltip,
  useTooltipTrigger,
} from "react-aria";
import {
  type TooltipTriggerState,
  useTooltipTriggerState,
} from "react-stately";
import * as styles from "./tooltip.css";

// --- Internal component: the tooltip overlay ---
// Kept separate so positioning hooks run only while it is mounted.

interface TooltipOverlayProps {
  state: TooltipTriggerState;
  triggerRef: React.RefObject<HTMLElement | null>;
  placement?: "top" | "bottom" | "left" | "right";
  children: React.ReactNode;
}

const TooltipOverlay = ({
  state,
  triggerRef,
  placement = "top",
  children,
}: TooltipOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  // 1. Hook for the tooltip's ARIA attributes.
  const { tooltipProps } = useTooltip({}, state);

  // 2. Hook for positioning.
  const { overlayProps } = useOverlayPosition({
    targetRef: triggerRef,
    overlayRef,
    placement,
    offset: 4, // 4px offset (spacing.xs).
    isOpen: state.isOpen,
    onClose: state.close,
    shouldFlip: true, // Flip when there is not enough room on screen.
  });

  return (
    <OverlayContainer>
      <div
        {...mergeProps(overlayProps, tooltipProps)}
        ref={overlayRef}
        // Position styles (top, left) come from overlayProps,
        // but zIndex must be added manually or through a class if not provided.
        style={{
          ...overlayProps.style,
          zIndex: 1500, // globalContract.zIndex.tooltip
        }}
      >
        <div className={styles.tooltipContainer}>{children}</div>
      </div>
    </OverlayContainer>
  );
};

// --- Public component: trigger ---

interface TooltipProps extends TooltipTriggerProps {
  children: React.ReactNode;
  content: React.ReactNode;
  placement?: "top" | "bottom" | "left" | "right";
}

export const Tooltip = (props: TooltipProps) => {
  const { children, content, placement = "top", ...rest } = props;

  // 1. State management.
  const state = useTooltipTriggerState({
    delay: 500, // M3 standard delay
    closeDelay: 150,
    ...rest,
  });

  const triggerRef = useRef<HTMLElement>(null);

  // 2. Hook for trigger events (hover, focus).
  const { triggerProps } = useTooltipTrigger(props, state, triggerRef);

  // 1. Validate the element.
  if (!React.isValidElement(children)) {
    console.warn("Tooltip child is not a valid element.");
    return <>{children}</>;
  }

  // 2. After validation, child is a ReactElement.
  // Safely type its props for mergeProps.
  // Use Record<string, unknown> as a safe object instead of any.
  const child = children as React.ReactElement<
    React.HTMLAttributes<HTMLElement> & React.RefAttributes<HTMLElement>
  >;

  return (
    <>
      {React.cloneElement(child, {
        ref: triggerRef,
        ...mergeProps(child.props, triggerProps),
      })}

      {/* Render the overlay only while the tooltip is open. */}
      {state.isOpen && triggerRef !== null && (
        <TooltipOverlay
          state={state}
          triggerRef={triggerRef}
          placement={placement}
        >
          {content}
        </TooltipOverlay>
      )}
    </>
  );
};
