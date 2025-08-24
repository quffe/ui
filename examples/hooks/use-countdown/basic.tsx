'use client'

import { useCountdown } from "@/hooks/useCountdown"
import { Button } from "@/components/ui/button"

export function Example() {
  const { seconds, start, stop, reset, isActive } = useCountdown(10, () =>
    console.log("Countdown completed!")
  )

  const formatTime = (seconds: number) => {
    return `${seconds}s`
  }

  return (
    <div className="text-center space-y-4">
      <div className="text-2xl font-bold">{formatTime(seconds)}</div>
      <div className="flex gap-2 justify-center">
        <Button onClick={start} disabled={isActive} size="sm">
          Start
        </Button>
        <Button onClick={stop} disabled={!isActive} size="sm" variant="outline">
          Stop
        </Button>
        <Button onClick={reset} size="sm" variant="outline">
          Reset
        </Button>
      </div>
      <div className="text-sm text-muted-foreground">
        Status: {isActive ? "Running" : "Stopped"}
      </div>
    </div>
  )
}
