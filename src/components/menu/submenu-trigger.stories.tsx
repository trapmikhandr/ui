import type { Meta, StoryObj } from "@storybook/react";
import { Check, Globe, Palette } from "lucide-react";
import { useState } from "react";
import { fn } from "storybook/test";
import { Button } from "../button";
import { Menu } from "./menu";

const meta: Meta<typeof Menu.SubTrigger> = {
  title: "Components/Overlays/Menu/SubTrigger",
  component: Menu.SubTrigger,
};

export default meta;
type Story = StoryObj<typeof Menu.SubTrigger>;

/** Clicking "Item 2" opens the nested list on the side, as in the reference. */
export const Default: Story = {
  render: () => {
    const [submenuOpen, setSubmenuOpen] = useState(false);

    return (
      <Menu>
        <Menu.Trigger>
          <Button variant="outlined">Open menu</Button>
        </Menu.Trigger>
        <Menu.Content onAction={fn()} nonClosingKeys={["item2"]}>
          <Menu.Item key="item1">Item 1</Menu.Item>
          <Menu.SubTrigger
            key="item2"
            label="Item 2"
            isOpen={submenuOpen}
            onOpenChange={setSubmenuOpen}
            onAction={fn()}
          >
            <Menu.Item key="sub1">Item 1</Menu.Item>
            <Menu.Item key="sub2">Item 2</Menu.Item>
            <Menu.Item key="sub3">Item 3</Menu.Item>
          </Menu.SubTrigger>
          <Menu.Item key="item3">Item 3</Menu.Item>
        </Menu.Content>
      </Menu>
    );
  },
};

/** Trigger icon, checkmark for the current choice, and a disabled current item — a language-switcher pattern. */
export const WithIconAndSelection: Story = {
  render: () => {
    const [submenuOpen, setSubmenuOpen] = useState(false);
    const [locale, setLocale] = useState("ru");

    const labels: Record<string, string> = {
      ru: "Russian",
      en: "English",
      pt: "Português",
    };

    return (
      <Menu>
        <Menu.Trigger>
          <Button variant="outlined">Account settings</Button>
        </Menu.Trigger>
        <Menu.Content
          onAction={(key) => {
            if (key === "locale") setSubmenuOpen((open) => !open);
          }}
          nonClosingKeys={["locale"]}
        >
          <Menu.Item key="profile">Profile</Menu.Item>
          <Menu.SubTrigger
            key="locale"
            label="Language"
            icon={<Globe size={16} />}
            isOpen={submenuOpen}
            onOpenChange={setSubmenuOpen}
            onAction={(key) => {
              setLocale(String(key).slice("locale:".length));
              setSubmenuOpen(false);
            }}
            disabledKeys={[`locale:${locale}`]}
          >
            {Object.entries(labels).map(([code, label]) => (
              <Menu.Item key={`locale:${code}`} textValue={label}>
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    gap: 8,
                  }}
                >
                  {label}
                  {code === locale && <Check size={16} />}
                </span>
              </Menu.Item>
            ))}
          </Menu.SubTrigger>
          <Menu.Item key="logout">Log out</Menu.Item>
        </Menu.Content>
      </Menu>
    );
  },
};

/** Several independent submenus in one list; each trigger owns its open state. */
export const MultipleSubmenus: Story = {
  render: () => {
    const [themeOpen, setThemeOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);

    return (
      <Menu>
        <Menu.Trigger>
          <Button variant="outlined">⋮</Button>
        </Menu.Trigger>
        <Menu.Content onAction={fn()} nonClosingKeys={["theme", "locale"]}>
          <Menu.SubTrigger
            key="theme"
            label="Theme"
            icon={<Palette size={16} />}
            isOpen={themeOpen}
            onOpenChange={setThemeOpen}
            onAction={fn()}
          >
            <Menu.Item key="theme:light">Light</Menu.Item>
            <Menu.Item key="theme:dark">Dark</Menu.Item>
            <Menu.Item key="theme:system">System</Menu.Item>
          </Menu.SubTrigger>
          <Menu.SubTrigger
            key="locale"
            label="Language"
            icon={<Globe size={16} />}
            isOpen={langOpen}
            onOpenChange={setLangOpen}
            onAction={fn()}
          >
            <Menu.Item key="locale:ru">Russian</Menu.Item>
            <Menu.Item key="locale:en">English</Menu.Item>
            <Menu.Item key="locale:pt">Português</Menu.Item>
          </Menu.SubTrigger>
          <Menu.Item key="logout">Log out</Menu.Item>
        </Menu.Content>
      </Menu>
    );
  },
};
