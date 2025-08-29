"use client"

import { InputAmount } from "@/components/Input/InputAmount"
import { useState } from "react"

export function CurrencyAmountExample() {
  const [currencyAmount, setCurrencyAmount] = useState<number | null>(1000)

  return (
    <div className="w-full max-w-sm">
      <InputAmount
        value={currencyAmount}
        onChange={setCurrencyAmount}
        label="Price"
        placeholder="0.00"
        showCurrency
        currency="$"
      />
      <p className="text-sm text-muted-foreground mt-2">
        Current value: {currencyAmount?.toString() || "null"}
      </p>
    </div>
  )
}
