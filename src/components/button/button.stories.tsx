import type { Meta, StoryObj } from "@storybook/react";
import { Heart, Plus, Save, ShoppingCart, Star, Trash } from "lucide-react";
import { colorContract, globalContract } from "@/themes";
import { Button } from "./button";

const buttonSizes = ["xs", "s", "m", "l", "xl"] as const;
const buttonShapes = ["round", "square"] as const;

const meta: Meta<typeof Button> = {
  title: "Components/Actions/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "tonal", "outlined", "text", "elevated"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "error"],
    },
    size: {
      control: "select",
      options: buttonSizes,
    },
    shape: {
      control: "radio",
      options: buttonShapes,
    },
    fullWidth: { control: "boolean" },
    children: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {
  args: { children: "Filled Button", variant: "filled" },
};

export const Tonal: Story = {
  args: { children: "Tonal Button", variant: "tonal" },
};

export const Outlined: Story = {
  args: { children: "Outlined Button", variant: "outlined" },
};

export const Text: Story = {
  args: { children: "Text Button", variant: "text" },
};

export const Elevated: Story = {
  args: { children: "Elevated Button", variant: "elevated" },
};

export const AllSizes: Story = {
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "16px",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {buttonSizes.map((size) => (
        <Button key={size} size={size}>
          {size.toUpperCase()}
        </Button>
      ))}
    </div>
  ),
};

export const SizesWithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {buttonSizes.map((size) => (
        <div
          key={size}
          style={{ display: "flex", gap: "16px", alignItems: "center" }}
        >
          <span
            style={{
              fontSize: "12px",
              width: 32,
              color: colorContract.onSurface.variant,
            }}
          >
            {size.toUpperCase()}
          </span>
          <Button size={size} leftIcon={<Save />}>
            Label
          </Button>
          <Button
            size={size}
            variant="tonal"
            leftIcon={<Plus />}
            rightIcon={<Star />}
          >
            Label
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  name: "All variants (M3 defaults)",
  render: () => (
    <div
      style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        alignItems: "center",
      }}
    >
      <Button variant="filled">Filled</Button>
      <Button variant="tonal">Tonal</Button>
      <Button variant="outlined">Outlined</Button>
      <Button variant="text">Text</Button>
      <Button variant="elevated">Elevated</Button>
    </div>
  ),
};

export const TonalColorDefault: Story = {
  name: "Tonal — default vs explicit color",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", width: 160, color: "#666" }}>
          no color (→ secondary)
        </span>
        <Button variant="tonal">Tonal</Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", width: 160, color: "#666" }}>
          color="primary"
        </span>
        <Button variant="tonal" color="primary">
          Tonal primary
        </Button>
      </div>
      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <span style={{ fontSize: "12px", width: 160, color: "#666" }}>
          color="tertiary"
        </span>
        <Button variant="tonal" color="tertiary">
          Tonal tertiary
        </Button>
      </div>
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "24px",
        padding: "24px",
        backgroundColor: colorContract.surface.default,
        borderRadius: globalContract.shape.lg,
      }}
    >
      {(["primary", "secondary", "tertiary", "error"] as const).map((color) => (
        <div key={color}>
          <div
            style={{
              color: colorContract.onSurface.variant,
              marginBottom: "12px",
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {color}
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <Button variant="filled" color={color}>
              Filled
            </Button>
            <Button variant="tonal" color={color}>
              Tonal
            </Button>
            <Button variant="outlined" color={color}>
              Outlined
            </Button>
            <Button variant="text" color={color}>
              Text
            </Button>
            <Button variant="elevated" color={color}>
              Elevated
            </Button>
          </div>
        </div>
      ))}
    </div>
  ),
  parameters: { layout: "padded" },
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Button variant="filled" leftIcon={<Save />}>
        Save
      </Button>
      <Button variant="tonal" leftIcon={<Heart />}>
        Like
      </Button>
      <Button variant="filled" color="secondary" leftIcon={<Star />}>
        Favorite
      </Button>
      <Button variant="filled" color="tertiary" leftIcon={<Plus />}>
        Add
      </Button>
      <Button variant="filled" color="error" leftIcon={<Trash />}>
        Delete
      </Button>
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Button variant="filled" isLoading>
        Loading
      </Button>
      <Button variant="tonal" isLoading>
        Loading
      </Button>
      <Button variant="filled" color="secondary" isLoading>
        Loading
      </Button>
      <Button variant="filled" isLoading leftIcon={<Save />}>
        With Icon
      </Button>
    </div>
  ),
};

export const DisabledStates: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
      <Button variant="filled" isDisabled>
        Filled
      </Button>
      <Button variant="tonal" isDisabled>
        Tonal
      </Button>
      <Button variant="outlined" isDisabled>
        Outlined
      </Button>
      <Button variant="filled" color="secondary" isDisabled>
        Secondary
      </Button>
      <Button variant="filled" color="error" isDisabled>
        Error
      </Button>
    </div>
  ),
};

export const RealWorldExamples: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gap: "32px",
        padding: "24px",
        maxWidth: "600px",
      }}
    >
      <div style={{ padding: "24px", borderRadius: globalContract.shape.lg }}>
        <h3
          style={{
            color: colorContract.onSurface.default,
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Form
        </h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button variant="filled" leftIcon={<Save />}>
            Save
          </Button>
          <Button variant="outlined">Cancel</Button>
          <Button variant="outlined" color="error" leftIcon={<Trash />}>
            Delete
          </Button>
        </div>
      </div>

      <div style={{ padding: "24px", borderRadius: globalContract.shape.lg }}>
        <h3
          style={{
            color: colorContract.onSurface.default,
            marginBottom: "8px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Delete account?
        </h3>
        <p
          style={{
            color: colorContract.onSurface.variant,
            marginBottom: "16px",
            fontSize: "14px",
          }}
        >
          This action cannot be undone
        </p>
        <div style={{ display: "flex", gap: "12px" }}>
          <Button variant="text">Cancel</Button>
          <Button variant="filled" color="error">
            Delete
          </Button>
        </div>
      </div>

      <div style={{ padding: "24px", borderRadius: globalContract.shape.lg }}>
        <h3
          style={{
            color: colorContract.onSurface.default,
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Premium features
        </h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button variant="filled" color="tertiary" leftIcon={<Star />}>
            Upgrade plan
          </Button>
          <Button variant="tonal" color="tertiary">
            Learn more
          </Button>
        </div>
      </div>

      <div style={{ padding: "24px", borderRadius: globalContract.shape.lg }}>
        <h3
          style={{
            color: colorContract.onSurface.default,
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          E-commerce
        </h3>
        <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <Button variant="filled" leftIcon={<ShoppingCart />}>
            Buy
          </Button>
          <Button variant="tonal" color="secondary" leftIcon={<Heart />}>
            Add to favorites
          </Button>
          <Button variant="outlined">View details</Button>
        </div>
      </div>
    </div>
  ),
  parameters: { layout: "padded" },
};
