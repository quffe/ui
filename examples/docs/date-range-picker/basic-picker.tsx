"use client"

import { DateRangePicker } from "@/components/Input/DateRangePicker"
import { useState } from "react"
import type { DateRange } from "react-day-picker"

export function BasicPickerExample() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  return (
    <div className="w-full max-w-sm">
      <DateRangePicker
        value={dateRange}
        onChange={setDateRange}
        placeholder="Pick a date range"
      />
      <p className="text-sm text-muted-foreground mt-2">
        Selected: {dateRange?.from?.toDateString() || "None"} -{" "}
        {dateRange?.to?.toDateString() || "None"}
      </p>
    </div>
  )
}