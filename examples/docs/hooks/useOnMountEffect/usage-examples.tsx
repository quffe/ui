"use client"

import { useOnMountEffect, useStrictMountEffect, useHasMounted } from "@/hooks/useOnMountEffect"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Loader2 } from "lucide-react"

// Basic usage - runs once on mount
function BasicMountComponent() {
  const [mountTime, setMountTime] = useState<string>("")
  const [cleanupTime, setCleanupTime] = useState<string>("")

  useOnMountEffect(() => {
    console.log("Component mounted!")
    setMountTime(new Date().toLocaleTimeString())

    // Optional cleanup
    return () => {
      console.log("Component unmounting")
      setCleanupTime(new Date().toLocaleTimeString())
    }
  })

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <CheckCircle className="h-4 w-4 text-green-500" />
        <span>Basic mount effect active</span>
      </div>
      {mountTime && (
        <p className="text-sm text-muted-foreground">
          Mounted at: <code>{mountTime}</code>
        </p>
      )}
      {cleanupTime && (
        <p className="text-sm text-muted-foreground">
          Cleanup ran at: <code>{cleanupTime}</code>
        </p>
      )}
    </div>
  )
}

// Strict mount effect - ignores all dependencies
function StrictComponent() {
  const [initialized, setInitialized] = useState(false)

  useStrictMountEffect(() => {
    // This runs exactly once, no matter what
    setTimeout(() => {
      console.log("App initialized!")
      setInitialized(true)
    }, 1000)
  })

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        {initialized ? (
          <>
            <CheckCircle className="h-4 w-4 text-green-500" />
            <span>App initialized</span>
          </>
        ) : (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Initializing app...</span>
          </>
        )}
      </div>
      <Badge variant={initialized ? "default" : "secondary"}>
        Strict mount effect: {initialized ? "Complete" : "Running"}
      </Badge>
    </div>
  )
}

// Check if component has mounted
function ConditionalComponent() {
  const hasMounted = useHasMounted()

  if (!hasMounted) {
    return (
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <CheckCircle className="h-4 w-4 text-green-500" />
      <span>Component is mounted!</span>
    </div>
  )
}

export default function UsageExamplesExample() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Usage</CardTitle>
        </CardHeader>
        <CardContent>
          <BasicMountComponent />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Strict Mount Effect</CardTitle>
        </CardHeader>
        <CardContent>
          <StrictComponent />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Mount Status Check</CardTitle>
        </CardHeader>
        <CardContent>
          <ConditionalComponent />
        </CardContent>
      </Card>
    </div>
  )
}
