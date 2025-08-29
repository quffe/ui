"use client"

import { OtpInput } from "@/components/Input/OtpInput"
import { useState } from "react"

export function ErrorStateExample() {
  const [errorOtp, setErrorOtp] = useState("")

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Error State</h3>
        <OtpInput length={6} value={errorOtp} onChange={setErrorOtp} error={true} />
        <p className="text-sm text-destructive mt-2">Invalid OTP code</p>
      </div>
    </div>
  )
}
