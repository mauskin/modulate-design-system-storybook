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

## TODO

- **Expand the component set** beyond `button` / `input` / `table`.
- **Confirm token mapping** (`--ring`, `--accent`, `--primary`) with the design team.
- **Focus-visible ring on Button.** DS `button.css` defines no focus state. Propose a DS PR adding `--m__focus-ring-color` (and optionally `--m__focus-ring-width`), then enable `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2` in `button.tsx`. Accessibility gap until this lands.
- **Disabled state on Button.** DS CSS has no `:disabled` rule. Currently uses shadcn's `opacity-50 pointer-events-none` default. Confirm with design; if DS defines an explicit style, switch.
- **Extend `shadcn.css` with hover/active/padding/radius vars.** `button.tsx` references raw DS tokens (`--m__bg-hover-color`, `--m__button-padding`, `--m__radius-m`, etc.) via Tailwind arbitrary values. Follow-up DS PR: re-export under shadcn-idiomatic names (`--primary-hover`, `--primary-active`, `--secondary-hover`, `--secondary-active`, `--destructive-active`, `--button-padding`, `--button-compact-padding`, `--button-radius`, `--button-compact-radius`). Simplifies `button.tsx` classNames and keeps future components out of the `--m__*` namespace for style values.
- **DS base stylesheet not published.** `src/styles/service/base.css` sets `:root { font-size: 125%; }` and the body font/reset; not in `dist/`, so `globals.css` replicates it. Follow-up DS PR: publish a `base.css` export (and add `./base` to `package.json` exports). Delete the local block once shipped.
- **Inter font vendored locally.** Copied from DS `src/assets/fonts/` into `public/fonts/` and loaded via `@font-face` in `globals.css`. DS should publish fonts in `dist/` + an `@font-face` export; once it does, delete the vendored copies and the `@font-face` block.
- **DS button uses spacer token for gap.** DS convention: `--m__space-*` is only for vertical fillers between blocks, not padding/margin/gap. `src/styles/components/button.css` currently sets `gap: var(--m__space-xxs)`, violating that rule. Propose a DS PR adding `--m__button-gap` (`0.3rem`) and have both the DS button and this project's `button.tsx` consume it. Until then, `button.tsx` hardcodes `0.3rem`.
- **Icon styling class.** Button icons use the exported `buttonIconClasses` string applied directly to any `<svg>` (matching DS `.m__button__icon`). Consider exposing these rules as a proper CSS class (e.g. `.m__button__icon` or `.button-icon`) in DS `shadcn.css` so consumers don't need to import a JS constant.
