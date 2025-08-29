"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useOnMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"
import { useState } from "react"

export default function ScrollPositionRestorationExample() {
  const [scrollKey] = useState("scroll-demo")
  const [scrollPosition, setScrollPosition] = useState({ x: 0, y: 0 })
  const [isRestored, setIsRestored] = useState(false)

  useOnMountLayoutEffect(() => {
    // Restore scroll position before paint to prevent jump
    const savedPosition = sessionStorage.getItem(`scroll-${scrollKey}`)
    if (savedPosition) {
      const position = JSON.parse(savedPosition)
      window.scrollTo(position.x, position.y)
      setScrollPosition(position)
      setIsRestored(true)
    }

    const savePosition = () => {
      const newPosition = {
        x: window.scrollX,
        y: window.scrollY,
      }
      sessionStorage.setItem(`scroll-${scrollKey}`, JSON.stringify(newPosition))
      setScrollPosition(newPosition)
    }

    window.addEventListener("beforeunload", savePosition)
    window.addEventListener("scroll", savePosition)

    return () => {
      window.removeEventListener("beforeunload", savePosition)
      window.removeEventListener("scroll", savePosition)
    }
  }, [scrollKey])

  const simulatePageNavigation = () => {
    // Simulate leaving and returning to page by reloading
    window.location.reload()
  }

  const resetScrollPosition = () => {
    sessionStorage.removeItem(`scroll-${scrollKey}`)
    window.scrollTo(0, 0)
    setScrollPosition({ x: 0, y: 0 })
    setIsRestored(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Scroll Position Restoration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg p-4 bg-gradient-to-r from-muted/30 to-muted/50">
            <h3 className="font-semibold mb-2">Scroll Restorer</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Scroll down on this page, then refresh to see position restoration in action.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div className="bg-card rounded p-2">
                <strong>Scroll X:</strong> {scrollPosition.x}px
              </div>
              <div className="bg-card rounded p-2">
                <strong>Scroll Y:</strong> {scrollPosition.y}px
              </div>
            </div>

            <div className="flex gap-2 mb-4">
              <Button onClick={simulatePageNavigation} size="sm" variant="outline">
                Refresh Page (Test Restoration)
              </Button>
              <Button onClick={resetScrollPosition} size="sm" variant="outline">
                Reset Saved Position
              </Button>
            </div>

            <div
              className={`text-xs p-2 rounded ${isRestored ? "bg-green-900/20 text-secondary" : "bg-muted text-gray-600"}`}
            >
              {isRestored
                ? "✓ Scroll position was restored on mount"
                : "ℹ No saved scroll position found"}
            </div>
          </div>

          {/* Add some content to make scrolling possible */}
          <div className="space-y-4">
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className="border rounded p-4 bg-muted/50">
                <h4 className="font-medium">Content Block {i + 1}</h4>
                <p className="text-sm text-muted-foreground">
                  This is content block {i + 1}. Scroll down to see more blocks and test the scroll
                  restoration feature.
                </p>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
