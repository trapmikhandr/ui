import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@/components/text";
import { colorContract } from "@/themes";
import { TextLink } from "./text-link";

const meta: Meta<typeof TextLink> = {
  title: "Components/Navigation/TextLink",
  component: TextLink,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Component for displaying text links in the Material Design 3 style.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [
        "bodyLarge",
        "bodyMedium",
        "bodySmall",
        "labelLarge",
        "labelMedium",
        "labelSmall",
        "inherit",
      ],
      description:
        "Typography variant for the link (matches the M3 Type Scale)",
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "default", "inherit"],
      description: "Link color variant",
    },
    underline: {
      control: "select",
      options: ["always", "hover", "none"],
      description: "Underline style",
    },
    children: {
      control: "text",
      description: "Link text",
    },
    asChild: {
      control: "boolean",
      description:
        "Delegate rendering to a child element (for React Router, etc.)",
    },
    href: {
      control: "text",
      description: "Link URL",
    },
  },
  args: {
    children: "Follow the link",
    href: "#",
    variant: "bodyMedium",
    color: "primary",
    underline: "hover",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// === 1. Playground ===
export const Default: Story = {
  args: {
    children: "Interactive link",
  },
};

// === 2. All typography variants ===
export const AllVariants: Story = {
  name: "Variants",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TextLink variant="bodyLarge">Body Large Link</TextLink>
      <TextLink variant="bodyMedium">Body Medium Link</TextLink>
      <TextLink variant="bodySmall">Body Small Link</TextLink>
      <hr
        style={{
          width: "100%",
          border: "none",
          borderTop: `1px solid ${colorContract.outline.variant}`,
        }}
      />
      <TextLink variant="labelLarge">Label Large Link</TextLink>
      <TextLink variant="labelMedium">Label Medium Link</TextLink>
      <TextLink variant="labelSmall">Label Small Link</TextLink>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates all `variant` props that match the M3 Type Scale.",
      },
    },
  },
};

// === 3. Color variants ===
export const AllColors: Story = {
  name: "Colors",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <TextLink color="primary">Primary Color Link (default)</TextLink>
      <TextLink color="secondary">Secondary Color Link</TextLink>
      <Text>
        This is a <TextLink color="default">default color link</TextLink> inside
        regular text.
      </Text>
      <Text color="primary">
        This is an <TextLink color="inherit">inherited link</TextLink> inside
        secondary-colored text.
      </Text>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Demonstrates `color` props. `default` uses the onSurface color, while `inherit` uses the parent color.",
      },
    },
  },
};

// === 4. Underline styles ===
export const UnderlineStyles: Story = {
  name: "Underline",
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
      <TextLink underline="always">Always</TextLink>
      <TextLink underline="hover">On hover</TextLink>
      <TextLink underline="none">Never</TextLink>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: "Demonstrates `underline` props for controlling underlines.",
      },
    },
  },
};

// === 5. Example in text ===
export const InParagraph: Story = {
  name: "Real World Example",
  render: () => (
    <Text variant="bodyLarge" style={{ maxWidth: "500px", lineHeight: 1.6 }}>
      Welcome to our service. By continuing, you agree to our{" "}
      <TextLink href="#" variant="inherit" color="primary" underline="always">
        Terms of use
      </TextLink>{" "}
      and confirm that you have read our{" "}
      <TextLink href="#" variant="inherit" color="primary" underline="always">
        Privacy policy
      </TextLink>
      . This is important information worth reading.
    </Text>
  ),
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story:
          "Example of using `TextLink` inside `Text` to create meaningful text blocks.",
      },
    },
  },
};

// === 6. Using asChild ===
export const AsChild: Story = {
  name: "asChild Prop",
  render: () => (
    <TextLink asChild>
      <span
        style={{
          cursor: "pointer",
          padding: "8px 12px",
          border: `1px solid ${colorContract.outline.default}`,
          borderRadius: "8px",
        }}
      >
        This span is styled as a TextLink.
      </span>
    </TextLink>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Example of `asChild` for applying link styles to a child element. Useful for router integrations such as React Router (`<Link>`).",
      },
    },
  },
};
