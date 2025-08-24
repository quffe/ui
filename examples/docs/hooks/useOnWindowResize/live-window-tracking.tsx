"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useEffect } from "react"
import { useOnWindowResize } from "@/hooks/useOnWindowResize"

export default function LiveWindowTrackingExample() {
  const [mounted, setMounted] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [resizeCount, setResizeCount] = useState(0)
  const [resizeHistory, setResizeHistory] = useState<Array<{size: {width: number, height: number}, timestamp: string}>>([])

  // Demonstrate the hook
  useOnWindowResize(() => {
    const newSize = {
      width: window.innerWidth,
      height: window.innerHeight,
    }
    setWindowSize(newSize)
    setResizeCount(prev => prev + 1)
    setResizeHistory(prev => [
      ...prev.slice(-4), // Keep last 4 entries
      {
        size: newSize,
        timestamp: new Date().toLocaleTimeString()
      }
    ])
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const getBreakpoint = () => {
    if (windowSize.width >= 1200) return { name: "xl", color: "text-secondary-foreground", description: "Extra Large" }
    if (windowSize.width >= 1024) return { name: "lg", color: "text-secondary", description: "Large" }
    if (windowSize.width >= 768) return { name: "md", color: "text-secondary", description: "Medium" }
    if (windowSize.width >= 640) return { name: "sm", color: "text-foreground", description: "Small" }
    return { name: "xs", color: "text-muted-foreground", description: "Extra Small" }
  }

  const getAspectRatio = () => {
    if (windowSize.width === 0) return "0:0"
    const ratio = windowSize.width / windowSize.height
    if (ratio > 1.7) return "16:9 (Wide)"
    if (ratio > 1.5) return "3:2"
    if (ratio > 1.2) return "4:3"
    return "Square/Portrait"
  }

  const breakpoint = getBreakpoint()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Live Window Size Tracking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Current Size Display */}
          <div className="bg-gradient-to-r from-muted/30 to-muted/50 rounded-lg p-4">
            <h3 className="font-semibold mb-3">Current Window Dimensions</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-card rounded p-3 text-center">
                <div className="text-2xl font-bold text-secondary">
                  {mounted ? windowSize.width : 0}
                </div>
                <div className="text-xs text-muted-foreground">Width (px)</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-2xl font-bold text-secondary">
                  {mounted ? windowSize.height : 0}
                </div>
                <div className="text-xs text-muted-foreground">Height (px)</div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className={`text-2xl font-bold ${breakpoint.color}`}>
                  {mounted ? breakpoint.name : "xs"}
                </div>
                <div className="text-xs text-muted-foreground">
                  {mounted ? breakpoint.description : "Loading..."}
                </div>
              </div>
              <div className="bg-card rounded p-3 text-center">
                <div className="text-2xl font-bold text-secondary-foreground">
                  {resizeCount}
                </div>
                <div className="text-xs text-muted-foreground">Resize Events</div>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-card rounded-lg border p-4">
            <h4 className="font-medium mb-3 text-sm">Window Properties</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <strong>Aspect Ratio:</strong>
                <div className="text-muted-foreground">{mounted ? getAspectRatio() : "Loading..."}</div>
              </div>
              <div>
                <strong>Orientation:</strong>
                <div className="text-muted-foreground">
                  {mounted ? (windowSize.width > windowSize.height ? "Landscape" : "Portrait") : "Loading..."}
                </div>
              </div>
              <div>
                <strong>Pixel Density:</strong>
                <div className="text-muted-foreground">
                  {mounted ? `${window.devicePixelRatio || 1}x` : "Loading..."}
                </div>
              </div>
            </div>
          </div>

          {/* Resize History */}
          {resizeHistory.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-3 text-sm">Recent Resize History</h4>
              <div className="space-y-2">
                {resizeHistory.map((entry, index) => (
                  <div key={index} className="flex justify-between text-xs bg-card rounded p-2">
                    <span>
                      {entry.size.width} x {entry.size.height}
                    </span>
                    <span className="text-muted-foreground">{entry.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="text-xs text-muted-foreground bg-warn-soft/10 p-3 rounded">
            <strong>Try this:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Resize your browser window to see values update in real-time</li>
              <li>Try different window sizes to see breakpoint changes</li>
              <li>The hook executes immediately on mount and on every resize</li>
              <li>Resize history shows the last few size changes with timestamps</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}