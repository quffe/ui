"use client"

import { useOnWindowResize } from "@/hooks/useOnWindowResize"
import { useState } from "react"

export function AdvancedExample() {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [isResizing, setIsResizing] = useState(false)

  useOnWindowResize(() => {
    setIsResizing(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    // Reset resizing state after delay
    const timeout = setTimeout(() => setIsResizing(false), 300)
    return () => clearTimeout(timeout)
  })

  return (
    <div className="text-center space-y-4">
      <div className="text-lg font-bold">Simple Window Monitor</div>
      <div className="space-y-2">
        <div>
          Window: {windowSize.width} × {windowSize.height}
        </div>
        <div>Status: {isResizing ? "Resizing..." : "Stable"}</div>
      </div>
    </div>
  )
}
