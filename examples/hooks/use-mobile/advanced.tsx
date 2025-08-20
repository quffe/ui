import { useMobile } from "@/hooks/use-mobile"
import { useState, useEffect } from "react"

export function AdvancedExample() {
  const isMobile = useMobile()
  const isTablet = useMobile({ breakpoint: 1024 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="text-center p-4 space-y-4">
      <div className="text-lg font-bold">Multiple Breakpoint Detection</div>
      
      <div className="grid grid-cols-1 gap-3 max-w-sm mx-auto">
        <div className="p-3 bg-muted rounded-md">
          <div className="text-sm text-muted-foreground">Mobile (768px)</div>
          <div className="text-lg font-semibold">
            {mounted ? (isMobile ? "📱 Yes" : "💻 No") : "Loading..."}
          </div>
        </div>
        
        <div className="p-3 bg-muted rounded-md">
          <div className="text-sm text-muted-foreground">Tablet (1024px)</div>
          <div className="text-lg font-semibold">
            {mounted ? (isTablet ? "📱 Yes" : "💻 No") : "Loading..."}
          </div>
        </div>
      </div>
      
      <div className="text-xs text-muted-foreground">
        Resize your window to see the changes
      </div>
    </div>
  )
}