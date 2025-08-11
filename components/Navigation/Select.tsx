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
        value={value ? String(value) : undefined}
        onValueChange={(newValue: string) => onChange(newValue as T)}
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
            {options.map((option, index) => (
              <SelectItem key={index} value={String(option.value)} disabled={option.disabled}>
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
