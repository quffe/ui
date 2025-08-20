import { useMobile } from "@/hooks/use-mobile"

export function CustomBreakpointExample() {
  // Custom breakpoint for tablet detection
  const isTablet = useMobile({ breakpoint: 1024 })
  
  // Custom breakpoint for small desktop
  const isSmallDesktop = useMobile({ breakpoint: 1200 })

  return (
    <div className="space-y-2">
      <div className="text-sm">
        Is tablet (≤1024px): <strong>{isTablet ? "Yes" : "No"}</strong>
      </div>
      <div className="text-sm">
        Is small desktop (≤1200px): <strong>{isSmallDesktop ? "Yes" : "No"}</strong>
      </div>
    </div>
  )
}