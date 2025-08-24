"use client"

import { DateRangePicker } from "@/components/Input/DateRangePicker"

export function RestrictedPickerExample() {
  return (
    <div className="w-full max-w-sm">
      <DateRangePicker
        value={undefined}
        onChange={() => {}}
        placeholder="Future dates only"
        minDate={new Date()}
        maxDate={new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)}
      />
    </div>
  )
}
