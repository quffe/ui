"use client"

import * as React from "react"
import { createPortal } from "react-dom"
import { useKeyboardShortcutContext } from "@/hooks/useKeyboardShortcut"
import { cn } from "@/lib/utils"

/**
 * Individual tooltip component for a keyboard shortcut
 */
function ShortcutTooltip({
  shortcut,
  position,
}: {
  element: HTMLElement
  shortcut: { keys: string; description: string }
  position: { top: number; left: number; width: number; height: number }
}) {
  const keys = shortcut.keys.split("+").map(key => {
    // Prettify key names
    switch (key.toLowerCase()) {
      case "ctrl":
        return "⌘"
      case "alt":
        return "⌥"
      case "shift":
        return "⇧"
      case "space":
        return "␣"
      case "enter":
        return "↵"
      case "escape":
        return "⎋"
      case "tab":
        return "⇥"
      case "backspace":
        return "⌫"
      case "delete":
        return "⌦"
      case "up":
        return "↑"
      case "down":
        return "↓"
      case "left":
        return "←"
      case "right":
        return "→"
      default:
        return key.toUpperCase()
    }
  })

  return (
    <div
      className="fixed z-[9999] pointer-events-none"
      style={{
        top: position.top - 8,
        left: position.left + position.width / 2,
        transform: "translateX(-50%) translateY(-100%)",
      }}
    >
      <div className="bg-gray-900 text-white px-2 py-1 rounded-md text-xs font-medium shadow-lg border border-gray-700 whitespace-nowrap">
        <div className="flex items-center gap-1">
          {keys.map((key, index) => (
            <React.Fragment key={index}>
              <kbd className="bg-gray-800 px-1.5 py-0.5 rounded text-xs font-mono border border-gray-600">
                {key}
              </kbd>
              {index < keys.length - 1 && <span className="text-gray-400">+</span>}
            </React.Fragment>
          ))}
        </div>
        <div className="text-gray-300 mt-1 text-xs truncate max-w-48">{shortcut.description}</div>
      </div>
      {/* Arrow pointing down to element */}
      <div
        className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0"
        style={{
          borderLeft: "4px solid transparent",
          borderRight: "4px solid transparent",
          borderTop: "4px solid rgb(17, 24, 39)", // gray-900
        }}
      />
    </div>
  )
}

/**
 * Global overlay that shows all keyboard shortcut tooltips
 */
export function KeyboardShortcutOverlay() {
  const { registry, showTooltips } = useKeyboardShortcutContext()
  const [elementPositions, setElementPositions] = React.useState<
    Array<{
      element: HTMLElement
      shortcut: { keys: string; description: string }
      position: { top: number; left: number; width: number; height: number }
    }>
  >([])

  React.useEffect(() => {
    if (!showTooltips) {
      setElementPositions([])
      return
    }

    const updatePositions = () => {
      const elementShortcuts = registry.getAllElementShortcuts()
      const positions = elementShortcuts
        .map(([element, shortcut]) => {
          const rect = element.getBoundingClientRect()

          // Only show tooltips for visible elements
          if (
            rect.width === 0 ||
            rect.height === 0 ||
            rect.top < -rect.height ||
            rect.left < -rect.width ||
            rect.top > window.innerHeight ||
            rect.left > window.innerWidth
          ) {
            return null
          }

          return {
            element,
            shortcut: {
              keys: shortcut.keys,
              description: shortcut.description,
            },
            position: {
              top: rect.top + window.scrollY,
              left: rect.left + window.scrollX,
              width: rect.width,
              height: rect.height,
            },
          }
        })
        .filter(Boolean) as Array<{
        element: HTMLElement
        shortcut: { keys: string; description: string }
        position: { top: number; left: number; width: number; height: number }
      }>

      setElementPositions(positions)
    }

    // Initial update
    updatePositions()

    // Update on scroll and resize
    const handleUpdate = () => {
      requestAnimationFrame(updatePositions)
    }

    window.addEventListener("scroll", handleUpdate, true)
    window.addEventListener("resize", handleUpdate)

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleUpdate, true)
      window.removeEventListener("resize", handleUpdate)
    }
  }, [showTooltips, registry])

  if (!showTooltips || elementPositions.length === 0) {
    return null
  }

  return createPortal(
    <>
      {/* Semi-transparent overlay */}
      <div className="fixed inset-0 bg-black/20 z-[9998] pointer-events-none" />

      {/* Individual tooltips */}
      {elementPositions.map(({ element, shortcut, position }, index) => (
        <ShortcutTooltip
          key={`${element.tagName}-${index}`}
          element={element}
          shortcut={shortcut}
          position={position}
        />
      ))}

      {/* Help text */}
      <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none">
        <div className="bg-gray-900 text-white px-4 py-3 rounded-lg shadow-lg border border-gray-700 max-w-sm">
          <div className="text-sm font-medium mb-2">Keyboard Shortcuts</div>
          <div className="text-xs text-gray-300 space-y-1">
            <div>
              Press{" "}
              <kbd className="bg-gray-800 px-1 py-0.5 rounded text-xs border border-gray-600">
                Shift
              </kbd>{" "}
              +{" "}
              <kbd className="bg-gray-800 px-1 py-0.5 rounded text-xs border border-gray-600">
                ?
              </kbd>{" "}
              to toggle this view
            </div>
            <div>
              Press{" "}
              <kbd className="bg-gray-800 px-1 py-0.5 rounded text-xs border border-gray-600">
                Escape
              </kbd>{" "}
              to hide
            </div>
          </div>
        </div>
      </div>
    </>,
    document.body
  )
}

/**
 * Component for displaying a keyboard shortcut help panel
 */
export function KeyboardShortcutHelp({
  className,
  onClose,
}: {
  className?: string
  onClose?: () => void
}) {
  const { registry } = useKeyboardShortcutContext()
  const shortcuts = registry.getAllShortcuts()

  // Group shortcuts by category
  const groupedShortcuts = shortcuts.reduce(
    (acc, shortcut) => {
      const category = shortcut.category || "General"
      if (!acc[category]) {
        acc[category] = []
      }
      acc[category].push(shortcut)
      return acc
    },
    {} as Record<string, typeof shortcuts>
  )

  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-800 rounded-lg shadow-lg border p-6 max-w-2xl",
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Keyboard Shortcuts</h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            ✕
          </button>
        )}
      </div>

      <div className="space-y-6">
        {Object.entries(groupedShortcuts).map(([category, categoryShortcuts]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-3 border-b pb-1">
              {category}
            </h3>
            <div className="space-y-2">
              {categoryShortcuts.map(shortcut => {
                const keys = shortcut.keys.split("+").map(key => {
                  switch (key.toLowerCase()) {
                    case "ctrl":
                      return "⌘"
                    case "alt":
                      return "⌥"
                    case "shift":
                      return "⇧"
                    case "space":
                      return "Space"
                    case "enter":
                      return "Enter"
                    case "escape":
                      return "Esc"
                    default:
                      return key.toUpperCase()
                  }
                })

                return (
                  <div key={shortcut.id} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {shortcut.description}
                    </span>
                    <div className="flex items-center gap-1">
                      {keys.map((key, index) => (
                        <React.Fragment key={index}>
                          <kbd className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded text-xs font-mono border border-gray-300 dark:border-gray-600">
                            {key}
                          </kbd>
                          {index < keys.length - 1 && (
                            <span className="text-gray-400 text-xs">+</span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t text-xs text-gray-500 dark:text-gray-400">
        Press{" "}
        <kbd className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded border border-gray-300 dark:border-gray-600">
          Shift
        </kbd>{" "}
        +{" "}
        <kbd className="bg-gray-100 dark:bg-gray-700 px-1 py-0.5 rounded border border-gray-300 dark:border-gray-600">
          ?
        </kbd>{" "}
        to show shortcuts on screen
      </div>
    </div>
  )
}

export default KeyboardShortcutOverlay
