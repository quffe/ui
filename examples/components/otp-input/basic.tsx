import { OtpInput } from "@/components/Input/OtpInput"
import { useState } from "react"

export function Example() {
  const [value, setValue] = useState("")

  return (
    <OtpInput
      value={value}
      onChange={setValue}
      length={6}
      onComplete={(value: any) => console.log(value)}
    />
  )
}
