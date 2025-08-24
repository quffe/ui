# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.2.4 React UI components library built with TypeScript and Tailwind CSS v4. The project follows shadcn/ui patterns and is built on top of Radix UI primitives for accessibility and behavior.

## Development Commands

```bash
# Development server (uses Turbopack for faster builds)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint

# Type checking
npx tsc --noEmit
```

## Architecture & Component Organization

### Component Structure

The codebase follows a three-tier component hierarchy:

1. **`/components/ui/`** - Base primitive components
   - Built on Radix UI primitives with custom styling
   - Use `class-variance-authority` (CVA) for variant-based styling
   - All components use `data-slot` attributes for semantic identification
   - Examples: Button, Card, Input, Dialog

2. **`/components/form/`** - Form-specific enhanced components
   - Form validation and enhanced input functionality
   - More opinionated styling compared to ui/ components

3. **`/components/` (root)** - Complex composite components
   - Business logic components and higher-level abstractions
   - Examples: DataTable, DateRangePicker, Modal, InputSelect

### Hooks Organization

- **`/hooks/`** - Custom React hooks for reusable logic
- Mix of utility hooks (useLocalStorage, useMobile) and business logic hooks
- All hooks are properly typed with TypeScript

## Code Conventions

### TypeScript Patterns
- All components use TypeScript with strict mode
- Generic components for type safety: `InputSelect<T>`, `DataTable<TData, TValue>`
- Props interfaces extend React built-in types: `React.ComponentProps<'button'>`
- Use proper forwardRef pattern for ref forwarding

### Styling Conventions
- **Utility function**: Use `cn()` for className merging (clsx + tailwind-merge)
- **Variants**: Use CVA (class-variance-authority) with defaultVariants pattern
- **Theming**: CSS variables for theme customization with light/dark support
- **Component identification**: Use `data-slot` attributes consistently
- **Responsive design**: Mobile-first approach with Tailwind classes

### Component Patterns
- Use compound component pattern (Card with CardHeader, CardContent, etc.)
- Support both controlled and uncontrolled component usage
- Include proper accessibility with ARIA attributes and semantic HTML
- Mark client components with 'use client' directive when needed

### File Organization
- Use named exports and barrel files for clean imports
- Path aliases configured: `@/components`, `@/lib`, `@/hooks`
- Type-only imports where appropriate

## Key Technologies & Dependencies

### Core Stack
- **Next.js 15.2.4** with App Router and React 19
- **TypeScript 5** with strict mode
- **Tailwind CSS v4** (cutting edge version)
- **PNPM** as package manager

### UI Foundation
- **Radix UI primitives** for accessibility-first components
- **Lucide React** for icons
- **CVA** for variant-based component styling

### Data & State
- **SWR** for data fetching and server state
- **@tanstack/react-table** for table functionality
- Custom hooks for component state management

### Utilities
- **date-fns** for date manipulation
- **react-day-picker** for calendar components
- **sonner** for toast notifications
- **js-base64** for encoding utilities

## Component Development Guidelines

### Creating New Components

1. **Base UI Components** (`/components/ui/`):
   - Extend Radix UI primitives when possible
   - Use CVA for variants with proper TypeScript typing
   - Include forwardRef for proper ref handling
   - Add data-slot attributes for semantic identification

2. **Composite Components** (`/components/`):
   - Build on top of ui/ components
   - Include proper TypeScript generics for reusability
   - Handle both controlled and uncontrolled states
   - Include comprehensive prop interfaces

3. **Hooks** (`/hooks/`):
   - Export custom hooks with proper TypeScript typing
   - Include JSDoc comments for complex hooks
   - Handle cleanup and side effects properly

### Styling Guidelines

```typescript
// Example component with proper CVA usage
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### TypeScript Patterns

```typescript
// Proper generic component typing
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onRowClick?: (row: TData) => void
}

// Component with forwardRef
const Button = React.forwardRef<
  React.ElementRef<"button">,
  React.ComponentPropsWithoutRef<"button"> & VariantProps<typeof buttonVariants>
>(({ className, variant, size, ...props }, ref) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  )
})
```

## Configuration Files

- **`components.json`** - Shadcn/ui configuration with "new-york" style
- **`tailwind.config.ts`** - Tailwind CSS v4 configuration with theme variables
- **`tsconfig.json`** - TypeScript configuration with path mapping
- **`.eslintrc.json`** - ESLint configuration extending Next.js rules

## Common Tasks

### Adding New Dependencies
Always use pnpm and check if the dependency supports React 19:
```bash
pnpm add package-name
```

### Type Checking
Before committing, always run type checking:
```bash
npx tsc --noEmit
```

### Theme Customization
Modify CSS variables in the global CSS file for theme changes. The project uses a comprehensive design token system with light/dark mode support.
- always use pnpm
- put all previews on example directory and use getExampleCode util to get raw code string.
- PreviewTabs should always use getExampleCode for code if no preview dont use PreviewTabs only use CodeBlock
- page layout should be consistent through out the whole project
- on examples, theme should also be in darkmode