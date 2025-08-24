"use client"

import { Dropdown } from "@/components/Navigation/Dropdown"
import { useState } from "react"

export function BasicDropdownExample() {
  const [basicValue, setBasicValue] = useState<string>("")

  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "disabled", label: "Disabled Option", disabled: true },
  ]

  return (
    <div className="w-full max-w-sm">
      <Dropdown
        value={basicValue}
        onChange={setBasicValue}
        options={options}
        placeholder="Choose an option"
      />
      <p className="text-sm text-muted-foreground mt-2">
        Selected: {basicValue || "None"}
      </p>
    </div>
  )
}