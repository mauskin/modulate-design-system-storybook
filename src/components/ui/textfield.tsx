import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const rootClasses = "flex flex-col [margin-bottom:var(--m__default-margin-bottom)]";

const labelClasses =
  "font-medium [color:var(--m__text-color)] [font-size:var(--m__font-size-s)] [margin-block-end:0.3rem]";

const inputVariants = cva(
  [
    "peer w-full",
    "[background-color:var(--m__ui-control-color)]",
    "[border:1px_solid_var(--m__ui-border-color)]",
    "[border-radius:var(--m__radius-s)]",
    "[color:var(--m__text-color)]",
    "[padding:var(--m__control-inset-padding)]",
    "[line-height:var(--m__line-height-base)]",
    "placeholder:[color:var(--m__text-caption-color)]",
    "focus-visible:outline focus-visible:[outline:1px_solid_var(--m__text-hover-color)] focus-visible:[outline-offset:-1px]",
    "focus-visible:[background-color:color-mix(in_srgb,var(--m__bg-hover-color)_8%,transparent)]",
    "focus-visible:[color:var(--m__text-hover-color)]",
    "[&:user-invalid[data-touched]]:[border-color:var(--m__ui-error-color)] [&:user-invalid[data-touched]]:[color:var(--m__ui-error-color)]",
    "aria-[invalid=true]:[border-color:var(--m__ui-error-color)] aria-[invalid=true]:[color:var(--m__ui-error-color)]",
    "[&:user-invalid[data-touched]:focus-visible]:[outline-color:var(--m__ui-error-color)]",
    "aria-[invalid=true]:focus-visible:[outline-color:var(--m__ui-error-color)]",
    "disabled:cursor-not-allowed",
    "disabled:[border-color:color-mix(in_srgb,var(--m__ui-border-color)_40%,transparent)]",
    "disabled:[background-color:color-mix(in_srgb,var(--m__ui-control-color)_40%,transparent)]",
    "disabled:[color:var(--m__text-caption-color)]",
  ].join(" "),
  {
    variants: {
      noSpin: {
        true: "[appearance:textfield] [-moz-appearance:textfield]",
        false: "",
      },
    },
    defaultVariants: { noSpin: false },
  }
);

const messageClasses = [
  "grid [grid-template-rows:0fr] opacity-0",
  "[transition:grid-template-rows_var(--m__reveal-duration)_var(--m__transition-easing),opacity_calc(var(--m__reveal-duration)/2)_var(--m__transition-easing)]",
  "peer-aria-[invalid=true]:[grid-template-rows:1fr] peer-aria-[invalid=true]:opacity-100",
  "peer-aria-[invalid=true]:[transition:grid-template-rows_var(--m__reveal-duration)_var(--m__transition-easing),opacity_var(--m__reveal-duration)_var(--m__transition-easing)_calc(var(--m__reveal-duration)/3)]",
  "peer-[:user-invalid[data-touched]]:[grid-template-rows:1fr] peer-[:user-invalid[data-touched]]:opacity-100",
].join(" ");

const messageInnerClasses =
  "overflow-hidden [color:var(--m__ui-error-color)] [font-size:var(--m__font-size-s)] [padding-top:0.3rem]";

export interface TextfieldProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
  message?: string;
  className?: string;
}

const Textfield = React.forwardRef<HTMLInputElement, TextfieldProps>(
  ({ className, label, message, noSpin, id, onBlur, onInput, ...props }, ref) => {
    const autoId = React.useId();
    const inputId = id ?? autoId;

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      if (!e.currentTarget.validity.valid) {
        e.currentTarget.dataset.touched = "";
      }
      onBlur?.(e);
    };

    const handleInput: React.FormEventHandler<HTMLInputElement> = (e) => {
      if (e.currentTarget.validity.valid) {
        delete e.currentTarget.dataset.touched;
      }
      onInput?.(e as Parameters<NonNullable<typeof onInput>>[0]);
    };

    return (
      <div className={cn(rootClasses, className)}>
        {label && (
          <label htmlFor={inputId} className={labelClasses}>
            {label}
          </label>
        )}
        <input
          id={inputId}
          ref={ref}
          className={inputVariants({ noSpin })}
          {...props}
          onBlur={handleBlur}
          onInput={handleInput}
        />
        {message !== undefined && (
          <span className={messageClasses}>
            <span className={messageInnerClasses}>{message}</span>
          </span>
        )}
      </div>
    );
  }
);
Textfield.displayName = "Textfield";

export { Textfield };
