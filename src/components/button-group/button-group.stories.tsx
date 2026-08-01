import type { Meta, StoryObj } from "@storybook/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Italic,
  Underline,
} from "lucide-react";
import { useState } from "react";
import { ButtonGroup } from "./button-group";

const meta: Meta<typeof ButtonGroup> = {
  title: "Components/Actions/ButtonGroup",
  component: ButtonGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "radio", options: ["standard", "connected"] },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    size: { control: "radio", options: ["xs", "s", "m", "l", "xl"] },
    shape: { control: "radio", options: ["round", "square"] },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const groupSizes = ["xs", "s", "m", "l", "xl"] as const;

function SizeShowcase({
  variant,
  shape,
}: {
  variant: "standard" | "connected";
  shape?: "round" | "square";
}) {
  return (
    <div style={{ display: "grid", gap: 18 }}>
      {groupSizes.map((size) => (
        <div
          key={`${variant}-${shape ?? "default"}-${size}`}
          style={{
            display: "grid",
            gridTemplateColumns: "32px auto",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{ fontSize: 12, color: "#666", textTransform: "uppercase" }}
          >
            {size}
          </span>
          <ButtonGroup
            variant={variant}
            size={size}
            shape={shape}
            selectionMode="single"
            defaultSelectedKey="grid"
            aria-label={`${variant} ${shape ?? "default"} ${size}`}
          >
            <ButtonGroup.Button id="list" variant="tonal">
              List
            </ButtonGroup.Button>
            <ButtonGroup.Button id="grid" variant="tonal">
              Grid
            </ButtonGroup.Button>
            <ButtonGroup.Button id="board" variant="tonal">
              Board
            </ButtonGroup.Button>
          </ButtonGroup>
        </div>
      ))}
    </div>
  );
}

// ─── Side-by-side comparison ──────────────────────────────────────────────────

export const Comparison: Story = {
  name: "Standard vs Connected",
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 12, color: "#666" }}>
          standard — 12dp gap, pills preserved
        </span>
        <ButtonGroup variant="standard" aria-label="Standard">
          <ButtonGroup.Button id="day" variant="filled">
            Day
          </ButtonGroup.Button>
          <ButtonGroup.Button id="week" variant="filled">
            Week
          </ButtonGroup.Button>
          <ButtonGroup.Button id="month" variant="filled">
            Month
          </ButtonGroup.Button>
        </ButtonGroup>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <span style={{ fontSize: 12, color: "#666" }}>
          connected — 2dp gap, 8dp inner corners
        </span>
        <ButtonGroup
          variant="connected"
          selectionMode="single"
          defaultSelectedKey="week"
          aria-label="Connected"
        >
          <ButtonGroup.Button id="day" variant="tonal">
            Day
          </ButtonGroup.Button>
          <ButtonGroup.Button id="week" variant="tonal">
            Week
          </ButtonGroup.Button>
          <ButtonGroup.Button id="month" variant="tonal">
            Month
          </ButtonGroup.Button>
        </ButtonGroup>
      </div>
    </div>
  ),
};

// ─── Standard ────────────────────────────────────────────────────────────────

export const StandardFilled: Story = {
  name: "Standard — filled",
  render: () => (
    <ButtonGroup variant="standard" aria-label="Actions">
      <ButtonGroup.Button id="save" variant="filled">
        Save
      </ButtonGroup.Button>
      <ButtonGroup.Button id="duplicate" variant="filled">
        Duplicate
      </ButtonGroup.Button>
      <ButtonGroup.Button id="cancel" variant="filled">
        Cancel
      </ButtonGroup.Button>
    </ButtonGroup>
  ),
};

export const StandardTonal: Story = {
  name: "Standard — tonal",
  render: () => (
    <ButtonGroup
      variant="standard"
      selectionMode="single"
      defaultSelectedKey="duplicate"
      aria-label="Actions"
    >
      <ButtonGroup.Button id="save" variant="tonal">
        Save
      </ButtonGroup.Button>
      <ButtonGroup.Button id="duplicate" variant="tonal">
        Duplicate
      </ButtonGroup.Button>
      <ButtonGroup.Button id="cancel" variant="tonal">
        Cancel
      </ButtonGroup.Button>
    </ButtonGroup>
  ),
};

export const StandardOutlined: Story = {
  name: "Standard — outlined",
  render: () => (
    <ButtonGroup
      variant="standard"
      selectionMode="single"
      defaultSelectedKey="duplicate"
      aria-label="Actions"
    >
      <ButtonGroup.Button id="save" variant="outlined">
        Save
      </ButtonGroup.Button>
      <ButtonGroup.Button id="duplicate" variant="outlined">
        Duplicate
      </ButtonGroup.Button>
      <ButtonGroup.Button id="cancel" variant="outlined">
        Cancel
      </ButtonGroup.Button>
    </ButtonGroup>
  ),
};

export const SelectionRequired: Story = {
  name: "Selection required",
  render: () => (
    <ButtonGroup
      variant="connected"
      selectionMode="single"
      selectionRequired
      defaultSelectedKey="medium"
      aria-label="Required size"
    >
      <ButtonGroup.Button id="small" variant="tonal">
        Small
      </ButtonGroup.Button>
      <ButtonGroup.Button id="medium" variant="tonal">
        Medium
      </ButtonGroup.Button>
      <ButtonGroup.Button id="large" variant="tonal">
        Large
      </ButtonGroup.Button>
    </ButtonGroup>
  ),
};

export const StandardSizes: Story = {
  name: "Standard — size gaps",
  render: () => <SizeShowcase variant="standard" />,
};

export const StandardExpressivePress: Story = {
  name: "Standard — selectable",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: 12, color: "#888" }}>
        Selection state without motion
      </span>
      <ButtonGroup
        variant="standard"
        selectionMode="multiple"
        defaultSelectedKeys={["italic"]}
        aria-label="Formatting"
      >
        <ButtonGroup.IconButton id="bold" aria-label="Bold" variant="tonal">
          <Bold size={18} />
        </ButtonGroup.IconButton>
        <ButtonGroup.IconButton id="italic" aria-label="Italic" variant="tonal">
          <Italic size={18} />
        </ButtonGroup.IconButton>
        <ButtonGroup.IconButton
          id="underline"
          aria-label="Underline"
          variant="tonal"
        >
          <Underline size={18} />
        </ButtonGroup.IconButton>
      </ButtonGroup>
    </div>
  ),
};

export const StandardAlignment: Story = {
  name: "Standard — alignment (radio)",
  render: () => {
    const [align, setAlign] = useState<"left" | "center" | "right">("left");
    return (
      <ButtonGroup
        variant="standard"
        selectionMode="single"
        selectedKey={align}
        onSelectionChange={(selection) => {
          if (typeof selection === "string") {
            setAlign(selection as "left" | "center" | "right");
          }
        }}
        aria-label="Text alignment"
      >
        <ButtonGroup.IconButton
          id="left"
          aria-label="Align left"
          variant="tonal"
        >
          <AlignLeft size={18} />
        </ButtonGroup.IconButton>
        <ButtonGroup.IconButton
          id="center"
          aria-label="Align centre"
          variant="tonal"
        >
          <AlignCenter size={18} />
        </ButtonGroup.IconButton>
        <ButtonGroup.IconButton
          id="right"
          aria-label="Align right"
          variant="tonal"
        >
          <AlignRight size={18} />
        </ButtonGroup.IconButton>
      </ButtonGroup>
    );
  },
};

// ─── Connected ────────────────────────────────────────────────────────────────

export const ConnectedMixed: Story = {
  name: "Connected — mixed buttons",
  render: () => {
    const [view, setView] = useState<"list" | "grid" | "board">("grid");

    return (
      <ButtonGroup
        variant="connected"
        selectionMode="single"
        selectedKey={view}
        onSelectionChange={(selection) => {
          if (typeof selection === "string") {
            setView(selection as "list" | "grid" | "board");
          }
        }}
        aria-label="View"
      >
        <ButtonGroup.Button id="list" variant="tonal">
          List
        </ButtonGroup.Button>
        <ButtonGroup.IconButton id="grid" aria-label="Grid" variant="tonal">
          <AlignCenter size={20} />
        </ButtonGroup.IconButton>
        <ButtonGroup.Button
          id="board"
          variant="tonal"
          leftIcon={<AlignRight size={18} />}
        >
          Board
        </ButtonGroup.Button>
      </ButtonGroup>
    );
  },
};

export const ConnectedButtons: Story = {
  name: "Connected — buttons",
  render: () => (
    <ButtonGroup
      variant="connected"
      selectionMode="single"
      defaultSelectedKey="grid"
      aria-label="View"
    >
      <ButtonGroup.Button id="list" variant="tonal">
        List
      </ButtonGroup.Button>
      <ButtonGroup.Button id="grid" variant="tonal">
        Grid
      </ButtonGroup.Button>
      <ButtonGroup.Button id="board" variant="tonal">
        Board
      </ButtonGroup.Button>
    </ButtonGroup>
  ),
};

export const ConnectedFilled: Story = {
  name: "Connected — filled",
  render: () => (
    <ButtonGroup variant="connected" aria-label="Actions">
      <ButtonGroup.Button id="accept" variant="filled">
        Accept
      </ButtonGroup.Button>
      <ButtonGroup.Button id="decline" variant="filled">
        Decline
      </ButtonGroup.Button>
    </ButtonGroup>
  ),
};

export const ConnectedTonal: Story = {
  name: "Connected — tonal",
  render: () => (
    <ButtonGroup
      variant="connected"
      selectionMode="single"
      defaultSelectedKey="duplicate"
      aria-label="Actions"
    >
      <ButtonGroup.Button id="save" variant="tonal">
        Save
      </ButtonGroup.Button>
      <ButtonGroup.Button id="duplicate" variant="tonal">
        Duplicate
      </ButtonGroup.Button>
      <ButtonGroup.Button id="cancel" variant="tonal">
        Cancel
      </ButtonGroup.Button>
    </ButtonGroup>
  ),
};

export const ConnectedOutlined: Story = {
  name: "Connected — outlined",
  render: () => (
    <ButtonGroup
      variant="connected"
      selectionMode="single"
      defaultSelectedKey="duplicate"
      aria-label="Actions"
    >
      <ButtonGroup.Button id="save" variant="outlined">
        Save
      </ButtonGroup.Button>
      <ButtonGroup.Button id="duplicate" variant="outlined">
        Duplicate
      </ButtonGroup.Button>
      <ButtonGroup.Button id="cancel" variant="outlined">
        Cancel
      </ButtonGroup.Button>
    </ButtonGroup>
  ),
};

export const ConnectedRoundSizes: Story = {
  name: "Connected — round sizes",
  render: () => <SizeShowcase variant="connected" shape="round" />,
};

export const ConnectedSquareSizes: Story = {
  name: "Connected — square sizes",
  render: () => <SizeShowcase variant="connected" shape="square" />,
};

export const ConnectedMinimumWidths: Story = {
  name: "Connected — xs/s minimum widths",
  render: () => (
    <div style={{ display: "grid", gap: 18 }}>
      {(["xs", "s"] as const).map((size) => (
        <div
          key={`min-width-${size}`}
          style={{
            display: "grid",
            gridTemplateColumns: "32px auto",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{ fontSize: 12, color: "#666", textTransform: "uppercase" }}
          >
            {size}
          </span>
          <ButtonGroup
            variant="connected"
            size={size}
            selectionMode="single"
            defaultSelectedKey="b"
            aria-label={`Connected ${size} minimum width`}
          >
            <ButtonGroup.IconButton id="a" aria-label="Bold" variant="tonal">
              <Bold size={18} />
            </ButtonGroup.IconButton>
            <ButtonGroup.IconButton id="b" aria-label="Italic" variant="tonal">
              <Italic size={18} />
            </ButtonGroup.IconButton>
            <ButtonGroup.IconButton
              id="c"
              aria-label="Underline"
              variant="tonal"
            >
              <Underline size={18} />
            </ButtonGroup.IconButton>
          </ButtonGroup>
        </div>
      ))}
    </div>
  ),
};

export const ConnectedIconSelection: Story = {
  name: "Connected — icon selection",
  render: () => {
    const [align, setAlign] = useState<"left" | "center" | "right">("left");
    return (
      <ButtonGroup
        variant="connected"
        selectionMode="single"
        selectedKey={align}
        onSelectionChange={(selection) => {
          if (typeof selection === "string") {
            setAlign(selection as "left" | "center" | "right");
          }
        }}
        aria-label="Alignment"
      >
        <ButtonGroup.IconButton
          id="left"
          aria-label="Align left"
          variant="tonal"
        >
          <AlignLeft size={18} />
        </ButtonGroup.IconButton>
        <ButtonGroup.IconButton
          id="center"
          aria-label="Align centre"
          variant="tonal"
        >
          <AlignCenter size={18} />
        </ButtonGroup.IconButton>
        <ButtonGroup.IconButton
          id="right"
          aria-label="Align right"
          variant="tonal"
        >
          <AlignRight size={18} />
        </ButtonGroup.IconButton>
      </ButtonGroup>
    );
  },
};

export const ConnectedIconWidths: Story = {
  name: "Connected — icon widths",
  render: () => (
    <div style={{ display: "grid", gap: 18 }}>
      {groupSizes.map((size) => (
        <div
          key={`icon-width-${size}`}
          style={{
            display: "grid",
            gridTemplateColumns: "32px auto",
            alignItems: "center",
            gap: 16,
          }}
        >
          <span
            style={{ fontSize: 12, color: "#666", textTransform: "uppercase" }}
          >
            {size}
          </span>
          <ButtonGroup
            variant="connected"
            size={size}
            selectionMode="single"
            defaultSelectedKey="wide"
            aria-label={`Icon widths ${size}`}
          >
            <ButtonGroup.IconButton
              id="narrow"
              aria-label="Narrow"
              variant="tonal"
              width="narrow"
            >
              <Bold size={22} />
            </ButtonGroup.IconButton>
            <ButtonGroup.IconButton
              id="default"
              aria-label="Default"
              variant="tonal"
            >
              <Italic size={22} />
            </ButtonGroup.IconButton>
            <ButtonGroup.IconButton
              id="wide"
              aria-label="Wide"
              variant="tonal"
              width="wide"
            >
              <AlignCenter size={22} />
            </ButtonGroup.IconButton>
          </ButtonGroup>
        </div>
      ))}
    </div>
  ),
};

export const ConnectedIconButtons: Story = {
  name: "Connected — icon buttons",
  render: () => {
    const [tools, setTools] = useState(new Set(["bold"]));

    return (
      <ButtonGroup
        variant="connected"
        selectionMode="multiple"
        selectedKeys={tools}
        onSelectionChange={(selection) => {
          if (selection instanceof Set) {
            setTools(selection as Set<string>);
          }
        }}
        aria-label="Formatting"
      >
        <ButtonGroup.IconButton id="bold" aria-label="Bold" variant="tonal">
          <Bold size={20} />
        </ButtonGroup.IconButton>
        <ButtonGroup.IconButton id="italic" aria-label="Italic" variant="tonal">
          <Italic size={20} />
        </ButtonGroup.IconButton>
        <ButtonGroup.IconButton
          id="underline"
          aria-label="Underline"
          variant="tonal"
        >
          <Underline size={20} />
        </ButtonGroup.IconButton>
      </ButtonGroup>
    );
  },
};

// ─── Vertical ────────────────────────────────────────────────────────────────

export const VerticalConnected: Story = {
  name: "Vertical — connected",
  render: () => {
    const [page, setPage] = useState<"overview" | "settings" | "help">(
      "overview",
    );

    return (
      <div style={{ width: 200 }}>
        <ButtonGroup
          variant="connected"
          orientation="vertical"
          selectionMode="single"
          selectedKey={page}
          onSelectionChange={(selection) => {
            if (typeof selection === "string") {
              setPage(selection as "overview" | "settings" | "help");
            }
          }}
          aria-label="Navigation"
        >
          <ButtonGroup.Button id="overview" variant="tonal" fullWidth>
            Overview
          </ButtonGroup.Button>
          <ButtonGroup.Button id="settings" variant="tonal" fullWidth>
            Settings
          </ButtonGroup.Button>
          <ButtonGroup.Button id="help" variant="tonal" fullWidth>
            Help
          </ButtonGroup.Button>
        </ButtonGroup>
      </div>
    );
  },
};
