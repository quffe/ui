"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useRef } from "react"
import { useOnUnmountEffect } from "@/hooks/useOnUnmountEffect"

// Move DemoComponent outside to prevent recreation on parent renders
function DemoComponent({ onUnmount }: { onUnmount: () => void }) {
  // Use ref to store callback to prevent recreation issues
  const onUnmountRef = useRef(onUnmount)
  onUnmountRef.current = onUnmount

  useOnUnmountEffect(() => {
    console.log("DemoComponent is unmounting!")
    onUnmountRef.current()
  })

  return (
    <div className="border rounded-lg p-4 bg-green-900/10">
      <h4 className="font-medium">Demo Component</h4>
      <p className="text-sm text-muted-foreground">
        This component will log to console when unmounted and increment the counter.
      </p>
      <div className="mt-2 p-2 bg-card rounded text-sm">
        <strong>Status:</strong> Currently mounted and active
      </div>
    </div>
  )
}

export default function LiveDemoExample() {
  const [componentMounted, setComponentMounted] = useState(true)
  const [unmountCount, setUnmountCount] = useState(0)

  // Use ref to store the increment function to prevent recreation
  const incrementUnmountCount = () => {
    setUnmountCount(prev => prev + 1)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Live Demonstration</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="mb-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  Component unmount count: <strong>{unmountCount}</strong>
                </div>
                <div>
                  Component mounted: <strong>{componentMounted ? 'Yes' : 'No'}</strong>
                </div>
              </div>
            </div>
            <Button
              onClick={() => setComponentMounted(!componentMounted)}
              variant={componentMounted ? "destructive" : "default"}
              size="sm"
            >
              {componentMounted ? "Unmount Component" : "Mount Component"}
            </Button>
          </div>

          <div className="min-h-24">
            {componentMounted && <DemoComponent onUnmount={incrementUnmountCount} />}
          </div>

          <div className="text-xs text-muted-foreground bg-secondary/10 p-3 rounded">
            <strong>How it works:</strong>
            <ul className="list-disc list-inside mt-1 space-y-1">
              <li>Click "Unmount Component" to trigger the cleanup function</li>
              <li>Check the browser console to see unmount logs</li>
              <li>The counter increases each time the component unmounts</li>
              <li>The hook only runs cleanup, never on mount or re-renders</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}