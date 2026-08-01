import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./avatar";

const meta: Meta<typeof Avatar> = {
  title: "Components/Data Display/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "radio",
      options: ["small", "medium", "large", "xlarge"],
    },
    name: {
      control: "text",
    },
    src: {
      control: "text",
    },
    status: {
      control: "radio",
      options: [undefined, "success", "warning", "error"],
    },
  },
  args: {
    name: "Ivan Petrov",
    size: "medium",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSizes: Story = {
  name: "Sizes",
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar name="Anna Ivanova" size="small" />
      <Avatar name="Anna Ivanova" size="medium" />
      <Avatar name="Anna Ivanova" size="large" />
      <Avatar name="Anna Ivanova" size="xlarge" />
    </div>
  ),
};

export const DifferentNames: Story = {
  name: "Color by Name",
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar name="Alexey Smirnov" size="large" />
      <Avatar name="Maria Kozlova" size="large" />
      <Avatar name="Dmitri Novikov" size="large" />
      <Avatar name="Elena Morozova" size="large" />
      <Avatar name="Sergey Volkov" size="large" />
      <Avatar name="Olga Lebedeva" size="large" />
    </div>
  ),
};

export const SingleName: Story = {
  name: "Single Name (One Initial)",
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar name="Anna" size="large" />
      <Avatar name="Boris" size="large" />
      <Avatar name="Victor" size="large" />
    </div>
  ),
};

export const WithImage: Story = {
  name: "With Image",
  args: {
    name: "Ivan Petrov",
    src: "https://i.pravatar.cc/150?img=3",
    size: "large",
  },
};

export const ImageFallback: Story = {
  name: "Image vs Initials",
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Avatar
        name="With photo"
        src="https://i.pravatar.cc/150?img=5"
        size="large"
      />
      <Avatar name="No photo" size="large" />
    </div>
  ),
};

export const WithStatusIndicator: Story = {
  name: "Status Indicator",
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <Avatar name="Active client" size="medium" status="success" />
        <p style={{ marginTop: 8, fontSize: 12 }}>Active</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar name="Pending connection" size="medium" status="warning" />
        <p style={{ marginTop: 8, fontSize: 12 }}>Pending</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar name="Declined" size="medium" status="error" />
        <p style={{ marginTop: 8, fontSize: 12 }}>Declined</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Avatar name="No status" size="medium" />
        <p style={{ marginTop: 8, fontSize: 12 }}>No status</p>
      </div>
    </div>
  ),
};

export const StatusIndicatorSizes: Story = {
  name: "Status Indicator Sizes",
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Avatar name="Small" size="small" status="success" />
      <Avatar name="Medium" size="medium" status="warning" />
      <Avatar name="Large" size="large" status="error" />
      <Avatar name="XLarge" size="xlarge" status="success" />
    </div>
  ),
};

export const StatusWithImage: Story = {
  name: "Status with Image",
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Avatar
        name="With photo"
        src="https://i.pravatar.cc/150?img=12"
        size="large"
        status="success"
      />
      <Avatar
        name="With photo"
        src="https://i.pravatar.cc/150?img=25"
        size="large"
        status="warning"
      />
      <Avatar
        name="With photo"
        src="https://i.pravatar.cc/150?img=33"
        size="large"
        status="error"
      />
    </div>
  ),
};
