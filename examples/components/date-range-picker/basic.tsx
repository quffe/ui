"use client"

import { DateRangePicker } from "@/components/Input/DateRangePicker"

export function Example() {
  return <DateRangePicker onChange={range => console.log(range)} />
}
