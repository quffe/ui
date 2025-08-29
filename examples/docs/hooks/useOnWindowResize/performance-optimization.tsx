"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useRef, useCallback } from "react"
import { useOnWindowResize } from "@/hooks/useOnWindowResize"

// Custom debounce hook for expensive operations
function useDebounce<T extends (...args: never[]) => void>(fn: T, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined)

  return useCallback(
    (...args: Parameters<T>) => {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = setTimeout(() => fn(...args), delay)
    },
    [fn, delay]
  )
}

export default function PerformanceOptimizationExample() {
  const [layout, setLayout] = useState("desktop")
  const [immediateCallCount, setImmediateCallCount] = useState(0)
  const [debouncedCallCount, setDebouncedCallCount] = useState(0)
  const [throttledCallCount, setThrottledCallCount] = useState(0)
  const [currentWidth, setCurrentWidth] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)

  // Simulate expensive layout calculation
  const calculateOptimalLayout = (width: number) => {
    setIsCalculating(true)

    // Simulate heavy computation
    const startTime = performance.now()
    let result = 0
    for (let i = 0; i < 1000000; i++) {
      result += Math.sqrt(i)
    }
    const endTime = performance.now()

    console.log(`Layout calculation took ${(endTime - startTime).toFixed(2)}ms`)

    let newLayout
    if (width >= 1200) newLayout = "desktop-xl"
    else if (width >= 1024) newLayout = "desktop"
    else if (width >= 768) newLayout = "tablet"
    else if (width >= 640) newLayout = "mobile-lg"
    else newLayout = "mobile-sm"

    setLayout(newLayout)
    setIsCalculating(false)

    return newLayout
  }

  // Debounced version for expensive operations
  const debouncedCalculation = useDebounce(() => {
    const width = window.innerWidth
    setCurrentWidth(width)
    calculateOptimalLayout(width)
    setDebouncedCallCount(prev => prev + 1)
  }, 300) // Debounce by 300ms

  // Throttled version (simple implementation)
  const throttledCalculation = useCallback(() => {
    const now = Date.now()
    const throttleRef = (throttledCalculation as any).lastCall || 0

    if (now - throttleRef >= 250) {
      // Throttle to max once per 250ms
      ;(throttledCalculation as any).lastCall = now
      const width = window.innerWidth
      setCurrentWidth(width)
      calculateOptimalLayout(width)
      setThrottledCallCount(prev => prev + 1)
    }
  }, [])

  // Immediate (unoptimized) version
  const immediateCalculation = () => {
    const width = window.innerWidth
    setCurrentWidth(width)
    calculateOptimalLayout(width)
    setImmediateCallCount(prev => prev + 1)
  }

  // Hook up to window resize - using debounced version for best performance
  useOnWindowResize(debouncedCalculation)

  const reset = () => {
    setImmediateCallCount(0)
    setDebouncedCallCount(0)
    setThrottledCallCount(0)
  }

  const getLayoutColor = () => {
    switch (layout) {
      case "desktop-xl":
        return "text-secondary-foreground"
      case "desktop":
        return "text-secondary"
      case "tablet":
        return "text-secondary"
      case "mobile-lg":
        return "text-foreground"
      case "mobile-sm":
        return "text-muted-foreground"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Performance Optimization</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Performance Metrics */}
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Optimization Comparison</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-muted-foreground">{immediateCallCount}</div>
                <div className="text-xs text-muted-foreground">Immediate Calls</div>
                <div className="text-xs text-muted-foreground mt-1">High CPU usage</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-secondary">{debouncedCallCount}</div>
                <div className="text-xs text-muted-foreground">Debounced Calls</div>
                <div className="text-xs text-secondary mt-1">Optimal</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-lg font-bold text-foreground">{throttledCallCount}</div>
                <div className="text-xs text-muted-foreground">Throttled Calls</div>
                <div className="text-xs text-foreground mt-1">Good balance</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className={`text-lg font-bold ${getLayoutColor()}`}>{layout}</div>
                <div className="text-xs text-muted-foreground">Current Layout</div>
                <div className="text-xs text-muted-foreground mt-1">{currentWidth}px</div>
              </div>
            </div>
          </div>

          {/* Test Buttons */}
          <div className="bg-card border rounded-lg p-4">
            <h4 className="font-medium mb-3">Performance Test Controls</h4>
            <div className="flex flex-wrap gap-2 mb-4">
              <Button
                onClick={immediateCalculation}
                variant="outline"
                size="sm"
                className="text-muted-foreground border-border hover:bg-red-soft/10"
              >
                Run Immediate (Bad)
              </Button>
              <Button
                onClick={debouncedCalculation}
                variant="outline"
                size="sm"
                className="text-secondary border-green-200 hover:bg-green-900/10"
              >
                Run Debounced (Good)
              </Button>
              <Button
                onClick={throttledCalculation}
                variant="outline"
                size="sm"
                className="text-foreground border-orange-200 hover:bg-orange-900/10"
              >
                Run Throttled (Ok)
              </Button>
              <Button onClick={reset} variant="outline" size="sm">
                Reset Counters
              </Button>
            </div>

            {isCalculating && (
              <div className="text-sm text-secondary bg-secondary/10 p-2 rounded">
                🔄 Calculating optimal layout... (simulating heavy computation)
              </div>
            )}
          </div>

          {/* Layout Visualization */}
          <div className="bg-card border rounded-lg p-4">
            <h4 className="font-medium mb-3">Layout Optimization Result</h4>
            <div
              className={`p-4 rounded-lg ${
                layout === "desktop-xl"
                  ? "bg-purple-900/10"
                  : layout === "desktop"
                    ? "bg-secondary/10"
                    : layout === "tablet"
                      ? "bg-green-900/10"
                      : layout === "mobile-lg"
                        ? "bg-warn-soft/10"
                        : "bg-red-soft/10 border-red-soft/30"
              } border`}
            >
              <div className={`text-lg font-bold ${getLayoutColor()}`}>
                {layout.toUpperCase()} LAYOUT
              </div>
              <div className="text-sm text-muted-foreground mt-2">
                Optimized layout calculated based on current window size: {currentWidth}px
              </div>

              {/* Mock layout elements */}
              <div
                className="mt-4 grid gap-2"
                style={{
                  gridTemplateColumns:
                    layout === "desktop-xl"
                      ? "repeat(4, 1fr)"
                      : layout === "desktop"
                        ? "repeat(3, 1fr)"
                        : layout === "tablet"
                          ? "repeat(2, 1fr)"
                          : "repeat(1, 1fr)",
                }}
              >
                {Array.from({ length: layout === "mobile-sm" ? 2 : 4 }, (_, i) => (
                  <div key={i} className="bg-card p-3 rounded border text-center text-sm">
                    Item {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Performance Explanation */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-medium mb-3 text-sm">Optimization Techniques</h4>
            <div className="space-y-3 text-sm">
              <div className="border-l-4 border-red-soft pl-3">
                <strong className="text-muted-foreground">Immediate (No optimization):</strong>
                <div className="text-muted-foreground">
                  Runs expensive calculation on every resize event. Can cause performance issues
                  with rapid window resizing.
                </div>
              </div>

              <div className="border-l-4 border-green-400 pl-3">
                <strong className="text-secondary">Debounced (Recommended):</strong>
                <div className="text-muted-foreground">
                  Waits for resize events to stop for 300ms before calculating. Best for expensive
                  operations that don't need immediate feedback.
                </div>
              </div>

              <div className="border-l-4 border-orange-400 pl-3">
                <strong className="text-foreground">Throttled (Good balance):</strong>
                <div className="text-muted-foreground">
                  Limits calculation to maximum once every 250ms during continuous resizing. Good
                  for operations needing responsive feedback.
                </div>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-xs text-muted-foreground bg-secondary/10 p-3 rounded">
            <strong>Performance Test:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Resize your window rapidly and watch the counter differences</li>
              <li>Click the test buttons to manually trigger calculations</li>
              <li>Check browser console for performance timing logs</li>
              <li>Debounced version shows significantly fewer calls during rapid resizing</li>
              <li>In real apps, use debouncing for expensive layout recalculations</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
