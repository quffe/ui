'use client'

import * as React from 'react'

/** Default mobile breakpoint in pixels */
const DEFAULT_MOBILE_BREAKPOINT = 768

/**
 * Options for configuring the mobile detection hook
 */
export interface UseMobileOptions {
  /** Custom breakpoint in pixels (default: 768) */
  breakpoint?: number
  /** Initial value before hydration (default: false) */
  defaultValue?: boolean
  /** Whether to use SSR-safe mode (default: true) */
  ssrSafe?: boolean
}

/**
 * A hook that detects whether the current viewport is mobile-sized
 * 
 * Features:
 * - Responsive breakpoint detection
 * - SSR-safe with proper hydration
 * - Customizable breakpoint
 * - Automatic cleanup
 * - Performance optimized with matchMedia API
 * 
 * @param options - Configuration options
 * @returns boolean indicating if the viewport is mobile-sized
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const isMobile = useMobile()
 *   const isTablet = useMobile({ breakpoint: 1024 })
 *   
 *   return (
 *     <div>
 *       {isMobile ? 'Mobile Layout' : 'Desktop Layout'}
 *     </div>
 *   )
 * }
 * ```
 */
export function useMobile({
  breakpoint = DEFAULT_MOBILE_BREAKPOINT,
  defaultValue = false,
  ssrSafe = true,
}: UseMobileOptions = {}): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean>(
    ssrSafe ? defaultValue : () => {
      if (typeof window === 'undefined') return defaultValue
      return window.innerWidth < breakpoint
    }
  )
  
  const [isHydrated, setIsHydrated] = React.useState(!ssrSafe)

  React.useEffect(() => {
    if (typeof window === 'undefined') return

    // Handle hydration mismatch
    if (ssrSafe && !isHydrated) {
      setIsMobile(window.innerWidth < breakpoint)
      setIsHydrated(true)
      return
    }

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 1}px)`)
    
    const handleChange = (event: MediaQueryListEvent) => {
      setIsMobile(event.matches)
    }

    // Set initial value
    setIsMobile(mediaQuery.matches)

    // Add listener
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange)
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange)
      }
    }
  }, [breakpoint, ssrSafe, isHydrated])

  return isMobile
}

/**
 * Legacy export for backward compatibility
 * @deprecated Use `useMobile` instead
 */
export const useIsMobile = () => useMobile()