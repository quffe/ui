"use client"

import { Dropdown } from "@/components/Navigation/Dropdown"

export function DisabledStateExample() {
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ]

  return (
    <div className="w-full max-w-sm">
      <Dropdown
        value=""
        onChange={() => {}}
        options={options}
        placeholder="Disabled dropdown"
        disabled
      />
    </div>
  )
}
