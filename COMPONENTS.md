# Authoring DS components and stories

Conventions for replicating Modulate Design System components in this storybook. Reference implementations: [src/components/ui/button.tsx](src/components/ui/button.tsx), [src/components/ui/textfield.tsx](src/components/ui/textfield.tsx).

## Source of truth

- **Visual/behavior reference**: `modulate-design-system/src/index.html` and the CSS at `modulate-design-system/src/styles/components/<name>.css`. Read both before coding — the HTML shows the composite DOM shape and realistic usage; the CSS defines every state.
- **Tokens**: only use CSS variables from the published `@eugene-arutyunov/modulate-design-system` package (the `--m__*` namespace). Never hardcode color, radius, or spacing values.
- **DS JS behaviors** (e.g., `modulate-design-system/src/assets/components/<name>.js`): replicate inline in the React component as event handlers.

## Component file

Location: `src/components/ui/<name>.tsx`. One component per file. Replace shadcn-style primitives as DS coverage grows.

Shape:

```tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const rootClasses = "…";                    // plain string if no variants
const inputVariants = cva("…base…", {       // cva only when a variant exists
  variants: { size: { s: "…", m: "…" } },
  defaultVariants: { size: "m" },
});

export interface FooProps
  extends Omit<React.ComponentProps<"input">, "size">,
    VariantProps<typeof inputVariants> {
  label?: string;
}

const Foo = React.forwardRef<HTMLInputElement, FooProps>(
  ({ className, label, size, ...props }, ref) => { … }
);
Foo.displayName = "Foo";

export { Foo };
```

Rules:

- **forwardRef** always — consumers may need the underlying DOM node.
- **Extend native props** via `React.ComponentProps<"tag">`. `Omit` reserved HTML props that clash with variant names (`size`, `color`, etc.).
- **CVA** only when there are true variants. For 0-variant styling, use a plain string constant — don't create empty CVAs.
- **Auto-id** for inputs with labels: `const id = props.id ?? React.useId();` so `htmlFor` works when the caller doesn't pass an id.
- **Pass-through handlers**: if you attach internal handlers (`onBlur`, `onInput`), spread `...props` first, then your handlers, and call the caller's handler inside yours: `onBlur?.(e)`.

## Styling approach

The DS ships tokens only (no `.m__*` component CSS in `dist/`). Replicate component rules with Tailwind utilities + arbitrary values that reference DS tokens.

- **Arbitrary values** for token references: `[background-color:var(--m__ui-control-color)]`, `[border-radius:var(--m__radius-s)]`, `[padding:var(--m__control-inset-padding)]`.
- **Split long class lists** into a string array joined with `.join(" ")` (see button/textfield). Easier to diff, easier to comment.
- **State variants**:
  - `focus-visible:…`, `disabled:…`, `hover:…`, `active:…` — standard Tailwind.
  - `aria-[invalid=true]:…` for aria states.
  - `[&:user-invalid[data-touched]]:…` when the DS CSS has compound selectors Tailwind can't express natively.
  - `peer` + `peer-*` for sibling-driven styling (e.g., message visibility driven by the input's validity).
- **Transitions**: inline via arbitrary value using DS duration/easing tokens:
  `[transition:background-color_var(--m__unhover-transition-duration)_var(--m__transition-easing)]`.
  Hover speed-up: `hover:[transition-duration:var(--m__hover-transition-duration)]`.
- **color-mix** references go inline too: `color-mix(in_srgb,var(--m__ui-control-color)_40%,transparent)` (underscores replace spaces inside arbitrary values).
- **Never copy tokens into `globals.css`** unless the DS CSS file is meant to be vendored wholesale — prefer inline token references.

## Replicating DS behavior (JS)

DS uses global delegated listeners. In React, bind equivalents directly to the component's element:

```tsx
const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
  if (!e.currentTarget.validity.valid) e.currentTarget.dataset.touched = "";
  onBlur?.(e);
};
```

- Use `e.currentTarget`, not `e.target`.
- DOM mutations of attributes not declared in JSX (`data-touched`) are safe — React won't reset them across renders.
- Always call the consumer's handler (`onBlur?.(e)`) so uncontrolled composition keeps working.

## Story file

Location: `src/components/ui/<name>.stories.tsx`. Structure:

```tsx
import type { Meta, StoryObj } from "@storybook/react";
import { Foo } from "./foo";

const meta: Meta<typeof Foo> = {
  title: "UI/Foo",
  component: Foo,
  tags: ["autodocs"],
  decorators: [
    (Story) => <div style={{ maxWidth: "16rem" }}><Story /></div>,
  ],
};
export default meta;

type Story = StoryObj<typeof Foo>;

export const Default: Story = { … };
```

Rules:

- **Title** is `UI/<ComponentName>` — PascalCase, matches the component.
- **Stories mirror the DS demo table** in `modulate-design-system/src/index.html`. For each example shown there, create a corresponding story with realistic args (real email values, real labels). Avoid lorem ipsum and placeholders.
- **No placeholder text** in args — the DS relies on labels, not placeholders.
- **Width decorator** to `16rem` (or whatever the DS demo uses) for form controls, so stories render at realistic width.
- **Cover states**: default, disabled, and each error/variant state from the DS reference. Use the component's real API (e.g., `aria-invalid` + `message`) rather than rendering custom wrappers in `render`.

## Deleting shadcn placeholders

When a DS component lands, delete the corresponding shadcn file it supersedes (e.g., `input.tsx` → replaced by `textfield.tsx`). Grep for lingering imports first:

```sh
grep -r "from .*\\/input" src
```

## Verification

Before finishing:

1. `npm run typecheck` — passes (ignore pre-existing errors in unrelated files).
2. `npm run storybook` — all stories render; no console warnings.
3. Manually exercise each interactive state: focus, blur, disabled, error reveal animation.
4. Compare side-by-side with the DS demo at `modulate-design-system` — colors, radii, padding, transitions should match.
