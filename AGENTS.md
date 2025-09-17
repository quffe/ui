# Repository Guidelines

## Project Structure & Module Organization
- Application code lives under `app/` using the Next.js App Router; documentation pages, API routes, and mentions live here.
- UI primitives are grouped in `components/`, with vendor-sourced shadcn/ui elements under `components/ui/` (do not edit directly).
- Hooks sit in `hooks/` as PascalCase files (for example, `useKeyboardShortcut`). Shared helpers live in `lib/`, while static assets and registries are under `public/`.
- Generated mention and docs examples are in `examples/`; scripts and templates are under `scripts/`.

## Build, Test, and Development Commands
- `pnpm dev` — run the Turbopack development server.
- `pnpm build` / `pnpm start` — build and serve the production bundle.
- `pnpm lint` — execute ESLint with the Next.js + TypeScript rules.
- `pnpm format` and `pnpm format:check` — apply or verify Prettier formatting.
- `npx tsc --noEmit` — strict type-check the project.

## Coding Style & Naming Conventions
- TypeScript + React 19 with 2-space indentation, double quotes, no semicolons; Prettier enforces formatting.
- Components and hooks use PascalCase (`ModalDocs`, `useLocalStorage`); props and local variables use camelCase.
- Prefer composition around `components/ui/` primitives instead of editing vendor files.

## Testing Guidelines
- No formal runner is bundled; validate UI changes through docs pages (`pnpm dev`) and examples under `examples/`.
- When adding tests, colocate React Testing Library specs as `Component.test.tsx` or inside `__tests__/`, keep them deterministic, and cover accessibility behaviours.

## Commit & Pull Request Guidelines
- Write short, imperative commits (e.g., `add namespace badge`, `refactor: registry generation`).
- Pull requests should include a clear summary, linked issues, and screenshots or screen recordings for UI changes. Run `pnpm lint && pnpm format:check && npx tsc --noEmit` before submitting.

## Security & Configuration Tips
- Duplicate `.env.example` to `.env.local`; never commit secrets. Handle sensitive logic in server routes (`app/api/`).
- Follow GitHub API rate-limit guidance: set `GITHUB_TOKEN` in `.env.local` when working with mention components.

## Agent-Specific Instructions
- Confirm the worktree state with `git status -sb` before editing and avoid touching `components/ui/` vendor files. Use `HookDocsPage`/`DocsPage` for documentation changes and reuse `PropsTable` for API references.
