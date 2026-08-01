import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "storybook/test";
import { Button } from "../button";
import { Menu } from "./menu";

const meta: Meta<typeof Menu> = {
  title: "Components/Overlays/Menu",
  component: Menu,
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {
  render: () => (
    <Menu>
      <Menu.Trigger>
        <Button>Actions</Button>
      </Menu.Trigger>
      <Menu.Content onAction={fn()}>
        <Menu.Item key="edit">Edit</Menu.Item>
        <Menu.Item key="copy">Copy</Menu.Item>
        <Menu.Item key="delete">Delete</Menu.Item>
      </Menu.Content>
    </Menu>
  ),
};

export const WithDisabledItems: Story = {
  render: () => (
    <Menu>
      <Menu.Trigger>
        <Button>File</Button>
      </Menu.Trigger>
      <Menu.Content onAction={fn()} disabledKeys={["delete"]}>
        <Menu.Item key="new">New</Menu.Item>
        <Menu.Item key="open">Open</Menu.Item>
        <Menu.Item key="save">Save</Menu.Item>
        <Menu.Item key="delete">Delete (disabled)</Menu.Item>
      </Menu.Content>
    </Menu>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Menu>
      <Menu.Trigger>
        <Button>Options</Button>
      </Menu.Trigger>
      <Menu.Content onAction={fn()}>
        <Menu.Item key="edit" textValue="Edit">
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            ✏️ Edit
          </span>
        </Menu.Item>
        <Menu.Item key="copy" textValue="Copy">
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            📋 Copy
          </span>
        </Menu.Item>
        <Menu.Item key="delete" textValue="Delete">
          <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
            🗑️ Delete
          </span>
        </Menu.Item>
      </Menu.Content>
    </Menu>
  ),
};

export const Dynamic: Story = {
  render: () => {
    const actions = [
      { id: "edit", label: "Edit" },
      { id: "duplicate", label: "Duplicate" },
      { id: "archive", label: "Archive" },
      { id: "delete", label: "Delete" },
    ];

    return (
      <Menu>
        <Menu.Trigger>
          <Button>Actions</Button>
        </Menu.Trigger>
        <Menu.Content items={actions} onAction={fn()}>
          {(item) => <Menu.Item key={item.id}>{item.label}</Menu.Item>}
        </Menu.Content>
      </Menu>
    );
  },
};

export const ContextMenuStyle: Story = {
  render: () => (
    <Menu>
      <Menu.Trigger>
        <Button variant="outlined">⋮</Button>
      </Menu.Trigger>
      <Menu.Content onAction={fn()}>
        <Menu.Item key="view">View</Menu.Item>
        <Menu.Item key="edit">Edit</Menu.Item>
        <Menu.Item key="share">Share</Menu.Item>
        <Menu.Item key="delete">Delete</Menu.Item>
      </Menu.Content>
    </Menu>
  ),
};

export const AutoClose: Story = {
  render: () => (
    <Menu>
      <Menu.Trigger>
        <Button>Menu closes after selection</Button>
      </Menu.Trigger>
      <Menu.Content onAction={fn()}>
        <Menu.Item key="action1">Action 1</Menu.Item>
        <Menu.Item key="action2">Action 2</Menu.Item>
        <Menu.Item key="action3">Action 3</Menu.Item>
      </Menu.Content>
    </Menu>
  ),
};
