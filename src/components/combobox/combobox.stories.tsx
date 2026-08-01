import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { Key } from "react-aria";
import { Combobox } from "./combobox";

const meta: Meta<typeof Combobox> = {
  title: "Components/Forms/Combobox",
  component: Combobox,
};

export default meta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
  render: () => (
    <Combobox label="Fruit">
      <Combobox.Item key="apple">Apple</Combobox.Item>
      <Combobox.Item key="banana">Banana</Combobox.Item>
      <Combobox.Item key="orange">Orange</Combobox.Item>
      <Combobox.Item key="grape">Grape</Combobox.Item>
    </Combobox>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<Key | null>("apple");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Combobox
          label="Fruit"
          selectedKey={selected}
          onSelectionChange={setSelected}
        >
          <Combobox.Item key="apple">Apple</Combobox.Item>
          <Combobox.Item key="banana">Banana</Combobox.Item>
          <Combobox.Item key="orange">Orange</Combobox.Item>
        </Combobox>
        <p>Selected: {selected}</p>
      </div>
    );
  },
};

export const ExactMatchEnter: Story = {
  render: () => (
    <Combobox label="Fruit" defaultSelectedKey={null}>
      <Combobox.Item key="apple">Apple</Combobox.Item>
      <Combobox.Item key="banana">Banana</Combobox.Item>
      <Combobox.Item key="orange">Orange</Combobox.Item>
    </Combobox>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Enter the full option name and press Enter — the option should be applied.",
      },
    },
  },
};

export const Invalid: Story = {
  render: () => (
    <Combobox label="Fruit" errorMessage="Choose a fruit from the list">
      <Combobox.Item key="apple">Apple</Combobox.Item>
      <Combobox.Item key="banana">Banana</Combobox.Item>
    </Combobox>
  ),
};

// Simulate a large list (for example, Intl.supportedValuesOf("timeZone") — ~400 entries).
const largeItems = Array.from({ length: 400 }, (_, i) => ({
  id: `item-${i}`,
  label: `List item #${i + 1}`,
}));

export const LargeList: Story = {
  render: () => (
    <Combobox label="Time zone" items={largeItems} isRequired>
      {(item: { id: string; label: string }) => (
        <Combobox.Item key={item.id} textValue={item.label}>
          {item.label}
        </Combobox.Item>
      )}
    </Combobox>
  ),
};
