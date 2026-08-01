import { colorContract } from "../../themes/contracts/color.contract.css";

/**
 * Halo focus ring — a translucent focus outline.
 * Apply it in a component's :focus-visible selector.
 */
export const focusRing = (color: string = colorContract.primary.base) => ({
  outline: `3px solid color-mix(in srgb, ${color}, transparent 70%)`,
  outlineOffset: "2px" as const,
});

export const focusTransition = {
  transition:
    "outline 0.2s ease, outline-offset 0.15s ease, box-shadow 0.2s ease",
} as const;
