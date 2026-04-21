import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-baseline justify-center",
    "gap-[0.3rem]",
    "[font:inherit] cursor-pointer",
    "disabled:pointer-events-none disabled:opacity-50",
    "[transition:background-color_var(--m__unhover-transition-duration)_var(--m__transition-easing),color_var(--m__unhover-transition-duration)_var(--m__transition-easing),border-color_var(--m__unhover-transition-duration)_var(--m__transition-easing),text-decoration-color_var(--m__unhover-transition-duration)_var(--m__transition-easing)]",
    "hover:[transition-duration:var(--m__hover-transition-duration)]",
    "active:[transition-duration:var(--m__hover-transition-duration)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground border-0 no-underline",
          "hover:bg-[var(--primary-hover)] hover:text-primary-foreground",
          "active:bg-[var(--primary-active)]",
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground border-0 no-underline",
          "hover:bg-[var(--secondary-hover)]",
          "active:bg-[var(--secondary-active)]",
        ].join(" "),
        outline: [
          "bg-transparent text-foreground no-underline",
          "border border-[color-mix(in_srgb,currentColor_25%,transparent)]",
          "hover:text-[var(--outline-hover)]",
          "active:text-[var(--outline-active)]",
        ].join(" "),
        destructive: [
          "bg-transparent text-destructive no-underline",
          "border border-[color-mix(in_srgb,currentColor_25%,transparent)]",
          "hover:border-[color-mix(in_srgb,currentColor_50%,transparent)]",
          "active:bg-[var(--destructive-active)]",
        ].join(" "),
        ghost: [
          "bg-transparent text-foreground border-0 no-underline",
          "hover:bg-[var(--ghost-hover-bg)] hover:text-[var(--ghost-hover-fg)]",
          "active:bg-[var(--ghost-hover-bg)]",
        ].join(" "),
        link: [
          "bg-transparent border-0 text-[var(--link-color)]",
          "underline [text-decoration-thickness:1px] [text-underline-offset:0.2em] [text-decoration-skip-ink:none]",
          "decoration-[var(--link-decoration)]",
          "hover:text-[var(--link-hover-color)] hover:decoration-[var(--link-decoration-hover)]",
        ].join(" "),
      },
      size: {
        default: "[padding:var(--button-padding)] rounded-button",
        sm: "[padding:var(--button-compact-padding)] rounded-button-sm [&_svg]:hidden",
        lg: "[padding:var(--button-lg-padding)] rounded-button",
        icon: "[padding:var(--button-icon-padding)] aspect-square rounded-button",
      },
    },
    compoundVariants: [
      { variant: "link", className: "p-0 aspect-auto" },
    ],
    defaultVariants: { variant: "default", size: "default" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

/*
 * Applied directly to an <svg> inside a Button — mirrors DS `.m__button__icon`.
 * DS places the icon before the text and sizes it to 1lh.
 */
const buttonIconClasses =
  "relative block w-[1lh] h-[1lh] shrink-0 overflow-hidden self-end";

export { Button, buttonIconClasses, buttonVariants };
