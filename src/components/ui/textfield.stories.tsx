import type { Meta, StoryObj } from "@storybook/react";
import { Textfield } from "./textfield";

const meta: Meta<typeof Textfield> = {
  title: "UI/Textfield",
  component: Textfield,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div style={{ maxWidth: "16rem" }}>
        <Story />
      </div>
    ),
  ],
};
export default meta;

type Story = StoryObj<typeof Textfield>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { label: "Email", type: "email", disabled: true },
};

export const WithValue: Story = {
  args: { label: "Email", type: "email", defaultValue: "hello@modulate.ai" },
};

export const Email: Story = {
  args: {
    label: "Email",
    type: "email",
    name: "email",
    required: true,
    message: "Enter a valid email address",
  },
};

export const Password: Story = {
  args: { label: "Password", type: "password", name: "password" },
};

export const WithLabel: Story = {
  args: { label: "Email", type: "email", name: "email" },
};

export const Invalid: Story = {
  args: {
    label: "Email",
    type: "email",
    name: "email",
    "aria-invalid": true,
    message: "Enter a valid email address",
  },
};
