/** biome-ignore-all lint/suspicious/noArrayIndexKey: duplicate action labels are allowed */
import { clsx } from "clsx";
import type { ReactNode } from "react";
import { useRef, useState } from "react";
import { useInteractOutside } from "react-aria";
import type { FabProps } from "@/components/fab";
import { Fab } from "@/components/fab";
import {
  fabMenuAction,
  fabMenuActionLabel,
  fabMenuActions,
  fabMenuRoot,
  fabMenuTriggerIcon,
} from "./fab-menu.css";

export interface FabMenuAction {
  icon: ReactNode;
  label?: string;
  onPress: () => void;
  color?: FabProps["color"];
  disabled?: boolean;
  "aria-label": string;
}

export interface FabMenuProps {
  icon: ReactNode;
  actions: FabMenuAction[];
  color?: FabProps["color"];
  lowered?: boolean;
  className?: string;
  "aria-label": string;
}

export function FabMenu({
  icon,
  actions,
  color = "primary",
  lowered = false,
  className,
  "aria-label": ariaLabel,
}: FabMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useInteractOutside({
    ref: rootRef,
    onInteractOutside: () => setIsOpen(false),
  });

  return (
    <div ref={rootRef} className={clsx(fabMenuRoot, className)}>
      {/* Sub-actions (shown above the trigger) */}
      <ul className={fabMenuActions} aria-hidden={!isOpen}>
        {actions.map((action, i) => (
          <li
            key={`${action["aria-label"]}-${i}`}
            className={fabMenuAction({ visible: isOpen })}
            style={{
              animationDelay: isOpen
                ? `${i * 40}ms`
                : `${(actions.length - 1 - i) * 30}ms`,
            }}
          >
            {action.label && (
              <span className={fabMenuActionLabel}>{action.label}</span>
            )}
            <Fab
              size="small"
              color={action.color ?? "surface"}
              aria-label={action["aria-label"]}
              isDisabled={action.disabled}
              onPress={() => {
                action.onPress();
                setIsOpen(false);
              }}
            >
              {action.icon}
            </Fab>
          </li>
        ))}
      </ul>

      {/* Trigger FAB */}
      <Fab
        color={color}
        lowered={lowered}
        aria-label={ariaLabel}
        aria-expanded={isOpen}
        aria-haspopup="true"
        onPress={() => setIsOpen((v) => !v)}
      >
        <span className={fabMenuTriggerIcon({ open: isOpen })}>{icon}</span>
      </Fab>
    </div>
  );
}
