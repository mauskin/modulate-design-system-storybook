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
      options: ["default", "secondary", "outline", "danger", "success"],
    },
    size: { control: "select", options: ["xs", "s", "m"] },
    disabled: { control: "boolean" },
  },
  args: { children: "Save changes" },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {};
export const Secondary: Story = { args: { variant: "secondary", children: "Preview" } };
export const Outline: Story = { args: { variant: "outline", children: "Cancel" } };
export const Danger: Story = { args: { variant: "danger", children: "Delete forever" } };
export const Success: Story = { args: { variant: "success", children: "Agree" } };

export const ExtraSmall: Story = { args: { size: "xs" }, name: "XS" };
export const Small: Story = { args: { size: "s" }, name: "S" };
export const Medium: Story = { args: { size: "m" }, name: "M" };

export const Disabled: Story = { args: { disabled: true } };

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="default" size="m">Save changes</Button>
        <Button variant="secondary" size="m">Preview</Button>
        <Button variant="outline" size="m">Cancel</Button>
        <Button variant="danger" size="m">Delete account</Button>
        <Button variant="success" size="m">Confirm</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="default" size="s">Save changes</Button>
        <Button variant="secondary" size="s">Preview</Button>
        <Button variant="outline" size="s">Cancel</Button>
        <Button variant="danger" size="s">Delete account</Button>
        <Button variant="success" size="s">Confirm</Button>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="default" size="xs">Save changes</Button>
        <Button variant="secondary" size="xs">Preview</Button>
        <Button variant="outline" size="xs">Cancel</Button>
        <Button variant="danger" size="xs">Delete account</Button>
        <Button variant="success" size="xs">Confirm</Button>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button size="xs">Save</Button>
      <Button size="s">Save as</Button>
      <Button size="m">Save changes</Button>
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
