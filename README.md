# @trapmikhandr/ui

React components and design tokens built with React Aria, Vanilla Extract, and
Material Design 3. The library includes form controls, overlays, layout
primitives, tables, calendars, media controls, and ready-to-use themes.

**[View the live Storybook](https://trapmikhandr.github.io/ui/)**

## Features

- Accessible components powered by React Aria.
- Type-safe styling with Vanilla Extract.
- Light and dark themes built on semantic design tokens.
- Storybook examples for the component library.
- React 18 and React 19 support.

## Installation

The package is not published to npm yet. To run the project locally:

```bash
git clone git@github.com:trapmikhandr/ui.git
cd ui
pnpm install
```

After installing dependencies, use Storybook to explore the components:

```bash
pnpm sb
```

The package build also produces ESM and CommonJS entry points in `dist/` for
local package testing. Component props and variants are documented in
Storybook and exposed through the generated TypeScript declarations.

Large component groups are also available through separate entry points:

```tsx
import { Calendar } from "@trapmikhandr/ui/calendar";
import { VideoPlayer } from "@trapmikhandr/ui/video-player";
```

The root import remains available when an application uses several component
groups together.

## Theming

The token system is split into three layers:

```text
src/themes/primitives  →  src/themes/contracts  →  light.css.ts / dark.css.ts
```

Components consume semantic contracts, so theme values can be changed in one
place. The package exports `lightTheme`, `darkTheme`, `globalTheme`,
`colorContract`, `globalContract`, and `densityContract`.

```tsx
import { darkTheme, lightTheme } from "@trapmikhandr/ui";

<div className={isDark ? darkTheme : lightTheme}>
  <App />
</div>;
```

The library does not load fonts. The consuming application can define
`--app-font-family-brand` and own the font licensing, loading, and assets.

### Creating a custom color palette

Color palettes are compatible with the JSON export from the [Material Theme
Builder](https://material-foundation.github.io/material-theme-builder/).
Generated palettes live in
[`src/themes/primitives/material-pressets`](./src/themes/primitives/material-pressets/).

To add a palette:

1. Open Material Theme Builder and create a theme from a seed color.
2. Export the theme as JSON.
3. Create a directory under `src/themes/primitives/material-pressets`, for
   example `ocean`.
4. Put the exported file there as `material-theme.json`.
5. Register the JSON in `src/themes/primitives/material-pressets/index.ts`.

The registration follows the existing presets:

```ts
import oceanJson from "./ocean/material-theme.json";

export const ocean = {
  schemes: oceanJson.schemes,
  palettes: {
    primary: oceanJson.palettes.primary,
    secondary: oceanJson.palettes.secondary,
    tertiary: oceanJson.palettes.tertiary,
    neutral: oceanJson.palettes.neutral,
    neutralVariant: oceanJson.palettes["neutral-variant"],
    ...staticColors,
  },
} as const;
```

To make the new palette active, update
`src/themes/primitives/colors.ts`:

```ts
export { ocean as colors } from "./material-pressets";
```

The active palette is selected at build time. Rebuild the library or Storybook
after changing it. The Material Theme Builder export provides the brand
palettes and light/dark schemes; `error`, `success`, and `warning` are shared
static palettes defined by the library.

## Storybook

The latest Storybook build is available online:

[https://trapmikhandr.github.io/ui/](https://trapmikhandr.github.io/ui/)

Start the local Storybook development server:

```bash
pnpm sb
```

It runs at `http://localhost:6006`. Stories are organized under a single
`Components` tree with the following categories:

`Actions`, `Forms`, `Navigation`, `Data Display`, `Feedback`, `Overlays`,
`Calendar`, `Layout`, `Media`, and `Typography`.

## Project Structure

- `src/components` — components and their Storybook stories.
- `src/themes` — Material Design 3 tokens, contracts, and themes.
- `src/provider` — `UIProvider`, `ThemeProvider`, and context providers.
- `src/sprinkles` — type-safe atomic styling utilities.
- `src/shared` — small shared utilities.

## Development

```bash
pnpm install
pnpm check
pnpm test
pnpm build
pnpm build-storybook
pnpm analyze
```

`pnpm analyze` creates a local `stats.html` report for inspecting the production
bundle composition. The report is ignored by Git.

## Package validation

Before sharing changes or preparing a future release, run the quality checks,
builds, and package validation:

```bash
pnpm check
pnpm test
pnpm build
pnpm build-storybook
pnpm pack --dry-run
```

## Status

The project is under active development. APIs may change before the first
stable release.

## License

MIT © 2026 trapmikhandr
