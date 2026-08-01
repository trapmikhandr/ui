# Material 3 Sheet Specification

This document records the design and token decisions for the `Sheet` component.

## Variants

| Variant | Typical use | Width | Shape | Elevation |
| --- | --- | --- | --- | --- |
| Standard | Supporting content and secondary flows | Content-sized or full width | Large top corners | Level 1 |
| Modal | Focused task that blocks the underlying page | Full width on mobile | Large top corners | Level 3 |
| Side | Supporting content on wide screens | Fixed side width | Large inner corners | Level 1 |

## Tokens

The component uses semantic theme tokens rather than hard-coded colors:

- Container: `colorContract.surface.containerLow`
- Text: `colorContract.onSurface.default`
- Divider: `colorContract.outline.variant`
- Scrim: `colorContract.scrim`
- Handle: `colorContract.onSurface.variant`

The exact token values are supplied by the active theme, so light, dark, and
high-contrast themes remain consistent.

## Interaction and accessibility

- A modal sheet traps focus while open and restores focus when closed.
- Escape closes a dismissible sheet.
- The drag handle is labelled and exposes the current expanded/collapsed state.
- Content must remain usable with keyboard navigation and assistive technology.
- A scrim should communicate modality without reducing text contrast.

## Motion

Opening and closing should use a short emphasized easing curve. Dragging follows
the pointer directly; releasing the sheet settles it to the nearest valid state.
