/**
 * GLOBAL CONTRACT
 *
 * Contract for tokens that do not change between themes:
 * - spacing
 * - typography
 * - shape
 * - zIndex
 *
 * Values are defined once in global.css.ts.
 */

import { createGlobalThemeContract } from "@vanilla-extract/css";

// ═══════════════════════════════════════════════════════════════════════════
// INTERFACES WITH JSDOC
// ═══════════════════════════════════════════════════════════════════════════

type CSSVarFunction = `var(--${string})`;

interface TypographyScale {
  fontSize: CSSVarFunction;
  lineHeight: CSSVarFunction;
  letterSpacing: CSSVarFunction;
  fontWeight: CSSVarFunction;
}

/**
 * SPACING - Spacing system
 * Used for margins, padding, and gaps between elements.
 * Based on a 4px scale (xs = 4px, sm = 8px, and so on).
 */
export interface SpacingContract {
  [key: string]: CSSVarFunction;
  /** 0px - No spacing. Use to reset spacing and for dense layouts. */
  none: CSSVarFunction;
  /** 4px - Minimum spacing. Use for dense component spacing and icon-to-text gaps. */
  xs: CSSVarFunction;
  /** 8px - Small spacing. Use for button padding and gaps between related elements. */
  sm: CSSVarFunction;
  /** 12px - Between sm and md. Use for list-item padding and compact input padding. */
  smd: CSSVarFunction;
  /** 16px - Medium spacing. Use for standard card padding and margins between sections. */
  md: CSSVarFunction;
  /** 20px - Between md and lg. Use for section gaps and button-group spacing. */
  mdl: CSSVarFunction;
  /** 24px - Large spacing. Use for container padding and margins between groups. */
  lg: CSSVarFunction;
  /** 32px - Extra-large spacing. Use for page padding and margins between large blocks. */
  xl: CSSVarFunction;
  /** 48px - Extra-large spacing. Use for gaps between major sections. */
  "2xl": CSSVarFunction;
  /** 64px - Maximum spacing. Use for hero sections and page separators. */
  "3xl": CSSVarFunction;
}

/**
 * SHAPE - Corner-radius system
 * Used for element borderRadius values.
 */
export interface ShapeContract {
  [key: string]: CSSVarFunction;
  /** 0px - No rounding. Use for strict designs and tables. */
  none: CSSVarFunction;
  /** 4px - Minimal rounding. Use for chips and small elements. */
  xs: CSSVarFunction;
  /** 8px - Small rounding. Use for inputs and small buttons. */
  sm: CSSVarFunction;
  /** 12px - Medium rounding. Use for cards, containers, and standard buttons. */
  md: CSSVarFunction;
  /** 16px - Large rounding. Use for large cards and FABs. */
  lg: CSSVarFunction;
  /** 28px - Extra-large rounding. Use for bottom sheets and large containers. */
  xl: CSSVarFunction;
  /** 9999px - Fully rounded. Use for round buttons, avatars, and pills. */
  full: CSSVarFunction;
}

/**
 * Z-INDEX - Element stacking layers
 * Used to control the rendering order of elements.
 */
export interface ZIndexContract {
  [key: string]: CSSVarFunction;
  /** -1 - Hidden layer. Use for elements behind content. */
  hide: CSSVarFunction;
  /** 0 - Base layer. Use for regular content. */
  base: CSSVarFunction;
  /** 1000 - Dropdown layer. Use for dropdown menus and select options. */
  dropdown: CSSVarFunction;
  /** 1100 - Sticky layer. Use for sticky headers and navigation. */
  sticky: CSSVarFunction;
  /** 1200 - Fixed layer. Use for fixed headers and floating buttons. */
  fixed: CSSVarFunction;
  /** 1300 - Modal layer. Use for modals and dialogs. */
  modal: CSSVarFunction;
  /** 1400 - Popover layer. Use for popovers and context menus. */
  popover: CSSVarFunction;
  /** 1500 - Tooltip layer. Use for tooltips and the topmost elements. */
  tooltip: CSSVarFunction;
}

/**
 * ELEVATION - M3 shadow system
 * Used to create visual depth and hierarchy.
 */
export interface ElevationContract {
  [key: string]: CSSVarFunction;
  /** Level 0 - No shadow. Use for elements on the same level as the surface. */
  level0: CSSVarFunction;
  /** Level 1 - Minimal shadow. Use for cards, chips, and slight elevation. */
  level1: CSSVarFunction;
  /** Level 2 - Small shadow. Use for card hover states and raised buttons. */
  level2: CSSVarFunction;
  /** Level 3 - Medium shadow. Use for dropdown menus, select popovers, and modals. */
  level3: CSSVarFunction;
  /** Level 4 - Prominent shadow. Use for navigation drawers and modal dialogs. */
  level4: CSSVarFunction;
  /** Level 5 - Maximum shadow. Use for tooltips, topmost elements, and floating action buttons. */
  level5: CSSVarFunction;
}

/**
 * Font Families
 */
interface FontFamilyContract {
  [key: string]: CSSVarFunction;
  /** Primary brand font. Use for headings, UI elements, and body text. */
  brand: CSSVarFunction;
  /** Plain font. Use for long-form text and documentation. */
  plain: CSSVarFunction;
  /** Monospace font. Use for code, numbers, and tabular data. */
  mono: CSSVarFunction;
}

/**
 * DISPLAY - Largest text (57-45px)
 * Used for hero headings, splash screens, and large accents.
 */
interface DisplayContract {
  /** 57px - Largest. Use for the main hero heading. */
  large: TypographyScale;
  /** 45px - Large. Use for a secondary hero heading. */
  medium: TypographyScale;
  /** 36px - Medium display. Use for accent headings. */
  small: TypographyScale;
}

/**
 * HEADLINE - Large headings (32-24px)
 * Used for page headings and main sections.
 */
interface HeadlineContract {
  /** 32px - Page heading. Use for h1 and page titles. */
  large: TypographyScale;
  /** 28px - Section heading. Use for h2 and section titles. */
  medium: TypographyScale;
  /** 24px - Subheading. Use for h3 and subsection titles. */
  small: TypographyScale;
}

/**
 * TITLE - Medium headings (22-14px)
 * Used for card, dialog, and list headings.
 */
interface TitleContract {
  /** 22px - Card heading. Use for card and dialog titles. */
  large: TypographyScale;
  /** 16px - List item heading. Use for list item titles and tab labels. */
  medium: TypographyScale;
  /** 14px - Small heading. Use for input labels and caption titles. */
  small: TypographyScale;
}

/**
 * BODY - Body text (16-12px)
 * Used for paragraphs, descriptions, and primary content.
 */
interface BodyContract {
  /** 16px - Large text. Use for primary paragraphs and prominent text. */
  large: TypographyScale;
  /** 14px - Standard text. Use for regular paragraphs and default body text. */
  medium: TypographyScale;
  /** 12px - Small text. Use for supporting text and long descriptions. */
  small: TypographyScale;
}

/**
 * LABEL - UI labels (14-11px)
 * Used for buttons, forms, and UI elements.
 */
interface LabelContract {
  /** 14px - Large label. Use for large buttons and prominent labels. */
  large: TypographyScale;
  /** 12px - Standard label. Use for buttons, input labels, and chips. */
  medium: TypographyScale;
  /** 11px - Small label. Use for small buttons, timestamps, and badges. */
  small: TypographyScale;
}

/**
 * TYPOGRAPHY - M3 typography system
 * Hierarchy: Display > Headline > Title > Body > Label.
 */
interface TypographyContract {
  fontFamily: FontFamilyContract;
  /** Largest text (57-45px). Hero headings and splash screens. */
  display: DisplayContract;
  /** Large headings (32-24px). Page headings and main sections. */
  headline: HeadlineContract;
  /** Medium headings (22-14px). Cards, dialogs, and lists. */
  title: TitleContract;
  /** Body text (16-12px). Paragraphs and descriptions. */
  body: BodyContract;
  /** UI labels (14-11px). Buttons, forms, and UI elements. */
  label: LabelContract;
}

/**
 * GLOBAL CONTRACT - Complete interface
 */
export interface GlobalContractType {
  /** Spacing system (margin, padding, gap). 4px scale. */
  spacing: SpacingContract;
  /** M3 typography system. */
  typography: TypographyContract;
  /** Corner-radius system (borderRadius). */
  shape: ShapeContract;
  /** Element stacking layers. */
  zIndex: ZIndexContract;
  /** M3 shadow system. */
  elevation: ElevationContract;
}

// ═══════════════════════════════════════════════════════════════════════════
// CONTRACT IMPLEMENTATION
// ═══════════════════════════════════════════════════════════════════════════

const _globalContract = createGlobalThemeContract({
  spacing: {
    none: "spacing-none",
    xs: "spacing-xs",
    sm: "spacing-sm",
    smd: "spacing-smd",
    md: "spacing-md",
    mdl: "spacing-mdl",
    lg: "spacing-lg",
    xl: "spacing-xl",
    "2xl": "spacing-2xl",
    "3xl": "spacing-3xl",
  },

  typography: {
    fontFamily: {
      brand: "font-family-brand",
      plain: "font-family-plain",
      mono: "font-family-mono",
    },

    display: {
      large: {
        fontSize: "display-large-size",
        lineHeight: "display-large-line-height",
        letterSpacing: "display-large-letter-spacing",
        fontWeight: "display-large-weight",
      },
      medium: {
        fontSize: "display-medium-size",
        lineHeight: "display-medium-line-height",
        letterSpacing: "display-medium-letter-spacing",
        fontWeight: "display-medium-weight",
      },
      small: {
        fontSize: "display-small-size",
        lineHeight: "display-small-line-height",
        letterSpacing: "display-small-letter-spacing",
        fontWeight: "display-small-weight",
      },
    },

    headline: {
      large: {
        fontSize: "headline-large-size",
        lineHeight: "headline-large-line-height",
        letterSpacing: "headline-large-letter-spacing",
        fontWeight: "headline-large-weight",
      },
      medium: {
        fontSize: "headline-medium-size",
        lineHeight: "headline-medium-line-height",
        letterSpacing: "headline-medium-letter-spacing",
        fontWeight: "headline-medium-weight",
      },
      small: {
        fontSize: "headline-small-size",
        lineHeight: "headline-small-line-height",
        letterSpacing: "headline-small-letter-spacing",
        fontWeight: "headline-small-weight",
      },
    },

    title: {
      large: {
        fontSize: "title-large-size",
        lineHeight: "title-large-line-height",
        letterSpacing: "title-large-letter-spacing",
        fontWeight: "title-large-weight",
      },
      medium: {
        fontSize: "title-medium-size",
        lineHeight: "title-medium-line-height",
        letterSpacing: "title-medium-letter-spacing",
        fontWeight: "title-medium-weight",
      },
      small: {
        fontSize: "title-small-size",
        lineHeight: "title-small-line-height",
        letterSpacing: "title-small-letter-spacing",
        fontWeight: "title-small-weight",
      },
    },

    body: {
      large: {
        fontSize: "body-large-size",
        lineHeight: "body-large-line-height",
        letterSpacing: "body-large-letter-spacing",
        fontWeight: "body-large-weight",
      },
      medium: {
        fontSize: "body-medium-size",
        lineHeight: "body-medium-line-height",
        letterSpacing: "body-medium-letter-spacing",
        fontWeight: "body-medium-weight",
      },
      small: {
        fontSize: "body-small-size",
        lineHeight: "body-small-line-height",
        letterSpacing: "body-small-letter-spacing",
        fontWeight: "body-small-weight",
      },
    },

    label: {
      large: {
        fontSize: "label-large-size",
        lineHeight: "label-large-line-height",
        letterSpacing: "label-large-letter-spacing",
        fontWeight: "label-large-weight",
      },
      medium: {
        fontSize: "label-medium-size",
        lineHeight: "label-medium-line-height",
        letterSpacing: "label-medium-letter-spacing",
        fontWeight: "label-medium-weight",
      },
      small: {
        fontSize: "label-small-size",
        lineHeight: "label-small-line-height",
        letterSpacing: "label-small-letter-spacing",
        fontWeight: "label-small-weight",
      },
    },
  },

  shape: {
    none: "shape-none",
    xs: "shape-xs",
    sm: "shape-sm",
    md: "shape-md",
    lg: "shape-lg",
    xl: "shape-xl",
    full: "shape-full",
  },

  zIndex: {
    hide: "z-hide",
    base: "z-base",
    dropdown: "z-dropdown",
    sticky: "z-sticky",
    fixed: "z-fixed",
    modal: "z-modal",
    popover: "z-popover",
    tooltip: "z-tooltip",
  },

  elevation: {
    level0: "elevation-level0",
    level1: "elevation-level1",
    level2: "elevation-level2",
    level3: "elevation-level3",
    level4: "elevation-level4",
    level5: "elevation-level5",
  },
});

/**
 * Internal contract used by createGlobalTheme.
 * @internal
 */
export const globalContractRaw = _globalContract;

/**
 * globalContract with JSDoc typing for IDE support.
 * Use this object to access tokens in components.
 */
export const globalContract: GlobalContractType =
  _globalContract as unknown as GlobalContractType;

export type GlobalContract = typeof _globalContract;
