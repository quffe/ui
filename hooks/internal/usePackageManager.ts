"use client"

import { useState, useEffect } from "react"

export type PackageManager = "pnpm" | "npm" | "yarn" | "bun"

const STORAGE_KEY = "ui-components-package-manager"
const DEFAULT_PACKAGE_MANAGER: PackageManager = "pnpm"

// Global state management
let globalPackageManager: PackageManager = DEFAULT_PACKAGE_MANAGER
const listeners = new Set<(pm: PackageManager) => void>()

const setGlobalPackageManager = (pm: PackageManager) => {
  globalPackageManager = pm
  localStorage.setItem(STORAGE_KEY, pm)
  // Notify all listeners
  listeners.forEach(listener => listener(pm))
}

const getGlobalPackageManager = (): PackageManager => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(STORAGE_KEY) as PackageManager
    if (stored && ["pnpm", "npm", "yarn", "bun"].includes(stored)) {
      globalPackageManager = stored
    }
  }
  return globalPackageManager
}

export function usePackageManager() {
  const [packageManager, setPackageManagerState] = useState<PackageManager>(DEFAULT_PACKAGE_MANAGER)
  const [isLoaded, setIsLoaded] = useState(false)

  // Load from localStorage and global state on mount
  useEffect(() => {
    const current = getGlobalPackageManager()
    setPackageManagerState(current)
    setIsLoaded(true)

    // Subscribe to global state changes
    const listener = (pm: PackageManager) => {
      setPackageManagerState(pm)
    }
    listeners.add(listener)

    // Cleanup subscription on unmount
    return () => {
      listeners.delete(listener)
    }
  }, [])

  // Update global state
  const setPackageManager = (pm: PackageManager) => {
    setGlobalPackageManager(pm)
  }

  return {
    packageManager,
    setPackageManager,
    isLoaded,
  }
}
