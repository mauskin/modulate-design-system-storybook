import * as React from "react";
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
          "bg-[color-mix(in_srgb,currentColor_10%,transparent)] text-foreground border-0 no-underline",
          "hover:bg-[color-mix(in_srgb,currentColor_15%,transparent)] hover:text-[var(--primary-hover)]",
          "active:bg-[color-mix(in_srgb,currentColor_25%,transparent)]",
        ].join(" "),
        outline: [
          "bg-transparent text-foreground no-underline",
          "border border-[color-mix(in_srgb,currentColor_25%,transparent)]",
          "hover:text-[var(--outline-hover)]",
          "active:text-[var(--outline-active)]",
        ].join(" "),
        danger: [
          "bg-transparent text-destructive no-underline",
          "border border-[color-mix(in_srgb,currentColor_25%,transparent)]",
          "hover:border-[color-mix(in_srgb,currentColor_50%,transparent)]",
          "active:bg-[var(--destructive-active)]",
        ].join(" "),
        success: [
          "bg-transparent text-[var(--success)] no-underline",
          "border border-[color-mix(in_srgb,currentColor_30%,transparent)]",
          "hover:border-[color-mix(in_srgb,currentColor_50%,transparent)]",
          "active:bg-[var(--success-active)]",
        ].join(" "),
      },
      size: {
        xs: "[padding:var(--button-xs-padding)] rounded-button-sm [&_svg]:hidden",
        s:  "[padding:var(--button-s-padding)] rounded-button-sm [&_svg]:hidden",
        m:  "[padding:var(--button-m-padding)] rounded-button",
      },
    },
    defaultVariants: { variant: "default", size: "m" },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
);
Button.displayName = "Button";

/*
 * Applied directly to an <svg> inside a Button — mirrors DS `.m__button__icon`.
 * DS places the icon before the text and sizes it to 1lh.
 */
const buttonIconClasses =
  "relative block w-[1lh] h-[1lh] shrink-0 overflow-hidden self-end";

export { Button, buttonIconClasses, buttonVariants };
