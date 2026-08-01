import type { ReactNode } from "react";
import { OverlayProvider } from "react-aria";
import { RouterContext, type RouterContextValue } from "./router-context";
import { type ThemeMode, ThemeProvider } from "./theme-provider";
import { overlayProviderRoot } from "./ui-provider.css";

interface UIProviderProps extends Partial<RouterContextValue> {
  children: ReactNode;
  /** Current theme. State and persistence are controlled by the application. */
  mode: ThemeMode;
  /** Called when the theme changes; the application decides where to persist it. */
  onModeChange: (mode: ThemeMode) => void;
}

export function UIProvider({
  children,
  mode,
  onModeChange,
  navigate,
  useHref,
}: UIProviderProps) {
  const routerValue = navigate ? { navigate, useHref } : null;

  return (
    <ThemeProvider mode={mode} onModeChange={onModeChange}>
      {navigate ? (
        <RouterContext.Provider value={routerValue}>
          <OverlayProvider className={overlayProviderRoot}>
            {children}
          </OverlayProvider>
        </RouterContext.Provider>
      ) : (
        <OverlayProvider className={overlayProviderRoot}>
          {children}
        </OverlayProvider>
      )}
    </ThemeProvider>
  );
}
