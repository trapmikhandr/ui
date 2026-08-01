import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Data Display/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
    },
    size: {
      control: "radio",
      options: ["small", "medium"],
    },
    children: {
      control: "text",
    },
  },
  args: {
    children: "Badge",
    color: "default",
    size: "medium",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllColors: Story = {
  name: "Colors",
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Badge color="default">Default</Badge>
      <Badge color="info">Info</Badge>
      <Badge color="success">Success</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="error">Error</Badge>
    </div>
  ),
};

export const AllSizes: Story = {
  name: "Sizes",
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
    </div>
  ),
};
