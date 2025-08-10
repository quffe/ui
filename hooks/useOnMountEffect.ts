'use client'

import * as React from 'react'

/**
 * A hook that runs an effect only once when the component mounts
 * 
 * This is useful when you need to ensure an effect runs exactly once,
 * even if the dependencies change or the component re-renders.
 * 
 * Features:
 * - Runs effect only on first mount
 * - Ignores dependency changes after first run
 * - Proper cleanup handling
 * - TypeScript support
 * 
 * @param effect - The effect function to run on mount
 * @param dependencies - Optional dependencies array (effect runs when these change on first render only)
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   useOnMountEffect(() => {
 *     console.log('This runs only once on mount')
 *     
 *     return () => {
 *       console.log('Cleanup on unmount')
 *     }
 *   })
 *   
 *   return <div>Component content</div>
 * }
 * ```
 * 
 * @example
 * ```tsx
 * // With dependencies (still only runs once)
 * function MyComponent({ userId }: { userId: string }) {
 *   useOnMountEffect(() => {
 *     fetchUserData(userId)
 *   }, [userId]) // userId is captured on mount, changes ignored
 *   
 *   return <div>User profile</div>
 * }
 * ```
 */
export function useOnMountEffect(
  effect: React.EffectCallback,
  dependencies?: React.DependencyList
): void {
  const hasRunRef = React.useRef(false)
  const cleanupRef = React.useRef<void | (() => void) | undefined>(undefined)

  React.useEffect(() => {
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
 * A hook that runs an effect only once on the first render, ignoring all dependencies
 * 
 * This is a stricter version of useOnMountEffect that completely ignores dependencies.
 * 
 * @param effect - The effect function to run on mount
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   useStrictMountEffect(() => {
 *     // This runs exactly once, no matter what
 *     initializeApp()
 *   })
 *   
 *   return <div>App content</div>
 * }
 * ```
 */
export function useStrictMountEffect(effect: React.EffectCallback): void {
  const hasRunRef = React.useRef(false)
  const cleanupRef = React.useRef<void | (() => void) | undefined>(undefined)

  React.useEffect(() => {
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

/**
 * A hook that tracks whether the component has mounted
 * 
 * Useful for conditional rendering or effects that should only run after mount.
 * 
 * @returns boolean indicating if the component has mounted
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const hasMounted = useHasMounted()
 *   
 *   if (!hasMounted) {
 *     return <div>Loading...</div>
 *   }
 *   
 *   return <div>Component is mounted!</div>
 * }
 * ```
 */
export function useHasMounted(): boolean {
  const [hasMounted, setHasMounted] = React.useState(false)
  
  React.useEffect(() => {
    setHasMounted(true)
  }, [])
  
  return hasMounted
}

/**
 * Legacy export for backward compatibility
 * @deprecated Use `useOnMountEffect` instead
 */
const useOnMountEffect_Legacy = (callback: () => void): void => {
  const renderRef = React.useRef(true)
  
  React.useEffect(() => {
    if (renderRef.current) {
      callback()
      renderRef.current = false
    }
  }, [callback])
}

export default useOnMountEffect