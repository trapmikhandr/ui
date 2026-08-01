import { AlertCircle, AlertTriangle, CheckCircle, Info, X } from "lucide-react";
import { useRef } from "react";
import { useToast, useToastRegion } from "react-aria";
import { type ToastState, useToastQueue } from "react-stately";
import { IconButton } from "../button";
import * as styles from "./toast.css";
import {
  type ToastContent,
  type ToastVariant,
  toastQueue,
} from "./toast-queue";

const variantIcons: Record<ToastVariant, React.ElementType> = {
  info: Info,
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
};

interface ToastProps {
  state: ToastState<ToastContent>;
  toast: ToastState<ToastContent>["visibleToasts"][number];
}

function Toast({ state, toast }: ToastProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { toastProps, contentProps, titleProps, closeButtonProps } = useToast(
    { toast },
    state,
    ref,
  );

  const Icon = variantIcons[toast.content.variant];

  return (
    <div
      {...toastProps}
      ref={ref}
      className={styles.toast({
        variant: toast.content.variant,
      })}
    >
      <span className={styles.toastIcon}>
        <Icon size={20} />
      </span>
      <div {...contentProps} className={styles.toastContent}>
        <div {...titleProps}>{toast.content.title}</div>
        {toast.content.description && (
          <div style={{ opacity: 0.8, marginTop: 2 }}>
            {toast.content.description}
          </div>
        )}
      </div>
      <IconButton
        {...closeButtonProps}
        aria-label="Close"
        className={styles.toastCloseButton}
        variant="outlined"
        color="neutral"
        size="sm"
      >
        <X size={18} />
      </IconButton>
    </div>
  );
}

/**
 * ToastRegion — container for displaying toasts.
 * Connected to the global toastQueue.
 * Add it once at the root of the application.
 */
export function ToastRegion() {
  const state = useToastQueue(toastQueue);
  const ref = useRef<HTMLDivElement>(null);
  const { regionProps } = useToastRegion({}, state, ref);

  if (state.visibleToasts.length === 0) {
    return null;
  }

  return (
    <div {...regionProps} ref={ref} className={styles.toastRegion}>
      {state.visibleToasts.map((t) => (
        <Toast key={t.key} toast={t} state={state} />
      ))}
    </div>
  );
}
