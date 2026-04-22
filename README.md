# modulate-design-system-storybook

Storybook for shadcn-based React components styled with tokens from [modulate-design-system](https://github.com/Eugene-Arutyunov/modulate-design-system).

## Setup

```
npm install
npm run storybook
```

Open http://localhost:6006.

## Scripts

- `npm run storybook` — dev server on :6006
- `npm run build-storybook` — static build to `storybook-static/`
- `npm run typecheck` — `tsc --noEmit`

## Stack

- Storybook 8 + `@storybook/react-vite`
- React 19 + TypeScript (strict)
- Tailwind CSS v4 (`@tailwindcss/vite`)
- shadcn-style components (authored in this repo, not CLI-generated)
- `@storybook/addon-themes` — toolbar toggle flips `.light-mode` / `.dark-mode`

## DS dependency

Pinned by commit SHA for faster iterations during dev:

```
"@eugene-arutyunov/modulate-design-system": "github:Eugene-Arutyunov/modulate-design-system#<sha>"
```

To bump: set a new SHA in `package.json`, `npm install`.

## Theming flow

1. DS ships raw CSS tokens (`--m__*`) plus a shadcn adapter (`@eugene-arutyunov/modulate-design-system/shadcn`) that maps them to shadcn CSS variables and Tailwind v4 `@theme` bindings.
2. `src/styles/globals.css` imports both and replicates DS base rules that aren't in `dist/` yet (see TODO).
3. Light/dark: toggle `.light`/`.light-mode` or `.dark`/`.dark-mode` on any ancestor; Storybook's theme toolbar does this.

## Components

### Button

Variants: `default` (primary), `outline`, `danger`, `success`.
Sizes: `xs`, `s`, `m`. `L` / `XL` TBD.

```tsx
<Button variant="default" size="m">Save changes</Button>
```

Button renders a `<button>` only. For link-styled-as-button, use `<Link asButton>`.

### Link

Renders an `<a>`. Pass `asButton` to apply button styling.

```tsx
<Link href="/docs">View documentation</Link>
<Link href="/start" asButton>Get started</Link>
```

## TODO

- **L / XL button sizes.** Pending DS definition.
- **Confirm token mapping** (`--ring`, `--accent`, `--primary`) with the design team.
- **Disabled state on Button.** DS CSS has no `:disabled` rule. Currently uses shadcn's `opacity-50 pointer-events-none` default. Confirm with design; if DS defines an explicit style, switch.
- **Icon styling class.** Button icons use the exported `buttonIconClasses` string applied directly to any `<svg>` (matching DS `.m__button__icon`). Consider exposing these rules as a proper CSS class (e.g. `.m__button__icon` or `.button-icon`) in DS `shadcn.css` so consumers don't need to import a JS constant.
