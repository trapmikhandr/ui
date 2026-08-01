// Tooltip.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./tooltip";

// Import your own button
// import { Button } from "../Button";

const meta: Meta<typeof Tooltip> = {
  title: "Components/Overlays/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: "Plain tooltip",
    placement: "top",
    children: (
      <button type="button" style={{ padding: "10px" }}>
        Hover me
      </button>
    ), // Replace this with your Button component
  },
};

export const LongText: Story = {
  args: {
    content: "Tooltips provide text labels for screen elements.",
    placement: "top",
    children: (
      <button type="button" style={{ padding: "10px" }}>
        Long description
      </button>
    ),
  },
};
