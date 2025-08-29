"use client"

import { InputSelect } from "@/components/Navigation/Select"

export function DisabledStateExample() {
  const stringOptions = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
    { label: "Disabled Option", value: "disabled", disabled: true },
  ]

  return (
    <div className="w-full max-w-sm">
      <InputSelect
        options={stringOptions}
        value="option2"
        onChange={() => {}}
        label="Disabled Select"
        placeholder="Cannot select"
        disabled
      />
    </div>
  )
}
