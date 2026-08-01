import type { Meta, StoryObj } from "@storybook/react";
import { Calendar, CreditCard, Settings, Users } from "lucide-react";
import { NavigationBar } from "./navigation-bar";
import { NavigationItem } from "./navigation-item";

const meta = {
  title: "Components/Navigation/NavigationBar",
  component: NavigationBar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
        }}
      >
        <NavigationBar>
          <NavigationBar.Nav>
            <NavigationItem icon={<Calendar size={24} />} isActive>
              Schedule
            </NavigationItem>
            <NavigationItem icon={<Users size={24} />}>Clients</NavigationItem>
            <NavigationItem icon={<CreditCard size={24} />}>
              Finances
            </NavigationItem>
            <NavigationItem icon={<Settings size={24} />}>Org.</NavigationItem>
          </NavigationBar.Nav>
        </NavigationBar>
      </div>
    </div>
  ),
};
