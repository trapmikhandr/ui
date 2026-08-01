import clsx from "clsx";
import type React from "react";
import { useCallback, useEffect, useRef } from "react";
import { FocusScope, useDialog, usePreventScroll } from "react-aria";
import {
  layoutOverlayBackdrop,
  layoutOverlayContainer,
  layoutOverlayContent,
} from "./layout-overlay.css";

export interface LayoutOverlayProps {
  /** Whether modal mode is open. */
  isOpen: boolean;
  /** Whether the player is playing. */
  isPlaying: boolean;
  /** Callback invoked when modal mode closes. */
  onClose: () => void;
  /** Content that can become modal. */
  children: React.ReactNode;
  /** CSS classes for the content. */
  contentClassName?: string;
  /** CSS classes for the container. */
  className?: string;
  /** Whether to disable modal functionality. */
  isDisabled?: boolean;
  /** ARIA label for modal mode. */
  "aria-label"?: string;
}

export const LayoutOverlay: React.FC<LayoutOverlayProps> = ({
  isOpen,
  isPlaying,
  onClose,
  children,
  contentClassName,
  isDisabled = false,
  "aria-label": ariaLabel = "Modal content",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { dialogProps } = useDialog(
    {
      "aria-label": ariaLabel,
    },
    containerRef,
  );

  // Lock scrolling while the modal is open.
  usePreventScroll({ isDisabled: !isOpen || isDisabled });

  // Handle Escape.
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Lock scrolling.
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = useCallback(() => {
    if (!isDisabled) {
      onClose();
    }
  }, [onClose, isDisabled]);

  const isModalActive = isOpen && !isDisabled;

  return (
    <div className={layoutOverlayContainer} data-modal-overlay={isModalActive}>
      {/* Backdrop overlay. */}
      <div
        className={layoutOverlayBackdrop}
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* Content with modal behavior. */}
      <FocusScope contain={isModalActive} restoreFocus={isModalActive}>
        <div
          {...(isModalActive
            ? {
                ...dialogProps,
                role: "dialog",
                "aria-modal": "true",
              }
            : {})}
          ref={containerRef}
          className={clsx(layoutOverlayContent, contentClassName)}
          data-modal={isModalActive}
          data-is-playing={isPlaying}
        >
          {children}
        </div>
      </FocusScope>
    </div>
  );
};
