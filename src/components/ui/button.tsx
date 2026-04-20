import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  [
    "inline-flex items-baseline justify-center",
    "gap-[0.3rem]",
    "font-[inherit] cursor-pointer no-underline",
    "disabled:pointer-events-none disabled:opacity-50",
    "[transition:background-color_var(--m__unhover-transition-duration)_var(--m__transition-easing),color_var(--m__unhover-transition-duration)_var(--m__transition-easing),border-color_var(--m__unhover-transition-duration)_var(--m__transition-easing)]",
    "hover:[transition-duration:var(--m__hover-transition-duration)]",
    "active:[transition-duration:var(--m__hover-transition-duration)]",
  ].join(" "),
  {
    variants: {
      variant: {
        primary: [
          "bg-[var(--m__bg-accent-color)] text-[var(--m__text-inverted-color)] border-0",
          "hover:bg-[var(--m__bg-hover-color)] hover:text-[var(--m__text-inverted-color)]",
          "active:bg-[var(--m__bg-active-color)]",
        ].join(" "),
        secondary: [
          "bg-transparent text-[var(--m__text-color)]",
          "border border-[color-mix(in_srgb,currentColor_25%,transparent)]",
          "hover:text-[var(--m__text-hover-color)]",
          "active:text-[var(--m__text-active-color)]",
        ].join(" "),
        danger: [
          "bg-transparent text-[var(--m__ui-error-color)]",
          "border border-[color-mix(in_srgb,currentColor_25%,transparent)]",
          "hover:border-[color-mix(in_srgb,currentColor_50%,transparent)]",
          "active:bg-[color-mix(in_srgb,var(--m__ui-error-color)_20%,transparent)]",
        ].join(" "),
      },
      size: {
        default: "[padding:var(--m__button-padding)] rounded-[var(--m__radius-m)]",
        compact: "[padding:var(--m__button-compact-padding)] rounded-[var(--m__radius-s)]",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
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
