"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { config } from "@/lib/config"
import { Copy, Check } from "lucide-react"
import { PackageManagerSelector } from "./PackageManagerSelector"
import { usePackageManager, type PackageManager } from "@/hooks/internal"

interface InstallCommandProps {
  componentName: string
  className?: string
  showSelector?: boolean
}

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

export function InstallCommand({
  componentName,
  className,
  showSelector = true,
}: InstallCommandProps) {
  const [copied, setCopied] = useState(false)
  const { packageManager, isLoaded } = usePackageManager()

  const installCommand = isLoaded ? getInstallCommand(packageManager, componentName) : "Loading..."

  const copyToClipboard = async () => {
    if (!isLoaded) return

    await navigator.clipboard.writeText(installCommand)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {showSelector && (
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Package Manager:</span>
          <PackageManagerSelector />
        </div>
      )}

      <div className="bg-muted p-4 rounded-md flex items-center justify-between">
        <code className="text-sm flex-1 mr-2 font-mono">{installCommand}</code>
        <Button
          size="sm"
          variant="ghost"
          onClick={copyToClipboard}
          className="h-8 w-8 p-0"
          disabled={!isLoaded}
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}
