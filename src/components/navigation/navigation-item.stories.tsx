import type { Meta, StoryObj } from "@storybook/react";
import { Calendar, CreditCard, Home, Settings, Users } from "lucide-react";
import { NavigationContext, NavigationItem } from "./navigation-item";

const meta = {
  title: "Components/Navigation/NavigationItem",
  component: NavigationItem,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof NavigationItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DrawerMode: Story = {
  render: () => (
    <NavigationContext.Provider value="drawer">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "220px",
          gap: "4px",
        }}
      >
        <NavigationItem icon={<Home size={20} />}>Home</NavigationItem>
        <NavigationItem icon={<Calendar size={20} />} isActive>
          Schedule
        </NavigationItem>
        <NavigationItem icon={<Users size={20} />}>Clients</NavigationItem>
        <NavigationItem icon={<CreditCard size={20} />}>
          Finances
        </NavigationItem>
        <NavigationItem icon={<Settings size={20} />}>Settings</NavigationItem>
      </div>
    </NavigationContext.Provider>
  ),
};

export const RailMode: Story = {
  render: () => (
    <NavigationContext.Provider value="rail">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80px",
          gap: "4px",
        }}
      >
        <NavigationItem icon={<Home size={24} />}>Home</NavigationItem>
        <NavigationItem icon={<Calendar size={24} />} isActive>
          Schedule
        </NavigationItem>
        <NavigationItem icon={<Users size={24} />}>Clients</NavigationItem>
        <NavigationItem icon={<CreditCard size={24} />}>
          Finances
        </NavigationItem>
        <NavigationItem icon={<Settings size={24} />}>Settings</NavigationItem>
      </div>
    </NavigationContext.Provider>
  ),
};

export const BarMode: Story = {
  render: () => (
    <NavigationContext.Provider value="bar">
      <div style={{ display: "flex", flexDirection: "row", width: "360px" }}>
        <NavigationItem icon={<Home size={24} />}>Home</NavigationItem>
        <NavigationItem icon={<Calendar size={24} />} isActive>
          Schedule
        </NavigationItem>
        <NavigationItem icon={<Users size={24} />}>Clients</NavigationItem>
        <NavigationItem icon={<CreditCard size={24} />}>
          Finances
        </NavigationItem>
      </div>
    </NavigationContext.Provider>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>
      <NavigationContext.Provider value="drawer">
        <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <p style={{ fontSize: "12px", marginBottom: "4px", opacity: 0.5 }}>
            Drawer
          </p>
          <NavigationItem icon={<Calendar size={20} />} badge={5}>
            Schedule
          </NavigationItem>
          <NavigationItem icon={<Users size={20} />} badge={true}>
            Clients
          </NavigationItem>
          <NavigationItem icon={<CreditCard size={20} />} badge={120}>
            Finances
          </NavigationItem>
        </div>
      </NavigationContext.Provider>

      <NavigationContext.Provider value="rail">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "96px",
            gap: "4px",
          }}
        >
          <p style={{ fontSize: "12px", marginBottom: "4px", opacity: 0.5 }}>
            Rail
          </p>
          <NavigationItem icon={<Calendar size={24} />} badge={5}>
            Schedule
          </NavigationItem>
          <NavigationItem icon={<Users size={24} />} badge={true}>
            Clients
          </NavigationItem>
          <NavigationItem icon={<CreditCard size={24} />} badge={120}>
            Finances
          </NavigationItem>
        </div>
      </NavigationContext.Provider>
    </div>
  ),
};

export const AllModes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "48px", alignItems: "flex-start" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", opacity: 0.5 }}>
          Drawer
        </p>
        <NavigationContext.Provider value="drawer">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "220px",
              gap: "4px",
            }}
          >
            <NavigationItem icon={<Calendar size={20} />}>
              Schedule
            </NavigationItem>
            <NavigationItem icon={<Users size={20} />} isActive>
              Clients
            </NavigationItem>
            <NavigationItem icon={<CreditCard size={20} />}>
              Finances
            </NavigationItem>
          </div>
        </NavigationContext.Provider>
      </div>

      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", opacity: 0.5 }}>
          Rail
        </p>
        <NavigationContext.Provider value="rail">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              width: "80px",
              gap: "4px",
            }}
          >
            <NavigationItem icon={<Calendar size={24} />}>
              Schedule
            </NavigationItem>
            <NavigationItem icon={<Users size={24} />} isActive>
              Clients
            </NavigationItem>
            <NavigationItem icon={<CreditCard size={24} />}>
              Finances
            </NavigationItem>
          </div>
        </NavigationContext.Provider>
      </div>

      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", opacity: 0.5 }}>
          Bar
        </p>
        <NavigationContext.Provider value="bar">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <NavigationItem icon={<Calendar size={24} />}>
              Schedule
            </NavigationItem>
            <NavigationItem icon={<Users size={24} />} isActive>
              Clients
            </NavigationItem>
            <NavigationItem icon={<CreditCard size={24} />}>
              Finances
            </NavigationItem>
          </div>
        </NavigationContext.Provider>
      </div>
    </div>
  ),
};
