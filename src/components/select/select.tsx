import clsx from "clsx";
import { useRef } from "react";
import type { AriaSelectProps } from "react-aria";
import { HiddenSelect, useSelect } from "react-aria";
import { Item, useSelectState } from "react-stately";
import { ListBoxView, Popover, Text } from "@/components";
import * as styles from "./select.css";
import { TriggerSelect } from "./trigger-select";

// ============================================
// SELECT ROOT COMPONENT
// ============================================

export interface SelectProps<T extends object> extends AriaSelectProps<T> {
  errorMessage?: string;
  helperText?: string;
  className?: string;
}

function SelectRoot<T extends object>(props: SelectProps<T>) {
  const { errorMessage, helperText, className } = props;

  const isInvalid = !!errorMessage;
  const reservesErrorSpace = Boolean(errorMessage || helperText);
  const state = useSelectState(props);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const { labelProps, triggerProps, valueProps, menuProps, errorMessageProps } =
    useSelect(props, state, triggerRef);

  return (
    <div
      className={clsx(
        styles.selectContainer,
        reservesErrorSpace && styles.comboboxError,
        className,
      )}
    >
      {props.label && (
        <label
          {...labelProps}
          htmlFor={triggerProps.id}
          className={styles.labelStyle}
        >
          {props.label}
        </label>
      )}

      <HiddenSelect
        state={state}
        triggerRef={triggerRef}
        label={props.label}
        name={props.name}
      />

      <Popover
        isOpen={state.isOpen}
        onOpenChange={state.setOpen}
        triggerRef={triggerRef}
        placement="bottom start"
      >
        <Popover.Trigger>
          <TriggerSelect
            {...triggerProps}
            ref={triggerRef}
            variant="outlined"
            isOpen={state.isOpen}
            isInvalid={isInvalid}
            aria-invalid={isInvalid}
          >
            <Text as="span" variant="bodyMedium" {...valueProps}>
              {state.selectedItems.length > 0
                ? state.selectedItems[0].rendered
                : "Choose..."}
            </Text>
          </TriggerSelect>
        </Popover.Trigger>

        <Popover.Content unstyled>
          <ListBoxView state={state} listBoxProps={menuProps} />
        </Popover.Content>
      </Popover>
      {(errorMessage || helperText) && (
        <div className={styles.supportTextStyle}>
          <Text
            as="span"
            variant="labelSmall"
            color={errorMessage ? "error" : "primary"}
            role={errorMessage ? "alert" : undefined}
            {...(errorMessage ? errorMessageProps : {})}
          >
            {errorMessage || helperText}
          </Text>
        </div>
      )}
    </div>
  );
}

// ============================================
// COMPOUND COMPONENT
// ============================================

export const Select = Object.assign(SelectRoot, {
  Item,
});
