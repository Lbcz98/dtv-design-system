# DTV Design System

A Figma-first React design system with design tokens, core components, Storybook documentation, and Code Connect mappings.

**Figma file:** [DTV Design System](https://www.figma.com/design/lAC5ghyDT1w6MWkiZMlh43)

## Packages

| Package | Description |
|---|---|
| `@dtv/tokens` | Design tokens (CSS variables + JS exports) |
| `@dtv/react` | React component library |
| `@dtv/storybook` | Storybook documentation app |

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm 9+

### Install

```bash
pnpm install
pnpm build:tokens
pnpm build
```

### Development

```bash
# Run Storybook
pnpm --filter @dtv/storybook dev

# Watch React package
pnpm --filter @dtv/react dev
```

### Sync tokens from Figma

1. Copy `.env.example` to `.env`
2. Add your [Figma personal access token](https://www.figma.com/developers/api#access-tokens)
3. Run:

```bash
pnpm sync:tokens
pnpm build:tokens
```

## Components

- **Text** — Typography with display, heading, body, label, and caption variants
- **Icon** — Lucide-based icons (sm/md/lg)
- **Button** — Primary, secondary, and ghost variants with icon slots
- **Input** — Text input with label, helper text, and error states

## Theming

Light and dark themes are supported via the `data-theme` attribute:

```html
<html data-theme="dark">
```

All semantic colors adapt automatically through CSS custom properties.

## Code Connect

Code Connect templates live in `packages/react/*.figma.ts`. To publish mappings to Figma:

```bash
npx figma connect publish
```

Requires Figma Organization/Enterprise plan and published components.

## Project Structure

```
packages/
  tokens/     # Design tokens + Figma sync
  react/      # React components + Code Connect
apps/
  storybook/  # Documentation
```

## Contributing

1. Design changes start in Figma
2. Sync tokens: `pnpm sync:tokens && pnpm build:tokens`
3. Implement or update React components to match Figma
4. Add/update Storybook stories
5. Run `pnpm test && pnpm lint && pnpm typecheck`
