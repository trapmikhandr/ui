import type { Meta, StoryObj } from "@storybook/react";
import { Camera, Edit, FileText, Mic, Plus, Share, Video } from "lucide-react";
import type { ReactNode } from "react";
import { FabMenu } from "./fab-menu";

const meta: Meta<typeof FabMenu> = {
  title: "Components/Actions/FabMenu",
  component: FabMenu,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
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

export const Default: Story = {
  name: "Default — primary color",
  render: () => (
    <Phone>
      <div
        style={{
          flex: 1,
          padding: 24,
          display: "flex",
          flexDirection: "column",
          gap: 12,
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
        <FabMenu
          icon={<Plus size={24} />}
          aria-label="Create"
          color="primary"
          actions={[
            {
              icon: <Camera size={20} />,
              label: "Photo",
              "aria-label": "Photo",
              onPress: () => alert("Photo"),
            },
            {
              icon: <Video size={20} />,
              label: "Video",
              "aria-label": "Video",
              onPress: () => alert("Video"),
            },
            {
              icon: <Mic size={20} />,
              label: "Audio",
              "aria-label": "Audio",
              onPress: () => alert("Audio"),
            },
          ]}
        />
      </div>
    </Phone>
  ),
};

export const WithoutLabels: Story = {
  name: "Without action labels",
  render: () => (
    <Phone>
      <div style={{ position: "absolute", bottom: 24, right: 24 }}>
        <FabMenu
          icon={<Edit size={24} />}
          aria-label="Edit actions"
          color="secondary"
          actions={[
            {
              icon: <FileText size={20} />,
              "aria-label": "New document",
              onPress: () => {},
            },
            {
              icon: <Share size={20} />,
              "aria-label": "Share",
              onPress: () => {},
            },
            {
              icon: <Mic size={20} />,
              "aria-label": "Voice note",
              onPress: () => {},
            },
          ]}
        />
      </div>
    </Phone>
  ),
};

export const Colors: Story = {
  name: "Color variants",
  render: () => (
    <div
      style={{ display: "flex", gap: 40, padding: 40, alignItems: "flex-end" }}
    >
      {(["surface", "primary", "secondary", "tertiary"] as const).map(
        (color) => (
          <div
            key={color}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
            }}
          >
            <FabMenu
              icon={<Plus size={24} />}
              aria-label={`Create (${color})`}
              color={color}
              actions={[
                {
                  icon: <Camera size={20} />,
                  label: "Photo",
                  "aria-label": "Photo",
                  onPress: () => {},
                },
                {
                  icon: <Video size={20} />,
                  label: "Video",
                  "aria-label": "Video",
                  onPress: () => {},
                },
              ]}
            />
            <span style={{ fontSize: 11, color: "#666" }}>{color}</span>
          </div>
        ),
      )}
    </div>
  ),
  parameters: { layout: "centered" },
};

export const Lowered: Story = {
  name: "Lowered elevation",
  render: () => (
    <Phone>
      <div style={{ position: "absolute", bottom: 24, right: 24 }}>
        <FabMenu
          icon={<Plus size={24} />}
          aria-label="Create"
          color="primary"
          lowered
          actions={[
            {
              icon: <Camera size={20} />,
              label: "Photo",
              "aria-label": "Photo",
              onPress: () => {},
            },
            {
              icon: <Video size={20} />,
              label: "Video",
              "aria-label": "Video",
              onPress: () => {},
            },
            {
              icon: <Mic size={20} />,
              label: "Audio",
              "aria-label": "Audio",
              onPress: () => {},
            },
          ]}
        />
      </div>
    </Phone>
  ),
};
