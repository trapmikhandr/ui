import { style } from "@vanilla-extract/css";
import { recipe } from "@vanilla-extract/recipes";
import { focusRing } from "@/shared/utils";
import { colorContract, globalContract } from "@/themes";

export const item = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    gap: globalContract.spacing.smd, // 12dp per spec (leading→content→trailing)
    paddingInline: globalContract.spacing.md, // 16dp per spec
    paddingBlock: "10px", // 10dp per spec
    minHeight: 56, // 56dp min height per spec
    width: "100%",
    textAlign: "left",
    border: "none",
    fontFamily: "inherit",
    outline: "none",
    boxSizing: "border-box",
    transition: "background-color 0.15s ease",

    ":focus-visible": focusRing(),
    ":disabled": {
      cursor: "not-allowed",
      opacity: colorContract.state.disabledOpacity,
    },
  },

  variants: {
    /**
     * variant="card"  — opaque background + rounded corners. For standalone cards.
     * variant="list"  — transparent background. For rows in a shared section.
     */
    variant: {
      card: { borderRadius: globalContract.shape.lg },
      list: { backgroundColor: "transparent", borderRadius: 0 },
    },

    /**
     * context — the surface beneath the component.
     */
    context: {
      page: {},
      elevated: {},
    },

    isInteractive: {
      true: { cursor: "pointer" },
      false: { cursor: "default" },
    },
  },

  compoundVariants: [
    // ── card backgrounds ──────────────────────────────────────────────────
    {
      variants: { variant: "card", context: "page" },
      style: { backgroundColor: colorContract.surface.containerLow },
    },
    {
      variants: { variant: "card", context: "elevated" },
      style: { backgroundColor: colorContract.surface.containerHigh },
    },

    // ── card hover / active ───────────────────────────────────────────────
    {
      variants: { variant: "card", context: "page", isInteractive: true },
      style: {
        ":hover": { backgroundColor: colorContract.surface.container },
        ":active": { backgroundColor: colorContract.surface.containerHigh },
      },
    },
    {
      variants: { variant: "card", context: "elevated", isInteractive: true },
      style: {
        ":hover": { backgroundColor: colorContract.surface.containerHighest },
        ":active": { backgroundColor: colorContract.surface.containerHighest },
      },
    },

    // ── list hover / active ───────────────────────────────────────────────
    {
      variants: { variant: "list", context: "page", isInteractive: true },
      style: {
        ":hover": { backgroundColor: colorContract.surface.containerLowest },
        ":active": { backgroundColor: colorContract.surface.containerLow },
      },
    },
    {
      variants: { variant: "list", context: "elevated", isInteractive: true },
      style: {
        ":hover": { backgroundColor: colorContract.surface.container },
        ":active": { backgroundColor: colorContract.surface.containerHigh },
      },
    },
  ],

  defaultVariants: {
    variant: "card",
    context: "page",
    isInteractive: false,
  },
});

export const leading = style({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const content = style({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "2px",
  minWidth: 0,
});

// Body Large per M3 spec
export const headlineText = style({
  fontSize: globalContract.typography.body.large.fontSize,
  lineHeight: globalContract.typography.body.large.lineHeight,
  fontWeight: globalContract.typography.body.large.fontWeight,
  letterSpacing: globalContract.typography.body.large.letterSpacing,
  color: colorContract.onSurface.default,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

// Body Medium per M3 spec
export const supportingText = style({
  fontSize: globalContract.typography.body.medium.fontSize,
  lineHeight: globalContract.typography.body.medium.lineHeight,
  fontWeight: globalContract.typography.body.medium.fontWeight,
  letterSpacing: globalContract.typography.body.medium.letterSpacing,
  color: colorContract.onSurface.variant,
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
});

export const trailing = style({
  flexShrink: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: colorContract.onSurface.variant,
});

// Leading icon slot — 24dp, on-surface-variant per spec
export const iconSlot = style({
  width: 24,
  height: 24,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  color: colorContract.onSurface.variant,
  fontSize: "24px",
});

// Avatar slot — 40dp circular, primary-container bg per spec
export const avatarSlot = recipe({
  base: {
    width: 40,
    height: 40,
    borderRadius: globalContract.shape.full,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "18px",
    fontWeight: "500",
    backgroundColor: colorContract.primary.container,
    color: colorContract.primary.onContainer,
  },
  variants: {
    tone: {
      primary: {
        backgroundColor: colorContract.primary.container,
        color: colorContract.primary.onContainer,
      },
      neutral: {
        backgroundColor: colorContract.surface.containerHigh,
        color: colorContract.onSurface.variant,
      },
      success: {
        backgroundColor: colorContract.success.container,
        color: colorContract.success.onContainer,
      },
      error: {
        backgroundColor: colorContract.error.container,
        color: colorContract.error.onContainer,
      },
    },
  },
  defaultVariants: { tone: "primary" },
});
