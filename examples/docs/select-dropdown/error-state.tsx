"use client"

import { SelectDropdown } from "@/components/Navigation/SelectDropdown"
import { useState } from "react"

export function ErrorStateExample() {
  const [errorValue, setErrorValue] = useState<string | null>(null)

  const statusOptions = [
    { label: "Draft", value: "draft" },
    { label: "In Review", value: "review" },
    { label: "Published", value: "published" },
    { label: "Archived", value: "archived" },
  ]

  return (
    <div className="w-full max-w-sm">
      <SelectDropdown
        options={statusOptions}
        value={errorValue}
        onChange={setErrorValue}
        placeholder="Select status"
        error={!errorValue ? "Status is required" : undefined}
        required
      />
      <p className="text-sm text-muted-foreground mt-2">Selected: {errorValue || "None"}</p>
    </div>
  )
}
