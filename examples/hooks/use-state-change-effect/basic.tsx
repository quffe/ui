'use client'

import { useStateChangeEffect } from "@/hooks/useStateChangeEffect"
import { Dropdown } from "@/components/Navigation/Dropdown"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Example() {
  const [name, setName] = useState("")
  const [count, setCount] = useState(0)
  const [color, setColor] = useState("blue")
  const [effectTriggers, setEffectTriggers] = useState<string[]>([])

  // Effect that only triggers on name and count changes (not color)
  useStateChangeEffect(() => {
    const trigger = `Effect triggered! Name: "${name}", Count: ${count}`
    setEffectTriggers(prev => [trigger, ...prev.slice(0, 2)]) // Keep last 3
  }, [name, count])

  return (
    <div className="space-y-4">
      <div className="text-center text-lg font-bold">State Change Effect Monitor</div>

      <div className="grid grid-cols-1 gap-3 max-w-md mx-auto">
        <div>
          <label className="text-sm font-medium block mb-1">Name (triggers effect)</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Type your name..."
            className="w-full p-2 border rounded text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="text-sm font-medium block mb-1">Count (triggers effect)</label>
            <div className="flex gap-1">
              <Button size="sm" onClick={() => setCount(c => c - 1)}>
                -
              </Button>
              <div className="flex-1 p-2 border rounded text-center text-sm">{count}</div>
              <Button size="sm" onClick={() => setCount(c => c + 1)}>
                +
              </Button>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Color (no effect)</label>
            <Dropdown
              value={color}
              onChange={setColor}
              options={[
                { value: "blue", label: "Blue" },
                { value: "red", label: "Red" },
                { value: "green", label: "Green" },
                { value: "purple", label: "Purple" },
              ]}
              placeholder="Select color..."
              className="w-full"
            />
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto">
        <div className="text-sm font-medium mb-2">Effect Triggers (latest first):</div>
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {effectTriggers.length === 0 ? (
            <div className="text-xs text-muted-foreground italic">No effects triggered yet</div>
          ) : (
            effectTriggers.map((trigger, index) => (
              <div key={index} className="text-xs p-2 bg-muted rounded">
                {trigger}
              </div>
            ))
          )}
        </div>
        <div className="text-xs text-muted-foreground mt-2">
          ℹ️ Only name and count changes trigger the effect, not color
        </div>
      </div>
    </div>
  )
}
