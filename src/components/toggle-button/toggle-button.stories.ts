import { Meta, StoryObj } from "@storybook/react";
import { ToggleButton } from "./toggle-button.tsx";

const meta: Meta<typeof ToggleButton> = {
    component: ToggleButton,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    title: "components/ToggleButton",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: "Toggle Button",
        isDisabled: false,
        size: "default",
    },
};
