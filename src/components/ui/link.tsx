import * as React from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

const linkDefaultClasses = [
  "bg-transparent border-0 text-[var(--link-color)]",
  "underline [text-decoration-thickness:1px] [text-underline-offset:0.2em] [text-decoration-skip-ink:none]",
  "decoration-[var(--link-decoration)]",
  "hover:text-[var(--link-hover-color)] hover:decoration-[var(--link-decoration-hover)]",
  "[transition:color_var(--m__unhover-transition-duration)_var(--m__transition-easing),text-decoration-color_var(--m__unhover-transition-duration)_var(--m__transition-easing)]",
  "hover:[transition-duration:var(--m__hover-transition-duration)]",
].join(" ");

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  asButton?: boolean;
}

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  ({ className, asButton = false, ...props }, ref) => (
    <a
      ref={ref}
      className={cn(
        asButton
          ? buttonVariants({ variant: "default", size: "m" })
          : linkDefaultClasses,
        className
      )}
      {...props}
    />
  )
);
Link.displayName = "Link";

export { Link };
