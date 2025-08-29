"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useCountdown } from "@/hooks/useCountdown"

export function SimpleCountdownExample() {
  const [mounted, setMounted] = useState(false)
  const { seconds, start, stop, reset, isActive } = useCountdown(30, () => {
    alert("Simple countdown completed!")
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      <div className="text-sm mb-4">
        Time remaining: <strong>{mounted ? seconds : 0} seconds</strong>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={start} disabled={isActive}>
          Start
        </Button>
        <Button size="sm" onClick={stop} disabled={!isActive}>
          Stop
        </Button>
        <Button size="sm" onClick={reset}>
          Reset
        </Button>
      </div>
      <div className="text-xs text-muted-foreground mt-2">
        Status: {mounted ? (isActive ? "Running" : "Stopped") : "Loading..."}
      </div>
    </div>
  )
}
