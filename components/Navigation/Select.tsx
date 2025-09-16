"use client"

import * as React from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export interface SelectOption<T> {
  label: string
  value: T
  disabled?: boolean
}

interface InputSelectProps<T> {
  options: SelectOption<T>[]
  value: T | null
  onChange: (value: T | null) => void
  placeholder?: string
  label?: string
  error?: string
  className?: string
  triggerClassName?: string
  contentClassName?: string
  labelClassName?: string
  errorClassName?: string
  disabled?: boolean
  required?: boolean
  name?: string
  id?: string
  size?: "default" | "sm" | "lg"
  onOpenChange?: (open: boolean) => void
}

export function InputSelect<T>({
  options,
  value,
  onChange,
  placeholder = "Select an option",
  label,
  error,
  className,
  triggerClassName,
  contentClassName,
  labelClassName,
  errorClassName,
  disabled,
  required,
  name,
  id,
  size = "default",
  onOpenChange,
}: InputSelectProps<T>) {
  const selectId = React.useId()
  const finalId = id || selectId

  const keyedOptions = React.useMemo(
    () =>
      options.map((option, index) => ({
        option,
        key:
          typeof option.value === "string" || typeof option.value === "number"
            ? String(option.value)
            : `option-${index}`,
      })),
    [options]
  )

  const selectedKey = React.useMemo(() => {
    const match = keyedOptions.find(item => item.option.value === value)
    return match?.key
  }, [keyedOptions, value])

  // Handle size variants
  const sizeClasses = {
    sm: "h-8 text-xs",
    default: "h-10",
    lg: "h-12 text-base",
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && (
        <Label htmlFor={finalId} className={labelClassName}>
          {label} {required && <span className="text-destructive">*</span>}
        </Label>
      )}
      <Select
        value={selectedKey}
        onValueChange={(newValue: string) => {
          const match = keyedOptions.find(item => item.key === newValue)
          onChange(match ? match.option.value : null)
        }}
        disabled={disabled}
        name={name}
        onOpenChange={onOpenChange}
      >
        <SelectTrigger
          id={finalId}
          className={cn(
            sizeClasses[size],
            error && "border-destructive ring-destructive",
            triggerClassName
          )}
          aria-invalid={!!error}
          aria-describedby={error ? `${finalId}-error` : undefined}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent className={contentClassName}>
          <SelectGroup>
            {keyedOptions.map(({ key, option }) => (
              <SelectItem key={key} value={key} disabled={option.disabled}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && (
        <p id={`${finalId}-error`} className={cn("text-xs text-destructive", errorClassName)}>
          {error}
        </p>
      )}
    </div>
  )
}
