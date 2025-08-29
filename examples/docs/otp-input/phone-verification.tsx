"use client"

import { OtpInput } from "@/components/Input/OtpInput"
import { useState } from "react"

export function PhoneVerificationExample() {
  const [phoneOtp, setPhoneOtp] = useState("")

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Phone Verification (4 digits)</h3>
        <OtpInput
          length={4}
          value={phoneOtp}
          onChange={setPhoneOtp}
          size="lg"
          onComplete={code => alert(`Phone OTP: ${code}`)}
        />
        <p className="text-sm text-muted-foreground mt-2">
          Current value: `&quot;`{phoneOtp}`&quot;`
        </p>
      </div>
    </div>
  )
}
