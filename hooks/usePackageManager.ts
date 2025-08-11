'use client'

import { useState, useEffect } from 'react'

export type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun'

const STORAGE_KEY = 'ui-components-package-manager'
const DEFAULT_PACKAGE_MANAGER: PackageManager = 'pnpm'

export function usePackageManager() {
  const [packageManager, setPackageManagerState] = useState<PackageManager>(DEFAULT_PACKAGE_MANAGER)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as PackageManager
    if (stored && ['pnpm', 'npm', 'yarn', 'bun'].includes(stored)) {
      setPackageManagerState(stored)
    }
    setIsLoaded(true)
  }, [])

  // Update both state and localStorage
  const setPackageManager = (pm: PackageManager) => {
    setPackageManagerState(pm)
    localStorage.setItem(STORAGE_KEY, pm)
  }

  return {
    packageManager,
    setPackageManager,
    isLoaded,
  }
}