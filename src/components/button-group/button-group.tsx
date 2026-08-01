import type { RecipeVariants } from "@vanilla-extract/recipes";
import { clsx } from "clsx";
import { type PropsWithChildren, useRef } from "react";
import { useToggleButtonGroup } from "react-aria";
import { useToggleGroupState } from "react-stately";
import { ButtonGroupContext } from "./button-group.context";
import {
  buttonGroup,
  buttonGroupConnected,
  buttonGroupStandard,
} from "./button-group.css";
import type {
  ButtonGroupKey,
  ButtonGroupSelection,
  ButtonGroupSelectionMode,
} from "./button-group.types";
import {
  ButtonGroupButton,
  type ButtonGroupButtonProps,
  ButtonGroupIconButton,
  type ButtonGroupIconButtonProps,
} from "./button-group-items";
import {
  getDefaultSelectedKeysFromProps,
  getSelectedKeysFromProps,
  mapSelectionChange,
  type ReactAriaSelectionMode,
  renderChildrenWithGroupState,
} from "./utils";

export type { ButtonGroupButtonProps, ButtonGroupIconButtonProps };

type ButtonGroupRecipe = NonNullable<RecipeVariants<typeof buttonGroup>>;
type SelectableGroupProps = Omit<ButtonGroupProps, "selectionMode"> & {
  selectionMode: ReactAriaSelectionMode;
};

export interface ButtonGroupProps extends PropsWithChildren, ButtonGroupRecipe {
  className?: string;
  selectionMode?: ButtonGroupSelectionMode;
  selectedKey?: ButtonGroupKey | null;
  defaultSelectedKey?: ButtonGroupKey | null;
  selectedKeys?: Iterable<ButtonGroupKey>;
  defaultSelectedKeys?: Iterable<ButtonGroupKey>;
  selectionRequired?: boolean;
  onSelectionChange?: (selection: ButtonGroupSelection) => void;
  onAction?: (key: ButtonGroupKey) => void;
  "aria-label"?: string;
}

// --- roots ---

function ButtonGroupStaticRoot({
  children,
  orientation = "horizontal",
  variant = "standard",
  size = "m",
  shape = "round",
  className,
  onAction,
  "aria-label": ariaLabel,
}: ButtonGroupProps) {
  const renderedChildren = renderChildrenWithGroupState(children, null, {
    variant,
    orientation,
    size,
    shape,
  });

  return (
    <ButtonGroupContext.Provider
      value={{ selectionMode: "none", state: null, onAction }}
    >
      <fieldset
        aria-label={ariaLabel}
        data-orientation={orientation}
        data-variant={variant}
        className={clsx(
          buttonGroup({ orientation, variant, size, shape }),
          variant === "standard" ? buttonGroupStandard : buttonGroupConnected,
          className,
        )}
      >
        {renderedChildren}
      </fieldset>
    </ButtonGroupContext.Provider>
  );
}

function ButtonGroupSelectableRoot({
  children,
  orientation = "horizontal",
  variant = "standard",
  size = "m",
  shape = "round",
  selectionMode,
  selectedKey,
  defaultSelectedKey,
  selectedKeys,
  defaultSelectedKeys,
  selectionRequired = false,
  onSelectionChange,
  onAction,
  className,
  "aria-label": ariaLabel,
}: SelectableGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useToggleGroupState({
    selectionMode,
    disallowEmptySelection: selectionRequired,
    selectedKeys: getSelectedKeysFromProps({ selectedKey, selectedKeys }),
    defaultSelectedKeys: getDefaultSelectedKeysFromProps({
      defaultSelectedKey,
      defaultSelectedKeys,
    }),
    onSelectionChange: mapSelectionChange(selectionMode, onSelectionChange),
  });
  const { groupProps } = useToggleButtonGroup(
    { orientation, selectionMode, "aria-label": ariaLabel },
    state,
    ref,
  );
  const renderedChildren = renderChildrenWithGroupState(children, state, {
    variant,
    orientation,
    size,
    shape,
  });

  return (
    <ButtonGroupContext.Provider value={{ selectionMode, state, onAction }}>
      <div
        {...groupProps}
        ref={ref}
        data-orientation={orientation}
        data-variant={variant}
        className={clsx(
          buttonGroup({ orientation, variant, size, shape }),
          variant === "standard" ? buttonGroupStandard : buttonGroupConnected,
          className,
        )}
      >
        {renderedChildren}
      </div>
    </ButtonGroupContext.Provider>
  );
}

function ButtonGroupRoot({
  selectionMode = "none",
  ...rest
}: ButtonGroupProps) {
  if (selectionMode === "none") {
    return <ButtonGroupStaticRoot selectionMode={selectionMode} {...rest} />;
  }

  return <ButtonGroupSelectableRoot selectionMode={selectionMode} {...rest} />;
}

export const ButtonGroup = Object.assign(ButtonGroupRoot, {
  Button: ButtonGroupButton,
  IconButton: ButtonGroupIconButton,
});
