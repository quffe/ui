"use client"

import { InputSelect } from "@/components/Navigation/Select"
import { useState } from "react"

export function NumberSizesExample() {
  const [numberValue, setNumberValue] = useState<number | null>(null)

  const numberOptions = [
    { label: "Small", value: 1 },
    { label: "Medium", value: 2 },
    { label: "Large", value: 3 },
    { label: "Extra Large", value: 4 },
  ]

  return (
    <div className="w-full max-w-sm space-y-4">
      <div>
        <InputSelect
          options={numberOptions}
          value={numberValue}
          onChange={setNumberValue}
          label="Small Size"
          placeholder="Select size"
          size="sm"
        />
      </div>
      <div>
        <InputSelect
          options={numberOptions}
          value={numberValue}
          onChange={setNumberValue}
          label="Default Size"
          placeholder="Select size"
          size="default"
        />
      </div>
      <div>
        <InputSelect
          options={numberOptions}
          value={numberValue}
          onChange={setNumberValue}
          label="Large Size"
          placeholder="Select size"
          size="lg"
        />
      </div>
      <p className="text-sm text-muted-foreground mt-2">Selected: {numberValue || "None"}</p>
    </div>
  )
}
