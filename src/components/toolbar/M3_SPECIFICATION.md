# Material 3 Toolbar Specification

This document records the reference tokens and design rules for the `Toolbar`
component, including docked and floating variants, based on Material Design 3.

## Docked vs. floating

| Property | Docked toolbar | Floating toolbar |
| --- | --- | --- |
| Purpose | Global page actions or section navigation | Contextual actions for the current area or selection |
| Height | `64dp` | `64dp` |
| Shape | `0dp` rectangular | Full pill shape |
| Elevation | Level 0, separated by a top border | Level 3 with a soft shadow |
| Border | Optional `outline-variant` top line | `outline-variant` around the perimeter |
| Horizontal padding | `16dp` | `8dp` |

## Material 3 and library tokens

`@trapmikhandr/ui` maps Material 3 roles through the `colorContract` contract.

| Material 3 role | Library token | Light-theme example |
| --- | --- | --- |
| Docked vibrant container | `colorContract.primary.container` | `#E8F5E9` |
| Floating standard container | `colorContract.surface.containerHighest` | `#EBE6DF` |
| Floating vibrant container | `colorContract.primary.container` | `#E8F5E9` |

## Button and icon states

### Standard scheme

The standard scheme keeps visual noise low and focuses attention on the main
content.

| State | Element | Token |
| --- | --- | --- |
| Enabled | Default icon or text | `colorContract.onSurface.variant` |
| Selected | Icon or text | `colorContract.secondary.onContainer` |
| Selected | Button container | `colorContract.secondary.container` |
| Disabled | Icon or text | `colorContract.onSurface.default` at `0.38` opacity |
| Hovered | State layer | `colorContract.onSurface.variant` at `0.08` opacity |
| Pressed | State layer | `colorContract.onSurface.variant` at `0.10` opacity |

### Vibrant scheme

Use the vibrant scheme to communicate a meaningful page-state change, such as
unsaved edits or an active multi-selection.

| State | Element | Token |
| --- | --- | --- |
| Enabled | Default icon or text | `colorContract.primary.onContainer` |
| Selected | Icon or text | `colorContract.onSurface.default` |
| Selected | Button container | `colorContract.surface.container` |
| Disabled | Icon or text | `colorContract.onSurface.default` at `0.38` opacity |
| Hovered | State layer | `colorContract.primary.onContainer` at `0.08` opacity |
| Pressed | State layer | `colorContract.primary.onContainer` at `0.10` opacity |

## Paired FAB

When a floating toolbar is paired with a FAB for creating an entity:

- Gap between toolbar and FAB: `8dp`.
- Standard scheme: secondary container with an on-secondary-container icon.
- Vibrant scheme: tertiary container with an on-tertiary-container icon.
- Expanded FAB: `56dp × 56dp`, `16dp` corners, Level 1.
- Collapsed or medium FAB: `80dp × 80dp`, `28dp` corners, Level 2.

## Contrast adaptation

Contrast is configured by replacing semantic theme-token values, not by adding
component-specific color logic:

1. Default contrast uses the standard palette.
2. Medium contrast shifts semantic colors by one or two tones for readability.
3. High contrast moves colors toward boundary values such as pure white, black,
   or fully opaque text.
