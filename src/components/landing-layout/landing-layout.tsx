import type { PropsWithChildren, ReactNode } from "react";
import * as styles from "./landing-layout.css";

// --- Root ---
function LandingLayoutRoot({ children }: PropsWithChildren) {
  return <div className={styles.layout}>{children}</div>;
}

// --- Header ---
interface LandingLayoutHeaderProps {
  children: ReactNode;
}

function LandingLayoutHeader({ children }: LandingLayoutHeaderProps) {
  return <header className={styles.header}>{children}</header>;
}

// --- Section ---
interface LandingLayoutSectionProps {
  children: ReactNode;
  variant?: "default" | "accent";
}

function LandingLayoutSection({
  children,
  variant = "default",
}: LandingLayoutSectionProps) {
  return (
    <section className={styles.section} data-variant={variant}>
      {children}
    </section>
  );
}

// --- Container for centered content inside sections ---
function LandingLayoutContainer({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}

// --- Footer ---
function LandingLayoutFooter({ children }: PropsWithChildren) {
  return <footer className={styles.footer}>{children}</footer>;
}

// --- Compound Component Export ---
export const LandingLayout = Object.assign(LandingLayoutRoot, {
  Header: LandingLayoutHeader,
  Section: LandingLayoutSection,
  Container: LandingLayoutContainer,
  Footer: LandingLayoutFooter,
});
