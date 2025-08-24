"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"
import { useOnMountLayoutEffect, useStrictMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"

export default function LiveDemoExample() {
  const [mountCount, setMountCount] = useState(0)
  const [strictMountCount, setStrictMountCount] = useState(0)
  const [rerenderCount, setRerenderCount] = useState(0)
  const [elementHeight, setElementHeight] = useState(0)
  const measureRef = useRef<HTMLDivElement>(null)

  // Demonstrate useOnMountLayoutEffect
  useOnMountLayoutEffect(() => {
    console.log("useOnMountLayoutEffect: Component mounted!")
    setMountCount(prev => prev + 1)

    // Measure element synchronously before paint
    if (measureRef.current) {
      const height = measureRef.current.offsetHeight
      setElementHeight(height)
    }

    return () => {
      console.log("useOnMountLayoutEffect: Cleanup on unmount")
    }
  })

  // Demonstrate useStrictMountLayoutEffect
  useStrictMountLayoutEffect(() => {
    console.log("useStrictMountLayoutEffect: Component mounted!")
    setStrictMountCount(prev => prev + 1)

    return () => {
      console.log("useStrictMountLayoutEffect: Cleanup on unmount")
    }
  })

  const triggerRerender = () => {
    setRerenderCount(prev => prev + 1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Live Demonstration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg p-4" ref={measureRef}>
          <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
            <div>
              useOnMountLayoutEffect runs: <strong>{mountCount} time(s)</strong>
            </div>
            <div>
              useStrictMountLayoutEffect runs: <strong>{strictMountCount} time(s)</strong>
            </div>
            <div>
              Component re-renders: <strong>{rerenderCount} time(s)</strong>
            </div>
            <div>
              Measured height: <strong>{elementHeight}px</strong>
            </div>
          </div>
          <Button onClick={triggerRerender}>
            Trigger Re-render (count: {rerenderCount})
          </Button>
          <div className="text-xs text-muted-foreground mt-2">
            Notice how the mount effects only run once, even when re-rendering, and the
            height is measured before paint.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}