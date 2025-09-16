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
  ariaLabel?: string
  ariaLabelledBy?: string
  description?: string
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
  id,
  ariaLabel,
  ariaLabelledBy,
  description,
  "aria-label": ariaLabelDeprecated,
}: DropdownProps<T>) {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const generatedId = React.useId()
  const buttonId = id ?? generatedId
  const listboxId = `${buttonId}-listbox`
  const descriptionId = description ? `${buttonId}-description` : undefined
  const liveRegionId = `${buttonId}-status`
  const finalAriaLabel = ariaLabel ?? ariaLabelDeprecated

  // Find the selected option
  const selectedOption = options.find(option => option.value === value) ?? null

  const normalizedOptions = React.useMemo(
    () =>
      options.map((option, index) => ({
        option,
        index,
        id: `${listboxId}-option-${index}`,
      })),
    [options, listboxId]
  )

  const enabledOptionIndices = React.useMemo(
    () =>
      normalizedOptions
        .filter(({ option }) => !option.disabled)
        .map(({ index }) => index),
    [normalizedOptions]
  )

  const selectedIndex = React.useMemo(
    () => normalizedOptions.find(({ option }) => option.value === value)?.index ?? -1,
    [normalizedOptions, value]
  )

  const [activeIndex, setActiveIndex] = React.useState(() =>
    selectedIndex >= 0 ? selectedIndex : enabledOptionIndices[0] ?? -1
  )

  React.useEffect(() => {
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : enabledOptionIndices[0] ?? -1)
  }, [selectedIndex, enabledOptionIndices])

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
      buttonRef.current?.focus()
      return
    }

    if (event.key === "Tab") {
      setIsOpen(false)
      return
    }

    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault()

      if (!isOpen) {
        setIsOpen(true)
        return
      }

      if (enabledOptionIndices.length === 0) return

      const currentEnabledPosition = enabledOptionIndices.indexOf(activeIndex)

      let nextEnabledIndex: number

      if (currentEnabledPosition === -1) {
        nextEnabledIndex = event.key === "ArrowDown" ? 0 : enabledOptionIndices.length - 1
      } else if (event.key === "ArrowDown") {
        nextEnabledIndex = (currentEnabledPosition + 1) % enabledOptionIndices.length
      } else {
        nextEnabledIndex =
          (currentEnabledPosition - 1 + enabledOptionIndices.length) % enabledOptionIndices.length
      }

      const nextIndex = enabledOptionIndices[nextEnabledIndex]
      const nextOption = normalizedOptions[nextIndex]
      if (!nextOption) return

      setActiveIndex(nextIndex)
      onChange(nextOption.option.value)
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
        return
      }

      if (activeIndex >= 0) {
        const nextOption = normalizedOptions[activeIndex]
        if (nextOption && !nextOption.option.disabled) {
          onChange(nextOption.option.value)
        }
      }
      setIsOpen(false)
      buttonRef.current?.focus()
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
          id={buttonId}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-controls={isOpen ? listboxId : undefined}
          aria-label={finalAriaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={descriptionId}
          data-state={isOpen ? "open" : "closed"}
        >
          <span className="truncate">{selectedOption ? selectedOption.label : placeholder}</span>
          <ChevronDown
            aria-hidden="true"
            focusable="false"
            className={cn("ml-2 h-4 w-4 shrink-0 opacity-50", isOpen && "rotate-180 transform")}
          />
        </Button>

        {isOpen && (
          <div className="absolute left-0 z-50 mt-1 max-h-60 w-full overflow-auto rounded-md border bg-popover p-1 text-popover-foreground shadow-md">
            <ul
              className="py-1"
              role="listbox"
              id={listboxId}
              aria-labelledby={ariaLabelledBy}
              aria-label={finalAriaLabel}
              aria-describedby={descriptionId}
              aria-activedescendant={activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined}
              tabIndex={-1}
            >
              {normalizedOptions.map(({ option, index, id: optionId }) => (
                <li
                  key={optionId}
                  role="option"
                  aria-selected={value === option.value}
                  aria-disabled={option.disabled}
                  id={optionId}
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
                      setActiveIndex(index)
                      setIsOpen(false)
                      buttonRef.current?.focus()
                    }
                  }}
                >
                  <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                    {value === option.value && (
                      <Check aria-hidden="true" focusable="false" className="h-4 w-4" />
                    )}
                  </span>
                  <span className="truncate">{option.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
      {description && !error && (
        <p id={descriptionId} className="text-xs text-muted-foreground">
          {description}
        </p>
      )}
      <span id={liveRegionId} className="sr-only" aria-live="polite">
        {selectedOption ? `Selected ${selectedOption.label}` : "No option selected"}
      </span>
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
