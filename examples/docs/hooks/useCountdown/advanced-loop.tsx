'use client'

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useCountdownLoopTimer } from "@/hooks/useCountdown"

export function AdvancedLoopExample() {
  const [mounted, setMounted] = useState(false)
  const {
    startTimer,
    stopTimer,
    pauseTimer,
    resumeTimer,
    resetTimer,
    remainingSeconds,
    isRunning,
    isPaused,
    loopCount,
    progress,
  } = useCountdownLoopTimer({
    intervalMs: 1000,
    durationMs: 10000, // 10 seconds
    onTick: () => {
      console.log("Loop completed!")
    },
    autoRestart: false,
    maxLoops: 3,
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div>
          Time: <strong>{mounted ? remainingSeconds : 0}s</strong>
        </div>
        <div>
          Progress: <strong>{mounted ? progress.toFixed(1) : 0}%</strong>
        </div>
        <div>
          Loop: <strong>{mounted ? loopCount : 0}</strong>
        </div>
        <div>
          Status:{" "}
          <strong>
            {mounted
              ? isRunning
                ? "Running"
                : isPaused
                  ? "Paused"
                  : "Stopped"
              : "Loading..."}
          </strong>
        </div>
      </div>
      <div className="flex gap-2">
        <Button size="sm" onClick={startTimer} disabled={isRunning}>
          Start
        </Button>
        <Button size="sm" onClick={stopTimer} disabled={!isRunning && !isPaused}>
          Stop
        </Button>
        <Button size="sm" onClick={pauseTimer} disabled={!isRunning}>
          Pause
        </Button>
        <Button size="sm" onClick={resumeTimer} disabled={!isPaused}>
          Resume
        </Button>
        <Button size="sm" onClick={resetTimer}>
          Reset
        </Button>
      </div>
    </div>
  )
}