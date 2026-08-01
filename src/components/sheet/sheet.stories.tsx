import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { useState } from "react";
import { OverlayProvider } from "react-aria";
import { Sheet } from "./sheet";

const meta: Meta<typeof Sheet> = {
  title: "Components/Overlays/Sheet",
  component: Sheet,
  decorators: [
    (Story) => (
      <OverlayProvider>
        <Story />
      </OverlayProvider>
    ),
  ],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Sheet component (Side Sheet and Bottom Sheet) based on M3 Expressive. Supports modal and non-modal modes, focus management, and scroll locking.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    side: {
      control: "select",
      options: ["right", "left", "bottom"],
      description: "Edge to which the sheet is attached",
    },
    isModal: {
      control: "boolean",
      description: "Modal mode (with scrim and focus lock)",
    },
    isOpen: {
      control: "boolean",
      description: "Whether the sheet is open (state-controlled)",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Sheet>;

// Wrapper demonstrating state management.
const SheetDemo = (args: React.ComponentProps<typeof Sheet>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      style={{
        padding: "2rem",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          cursor: "pointer",
          borderRadius: "8px",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
        }}
      >
        Open Sheet ({args.side || "right"})
      </button>

      <div style={{ marginTop: "2rem", color: "#666" }}>
        <p>Press the button above to open the Sheet.</p>
        <p>
          If this is a Modal Sheet, the background will dim and focus will
          remain inside the sheet.
        </p>
        <p>
          If this is a Standard Sheet, you can interact with buttons in the
          background.
        </p>
        <button
          type="button"
          style={{
            padding: "8px 16px",
            marginTop: "16px",
            cursor: "pointer",
          }}
          onClick={() => alert("The background element is clickable!")}
        >
          Test background click
        </button>
      </div>

      <Sheet
        {...args}
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        title={args.title || "Profile settings"}
      >
        {args.children || (
          <div style={{ padding: "16px 0" }}>
            <p style={{ marginBottom: "16px" }}>
              This is sheet content. It can contain any form, filters, or
              additional information.
            </p>

            <div
              style={{ display: "flex", flexDirection: "column", gap: "16px" }}
            >
              <label
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                Name
                <input
                  type="text"
                  placeholder="Enter your name"
                  style={{ padding: "8px" }}
                />
              </label>
              <label
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                Email
                <input
                  type="email"
                  placeholder="example@mail.com"
                  style={{ padding: "8px" }}
                />
              </label>
            </div>

            <div style={{ marginTop: "32px", display: "flex", gap: "16px" }}>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "#000",
                  color: "#fff",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                style={{
                  padding: "8px 16px",
                  backgroundColor: "transparent",
                  color: "#000",
                  border: "1px solid #000",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </Sheet>
    </div>
  );
};

export const ModalRight: Story = {
  render: (args) => <SheetDemo {...args} />,
  args: {
    side: "right",
    isModal: true,
  },
};

export const StandardLeft: Story = {
  render: (args) => <SheetDemo {...args} />,
  args: {
    side: "left",
    isModal: false,
    title: "Navigation (Standard)",
  },
};

export const BottomMobile: Story = {
  render: (args) => <SheetDemo {...args} />,
  args: {
    side: "bottom",
    isModal: true,
    title: "Filter settings",
  },
};

export const BottomMobileScrollable: Story = {
  render: (args) => (
    <SheetDemo {...args}>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            // biome-ignore lint/suspicious/noArrayIndexKey: <sb>
            key={i}
            style={{
              padding: "16px",
              backgroundColor: "#f0f0f0",
              borderRadius: "8px",
              color: "#000",
            }}
          >
            Long content block {i + 1}. Try scrolling down!
          </div>
        ))}
      </div>
    </SheetDemo>
  ),
  args: {
    side: "bottom",
    isModal: true,
    title: "Very long content",
  },
};
