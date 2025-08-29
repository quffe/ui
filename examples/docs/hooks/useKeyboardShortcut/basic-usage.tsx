"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useKeyboardShortcut } from "@/hooks/useKeyboardShortcut"

export function BasicUsageExample() {
  const [count, setCount] = useState(0)

  // Basic global shortcut
  useKeyboardShortcut(
    {
      id: "increment-counter",
      keys: "ctrl+plus",
      description: "Increment counter",
      category: "Demo",
    },
    () => setCount(prev => prev + 1)
  )

  useKeyboardShortcut(
    {
      id: "decrement-counter",
      keys: "ctrl+minus",
      description: "Decrement counter",
      category: "Demo",
    },
    () => setCount(prev => prev - 1)
  )

  return (
    <div className="border rounded-lg p-4 text-center">
      <div className="text-2xl font-bold mb-4">Counter: {count}</div>
      <div className="space-y-2 text-sm text-muted-foreground">
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">+</kbd> = Increment
        </div>
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">-</kbd> = Decrement
        </div>
      </div>
      <div className="flex gap-2 justify-center mt-4">
        <Button size="sm" onClick={() => setCount(prev => prev + 1)}>
          +1
        </Button>
        <Button size="sm" variant="outline" onClick={() => setCount(prev => prev - 1)}>
          -1
        </Button>
        <Button size="sm" variant="destructive" onClick={() => setCount(0)}>
          Reset
        </Button>
      </div>
    </div>
  )
}
