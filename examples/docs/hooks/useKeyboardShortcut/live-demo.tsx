"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  useKeyboardShortcut,
  useKeyboardShortcutElement,
} from "@/hooks/useKeyboardShortcut"
import {
  KeyboardShortcutHelp,
} from "@/components/internal/ui/keyboard-shortcut-tooltip"

export function LiveDemoExample() {
  const [count, setCount] = useState(0)
  const [showHelp, setShowHelp] = useState(false)

  // Global shortcuts
  useKeyboardShortcut(
    {
      id: "increment-counter",
      keys: "ctrl+plus",
      description: "Increment counter",
      category: "Counter",
    },
    () => setCount(prev => prev + 1)
  )

  useKeyboardShortcut(
    {
      id: "decrement-counter",
      keys: "ctrl+minus",
      description: "Decrement counter",
      category: "Counter",
    },
    () => setCount(prev => prev - 1)
  )

  useKeyboardShortcut(
    {
      id: "reset-counter",
      keys: "ctrl+0",
      description: "Reset counter to zero",
      category: "Counter",
    },
    () => setCount(0)
  )

  // Element-based shortcuts
  const incrementRef = useKeyboardShortcutElement<HTMLButtonElement>(
    {
      id: "increment-btn",
      keys: "i",
      description: "Increment counter (button)",
      category: "Counter",
    },
    () => setCount(prev => prev + 1)
  )

  const decrementRef = useKeyboardShortcutElement<HTMLButtonElement>(
    {
      id: "decrement-btn",
      keys: "d",
      description: "Decrement counter (button)",
      category: "Counter",
    },
    () => setCount(prev => prev - 1)
  )

  const resetRef = useKeyboardShortcutElement<HTMLButtonElement>(
    {
      id: "reset-btn",
      keys: "r",
      description: "Reset counter (button)",
      category: "Counter",
    },
    () => setCount(0)
  )

  const helpRef = useKeyboardShortcutElement<HTMLButtonElement>(
    {
      id: "show-help",
      keys: "h",
      description: "Show keyboard shortcuts help",
      category: "Help",
    },
    () => setShowHelp(true)
  )

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <div className="text-center">
        <div className="text-2xl font-bold mb-2">Counter: {count}</div>
        <div className="text-sm text-muted-foreground mb-4">
          Try the keyboard shortcuts! Press Shift+? to see all shortcuts.
        </div>
      </div>

      <div className="flex gap-2 justify-center">
        <Button ref={incrementRef} onClick={() => setCount(prev => prev + 1)}>
          Increment (I)
        </Button>
        <Button ref={decrementRef} onClick={() => setCount(prev => prev - 1)} variant="outline">
          Decrement (D)
        </Button>
        <Button ref={resetRef} onClick={() => setCount(0)} variant="destructive">
          Reset (R)
        </Button>
        <Button ref={helpRef} onClick={() => setShowHelp(true)} variant="secondary">
          Help (H)
        </Button>
      </div>

      <div className="text-xs text-muted-foreground space-y-1">
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">+</kbd> = Increment
        </div>
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">-</kbd> = Decrement
        </div>
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">Ctrl</kbd> +{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">0</kbd> = Reset
        </div>
        <div>
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">I</kbd> /{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">D</kbd> /{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">R</kbd> /{" "}
          <kbd className="bg-muted px-1 py-0.5 rounded text-xs">H</kbd> = Button shortcuts
        </div>
      </div>

      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <KeyboardShortcutHelp onClose={() => setShowHelp(false)} />
        </div>
      )}
    </div>
  )
}