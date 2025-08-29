"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useOnMountEffect, useStrictMountEffect, useHasMounted } from "@/hooks/useOnMountEffect"

export default function LiveDemoExample() {
  const [mountCount, setMountCount] = useState(0)
  const [strictMountCount, setStrictMountCount] = useState(0)
  const [rerenderCount, setRerenderCount] = useState(0)
  const hasMounted = useHasMounted()

  // Demonstrate useOnMountEffect
  useOnMountEffect(() => {
    console.log("useOnMountEffect: Component mounted!")
    setMountCount(prev => prev + 1)

    return () => {
      console.log("useOnMountEffect: Cleanup on unmount")
    }
  })

  // Demonstrate useStrictMountEffect
  useStrictMountEffect(() => {
    console.log("useStrictMountEffect: Component mounted!")
    setStrictMountCount(prev => prev + 1)

    return () => {
      console.log("useStrictMountEffect: Cleanup on unmount")
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
        <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
          <div>
            useOnMountEffect runs: <strong>{mountCount} time(s)</strong>
          </div>
          <div>
            useStrictMountEffect runs: <strong>{strictMountCount} time(s)</strong>
          </div>
          <div>
            Component re-renders: <strong>{rerenderCount} time(s)</strong>
          </div>
          <div>
            Has mounted: <strong>{hasMounted ? "Yes" : "No"}</strong>
          </div>
        </div>
        <Button onClick={triggerRerender}>Trigger Re-render (count: {rerenderCount})</Button>
        <div className="text-xs text-muted-foreground mt-2">
          Notice how the mount effects only run once, even when re-rendering.
        </div>
      </CardContent>
    </Card>
  )
}
