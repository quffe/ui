"use client"

import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Example() {
  const [count, setCount] = useState(0)

  useKeyboardShortcut(
    {
      id: "demo-increment",
      keys: "shift+space",
      description: "Increment counter",
      category: "Demo",
    },
    () => setCount(prev => prev + 1)
  )

  return (
    <div className="text-center space-y-4">
      <div className="text-2xl font-bold">Count: {count}</div>
      <div className="text-sm text-muted-foreground">
        Press <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Shift</kbd> +{" "}
        <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Space</kbd> to increment
      </div>
      <Button onClick={() => setCount(prev => prev + 1)} size="sm">
        Or click here
      </Button>
    </div>
  )
}
