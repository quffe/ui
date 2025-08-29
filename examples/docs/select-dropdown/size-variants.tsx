"use client"

import { SelectDropdown } from "@/components/Navigation/SelectDropdown"

export function SizeVariantsExample() {
  const statusOptions = [
    { label: "Draft", value: "draft" },
    { label: "In Review", value: "review" },
    { label: "Published", value: "published" },
    { label: "Archived", value: "archived" },
  ]

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-2 block">Small</label>
        <SelectDropdown
          options={statusOptions}
          value={null}
          onChange={() => {}}
          placeholder="Small dropdown"
          size="sm"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Default</label>
        <SelectDropdown
          options={statusOptions}
          value={null}
          onChange={() => {}}
          placeholder="Default dropdown"
          size="default"
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-2 block">Large</label>
        <SelectDropdown
          options={statusOptions}
          value={null}
          onChange={() => {}}
          placeholder="Large dropdown"
          size="lg"
        />
      </div>
    </div>
  )
}
