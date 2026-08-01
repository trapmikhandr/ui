import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import type { AriaMenuProps } from "react-aria";
import type { Key } from "react-stately";
import { Menu } from "./menu";
import * as styles from "./submenu-trigger.css";

export interface SubmenuTriggerProps {
  label: ReactNode;
  icon?: ReactNode;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onAction?: (key: Key) => void;
  disabledKeys?: Iterable<Key>;
  children: AriaMenuProps<object>["children"];
}

/**
 * Minimal part of react-stately's PartialNode<T>; do not pull
 * @react-stately/collections as a separate dependency for a single type.
 */
export interface CollectionPartialNode {
  type: string;
  props: unknown;
  rendered: ReactNode;
  textValue: string;
  hasChildNodes: boolean;
}

/**
 * react-stately's CollectionBuilder does not render arbitrary components inside
 * <Menu.Content>; it looks for static `type.getCollectionNode`, like <Item>/<Section>
 * (see @react-stately/collections/CollectionBuilder). Therefore SubmenuTrigger itself is never
 * mounted by React; instead, it provides Collection with the same "partial node" format
 * as <Item>, with `rendered` set to an interactive SubmenuRow (the item key is a regular React `key`,
 * just like <Menu.Item>).
 */
function* getCollectionNode(
  props: SubmenuTriggerProps,
): Generator<CollectionPartialNode> {
  yield {
    type: "item",
    props,
    rendered: <SubmenuRow {...props} />,
    textValue: typeof props.label === "string" ? props.label : "",
    hasChildNodes: false,
  };
}

function SubmenuTriggerComponent(_props: SubmenuTriggerProps): null {
  return null;
}

export const SubmenuTrigger = Object.assign(SubmenuTriggerComponent, {
  getCollectionNode,
});

function SubmenuRow({
  label,
  icon,
  isOpen,
  onOpenChange,
  onAction,
  disabledKeys,
  children,
}: SubmenuTriggerProps) {
  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: the keyboard equivalent (Enter/Space opens the submenu) is already provided by the parent <li>'s role="menuitem" through useMenuItem
    // biome-ignore lint/a11y/useKeyWithClickEvents: see above; this click is for mouse/touch only, while the parent menu item handles the keyboard
    <div
      className={styles.row}
      onPointerDown={(e) => e.stopPropagation()}
      onPointerUp={(e) => e.stopPropagation()}
      onClick={(e) => {
        e.stopPropagation();
        onOpenChange(!isOpen);
      }}
    >
      <span className={styles.label}>
        {icon}
        {label}
      </span>
      <ChevronRight size={16} className={styles.chevron} />

      <Menu
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="right top"
        offset={4}
      >
        <Menu.Trigger>
          <span className={styles.anchor} />
        </Menu.Trigger>
        <Menu.Content
          isNonModal
          onAction={(key) => onAction?.(key)}
          disabledKeys={disabledKeys}
        >
          {children}
        </Menu.Content>
      </Menu>
    </div>
  );
}
