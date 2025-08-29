"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRef, useState } from "react"
import { useStrictMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"

export default function FocusManagementExample() {
  const [key, setKey] = useState(0)
  const [autoFocus, setAutoFocus] = useState(true)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Focus Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-4 mb-4">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={autoFocus}
                onChange={e => setAutoFocus(e.target.checked)}
                className="rounded"
              />
              Enable Auto Focus
            </label>
            <Button onClick={() => setKey(prev => prev + 1)} size="sm" variant="outline">
              Remount Component
            </Button>
          </div>

          <FocusManager key={key} autoFocus={autoFocus} />
        </div>
      </CardContent>
    </Card>
  )
}

function FocusManager({ autoFocus }: { autoFocus?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [focusState, setFocusState] = useState("not-focused")
  const [value, setValue] = useState("Sample text for cursor positioning")

  useStrictMountLayoutEffect(() => {
    if (autoFocus && inputRef.current) {
      // Focus input before paint to prevent visual jump
      inputRef.current.focus()
      setFocusState("focused")

      // Set cursor position at the end
      const length = inputRef.current.value.length
      inputRef.current.setSelectionRange(length, length)
      setFocusState("focused-with-cursor")
    }
  })

  return (
    <div className="border rounded-lg p-4 bg-gradient-to-r from-muted/30 to-muted/50">
      <h3 className="font-semibold mb-2">Auto-focused Input Component</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This input is focused on mount using useStrictMountLayoutEffect to prevent visual jumps.
      </p>

      <div className="space-y-3">
        <div>
          <Label htmlFor="focused-input" className="text-sm font-medium">
            Auto-focused Input:
          </Label>
          <Input
            ref={inputRef}
            id="focused-input"
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="This will be focused on mount"
            className="mt-1"
          />
        </div>

        <div className="bg-card rounded p-3">
          <div className="text-sm mb-2">
            <strong>Focus State:</strong> {focusState}
          </div>
          <div className="text-sm mb-2">
            <strong>Auto Focus Enabled:</strong> {autoFocus ? "Yes" : "No"}
          </div>
          <div className="text-xs text-muted-foreground">
            When auto focus is enabled, the input is focused before paint with cursor positioned at
            the end.
          </div>
        </div>

        <div className="space-y-2">
          <Input placeholder="Regular input (not auto-focused)" />
          <Input placeholder="Another regular input" />
        </div>
      </div>

      <div className="text-xs text-muted-foreground mt-4">
        Toggle auto focus and remount to see the difference in behavior.
      </div>
    </div>
  )
}
