import type { Meta, StoryObj } from "@storybook/react";
import { VideoPlayer } from "./video-player";

const meta: Meta<typeof VideoPlayer> = {
  title: "Components/Media/VideoPlayer",
  component: VideoPlayer,
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
    enableOverlayMod: true,
    width: 350,
  },
};

export const OpenedModal: Story = {
  args: {
    src: "https://mdn.github.io/shared-assets/videos/flower.mp4",
    bottomContent: <div>test</div>,
  },
};
