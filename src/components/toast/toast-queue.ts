import { ToastQueue } from "react-stately";

export type ToastVariant = "info" | "success" | "error" | "warning";

export interface ToastContent {
  title: string;
  description?: string;
  variant: ToastVariant;
}

/**
 * Global toast queue.
 * Allows toasts to be added from anywhere in the application,
 * even outside the React tree.
 */
export const toastQueue = new ToastQueue<ToastContent>({
  maxVisibleToasts: 5,
});

export interface ToastOptions {
  /** Display duration in ms. Uses the variant default when omitted. */
  timeout?: number;
}

/**
 * Utilities for adding toasts.
 */
export const toast = {
  info: (title: string, description?: string, options?: ToastOptions) =>
    toastQueue.add(
      { title, description, variant: "info" },
      { timeout: options?.timeout ?? 5000 },
    ),

  success: (title: string, description?: string, options?: ToastOptions) =>
    toastQueue.add(
      { title, description, variant: "success" },
      { timeout: options?.timeout ?? 5000 },
    ),

  error: (title: string, description?: string, options?: ToastOptions) =>
    toastQueue.add(
      { title, description, variant: "error" },
      { timeout: options?.timeout ?? 8000 },
    ),

  warning: (title: string, description?: string, options?: ToastOptions) =>
    toastQueue.add(
      { title, description, variant: "warning" },
      { timeout: options?.timeout ?? 6000 },
    ),
};
