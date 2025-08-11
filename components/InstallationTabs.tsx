"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { config } from "@/lib/config"
import { Copy, Check } from "lucide-react"
import { usePackageManager, type PackageManager } from "@/hooks/usePackageManager"

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
  const [copied, setCopied] = useState(false)
  const { packageManager, setPackageManager, isLoaded } = usePackageManager()

  const copyToClipboard = async (command: string) => {
    await navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

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
      <div className="bg-muted p-4 rounded-md flex items-center justify-between">
        <code className="text-sm flex-1 mr-2 font-mono">
          {getInstallCommand(packageManager, componentName)}
        </code>
        <Button
          size="sm"
          variant="ghost"
          onClick={() => copyToClipboard(getInstallCommand(packageManager, componentName))}
          className="h-8 w-8 p-0"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>

      {/* Import Instructions */}
      <div className="pt-4 border-t">
        <p className="text-sm text-muted-foreground mb-2">Then import the component:</p>
        <div className="bg-muted p-4 rounded-md">
          <code className="text-sm">
            import {`{ ${getComponentName(componentName)} }`} from "@/components/ui/{componentName}"
          </code>
        </div>
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
