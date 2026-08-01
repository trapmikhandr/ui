import type { Meta, StoryObj } from "@storybook/react";
import { ChevronRight, X } from "lucide-react";
import { Text } from "@/components/text";
import { colorContract } from "@/themes";
import { ListItem } from "./list-item";

const meta = {
  title: "Components/Data Display/ListItem",
  component: ListItem,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
  args: {
    headline: <X />,
  },
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

// ── Context demo (similar to the SegmentedButton context story) ────────────────

export const Context: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
      {/* Level: surface.default — context="page". */}
      <div
        style={{
          backgroundColor: colorContract.surface.default,
          padding: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        <span
          style={{ fontSize: "12px", color: colorContract.onSurface.muted }}
        >
          surface.default (page background) — context="page"
        </span>
        <ListItem
          context="page"
          variant="card"
          leading={<ListItem.Icon>📚</ListItem.Icon>}
          headline={<Text variant="titleSmall">Learn words</Text>}
          supporting={
            <Text variant="bodySmall" color="muted">
              21 word
            </Text>
          }
          trailing={<ChevronRight size={20} />}
          onPress={() => {}}
        />
        <ListItem
          context="page"
          variant="list"
          headline={<Text variant="bodyMedium">List row (list variant)</Text>}
          supporting={
            <Text variant="bodySmall" color="muted">
              Transparent background
            </Text>
          }
          trailing={<ChevronRight size={20} />}
          onPress={() => {}}
        />

        {/* Level: surface.containerLow — context="elevated". */}
        <div
          style={{
            backgroundColor: colorContract.surface.containerLow,
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "8px",
            borderRadius: "12px",
          }}
        >
          <span
            style={{ fontSize: "12px", color: colorContract.onSurface.muted }}
          >
            surface.containerLow (section/panel) — context="elevated"
          </span>
          <ListItem
            context="elevated"
            variant="card"
            leading={<ListItem.Icon>✏️</ListItem.Icon>}
            headline={<Text variant="titleSmall">Practice</Text>}
            supporting={
              <Text variant="bodySmall" color="muted">
                20 sentences
              </Text>
            }
            trailing={<ChevronRight size={20} />}
            onPress={() => {}}
          />
          <ListItem
            context="elevated"
            variant="list"
            headline={<Text variant="bodyMedium">List row (list variant)</Text>}
            supporting={
              <Text variant="bodySmall" color="muted">
                Transparent background
              </Text>
            }
            trailing={<ChevronRight size={20} />}
            onPress={() => {}}
          />
        </div>
      </div>
    </div>
  ),
};

// ── Variants ───────────────────────────────────────────────────────────────────

export const CardVariant: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: colorContract.surface.default,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <ListItem
        variant="card"
        context="page"
        leading={<ListItem.Icon>📚</ListItem.Icon>}
        headline={<Text variant="titleSmall">Learn words</Text>}
        supporting={
          <Text variant="bodySmall" color="muted">
            Completed ✓
          </Text>
        }
        trailing={<ChevronRight size={20} />}
        onPress={() => {}}
      />
      <ListItem
        variant="card"
        context="page"
        leading={<ListItem.Icon>✏️</ListItem.Icon>}
        headline={<Text variant="titleSmall">Practice</Text>}
        supporting={
          <Text variant="bodySmall" color="muted">
            20 sentences
          </Text>
        }
        trailing={<ChevronRight size={20} />}
        onPress={() => {}}
      />
      <ListItem
        variant="card"
        context="page"
        leading={<ListItem.Icon>📖</ListItem.Icon>}
        headline={<Text variant="titleSmall">Theory</Text>}
        supporting={
          <Text variant="bodySmall" color="muted">
            Lesson grammar
          </Text>
        }
        trailing={<ChevronRight size={20} />}
        onPress={() => {}}
      />
    </div>
  ),
};

export const ListVariant: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: colorContract.surface.default,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <ListItem
        variant="list"
        context="page"
        headline={<Text variant="bodyMedium">Dark theme</Text>}
        trailing={
          <Text variant="labelSmall" color="muted">
            On
          </Text>
        }
        onPress={() => {}}
      />
      <ListItem
        variant="list"
        context="page"
        headline={<Text variant="bodyMedium">Interface language</Text>}
        supporting={
          <Text variant="bodySmall" color="muted">
            English
          </Text>
        }
        trailing={<ChevronRight size={20} />}
        onPress={() => {}}
      />
      <ListItem
        variant="list"
        context="page"
        headline={<Text variant="bodyMedium">Static row</Text>}
        supporting={
          <Text variant="bodySmall" color="muted">
            Without onPress — no hover
          </Text>
        }
      />
    </div>
  ),
};

export const IconTones: Story = {
  render: () => (
    <div
      style={{
        backgroundColor: colorContract.surface.default,
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        gap: "8px",
      }}
    >
      <ListItem
        variant="card"
        leading={<ListItem.Avatar tone="neutral">📚</ListItem.Avatar>}
        headline={<Text variant="titleSmall">Neutral (default)</Text>}
      />
      <ListItem
        variant="card"
        leading={<ListItem.Avatar tone="primary">⭐</ListItem.Avatar>}
        headline={<Text variant="titleSmall">Primary</Text>}
      />
      <ListItem
        variant="card"
        leading={<ListItem.Avatar tone="success">✓</ListItem.Avatar>}
        headline={<Text variant="titleSmall">Success</Text>}
      />
      <ListItem
        variant="card"
        leading={<ListItem.Avatar tone="error">✗</ListItem.Avatar>}
        headline={<Text variant="titleSmall">Error</Text>}
      />
    </div>
  ),
};
