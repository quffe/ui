"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  placeholder?: string
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, placeholder, id, value, defaultValue, ...props }, ref) => {
    const generatedId = React.useId()
    const resolvedId = id ?? generatedId

    const resolvedValue = value ?? defaultValue
    const hasValue =
      resolvedValue !== undefined &&
      resolvedValue !== null &&
      (typeof resolvedValue === "number" || String(resolvedValue).length > 0)

    return (
      <div className="relative">
        <select
          id={resolvedId}
          className={cn(
            "flex h-10 w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-8 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          ref={ref}
          {...(value !== undefined ? { value } : {})}
          {...(defaultValue !== undefined ? { defaultValue } : {})}
          {...props}
        >
          {placeholder && (
            <option value="" disabled hidden={hasValue}>
              {placeholder}
            </option>
          )}
          {children}
        </select>
        <ChevronDown
          aria-hidden="true"
          focusable="false"
          className="pointer-events-none absolute right-3 top-3 h-4 w-4 opacity-50"
        />
      </div>
    )
  }
)
Select.displayName = "Select"

export { Select }
