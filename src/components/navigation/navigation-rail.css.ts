import { recipe } from "@vanilla-extract/recipes";
import { colorContract, globalContract } from "@/themes";

export const rail = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    width: "100%",
    backgroundColor: colorContract.surface.containerLow,
    boxSizing: "border-box",
    overflow: "hidden",
  },

  variants: {
    expanded: {
      false: {
        alignItems: "center",
        padding: `${globalContract.spacing.md} 0`,
      },
      true: {},
    },
  },

  defaultVariants: { expanded: false },
});

export const railHeader = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    width: "100%",
    minHeight: "64px",
    boxSizing: "border-box",
  },

  variants: {
    expanded: {
      false: {
        justifyContent: "center",
        paddingBottom: globalContract.spacing.md,
      },
      true: {
        gap: globalContract.spacing.sm,
        padding: `${globalContract.spacing.md} ${globalContract.spacing.sm}`,
      },
    },
  },

  defaultVariants: { expanded: false },
});

export const railNav = recipe({
  base: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    gap: globalContract.spacing.sm,
    overflowY: "auto",
    overflowX: "hidden",
    boxSizing: "border-box",
  },

  variants: {
    expanded: {
      false: {
        alignItems: "center",
        width: "100%",
        padding: `${globalContract.spacing.sm} ${globalContract.spacing.sm}`,
      },
      true: {
        alignItems: "flex-start",
        padding: `${globalContract.spacing.sm} ${globalContract.spacing.md}`,
      },
    },
  },

  defaultVariants: { expanded: false },
});

export const railFooter = recipe({
  base: {
    display: "flex",
    alignItems: "center",
    flexShrink: 0,
    width: "100%",
  },

  variants: {
    expanded: {
      false: {
        justifyContent: "center",
        paddingTop: globalContract.spacing.md,
      },
      true: {
        gap: globalContract.spacing.sm,
        padding: `${globalContract.spacing.sm} ${globalContract.spacing.sm}`,
        minHeight: "64px",
        boxSizing: "border-box",
      },
    },
  },

  defaultVariants: { expanded: false },
});
