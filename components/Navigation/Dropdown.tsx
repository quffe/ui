"use client"

import * as React from "react"
import { Check, ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
}

interface DropdownProps {
  value?: string
  options: DropdownOption[]
  onChange?: (value: string) => void
  placeholder?: string
  searchable?: boolean
  className?: string
  disabled?: boolean
  id?: string
  name?: string
  ariaLabel?: string
  ariaLabelledBy?: string
  description?: string
  searchPlaceholder?: string
  emptyMessage?: string
}

export function Dropdown({
  value,
  options,
  onChange,
  placeholder = "Select an option...",
  searchable = false,
  className,
  disabled = false,
  id,
  name,
  ariaLabel,
  ariaLabelledBy,
  description,
  searchPlaceholder = "Search options...",
  emptyMessage = "No option found.",
}: DropdownProps) {
  const [open, setOpen] = React.useState(false)
  const generatedId = React.useId()
  const triggerId = id ?? generatedId
  const listboxId = `${triggerId}-listbox`
  const descriptionId = description ? `${triggerId}-description` : undefined
  const liveRegionId = `${triggerId}-status`

  const selectedOption = options.find(option => option.value === value)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          id={triggerId}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-haspopup="listbox"
          aria-controls={open ? listboxId : undefined}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          aria-describedby={descriptionId}
          className={cn("w-full justify-between", className)}
          disabled={disabled}
        >
          {selectedOption ? selectedOption.label : placeholder}
          <ChevronDown
            aria-hidden="true"
            focusable="false"
            className="ml-2 h-4 w-4 shrink-0 opacity-50"
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-full p-0"
        align="start"
        aria-labelledby={ariaLabelledBy}
        aria-describedby={descriptionId}
      >
        <Command>
          {searchable && (
            <CommandInput
              id={`${triggerId}-search`}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              aria-describedby={descriptionId}
            />
          )}
          <CommandList
            id={listboxId}
            aria-labelledby={ariaLabelledBy}
            aria-describedby={descriptionId}
          >
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup>
              {options.map(option => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  onSelect={currentValue => {
                    if (currentValue !== value) {
                      onChange?.(currentValue)
                    }
                    setOpen(false)
                  }}
                  aria-selected={value === option.value}
                >
                  <Check
                    aria-hidden="true"
                    focusable="false"
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
      {description && (
        <p id={descriptionId} className="mt-1 text-xs text-muted-foreground">
          {description}
        </p>
      )}
      <span id={liveRegionId} className="sr-only" aria-live="polite">
        {selectedOption ? `Selected ${selectedOption.label}` : "No option selected"}
      </span>
      {name && <input type="hidden" name={name} value={value ?? ""} />}
    </Popover>
  )
}
