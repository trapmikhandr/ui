import type { Meta, StoryObj } from "@storybook/react";
import {
  Edit,
  MessageCircle,
  Mic,
  Navigation,
  Pencil,
  Plus,
  Share,
} from "lucide-react";
import type { ReactNode } from "react";
import { Fab } from "./fab";

const meta: Meta<typeof Fab> = {
  title: "Components/Actions/FAB",
  component: Fab,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  argTypes: {
    color: {
      control: "select",
      options: ["surface", "primary", "secondary", "tertiary"],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    lowered: { control: "boolean" },
    label: { control: "text" },
  },
  args: {
    "aria-label": "Add",
    children: <Plus />,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function Phone({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: 390,
          height: 700,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          borderRadius: 32,
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          backgroundColor: "#fff",
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Colors ───────────────────────────────────────────────────────────────────

export const Colors: Story = {
  name: "Colors — all 4 variants",
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      {(["surface", "primary", "secondary", "tertiary"] as const).map(
        (color) => (
          <div
            key={color}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <Fab color={color} aria-label={color}>
              <Plus size={24} />
            </Fab>
            <span style={{ fontSize: 11, color: "#666" }}>{color}</span>
          </div>
        ),
      )}
    </div>
  ),
};

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Sizes: Story = {
  name: "Sizes — small / medium / large",
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "flex-end" }}>
      {(["small", "medium", "large"] as const).map((size) => (
        <div
          key={size}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Fab size={size} color="primary" aria-label={size}>
            <Plus size={size === "large" ? 36 : 24} />
          </Fab>
          <span style={{ fontSize: 11, color: "#666" }}>{size}</span>
        </div>
      ))}
    </div>
  ),
};

// ─── Extended FAB ─────────────────────────────────────────────────────────────

export const Extended: Story = {
  name: "Extended FAB — all colors",
  render: () => (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        alignItems: "flex-start",
      }}
    >
      <Fab color="surface" label="Compose" aria-label="Compose">
        <Edit size={24} />
      </Fab>
      <Fab color="primary" label="New message" aria-label="New message">
        <MessageCircle size={24} />
      </Fab>
      <Fab color="secondary" label="Share" aria-label="Share">
        <Share size={24} />
      </Fab>
      <Fab color="tertiary" label="Navigate" aria-label="Navigate">
        <Navigation size={24} />
      </Fab>
    </div>
  ),
};

// ─── Lowered ──────────────────────────────────────────────────────────────────

export const Lowered: Story = {
  name: "Lowered — reduced elevation",
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Fab color="primary" aria-label="Normal">
          <Plus size={24} />
        </Fab>
        <span style={{ fontSize: 11, color: "#666" }}>normal (level3)</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Fab color="primary" lowered aria-label="Lowered">
          <Plus size={24} />
        </Fab>
        <span style={{ fontSize: 11, color: "#666" }}>lowered (level1)</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <Fab
          color="primary"
          label="Compose"
          lowered
          aria-label="Extended lowered"
        >
          <Edit size={24} />
        </Fab>
        <span style={{ fontSize: 11, color: "#666" }}>extended lowered</span>
      </div>
    </div>
  ),
};

// ─── App use-case ─────────────────────────────────────────────────────────────

export const AppStandard: Story = {
  name: "App — Standard FAB (bottom right)",
  render: () => (
    <Phone>
      <div
        style={{
          flex: 1,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{ height: 56, borderRadius: 12, backgroundColor: "#f0f0f0" }}
          />
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 24, right: 24 }}>
        <Fab color="primary" aria-label="Compose">
          <Pencil size={24} />
        </Fab>
      </div>
    </Phone>
  ),
  parameters: { layout: "fullscreen" },
};

export const AppExtended: Story = {
  name: "App — Extended FAB (bottom right)",
  render: () => (
    <Phone>
      <div
        style={{
          flex: 1,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{ height: 56, borderRadius: 12, backgroundColor: "#f0f0f0" }}
          />
        ))}
      </div>
      <div style={{ position: "absolute", bottom: 24, right: 24 }}>
        <Fab color="primary" label="New lesson" aria-label="New lesson">
          <Plus size={24} />
        </Fab>
      </div>
    </Phone>
  ),
  parameters: { layout: "fullscreen" },
};

export const AppVoice: Story = {
  name: "App — Voice FAB (secondary)",
  render: () => (
    <Phone>
      <div style={{ flex: 1, padding: "24px" }} />
      <div
        style={{
          position: "absolute",
          bottom: 24,
          right: 24,
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          alignItems: "flex-end",
        }}
      >
        <Fab size="small" color="surface" aria-label="Share">
          <Share size={20} />
        </Fab>
        <Fab color="secondary" label="Listen" aria-label="Listen">
          <Mic size={24} />
        </Fab>
      </div>
    </Phone>
  ),
  parameters: { layout: "fullscreen" },
};
