# Repository Guidelines

## Project Structure & Module Organization
Core app lives in `app/` using the Next.js App Router; docs and API handlers (including `/api/registry/*`) sit here too. UI primitives are grouped under `components/` by type (`Data/`, `Form/`, `Navigation/`, `Modal/`), with low-level elements in `components/internal/` or `components/ui/`. Custom hooks reside in `hooks/` as PascalCase exports named `useX`. Utilities and shared helpers stay in `lib/`, demo content in `examples/`, static files in `public/`, and generated registry JSON in `public/registry/`. Scripts such as `generate-registry.js` live in `scripts/`. Use the `@/*` import alias for cross-directory imports.

## Build, Test, and Development Commands
- `pnpm dev` launches the Turbopack dev server.
- `pnpm build` creates the production bundle.
- `pnpm start` runs the built app locally.
- `pnpm lint` executes ESLint with Next + TS rules.
- `pnpm format` and `pnpm format:check` apply or verify Prettier formatting.
- `npx tsc --noEmit` performs a strict type check.
- `pnpm registry:update` regenerates `public/registry/*.json` from current components and hooks.

## Coding Style & Naming Conventions
Write TypeScript + React 19 components in PascalCase (e.g., `ModalTrigger.tsx`) and hooks prefixed with `use`. Follow Prettier defaults: 2-space indent, double quotes, no semicolons, width 100, trailing commas `es5`, `arrowParens: "avoid"`. Keep props minimal, prefer CVA for variants, and respect existing file placement.

## Testing Guidelines
No formal test runner is bundled; validate manually via docs pages and examples. When adding tests, favor React Testing Library colocated as `Component.test.tsx` or inside `__tests__/`. Keep tests deterministic and small, and ensure they cover accessibility behaviors.

## Commit & Pull Request Guidelines
Craft short, imperative commits (e.g., `add namespace badge`, `refactor: registry generation`). Before pushing, run `pnpm lint && pnpm format:check && npx tsc --noEmit`. PRs need clear descriptions, linked issues, and media for UI changes. Update docs like `COMPONENTS.md`, `HOOKS.md`, and rerun `pnpm registry:update` whenever components or hooks change.

## Security & Configuration Tips
Duplicate `.env.example` to `.env.local` for local secrets and keep them untracked. Handle sensitive logic in server routes rather than client components, and follow Radix UI/ARIA patterns for keyboard accessibility throughout.

## Agent-Specific Notes
Treat everything under `components/ui/` as a vendor drop from shadcn/ui—do not edit those files directly. Prefer wrapping or composing these primitives elsewhere when adjustments are required so upstream syncs stay painless.
