import { resolve } from "node:path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const externalDependencies = [
  /^react($|\/)/,
  /^react-dom($|\/)/,
  /^@dnd-kit\//,
  /^@tanstack\//,
  /^@use-gesture\//,
  /^clsx($|\/)/,
  /^date-fns($|\/)/,
  /^date-fns-tz($|\/)/,
  /^lucide-react($|\/)/,
  /^motion($|\/)/,
  /^react-aria($|\/)/,
  /^react-stately($|\/)/,
];

const libraryEntries = {
  root: "src/index.ts",
  "app-layout": "src/components/app-layout/index.ts",
  avatar: "src/components/avatar/index.ts",
  badge: "src/components/badge/index.ts",
  button: "src/components/button/index.ts",
  "button-group": "src/components/button-group/index.ts",
  calendar: "src/components/calendar/index.ts",
  checkbox: "src/components/checkbox/index.ts",
  combobox: "src/components/combobox/index.ts",
  fab: "src/components/fab/index.ts",
  "fab-menu": "src/components/fab-menu/index.ts",
  icon: "src/components/icon/index.ts",
  input: "src/components/input/index.ts",
  "landing-layout": "src/components/landing-layout/index.ts",
  "list-box": "src/components/list-box/index.ts",
  "list-item": "src/components/list-item/index.ts",
  menu: "src/components/menu/index.ts",
  modal: "src/components/modal/index.ts",
  navigation: "src/components/navigation/index.ts",
  pagination: "src/components/pagination/index.ts",
  popover: "src/components/popover/index.ts",
  "progress-bar": "src/components/progress-bar/index.ts",
  "schedule-editor": "src/components/schedule-editor/index.ts",
  "segmented-button": "src/components/segmented-button/index.ts",
  select: "src/components/select/index.ts",
  sheet: "src/components/sheet/index.ts",
  slider: "src/components/slider/index.ts",
  "split-button": "src/components/split-button/index.ts",
  table: "src/components/table/index.ts",
  tabs: "src/components/tabs/index.ts",
  text: "src/components/text/index.ts",
  "text-link": "src/components/text-link/index.ts",
  toast: "src/components/toast/index.ts",
  toolbar: "src/components/toolbar/index.ts",
  tooltip: "src/components/tooltip/index.ts",
  "top-app-bar": "src/components/top-app-bar/index.ts",
  "video-player": "src/components/video-player/index.ts",
};

// https://vitejs.dev/config/
export default defineConfig(async () => {
  const analysisPlugins =
    process.env.ANALYZE === "1"
      ? [
          (await import("rollup-plugin-visualizer")).visualizer({
            filename: "stats.html",
            open: false,
            gzipSize: true,
            brotliSize: true,
          }),
        ]
      : [];

  return {
    plugins: [
      react(), // React support
      vanillaExtractPlugin(), // Vanilla Extract support
      dts({
        // Generate .d.ts files
        insertTypesEntry: true,
        exclude: ["**/*.stories.*", "**/*.test.*"],
      }),
      ...analysisPlugins,
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      },
    },
    build: {
      // Configure library mode
      lib: {
        entry: libraryEntries,
        name: "trapmikhandr-ui",
        formats: ["es", "cjs"],
        fileName: (format, entryName) => {
          const extension = format === "es" ? "mjs" : "cjs";
          return entryName === "root"
            ? `index.${extension}`
            : `components/${entryName}/index.${extension}`;
        },
        cssFileName: "ui",
      },
      // Keep React out of the bundle
      rollupOptions: {
        external: externalDependencies,
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      },
    },
  };
});
