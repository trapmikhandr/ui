# Menu Component

Menu component using the composition pattern.

## Structure

```
┌──────────────────────────────────────────────────┐
│ Menu (MenuRoot)                                  │  ← useMenuTriggerState
│   ├─ ContextMenu.Provider                       │  ← useMenuTrigger
│   └─ Popover                                     │
│       ├─ Menu.Trigger (TriggerMenu)              │
│       │   └─ Button/custom element               │  ← menuTriggerProps
│       │                                           │
│       └─ Menu.Content (ContentMenu)              │
│           └─ Popover.Content                     │
│               └─ ListMenu<T>                     │  ← useMenu + useTreeState
│                   ├─ ItemMenu                    │  ← useMenuItem
│                   ├─ ItemMenu                    │
│                   └─ ItemMenu                    │
└──────────────────────────────────────────────────┘
```

## Usage

### Basic example

```tsx
<Menu>
  <Menu.Trigger>
    <Button>Actions</Button>
  </Menu.Trigger>
  <Menu.Content onAction={(key) => console.log(key)}>
    <Menu.Item key="edit">Edit</Menu.Item>
    <Menu.Item key="copy">Copy</Menu.Item>
    <Menu.Item key="delete">Delete</Menu.Item>
  </Menu.Content>
</Menu>
```

### Dynamic items

```tsx
const items = [
  { id: "edit", label: "Edit" },
  { id: "delete", label: "Delete" },
];

<Menu>
  <Menu.Trigger>
    <Button>Options</Button>
  </Menu.Trigger>
  <Menu.Content items={items} onAction={(key) => console.log(key)}>
    {(item) => <Menu.Item key={item.id}>{item.label}</Menu.Item>}
  </Menu.Content>
</Menu>
```

## Typing details

- `Menu` does not use a generic because `useMenuTrigger` works with DOM elements.
- `Menu.Content<T>` and `ListMenu<T>` are generic for typing collection data.
- `menuProps` from `useMenuTrigger` is passed through context as `Omit<AriaMenuOptions<HTMLElement>, 'items' | 'children'>` to avoid type conflicts.
- `items` and `children` are excluded from context because `ListMenu` calls `useMenu` with the correct types.
