import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: { placeholder: "Type something…" },
};
export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {};
export const Disabled: Story = { args: { disabled: true } };
export const WithValue: Story = { args: { defaultValue: "Hello" } };
export const Email: Story = { args: { type: "email", placeholder: "you@example.com" } };
export const Password: Story = { args: { type: "password" } };

export const WithLabel: Story = {
  render: (args) => (
    <label className="flex w-72 flex-col gap-2 text-sm">
      <span className="text-foreground">Email</span>
      <Input {...args} type="email" placeholder="you@example.com" />
      <span className="text-xs text-muted-foreground">We'll never share your email.</span>
    </label>
  ),
};
