"use client"

import { SelectDropdown } from "@/components/Navigation/SelectDropdown"

export function DisabledStateExample() {
  const stringOptions = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Date", value: "date" },
    { label: "Elderberry", value: "elderberry" },
  ]

  return (
    <div className="w-full max-w-sm">
      <SelectDropdown
        options={stringOptions}
        value="apple"
        onChange={() => {}}
        placeholder="Cannot change"
        disabled
      />
    </div>
  )
}