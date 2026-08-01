import type { Meta, StoryObj } from "@storybook/react";
import { ArrowLeft, MoreVertical } from "lucide-react";
import { IconButton } from "@/components/button/icon-button";
import { Text } from "@/components/text";
import { TopAppBar } from "./top-app-bar";

const meta = {
  title: "Components/Navigation/TopAppBar",
  component: TopAppBar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof TopAppBar>;

export default meta;
type Story = StoryObj<typeof meta>;

const BackButton = () => (
  <IconButton variant="standard" aria-label="Back" onPress={() => {}}>
    <ArrowLeft size={24} />
  </IconButton>
);

export const WithTitle: Story = {
  render: () => (
    <TopAppBar leading={<BackButton />}>
      <Text variant="titleMedium">Lesson 1</Text>
    </TopAppBar>
  ),
};

export const WithTitleAndSubtitle: Story = {
  render: () => (
    <TopAppBar leading={<BackButton />}>
      <Text variant="titleMedium">Theory</Text>
      <Text variant="labelSmall" color="muted">
        Lesson 1 — Pronouns
      </Text>
    </TopAppBar>
  ),
};

export const WithTrailing: Story = {
  render: () => (
    <TopAppBar
      leading={<BackButton />}
      trailing={
        <IconButton variant="standard" aria-label="More" onPress={() => {}}>
          <MoreVertical size={24} />
        </IconButton>
      }
    >
      <Text variant="titleMedium">Practice</Text>
    </TopAppBar>
  ),
};

export const WithScore: Story = {
  render: () => (
    <TopAppBar
      leading={<BackButton />}
      trailing={
        <Text variant="labelMedium" color="variant">
          4.6 ⭐
        </Text>
      }
    >
      <Text variant="titleMedium">Practice</Text>
      <Text variant="labelSmall" color="muted">
        Lesson 1
      </Text>
    </TopAppBar>
  ),
};

export const NoLeading: Story = {
  render: () => (
    <TopAppBar>
      <Text variant="titleMedium">Settings</Text>
    </TopAppBar>
  ),
};
