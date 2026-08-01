import type { Meta, StoryObj } from "@storybook/react";
import {
  Archive,
  Bell,
  Bookmark,
  Heart,
  MoreVertical,
  Pencil,
  Plus,
  Settings,
  Star,
  Trash2,
  X,
} from "lucide-react";
import { IconButton } from "./icon-button";

const iconButtonSizes = ["xs", "s", "m", "l", "xl"] as const;
const iconButtonWidths = ["narrow", "default", "wide"] as const;
const iconButtonShapes = ["round", "square"] as const;

// Component metadata.
const meta = {
  title: "Components/Actions/IconButton",
  component: IconButton,
  parameters: {
    // Center the component on the canvas.
    layout: "centered",
  },
  // Automatic documentation.
  tags: ["autodocs"],
  // Configure controls (knobs).
  argTypes: {
    variant: {
      control: "select",
      options: ["standard", "filled", "tonal", "outlined"],
      description: "Button visual style",
      table: {
        defaultValue: { summary: "standard" },
      },
    },
    color: {
      control: "select",
      options: ["neutral", "primary", "secondary", "tertiary", "error"],
      description: "Color scheme",
      table: {
        defaultValue: { summary: "neutral" },
      },
    },
    size: {
      control: "radio",
      options: iconButtonSizes,
      description: "Button size",
    },
    width: {
      control: "radio",
      options: iconButtonWidths,
      description: "Icon button width",
    },
    shape: {
      control: "radio",
      options: iconButtonShapes,
      description: "Icon button shape",
    },
    toggle: { control: "boolean" },
    isSelected: { control: "boolean" },
    isDisabled: {
      control: "boolean",
      description: "Disabled state",
    },
    isChanging: {
      control: "boolean",
      description: "Icon transition animation (shrink and fade)",
    },
    children: {
      control: false, // Disable the children control because it is a complex ReactNode.
      description: "Icon (SVG component)",
    },
    onPress: { action: "pressed" },
  },
  // Default icon for all stories.
  args: {
    children: <Heart />,
    "aria-label": "Action", // Required for accessibility because there is no text.
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// === 1. Playground ===
export const Default: Story = {
  args: {
    variant: "filled",
    color: "primary",
    children: <Plus />,
    "aria-label": "Add item",
  },
};

// === Toggle Icon Button (#4 M3) ===
export const ToggleVariants: Story = {
  name: "Toggle — all 4 variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
      {(["standard", "filled", "tonal", "outlined"] as const).map((variant) => (
        <div
          key={variant}
          style={{ display: "flex", gap: "16px", alignItems: "center" }}
        >
          <span style={{ fontSize: 12, width: 80, color: "#666" }}>
            {variant}
          </span>
          <div style={{ textAlign: "center" }}>
            <IconButton
              toggle
              variant={variant}
              color="primary"
              aria-label={`${variant} unselected`}
            >
              <Star />
            </IconButton>
            <p style={{ fontSize: 10, color: "#999", margin: "4px 0 0" }}>
              off
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <IconButton
              toggle
              variant={variant}
              color="primary"
              isSelected
              aria-label={`${variant} selected`}
            >
              <Star />
            </IconButton>
            <p style={{ fontSize: 10, color: "#999", margin: "4px 0 0" }}>on</p>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const ToggleColors: Story = {
  name: "Toggle filled — all colors",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {(["primary", "secondary", "tertiary", "error"] as const).map((color) => (
        <div
          key={color}
          style={{ display: "flex", gap: "16px", alignItems: "center" }}
        >
          <span style={{ fontSize: 12, width: 80, color: "#666" }}>
            {color}
          </span>
          <IconButton
            toggle
            variant="filled"
            color={color}
            aria-label={`${color} off`}
          >
            <Bookmark />
          </IconButton>
          <IconButton
            toggle
            variant="filled"
            color={color}
            isSelected
            aria-label={`${color} on`}
          >
            <Bookmark />
          </IconButton>
        </div>
      ))}
    </div>
  ),
};

export const ToggleShapes: Story = {
  name: "Toggle — shapes",
  render: () => (
    <div style={{ display: "grid", gap: "20px" }}>
      {iconButtonShapes.map((shape) => (
        <div
          key={shape}
          style={{ display: "flex", gap: "16px", alignItems: "center" }}
        >
          <span style={{ fontSize: 12, width: 56, color: "#666" }}>
            {shape}
          </span>
          <IconButton
            toggle
            shape={shape}
            variant="tonal"
            color="primary"
            aria-label={`${shape} off`}
          >
            <Star />
          </IconButton>
          <IconButton
            toggle
            shape={shape}
            variant="tonal"
            color="primary"
            isSelected
            aria-label={`${shape} on`}
          >
            <Star />
          </IconButton>
          <IconButton
            toggle
            shape={shape}
            variant="outlined"
            color="primary"
            isSelected
            aria-label={`${shape} outlined on`}
          >
            <Star />
          </IconButton>
        </div>
      ))}
    </div>
  ),
};

// === 2. All variants ===
export const Variants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <div style={{ textAlign: "center" }}>
        <IconButton variant="filled" aria-label="Filled">
          <Pencil />
        </IconButton>
        <p style={{ fontSize: 12, color: "#666" }}>Filled</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <IconButton variant="tonal" aria-label="Tonal">
          <Settings />
        </IconButton>
        <p style={{ fontSize: 12, color: "#666" }}>Tonal</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <IconButton variant="outlined" aria-label="Outlined">
          <MoreVertical />
        </IconButton>
        <p style={{ fontSize: 12, color: "#666" }}>Outlined</p>
      </div>
      <div style={{ textAlign: "center" }}>
        <IconButton variant="standard" aria-label="Standard">
          <X />
        </IconButton>
        <p style={{ fontSize: 12, color: "#666" }}>Standard</p>
      </div>
    </div>
  ),
};

// === 3. Color schemes ===
// Use Filled because the color is most visible there.
export const Colors: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "16px" }}>
      <IconButton
        {...args}
        variant="filled"
        color="primary"
        aria-label="Primary"
      >
        <Pencil />
      </IconButton>
      <IconButton
        {...args}
        variant="filled"
        color="secondary"
        aria-label="Secondary"
      >
        <Archive />
      </IconButton>
      <IconButton
        {...args}
        variant="filled"
        color="tertiary"
        aria-label="Tertiary"
      >
        <Bell />
      </IconButton>
      <IconButton {...args} variant="filled" color="error" aria-label="Error">
        <Trash2 />
      </IconButton>
      <IconButton
        {...args}
        variant="filled"
        color="neutral"
        aria-label="Neutral"
      >
        <Settings />
      </IconButton>
    </div>
  ),
};

// === 4. Sizes ===
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {iconButtonSizes.map((size) => (
        <IconButton
          key={size}
          variant="tonal"
          size={size}
          aria-label={`${size} size`}
        >
          <Heart />
        </IconButton>
      ))}
    </div>
  ),
};

export const WidthModes: Story = {
  name: "Width modes",
  render: () => (
    <div style={{ display: "grid", gap: "20px" }}>
      {iconButtonSizes.map((size) => (
        <div
          key={size}
          style={{ display: "flex", gap: "16px", alignItems: "center" }}
        >
          <span style={{ fontSize: 12, width: 32, color: "#666" }}>
            {size.toUpperCase()}
          </span>
          {iconButtonWidths.map((width) => (
            <IconButton
              key={width}
              variant="tonal"
              size={size}
              width={width}
              aria-label={`${size} ${width}`}
            >
              <Heart />
            </IconButton>
          ))}
        </div>
      ))}
    </div>
  ),
};

// === 5. Gallery (matrix) ===
// Useful for visual regression testing.
export const Gallery: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px repeat(4, 1fr)",
        gap: "20px",
        alignItems: "center",
      }}
    >
      {/* Headings. */}
      <div />
      <strong>Primary</strong>
      <strong>Secondary</strong>
      <strong>Error</strong>
      <strong>Neutral</strong>

      {/* Row: Filled */}
      <strong>Filled</strong>
      <IconButton variant="filled" color="primary" aria-label="P">
        <Heart />
      </IconButton>
      <IconButton variant="filled" color="secondary" aria-label="S">
        <Heart />
      </IconButton>
      <IconButton variant="filled" color="error" aria-label="E">
        <Heart />
      </IconButton>
      <IconButton variant="filled" color="neutral" aria-label="N">
        <Heart />
      </IconButton>

      {/* Row: Tonal */}
      <strong>Tonal</strong>
      <IconButton variant="tonal" color="primary" aria-label="P">
        <Heart />
      </IconButton>
      <IconButton variant="tonal" color="secondary" aria-label="S">
        <Heart />
      </IconButton>
      <IconButton variant="tonal" color="error" aria-label="E">
        <Heart />
      </IconButton>
      <IconButton variant="tonal" color="neutral" aria-label="N">
        <Heart />
      </IconButton>

      {/* Row: Outlined */}
      <strong>Outlined</strong>
      <IconButton variant="outlined" color="primary" aria-label="P">
        <Heart />
      </IconButton>
      <IconButton variant="outlined" color="secondary" aria-label="S">
        <Heart />
      </IconButton>
      <IconButton variant="outlined" color="error" aria-label="E">
        <Heart />
      </IconButton>
      <IconButton variant="outlined" color="neutral" aria-label="N">
        <Heart />
      </IconButton>

      {/* Row: Standard */}
      <strong>Standard</strong>
      <IconButton variant="standard" color="primary" aria-label="P">
        <Heart />
      </IconButton>
      <IconButton variant="standard" color="secondary" aria-label="S">
        <Heart />
      </IconButton>
      <IconButton variant="standard" color="error" aria-label="E">
        <Heart />
      </IconButton>
      <IconButton variant="standard" color="neutral" aria-label="N">
        <Heart />
      </IconButton>
    </div>
  ),
};
