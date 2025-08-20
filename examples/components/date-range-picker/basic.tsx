import { DateRangePicker } from "@/components/Input/DateRangePicker"

export function Example() {
  return (
    <DateRangePicker 
      onChange={(range: any) => console.log(range)} 
    />
  )
}