// themes/animations.css.ts
import { globalKeyframes } from "@vanilla-extract/css";

globalKeyframes("spin", {
  "0%": { transform: "rotate(0deg)" },
  "100%": { transform: "rotate(360deg)" },
});

globalKeyframes("fadeIn", {
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

globalKeyframes("fadeOut", {
  "0%": { opacity: 1 },
  "100%": { opacity: 0 },
});

globalKeyframes("slideUp", {
  "0%": { transform: "translateY(10px)", opacity: 0 },
  "100%": { transform: "translateY(0)", opacity: 1 },
});

globalKeyframes("slideDown", {
  "0%": { transform: "translateY(-10px)", opacity: 0 },
  "100%": { transform: "translateY(0)", opacity: 1 },
});

globalKeyframes("scaleIn", {
  "0%": { transform: "scale(0.95)", opacity: 0 },
  "100%": { transform: "scale(1)", opacity: 1 },
});

globalKeyframes("pulse", {
  "0%, 100%": { opacity: 1 },
  "50%": { opacity: 0.5 },
});

// Export names for use in styles.

/** how to use inside components:
 * animation: `${animations.spin} 1s linear infinite`
 * animation: `${animations.fadeIn} 0.2s ease-out`,
 * */
export const animations = {
  spin: "spin",
  fadeIn: "fadeIn",
  fadeOut: "fadeOut",
  slideUp: "slideUp",
  slideDown: "slideDown",
  scaleIn: "scaleIn",
  pulse: "pulse",
} as const;

// Ready-to-use presets.
/** how to use inside components:
 * animation: animationPresets.spinFast
 */
export const animationPresets = {
  spinSlow: `spin 1.5s linear infinite`,
  spinFast: `spin 0.5s linear infinite`,
  fadeInFast: `fadeIn 0.15s ease-out`,
  fadeInNormal: `fadeIn 0.3s ease-out`,
  slideUpFast: `slideUp 0.2s ease-out`,
  pulse: `pulse 2s ease-in-out infinite`,
} as const;
