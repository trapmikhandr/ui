import type { Meta, StoryObj } from "@storybook/react";
import {
  Activity,
  AlertCircle,
  Bell,
  Check,
  ChevronRight,
  Loader,
  Settings,
  Trash2,
  User,
  X,
} from "lucide-react";
import { colorContract } from "@/themes";
import { Icon } from "./icon";

// 1. Icon dictionary for the Storybook select.
const icons = {
  Activity,
  AlertCircle,
  Bell,
  Check,
  ChevronRight,
  Loader,
  Settings,
  Trash2,
  User,
  X,
};

const meta = {
  title: "Components/Data Display/Icon",
  component: Icon,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    // Configure icon selection through the dropdown.
    icon: {
      control: "select",
      options: Object.keys(icons),
      mapping: icons,
      description: "Any icon from lucide-react",
    },
    spinning: {
      control: "boolean",
      description: "Spin animation (useful for loaders)",
    },
    size: {
      control: "select",
      options: ["inherit", "button", "sm", "md", "lg"],
      description: "Size variants from the recipe",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
  args: {
    icon: Activity, // A component, not a string.
    size: "button",
    spinning: false,
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

// === 1. Playground ===
export const Default: Story = {};

// === 2. Loading State ===
export const Spinning: Story = {
  args: {
    icon: Loader, // A component, not a string.
    spinning: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "The `spinning` prop adds a CSS spin animation. Ideal for a Loader icon.",
      },
    },
  },
};

// === 3. Sizes ===
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "20px" }}>
      <div style={{ textAlign: "center" }}>
        <Icon {...args} size="sm" icon={User} />
        <p style={{ fontSize: 10, color: "#888" }}>sm (16px)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon {...args} size="md" icon={User} />
        <p style={{ fontSize: 10, color: "#888" }}>md (24px)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon {...args} size="lg" icon={User} />
        <p style={{ fontSize: 10, color: "#888" }}>lg (32px)</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <Icon {...args} size="button" icon={User} />
        <p style={{ fontSize: 10, color: "#888" }}>button (1.25em)</p>
      </div>
    </div>
  ),
};

// === 4. Color inheritance ===
export const ColorInheritance: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
        The icon automatically inherits the parent text color (currentColor).
      </p>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        {/* Primary Color */}
        <div
          style={{
            color: colorContract.primary.base,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon {...args} icon={Check} />
          <span>Primary Text</span>
        </div>

        {/* Error Color */}
        <div
          style={{
            color: colorContract.error.base,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon {...args} icon={AlertCircle} />
          <span>Error Text</span>
        </div>

        {/* Custom Color */}
        <div
          style={{
            color: colorContract.success.base,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          <Icon {...args} icon={Settings} />
          <span>Success Text</span>
        </div>
      </div>
    </div>
  ),
};

// === 5. Relative sizing ===
export const RelativeSize: Story = {
  render: (args) => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <p style={{ margin: 0, fontSize: "14px", color: "#666" }}>
        With <code>size="inherit"</code> or <code>size="button"</code>, the icon
        scales from the parent's <code>font-size</code>.
      </p>

      <div style={{ fontSize: "14px", border: "1px dashed #ccc", padding: 8 }}>
        Text 14px <Icon {...args} icon={Activity} />
      </div>

      <div style={{ fontSize: "24px", border: "1px dashed #ccc", padding: 8 }}>
        Text 24px <Icon {...args} icon={Activity} />
      </div>

      <div style={{ fontSize: "40px", border: "1px dashed #ccc", padding: 8 }}>
        Text 40px <Icon {...args} icon={Activity} />
      </div>
    </div>
  ),
};
