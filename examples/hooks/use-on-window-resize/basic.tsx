'use client'

import { useOnWindowResize } from "@/hooks/useOnWindowResize"
import { useState } from "react"

export function Example() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isResizing, setIsResizing] = useState(false)
  const [resizeCount, setResizeCount] = useState(0)

  useOnWindowResize(() => {
    setIsResizing(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })
    setResizeCount(prev => prev + 1)

    // Reset resizing state after delay to show the debouncing effect
    const timeout = setTimeout(() => setIsResizing(false), 500)
    return () => clearTimeout(timeout)
  })

  return (
    <div className="text-center space-y-4">
      <div className="text-2xl font-bold">Window Resize Monitor</div>

      {/* Window Dimensions */}
      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        <div className="p-3 bg-muted rounded-md">
          <div className="text-sm text-muted-foreground">Width (X)</div>
          <div className="text-xl font-semibold">{windowSize.width}px</div>
        </div>
        <div className="p-3 bg-muted rounded-md">
          <div className="text-sm text-muted-foreground">Height (Y)</div>
          <div className="text-xl font-semibold">{windowSize.height}px</div>
        </div>
      </div>

      {/* Status and Counter */}
      <div className="space-y-2">
        <div
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
            isResizing
              ? "bg-warn-soft/10 text-warn-soft border border-warn-soft/30"
              : "bg-green-100 text-green-800 border border-green-200"
          }`}
        >
          <div
            className={`w-2 h-2 rounded-full ${isResizing ? "bg-warn-bright" : "bg-green-500"}`}
          />
          {isResizing ? "Resizing..." : "Stable"}
        </div>

        <div className="text-sm text-muted-foreground">
          Resize events: <span className="font-semibold">{resizeCount}</span>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Resize your browser window to see live updates with debouncing
      </div>
    </div>
  )
}
