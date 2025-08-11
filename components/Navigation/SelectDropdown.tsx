"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const dropdownVariants = cva(
  "relative w-full rounded-md border border-input bg-background text-sm ring-offset-background",
  {
    variants: {
      variant: {
        default: "border-input",
        error: "border-destructive",
      },
      size: {
        default: "h-10",
        sm: "h-8 text-xs",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface SelectDropdownOption<T> {
  label: string
  value: T
  disabled?: boolean
}

interface DropdownProps<T> extends VariantProps<typeof dropdownVariants> {
  options: SelectDropdownOption<T>[]
  value: T | null
  onChange: (value: T) => void
  placeholder?: string
  disabled?: boolean
  className?: string
  error?: string
  name?: string
  required?: boolean
  id?: string
  "aria-label"?: string
}

export function SelectDropdown<T>({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  disabled = false,
  className,
  variant,
  size,
  error,
  name,
  required,
  "aria-label": ariaLabel,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const listboxId = React.useId()

  // Find the selected option
  const selectedOption = options.find(option => option.value === value)

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return

    if (event.key === "Escape") {
      setIsOpen(false)
      return
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()

      if (!isOpen) {
        setIsOpen(true)
        return
      }

      const currentIndex = value !== null ? options.findIndex(option => option.value === value) : -1
      const availableOptions = options.filter(option => !option.disabled)

      if (availableOptions.length === 0) return

      let nextIndex: number

      if (currentIndex === -1) {
        nextIndex = event.key === "ArrowDown" ? 0 : availableOptions.length - 1
      } else {
        const currentAvailableIndex = availableOptions.findIndex(option => option.value === value)

        if (event.key === "ArrowDown") {
          nextIndex = (currentAvailableIndex + 1) % availableOptions.length
        } else {
          nextIndex =
            (currentAvailableIndex - 1 + availableOptions.length) % availableOptions.length
        }
      }

      onChange(availableOptions[nextIndex].value)
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setIsOpen(prev => !prev)
    }
  }

  return (
    <div className="space-y-1">
      <div
        ref={dropdownRef}
        className={cn(dropdownVariants({ variant: error ? "error" : variant, size }), className)}
        onKeyDown={handleKeyDown}
      >
        <Button
          ref={buttonRef}
          type="button"
          variant="ghost"
          className={cn(
            "flex h-full w-full justify-between font-normal",
            !selectedOption && "text-muted-foreground"
          )}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-labelledby={ariaLabel}
          aria-controls={isOpen ? listboxId : undefined}
        >
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronDown
            className={cn("ml-2 h-4 w-4 shrink-0 opacity-50", isOpen && "rotate-180 transform")}
          />
        </Button>

        {isOpen && (
          <div className="absolute left-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
            <ul
              className="py-1"
              role="listbox"
              id={listboxId}
              aria-labelledby={ariaLabel}
              tabIndex={-1}
            >
              {options.map((option, index) => (
                <li
                  key={index}
                  role="option"
                  aria-selected={value === option.value}
                  aria-disabled={option.disabled}
                  className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
                    value === option.value && "bg-accent text-accent-foreground",
                    !option.disabled &&
                      "cursor-pointer hover:bg-accent hover:text-accent-foreground",
                    option.disabled && "pointer-events-none opacity-50"
                  )}
                  onClick={() => {
                    if (!option.disabled) {
                      onChange(option.value)
                      setIsOpen(false)
                      buttonRef.current?.focus()
                    }
                  }}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {value === option.value && <Check className="h-4 w-4" />}
                  </span>
                  <span className="truncate">{option.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {name && (
        <input
          type="hidden"
          name={name}
          value={value !== null ? String(value) : ""}
          required={required}
        />
      )}
    </div>
  )
}
