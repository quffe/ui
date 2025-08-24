"use client"

import { Dropdown } from "@/components/Navigation/Dropdown"
import { useState } from "react"

export function SearchableDropdownExample() {
  const [searchableValue, setSearchableValue] = useState<string>("")

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
  ]

  return (
    <div className="w-full max-w-sm">
      <Dropdown
        value={searchableValue}
        onChange={setSearchableValue}
        options={countryOptions}
        placeholder="Search countries..."
        searchable
      />
      <p className="text-sm text-muted-foreground mt-2">
        Selected: {searchableValue || "None"}
      </p>
    </div>
  )
}