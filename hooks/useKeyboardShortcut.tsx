"use client"

import * as React from "react"

/**
 * Keyboard shortcut configuration
 */
export interface KeyboardShortcut {
  /** Unique identifier for the shortcut */
  id: string
  /** The key combination (e.g., "ctrl+k", "shift+?", "escape") */
  keys: string
  /** Description shown in tooltips and help */
  description: string
  /** Category for grouping shortcuts */
  category?: string
  /** Whether the shortcut is enabled */
  enabled?: boolean
  /** Priority for conflicting shortcuts (higher = more priority) */
  priority?: number
}

/**
 * Global keyboard shortcut registry
 */
class KeyboardShortcutRegistry {
  private shortcuts = new Map<string, KeyboardShortcut>()
  private listeners = new Map<string, Set<(event: KeyboardEvent) => void>>()
  private elementShortcuts = new Map<HTMLElement, KeyboardShortcut>()
  private showTooltips = false
  private tooltipListeners = new Set<() => void>()

  /**
   * Register a keyboard shortcut
   */
  register(shortcut: KeyboardShortcut, callback: (event: KeyboardEvent) => void) {
    const key = this.normalizeKeys(shortcut.keys)

    // Store shortcut config
    this.shortcuts.set(shortcut.id, { ...shortcut, keys: key })

    // Add callback listener
    if (!this.listeners.has(key)) {
      this.listeners.set(key, new Set())
    }
    this.listeners.get(key)!.add(callback)

    return () => this.unregister(shortcut.id, callback)
  }

  /**
   * Unregister a keyboard shortcut
   */
  unregister(shortcutId: string, callback: (event: KeyboardEvent) => void) {
    const shortcut = this.shortcuts.get(shortcutId)
    if (!shortcut) return

    const listeners = this.listeners.get(shortcut.keys)
    if (listeners) {
      listeners.delete(callback)
      if (listeners.size === 0) {
        this.listeners.delete(shortcut.keys)
      }
    }

    this.shortcuts.delete(shortcutId)
  }

  /**
   * Associate a shortcut with a DOM element (for tooltips)
   */
  associateElement(element: HTMLElement, shortcut: KeyboardShortcut) {
    this.elementShortcuts.set(element, shortcut)
  }

  /**
   * Remove element association
   */
  disassociateElement(element: HTMLElement) {
    this.elementShortcuts.delete(element)
  }

  /**
   * Handle keyboard events
   */
  handleKeyEvent = (event: KeyboardEvent) => {
    const key = this.getEventKey(event)
    const listeners = this.listeners.get(key)

    if (listeners && listeners.size > 0) {
      // Sort by priority if multiple listeners
      const sortedCallbacks = Array.from(listeners)

      // Execute callbacks (first one that doesn't call preventDefault wins)
      for (const callback of sortedCallbacks) {
        try {
          callback(event)
          if (event.defaultPrevented) {
            break
          }
        } catch (error) {
          console.error("Error executing keyboard shortcut:", error)
        }
      }
    }
  }

  /**
   * Toggle tooltip visibility
   */
  toggleTooltips(show?: boolean) {
    this.showTooltips = show !== undefined ? show : !this.showTooltips
    this.notifyTooltipListeners()
    return this.showTooltips
  }

  /**
   * Get tooltip visibility state
   */
  getTooltipVisibility() {
    return this.showTooltips
  }

  /**
   * Subscribe to tooltip visibility changes
   */
  onTooltipVisibilityChange(listener: () => void) {
    this.tooltipListeners.add(listener)
    return () => this.tooltipListeners.delete(listener)
  }

  /**
   * Get all registered shortcuts
   */
  getAllShortcuts() {
    return Array.from(this.shortcuts.values())
  }

  /**
   * Get shortcuts for a specific element
   */
  getElementShortcut(element: HTMLElement) {
    return this.elementShortcuts.get(element)
  }

  /**
   * Get all element shortcuts
   */
  getAllElementShortcuts() {
    return Array.from(this.elementShortcuts.entries())
  }

  private notifyTooltipListeners() {
    this.tooltipListeners.forEach(listener => {
      try {
        listener()
      } catch (error) {
        console.error("Error notifying tooltip listener:", error)
      }
    })
  }

  private normalizeKeys(keys: string): string {
    return keys.toLowerCase().split("+").sort().join("+")
  }

  private getEventKey(event: KeyboardEvent): string {
    const parts: string[] = []

    if (event.ctrlKey || event.metaKey) parts.push("ctrl")
    if (event.altKey) parts.push("alt")
    if (event.shiftKey) parts.push("shift")

    // Handle special keys
    const key = event.key.toLowerCase()
    if (key === " ") {
      parts.push("space")
    } else if (key === "escape") {
      parts.push("escape")
    } else if (key === "enter") {
      parts.push("enter")
    } else if (key === "tab") {
      parts.push("tab")
    } else if (key === "backspace") {
      parts.push("backspace")
    } else if (key === "delete") {
      parts.push("delete")
    } else if (key.startsWith("arrow")) {
      parts.push(key.replace("arrow", ""))
    } else if (key.startsWith("f") && /^f\d+$/.test(key)) {
      parts.push(key)
    } else if (key.length === 1) {
      parts.push(key)
    }

    return parts.sort().join("+")
  }
}

// Global registry instance
const globalRegistry = new KeyboardShortcutRegistry()

/**
 * Context for keyboard shortcuts
 */
export const KeyboardShortcutContext = React.createContext<{
  registry: KeyboardShortcutRegistry
  showTooltips: boolean
  toggleTooltips: (show?: boolean) => boolean
}>({
  registry: globalRegistry,
  showTooltips: false,
  toggleTooltips: () => false,
})

/**
 * Provider component for keyboard shortcuts
 */
export function KeyboardShortcutProvider({ children }: { children: React.ReactNode }) {
  const [showTooltips, setShowTooltips] = React.useState(false)

  React.useEffect(() => {
    // Set up global event listeners
    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle tooltips with Shift+?
      if (event.shiftKey && event.key === "?") {
        event.preventDefault()
        const newState = globalRegistry.toggleTooltips()
        setShowTooltips(newState)
        return
      }

      globalRegistry.handleKeyEvent(event)
    }

    document.addEventListener("keydown", handleKeyDown)

    // Listen for tooltip visibility changes
    const unsubscribe = globalRegistry.onTooltipVisibilityChange(() => {
      setShowTooltips(globalRegistry.getTooltipVisibility())
    })

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      unsubscribe()
    }
  }, [])

  const toggleTooltips = React.useCallback((show?: boolean) => {
    const newState = globalRegistry.toggleTooltips(show)
    setShowTooltips(newState)
    return newState
  }, [])

  const contextValue = React.useMemo(
    () => ({
      registry: globalRegistry,
      showTooltips,
      toggleTooltips,
    }),
    [showTooltips, toggleTooltips]
  )

  return (
    <KeyboardShortcutContext.Provider value={contextValue}>
      {children}
    </KeyboardShortcutContext.Provider>
  )
}

/**
 * Hook for registering keyboard shortcuts
 *
 * @param shortcut - The keyboard shortcut configuration
 * @param callback - Function to execute when shortcut is triggered
 * @param options - Additional options
 *
 * @example
 * ```tsx
 * function SearchModal() {
 *   const [isOpen, setIsOpen] = useState(false)
 *
 *   useKeyboardShortcut(
 *     {
 *       id: 'open-search',
 *       keys: 'ctrl+k',
 *       description: 'Open search modal',
 *       category: 'Navigation'
 *     },
 *     () => setIsOpen(true)
 *   )
 *
 *   return isOpen ? <Modal>Search content</Modal> : null
 * }
 * ```
 */
export function useKeyboardShortcut(
  shortcut: KeyboardShortcut,
  callback: (event: KeyboardEvent) => void,
  options: {
    enabled?: boolean
    preventDefault?: boolean
    stopPropagation?: boolean
  } = {}
) {
  const { registry } = React.useContext(KeyboardShortcutContext)
  const { enabled = true, preventDefault = true, stopPropagation = false } = options

  const wrappedCallback = React.useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      if (preventDefault) {
        event.preventDefault()
      }
      if (stopPropagation) {
        event.stopPropagation()
      }

      callback(event)
    },
    [callback, enabled, preventDefault, stopPropagation]
  )

  React.useEffect(() => {
    if (!enabled) return

    const unregister = registry.register(shortcut, wrappedCallback)
    return unregister
  }, [registry, shortcut, wrappedCallback, enabled])
}

/**
 * Hook for associating keyboard shortcuts with DOM elements (for tooltips)
 *
 * @param shortcut - The keyboard shortcut configuration
 * @param callback - Function to execute when shortcut is triggered
 * @param options - Additional options
 *
 * @example
 * ```tsx
 * function NavigationButton() {
 *   const ref = useKeyboardShortcutElement(
 *     {
 *       id: 'nav-home',
 *       keys: 'g h',
 *       description: 'Go to home page'
 *     },
 *     () => router.push('/'),
 *     { sequence: true }
 *   )
 *
 *   return <button ref={ref}>Home</button>
 * }
 * ```
 */
export function useKeyboardShortcutElement<T extends HTMLElement = HTMLElement>(
  shortcut: KeyboardShortcut,
  callback: (event: KeyboardEvent) => void,
  options: {
    enabled?: boolean
    preventDefault?: boolean
    stopPropagation?: boolean
    sequence?: boolean
  } = {}
) {
  const elementRef = React.useRef<T>(null)
  const { registry } = React.useContext(KeyboardShortcutContext)
  const { enabled = true, preventDefault = true, stopPropagation = false } = options

  // Register the shortcut
  useKeyboardShortcut(shortcut, callback, { enabled, preventDefault, stopPropagation })

  // Associate with element for tooltips
  React.useEffect(() => {
    const element = elementRef.current
    if (!element || !enabled) return

    registry.associateElement(element, shortcut)

    return () => {
      registry.disassociateElement(element)
    }
  }, [registry, shortcut, enabled])

  return elementRef
}

/**
 * Hook for accessing the keyboard shortcut context
 */
export function useKeyboardShortcutContext() {
  return React.useContext(KeyboardShortcutContext)
}

/**
 * Hook for managing global shortcuts (help, tooltips, etc.)
 */
export function useGlobalKeyboardShortcuts() {
  const { toggleTooltips, showTooltips } = useKeyboardShortcutContext()

  // Help dialog shortcut
  useKeyboardShortcut(
    {
      id: "toggle-help",
      keys: "shift+?",
      description: "Toggle keyboard shortcuts help",
      category: "Global",
    },
    () => {
      toggleTooltips()
    }
  )

  return {
    showTooltips,
    toggleTooltips,
  }
}

export default useKeyboardShortcut
