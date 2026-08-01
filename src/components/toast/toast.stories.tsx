import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { ToastRegion, toast } from "./";

const meta: Meta = {
  title: "Components/Feedback/Toast",
  decorators: [
    (Story) => (
      <>
        <Story />
        <ToastRegion />
      </>
    ),
  ],
};

export default meta;

type Story = StoryObj;

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button
        onPress={() => toast.info("Information", "Additional description")}
      >
        Info
      </Button>
      <Button onPress={() => toast.success("Saved successfully")}>
        Success
      </Button>
      <Button onPress={() => toast.error("Error", "Something went wrong")}>
        Error
      </Button>
      <Button onPress={() => toast.warning("Warning", "Check your data")}>
        Warning
      </Button>
    </div>
  ),
};

export const WithoutDescription: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button onPress={() => toast.info("Information")}>Info</Button>
      <Button onPress={() => toast.success("Saved")}>Success</Button>
      <Button onPress={() => toast.error("Error")}>Error</Button>
      <Button onPress={() => toast.warning("Warning")}>Warning</Button>
    </div>
  ),
};

export const MultipleToasts: Story = {
  render: () => (
    <Button
      onPress={() => {
        toast.info("First toast");
        setTimeout(() => toast.success("Second toast"), 300);
        setTimeout(() => toast.warning("Third toast"), 600);
        setTimeout(() => toast.error("Fourth toast"), 900);
      }}
    >
      Show 4 toasts
    </Button>
  ),
};

export const LongTimeout: Story = {
  name: "Long Timeout (test close button)",
  render: () => (
    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
      <Button
        onPress={() =>
          toast.info(
            "This toast disappears after 30 seconds",
            "Press X to close it sooner",
            { timeout: 30000 },
          )
        }
      >
        Show toast (30 sec)
      </Button>
    </div>
  ),
};
