import { Dropdown } from "@/components/Navigation/Dropdown"
import { useState } from "react"

export function Example() {
  const [basicValue, setBasicValue] = useState<string>("")
  const [searchableValue, setSearchableValue] = useState<string>("framework-react")
  const [disabledValue, setDisabledValue] = useState<string>("")

  const basicOptions = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
    { value: "grape", label: "Grape" },
  ]

  const frameworkOptions = [
    { value: "framework-react", label: "React" },
    { value: "framework-vue", label: "Vue.js" },
    { value: "framework-angular", label: "Angular" },
    { value: "framework-svelte", label: "Svelte", disabled: true },
    { value: "framework-nextjs", label: "Next.js" },
    { value: "framework-nuxt", label: "Nuxt.js" },
  ]

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive", disabled: true },
    { value: "pending", label: "Pending" },
  ]

  return (
    <div className="space-y-6">
      {/* Basic Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Basic Dropdown</label>
        <Dropdown
          value={basicValue}
          options={basicOptions}
          onChange={setBasicValue}
          placeholder="Select a fruit..."
          searchable={false}
        />
        <p className="text-xs text-muted-foreground">
          Selected: {basicValue || "None"}
        </p>
      </div>

      {/* Searchable Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Searchable Dropdown</label>
        <Dropdown
          value={searchableValue}
          options={frameworkOptions}
          onChange={setSearchableValue}
          placeholder="Search frameworks..."
          searchable={true}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          Selected: {searchableValue}
        </p>
      </div>

      {/* Disabled Dropdown */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Disabled Dropdown</label>
        <Dropdown
          value={disabledValue}
          options={statusOptions}
          onChange={setDisabledValue}
          placeholder="This dropdown is disabled"
          disabled={true}
          searchable={false}
        />
      </div>

      {/* Custom Styling */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Custom Styled Dropdown</label>
        <Dropdown
          value={basicValue}
          options={basicOptions}
          onChange={setBasicValue}
          placeholder="Custom styling..."
          searchable={true}
          className="w-64 border-2 border-primary"
        />
      </div>
    </div>
  )
}