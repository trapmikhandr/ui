# Research: `useMenuItem` and Press Prop Leakage

Research date: 2026-07-31

## Summary

In the installed `react-aria@3.50.0`, `useMenuItem` supports spreading
`menuItemProps` onto a menu element. The hook accepts abstract `PressEvents`,
passes them to `usePress`, and returns real DOM handlers such as `onKeyDown`,
`onPointerDown`, `onMouseDown`, and `onClick`, rather than `onPressStart` or
`preventFocusOnPress` attributes.

The original hypothesis that `ItemMenu` directly leaks `onPressStart`, `onPress`,
`onPressEnd`, and `preventFocusOnPress` is not supported by the installed source.
The warnings come from `TriggerMenu`: `useMenuTrigger` returns `menuTriggerProps`
of type `AriaButtonProps`, and `TriggerMenu` clones them onto an arbitrary child
without adapting the props. In the tests, that child is a native `<button>`, so
React receives abstract React Aria props on a DOM node.

The distinction is:

```text
useMenuItem -> menuItemProps with DOM events -> menu item element
useMenuTrigger -> menuTriggerProps with PressEvents -> trigger component
```

## Sources and versions

The following versions were checked in `ui/pnpm-lock.yaml`:

- `react-aria@3.50.0`
- `@react-aria/menu@3.18.0`
- `@react-aria/interactions@3.25.4`
- React 19

Sources:

- [React Aria useMenu documentation](https://react-spectrum.adobe.com/react-aria/useMenu.html)
- [react-spectrum source](https://github.com/adobe/react-spectrum/tree/main/packages/react-aria/src)
- [usePress source](https://github.com/adobe/react-spectrum/blob/main/packages/react-aria/src/interactions/usePress.ts)
- [useMenuItem source](https://github.com/adobe/react-spectrum/blob/main/packages/react-aria/src/menu/useMenuItem.ts)
- [useMenuTrigger source](https://github.com/adobe/react-spectrum/blob/main/packages/react-aria/src/menu/useMenuTrigger.ts)
- [react-aria types on npm](https://unpkg.com/react-aria@3.50.0/dist/types/src/menu/useMenuItem.d.ts)

Published files under `node_modules/react-aria/dist` were also checked. Their
source maps point to `packages/react-aria/src/menu/useMenuItem.ts`.

## 1. `useMenuItem` contract

The installed types describe `useMenuItem<T>(props, state, ref)` as returning a
`MenuItemAria` object with:

- `menuItemProps` for the menu item element;
- `labelProps`, `descriptionProps`, and `keyboardShortcutProps` for inner text;
- `isFocused`, `isFocusVisible`, `isSelected`, `isPressed`, and `isDisabled` state.

`AriaMenuItemProps` includes hover, keyboard, focus, disabled, selected, key,
and menu-dismissal data. `PressEvents` in the input type does not mean that the
same names should appear on the DOM node; they are callbacks for the hook API.

## 2. What `menuItemProps` contains

The installed implementation:

1. Extracts `onPressStart`, `onPress`, `onPressUp`, `onPressChange`, `onPressEnd`,
   and other abstract callbacks.
2. Passes them to `usePress`.
3. Receives `pressProps` from `usePress`.
4. Combines those props with selection, hover, keyboard, and focus props.
5. Returns the combined object as `menuItemProps`.

`usePress` separates abstract callbacks from DOM props. Its browser result can
contain `onPointerDown`, `onMouseDown`, `onPointerUp`, `onPointerEnter`,
`onPointerLeave`, `onKeyDown`, `onKeyUp`, `onClick`, and touch/drag handlers.

`preventFocusOnPress` controls focus during mouse down. It is a hook option, not
a DOM attribute: `usePress` destructures it and does not return it in
`pressProps`.

The official pattern is therefore:

```tsx
const { menuItemProps } = useMenuItem(props, state, ref);
return <li {...menuItemProps}>...</li>;
```

## 3. Handling PressEvents

React Aria has two API levels.

### Abstract level

A component can accept `onPress`, `onPressStart`, `onPressEnd`, `onPressUp`,
`onPressChange`, and `preventFocusOnPress`. This provides one model for pointer,
touch, keyboard, and assistive-technology interactions.

### DOM level

Native DOM nodes accept real React DOM handlers. `usePress` converts the abstract
press model into those events and manages their order, default prevention,
propagation, focus, and synthetic clicks.

Therefore:

- a custom button should pass PressEvents to `useButton` or `usePress`;
- a custom menu item should pass PressEvents to `useMenuItem`;
- a wrapper must not spread `AriaButtonProps` onto an arbitrary native element
  unless it intentionally adapts the props first.

## 4. Source of the warning in this library

The problematic path is the trigger wrapper:

```text
TriggerMenu
  -> useMenuTrigger
  -> menuTriggerProps
  -> cloneElement(child, menuTriggerProps)
  -> native button receives abstract PressEvents
```

The child should either be a component that consumes the React Aria button props,
or the wrapper should map the props through `useButton`/`usePress` before they
reach a native element. `ItemMenu` and `useMenuItem` are not the primary source
of the leak.

## 5. Practical conclusion

The correct fix is not to remove every unknown prop from `menuItemProps`. The
menu-item hook already returns DOM-compatible props for its intended element.
The fix is to keep abstract trigger props inside a React Aria-aware component and
avoid cloning them directly onto native DOM children.
