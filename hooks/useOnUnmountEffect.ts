"use client"

import * as React from "react"

/**
 * A hook that runs cleanup logic only when the component unmounts
 *
 * This hook is useful when you need to perform cleanup operations
 * that should only happen when the component is being destroyed,
 * not during re-renders or updates.
 *
 * Features:
 * - Runs cleanup only on unmount
 * - No dependency tracking
 * - Memory efficient
 * - TypeScript support
 * - Perfect for resource cleanup
 *
 * @param cleanup - The cleanup function to run on unmount
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useOnUnmountEffect(() => {
 *     console.log('Component is unmounting')
 *     // Cleanup resources, cancel subscriptions, etc.
 *   })
 *
 *   return <div>Component content</div>
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Cleanup event listeners on unmount
 * function WindowEventComponent() {
 *   useOnUnmountEffect(() => {
 *     // This only runs when component unmounts
 *     document.removeEventListener('keydown', handleKeyDown)
 *     window.removeEventListener('resize', handleResize)
 *   })
 *
 *   return <div>App content</div>
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Cancel network requests or timers
 * function DataComponent() {
 *   const abortControllerRef = useRef(new AbortController())
 *
 *   useOnUnmountEffect(() => {
 *     // Cancel any pending requests
 *     abortControllerRef.current.abort()
 *   })
 *
 *   return <div>Data component</div>
 * }
 * ```
 */
export function useOnUnmountEffect(cleanup: () => void): void {
  const cleanupRef = React.useRef(cleanup)
  
  // Store the latest cleanup function
  cleanupRef.current = cleanup

  // Set up the effect only once
  React.useEffect(() => {
    return () => {
      cleanupRef.current()
    }
  }, []) // Empty deps - only runs on mount/unmount
}

export default useOnUnmountEffect
