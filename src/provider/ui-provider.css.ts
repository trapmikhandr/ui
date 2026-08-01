import { style } from "@vanilla-extract/css";

// OverlayProvider sits between <body> and the application. Without height: 100%,
// it breaks the percentage height chain used by application workspace layouts.
export const overlayProviderRoot = style({
  height: "100%",
});
