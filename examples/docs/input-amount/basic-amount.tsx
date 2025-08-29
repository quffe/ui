"use client"

import { InputAmount } from "@/components/Input/InputAmount"
import { useState } from "react"

export function BasicAmountExample() {
  const [amount, setAmount] = useState<number | null>(null)

  return (
    <div className="w-full max-w-sm">
      <InputAmount value={amount} onChange={setAmount} label="Amount" placeholder="0.00" />
      <p className="text-sm text-muted-foreground mt-2">
        Current value: {amount?.toString() || "null"}
      </p>
    </div>
  )
}
