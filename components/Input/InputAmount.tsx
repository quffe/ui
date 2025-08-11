"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

/**
 * Props for the InputAmount component
 */
interface InputAmountProps extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  /** Current numeric value */
  value?: number | null
  /** Callback fired when the value changes */
  onChange?: (value: number | null) => void
  /** Placeholder text */
  placeholder?: string
  /** Whether the input is disabled */
  disabled?: boolean
  /** Optional label for the input */
  label?: string
  /** Error message to display */
  error?: string
  /** Additional CSS classes */
  className?: string
  /** Maximum number of decimal places allowed */
  maxDecimals?: number
  /** Whether to show currency symbol */
  showCurrency?: boolean
  /** Currency symbol to display */
  currency?: string
  /** Locale for number formatting */
  locale?: string
}

/**
 * A specialized input component for entering monetary amounts with automatic formatting
 *
 * Features:
 * - Automatic comma formatting for thousands
 * - Decimal place control
 * - Numeric input validation
 * - Currency symbol support
 * - Proper accessibility attributes
 *
 * @example
 * ```tsx
 * <InputAmount
 *   value={amount}
 *   onChange={setAmount}
 *   label="Enter amount"
 *   maxDecimals={2}
 *   showCurrency
 *   currency="$"
 * />
 * ```
 */
export function InputAmount({
  value = null,
  onChange,
  placeholder = "0.00",
  disabled = false,
  label,
  error,
  className,
  maxDecimals = 2,
  showCurrency = false,
  currency = "$",
  locale = "en-US", // eslint-disable-line @typescript-eslint/no-unused-vars
  required,
  ...props
}: InputAmountProps) {
  const [displayValue, setDisplayValue] = useState("")
  const [isFocused, setIsFocused] = useState(false)

  /**
   * Format number with locale-appropriate thousand separators
   */
  const formatWithCommas = (num: string): string => {
    const parts = num.split(".")
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return parts.join(".")
  }

  /**
   * Remove formatting characters and return clean number string
   */
  const removeCommas = (str: string): string => {
    return str.replace(/[,\s]/g, "")
  }

  /**
   * Validate if the input value is a valid number format
   */
  const isValidNumberFormat = (value: string): boolean => {
    return /^\d*\.?\d*$/.test(value)
  }

  // Update display value when prop value changes
  useEffect(() => {
    if (!isFocused && value !== null && value !== undefined) {
      // Don't force decimal places, show the number as is
      const valueStr = value % 1 === 0 ? value.toString() : value.toString()
      const formatted = formatWithCommas(valueStr)
      setDisplayValue(formatted)
    }
  }, [value, isFocused])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    // Remove commas for processing
    const cleanValue = removeCommas(inputValue)

    // Allow empty input
    if (cleanValue === "") {
      setDisplayValue("")
      onChange?.(null)
      return
    }

    // Only allow numbers and one decimal point
    if (!isValidNumberFormat(cleanValue)) {
      return
    }

    // Prevent leading zeros (except for decimal values like 0.50)
    if (cleanValue.length > 1 && cleanValue[0] === "0" && cleanValue[1] !== ".") {
      return
    }

    // Limit decimal places
    const decimalIndex = cleanValue.indexOf(".")
    if (decimalIndex !== -1 && cleanValue.length - decimalIndex - 1 > maxDecimals) {
      return
    }

    // Update display with commas
    const formattedValue = formatWithCommas(cleanValue)
    setDisplayValue(formattedValue)

    // Convert to number and call onChange
    const numericValue = Number.parseFloat(cleanValue)
    if (!isNaN(numericValue)) {
      onChange?.(numericValue)
    } else {
      onChange?.(null)
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)

    // Format the final value on blur
    const cleanValue = removeCommas(displayValue)
    if (cleanValue && !isNaN(Number.parseFloat(cleanValue))) {
      const formatted = formatWithCommas(cleanValue)
      setDisplayValue(formatted)
    }
  }

  return (
    <div className={cn("space-y-2 w-full", className)}>
      {label && (
        <Label htmlFor="amount-input" className="text-sm font-medium">
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <div className="relative">
        {showCurrency && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
            {currency}
          </div>
        )}
        <Input
          id="amount-input"
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            showCurrency && "pl-8",
            error && "border-destructive focus-visible:ring-destructive"
          )}
          aria-describedby={error ? "amount-error" : undefined}
          aria-invalid={error ? "true" : "false"}
          {...props}
        />
      </div>
      {error && (
        <p id="amount-error" className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}
