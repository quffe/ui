'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, Package } from 'lucide-react'
import { usePackageManager, type PackageManager } from '@/hooks/usePackageManager'

const packageManagers: { value: PackageManager; label: string; icon: string }[] = [
  { value: 'pnpm', label: 'pnpm', icon: '📦' },
  { value: 'npm', label: 'npm', icon: '📋' },
  { value: 'yarn', label: 'Yarn', icon: '🧶' },
  { value: 'bun', label: 'Bun', icon: '🥟' },
]

interface PackageManagerSelectorProps {
  size?: 'sm' | 'default' | 'lg'
  variant?: 'default' | 'outline' | 'ghost'
  showIcon?: boolean
}

export function PackageManagerSelector({ 
  size = 'sm', 
  variant = 'outline',
  showIcon = true 
}: PackageManagerSelectorProps) {
  const { packageManager, setPackageManager, isLoaded } = usePackageManager()

  if (!isLoaded) {
    return (
      <Button variant={variant} size={size} disabled>
        <Package className="h-4 w-4 mr-2" />
        Loading...
      </Button>
    )
  }

  const currentPM = packageManagers.find(pm => pm.value === packageManager) || packageManagers[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} size={size} className="gap-2">
          {showIcon && <span className="text-base">{currentPM.icon}</span>}
          <span className="font-mono">{currentPM.label}</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-32">
        {packageManagers.map((pm) => (
          <DropdownMenuItem
            key={pm.value}
            onClick={() => setPackageManager(pm.value)}
            className="gap-2 cursor-pointer"
          >
            <span className="text-base">{pm.icon}</span>
            <span className="font-mono">{pm.label}</span>
            {pm.value === packageManager && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}