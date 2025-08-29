"use client"

import { CodeBlock } from "@/components/internal/ui/code-block"
import { config } from "@/lib/config"
import { usePackageManager, type PackageManager } from "@/hooks/internal"

interface InstallationTabsProps {
  componentName: string
  className?: string
}

const packageManagers: { value: PackageManager; label: string }[] = [
  { value: "pnpm", label: "pnpm" },
  { value: "npm", label: "npm" },
  { value: "yarn", label: "yarn" },
  { value: "bun", label: "bun" },
]

const getInstallCommand = (packageManager: PackageManager, componentName: string): string => {
  const componentUrl = config.getComponentUrl(componentName)

  const commands = {
    pnpm: `pnpm dlx shadcn@latest add ${componentUrl}`,
    npm: `npx shadcn@latest add ${componentUrl}`,
    yarn: `yarn dlx shadcn@latest add ${componentUrl}`,
    bun: `bunx shadcn@latest add ${componentUrl}`,
  }

  return commands[packageManager]
}

export function InstallationTabs({ componentName, className }: InstallationTabsProps) {
  const { packageManager, setPackageManager, isLoaded } = usePackageManager()

  if (!isLoaded) {
    return (
      <div className="space-y-4">
        <div className="animate-pulse bg-muted h-10 rounded-md"></div>
        <div className="animate-pulse bg-muted h-16 rounded-md"></div>
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Package Manager Tabs */}
      <div className="inline-flex rounded-lg bg-muted p-1">
        {packageManagers.map(pm => (
          <button
            key={pm.value}
            onClick={() => setPackageManager(pm.value)}
            className={`flex items-center justify-center rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
              packageManager === pm.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="font-mono">{pm.label}</span>
          </button>
        ))}
      </div>

      {/* Install Command */}
      <CodeBlock language="bash" showCopyButton={true}>
        {getInstallCommand(packageManager, componentName)}
      </CodeBlock>

      {/* Import Instructions */}
      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground mb-2">Then import the component:</p>
        <CodeBlock language="typescript" showCopyButton={true}>
          {getImportPath(componentName)}
        </CodeBlock>
      </div>
    </div>
  )
}

function getComponentName(componentName: string): string {
  const nameMap: Record<string, string> = {
    "data-table": "DataTable",
    "input-amount": "InputAmount",
    "otp-input": "OtpInput",
    "date-range-picker": "DateRangePicker",
    modal: "Modal",
    dropdown: "Dropdown",
    "input-select": "InputSelect",
    "select-dropdown": "SelectDropdown",
    "app-sidebar": "AppSidebar",
  }

  return nameMap[componentName] || componentName
}

function getImportPath(componentName: string): string {
  // Base UI components go to @/components/ui
  const uiComponents = [
    "button",
    "card",
    "input",
    "dialog",
    "select",
    "checkbox",
    "switch",
    "textarea",
    "alert",
    "badge",
    "separator",
    "breadcrumb",
    "sidebar",
  ]

  // Hooks go to @/hooks
  const hooks = [
    "use-copy-to-clipboard",
    "use-mobile",
    "use-countdown",
    "use-keyboard-shortcut",
    "use-local-storage",
    "use-on-mount-effect",
    "use-on-mount-layout-effect",
    "use-on-unmount-effect",
    "use-on-window-resize",
    "use-revalidate",
    "use-state-change-effect",
    "useCountdown",
    "useLocalStorage",
    "useOnMountEffect",
    "useOnMountLayoutEffect",
    "useOnUnmountEffect",
    "useOnWindowResize",
    "useRevalidate",
    "useStateChangeEffect",
    "useKeyboardShortcut",
  ]

  // Component category mapping based on actual folder structure
  const categoryComponents: Record<string, string> = {
    "data-table": "@/components/Data/DataTable",
    dropdown: "@/components/Navigation/Dropdown",
    "select-dropdown": "@/components/Navigation/SelectDropdown",
    modal: "@/components/Modal/Modal",
    "input-amount": "@/components/Form/InputAmount",
    "otp-input": "@/components/Form/OtpInput",
    "input-select": "@/components/Form/InputSelect",
    "file-input": "@/components/Form/FileInput",
    "password-input": "@/components/Form/PasswordInput",
    "date-range-picker": "@/components/Form/DateRangePicker",
  }

  if (hooks.includes(componentName) || componentName.startsWith("use")) {
    const hookName = componentName.startsWith("use-")
      ? componentName.replace("use-", "use").replace(/-([a-z])/g, (_, char) => char.toUpperCase())
      : componentName
    return `import { ${hookName} } from "@/hooks/${componentName}"`
  }

  if (uiComponents.includes(componentName)) {
    return `import { ${getComponentName(componentName)} } from "@/components/ui/${componentName}"`
  }

  // Check if it's a categorized component
  if (categoryComponents[componentName]) {
    return `import { ${getComponentName(componentName)} } from "${categoryComponents[componentName]}"`
  }

  // Fallback to flat structure
  return `import { ${getComponentName(componentName)} } from "@/components/${componentName}"`
}
