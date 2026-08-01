import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "@/components";
import { Button } from "../button";
import { Modal } from "./modal";

const meta: Meta<typeof Modal> = {
  title: "Components/Overlays/Modal",
  component: Modal,
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Default: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <Button>Open</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Title>Modal title</Modal.Title>
        <p>This is modal content.</p>
        <Modal.Close>
          <Button>Close</Button>
        </Modal.Close>
      </Modal.Content>
    </Modal>
  ),
};

export const Confirmation: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <Button variant="filled" color="error">
          Delete
        </Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Title>Confirm deletion</Modal.Title>
        <p>
          Are you sure you want to delete this item? This action cannot be
          undone.
        </p>
        <div
          style={{
            display: "flex",
            gap: 8,
            marginTop: 16,
            justifyContent: "flex-end",
          }}
        >
          <Modal.Close>
            <Button variant="outlined">Cancel</Button>
          </Modal.Close>
          <Button variant="filled" color="error">
            Delete
          </Button>
        </div>
      </Modal.Content>
    </Modal>
  ),
};

export const Form: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <Button>Add user</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Title>New user</Modal.Title>
        <form style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label htmlFor="name" style={{ display: "block", marginBottom: 4 }}>
              Name
            </label>
            <input
              id="name"
              type="text"
              style={{ width: "100%", padding: 8 }}
            />
          </div>
          <div>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: 4 }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              style={{ width: "100%", padding: 8 }}
            />
          </div>
          <div
            style={{
              display: "flex",
              gap: 8,
              marginTop: 8,
              justifyContent: "flex-end",
            }}
          >
            <Modal.Close>
              <Button variant="outlined">Cancel</Button>
            </Modal.Close>
            <Button type="submit">Create</Button>
          </div>
        </form>
      </Modal.Content>
    </Modal>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Modal>
      <Modal.Trigger>
        <Button>Long content</Button>
      </Modal.Trigger>
      <Modal.Content>
        <Modal.Title>Terms of use</Modal.Title>
        <div style={{ maxHeight: 300, overflow: "auto" }}>
          {Array.from({ length: 20 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: <for test>
            <Text variant="bodyMedium" key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Text>
          ))}
        </div>
        <Modal.Close>
          <Button>Accept</Button>
        </Modal.Close>
      </Modal.Content>
    </Modal>
  ),
};
