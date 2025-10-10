"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

/**
 * Modal overlay variants for different positioning
 */
const modalVariants = cva("fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6", {
  variants: {
    position: {
      center: "items-center justify-center",
      top: "items-start justify-center pt-[10vh]",
      bottom: "items-end justify-center pb-[10vh]",
    },
  },
  defaultVariants: {
    position: "center",
  },
})

/**
 * Modal content variants for different sizes
 */
const contentVariants = cva(
  "bg-background relative rounded-lg shadow-lg border max-h-[90vh] overflow-auto animate-in fade-in-0 zoom-in-95 duration-200",
  {
    variants: {
      size: {
        sm: "w-full max-w-sm",
        md: "w-full max-w-md",
        lg: "w-full max-w-lg",
        xl: "w-full max-w-xl",
        "2xl": "w-full max-w-2xl",
        "3xl": "w-full max-w-3xl",
        "4xl": "w-full max-w-4xl",
        full: "w-full max-w-[95vw]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
)

export interface ModalProps
  extends VariantProps<typeof modalVariants>,
    VariantProps<typeof contentVariants> {
  children: React.ReactNode
  open: boolean
  onClose: () => void
  title?: string
  description?: string
  showCloseButton?: boolean
  closeOnOutsideClick?: boolean
  closeOnEsc?: boolean
  className?: string
  contentClassName?: string
}

export function Modal({
  children,
  open,
  onClose,
  title,
  description,
  position,
  size,
  showCloseButton = true,
  closeOnOutsideClick = true,
  closeOnEsc = true,
  className,
  contentClassName,
}: ModalProps) {
  const modalRef = React.useRef<HTMLDivElement>(null)
  const [isClosing, setIsClosing] = React.useState(false)
  const [mounted, setMounted] = React.useState(false)
  const previousOverflowRef = React.useRef<string | null>(null)
  const titleId = React.useId()
  const descriptionId = React.useId()

  // Handle component mount for client-side rendering
  React.useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Handle close with animation
  const handleClose = React.useCallback(() => {
    setIsClosing(true)
    setTimeout(() => {
      setIsClosing(false)
      onClose()
    }, 100)
  }, [onClose])

  // Handle ESC key press
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && closeOnEsc) {
        handleClose()
      }
    }

    if (!open) {
      return () => {
        document.removeEventListener("keydown", handleKeyDown)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    previousOverflowRef.current = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      if (previousOverflowRef.current !== null) {
        document.body.style.overflow = previousOverflowRef.current
        previousOverflowRef.current = null
      }
    }
  }, [open, closeOnEsc, handleClose])

  // Handle outside click
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOutsideClick && modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleClose()
    }
  }

  if ((!open && !isClosing) || !mounted) return null

  const modalContent = (
    <div
      className={cn(
        modalVariants({ position }),
        "bg-background/80 backdrop-blur-sm",
        isClosing && "animate-out fade-out-0 zoom-out-95 duration-200",
        className
      )}
      onClick={handleOutsideClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
    >
      <div
        ref={modalRef}
        className={cn(
          contentVariants({ size }),
          isClosing && "animate-out fade-out-0 zoom-out-95 duration-200",
          contentClassName
        )}
      >
        {showCloseButton && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 z-10"
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
        {(title || description) && (
          <div className="p-6 pb-0">
            {title && (
              <h2 id={titleId} className="text-lg font-semibold leading-none tracking-tight">
                {title}
              </h2>
            )}
            {description && (
              <p id={descriptionId} className="mt-2 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>
        )}
        <div className="p-6">{children}</div>
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
}
