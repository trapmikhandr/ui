import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import type { ToggleGroupState } from "react-stately";
import type {
  ButtonGroupInteraction,
  ButtonGroupKey,
  ButtonGroupPosition,
  ButtonGroupSelection,
  ButtonGroupSelectionMode,
  ButtonGroupState,
} from "./button-group.types";
import { ButtonGroupButton, ButtonGroupIconButton } from "./button-group-items";

export type ReactAriaSelectionMode = Exclude<ButtonGroupSelectionMode, "none">;

type GroupItemProps = {
  id: ButtonGroupKey;
  size?: ButtonGroupState["size"];
  __group?: ButtonGroupState;
};

function getPosition(index: number, count: number): ButtonGroupPosition {
  if (count === 1) return "only";
  if (index === 0) return "first";
  if (index === count - 1) return "last";
  return "middle";
}

export function getSelectedKeysFromProps({
  selectedKey,
  selectedKeys,
}: {
  selectedKey?: ButtonGroupKey | null;
  selectedKeys?: Iterable<ButtonGroupKey>;
}): Iterable<ButtonGroupKey> | undefined {
  if (selectedKeys !== undefined) return selectedKeys;
  if (selectedKey !== undefined)
    return selectedKey === null ? [] : [selectedKey];
  return undefined;
}

export function getDefaultSelectedKeysFromProps({
  defaultSelectedKey,
  defaultSelectedKeys,
}: {
  defaultSelectedKey?: ButtonGroupKey | null;
  defaultSelectedKeys?: Iterable<ButtonGroupKey>;
}): Iterable<ButtonGroupKey> | undefined {
  if (defaultSelectedKeys !== undefined) return defaultSelectedKeys;
  if (defaultSelectedKey !== undefined)
    return defaultSelectedKey === null ? [] : [defaultSelectedKey];
  return undefined;
}

export function mapSelectionChange(
  selectionMode: ReactAriaSelectionMode,
  onSelectionChange: ((selection: ButtonGroupSelection) => void) | undefined,
): ((keys: Set<ButtonGroupKey>) => void) | undefined {
  if (!onSelectionChange) return undefined;

  return (keys) => {
    if (selectionMode === "single") {
      onSelectionChange(keys.values().next().value ?? null);
      return;
    }
    onSelectionChange(keys);
  };
}

function isGroupItem(
  child: ReactElement,
): child is ReactElement<GroupItemProps> {
  return (
    child.type === ButtonGroupButton || child.type === ButtonGroupIconButton
  );
}

export function renderChildrenWithGroupState(
  children: ReactNode,
  state: ToggleGroupState | null,
  groupState: Omit<ButtonGroupState, "position" | "interaction">,
): ReactNode {
  const items = Children.toArray(children);
  const selectedKeys = state?.selectedKeys ?? new Set<ButtonGroupKey>();

  const selectedIndexes = new Set<number>();
  items.forEach((child, index) => {
    if (
      isValidElement(child) &&
      isGroupItem(child) &&
      selectedKeys.has(child.props.id)
    ) {
      selectedIndexes.add(index);
    }
  });

  return items.map((child, index) => {
    if (!isValidElement(child) || !isGroupItem(child)) return child;

    const isSelected = selectedKeys.has(child.props.id);
    let interaction: ButtonGroupInteraction = isSelected ? "selected" : "idle";

    if (groupState.variant === "standard" && !isSelected) {
      if (selectedIndexes.has(index - 1) || selectedIndexes.has(index + 1)) {
        interaction = "adjacentToSelected";
      }
    }

    return cloneElement(child, {
      size: groupState.size,
      __group: {
        ...groupState,
        position: getPosition(index, items.length),
        interaction,
      },
    });
  });
}
