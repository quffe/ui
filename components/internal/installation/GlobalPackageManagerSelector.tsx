"use client"

import { PackageManagerSelector } from "./PackageManagerSelector"
import { Badge } from "@/components/ui/badge"

export function GlobalPackageManagerSelector() {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-background/80 backdrop-blur-sm border rounded-lg px-3 py-2 shadow-lg">
      <Badge variant="secondary" className="text-xs">
        Package Manager
      </Badge>
      <PackageManagerSelector size="sm" variant="ghost" />
    </div>
  )
}
