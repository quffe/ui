"use client"

import * as React from "react"

/**
 * A hook that provides SSR-safe layout effects
 *
 * This hook uses useLayoutEffect on the client side and useEffect on the server side,
 * preventing hydration mismatches in SSR applications. It's perfect for code that needs
 * to run synchronously with DOM mutations but also needs to be SSR-compatible.
 *
 * Features:
 * - SSR-safe implementation
 * - Client-side: uses useLayoutEffect (synchronous)
 * - Server-side: uses useEffect (async, no DOM)
 * - Prevents hydration mismatches
 * - TypeScript support
 * - Drop-in replacement for useLayoutEffect
 *
 * @param effect - The effect function to run
 * @param dependencies - Dependencies array to watch for changes
 *
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
 *   const ref = useRef<HTMLDivElement>(null)
 *
 *   useIsomorphicLayoutEffect(() => {
 *     if (ref.current) {
 *       const rect = ref.current.getBoundingClientRect()
 *       setDimensions({ width: rect.width, height: rect.height })
 *     }
 *   }, [])
 *
 *   return <div ref={ref}>Size: {dimensions.width}x{dimensions.height}</div>
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Theme setup that works with SSR
 * function ThemeProvider({ children, theme }: { children: React.ReactNode, theme: string }) {
 *   useIsomorphicLayoutEffect(() => {
 *     // This runs synchronously on client, safely on server
 *     document.documentElement.setAttribute('data-theme', theme)
 *
 *     return () => {
 *       document.documentElement.removeAttribute('data-theme')
 *     }
 *   }, [theme])
 *
 *   return <div className="theme-provider">{children}</div>
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Focus management with SSR support
 * function AutoFocusInput({ autoFocus }: { autoFocus?: boolean }) {
 *   const inputRef = useRef<HTMLInputElement>(null)
 *
 *   useIsomorphicLayoutEffect(() => {
 *     if (autoFocus && inputRef.current) {
 *       inputRef.current.focus()
 *     }
 *   }, [autoFocus])
 *
 *   return <input ref={inputRef} placeholder="Auto-focused input" />
 * }
 * ```
 */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

/**
 * A mount-only version of useIsomorphicLayoutEffect
 *
 * Combines the SSR-safety of useIsomorphicLayoutEffect with the mount-only
 * behavior of useOnMountEffect. Perfect for one-time setup that needs to
 * be synchronous on the client but SSR-safe.
 *
 * @param effect - The effect function to run on mount
 * @param dependencies - Optional dependencies array (captured on first render only)
 *
 * @example
 * ```tsx
 * function SSRSafeComponent() {
 *   const ref = useRef<HTMLDivElement>(null)
 *
 *   useIsomorphicMountEffect(() => {
 *     // Runs once on mount, synchronously on client, safely on server
 *     if (ref.current) {
 *       const height = ref.current.offsetHeight
 *       console.log('Initial height:', height)
 *     }
 *   })
 *
 *   return <div ref={ref}>SSR-safe content</div>
 * }
 * ```
 */
export function useIsomorphicMountEffect(
  effect: React.EffectCallback,
  dependencies?: React.DependencyList
): void {
  const hasRunRef = React.useRef(false)
  const cleanupRef = React.useRef<void | (() => void) | undefined>(undefined)

  useIsomorphicLayoutEffect(() => {
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
  }, dependencies) // eslint-disable-line react-hooks/exhaustive-deps
}

export default useIsomorphicLayoutEffect
