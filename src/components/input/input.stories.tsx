import type { Meta, StoryObj } from "@storybook/react";
import { Eye, EyeOff, Lock, Mail, Search } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IconButton } from "@/components";
import { Input } from "./input";

const meta = {
  title: "Components/Forms/Input",
  component: Input,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  argTypes: {
    disabled: { control: "boolean" },
    errorMessage: { control: "text" },
    label: { control: "text" },
    placeholder: { control: "text" },
    // Icons are complex objects, so control them in code instead of the UI.
    leftIcon: { control: false },
    rightIcon: { control: false },
  },
  // Default props for all stories.
  args: {
    placeholder: "Enter text...",
    variant: "outlined",
    id: "textField",
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// === 1. Basic states ===

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "user@example.com",
  },
};

export const WithIcons: Story = {
  args: {
    label: "Search",
    placeholder: "Find something...",
    leftIcon: <Search size={20} />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: "Password",
    type: "password",
    placeholder: "••••••",
    leftIcon: <Lock size={20} />,
    rightIcon: <Eye size={20} style={{ cursor: "pointer" }} />,
  },
};

export const ErrorState: Story = {
  args: {
    label: "Username",
    defaultValue: "invalid-user",
    errorMessage: "This username is already taken",
    leftIcon: <Mail size={20} />,
  },
};

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    placeholder: "Cannot be edited",
    disabled: true,
    leftIcon: <Lock size={20} />,
  },
};

// === 2. Interactive React Hook Form example ===
// This live example demonstrates that forwardRef works correctly.

const RHFExample = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string; pass: string }>();

  // biome-ignore lint/suspicious/noExplicitAny: <storybook>
  const onSubmit = (data: any) => {
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: 16, width: 320 }}
    >
      <div style={{ paddingBottom: 12, borderBottom: "1px solid #eee" }}>
        <strong>RHF Integration Test</strong>
      </div>

      <Input
        label="Email (Required)"
        placeholder="test@test.com"
        leftIcon={<Mail size={20} />}
        errorMessage={errors.email?.message}
        // The important part: forward the ref and the remaining props.
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: "Invalid email format",
          },
        })}
      />

      <Input
        label="Password (min 6 chars)"
        type="password"
        leftIcon={<Lock size={20} />}
        errorMessage={errors.pass?.message}
        {...register("pass", {
          required: "Password is required",
          minLength: {
            value: 6,
            message: "At least 6 characters",
          },
        })}
      />

      {/* Use a native button in this example if Button is not ready yet. */}
      <button
        type="submit"
        style={{
          padding: "10px",
          background: "black",
          color: "white",
          border: "none",
          borderRadius: 4,
          cursor: "pointer",
        }}
      >
        Submit
      </button>
    </form>
  );
};

export const ReactHookFormIntegration: Story = {
  render: () => <RHFExample />,
};

// === 3. Password toggle example ===
// Demonstrates an interactive trailing icon.

const PasswordToggleExample = () => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ width: 320 }}>
      <Input
        label="Enter password"
        type={show ? "text" : "password"}
        placeholder="••••••"
        leftIcon={<Lock size={20} />}
        rightIcon={
          <IconButton onClick={() => setShow(!show)} aria-label=" ">
            {show ? <EyeOff size={20} /> : <Eye size={20} />}
          </IconButton>
        }
      />
    </div>
  );
};

export const PasswordVisibilityToggle: Story = {
  render: () => <PasswordToggleExample />,
};
