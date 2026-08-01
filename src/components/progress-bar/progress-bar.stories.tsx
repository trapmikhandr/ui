import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "../button";
import { ProgressBar } from "./progress-bar";

const meta: Meta<typeof ProgressBar> = {
  title: "Components/Feedback/ProgressBar",
  component: ProgressBar,
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

export const Default: Story = {
  args: {
    isVisible: true,
  },
};

export const Interactive: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
      <div>
        <ProgressBar isVisible={isVisible} />
        <div style={{ marginTop: 32 }}>
          <Button onPress={() => setIsVisible((v) => !v)}>
            {isVisible ? "Hide" : "Show"} ProgressBar
          </Button>
        </div>
      </div>
    );
  },
};

export const SimulateLoading: Story = {
  render: () => {
    const [isLoading, setIsLoading] = useState(false);

    const handleClick = () => {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 3000);
    };

    return (
      <div>
        <ProgressBar isVisible={isLoading} />
        <div style={{ marginTop: 32 }}>
          <Button onPress={handleClick} isDisabled={isLoading}>
            {isLoading ? "Loading..." : "Simulate loading (3 sec)"}
          </Button>
        </div>
      </div>
    );
  },
};
