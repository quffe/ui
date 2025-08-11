"use client"

import * as React from "react"

/**
 * Options for the copy to clipboard hook
 */
export interface UseCopyToClipboardOptions {
  /** Function to call on successful copy */
  onSuccess?: (text: string) => void
  /** Function to call on copy error */
  onError?: (error: Error) => void
  /** Timeout for success state in milliseconds (default: 2000) */
  timeout?: number
  /** Whether to show default toast notifications */
  showToast?: boolean
  /** Custom toast implementation */
  toast?: (message: string, type?: "success" | "error") => void
}

/**
 * Return type for the copy to clipboard hook
 */
export interface UseCopyToClipboardReturn {
  /** Function to copy text to clipboard */
  copy: (text: string, label?: string) => Promise<boolean>
  /** Whether the copy operation was successful */
  copied: boolean
  /** Any error that occurred during copying */
  error: Error | null
  /** Whether a copy operation is in progress */
  isLoading: boolean
}

/**
 * A hook for copying text to clipboard with comprehensive error handling and state management
 *
 * Features:
 * - Modern Clipboard API with fallback
 * - Loading and success states
 * - Error handling
 * - Customizable notifications
 * - Auto-reset after timeout
 * - TypeScript support
 *
 * @param options - Configuration options
 * @returns Object with copy function and state
 *
 * @example
 * ```tsx
 * function CopyButton({ text }: { text: string }) {
 *   const { copy, copied, error, isLoading } = useCopyToClipboard({
 *     onSuccess: (text) => console.log('Copied:', text),
 *     onError: (error) => console.error('Copy failed:', error),
 *     timeout: 3000
 *   })
 *
 *   return (
 *     <button
 *       onClick={() => copy(text, 'API Key')}
 *       disabled={isLoading}
 *     >
 *       {isLoading ? 'Copying...' : copied ? 'Copied!' : 'Copy'}
 *     </button>
 *   )
 * }
 * ```
 */
export function useCopyToClipboard({
  onSuccess,
  onError,
  timeout = 2000,
  showToast = false,
  toast,
}: UseCopyToClipboardOptions = {}): UseCopyToClipboardReturn {
  const [copied, setCopied] = React.useState(false)
  const [error, setError] = React.useState<Error | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const timeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)

  /**
   * Fallback copy method for older browsers
   */
  const fallbackCopy = (text: string): boolean => {
    const textArea = document.createElement("textarea")
    textArea.value = text
    textArea.style.position = "fixed"
    textArea.style.left = "-999999px"
    textArea.style.top = "-999999px"
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand("copy")
      document.body.removeChild(textArea)
      return successful
    } catch (err) {
      document.body.removeChild(textArea)
      throw new Error("Fallback copy failed")
    }
  }

  /**
   * Copy text to clipboard
   */
  const copy = React.useCallback(
    async (text: string, label?: string): Promise<boolean> => {
      if (!text) {
        const emptyError = new Error("No text provided to copy")
        setError(emptyError)
        onError?.(emptyError)
        return false
      }

      setIsLoading(true)
      setError(null)

      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      try {
        // Try modern Clipboard API first
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text)
        } else {
          // Fallback for older browsers or non-secure contexts
          const success = fallbackCopy(text)
          if (!success) {
            throw new Error("Clipboard write failed")
          }
        }

        setCopied(true)
        setError(null)

        // Show notification
        const message = label ? `Copied ${label}` : `Copied: ${text}`

        if (showToast && toast) {
          toast(message, "success")
        } else if (showToast && typeof window !== "undefined" && "sonner" in window) {
          // Use sonner if available globally
          const { toast: sonnerToast } = await import("sonner")
          sonnerToast.success(message)
        }

        onSuccess?.(text)

        // Auto-reset after timeout
        timeoutRef.current = setTimeout(() => {
          setCopied(false)
        }, timeout)

        return true
      } catch (err) {
        const copyError = err instanceof Error ? err : new Error("Copy operation failed")
        setError(copyError)
        setCopied(false)

        if (showToast && toast) {
          toast("Failed to copy to clipboard", "error")
        } else if (showToast && typeof window !== "undefined" && "sonner" in window) {
          const { toast: sonnerToast } = await import("sonner")
          sonnerToast.error("Failed to copy to clipboard")
        }

        onError?.(copyError)
        return false
      } finally {
        setIsLoading(false)
      }
    },
    [onSuccess, onError, timeout, showToast, toast]
  )

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    copy,
    copied,
    error,
    isLoading,
  }
}

/**
 * Legacy hook for backward compatibility
 * @deprecated Use `useCopyToClipboard` instead
 */
export const useCopyToClipboard_Legacy = () => {
  const { copy } = useCopyToClipboard({ showToast: true })

  return React.useCallback(
    (text: string, label?: string) => {
      copy(text, label)
    },
    [copy]
  )
}
