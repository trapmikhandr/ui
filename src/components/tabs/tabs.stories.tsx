import type { Meta, StoryObj } from "@storybook/react";
import { Briefcase, Plane, Search } from "lucide-react";
import { useState } from "react";
import { Tabs } from "./tabs";

const meta: Meta<typeof Tabs> = {
  title: "Components/Navigation/Tabs",
  component: Tabs,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const surfaceStyle = {
  background: "var(--color-surface-default, #fff)",
  minHeight: 200,
  display: "flex",
  flexDirection: "column" as const,
  gap: 32,
  padding: 24,
};

export const Secondary: Story = {
  render: () => {
    const [value, setValue] = useState("overview");
    return (
      <div style={surfaceStyle}>
        <div>
          <p style={{ margin: "0 0 8px", fontSize: 12, opacity: 0.5 }}>
            Secondary tabs
          </p>
          <Tabs
            aria-label="Details"
            variant="secondary"
            options={[
              { value: "overview", label: "Overview" },
              { value: "specs", label: "Specifications" },
            ]}
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
    );
  },
};

export const Primary: Story = {
  render: () => {
    const [value, setValue] = useState("flights");
    return (
      <div style={surfaceStyle}>
        <div>
          <p style={{ margin: "0 0 8px", fontSize: 12, opacity: 0.5 }}>
            Primary tabs (with icons)
          </p>
          <Tabs
            aria-label="Navigation"
            variant="primary"
            options={[
              { value: "flights", label: "Flights", icon: <Plane /> },
              { value: "trips", label: "Trips", icon: <Briefcase /> },
              { value: "explore", label: "Explore", icon: <Search /> },
            ]}
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
    );
  },
};

export const BothVariants: Story = {
  name: "Primary vs Secondary",
  render: () => {
    const [v1, setV1] = useState("train");
    const [v2, setV2] = useState("train");
    return (
      <div style={surfaceStyle}>
        <div>
          <p style={{ margin: "0 0 8px", fontSize: 12, opacity: 0.5 }}>
            Primary
          </p>
          <Tabs
            aria-label="Mode — primary"
            variant="primary"
            options={[
              { value: "train", label: "Practice", icon: "✏️" },
              { value: "words", label: "All words", icon: "📚" },
            ]}
            value={v1}
            onChange={setV1}
          />
        </div>
        <div>
          <p style={{ margin: "0 0 8px", fontSize: 12, opacity: 0.5 }}>
            Secondary
          </p>
          <Tabs
            aria-label="Mode — secondary"
            variant="secondary"
            options={[
              { value: "train", label: "Practice" },
              { value: "words", label: "All words" },
            ]}
            value={v2}
            onChange={setV2}
          />
        </div>
      </div>
    );
  },
};

export const LessonUseCase: Story = {
  name: "Lesson tabs (real-world case)",
  render: () => {
    const [value, setValue] = useState("train");
    return (
      <div style={{ ...surfaceStyle, padding: 0 }}>
        <Tabs
          aria-label="Lesson mode"
          variant="secondary"
          options={[
            { value: "train", label: "Practice" },
            { value: "words", label: "All words" },
          ]}
          value={value}
          onChange={setValue}
        />
        <div style={{ padding: 16, opacity: 0.5, fontSize: 14 }}>
          Active tab: {value}
        </div>
      </div>
    );
  },
};

export const WithDisabled: Story = {
  render: () => {
    const [value, setValue] = useState("train");
    return (
      <div style={surfaceStyle}>
        <Tabs
          aria-label="Mode"
          variant="secondary"
          options={[
            { value: "train", label: "Practice" },
            { value: "words", label: "All words" },
            { value: "stats", label: "Statistics", disabled: true },
          ]}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};
