import { fireEvent, render, screen } from "@testing-library/react";
import { type ComponentProps, forwardRef, useState } from "react";
import { Popover } from "./popover";

const ForwardingButton = forwardRef<
  HTMLButtonElement,
  ComponentProps<"button">
>((props, ref) => <button {...props} ref={ref} type="button" />);

test("custom popover triggers preserve ARIA props and open the content", () => {
  function TestPopover() {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <Popover isOpen={isOpen} onOpenChange={setIsOpen}>
        <Popover.Trigger>
          <ForwardingButton>Open popover</ForwardingButton>
        </Popover.Trigger>
        <Popover.Content>
          <p>Popover content</p>
        </Popover.Content>
      </Popover>
    );
  }

  const consoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  render(<TestPopover />);
  const trigger = screen.getByRole("button", { name: "Open popover" });

  expect(trigger.getAttribute("aria-expanded")).toBe("false");
  expect(consoleError).not.toHaveBeenCalledWith(
    expect.stringMatching(/onPress|preventFocusOnPress/),
  );

  fireEvent.click(trigger);

  expect(screen.getByText("Popover content")).toBeTruthy();
  expect(trigger.getAttribute("aria-expanded")).toBe("true");
  consoleError.mockRestore();
});
