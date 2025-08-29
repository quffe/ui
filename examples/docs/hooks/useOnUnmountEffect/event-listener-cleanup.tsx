"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useState, useEffect, useRef } from "react"
import { useOnUnmountEffect } from "@/hooks/useOnUnmountEffect"

export default function EventListenerCleanupExample() {
  const [isComponentMounted, setIsComponentMounted] = useState(true)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Event Listener Cleanup</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex gap-2">
            <Button
              onClick={() => setIsComponentMounted(!isComponentMounted)}
              variant={isComponentMounted ? "destructive" : "default"}
              size="sm"
            >
              {isComponentMounted ? "Unmount Component" : "Mount Component"}
            </Button>
          </div>

          <div className="min-h-32">{isComponentMounted && <WindowEventComponent />}</div>
        </div>
      </CardContent>
    </Card>
  )
}

function WindowEventComponent() {
  const [keyPressed, setKeyPressed] = useState<string>("")
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })
  const [mounted, setMounted] = useState(false)

  // Use refs to store handlers so we can clean them up properly
  const handlersRef = useRef<
    | {
        keydown: (event: KeyboardEvent) => void
        resize: () => void
      }
    | undefined
  >(undefined)

  // Setup listeners in useEffect
  useEffect(() => {
    setMounted(true)
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    })

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setKeyPressed("Escape key detected!")
        setTimeout(() => setKeyPressed(""), 2000)
      }
    }

    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    // Store handlers in ref for cleanup
    handlersRef.current = { keydown: handleKeyDown, resize: handleResize }

    document.addEventListener("keydown", handleKeyDown)
    window.addEventListener("resize", handleResize)

    return () => {
      // Cleanup could happen here too, but we're demonstrating useOnUnmountEffect
    }
  }, [])

  // Cleanup only on unmount using useOnUnmountEffect
  useOnUnmountEffect(() => {
    console.log("Cleaning up event listeners...")
    if (handlersRef.current) {
      document.removeEventListener("keydown", handlersRef.current.keydown)
      window.removeEventListener("resize", handlersRef.current.resize)
    }
  })

  return (
    <div className="border rounded-lg p-4 bg-gradient-to-r from-muted/30 to-muted/50">
      <h3 className="font-semibold mb-2">Global Event Listener Component</h3>
      <p className="text-sm text-muted-foreground mb-4">
        This component listens to global keyboard and resize events. Cleanup happens only on
        unmount.
      </p>

      <div className="space-y-3">
        <div className="bg-card rounded p-3">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Component Status:</strong> {mounted ? "Mounted" : "Not Mounted"}
            </div>
            <div>
              <strong>Window Size:</strong> {windowSize.width} x {windowSize.height}
            </div>
          </div>

          {keyPressed && (
            <div className="mt-2 p-2 bg-green-900/20 text-secondary rounded text-sm">
              {keyPressed}
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground bg-secondary/10 p-3 rounded">
          <strong>Try this:</strong>
          <ul className="list-disc list-inside mt-1 space-y-1">
            <li>
              Press the <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Escape</kbd> key to
              trigger the keydown listener
            </li>
            <li>Resize your browser window to trigger the resize listener</li>
            <li>Unmount the component to see cleanup in console</li>
            <li>Check browser console for cleanup messages when unmounting</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
