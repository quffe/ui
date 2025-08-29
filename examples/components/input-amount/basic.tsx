"use client"

import { InputAmount } from "@/components/Input/InputAmount"
import { useState } from "react"

export function Example() {
  const [value, setValue] = useState<number | null>(null)

  return <InputAmount value={value} onChange={setValue} placeholder="Enter amount" currency="USD" />
}
