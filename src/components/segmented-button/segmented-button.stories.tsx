import type { Meta, StoryObj } from "@storybook/react";
import { Calendar, LayoutGrid, List } from "lucide-react";
import { useState } from "react";
import { SegmentedButton } from "./segmented-button";

const meta: Meta<typeof SegmentedButton> = {
  title: "Components/Actions/SegmentedButton",
  component: SegmentedButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>("table");
    return (
      <div style={{ width: 400 }}>
        <SegmentedButton
          aria-label="View"
          options={[
            { value: "table", label: "Table" },
            { value: "card", label: "Card" },
            { value: "kanban", label: "Kanban" },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const WithIcons: Story = {
  name: "With icons",
  render: () => {
    const [value, setValue] = useState<string | null>("list");
    return (
      <div style={{ width: 360 }}>
        <SegmentedButton
          aria-label="View"
          options={[
            { value: "list", label: "List", icon: <List size={18} /> },
            { value: "grid", label: "Grid", icon: <LayoutGrid size={18} /> },
            {
              value: "calendar",
              label: "Calendar",
              icon: <Calendar size={18} />,
            },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const WithoutCheckmark: Story = {
  name: "Without checkmark",
  render: () => {
    const [value, setValue] = useState<string | null>("all");
    return (
      <div style={{ width: 320 }}>
        <SegmentedButton
          aria-label="Filter"
          showCheckmark={false}
          options={[
            { value: "all", label: "All" },
            { value: "active", label: "Active" },
            { value: "archived", label: "Archived" },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const TwoOptions: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>("self");
    return (
      <div style={{ width: 280 }}>
        <SegmentedButton
          aria-label="Type"
          options={[
            { value: "self", label: "Me" },
            { value: "child", label: "My child" },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => {
    const [small, setSmall] = useState<string | null>("a");
    const [medium, setMedium] = useState<string | null>("a");
    const [large, setLarge] = useState<string | null>("a");

    const options = [
      { value: "a", label: "Option A" },
      { value: "b", label: "Option B" },
      { value: "c", label: "Option C" },
    ];

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          width: 360,
        }}
      >
        {(
          [
            ["Small", "small", small, setSmall],
            ["Medium", "medium", medium, setMedium],
            ["Large", "large", large, setLarge],
          ] as const
        ).map(([label, size, val, setVal]) => (
          <div
            key={size}
            style={{ display: "flex", alignItems: "center", gap: "12px" }}
          >
            <span style={{ width: "60px", fontSize: "12px", color: "#666" }}>
              {label}
            </span>
            <SegmentedButton
              aria-label={label}
              size={size}
              options={options}
              value={val}
              onChange={setVal}
            />
          </div>
        ))}
      </div>
    );
  },
};

export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>("day");
    return (
      <div style={{ width: 360 }}>
        <SegmentedButton
          aria-label="Period"
          options={[
            { value: "day", label: "Day" },
            { value: "week", label: "Week" },
            { value: "month", label: "Month" },
            { value: "year", label: "Year", disabled: true },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const WithNumbers: Story = {
  render: () => {
    const [value, setValue] = useState<string | null>("table");
    return (
      <div style={{ width: 440 }}>
        <SegmentedButton
          aria-label="View"
          options={[
            { value: "table", label: "Table", num: "01" },
            { value: "card", label: "Client card", num: "02" },
            { value: "kanban", label: "Kanban", num: "03" },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};
