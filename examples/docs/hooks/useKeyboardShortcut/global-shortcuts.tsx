"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"
import { Badge } from "@/components/ui/badge"

export function GlobalShortcutsExample() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [currentPage, setCurrentPage] = useState("home")

  // Global search
  useKeyboardShortcut(
    {
      id: "global-search",
      keys: "ctrl+k",
      description: "Open global search",
      category: "Navigation",
    },
    () => setSearchOpen(true)
  )

  // Toggle sidebar
  useKeyboardShortcut(
    {
      id: "toggle-sidebar",
      keys: "ctrl+b",
      description: "Toggle sidebar",
      category: "Layout",
    },
    () => setSidebarOpen(prev => !prev)
  )

  // Quick navigation
  useKeyboardShortcut(
    {
      id: "go-home",
      keys: "g h",
      description: "Go to home page",
      category: "Navigation",
    },
    () => setCurrentPage("home")
  )

  useKeyboardShortcut(
    {
      id: "go-settings",
      keys: "g s",
      description: "Go to settings",
      category: "Navigation",
    },
    () => setCurrentPage("settings")
  )

  useKeyboardShortcut(
    {
      id: "go-profile",
      keys: "g p",
      description: "Go to profile",
      category: "Navigation",
    },
    () => setCurrentPage("profile")
  )

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {sidebarOpen && (
            <div className="w-32 h-24 bg-muted rounded flex items-center justify-center text-sm">
              Sidebar
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg font-semibold">Current Page:</span>
              <Badge variant="secondary">{currentPage}</Badge>
            </div>
            <div className="text-sm text-muted-foreground">Use keyboard shortcuts to navigate</div>
          </div>
        </div>
      </div>

      {searchOpen && (
        <div className="bg-muted rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">🔍 Search Modal Open</span>
            <Button size="sm" variant="outline" onClick={() => setSearchOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4 text-xs text-muted-foreground">
        <div className="space-y-1">
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">K</kbd> = Search
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">B</kbd> = Toggle Sidebar
          </div>
        </div>
        <div className="space-y-1">
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">G</kbd> +{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">H</kbd> = Home
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">G</kbd> +{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">S</kbd> = Settings
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">G</kbd> +{" "}
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">P</kbd> = Profile
          </div>
        </div>
      </div>

      <div className="flex gap-2 pt-2">
        <Button size="sm" onClick={() => setSearchOpen(true)}>
          Open Search
        </Button>
        <Button size="sm" variant="outline" onClick={() => setSidebarOpen(!sidebarOpen)}>
          Toggle Sidebar
        </Button>
      </div>
    </div>
  )
}
