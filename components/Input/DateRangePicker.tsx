"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import type { DateRange } from "react-day-picker"
import { format } from "date-fns"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface DateRangePickerProps {
  value?: DateRange
  onChange?: (range: DateRange | undefined) => void
  minDate?: Date
  maxDate?: Date
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DateRangePicker({
  value,
  onChange,
  minDate,
  maxDate,
  placeholder = "Pick a date range",
  className,
  disabled = false,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [isSelectingFrom, setIsSelectingFrom] = React.useState(true)

  const getPresets = () => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const lastWeekStart = new Date(today)
    lastWeekStart.setDate(lastWeekStart.getDate() - 7)

    const thisMonthStart = new Date(today.getFullYear(), today.getMonth(), 1)

    const lastMonthStart = new Date(today.getFullYear(), today.getMonth() - 1, 1)
    const lastMonthEnd = new Date(today.getFullYear(), today.getMonth(), 0)

    const last3MonthsStart = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 91)

    // Helper function to clamp dates to min/max bounds
    const clampDateRange = (from: Date, to: Date): DateRange => {
      const clampedFrom = minDate && from < minDate ? minDate : from
      const clampedTo = maxDate && to > maxDate ? maxDate : to
      return { from: clampedFrom, to: clampedTo }
    }

    return [
      {
        label: "Today",
        range: clampDateRange(today, today),
      },
      {
        label: "Yesterday",
        range: clampDateRange(yesterday, yesterday),
      },
      {
        label: "Last Week",
        range: clampDateRange(lastWeekStart, today),
      },
      {
        label: "This Month",
        range: clampDateRange(thisMonthStart, today),
      },
      {
        label: "Last Month",
        range: clampDateRange(lastMonthStart, lastMonthEnd),
      },
      {
        label: "Last 3 Months",
        range: clampDateRange(last3MonthsStart, today),
      },
    ]
  }

  const presets = getPresets()

  const formatDateRange = (range: DateRange | undefined) => {
    if (!range?.from) {
      return placeholder
    }

    if (!range.to) {
      return format(range.from, "MMM dd, yyyy")
    }

    return `${format(range.from, "MMM dd, yyyy")} - ${format(range.to, "MMM dd, yyyy")}`
  }

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value?.from && "text-muted-foreground"
            )}
            disabled={disabled}
            onClick={() => setIsSelectingFrom(true)}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {formatDateRange(value)}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="flex">
            {/* Presets sidebar */}
            <div className="flex flex-col border-r bg-muted/50 p-2 space-y-1 min-w-[140px]">
              <div className="px-2 py-1 text-xs font-medium text-muted-foreground">Presets</div>
              {presets.map(preset => (
                <Button
                  key={preset.label}
                  variant="ghost"
                  size="sm"
                  className="justify-start h-8 px-2 text-xs"
                  onClick={() => {
                    onChange?.(preset.range)
                    setIsSelectingFrom(true)
                    setOpen(false)
                  }}
                >
                  {preset.label}
                </Button>
              ))}
            </div>

            {/* Calendar */}
            <div>
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={value?.from}
                selected={value}
                onSelect={(_, triggerDate) => {
                  if (!triggerDate) return

                  if (isSelectingFrom) {
                    // First click - set 'from' date only
                    onChange?.({ from: triggerDate, to: undefined })
                    setIsSelectingFrom(false)
                  } else {
                    // Second click - set 'to' date and close modal
                    onChange?.({ from: value?.from, to: triggerDate })
                    setIsSelectingFrom(true)
                    setOpen(false)
                  }
                }}
                numberOfMonths={2}
                disabled={date => {
                  if (minDate && date < minDate) return true
                  if (maxDate && date > maxDate) return true

                  if (!isSelectingFrom && value?.from) {
                    const maxToDate = new Date(value.from)
                    maxToDate.setDate(maxToDate.getDate() + 91)
                    if (date > maxToDate) return true
                  }

                  return false
                }}
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
