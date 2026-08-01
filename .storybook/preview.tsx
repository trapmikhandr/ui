import type { Preview } from "@storybook/react";
import { useLayoutEffect } from "react";
import "../src/themes/global.css";
import "../src/themes/light.css";
import "../src/themes/dark.css";
import { colorContract } from "../src/themes";

// Applies the selected theme to each story.
function ThemeWrapper({
  theme,
  children,
}: {
  theme: string;
  children: React.ReactNode;
}) {
  useLayoutEffect(() => {
    document.body.setAttribute("data-theme", theme);
    document.body.style.backgroundColor = colorContract.surface.default;
    document.body.style.color = colorContract.onSurface.default;
  }, [theme]);

  return <>{children}</>;
}

const preview: Preview = {
  decorators: [
    (Story, context) => {
      const theme = context.globals.theme || "light";
      return (
        <ThemeWrapper theme={theme}>
          <Story />
        </ThemeWrapper>
      );
    },
  ],
  globalTypes: {
    theme: {
      description: "Global theme for components",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: ["light", "dark"],
        dynamicTitle: true,
      },
    },
  },
  parameters: {
    backgrounds: { disable: true },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Components",
          [
            "Actions",
            "Forms",
            "Navigation",
            "Data Display",
            "Feedback",
            "Overlays",
            "Calendar",
            "Layout",
            "Media",
            "Typography",
          ],
        ],
      },
    },
    sidebar: {
      showRoots: true,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
