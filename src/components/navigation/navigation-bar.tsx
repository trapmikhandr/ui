import type { ReactNode } from "react";
import * as styles from "./navigation-bar.css";
import { NavigationContext } from "./navigation-item";

export interface NavigationBarProps {
  children?: ReactNode;
}

export interface NavigationBarNavProps {
  children?: ReactNode;
}

function NavigationBarRoot({ children }: NavigationBarProps) {
  return (
    <NavigationContext.Provider value="bar">
      <nav className={styles.bar}>{children}</nav>
    </NavigationContext.Provider>
  );
}

function NavigationBarNav({ children }: NavigationBarNavProps) {
  return <div className={styles.barNav}>{children}</div>;
}

export const NavigationBar = Object.assign(NavigationBarRoot, {
  Nav: NavigationBarNav,
});
