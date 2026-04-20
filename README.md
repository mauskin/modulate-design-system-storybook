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

Pinned by commit SHA:

```
"@eugene-arutyunov/modulate-design-system": "github:Eugene-Arutyunov/modulate-design-system#<sha>"
```

To bump: set a new SHA in `package.json`, `npm install`.

## Theming flow

1. DS ships raw CSS tokens (`--m__*`) under `.light-mode` / `.dark-mode`.
2. `src/styles/globals.css` maps those to the CSS variables shadcn expects (`--background`, `--primary`, …).
3. Tailwind v4 `@theme inline` binds Tailwind color utilities to those variables.

## TODO

- Upstream the shadcn adapter to the DS as `@eugene-arutyunov/modulate-design-system/shadcn` — single-import wiring for future consumers. Remove the local mapping in `globals.css` once it lands.
- Expand the component set beyond `button` / `input` / `table`.
- Confirm `--ring`, `--accent`, and `--primary` token choices with the design team.
