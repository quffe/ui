"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface RadioOption {
  value: string
  label: string
  disabled?: boolean
}

export interface RadioGroupProps {
  name: string
  options: RadioOption[]
  value?: string
  onChange?: (value: string) => void
  className?: string
  disabled?: boolean
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, name, options, value, onChange, disabled, ...props }, ref) => {
    return (
      <div className={cn("space-y-2", className)} ref={ref} {...props}>
        {options.map(option => (
          <div key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              id={`${name}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={e => onChange?.(e.target.value)}
              disabled={disabled || option.disabled}
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 focus:ring-2"
            />
            <label
              htmlFor={`${name}-${option.value}`}
              className={cn(
                "text-sm font-medium leading-none",
                (disabled || option.disabled) && "opacity-50 cursor-not-allowed"
              )}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
    )
  }
)
RadioGroup.displayName = "RadioGroup"

export { RadioGroup }
