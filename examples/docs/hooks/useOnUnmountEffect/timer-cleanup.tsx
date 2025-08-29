"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef, useCallback } from "react"
import { useOnUnmountEffect } from "@/hooks/useOnUnmountEffect"

export default function TimerCleanupExample() {
  const [isComponentMounted, setIsComponentMounted] = useState(true)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Timer Cleanup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setIsComponentMounted(!isComponentMounted)}
              variant={isComponentMounted ? "destructive" : "default"}
              size="sm"
            >
              {isComponentMounted ? "Unmount Component (Clear Timers)" : "Mount Component"}
            </Button>
          </div>

          <div className="min-h-32">{isComponentMounted && <TimerComponent />}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function TimerComponent() {
  const [count, setCount] = useState(0)
  const [isRunning, setIsRunning] = useState(true) // Start as running
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const [timeoutMessage, setTimeoutMessage] = useState("")
  const [startTime, setStartTime] = useState(0)
  const [mounted, setMounted] = useState(false)

  const startTimer = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true)
      intervalRef.current = setInterval(() => {
        setCount(prev => prev + 1)
      }, 1000)

      // Also set a timeout for a message
      timeoutRef.current = setTimeout(() => {
        setTimeoutMessage("Timer has been running for 10 seconds!")
      }, 10000)
    }
  }, [isRunning])

  const stopTimer = useCallback(() => {
    setIsRunning(false)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  const resetTimer = useCallback(() => {
    stopTimer()
    setCount(0)
    setTimeoutMessage("")
  }, [stopTimer])

  useEffect(() => {
    // Set start time and initialize on client side only
    const currentTime = Date.now()
    setStartTime(currentTime)
    setMounted(true)

    // Start interval timer
    intervalRef.current = setInterval(() => {
      setCount(prev => prev + 1)
    }, 1000)

    // Set timeout for message
    timeoutRef.current = setTimeout(() => {
      setTimeoutMessage("Timer has been running for 10 seconds!")
    }, 10000)

    // Cleanup function for this effect (though we use useOnUnmountEffect for demo)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  // Clear timers only on unmount
  useOnUnmountEffect(() => {
    console.log("Clearing all timers on unmount...")
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  })

  const getElapsedTime = () => {
    if (!mounted || !startTime) return 0
    return Math.floor((Date.now() - startTime) / 1000)
  }

  return (
    <div className="border rounded-lg p-4 bg-gradient-to-r from-muted/30 to-muted/50">
      <h3 className="font-semibold mb-2">Timer Component</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This component runs timers that are cleaned up only when the component unmounts.
      </p>

      <div className="space-y-3">
        <div className="bg-card rounded p-4">
          <div className="grid grid-cols-3 gap-4 text-center mb-4">
            <div className="text-2xl font-bold text-secondary">
              {count}
              <div className="text-xs text-muted-foreground">Counter</div>
            </div>
            <div className="text-2xl font-bold text-secondary">
              {getElapsedTime()}s<div className="text-xs text-muted-foreground">Elapsed</div>
            </div>
            <div
              className={`text-2xl font-bold ${isRunning ? "text-secondary" : "text-muted-foreground"}`}
            >
              {isRunning ? "▶" : "⏸"}
              <div className="text-xs text-muted-foreground">Status</div>
            </div>
          </div>

          <div className="flex gap-2 justify-center mb-4">
            <Button onClick={startTimer} disabled={isRunning} size="sm" variant="outline">
              Start
            </Button>
            <Button onClick={stopTimer} disabled={!isRunning} size="sm" variant="outline">
              Stop
            </Button>
            <Button onClick={resetTimer} size="sm" variant="outline">
              Reset
            </Button>
          </div>

          {timeoutMessage && (
            <div className="p-2 bg-warn-soft/10 text-foreground rounded text-sm">
              {timeoutMessage}
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground bg-purple-900/10 p-3 rounded">
          <strong>Timer Details:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>
              <strong>Interval:</strong> Updates counter every second while running
            </li>
            <li>
              <strong>Timeout:</strong> Shows message after 10 seconds of runtime
            </li>
            <li>
              <strong>Cleanup:</strong> Both timers cleared only on component unmount
            </li>
            <li>
              <strong>Memory Safe:</strong> Prevents memory leaks from abandoned timers
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
