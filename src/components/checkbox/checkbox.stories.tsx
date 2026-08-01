import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { colorContract, globalContract } from "@/themes";
import { Checkbox } from "./checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Forms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Material Design 3 checkbox component. Uses React Aria for accessibility.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "Checkbox size",
    },
    isSelected: {
      control: "boolean",
      description: "Selection state (controlled)",
    },
    isIndeterminate: {
      control: "boolean",
      description: "Partially selected (for example, 3 of 5 selected)",
    },
    isDisabled: {
      control: "boolean",
      description: "Disabled state",
    },
    isInvalid: {
      control: "boolean",
      description: "Error state",
    },
    children: {
      control: "text",
      description: "Label text",
    },
    description: {
      control: "text",
      description: "Additional description below the label",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ========== BASIC EXAMPLES ==========

export const Default: Story = {
  args: {
    children: "I agree to the terms of use",
  },
};

export const Checked: Story = {
  args: {
    children: "Subscribe to the newsletter",
    isSelected: true,
  },
};

export const WithDescription: Story = {
  args: {
    children: "Receive notifications",
    description: "We will send important updates about your account",
  },
};

export const Indeterminate: Story = {
  args: {
    children: "Select all (3 of 5)",
    isIndeterminate: true,
  },
};

export const Disabled: Story = {
  args: {
    children: "Unavailable option",
    isDisabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    children: "Enabled by default",
    isSelected: true,
    isDisabled: true,
  },
};

export const Invalid: Story = {
  args: {
    children: "Required field",
    isInvalid: true,
  },
};

// ========== INTERACTIVE EXAMPLES ==========

export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox isSelected={checked} onChange={setChecked}>
        Click me (controlled)
      </Checkbox>
    );
  },
};

export const IndeterminateInteractive: Story = {
  render: () => {
    const [items, setItems] = useState({
      item1: true,
      item2: false,
      item3: true,
      item4: false,
    });

    const allChecked = Object.values(items).every(Boolean);
    const someChecked = Object.values(items).some(Boolean);

    const handleSelectAll = (isSelected: boolean) => {
      setItems({
        item1: isSelected,
        item2: isSelected,
        item3: isSelected,
        item4: isSelected,
      });
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Checkbox
          isSelected={allChecked}
          isIndeterminate={!allChecked && someChecked}
          onChange={handleSelectAll}
        >
          Select all ({Object.values(items).filter(Boolean).length} of 4)
        </Checkbox>
        <div
          style={{
            marginLeft: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <Checkbox
            isSelected={items.item1}
            onChange={(checked) => setItems({ ...items, item1: checked })}
          >
            Item 1
          </Checkbox>
          <Checkbox
            isSelected={items.item2}
            onChange={(checked) => setItems({ ...items, item2: checked })}
          >
            Item 2
          </Checkbox>
          <Checkbox
            isSelected={items.item3}
            onChange={(checked) => setItems({ ...items, item3: checked })}
          >
            Item 3
          </Checkbox>
          <Checkbox
            isSelected={items.item4}
            onChange={(checked) => setItems({ ...items, item4: checked })}
          >
            Item 4
          </Checkbox>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Example of using the indeterminate state to select all items",
      },
    },
  },
};

// ========== SIZES ==========

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
      <Checkbox size="small">Small</Checkbox>
      <Checkbox size="medium">Medium</Checkbox>
      <Checkbox size="large">Large</Checkbox>
    </div>
  ),
};

export const AllSizesChecked: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
      <Checkbox size="small" isSelected>
        Small
      </Checkbox>
      <Checkbox size="medium" isSelected>
        Medium
      </Checkbox>
      <Checkbox size="large" isSelected>
        Large
      </Checkbox>
    </div>
  ),
};

// ========== ALL STATES ==========

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Checkbox>Unchecked</Checkbox>
      <Checkbox isSelected>Checked</Checkbox>
      <Checkbox isIndeterminate>Indeterminate</Checkbox>
      <Checkbox isDisabled>Disabled</Checkbox>
      <Checkbox isSelected isDisabled>
        Disabled Checked
      </Checkbox>
      <Checkbox isInvalid>Invalid</Checkbox>
    </div>
  ),
};

// ========== WITH DESCRIPTIONS ==========

export const WithDescriptions: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <Checkbox description="We use cookies to improve your experience">
        Accept cookies
      </Checkbox>
      <Checkbox
        isSelected
        description="Receive notifications about new messages, comments, and updates"
      >
        Email notifications
      </Checkbox>
      <Checkbox
        isDisabled
        description="This feature is available only to premium users"
      >
        Premium feature
      </Checkbox>
    </div>
  ),
};

// ========== REAL-WORLD EXAMPLES ==========

export const RealWorldExamples: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      emailUpdates: false,
      marketing: false,
      terms: false,
    });

    return (
      <div
        style={{
          display: "grid",
          gap: "32px",
          padding: "24px",
          maxWidth: "600px",
        }}
      >
        {/* Notification settings. */}
        <div
          style={{
            padding: "24px",
            backgroundColor: colorContract.surface.container,
            borderRadius: globalContract.shape.lg,
          }}
        >
          <h3
            style={{
              color: colorContract.onSurface.default,
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            🔔 Notification settings
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Checkbox
              isSelected={settings.notifications}
              onChange={(checked) =>
                setSettings({ ...settings, notifications: checked })
              }
              description="Push notifications about important events"
            >
              Enable notifications
            </Checkbox>
            <Checkbox
              isSelected={settings.emailUpdates}
              onChange={(checked) =>
                setSettings({ ...settings, emailUpdates: checked })
              }
              description="Weekly activity summary"
            >
              Email updates
            </Checkbox>
            <Checkbox
              isSelected={settings.marketing}
              onChange={(checked) =>
                setSettings({ ...settings, marketing: checked })
              }
              description="Discounts, promotions, and product news"
            >
              Marketing emails
            </Checkbox>
          </div>
        </div>

        {/* Registration form. */}
        <div
          style={{
            padding: "24px",
            backgroundColor: colorContract.surface.container,
            borderRadius: globalContract.shape.lg,
          }}
        >
          <h3
            style={{
              color: colorContract.onSurface.default,
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            📝 Registration
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Checkbox
              isSelected={settings.terms}
              onChange={(checked) =>
                setSettings({ ...settings, terms: checked })
              }
              isInvalid={!settings.terms}
              description="Required to continue"
            >
              I agree to the terms of use and privacy policy
            </Checkbox>
          </div>
        </div>

        {/* Filters. */}
        <div
          style={{
            padding: "24px",
            backgroundColor: colorContract.surface.container,
            borderRadius: globalContract.shape.lg,
          }}
        >
          <h3
            style={{
              color: colorContract.onSurface.default,
              marginBottom: "16px",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            🔍 Search filters
          </h3>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            <Checkbox defaultSelected>In stock</Checkbox>
            <Checkbox>On sale</Checkbox>
            <Checkbox>Free shipping</Checkbox>
            <Checkbox isDisabled description="Coming soon">
              New arrivals
            </Checkbox>
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    layout: "padded",
    docs: {
      description: {
        story: "Examples of using checkboxes in real-world scenarios",
      },
    },
  },
};

// ========== WITHOUT A LABEL (CHECKBOX ONLY) ==========

export const WithoutLabel: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
      <Checkbox />
      <Checkbox isSelected />
      <Checkbox isIndeterminate />
      <Checkbox isDisabled />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A checkbox can be used without text, for example in tables to select rows",
      },
    },
  },
};

// ========== CHECKBOX GROUP ==========

export const CheckboxGroup: Story = {
  render: () => {
    const [selected, setSelected] = useState<string[]>(["react", "typescript"]);

    const technologies = [
      { id: "react", label: "React", description: "UI library" },
      {
        id: "typescript",
        label: "TypeScript",
        description: "Typed JavaScript",
      },
      { id: "nodejs", label: "Node.js", description: "JavaScript runtime" },
      {
        id: "graphql",
        label: "GraphQL",
        description: "Query language for APIs",
      },
    ];

    const handleChange = (id: string, isSelected: boolean) => {
      setSelected((prev) =>
        isSelected ? [...prev, id] : prev.filter((item) => item !== id),
      );
    };

    return (
      <div
        style={{
          padding: "24px",
          backgroundColor: colorContract.surface.container,
          borderRadius: globalContract.shape.lg,
        }}
      >
        <h3
          style={{
            color: colorContract.onSurface.default,
            marginBottom: "16px",
            fontSize: "16px",
            fontWeight: 600,
          }}
        >
          Choose technologies ({selected.length} selected)
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {technologies.map((tech) => (
            <Checkbox
              key={tech.id}
              isSelected={selected.includes(tech.id)}
              onChange={(checked) => handleChange(tech.id, checked)}
              description={tech.description}
            >
              {tech.label}
            </Checkbox>
          ))}
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: "Example checkbox group with multiple selection",
      },
    },
  },
};
