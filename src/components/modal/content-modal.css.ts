/**
 * content-modal.css.ts - Styles for the ModalContent component.
 *
 * ✅ Use colorContract for colors (changes between light and dark themes).
 * ✅ Use globalContract for spacing, shape, elevation, and zIndex.
 * ✅ Structure based on the M3 Dialog specification.
 */

import { style } from "@vanilla-extract/css";
import { colorContract, globalContract } from "@/themes";

/**
 * Backdrop (dimmed background).
 * M3 scrim with transparency to focus attention on the dialog.
 * Use rgba instead of opacity so child elements are not affected.
 */
export const backdrop = style({
  position: "fixed",
  inset: 0,
  backgroundColor: `color-mix(in srgb, ${colorContract.scrim} 32%, transparent)`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: globalContract.zIndex.modal,
});

/**
 * Modal container
 * M3: surface.containerHighest for modal windows.
 */
export const modal = style({
  backgroundColor: colorContract.surface.containerHighest,
  borderRadius: globalContract.shape.lg,
  padding: globalContract.spacing.lg,
  maxWidth: "560px", // M3 standard dialog max width
  width: "90%",
  maxHeight: "90vh",
  overflow: "auto",
  boxShadow: globalContract.elevation.level3, // M3 elevation for dialogs
  color: colorContract.onSurface.default,
});
