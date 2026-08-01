import { createContext, useContext } from "react";

export interface RouterContextValue {
  navigate: (path: string) => void;
  useHref?: (path: string) => string;
}

export const RouterContext = createContext<RouterContextValue | null>(null);

export function useRouter() {
  return useContext(RouterContext);
}
