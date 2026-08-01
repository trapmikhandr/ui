import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "@/components/button";
import { Popover } from "./popover";

const meta: Meta<typeof Popover> = {
  title: "Components/Overlays/Popover",
  component: Popover,
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: () => (
    <div style={{ padding: 100 }}>
      <Popover>
        <Popover.Trigger>
          <Button>Open</Button>
        </Popover.Trigger>
        <Popover.Content>
          <p style={{ margin: 0 }}>Popover content</p>
        </Popover.Content>
      </Popover>
    </div>
  ),
};

export const WithArrow: Story = {
  render: () => (
    <div style={{ padding: 100 }}>
      <Popover placement="top" showArrow>
        <Popover.Trigger>
          <Button>Top</Button>
        </Popover.Trigger>
        <Popover.Content>
          <p style={{ margin: 0 }}>With arrow</p>
        </Popover.Content>
      </Popover>
    </div>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ padding: 150, display: "flex", gap: 16, flexWrap: "wrap" }}>
      {(["top", "bottom", "left", "right"] as const).map((placement) => (
        <Popover key={placement} placement={placement} showArrow>
          <Popover.Trigger>
            <Button variant="outlined">{placement}</Button>
          </Popover.Trigger>
          <Popover.Content>
            <p style={{ margin: 0 }}>Placement: {placement}</p>
          </Popover.Content>
        </Popover>
      ))}
    </div>
  ),
};
