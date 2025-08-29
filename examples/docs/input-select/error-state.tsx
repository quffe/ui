"use client"

import { InputSelect } from "@/components/Navigation/Select"
import { useState } from "react"

export function ErrorStateExample() {
  const [errorValue, setErrorValue] = useState<string | null>(null)

  const priorityOptions = [
    { label: "Low Priority", value: "low" },
    { label: "Medium Priority", value: "medium" },
    { label: "High Priority", value: "high" },
    { label: "Critical", value: "critical" },
  ]

  return (
    <div className="w-full max-w-sm">
      <InputSelect
        options={priorityOptions}
        value={errorValue}
        onChange={setErrorValue}
        label="Priority Level"
        placeholder="Select priority"
        required
        error={!errorValue ? "Priority is required" : undefined}
      />
      <p className="text-sm text-muted-foreground mt-2">Selected: {errorValue || "None"}</p>
    </div>
  )
}
