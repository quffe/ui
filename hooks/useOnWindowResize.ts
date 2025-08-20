"use client"

import * as React from "react"

export const useOnWindowResize = (handler: { (): void }) => {
  // Use useRef to store the latest handler without causing re-renders
  const handlerRef = React.useRef(handler)

  // Update the ref whenever handler changes
  React.useEffect(() => {
    handlerRef.current = handler
  })

  React.useEffect(() => {
    const handleResize = () => {
      handlerRef.current()
    }

    // Call handler initially to get current window size
    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, []) // Empty dependency array - only runs once
}
