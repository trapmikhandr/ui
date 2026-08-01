import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./text";

const meta = {
  title: "Components/Typography/Text",
  component: Text,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "displayLarge",
        "displayMedium",
        "displaySmall",
        "headlineLarge",
        "headlineMedium",
        "headlineSmall",
        "titleLarge",
        "titleMedium",
        "titleSmall",
        "bodyLarge",
        "bodyMedium",
        "bodySmall",
        "labelLarge",
        "labelMedium",
        "labelSmall",
      ],
    },
    color: {
      control: "select",
      options: ["default", "variant", "muted", "primary", "error", "success"],
    },
    as: {
      control: "text",
      description: "HTML tag (h1, span, p...)",
    },
    truncate: {
      control: "boolean",
    },
  },
  args: {
    children: "Example Text",
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// === 1. Default (Body Medium) ===
export const Default: Story = {
  args: {
    children: "Material Design 3 Typography",
  },
};

// === 2. Scale (full hierarchy) ===
export const TypeScale: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <Text variant="displayLarge">Display Large</Text>
      <Text variant="displayMedium">Display Medium</Text>
      <Text variant="displaySmall">Display Small</Text>
      <hr />
      <Text variant="headlineLarge">Headline Large</Text>
      <Text variant="headlineMedium">Headline Medium</Text>
      <Text variant="headlineSmall">Headline Small</Text>
      <hr />
      <Text variant="titleLarge">Title Large</Text>
      <Text variant="titleMedium">Title Medium</Text>
      <Text variant="titleSmall">Title Small</Text>
      <hr />
      <Text variant="bodyLarge">
        Body Large — Primary reading text. Lorem ipsum dolor sit amet.
      </Text>
      <Text variant="bodyMedium">Body Medium — Standard interface text.</Text>
      <Text variant="bodySmall">Body Small — Small supporting text.</Text>
      <hr />
      <Text variant="labelLarge">LABEL LARGE (BUTTONS)</Text>
      <Text variant="labelMedium">LABEL MEDIUM</Text>
      <Text variant="labelSmall">LABEL SMALL</Text>
    </div>
  ),
};

// === 3. Colors ===
export const Colors: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <Text variant="titleLarge" color="default">
        Default Color (onSurface)
      </Text>
      <Text variant="titleLarge" color="variant">
        Variant Color (onSurfaceVariant)
      </Text>
      <Text variant="titleLarge" color="primary">
        Primary Color
      </Text>
      <Text variant="titleLarge" color="error">
        Error Color
      </Text>
    </div>
  ),
};

// === 4. Truncation ===
export const Truncated: Story = {
  args: {
    variant: "bodyLarge",
    truncate: true,
    children:
      "This text is intentionally very long and will not fit inside the container, so it will be truncated with an ellipsis.",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 300, border: "1px dashed #ccc", padding: 8 }}>
        <Story />
      </div>
    ),
  ],
};

// === 5. Stress Test (1000 Elements) ===
export const StressTest1000: Story = {
  parameters: {
    // Remove centering so the grid fills the viewport.
    layout: "fullscreen",
    controls: { disable: true }, // Disable extra controls for performance.
  },
  render: () => {
    // Generate an array of 1,000 items.
    const items = Array.from({ length: 1000 }).map((_, i) => {
      // Make every third item long enough to be truncated.
      // const isLong = i % 3 === 0;
      return {
        id: i,
        // text: isLong
        //   ? `Item #${i} — This long text should overflow and show a tooltip on hover.`
        //   : `Item #${i} — Short`,

        text: `Item #${i} — This long text should overflow and show a tooltip on hover.`,
      };
    });

    return (
      <div style={{ padding: "24px", height: "100vh", overflowY: "auto" }}>
        <div style={{ marginBottom: "24px" }}>
          <Text variant="headlineMedium">Stress Test: 1000 Elements</Text>
          <Text variant="bodyMedium" color="muted">
            Hover over the grid. The tooltip should appear{" "}
            <strong>instantly</strong>
            and only for long text. Open DevTools Performance — hovering should
            not cause long recalculations (Recalculate Style) or React
            re-renders.
          </Text>
        </div>

        <div
          style={{
            display: "grid",
            // Responsive grid: columns are at least 200px wide.
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "12px",
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
                padding: "12px",
                // IMPORTANT: minWidth: 0 is required for truncate inside CSS Grid/Flex.
                minWidth: 0,
                backgroundColor: "#fff",
              }}
            >
              <Text variant="labelSmall" color="muted">
                ID: {item.id}
              </Text>

              {/* Component under test. */}
              <Text
                variant="bodyMedium"
                truncate
                // Deliberately omit title so Text calculates it automatically.
              >
                {item.text}
              </Text>
            </div>
          ))}
        </div>
      </div>
    );
  },
};
