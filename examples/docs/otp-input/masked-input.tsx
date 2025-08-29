"use client"

import { OtpInput } from "@/components/Input/OtpInput"
import { useState } from "react"

export function MaskedInputExample() {
  const [maskedOtp, setMaskedOtp] = useState("")

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Masked Input (Security)</h3>
        <OtpInput length={6} value={maskedOtp} onChange={setMaskedOtp} mask={true} size="md" />
        <p className="text-sm text-muted-foreground mt-2">
          Current value: `&quot;`{maskedOtp}`&quot;`
        </p>
      </div>
    </div>
  )
}
