import type { Meta, StoryObj } from "@storybook/react";
import {
  Cat,
  Home,
  LayoutDashboard,
  Settings,
  ShoppingCart,
  Users,
} from "lucide-react";
import type { ComponentProps } from "react";
import { Text } from "@/components";
import { colorContract } from "@/themes";
import { AppLayout } from "./app-layout";

type AppLayoutProps = ComponentProps<typeof AppLayout>;

const meta: Meta<typeof AppLayout> = {
  title: "Components/Layout/AppLayout",
  component: AppLayout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    defaultCollapsed: {
      control: "boolean",
      description: "Initial sidebar state (desktop only)",
    },
    children: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const CARD_IDS = Array.from({ length: 20 }, (_, i) => `card-${i + 1}`);

const navItems = [
  { icon: <Home />, label: "Home", isActive: true },
  { icon: <LayoutDashboard />, label: "Dashboard" },
  { icon: <ShoppingCart />, label: "Orders" },
  { icon: <Users />, label: "Clients" },
];

const DashboardExample = (args: Omit<AppLayoutProps, "children">) => (
  <AppLayout {...args}>
    <AppLayout.Sidebar
      logoTrigger={
        <span style={{ fontWeight: 700 }}>
          <Cat />
        </span>
      }
      headerContent={
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Text variant="labelLarge">Logokot</Text>
          <span
            style={{ fontSize: 12, color: colorContract.onSurface.variant }}
          >
            Anna's Studio
          </span>
        </div>
      }
    >
      {navItems.map(({ icon, label, isActive }) => (
        <AppLayout.SidebarItem key={label} icon={icon} isActive={isActive}>
          {label}
        </AppLayout.SidebarItem>
      ))}
      <AppLayout.SidebarItem icon={<Settings />} style={{ marginTop: "auto" }}>
        Settings
      </AppLayout.SidebarItem>
    </AppLayout.Sidebar>

    <AppLayout.MobileBar>
      {navItems.map(({ icon, label, isActive }) => (
        <AppLayout.SidebarItem key={label} icon={icon} isActive={isActive}>
          {label}
        </AppLayout.SidebarItem>
      ))}
    </AppLayout.MobileBar>

    <AppLayout.Main>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <h1 style={{ color: colorContract.onSurface.default }}>Welcome</h1>
        <p style={{ color: colorContract.onSurface.variant, marginBottom: 32 }}>
          This is a layout demo. Try collapsing the menu or switching to the
          mobile view.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 32,
          }}
        >
          {[
            {
              bg: colorContract.primary.container,
              fg: colorContract.primary.onContainer,
              label: "Active orders",
              value: "156",
            },
            {
              bg: colorContract.secondary.container,
              fg: colorContract.secondary.onContainer,
              label: "New clients",
              value: "24",
            },
            {
              bg: colorContract.tertiary.container,
              fg: colorContract.tertiary.onContainer,
              label: "Completed",
              value: "89%",
            },
          ].map(({ bg, fg, label, value }) => (
            <div
              key={label}
              style={{
                padding: 20,
                borderRadius: 12,
                background: bg,
                color: fg,
              }}
            >
              <div style={{ fontSize: 14, marginBottom: 8, opacity: 0.8 }}>
                {label}
              </div>
              <div style={{ fontSize: 32, fontWeight: "bold" }}>{value}</div>
            </div>
          ))}
        </div>

        {CARD_IDS.map((id, i) => (
          <div
            key={id}
            style={{
              padding: 24,
              marginBottom: 16,
              borderRadius: 12,
              background: colorContract.surface.containerHigh,
            }}
          >
            <h3
              style={{
                color: colorContract.onSurface.default,
                marginBottom: 8,
              }}
            >
              Card {i + 1}
            </h3>
            <p style={{ color: colorContract.onSurface.variant }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        ))}
      </div>
    </AppLayout.Main>
  </AppLayout>
);

export const Default: Story = {
  render: (args) => <DashboardExample {...args} />,
  args: { defaultCollapsed: false },
};

export const Collapsed: Story = {
  render: (args) => <DashboardExample {...args} />,
  args: { defaultCollapsed: true },
};

export const MobileView: Story = {
  render: (args) => <DashboardExample {...args} />,
  args: { defaultCollapsed: false },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};

// Mobile: overlay drawer triggered by hamburger (no bottom bar)
// Suitable for desktop-first applications (CRM, admin dashboards).
const DrawerOverlayExample = (args: Omit<AppLayoutProps, "children">) => (
  <AppLayout {...args}>
    <AppLayout.Sidebar
      logoTrigger={<span style={{ fontWeight: 700 }}>L</span>}
      headerContent={
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Text variant="labelLarge">Logokot</Text>
          <span
            style={{ fontSize: 12, color: colorContract.onSurface.variant }}
          >
            Anna's Studio
          </span>
        </div>
      }
    >
      {navItems.map(({ icon, label, isActive }) => (
        <AppLayout.SidebarItem key={label} icon={icon} isActive={isActive}>
          {label}
        </AppLayout.SidebarItem>
      ))}
      <AppLayout.SidebarItem icon={<Settings />} style={{ marginTop: "auto" }}>
        Settings
      </AppLayout.SidebarItem>
    </AppLayout.Sidebar>

    <AppLayout.Main>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 24,
        }}
      >
        <AppLayout.Trigger />
        <h1 style={{ margin: 0, color: colorContract.onSurface.default }}>
          Home
        </h1>
      </div>
      <p style={{ color: colorContract.onSurface.variant }}>
        On mobile, navigation is hidden. The hamburger opens the drawer overlay.
      </p>
    </AppLayout.Main>
  </AppLayout>
);

export const MobileDrawerOverlay: Story = {
  render: (args) => <DrawerOverlayExample {...args} />,
  args: { defaultCollapsed: false },
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
};
