import { useOnMountLayoutEffect } from "@/hooks/useOnMountLayoutEffect"
import { useState, useRef } from "react"

export function Example() {
  const [measurements, setMeasurements] = useState({ width: 0, height: 0, timing: "" })
  const elementRef = useRef<HTMLDivElement>(null)

  useOnMountLayoutEffect(() => {
    const startTime = performance.now()
    if (elementRef.current) {
      const rect = elementRef.current.getBoundingClientRect()
      const endTime = performance.now()
      setMeasurements({
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        timing: `${(endTime - startTime).toFixed(2)}ms`
      })
    }
  })

  return (
    <div className="text-center space-y-4">
      <div className="text-lg font-bold">Layout Effect Measurement</div>
      
      <div ref={elementRef} className="mx-auto p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg border-2 border-dashed border-blue-300 max-w-xs">
        <div className="text-sm font-medium">Measured Element</div>
        <div className="text-xs text-muted-foreground mt-1">This element was measured before paint</div>
      </div>

      <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto">
        <div className="p-2 bg-muted rounded text-center">
          <div className="text-xs text-muted-foreground">Width</div>
          <div className="text-sm font-semibold">{measurements.width}px</div>
        </div>
        <div className="p-2 bg-muted rounded text-center">
          <div className="text-xs text-muted-foreground">Height</div>
          <div className="text-sm font-semibold">{measurements.height}px</div>
        </div>
        <div className="p-2 bg-muted rounded text-center">
          <div className="text-xs text-muted-foreground">Timing</div>
          <div className="text-sm font-semibold">{measurements.timing}</div>
        </div>
      </div>

      <div className="text-xs text-muted-foreground">
        ✅ Measured synchronously before browser paint
      </div>
    </div>
  )
}