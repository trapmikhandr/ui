import { Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import {
  createContext,
  type ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";
import { IconButton } from "@/components";
import {
  NavigationBar,
  NavigationItem,
  NavigationRail,
} from "@/components/navigation";
import * as styles from "./app-layout.css";

export type { NavigationItemProps as AppLayoutSidebarItemProps } from "@/components/navigation";

interface LayoutContextType {
  collapsed: boolean;
  mobileOpen: boolean;
  toggleSidebar: () => void;
  toggleMobileSidebar: () => void;
  closeMobileSidebar: () => void;
}

const LayoutContext = createContext<LayoutContextType | null>(null);

export function useAppLayout() {
  const ctx = useContext(LayoutContext);
  if (!ctx) throw new Error("useAppLayout must be used inside AppLayout");
  return ctx;
}

interface AppLayoutProps {
  children?: ReactNode;
  defaultCollapsed?: boolean;
}

function AppLayoutRoot({ children, defaultCollapsed = false }: AppLayoutProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [mobileOpen, setMobileOpen] = useState(false);

  const api = useMemo<LayoutContextType>(
    () => ({
      collapsed,
      mobileOpen,
      toggleSidebar: () => setCollapsed((c) => !c),
      toggleMobileSidebar: () => setMobileOpen((o) => !o),
      closeMobileSidebar: () => setMobileOpen(false),
    }),
    [collapsed, mobileOpen],
  );

  return (
    <LayoutContext.Provider value={api}>
      <div
        className={styles.layout}
        data-collapsed={collapsed}
        data-mobile-open={mobileOpen}
      >
        <button
          type="button"
          className={styles.backdrop}
          tabIndex={-1}
          onClick={api.closeMobileSidebar}
          onKeyDown={(e) => {
            if (e.key === "Escape") api.closeMobileSidebar();
          }}
          aria-label="Close sidebar"
        />
        {children}
      </div>
    </LayoutContext.Provider>
  );
}

export function SidebarTrigger() {
  const { toggleMobileSidebar } = useAppLayout();
  return (
    <div className={styles.mobileOnly}>
      <IconButton
        onPress={toggleMobileSidebar}
        variant="standard"
        aria-label="Open menu"
      >
        <Menu />
      </IconButton>
    </div>
  );
}

interface AppLayoutSidebarProps {
  children: ReactNode;
  logoTrigger: ReactNode;
  headerContent?: ReactNode;
  footer?: ReactNode;
}

function AppLayoutSidebar({
  children,
  logoTrigger,
  headerContent,
  footer,
}: AppLayoutSidebarProps) {
  const { collapsed, toggleSidebar } = useAppLayout();

  const expanded = !collapsed;

  return (
    <aside className={styles.sidebar}>
      <NavigationRail expanded={expanded}>
        <NavigationRail.Header>
          {expanded ? (
            <>
              <div className={styles.desktopOnly}>
                <IconButton
                  variant="standard"
                  onPress={toggleSidebar}
                  aria-label="Collapse sidebar"
                >
                  <PanelLeftClose size={24} />
                </IconButton>
              </div>
              <div className={styles.sidebarHeaderInner}>
                {logoTrigger}
                {headerContent && (
                  <div className={styles.sidebarHeaderContent}>
                    {headerContent}
                  </div>
                )}
              </div>
            </>
          ) : (
            <IconButton
              variant="standard"
              onPress={toggleSidebar}
              aria-label="Expand sidebar"
            >
              <PanelLeftOpen size={24} />
            </IconButton>
          )}
        </NavigationRail.Header>
        <NavigationRail.Nav>{children}</NavigationRail.Nav>
        {footer && <NavigationRail.Footer>{footer}</NavigationRail.Footer>}
      </NavigationRail>
    </aside>
  );
}

interface AppLayoutMainProps {
  children: ReactNode;
  className?: string;
}

function AppLayoutMain({ children, className }: AppLayoutMainProps) {
  return (
    <main className={`${styles.main} ${className || ""}`}>{children}</main>
  );
}

interface AppLayoutMobileBarProps {
  children: ReactNode;
}

function AppLayoutMobileBar({ children }: AppLayoutMobileBarProps) {
  return (
    <div className={styles.mobileBar}>
      <NavigationBar>
        <NavigationBar.Nav>{children}</NavigationBar.Nav>
      </NavigationBar>
    </div>
  );
}

export const AppLayout = Object.assign(AppLayoutRoot, {
  Sidebar: AppLayoutSidebar,
  SidebarItem: NavigationItem,
  MobileBar: AppLayoutMobileBar,
  Main: AppLayoutMain,
  Trigger: SidebarTrigger,
});
