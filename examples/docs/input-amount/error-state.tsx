"use client"

import { InputAmount } from "@/components/Input/InputAmount"

export function ErrorStateExample() {
  return (
    <div className="w-full max-w-sm">
      <InputAmount
        value={null}
        onChange={() => {}}
        label="Budget"
        placeholder="0.00"
        error="Amount is required"
        showCurrency
        currency="€"
      />
    </div>
  )
}