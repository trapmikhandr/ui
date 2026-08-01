import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { Key } from "react-aria";
import { Select } from "./select";

const meta: Meta<typeof Select> = {
  title: "Components/Forms/Select",
  component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: () => (
    <Select label="Fruit">
      <Select.Item key="apple">Apple</Select.Item>
      <Select.Item key="banana">Banana</Select.Item>
      <Select.Item key="orange">Orange</Select.Item>
      <Select.Item key="grape">Grape</Select.Item>
    </Select>
  ),
};

export const WithDefaultValue: Story = {
  render: () => (
    <Select label="Fruit" defaultValue="banana">
      <Select.Item key="apple">Apple</Select.Item>
      <Select.Item key="banana">Banana</Select.Item>
      <Select.Item key="orange">Orange</Select.Item>
    </Select>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [selected, setSelected] = useState<Key>("apple");

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Select
          label="Fruit"
          value={selected}
          onChange={(key) => {
            if (key !== null) {
              setSelected(key);
            }
          }}
        >
          <Select.Item key="apple">Apple</Select.Item>
          <Select.Item key="banana">Banana</Select.Item>
          <Select.Item key="orange">Orange</Select.Item>
        </Select>
        <p>Selected: {selected}</p>
      </div>
    );
  },
};

export const WithDisabledItems: Story = {
  render: () => (
    <Select label="Fruit" disabledKeys={["banana"]}>
      <Select.Item key="apple">Apple</Select.Item>
      <Select.Item key="banana">Banana (disabled)</Select.Item>
      <Select.Item key="orange">Orange</Select.Item>
    </Select>
  ),
};

export const WithPlaceholder: Story = {
  render: () => (
    <Select label="Country" placeholder="Choose a country...">
      <Select.Item key="ru">Russia</Select.Item>
      <Select.Item key="us">United States</Select.Item>
      <Select.Item key="de">Germany</Select.Item>
      <Select.Item key="fr">France</Select.Item>
    </Select>
  ),
};

export const Dynamic: Story = {
  render: () => {
    const users = [
      { id: "1", name: "Ivan Petrov", email: "ivan@mail.com" },
      { id: "2", name: "Maria Sidorova", email: "maria@mail.com" },
      { id: "3", name: "Petr Ivanov", email: "petr@mail.com" },
    ];

    return (
      <Select label="User" items={users}>
        {(user) => (
          <Select.Item key={user.id} textValue={user.name}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontWeight: 600 }}>{user.name}</span>
              <span style={{ fontSize: 12, color: "#666" }}>{user.email}</span>
            </div>
          </Select.Item>
        )}
      </Select>
    );
  },
};

export const Required: Story = {
  render: () => (
    <Select label="Required field" isRequired>
      <Select.Item key="option1">Option 1</Select.Item>
      <Select.Item key="option2">Option 2</Select.Item>
      <Select.Item key="option3">Option 3</Select.Item>
    </Select>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Select label="Disabled Select" isDisabled defaultValue="apple">
      <Select.Item key="apple">Apple</Select.Item>
      <Select.Item key="banana">Banana</Select.Item>
    </Select>
  ),
};

export const InForm: Story = {
  render: () => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        alert(`Selected: ${formData.get("fruit")}`);
      }}
      style={{ display: "flex", flexDirection: "column", gap: 16 }}
    >
      <Select label="Fruit" name="fruit">
        <Select.Item key="apple">Apple</Select.Item>
        <Select.Item key="banana">Banana</Select.Item>
        <Select.Item key="orange">Orange</Select.Item>
      </Select>
      <button type="submit">Submit</button>
    </form>
  ),
};

export const AsyncData: Story = {
  render: () => {
    const [users, setUsers] = useState<
      Array<{ id: string; name: string; email: string }>
    >([]);
    const [isLoading, setIsLoading] = useState(false);

    // Simulate an async request.
    const loadUsers = () => {
      setIsLoading(true);
      setTimeout(() => {
        setUsers([
          { id: "1", name: "Ivan Petrov", email: "ivan@mail.com" },
          { id: "2", name: "Maria Sidorova", email: "maria@mail.com" },
          { id: "3", name: "Petr Ivanov", email: "petr@mail.com" },
          { id: "4", name: "Anna Smirnova", email: "anna@mail.com" },
        ]);
        setIsLoading(false);
      }, 1000);
    };

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <button type="button" onClick={loadUsers}>
          {isLoading ? "Loading..." : "Load users"}
        </button>

        <Select
          label="User"
          items={users}
          isDisabled={isLoading || users.length === 0}
        >
          {(user) => (
            <Select.Item key={user.id} textValue={user.name}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <span style={{ fontWeight: 600 }}>{user.name}</span>
                <span style={{ fontSize: 12, color: "#666" }}>
                  {user.email}
                </span>
              </div>
            </Select.Item>
          )}
        </Select>
      </div>
    );
  },
};

export const Invalid: Story = {
  render: () => (
    <Select label="Country" errorMessage="Please select a country">
      <Select.Item key="ru">Russia</Select.Item>
      <Select.Item key="us">United States</Select.Item>
      <Select.Item key="de">Germany</Select.Item>
    </Select>
  ),
};

export const InvalidWithValue: Story = {
  render: () => (
    <Select label="Age" defaultValue="10" errorMessage="You must be over 18">
      <Select.Item key="10">10 years</Select.Item>
      <Select.Item key="15">15 years</Select.Item>
      <Select.Item key="18">18 years</Select.Item>
      <Select.Item key="25">25 years</Select.Item>
    </Select>
  ),
};

export const ValidationOnChange: Story = {
  render: () => {
    const [selected, setSelected] = useState<Key | null>(null);
    const isInvalid = selected === "harmful";

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Select
          label="Choose an option"
          value={selected}
          onChange={(key) => setSelected(key)}
          errorMessage={
            isInvalid ? "This option is unavailable in your region" : undefined
          }
        >
          <Select.Item key="safe">Safe option</Select.Item>
          <Select.Item key="normal">Regular option</Select.Item>
          <Select.Item key="harmful">Unavailable option</Select.Item>
        </Select>
        <p>Status: {isInvalid ? "❌ Validation error" : "✅ Valid"}</p>
      </div>
    );
  },
};

export const RequiredValidation: Story = {
  render: () => {
    const [selected, setSelected] = useState<Key | null>(null);
    const [touched, setTouched] = useState(false);
    const isInvalid = touched && !selected;

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Select
          label="Required field"
          isRequired
          value={selected}
          onChange={(key) => {
            setSelected(key);
            setTouched(true);
          }}
          errorMessage={isInvalid ? "This field is required" : undefined}
        >
          <Select.Item key="option1">Option 1</Select.Item>
          <Select.Item key="option2">Option 2</Select.Item>
          <Select.Item key="option3">Option 3</Select.Item>
        </Select>
        <button type="button" onClick={() => setTouched(true)}>
          Check validation
        </button>
      </div>
    );
  },
};
