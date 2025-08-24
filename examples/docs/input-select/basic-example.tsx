"use client"

import { InputSelect } from "@/components/Navigation/Select"
import { useState } from "react"

export function BasicExample() {
  const [value, setValue] = useState<string | null>(null)

  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Disabled Option", value: "disabled", disabled: true },
  ]

  return (
    <div className="w-full max-w-sm">
      <InputSelect
        options={options}
        value={value}
        onChange={setValue}
        label="Choose Option"
        placeholder="Select an option"
      />
      <p className="text-sm text-muted-foreground mt-2">
        Selected: {value || "None"}
      </p>
    </div>
  )
}