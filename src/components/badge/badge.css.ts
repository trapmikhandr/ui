import { recipe } from "@vanilla-extract/recipes";
import { colorContract, globalContract } from "@/themes";

export const badgeRecipe = recipe({
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: globalContract.shape.full,
    padding: `${globalContract.spacing.xs} ${globalContract.spacing.sm}`,
    fontFamily: globalContract.typography.fontFamily.brand,
    fontWeight: globalContract.typography.label.medium.fontWeight,
    fontSize: globalContract.typography.label.medium.fontSize,
    lineHeight: 1, // Ensure text is centered vertically
    whiteSpace: "nowrap",
    border: "1px solid transparent",
  },
  variants: {
    color: {
      default: {
        backgroundColor: colorContract.surface.containerHigh,
        color: colorContract.onSurface.variant,
        borderColor: colorContract.outline.variant,
      },
      info: {
        backgroundColor: colorContract.primary.container,
        color: colorContract.primary.onContainer,
      },
      success: {
        backgroundColor: colorContract.success.container,
        color: colorContract.success.onContainer,
      },
      warning: {
        backgroundColor: colorContract.warning.container,
        color: colorContract.warning.onContainer,
      },
      error: {
        backgroundColor: colorContract.error.container,
        color: colorContract.error.onContainer,
      },
    },
    size: {
      small: {
        padding: `2px ${globalContract.spacing.xs}`,
        fontSize: globalContract.typography.label.small.fontSize,
      },
      medium: {
        padding: `${globalContract.spacing.xs} ${globalContract.spacing.sm}`,
        fontSize: globalContract.typography.label.medium.fontSize,
      },
    },
  },
  defaultVariants: {
    color: "default",
    size: "medium",
  },
});
