"use client"

import { SelectDropdown } from "@/components/Navigation/SelectDropdown"
import { useState } from "react"

export function NumberValuesExample() {
  const [numberValue, setNumberValue] = useState<number | null>(null)

  const numberOptions = [
    { label: "One", value: 1 },
    { label: "Two", value: 2 },
    { label: "Three", value: 3 },
    { label: "Four", value: 4 },
    { label: "Five", value: 5 },
  ]

  return (
    <div className="w-full max-w-sm">
      <SelectDropdown
        options={numberOptions}
        value={numberValue}
        onChange={setNumberValue}
        placeholder="Pick a number"
      />
      <p className="text-sm text-muted-foreground mt-2">Selected: {numberValue || "None"}</p>
    </div>
  )
}
