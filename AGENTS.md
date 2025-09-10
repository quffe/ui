# Repository Guidelines

## Project Structure & Module Organization
- `app/` – Next.js App Router, docs, and API (includes `/api/registry/*`).
- `components/` – UI components grouped by category: `Data/`, `Form/`, `Navigation/`, `Modal/` (PascalCase files: `DataTable.tsx`). Internal primitives live under `components/internal/` or `components/ui/`.
- `hooks/` – Custom React hooks (`useX.ts` / `useX.tsx`).
- `examples/` – Minimal usage examples and demo content.
- `lib/` – Utilities and shared helpers.
- `public/` – Static assets.
- `public/registry/` – Auto‑generated JSON registry files (served statically).
- `scripts/` – Maintenance scripts (e.g., `generate-registry.js`).
- Import alias: use `@/*` per `tsconfig.json`.

## Build, Test, and Development Commands
- `pnpm dev` – Start local dev server (Turbopack).
- `pnpm build` – Production build.
- `pnpm start` – Start built app.
- `pnpm lint` – ESLint (Next + TS rules).
- `pnpm format` / `pnpm format:check` – Prettier write/check.
- `pnpm registry:update` – Regenerate `registry/*.json` from `components/` and `hooks/`.
- `npx tsc --noEmit` – Type check only.

## Coding Style & Naming Conventions
- TypeScript + React 19 + Next.js 15 (App Router).
- Components in PascalCase (`ModalTrigger.tsx`); hooks start with `use` in camelCase (`useKeyboardShortcut.ts`).
- Prefer colocated styles and variants via CVA; keep props typed and minimal.
- Prettier (`.prettierrc`): no semicolons, 2‑space tabs, double quotes, width 100, trailing commas `es5`, `arrowParens: "avoid"`.
- ESLint: `next/core-web-vitals`, `next/typescript`. Fix lint before commit.

## Testing Guidelines
- No formal test framework configured yet. Validate changes via example pages and the docs in `app/`.
- If adding tests, prefer React Testing Library; colocate as `*.test.tsx` or use `__tests__/`. Keep tests deterministic and small.

## Commit & Pull Request Guidelines
- Commits: short, imperative, scoped when helpful (e.g., `add namespace badge`, `refactor: registry generation`).
- Run `pnpm lint && pnpm format:check && npx tsc --noEmit` before pushing.
- PRs: include a clear description, linked issues, and screenshots/GIFs for UI changes. Keep PRs focused and small.
- Update docs (`COMPONENTS.md`, `HOOKS.md`, `REGISTRY.md`) and run `pnpm registry:update` when components/hooks change.

## Security & Configuration Tips
- Copy `.env.example` → `.env.local`; never commit secrets. Prefer server routes for sensitive work.
- Follow Radix UI/ARIA patterns; ensure keyboard accessibility.

## Agent‑Specific Notes
- Respect these guidelines; avoid broad refactors or renames without need.
- Maintain existing file structure and naming; prefer minimal diffs.
- When touching components/hooks, also update examples and regenerate the registry.
