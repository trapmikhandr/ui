/**
 * src/provider/theme-provider.tsx
 *
 * Complete ThemeContext implementation.
 */

import type React from "react";
import { createContext, useContext, useLayoutEffect } from "react";

// ============================================================================
// 1. CREATE THE CONTEXT
// ============================================================================

export type ThemeMode = "light" | "dark";

// The application owns theme persistence (localStorage, cookies, or profile).
// The package does not persist anything; this key only provides a shared name
// so different application surfaces use the same namespace.
export const THEME_STORAGE_KEY = "theme-mode";

interface ThemeContextValue {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
}

// ✅ ThemeContext.
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// ============================================================================
// 2. HOOK FOR ACCESSING THE CONTEXT
// ============================================================================

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};

// ============================================================================
// 3. THE PROVIDER
// ============================================================================

interface ThemeProviderProps {
  children: React.ReactNode;
  /** Current theme. State and persistence are controlled by the application. */
  mode: ThemeMode;
  /** Called when the theme changes; the application decides where to persist it. */
  onModeChange: (mode: ThemeMode) => void;
}

export const ThemeProvider = ({
  children,
  mode,
  onModeChange,
}: ThemeProviderProps) => {
  useLayoutEffect(() => {
    document.body.setAttribute("data-theme", mode);
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode: onModeChange }}>
      {/* ✅ Apply the theme through a data attribute. */}
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * ============================================================================
 * HOW IT WORKS:
 * ============================================================================
 *
 * 1. createContext({ mode, setMode }) - create the context
 *
 * 2. <ThemeContext.Provider value={{ mode, setMode: onModeChange }}>
 *    - Provide the value to all descendants
 *
 * 3. <div data-theme={mode}>
 *    - Apply the theme through a data attribute
 *    - CSS: [data-theme="light"] { ... }
 *           [data-theme="dark"] { ... }
 *
 * 4. useTheme() - access the value from any component:
 *    const { mode, setMode } = useTheme()
 *    setMode('dark')  // Switch the theme through the app callback
 *
 * ============================================================================
 * USAGE (controlled; state and persistence live in the application):
 * ============================================================================
 *
 * // In the application's root.tsx
 * import { THEME_STORAGE_KEY, ThemeProvider, type ThemeMode } from '@trapmikhandr/ui'
 * import { useEffect, useState } from 'react'
 *
 * function useThemeMode() {
 *   const [mode, setModeState] = useState<ThemeMode>('light')
 *
 *   // Read the saved choice after hydration to avoid an SSR/client mismatch.
 *   useEffect(() => {
 *     const stored = localStorage.getItem(THEME_STORAGE_KEY)
 *     if (stored === 'light' || stored === 'dark') setModeState(stored)
 *   }, [])
 *
 *   const setMode = (next: ThemeMode) => {
 *     setModeState(next)
 *     localStorage.setItem(THEME_STORAGE_KEY, next)
 *   }
 *
 *   return { mode, setMode }
 * }
 *
 * export default function App() {
 *   const { mode, setMode } = useThemeMode()
 *   return (
 *     <ThemeProvider mode={mode} onModeChange={setMode}>
 *       <YourComponents />
 *     </ThemeProvider>
 *   )
 * }
 *
 * // In any component
 * import { useTheme } from '@trapmikhandr/ui'
 *
 * export function Header() {
 *   const { mode, setMode } = useTheme()
 *
 *   return (
 *     <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
 *       {mode === 'light' ? '🌙 Dark' : '☀ Light'}
 *     </button>
 *   )
 * }
 */
