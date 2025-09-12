"use client"

import { useMobile } from "@/hooks/use-mobile"
import { useState, useEffect } from "react"

export function BasicUsageExample() {
  const isMobile = useMobile()
  const isTablet = useMobile({ breakpoint: 1024 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="border rounded-lg p-4">
      <div className="text-sm mb-2">
        Current viewport:{" "}
        <strong>{mounted ? (isMobile ? "Mobile" : "Desktop") : "Loading..."}</strong>
      </div>
      <div className="text-sm">
        Is tablet or smaller: <strong>{mounted ? (isTablet ? "Yes" : "No") : "Loading..."}</strong>
      </div>
    </div>
  )
}

