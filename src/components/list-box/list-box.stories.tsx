import type { Meta, StoryObj } from "@storybook/react";
import { ListBox } from "./list-box";

const meta: Meta<typeof ListBox> = {
  title: "Components/Forms/ListBox",
  component: ListBox,
};

export default meta;
type Story = StoryObj<typeof ListBox>;

export const Single: Story = {
  render: () => (
    <ListBox label="Fruit" selectionMode="single">
      <ListBox.Item key="apple">Apple</ListBox.Item>
      <ListBox.Item key="banana">Banana</ListBox.Item>
      <ListBox.Item key="orange">Orange</ListBox.Item>
      <ListBox.Item key="grape">Grape</ListBox.Item>
    </ListBox>
  ),
};

export const Multiple: Story = {
  render: () => (
    <ListBox label="Fruits" selectionMode="multiple">
      <ListBox.Item key="apple">Apple</ListBox.Item>
      <ListBox.Item key="banana">Banana</ListBox.Item>
      <ListBox.Item key="orange">Orange</ListBox.Item>
      <ListBox.Item key="grape">Grape</ListBox.Item>
    </ListBox>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <ListBox label="Fruit" selectionMode="single" disabledKeys={["banana"]}>
      <ListBox.Item key="apple">Apple</ListBox.Item>
      <ListBox.Item key="banana">Banana (disabled)</ListBox.Item>
      <ListBox.Item key="orange">Orange</ListBox.Item>
    </ListBox>
  ),
};

export const Dynamic: Story = {
  render: () => {
    const items = [
      { id: "1", name: "React" },
      { id: "2", name: "Vue" },
      { id: "3", name: "Angular" },
      { id: "4", name: "Svelte" },
    ];

    return (
      <ListBox label="Framework" items={items} selectionMode="single">
        {(item) => <ListBox.Item key={item.id}>{item.name}</ListBox.Item>}
      </ListBox>
    );
  },
};
