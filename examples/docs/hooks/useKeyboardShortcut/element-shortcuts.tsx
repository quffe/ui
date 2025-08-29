"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useKeyboardShortcutElement } from "@/hooks/useKeyboardShortcut"
import { useRef } from "react"

export function ElementShortcutsExample() {
  const [message, setMessage] = useState("")

  // Element-based shortcuts with refs
  const actionButtonRef = useKeyboardShortcutElement<HTMLButtonElement>(
    {
      id: "primary-action",
      keys: "a",
      description: "Trigger primary action",
      category: "Actions",
    },
    () => setMessage("Primary action triggered!")
  )

  const secondaryButtonRef = useKeyboardShortcutElement<HTMLButtonElement>(
    {
      id: "secondary-action",
      keys: "s",
      description: "Trigger secondary action",
      category: "Actions",
    },
    () => setMessage("Secondary action triggered!")
  )

  const clearButtonRef = useKeyboardShortcutElement<HTMLButtonElement>(
    {
      id: "clear-message",
      keys: "c",
      description: "Clear message",
      category: "Actions",
    },
    () => setMessage("")
  )

  return (
    <div className="border rounded-lg p-4">
      <div className="space-y-4">
        <div className="text-center">
          {message ? (
            <div className="text-lg font-semibold text-secondary">{message}</div>
          ) : (
            <div className="text-muted-foreground">Press keyboard shortcuts or click buttons</div>
          )}
        </div>

        <div className="flex gap-2 justify-center">
          <Button
            ref={actionButtonRef}
            size="sm"
            onClick={() => setMessage("Primary action triggered!")}
          >
            Primary Action (A)
          </Button>
          <Button
            ref={secondaryButtonRef}
            size="sm"
            variant="outline"
            onClick={() => setMessage("Secondary action triggered!")}
          >
            Secondary Action (S)
          </Button>
          <Button
            ref={clearButtonRef}
            size="sm"
            variant="destructive"
            onClick={() => setMessage("")}
          >
            Clear (C)
          </Button>
        </div>

        <div className="text-xs text-muted-foreground space-y-1">
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">A</kbd> = Primary Action
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">S</kbd> = Secondary Action
          </div>
          <div>
            <kbd className="bg-muted px-1 py-0.5 rounded text-xs">C</kbd> = Clear Message
          </div>
        </div>
      </div>
    </div>
  )
}
