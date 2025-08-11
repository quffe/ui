# UI Components Registry

A comprehensive collection of reusable UI components built with React, TypeScript, and Tailwind CSS.

## Installation

You can install these components directly into your project using the Shadcn CLI. The URLs are automatically configured based on your environment variables:

```bash
# Development (configured via NEXT_PUBLIC_REGISTRY_URL)
pnpm dlx shadcn@latest add $NEXT_PUBLIC_REGISTRY_URL/data-table

# Production (configured via environment)
pnpm dlx shadcn@latest add https://your-domain.com/api/registry/data-table

# Install multiple components
pnpm dlx shadcn@latest add https://your-domain.com/api/registry/input-amount
pnpm dlx shadcn@latest add https://your-domain.com/api/registry/otp-input
```

## Environment Configuration

Set these environment variables in your `.env.local` (development) or `.env.production`:

```bash
# Registry URLs
NEXT_PUBLIC_REGISTRY_URL=https://your-domain.com/api/registry
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Site branding
NEXT_PUBLIC_SITE_NAME=Your UI Components
NEXT_PUBLIC_SITE_DESCRIPTION=A comprehensive collection of reusable UI components
```

## Available Components

### Data Components
- **DataTable** - A powerful data table with sorting, filtering, and pagination
  ```bash
  pnpm dlx shadcn@latest add https://ui-components.dev/api/registry/data-table
  ```

### Input Components
- **InputAmount** - Specialized input for monetary amounts with currency support
  ```bash
  pnpm dlx shadcn@latest add https://ui-components.dev/api/registry/input-amount
  ```

- **OtpInput** - One-time password input with multiple fields
  ```bash
  pnpm dlx shadcn@latest add https://ui-components.dev/api/registry/otp-input
  ```

## Prerequisites

Make sure your project has the following setup:

1. **Shadcn UI initialized** in your project:
   ```bash
   pnpm dlx shadcn@latest init
   ```

2. **Required base components** installed (these are automatically handled by registryDependencies):
   - button
   - input
   - label
   - table
   - dialog

## Usage Examples

### DataTable
```tsx
import { DataTable } from "@/components/ui/data-table"

const columns = [
  { accessorKey: "name", header: "Name" },
  { accessorKey: "email", header: "Email" },
]

const data = [
  { name: "John Doe", email: "john@example.com" },
  { name: "Jane Smith", email: "jane@example.com" },
]

export default function Example() {
  return (
    <DataTable
      columns={columns}
      data={data}
      onRowClick={(row) => console.log(row)}
    />
  )
}
```

### InputAmount
```tsx
import { InputAmount } from "@/components/ui/input-amount"

export default function Example() {
  const [amount, setAmount] = useState<number | null>(null)
  
  return (
    <InputAmount
      value={amount}
      onChange={setAmount}
      label="Enter amount"
      showCurrency
      currency="$"
    />
  )
}
```

### OtpInput
```tsx
import { OtpInput } from "@/components/ui/otp-input"

export default function Example() {
  const [otp, setOtp] = useState("")
  
  return (
    <OtpInput
      length={6}
      value={otp}
      onChange={setOtp}
      onComplete={(code) => console.log('Complete:', code)}
    />
  )
}
```