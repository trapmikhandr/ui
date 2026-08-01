import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { type ComponentProps, forwardRef, useState } from "react";
import { Menu } from "./menu";

const ForwardingButton = forwardRef<
  HTMLButtonElement,
  ComponentProps<"button">
>((props, ref) => <button {...props} ref={ref} type="button" />);

function renderMenuWithSubTrigger() {
  const onAction = jest.fn();

  function TestMenu() {
    const [submenuOpen, setSubmenuOpen] = useState(false);

    return (
      <Menu isOpen onOpenChange={() => {}}>
        <Menu.Trigger>
          <button type="button">trigger</button>
        </Menu.Trigger>
        <Menu.Content onAction={onAction} nonClosingKeys={["locale"]}>
          <Menu.Item key="theme">Dark theme</Menu.Item>
          <Menu.SubTrigger
            key="locale"
            label="Language"
            isOpen={submenuOpen}
            onOpenChange={setSubmenuOpen}
            onAction={onAction}
          >
            <Menu.Item key="locale:ru">Russian</Menu.Item>
            <Menu.Item key="locale:en">English</Menu.Item>
          </Menu.SubTrigger>
          <Menu.Item key="logout">Log out</Menu.Item>
        </Menu.Content>
      </Menu>
    );
  }

  render(<TestMenu />);
  return { onAction };
}

test("renders inside an open menu without crashing (react-stately CollectionBuilder regression)", () => {
  renderMenuWithSubTrigger();
  expect(screen.getByText("Language")).toBeTruthy();
  expect(screen.getByText("Dark theme")).toBeTruthy();
  expect(screen.getByText("Log out")).toBeTruthy();
});

test("does not forward React Aria press props to a native trigger", () => {
  const consoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  render(
    <Menu isOpen onOpenChange={() => {}}>
      <Menu.Trigger>
        <button type="button">trigger</button>
      </Menu.Trigger>
      <Menu.Content>
        <Menu.Item key="item">Item</Menu.Item>
      </Menu.Content>
    </Menu>,
  );

  expect(consoleError).not.toHaveBeenCalledWith(
    expect.stringMatching(/onPress|preventFocusOnPress/),
  );
  consoleError.mockRestore();
});

test("custom menu triggers preserve ARIA props and open the menu", () => {
  function TestMenu() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Menu isOpen={isOpen} onOpenChange={setIsOpen}>
        <Menu.Trigger>
          <ForwardingButton>Open menu</ForwardingButton>
        </Menu.Trigger>
        <Menu.Content>
          <Menu.Item key="item">Menu item</Menu.Item>
        </Menu.Content>
      </Menu>
    );
  }

  render(<TestMenu />);
  const trigger = screen.getByRole("button", { name: "Open menu" });

  expect(trigger.getAttribute("aria-haspopup")).toBe("true");
  expect(trigger.getAttribute("aria-expanded")).toBe("false");

  fireEvent.click(trigger);

  expect(screen.getByText("Menu item")).toBeTruthy();
  expect(trigger.getAttribute("aria-expanded")).toBe("true");
});

test("submenu items are not rendered until the trigger row is opened", () => {
  renderMenuWithSubTrigger();
  expect(screen.queryByText("Russian")).toBeNull();
});

test("clicking the trigger row opens the submenu and reveals its items", () => {
  renderMenuWithSubTrigger();
  fireEvent.click(screen.getByText("Language"));
  expect(screen.getByText("Russian")).toBeTruthy();
  expect(screen.getByText("English")).toBeTruthy();
});

test("selecting a submenu item fires onAction with its own key, not the trigger's", () => {
  const { onAction } = renderMenuWithSubTrigger();
  fireEvent.click(screen.getByText("Language"));
  fireEvent.click(screen.getByText("English"));
  expect(onAction).toHaveBeenCalledWith("locale:en");
});

test("clicking the trigger row again closes the submenu (toggle)", async () => {
  renderMenuWithSubTrigger();

  fireEvent.click(screen.getByText("Language"));
  expect(screen.getByText("Russian")).toBeTruthy();

  fireEvent.click(screen.getByText("Language"));
  // Closing uses AnimatePresence-exit (content-popover.tsx):
  // the item remains in the DOM until the fade animation ends.
  await waitFor(() => {
    expect(screen.queryByText("Russian")).toBeNull();
  });
});

test("hovering the trigger row alone does not open the submenu (click-only, no hover-intent)", () => {
  renderMenuWithSubTrigger();

  fireEvent.mouseEnter(screen.getByText("Language"));
  expect(screen.queryByText("Russian")).toBeNull();
});

test("the full pointerdown/pointerup/click sequence opens the submenu without also triggering the parent item", () => {
  const { onAction } = renderMenuWithSubTrigger();
  const row = screen.getByText("Language");

  fireEvent.pointerDown(row, { button: 0 });
  fireEvent.pointerUp(row, { button: 0 });
  fireEvent.click(row);

  expect(screen.getByText("Russian")).toBeTruthy();
  expect(onAction).not.toHaveBeenCalled();
});
