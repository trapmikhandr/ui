import { recipe } from "@vanilla-extract/recipes";
import { animationPresets } from "@/themes"; // Animation presets.

export const iconStyle = recipe({
  base: {
    width: "1.25em",
    height: "1.25em",
    display: "inline-block",
    flexShrink: 0,
    strokeWidth: "2px",
    contain: "layout paint",
  },

  variants: {
    spinning: {
      true: {
        animation: animationPresets.spinSlow,
      },
    },
    // Keep this available for future size overrides.
    size: {
      inherit: { width: "1em", height: "1em" }, // Match the font size.
      button: { width: "1.25em", height: "1.25em" }, // Current button size.
      sm: { width: "16px", height: "16px" },
      md: { width: "24px", height: "24px" },
      lg: { width: "32px", height: "32px" },
    },
  },

  defaultVariants: {
    size: "button",
  },
});
