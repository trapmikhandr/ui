/**
 * group-variants.css.ts — shared group variants for button recipes.
 *
 * Button and IconButton can live inside <ButtonGroup>, so both recipes
 * (`button.css.ts`, `icon-button.css.ts`) need the same group variants:
 * corner rounding for the first/middle/last button, selected shape, and so on.
 * These ~38 keys used to be duplicated in both files; this is now the single source of truth.
 *
 * The only difference between recipes is the selected "square" corner
 * (`buttonSquareCorner` vs `iconButtonSquareCorner`), so it is passed
 * as a parameter to `groupCompoundVariants`.
 */

import { createVar, type StyleRule } from "@vanilla-extract/css";
import { globalContract } from "@/themes";

/** Outer corner of a connected group (rounded at the row edges). */
export const groupConnectedOuterCorner = createVar();
/** Inner corner of a connected group (the join between neighboring buttons). */
export const groupConnectedInnerCorner = createVar();

/** Group variant definitions, spread into each recipe's `variants`. */
export const groupVariants = {
  groupVariant: {
    none: {},
    standard: {
      selectors: {
        "&:active:not(:disabled)": {
          transform: "none",
        },
      },
    },
    connected: {
      selectors: {
        "&:active:not(:disabled)": {
          transform: "none",
        },
      },
    },
  },

  groupOrientation: {
    horizontal: {},
    vertical: {},
  },

  groupSize: {
    xs: {
      vars: {
        [groupConnectedOuterCorner]: globalContract.shape.xs,
        [groupConnectedInnerCorner]: globalContract.shape.xs,
      },
    },
    s: {
      vars: {
        [groupConnectedOuterCorner]: globalContract.shape.sm,
        [groupConnectedInnerCorner]: globalContract.shape.sm,
      },
    },
    m: {
      vars: {
        [groupConnectedOuterCorner]: globalContract.shape.sm,
        [groupConnectedInnerCorner]: globalContract.shape.sm,
      },
    },
    l: {
      vars: {
        [groupConnectedOuterCorner]: globalContract.shape.lg,
        [groupConnectedInnerCorner]: globalContract.shape.lg,
      },
    },
    xl: {
      vars: {
        [groupConnectedOuterCorner]: "20px",
        [groupConnectedInnerCorner]: "20px",
      },
    },
  },

  groupShape: {
    round: {
      vars: {
        [groupConnectedOuterCorner]: globalContract.shape.full,
      },
    },
    square: {},
  },

  groupPosition: {
    first: {},
    middle: {},
    last: {},
    only: {},
  },

  groupInteraction: {
    idle: {},
    pressed: {},
    selected: {},
    adjacentToPressed: {},
    adjacentToSelected: {},
  },
};

type GroupCompoundVariant = {
  variants: {
    groupVariant?: "none" | "standard" | "connected";
    groupOrientation?: "horizontal" | "vertical";
    groupSize?: "xs" | "s" | "m" | "l" | "xl";
    groupShape?: "round" | "square";
    groupPosition?: "first" | "middle" | "last" | "only";
    groupInteraction?:
      | "idle"
      | "pressed"
      | "selected"
      | "adjacentToPressed"
      | "adjacentToSelected";
  };
  style: StyleRule;
};

/**
 * Compound variants for a connected group (corners + minimum width).
 *
 * @param squareCorner - variable for the recipe's "square" corner
 *   (`buttonSquareCorner` / `iconButtonSquareCorner`), applied when selected.
 */
export function groupCompoundVariants(
  squareCorner: string,
): GroupCompoundVariant[] {
  return [
    {
      variants: { groupVariant: "connected", groupPosition: "only" },
      style: { borderRadius: groupConnectedOuterCorner },
    },
    {
      variants: {
        groupVariant: "connected",
        groupOrientation: "horizontal",
        groupPosition: "first",
      },
      style: {
        borderTopLeftRadius: groupConnectedOuterCorner,
        borderBottomLeftRadius: groupConnectedOuterCorner,
        borderTopRightRadius: groupConnectedInnerCorner,
        borderBottomRightRadius: groupConnectedInnerCorner,
      },
    },
    {
      variants: {
        groupVariant: "connected",
        groupOrientation: "horizontal",
        groupPosition: "middle",
      },
      style: { borderRadius: groupConnectedInnerCorner },
    },
    {
      variants: {
        groupVariant: "connected",
        groupOrientation: "horizontal",
        groupPosition: "last",
      },
      style: {
        borderTopLeftRadius: groupConnectedInnerCorner,
        borderBottomLeftRadius: groupConnectedInnerCorner,
        borderTopRightRadius: groupConnectedOuterCorner,
        borderBottomRightRadius: groupConnectedOuterCorner,
      },
    },
    {
      variants: {
        groupVariant: "connected",
        groupOrientation: "vertical",
        groupPosition: "first",
      },
      style: {
        borderTopLeftRadius: groupConnectedOuterCorner,
        borderTopRightRadius: groupConnectedOuterCorner,
        borderBottomLeftRadius: groupConnectedInnerCorner,
        borderBottomRightRadius: groupConnectedInnerCorner,
      },
    },
    {
      variants: {
        groupVariant: "connected",
        groupOrientation: "vertical",
        groupPosition: "middle",
      },
      style: { borderRadius: groupConnectedInnerCorner },
    },
    {
      variants: {
        groupVariant: "connected",
        groupOrientation: "vertical",
        groupPosition: "last",
      },
      style: {
        borderTopLeftRadius: groupConnectedInnerCorner,
        borderTopRightRadius: groupConnectedInnerCorner,
        borderBottomLeftRadius: groupConnectedOuterCorner,
        borderBottomRightRadius: groupConnectedOuterCorner,
      },
    },
    {
      variants: { groupVariant: "connected", groupInteraction: "selected" },
      style: { borderRadius: squareCorner },
    },
    {
      variants: {
        groupVariant: "connected",
        groupShape: "square",
        groupInteraction: "selected",
      },
      style: { borderRadius: globalContract.shape.full },
    },
    {
      variants: { groupVariant: "connected", groupSize: "xs" },
      style: { minWidth: "48px" },
    },
    {
      variants: { groupVariant: "connected", groupSize: "s" },
      style: { minWidth: "48px" },
    },
  ];
}
