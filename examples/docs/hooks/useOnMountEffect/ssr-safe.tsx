"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useState } from "react"
import { useOnMountEffect, useHasMounted } from "@/hooks/useOnMountEffect"

function ClientOnlyInfo() {
  const hasMounted = useHasMounted()

  // Avoid hydration mismatch by only rendering client-specific content after mount
  if (!hasMounted) {
    return (
      <div className="p-4 border rounded">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-muted rounded w-1/2"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-1/3"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded space-y-2">
      <div className="flex items-center gap-2">
        <Badge variant="secondary">Client Only</Badge>
        <span className="text-sm">This content is safe from hydration mismatches</span>
      </div>
      <div className="text-sm space-y-1">
        <div>
          Current URL: <code className="text-xs">{window.location.href}</code>
        </div>
        <div>
          Screen Size:{" "}
          <code className="text-xs">
            {screen.width} x {screen.height}
          </code>
        </div>
        <div>
          Online: <code className="text-xs">{navigator.onLine ? "Yes" : "No"}</code>
        </div>
        <div>
          Platform: <code className="text-xs">{navigator.platform}</code>
        </div>
      </div>
    </div>
  )
}

function ThemeComponent() {
  const hasMounted = useHasMounted()
  const [theme, setTheme] = useState<string | null>(null)

  useOnMountEffect(() => {
    // Access localStorage only after mount to avoid SSR issues
    const savedTheme = localStorage.getItem("demo-theme") || "light"
    setTheme(savedTheme)

    // Apply theme to document
    document.documentElement.setAttribute("data-theme", savedTheme)
  })

  const toggleTheme = () => {
    if (!theme) return

    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    localStorage.setItem("demo-theme", newTheme)
    document.documentElement.setAttribute("data-theme", newTheme)
  }

  if (!hasMounted || !theme) {
    return (
      <div className="p-4 border rounded">
        <div className="animate-pulse space-y-2">
          <div className="h-4 bg-muted rounded w-1/4"></div>
          <div className="h-8 bg-muted rounded w-20"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="font-medium">Theme Settings</div>
          <div className="text-sm text-muted-foreground">
            Current theme: <Badge>{theme}</Badge>
          </div>
        </div>
        <button onClick={toggleTheme} className="px-3 py-1 text-sm border rounded hover:bg-accent">
          Switch to {theme === "light" ? "dark" : "light"}
        </button>
      </div>
    </div>
  )
}

export default function SSRSafeExample() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">SSR-Safe Component</CardTitle>
        </CardHeader>
        <CardContent>
          <ClientOnlyInfo />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Theme Component (localStorage)</CardTitle>
        </CardHeader>
        <CardContent>
          <ThemeComponent />
          <div className="text-xs text-muted-foreground mt-2">
            This component safely accesses localStorage after mount to avoid SSR hydration issues.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
