import clsx from "clsx";
import { type KeyboardEvent, type ReactNode, useRef } from "react";
import type { AriaComboBoxProps } from "react-aria";
import { useComboBox, useFilter } from "react-aria";
import { Item, useComboBoxState } from "react-stately";
import { ListBoxView, Popover, Text } from "@/components";
import * as styles from "./combobox.css";
import { TriggerCombobox } from "./trigger-combobox";

// ============================================
// COMBOBOX ROOT COMPONENT
// ============================================

export interface ComboboxProps<T extends object> extends AriaComboBoxProps<T> {
  errorMessage?: string;
  helperText?: string;
  className?: string;
}

function ComboboxRoot<T extends object>(props: ComboboxProps<T>) {
  const { className, errorMessage, helperText, ...ariaProps } = props;
  const { contains } = useFilter({ sensitivity: "base" });

  const isInvalid = !!errorMessage;

  // Reserve space for error/helper text only when the caller provides it,
  // rather than based on the current value. Otherwise height jumps when
  // the error appears or disappears.
  const reservesErrorSpace = Boolean(errorMessage || helperText);

  const isControlledFiltering = !!props.onInputChange;
  const statelyProps = {
    menuTrigger: "focus" as const,
    defaultFilter: contains,
    ...ariaProps,
    isInvalid,
    items: isControlledFiltering ? props.items : undefined,
    defaultItems: !isControlledFiltering
      ? (props.items ?? props.defaultItems)
      : undefined,
  };

  const state = useComboBoxState(statelyProps);

  const buttonRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listBoxRef = useRef<HTMLUListElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const {
    labelProps,
    inputProps,
    listBoxProps,
    buttonProps,
    errorMessageProps,
  } = useComboBox({ ...statelyProps, inputRef, listBoxRef, popoverRef }, state);

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && state.isOpen) {
      const query = event.currentTarget.value.trim();
      const exactMatch = [...state.collection].find(
        (item) =>
          !state.selectionManager.isDisabled(item.key) &&
          item.textValue.trim().length === query.length &&
          contains(item.textValue.trim(), query),
      );

      // React Stately clears focusedKey whenever inputValue changes. Restore
      // it for an exact match so the built-in Enter handler can commit it.
      if (exactMatch) {
        state.selectionManager.setFocusedKey(exactMatch.key);
      }
    }

    inputProps.onKeyDown?.(event);
  };

  const inputPropsWithExactMatch = {
    ...inputProps,
    onKeyDown: handleInputKeyDown,
  };

  return (
    <div
      className={clsx(
        styles.comboboxContainer,
        reservesErrorSpace && styles.comboboxError,
        className,
      )}
    >
      {props.label && (
        // biome-ignore lint/a11y/noLabelWithoutControl: React Aria connects label via labelProps
        <label {...labelProps} className={styles.labelStyle}>
          {props.label}
        </label>
      )}

      <TriggerCombobox
        ref={buttonRef}
        inputProps={inputPropsWithExactMatch}
        inputRef={inputRef}
        buttonProps={buttonProps}
        isOpen={state.isOpen}
        isInvalid={isInvalid}
        isDisabled={props.isDisabled}
      />
      <Popover
        isOpen={state.isOpen}
        onOpenChange={state.setOpen}
        triggerRef={buttonRef}
        placement="bottom start"
      >
        <Popover.Content unstyled popoverRef={popoverRef} isNonModal>
          <ListBoxView
            state={state}
            listBoxProps={listBoxProps}
            listBoxRef={listBoxRef}
          />
        </Popover.Content>
      </Popover>
      {(errorMessage || helperText) && (
        <Text
          as="span"
          variant="labelSmall"
          color={errorMessage ? "error" : "primary"}
          role={errorMessage ? "alert" : undefined}
          className={styles.supportTextStyle}
          {...(errorMessage ? errorMessageProps : {})}
        >
          {(errorMessage || helperText) as ReactNode}
        </Text>
      )}
    </div>
  );
}

// ============================================
// COMPOUND COMPONENT
// ============================================

export const Combobox = Object.assign(ComboboxRoot, {
  Item,
});
