import type { Meta, StoryObj } from "@storybook/react";
import { KeyRound, LayoutDashboard, LogIn } from "lucide-react";
import { Button, buttonIconClasses } from "./button";

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["primary", "secondary", "danger"] },
    size: { control: "select", options: ["default", "compact"] },
    disabled: { control: "boolean" },
  },
  args: { children: "Button" },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Danger: Story = { args: { variant: "danger" } };

export const PrimaryCompact: Story = { args: { size: "compact" } };
export const SecondaryCompact: Story = { args: { variant: "secondary", size: "compact" } };
export const DangerCompact: Story = { args: { variant: "danger", size: "compact" } };

export const Disabled: Story = { args: { disabled: true } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="danger">Danger</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" size="compact">Primary</Button>
        <Button variant="secondary" size="compact">Secondary</Button>
        <Button variant="danger" size="compact">Danger</Button>
      </div>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary">
          <KeyRound className={buttonIconClasses} aria-hidden="true" />
          Create API key
        </Button>
        <Button variant="secondary">
          <LogIn className={buttonIconClasses} aria-hidden="true" />
          Continue with Google
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="primary" size="compact">
          <KeyRound className={buttonIconClasses} aria-hidden="true" />
          Create API key
        </Button>
        <Button variant="secondary" size="compact">
          <LayoutDashboard className={buttonIconClasses} aria-hidden="true" />
          Overview
        </Button>
      </div>
    </div>
  ),
};

export const AsAnchor: Story = {
  render: () => (
    <Button asChild>
      <a href="#" onClick={(e) => e.preventDefault()}>
        Link styled as button
      </a>
    </Button>
  ),
};
