import { createContext, type ReactNode, useContext } from "react";
import { NavigationContext } from "./navigation-item";
import * as styles from "./navigation-rail.css";

interface NavigationRailContextType {
  expanded: boolean;
}

const NavigationRailContext = createContext<NavigationRailContextType>({
  expanded: false,
});

export interface NavigationRailProps {
  children?: ReactNode;
  expanded?: boolean;
}

export interface NavigationRailHeaderProps {
  children?: ReactNode;
}

export interface NavigationRailNavProps {
  children?: ReactNode;
}

export interface NavigationRailFooterProps {
  children?: ReactNode;
}

function NavigationRailRoot({
  children,
  expanded = false,
}: NavigationRailProps) {
  return (
    <NavigationRailContext.Provider value={{ expanded }}>
      <NavigationContext.Provider value={expanded ? "drawer" : "rail"}>
        <nav className={styles.rail({ expanded })}>{children}</nav>
      </NavigationContext.Provider>
    </NavigationRailContext.Provider>
  );
}

function NavigationRailHeader({ children }: NavigationRailHeaderProps) {
  const { expanded } = useContext(NavigationRailContext);
  return <div className={styles.railHeader({ expanded })}>{children}</div>;
}

function NavigationRailNav({ children }: NavigationRailNavProps) {
  const { expanded } = useContext(NavigationRailContext);
  return <div className={styles.railNav({ expanded })}>{children}</div>;
}

function NavigationRailFooter({ children }: NavigationRailFooterProps) {
  const { expanded } = useContext(NavigationRailContext);
  return <div className={styles.railFooter({ expanded })}>{children}</div>;
}

export const NavigationRail = Object.assign(NavigationRailRoot, {
  Header: NavigationRailHeader,
  Nav: NavigationRailNav,
  Footer: NavigationRailFooter,
});
