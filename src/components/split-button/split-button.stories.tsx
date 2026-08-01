import type { Meta, StoryObj } from "@storybook/react";
import { Download, FileText, Printer, Save, Share2 } from "lucide-react";
import { SplitButton } from "./split-button";

const meta: Meta<typeof SplitButton> = {
  title: "Components/Actions/SplitButton",
  component: SplitButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "tonal", "outlined", "elevated"],
    },
    color: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "error"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const saveOptions = [
  { label: "Save as draft", onSelect: () => alert("Draft") },
  { label: "Save and publish", onSelect: () => alert("Publish") },
  { label: "Save as copy", onSelect: () => alert("Copy") },
];

export const Filled: Story = {
  args: {
    label: "Save",
    leftIcon: <Save size={18} />,
    variant: "filled",
    color: "primary",
    options: saveOptions,
    onPress: () => alert("Save"),
  },
};

export const AllVariants: Story = {
  name: "All variants",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      {(["filled", "tonal", "outlined", "elevated"] as const).map((variant) => (
        <div
          key={variant}
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          <span style={{ fontSize: 12, color: "#666", width: 70 }}>
            {variant}
          </span>
          <SplitButton
            label="Save"
            leftIcon={<Save size={18} />}
            variant={variant}
            options={saveOptions}
            onPress={() => alert("Save")}
            aria-label="Save"
          />
        </div>
      ))}
    </div>
  ),
};

export const AllColors: Story = {
  name: "All colors (filled)",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      {(["primary", "secondary", "tertiary", "error"] as const).map((color) => (
        <div
          key={color}
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
        >
          <span style={{ fontSize: 12, color: "#666", width: 70 }}>
            {color}
          </span>
          <SplitButton
            label="Save"
            variant="filled"
            color={color}
            options={saveOptions}
            onPress={() => alert("Save")}
            aria-label="Save"
          />
        </div>
      ))}
    </div>
  ),
};

export const WithIcons: Story = {
  name: "Dropdown options with icons",
  render: () => (
    <SplitButton
      label="Share"
      leftIcon={<Share2 size={18} />}
      variant="filled"
      color="secondary"
      options={[
        {
          label: "Export as PDF",
          icon: <FileText size={16} />,
          onSelect: () => alert("PDF"),
        },
        {
          label: "Download",
          icon: <Download size={16} />,
          onSelect: () => alert("Download"),
        },
        {
          label: "Print",
          icon: <Printer size={16} />,
          onSelect: () => alert("Print"),
        },
      ]}
      onPress={() => alert("Share")}
      aria-label="Share"
    />
  ),
};

export const WithDisabledOption: Story = {
  name: "With disabled option",
  render: () => (
    <SplitButton
      label="Save"
      variant="tonal"
      options={[
        { label: "Save as draft", onSelect: () => alert("Draft") },
        {
          label: "Save and publish",
          onSelect: () => alert("Publish"),
          disabled: true,
        },
        { label: "Save as copy", onSelect: () => alert("Copy") },
      ]}
      onPress={() => alert("Save")}
      aria-label="Save"
    />
  ),
};
