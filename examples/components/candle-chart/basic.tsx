"use client"

import { CandleChart } from "@/components/Data/CandleChart"

const candles = [
  { open: 134.2, high: 136.9, low: 133.5, close: 136.1, label: "Mon" },
  { open: 136.1, high: 137.8, low: 134.7, close: 135.2, label: "Tue" },
  { open: 135.2, high: 138.4, low: 134.9, close: 137.9, label: "Wed" },
  { open: 137.9, high: 139.2, low: 136.8, close: 138.6, label: "Thu" },
  { open: 138.6, high: 140.4, low: 137.1, close: 139.8, label: "Fri" },
  { open: 139.8, high: 142.3, low: 139.2, close: 141.7, label: "Mon" },
  { open: 141.7, high: 143.1, low: 140.6, close: 142.8, label: "Tue" },
  { open: 142.8, high: 144.0, low: 141.2, close: 141.9, label: "Wed" },
  { open: 141.9, high: 143.7, low: 140.4, close: 140.9, label: "Thu" },
  { open: 140.9, high: 142.6, low: 139.8, close: 142.3, label: "Fri" },
  { open: 142.3, high: 144.9, low: 141.7, close: 144.2, label: "Mon" },
  { open: 144.2, high: 145.1, low: 142.6, close: 143.0, label: "Tue" },
]

export function Example() {
  return (
    <div className="space-y-3">
      <CandleChart data={candles} />
      <p className="text-xs text-muted-foreground">Hover to inspect O/H/L/C and labels.</p>
    </div>
  )
}
