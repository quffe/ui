'use client'

import { useMobile } from "@/hooks/use-mobile"

export function Example() {
  const isMobile = useMobile()

  return (
    <div className="text-center p-4">
      <div className="text-lg font-semibold mb-2">
        Device: {isMobile ? "📱 Mobile" : "💻 Desktop"}
      </div>
      <div className="text-sm text-muted-foreground">Resize your window to see the change</div>
    </div>
  )
}
