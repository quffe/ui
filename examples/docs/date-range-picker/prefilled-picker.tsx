"use client"

import { DateRangePicker } from "@/components/Input/DateRangePicker"
import { useState } from "react"
import type { DateRange } from "react-day-picker"

export function PrefilledPickerExample() {
  const [reportRange, setReportRange] = useState<DateRange | undefined>({
    from: new Date(),
    to: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  })

  return (
    <div className="w-full max-w-sm">
      <DateRangePicker
        value={reportRange}
        onChange={setReportRange}
        placeholder="Report period"
      />
      <p className="text-sm text-muted-foreground mt-2">
        Selected: {reportRange?.from?.toDateString() || "None"} -{" "}
        {reportRange?.to?.toDateString() || "None"}
      </p>
    </div>
  )
}