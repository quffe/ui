"use client"

import { useOnMountEffect } from "@/hooks/useOnMountEffect"
import { useState } from "react"

export function Example() {
  const [mountTime, setMountTime] = useState<string>("")

  useOnMountEffect(() => {
    setMountTime(new Date().toLocaleTimeString())
    console.log("Component mounted!")
  })

  return (
    <div className="text-center p-4">
      <div className="text-lg font-semibold mb-2">Mount Time: {mountTime}</div>
      <div className="text-sm text-muted-foreground">
        This effect ran only once when component mounted
      </div>
    </div>
  )
}
