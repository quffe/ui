"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState, useRef } from "react"
import { useOnMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"

export default function DOMMeasurementsExample() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const ref = useRef<HTMLDivElement>(null)

  useOnMountLayoutEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect()
      setDimensions({
        width: rect.width,
        height: rect.height
      })
    }
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">DOM Measurements</CardTitle>
      </CardHeader>
      <CardContent>
        <div ref={ref} className="border rounded-lg p-4 bg-gradient-to-r from-muted/30 to-muted/50">
          <h3 className="font-semibold mb-2">Responsive Component</h3>
          <p className="text-sm text-muted-foreground mb-4">
            This component measures its own dimensions on mount using useOnMountLayoutEffect.
          </p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-card rounded p-2">
              <strong>Width:</strong> {dimensions.width.toFixed(2)}px
            </div>
            <div className="bg-card rounded p-2">
              <strong>Height:</strong> {dimensions.height.toFixed(2)}px
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2">
            Measurements are taken synchronously before paint to prevent layout shifts.
          </div>
        </div>
      </CardContent>
    </Card>
  )
}