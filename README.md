# UI Components Library

A comprehensive Next.js React UI components library built with TypeScript, Tailwind CSS v4, and shadcn/ui patterns. Features a complete registry system with namespace support for easy distribution and installation.

## 🚀 Getting Started

### Development Server

```bash
pnpm dev          # Start development server with Turbopack
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Lint code
pnpm format       # Format code
```

Open [http://localhost:3000](http://localhost:3000) to view the component documentation and examples.

### Registry Management (Static)

```bash
pnpm registry:update  # Regenerate static registry JSON under public/registry
```

The registry is served statically from `public/registry` and exposed via URL rewrites:
- `GET /api/registry` → `/registry/index.json`
- `GET /api/registry/{name}` → `/registry/{name}.json` (e.g., `form/checkbox`)

## 📦 Installation & Usage

This library supports **shadcn/ui CLI 3.0+ namespace features** for organized component installation.

### Install Components by Namespace

```bash
# Install all form components
npx shadcn@latest add @ui-components/form/input-amount @ui-components/form/password-input

# Install navigation components  
npx shadcn@latest add @ui-components/navigation/dropdown @ui-components/navigation/select-dropdown

# Install data components
npx shadcn@latest add @ui-components/data/data-table

# Install modal components
npx shadcn@latest add @ui-components/modal/modal @ui-components/modal/modal-trigger

# Install custom hooks
npx shadcn@latest add @ui-components/hooks/useLocalStorage @ui-components/hooks/useKeyboardShortcut
```

### Available Namespaces

| Namespace | Description | Components |
|-----------|-------------|------------|
| `@ui-components/form` | Form-specific components | InputAmount, OtpInput, PasswordInput, FileInput, Input, Textarea, Checkbox, RadioGroup, Select |
| `@ui-components/navigation` | Navigation components | Dropdown, SelectDropdown |  
| `@ui-components/data` | Data visualization | DataTable |
| `@ui-components/modal` | Modal and overlay components | Modal, ModalTrigger |
| `@ui-components/hooks` | Custom React hooks | useLocalStorage, useKeyboardShortcut, useOnUnmountEffect, etc. |

### Configuration

Add the registry configuration to your `components.json` (rewritten to static files internally):

```json
{
  "registries": {
    "@ui-components": "http://localhost:3000/api/registry/{name}"
  }
}
```

## 🏗️ Architecture

### Component Organization

- **`/components/ui/`** - Base primitive components (shadcn/ui style)
- **`/components/Form/`** - Form-specific components
- **`/components/Input/`** - Advanced input components  
- **`/components/Data/`** - Data visualization components
- **`/components/Navigation/`** - Navigation components
- **`/components/Modal/`** - Modal and overlay components
- **`/components/internal/`** - Internal infrastructure components

### Hooks Organization

- **`/hooks/`** - Custom React hooks
- **`/hooks/internal/`** - Internal hooks

### Registry System

- Auto-generated static registry with namespace support
- Served from `public/registry` and exposed via Next.js rewrites
- Categorized distribution for targeted installations
- Dependency tracking and proper import path resolution

## 🛠️ Technology Stack

- **Next.js 15.2.4** with App Router and React 19
- **TypeScript 5** with strict mode  
- **Tailwind CSS v4** (cutting edge)
- **Radix UI** primitives for accessibility
- **shadcn/ui** patterns and CLI 3.0+ namespace support
- **CVA** for variant-based styling
- **PNPM** for package management

## 📚 Features

### Components
- **Form Controls**: Advanced inputs with validation and accessibility
- **Data Tables**: Powerful tables with sorting, filtering, pagination
- **Navigation**: Searchable dropdowns with keyboard navigation
- **Modals**: Flexible modal system with size variants
- **Accessibility**: Full ARIA support and semantic HTML

### Hooks
- **State Management**: localStorage sync, state change effects
- **UI Utilities**: Mobile detection, keyboard shortcuts, window resize
- **Lifecycle**: Mount/unmount effects, cleanup utilities
- **Data**: SWR integration, revalidation helpers

### Developer Experience
- **TypeScript**: Full type safety with generic components
- **Documentation**: Live examples and code previews
- **Registry CLI**: Install components with single commands
- **Hot Reload**: Instant feedback with Turbopack
- **Code Quality**: ESLint, Prettier, automated formatting

## 🔗 Replica: GitHub Replica

Render compact metadata cards for GitHub resources (PRs, issues, users, repos):

```tsx
import { GithubReplica } from "@/components/Replica/Github/GithubReplica"

export function Example() {
  return (
    <GithubReplica url="https://github.com/vercel/next.js/pull/123" />
  )
}
```

- Works unauthenticated (60 req/hr/IP) or via server proxy: `<GithubReplica url={...} useServer />`
- Supports PR states (Open/Closed/Merged/Draft), Issue comments count, User bio/followers, Repo stars/forks

## 🚦 Development Commands

```bash
pnpm dev              # Development server (Turbopack)
pnpm build            # Production build
pnpm start            # Production server
pnpm lint             # ESLint
pnpm format           # Prettier format
pnpm format:check     # Check formatting
pnpm registry:update  # Update static component registry
pnpm typecheck        # Type checking
pnpm check            # Lint + format:check + typecheck
```

## 🎨 Theming

Uses **Poimandres dark theme** with OKLCH colors and CSS variables. Fully customizable through Tailwind CSS v4 configuration.

## 📄 License

This project is built on top of [shadcn/ui](https://ui.shadcn.com/) patterns and follows similar open-source principles.
