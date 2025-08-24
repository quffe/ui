"use client"

import { OtpInput } from "@/components/Input/OtpInput"
import { useState } from "react"

export function BasicExample() {
  const [otp, setOtp] = useState("")

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Email Verification (6 digits)</h3>
        <OtpInput
          length={6}
          value={otp}
          onChange={setOtp}
          onComplete={code => alert(`Email OTP: ${code}`)}
        />
        <p className="text-sm text-muted-foreground mt-2">Current value: `&quot;`{otp}`&quot;`</p>
      </div>
    </div>
  )
}
