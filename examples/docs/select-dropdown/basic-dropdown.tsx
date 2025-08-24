"use client"

import { SelectDropdown } from "@/components/Navigation/SelectDropdown"
import { useState } from "react"

export function BasicDropdownExample() {
  const [value, setValue] = useState<string | null>(null)

  const stringOptions = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Date (Disabled)", value: "date", disabled: true },
    { label: "Elderberry", value: "elderberry" },
  ]

  return (
    <div className="w-full max-w-sm">
      <SelectDropdown
        options={stringOptions}
        value={value}
        onChange={setValue}
        placeholder="Choose a fruit"
      />
      <p className="text-sm text-muted-foreground mt-2">
        Selected: {value || "None"}
      </p>
    </div>
  )
}