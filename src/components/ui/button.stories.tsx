import type { Meta, StoryObj } from "@storybook/react";
import { Button, buttonIconClasses } from "./button";

const Icon = ({ name }: { name: string }) => (
  <svg className={buttonIconClasses} aria-hidden="true">
    <use href={`${import.meta.env.BASE_URL}ds-icons-sprite.svg#${name}`} />
  </svg>
);

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "secondary", "outline", "destructive", "ghost", "link"],
    },
    size: { control: "select", options: ["default", "sm", "lg", "icon"] },
    disabled: { control: "boolean" },
  },
  args: { children: "Button" },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: "secondary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Destructive: Story = { args: { variant: "destructive" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Link: Story = { args: { variant: "link" } };

export const DefaultSmall: Story = { args: { size: "sm" } };
export const OutlineSmall: Story = { args: { variant: "outline", size: "sm" } };
export const DestructiveSmall: Story = { args: { variant: "destructive", size: "sm" } };
export const DefaultLarge: Story = { args: { size: "lg" } };
export const IconOnly: Story = {
  args: { size: "icon", variant: "ghost", children: <Icon name="api-key" /> },
};

export const Disabled: Story = { args: { disabled: true } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="default" size="sm">Default</Button>
        <Button variant="secondary" size="sm">Secondary</Button>
        <Button variant="outline" size="sm">Outline</Button>
        <Button variant="destructive" size="sm">Destructive</Button>
        <Button variant="ghost" size="sm">Ghost</Button>
        <Button variant="link" size="sm">Link</Button>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon" variant="ghost">
        <Icon name="api-key" />
      </Button>
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="default">
        <Icon name="api-key" />
        Create API key
      </Button>
      <Button variant="outline">
        <Icon name="google" />
        Continue with Google
      </Button>
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
