import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Pagination } from "./pagination";

const meta = {
  title: "Components/Data Display/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    totalCount: {
      control: { type: "number", min: 0, step: 1 },
      description: "Total number of items",
    },
    pageSize: {
      control: { type: "number", min: 1, step: 1 },
      description: "Number of items per page",
    },
    currentPage: {
      control: { type: "number", min: 1, step: 1 },
      description: "Current page",
    },
    onPageChange: {
      action: "page changed",
      description: "Callback invoked when the page changes",
    },
    className: {
      control: "text",
      description: "Additional CSS class",
    },
  },
  args: {
    totalCount: 100,
    pageSize: 10,
    currentPage: 1,
    onPageChange: () => {},
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

// === 1. Interactive stateful story ===
export const Default: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <div style={{ padding: "20px" }}>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <p style={{ marginTop: "20px", textAlign: "center", color: "#666" }}>
          Current page: {currentPage}
        </p>
      </div>
    );
  },
  args: {
    totalCount: 100,
    pageSize: 10,
    currentPage: 1,
  },
};

// === 2. Few pages (without ellipses) ===
export const FewPages: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    totalCount: 50,
    pageSize: 10,
    currentPage: 1,
  },
};

// === 3. Many pages (with ellipses) ===
export const ManyPages: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    totalCount: 1000,
    pageSize: 10,
    currentPage: 1,
  },
};

// === 4. Middle page ===
export const MiddlePage: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    totalCount: 1000,
    pageSize: 10,
    currentPage: 50,
  },
};

// === 5. Last page ===
export const LastPage: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <Pagination
        {...args}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    );
  },
  args: {
    totalCount: 1000,
    pageSize: 10,
    currentPage: 100,
  },
};

// === 6. Different page sizes ===
export const DifferentPageSizes: Story = {
  render: () => {
    const [page1, setPage1] = useState(1);
    const [page2, setPage2] = useState(1);
    const [page3, setPage3] = useState(1);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
        <div>
          <p style={{ marginBottom: "10px", color: "#666" }}>
            10 items per page
          </p>
          <Pagination
            totalCount={100}
            pageSize={10}
            currentPage={page1}
            onPageChange={setPage1}
          />
        </div>
        <div>
          <p style={{ marginBottom: "10px", color: "#666" }}>
            20 items per page
          </p>
          <Pagination
            totalCount={100}
            pageSize={20}
            currentPage={page2}
            onPageChange={setPage2}
          />
        </div>
        <div>
          <p style={{ marginBottom: "10px", color: "#666" }}>
            50 items per page
          </p>
          <Pagination
            totalCount={100}
            pageSize={50}
            currentPage={page3}
            onPageChange={setPage3}
          />
        </div>
      </div>
    );
  },
};

// === 7. Single page (not rendered) ===
export const SinglePage: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <div>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <p style={{ marginTop: "20px", textAlign: "center", color: "#666" }}>
          {!args.totalCount || args.totalCount <= args.pageSize
            ? "Pagination is hidden (only one page)"
            : ""}
        </p>
      </div>
    );
  },
  args: {
    totalCount: 10,
    pageSize: 10,
    currentPage: 1,
  },
};

// === 8. Empty list ===
export const EmptyList: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);

    return (
      <div>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
        <p style={{ marginTop: "20px", textAlign: "center", color: "#666" }}>
          Pagination is hidden (no items)
        </p>
      </div>
    );
  },
  args: {
    totalCount: 0,
    pageSize: 10,
    currentPage: 1,
  },
};

// === 9. Navigation demo ===
export const NavigationDemo: Story = {
  render: (args) => {
    const [currentPage, setCurrentPage] = useState(args.currentPage);
    const totalPages = Math.ceil(args.totalCount / args.pageSize);

    return (
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            marginBottom: "20px",
            padding: "20px",
            backgroundColor: "#f5f5f5",
            borderRadius: "8px",
          }}
        >
          <p style={{ margin: "0 0 10px 0", fontSize: "14px", color: "#666" }}>
            Showing items {(currentPage - 1) * args.pageSize + 1} -{" "}
            {Math.min(currentPage * args.pageSize, args.totalCount)} of{" "}
            {args.totalCount}
          </p>
          <p style={{ margin: 0, fontSize: "12px", color: "#999" }}>
            Page {currentPage} of {totalPages}
          </p>
        </div>
        <Pagination
          {...args}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />
      </div>
    );
  },
  args: {
    totalCount: 500,
    pageSize: 25,
    currentPage: 1,
  },
};
