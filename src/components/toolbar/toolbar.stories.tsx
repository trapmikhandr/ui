import type { Meta, StoryObj } from "@storybook/react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Highlighter,
  Image,
  Italic,
  MessageSquare,
  Mic,
  MoreHorizontal,
  Plus,
  RotateCcw,
  Share,
  Star,
  Trash2,
  Underline,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { IconButton } from "@/components/button/icon-button";
import { Toolbar } from "./toolbar";

const meta: Meta<typeof Toolbar> = {
  title: "Components/Navigation/Toolbar",
  component: Toolbar,
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
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          overflow: "hidden",
          borderRadius: 32,
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
          backgroundColor: "#e0f2f1",
        }}
      >
        {children}
      </div>
    </div>
  );
}

function Canvas({ children }: { children: ReactNode }) {
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
      {children}
    </div>
  );
}

// ─── Docked ──────────────────────────────────────────────────────────────────

export const DockedStandard: Story = {
  name: "Docked / Standard",
  render: () => (
    <Phone>
      <Toolbar aria-label="Actions" colorScheme="standard" variant="docked">
        <IconButton aria-label="Undo" size="lg">
          <RotateCcw size={24} />
        </IconButton>
        <IconButton aria-label="Share" size="lg">
          <Share size={24} />
        </IconButton>
        <IconButton aria-label="Favourite" size="lg">
          <Star size={24} />
        </IconButton>
        <IconButton aria-label="Delete" size="lg">
          <Trash2 size={24} />
        </IconButton>
        <IconButton aria-label="More" size="lg">
          <MoreHorizontal size={24} />
        </IconButton>
      </Toolbar>
    </Phone>
  ),
};

export const DockedVibrant: Story = {
  name: "Docked / Vibrant",
  render: () => (
    <Phone>
      <Toolbar aria-label="Actions" colorScheme="vibrant" variant="docked">
        <IconButton aria-label="Undo" size="lg">
          <RotateCcw size={24} />
        </IconButton>
        <IconButton aria-label="Share" size="lg">
          <Share size={24} />
        </IconButton>
        <IconButton aria-label="Favourite" size="lg">
          <Star size={24} />
        </IconButton>
        <IconButton aria-label="Delete" size="lg">
          <Trash2 size={24} />
        </IconButton>
        <IconButton aria-label="More" size="lg">
          <MoreHorizontal size={24} />
        </IconButton>
      </Toolbar>
    </Phone>
  ),
};

export const DockedWithFilledAndTonal: Story = {
  name: "Docked / Standard — filled + tonal toggle",
  render: () => (
    <Phone>
      <Toolbar
        aria-label="Text formatting"
        colorScheme="standard"
        variant="docked"
      >
        <IconButton toggle aria-label="Bold" size="l" variant="tonal">
          <Bold size={24} />
        </IconButton>
        <IconButton toggle aria-label="Italic" size="l" variant="tonal">
          <Italic size={24} />
        </IconButton>
        <IconButton toggle aria-label="Underline" size="l" variant="tonal">
          <Underline size={24} />
        </IconButton>
        <IconButton aria-label="Highlight" size="lg">
          <Highlighter size={24} />
        </IconButton>
        <IconButton
          aria-label="Insert"
          size="lg"
          variant="filled"
          color="primary"
        >
          <Plus size={24} />
        </IconButton>
      </Toolbar>
    </Phone>
  ),
};

export const DockedVibrantWithFilledAndTonal: Story = {
  name: "Docked / Vibrant — filled + tonal toggle",
  render: () => (
    <Phone>
      <Toolbar
        aria-label="Text formatting"
        colorScheme="vibrant"
        variant="docked"
      >
        <IconButton toggle aria-label="Bold" size="l" variant="tonal">
          <Bold size={24} />
        </IconButton>
        <IconButton toggle aria-label="Italic" size="l" variant="tonal">
          <Italic size={24} />
        </IconButton>
        <IconButton toggle aria-label="Underline" size="l" variant="tonal">
          <Underline size={24} />
        </IconButton>
        <IconButton aria-label="Highlight" size="lg">
          <Highlighter size={24} />
        </IconButton>
        <IconButton
          aria-label="Insert"
          size="lg"
          variant="filled"
          color="primary"
        >
          <Plus size={24} />
        </IconButton>
      </Toolbar>
    </Phone>
  ),
};

export const DockedRoundedWeb: Story = {
  name: "Docked / Rounded (web / large screen)",
  render: () => (
    <Canvas>
      <div
        style={{
          width: 680,
          backgroundColor: "#f5f0ff",
          borderRadius: 24,
          padding: "24px 0 0",
          overflow: "hidden",
          boxShadow: "0 2px 12px rgba(0,0,0,0.10)",
        }}
      >
        <div style={{ padding: "0 24px 16px", fontSize: 14, color: "#444" }}>
          Document content…
        </div>
        <Toolbar
          aria-label="Text formatting"
          colorScheme="standard"
          variant="docked"
          rounded
        >
          <IconButton aria-label="Undo" size="lg">
            <RotateCcw size={24} />
          </IconButton>
          <IconButton toggle aria-label="Bold" size="l" variant="tonal">
            <Bold size={24} />
          </IconButton>
          <IconButton toggle aria-label="Italic" size="l" variant="tonal">
            <Italic size={24} />
          </IconButton>
          <IconButton toggle aria-label="Underline" size="l" variant="tonal">
            <Underline size={24} />
          </IconButton>
          <IconButton aria-label="Highlight" size="lg">
            <Highlighter size={24} />
          </IconButton>
          <IconButton
            aria-label="Insert"
            size="lg"
            variant="filled"
            color="primary"
          >
            <Plus size={24} />
          </IconButton>
          <IconButton aria-label="Image" size="lg">
            <Image size={24} />
          </IconButton>
          <IconButton aria-label="More" size="lg">
            <MoreHorizontal size={24} />
          </IconButton>
        </Toolbar>
      </div>
    </Canvas>
  ),
};

// ─── Floating ─────────────────────────────────────────────────────────────────

export const FloatingHorizontalStandard: Story = {
  name: "Floating / Horizontal / Standard",
  render: () => (
    <Canvas>
      <Toolbar
        aria-label="Actions"
        colorScheme="standard"
        variant="floating"
        orientation="horizontal"
      >
        <IconButton aria-label="Back" size="lg">
          <ChevronLeft size={24} />
        </IconButton>
        <IconButton aria-label="Forward" size="lg">
          <ChevronRight size={24} />
        </IconButton>
        <IconButton aria-label="Add" size="lg" variant="filled" color="primary">
          <Plus size={24} />
        </IconButton>
        <IconButton aria-label="Insert image" size="lg">
          <Image size={24} />
        </IconButton>
        <IconButton aria-label="More" size="lg">
          <MoreHorizontal size={24} />
        </IconButton>
      </Toolbar>
    </Canvas>
  ),
};

export const FloatingHorizontalVibrant: Story = {
  name: "Floating / Horizontal / Vibrant",
  render: () => (
    <Canvas>
      <Toolbar
        aria-label="Actions"
        colorScheme="vibrant"
        variant="floating"
        orientation="horizontal"
      >
        <IconButton aria-label="Back" size="lg">
          <ChevronLeft size={24} />
        </IconButton>
        <IconButton aria-label="Forward" size="lg">
          <ChevronRight size={24} />
        </IconButton>
        <IconButton aria-label="Add" size="lg" variant="filled" color="primary">
          <Plus size={24} />
        </IconButton>
        <IconButton aria-label="Insert image" size="lg">
          <Image size={24} />
        </IconButton>
        <IconButton aria-label="More" size="lg">
          <MoreHorizontal size={24} />
        </IconButton>
      </Toolbar>
    </Canvas>
  ),
};

export const FloatingVertical: Story = {
  name: "Floating / Vertical",
  render: () => (
    <Canvas>
      <Toolbar
        aria-label="Text actions"
        colorScheme="standard"
        variant="floating"
        orientation="vertical"
      >
        <IconButton aria-label="Bold" size="lg">
          <Bold size={24} />
        </IconButton>
        <IconButton aria-label="Italic" size="lg">
          <Italic size={24} />
        </IconButton>
        <IconButton aria-label="Underline" size="lg">
          <Underline size={24} />
        </IconButton>
        <IconButton aria-label="Align left" size="lg">
          <AlignLeft size={24} />
        </IconButton>
        <IconButton aria-label="More" size="lg">
          <MoreHorizontal size={24} />
        </IconButton>
      </Toolbar>
    </Canvas>
  ),
};

export const FloatingWithTonalToggle: Story = {
  name: "Floating / Horizontal — tonal toggle",
  render: () => (
    <Canvas>
      <Toolbar
        aria-label="Alignment"
        colorScheme="standard"
        variant="floating"
        orientation="horizontal"
      >
        <IconButton toggle aria-label="Align left" size="l" variant="tonal">
          <AlignLeft size={24} />
        </IconButton>
        <IconButton toggle aria-label="Align centre" size="l" variant="tonal">
          <AlignCenter size={24} />
        </IconButton>
        <IconButton toggle aria-label="Align right" size="l" variant="tonal">
          <AlignRight size={24} />
        </IconButton>
        <IconButton toggle aria-label="Microphone" size="l" variant="tonal">
          <Mic size={24} />
        </IconButton>
        <IconButton aria-label="More" size="lg">
          <MoreHorizontal size={24} />
        </IconButton>
      </Toolbar>
    </Canvas>
  ),
};

// ─── App use-case ─────────────────────────────────────────────────────────────

export const PracticeScreen: Story = {
  name: "App — Practice screen (docked vibrant)",
  render: () => (
    <Phone>
      <Toolbar
        aria-label="Trainer actions"
        colorScheme="vibrant"
        variant="docked"
      >
        <IconButton aria-label="I made a mistake" size="lg">
          <X size={24} />
        </IconButton>
        <IconButton aria-label="Hint" size="lg">
          <MessageSquare size={24} />
        </IconButton>
        <IconButton aria-label="Help" size="lg">
          <BookOpen size={24} />
        </IconButton>
        <IconButton aria-label="Oral answer" size="lg">
          <Mic size={24} />
        </IconButton>
      </Toolbar>
    </Phone>
  ),
};
