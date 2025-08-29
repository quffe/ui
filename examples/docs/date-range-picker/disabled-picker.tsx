"use client"

import { DateRangePicker } from "@/components/Input/DateRangePicker"
import { useState } from "react"
import type { DateRange } from "react-day-picker"

export function DisabledPickerExample() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  })

  return (
    <div className="w-full max-w-sm">
      <DateRangePicker
        value={dateRange}
        onChange={setDateRange}
        placeholder="Disabled picker"
        disabled={true}
      />
    </div>
  )
}
