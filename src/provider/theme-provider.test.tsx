import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { type ThemeMode, ThemeProvider, useTheme } from "./theme-provider";

function ThemeConsumer() {
  const { mode, setMode } = useTheme();
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button type="button" onClick={() => setMode("dark")}>
        dark
      </button>
      <button type="button" onClick={() => setMode("light")}>
        light
      </button>
    </div>
  );
}

/** Minimal app-level hook (root.tsx); ThemeProvider does not persist state itself. */
function ControlledHarness({ initial = "light" as ThemeMode }) {
  const [mode, setMode] = useState<ThemeMode>(initial);
  return (
    <ThemeProvider mode={mode} onModeChange={setMode}>
      <ThemeConsumer />
    </ThemeProvider>
  );
}

beforeEach(() => {
  document.body.removeAttribute("data-theme");
});

test("applies the mode prop to document.body's data-theme attribute", () => {
  render(<ControlledHarness initial="dark" />);
  expect(screen.getByTestId("mode").textContent).toBe("dark");
  expect(document.body.getAttribute("data-theme")).toBe("dark");
});

test("setMode calls onModeChange and re-renders with the new mode", () => {
  render(<ControlledHarness initial="light" />);

  fireEvent.click(screen.getByText("dark"));

  expect(screen.getByTestId("mode").textContent).toBe("dark");
  expect(document.body.getAttribute("data-theme")).toBe("dark");
});

test("does not read or write localStorage itself — persistence is the app's job", () => {
  const getItem = jest.spyOn(Storage.prototype, "getItem");
  const setItem = jest.spyOn(Storage.prototype, "setItem");

  render(<ControlledHarness initial="light" />);
  fireEvent.click(screen.getByText("dark"));

  expect(getItem).not.toHaveBeenCalled();
  expect(setItem).not.toHaveBeenCalled();

  getItem.mockRestore();
  setItem.mockRestore();
});

test("useTheme throws when used outside of ThemeProvider", () => {
  const consoleError = jest
    .spyOn(console, "error")
    .mockImplementation(() => {});

  expect(() => render(<ThemeConsumer />)).toThrow(
    "useTheme must be used within ThemeProvider",
  );

  consoleError.mockRestore();
});
