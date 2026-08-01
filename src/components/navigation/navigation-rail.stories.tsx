import type { Meta, StoryObj } from "@storybook/react";
import { Calendar, CreditCard, Settings, Users } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { NavigationItem } from "./navigation-item";
import { NavigationRail } from "./navigation-rail";

const meta = {
  title: "Components/Navigation/NavigationRail",
  component: NavigationRail,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationRail>;

export default meta;
type Story = StoryObj<typeof meta>;

const navItems = [
  { icon: <Calendar size={24} />, label: "Schedule", isActive: true },
  { icon: <Users size={24} />, label: "Clients" },
  { icon: <CreditCard size={24} />, label: "Finances" },
  { icon: <Settings size={24} />, label: "Org." },
];

export const Collapsed: Story = {
  render: () => (
    <div style={{ height: "100vh", width: "80px" }}>
      <NavigationRail>
        <NavigationRail.Header>
          <Avatar name="poliglot" size="small" />
        </NavigationRail.Header>

        <NavigationRail.Nav>
          {navItems.map(({ icon, label, isActive }) => (
            <NavigationItem key={label} icon={icon} isActive={isActive}>
              {label}
            </NavigationItem>
          ))}
        </NavigationRail.Nav>

        <NavigationRail.Footer>
          <Avatar name="Anna Ivanova" size="small" />
        </NavigationRail.Footer>
      </NavigationRail>
    </div>
  ),
};

export const Expanded: Story = {
  render: () => (
    <div style={{ height: "100vh", width: "220px" }}>
      <NavigationRail expanded>
        <NavigationRail.Header>
          <Avatar name="poliglot" size="small" />
          <span style={{ fontWeight: 600 }}>Logokot</span>
        </NavigationRail.Header>

        <NavigationRail.Nav>
          {navItems.map(({ icon, label, isActive }) => (
            <NavigationItem key={label} icon={icon} isActive={isActive}>
              {label}
            </NavigationItem>
          ))}
        </NavigationRail.Nav>

        <NavigationRail.Footer>
          <Avatar name="Anna Ivanova" size="small" />
        </NavigationRail.Footer>
      </NavigationRail>
    </div>
  ),
};
