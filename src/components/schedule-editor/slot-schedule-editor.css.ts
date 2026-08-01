import { recipe } from "@vanilla-extract/recipes";
import { focusRing } from "@/shared/utils";
import { colorContract } from "@/themes";

export const slot = recipe({
  base: {
    appearance: "none",
    position: "relative",
    border: "none",
    borderBottom: `1px solid ${colorContract.outline.variant}`,
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "background-color 0.1s ease",
    padding: 0,
    margin: 0,
    outline: "none",
    width: "100%",
    selectors: {
      "&:last-child": {
        borderBottom: "none",
      },
      "&:focus-visible": {
        ...focusRing(),
        outlineOffset: "-3px",
      },
    },
  },

  variants: {
    isWithinConstraints: {
      true: {
        cursor: "pointer",
        selectors: {
          "&:hover": {
            backgroundColor: colorContract.primary.container,
            opacity: 0.3,
          },
        },
      },
      false: {
        backgroundColor: colorContract.surface.dim,
        cursor: "not-allowed",
        opacity: 0.5,
      },
    },

    isSelected: {
      true: {},
      false: {},
    },

    isInPreview: {
      true: {},
      false: {},
    },

    isPreviewAdd: {
      true: {
        backgroundColor: colorContract.primary.container,
        opacity: 0.6,
      },
    },

    isPreviewRemove: {
      true: {
        backgroundColor: colorContract.error.container,
        opacity: 0.4,
      },
    },
  },

  defaultVariants: {
    isWithinConstraints: true,
    isSelected: false,
    isInPreview: false,
  },
});
