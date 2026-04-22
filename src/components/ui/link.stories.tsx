import type { Meta, StoryObj } from "@storybook/react";
import { Link } from "./link";

const meta: Meta<typeof Link> = {
  title: "UI/Link",
  component: Link,
  tags: ["autodocs"],
  argTypes: {
    asButton: { control: "boolean" },
  },
  args: { children: "View documentation", href: "#" },
};
export default meta;

type Story = StoryObj<typeof Link>;

export const Default: Story = {};
export const AsButton: Story = { args: { asButton: true, children: "Get started" } };
export const Disabled: Story = {
  args: {
    "aria-disabled": true,
    tabIndex: -1,
    className: "pointer-events-none opacity-50",
  },
};
