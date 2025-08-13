"use client"

import * as React from "react"

/**
 * A hook that runs a layout effect only once when the component mounts
 *
 * Similar to useOnMountEffect but uses useLayoutEffect instead of useEffect.
 * This fires synchronously after all DOM mutations but before the browser paints.
 * Use this when you need to make DOM measurements or mutations that must happen
 * before the browser paints to avoid visual inconsistencies.
 *
 * Features:
 * - Runs layout effect only on first mount
 * - Ignores dependency changes after first run
 * - Proper cleanup handling
 * - TypeScript support
 * - Synchronous execution before browser paint
 *
 * @param effect - The layout effect function to run on mount
 * @param dependencies - Optional dependencies array (effect runs when these change on first render only)
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const ref = useRef<HTMLDivElement>(null)
 *
 *   useOnMountLayoutEffect(() => {
 *     // Measure DOM element before paint
 *     if (ref.current) {
 *       const height = ref.current.offsetHeight
 *       console.log('Element height:', height)
 *     }
 *
 *     return () => {
 *       console.log('Cleanup on unmount')
 *     }
 *   })
 *
 *   return <div ref={ref}>Component content</div>
 * }
 * ```
 *
 * @example
 * ```tsx
 * // With dependencies (still only runs once)
 * function MyComponent({ theme }: { theme: string }) {
 *   useOnMountLayoutEffect(() => {
 *     // Apply theme synchronously before paint
 *     document.documentElement.setAttribute('data-theme', theme)
 *   }, [theme]) // theme is captured on mount, changes ignored
 *
 *   return <div>Themed content</div>
 * }
 * ```
 */
export function useOnMountLayoutEffect(
  effect: React.EffectCallback,
  dependencies?: React.DependencyList
): void {
  const hasRunRef = React.useRef(false)
  const cleanupRef = React.useRef<void | (() => void) | undefined>(undefined)

  React.useLayoutEffect(() => {
    if (!hasRunRef.current) {
      hasRunRef.current = true
      cleanupRef.current = effect()
    }

    // Return cleanup function that calls the original cleanup
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = undefined
      }
    }
  }, dependencies) // eslint-disable-line react-hooks/exhaustive-deps
}

/**
 * A hook that runs a layout effect only once on the first render, ignoring all dependencies
 *
 * This is a stricter version of useOnMountLayoutEffect that completely ignores dependencies.
 * Uses useLayoutEffect for synchronous execution before browser paint.
 *
 * @param effect - The layout effect function to run on mount
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   useStrictMountLayoutEffect(() => {
 *     // This runs exactly once before paint, no matter what
 *     setupCriticalStyles()
 *   })
 *
 *   return <div>App content</div>
 * }
 * ```
 */
export function useStrictMountLayoutEffect(effect: React.EffectCallback): void {
  const hasRunRef = React.useRef(false)
  const cleanupRef = React.useRef<void | (() => void) | undefined>(undefined)

  React.useLayoutEffect(() => {
    if (!hasRunRef.current) {
      hasRunRef.current = true
      cleanupRef.current = effect()
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current()
        cleanupRef.current = undefined
      }
    }
  }, []) // No dependencies
}

export default useOnMountLayoutEffect
