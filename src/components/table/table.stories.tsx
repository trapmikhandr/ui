import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import type { Selection, SortDescriptor } from "react-stately";
import { Button } from "../button";
import { Table } from "./table";

const meta: Meta<typeof Table> = {
  title: "Components/Data Display/Table",
  component: Table,
};

export default meta;
type Story = StoryObj<typeof Table>;

const users = [
  { id: "1", name: "Ivan Petrov", email: "ivan@mail.com", role: "Admin" },
  { id: "2", name: "Maria Sidorova", email: "maria@mail.com", role: "User" },
  { id: "3", name: "Petr Ivanov", email: "petr@mail.com", role: "User" },
  { id: "4", name: "Anna Kozlova", email: "anna@mail.com", role: "Manager" },
];

export const Default: Story = {
  render: () => (
    <Table aria-label="Users">
      <Table.Header>
        <Table.Column key="name">Name</Table.Column>
        <Table.Column key="email">Email</Table.Column>
        <Table.Column key="role">Role</Table.Column>
      </Table.Header>
      <Table.Body items={users}>
        {(user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  ),
};

export const WithSorting: Story = {
  render: () => {
    const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
      column: "name",
      direction: "ascending",
    });

    const sortedUsers = [...users].sort((a, b) => {
      const key = sortDescriptor.column as keyof typeof a;
      const cmp = a[key].localeCompare(b[key]);
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });

    return (
      <Table
        aria-label="Users"
        sortDescriptor={sortDescriptor}
        onSortChange={setSortDescriptor}
      >
        <Table.Header>
          <Table.Column key="name" allowsSorting>
            Name
          </Table.Column>
          <Table.Column key="email" allowsSorting>
            Email
          </Table.Column>
          <Table.Column key="role" allowsSorting>
            Role
          </Table.Column>
        </Table.Header>
        <Table.Body items={sortedUsers}>
          {(user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  },
};

export const WithSelection: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

    return (
      <div>
        <Table
          aria-label="Users"
          selectionMode="multiple"
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
        >
          <Table.Header>
            <Table.Column key="name">Name</Table.Column>
            <Table.Column key="email">Email</Table.Column>
            <Table.Column key="role">Role</Table.Column>
          </Table.Header>
          <Table.Body items={users}>
            {(user) => (
              <Table.Row key={user.id}>
                <Table.Cell>{user.name}</Table.Cell>
                <Table.Cell>{user.email}</Table.Cell>
                <Table.Cell>{user.role}</Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
        <p style={{ marginTop: 16 }}>
          Selected:{" "}
          {selectedKeys === "all"
            ? "all"
            : [...selectedKeys].join(", ") || "none"}
        </p>
      </div>
    );
  },
};

export const WithActions: Story = {
  render: () => (
    <Table aria-label="Users">
      <Table.Header>
        <Table.Column key="name">Name</Table.Column>
        <Table.Column key="email">Email</Table.Column>
        <Table.Column key="role">Role</Table.Column>
        <Table.Column key="actions">Actions</Table.Column>
      </Table.Header>
      <Table.Body items={users}>
        {(user) => (
          <Table.Row key={user.id}>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.role}</Table.Cell>
            <Table.Cell>
              <div style={{ display: "flex", gap: 8 }}>
                <Button
                  size="small"
                  onClick={() => alert(`Edit: ${user.name}`)}
                >
                  ✏️
                </Button>
                <Button
                  size="small"
                  variant="filled"
                  color="error"
                  onClick={() => alert(`Delete: ${user.name}`)}
                >
                  🗑️
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table>
  ),
};

export const SingleSelection: Story = {
  render: () => {
    const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set());

    return (
      <Table
        aria-label="Users"
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <Table.Header>
          <Table.Column key="name">Name</Table.Column>
          <Table.Column key="email">Email</Table.Column>
          <Table.Column key="role">Role</Table.Column>
        </Table.Header>
        <Table.Body items={users}>
          {(user) => (
            <Table.Row key={user.id}>
              <Table.Cell>{user.name}</Table.Cell>
              <Table.Cell>{user.email}</Table.Cell>
              <Table.Cell>{user.role}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  },
};
