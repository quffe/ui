'use client'

import { OtpInput } from "@/components/Input/OtpInput"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { InstallationTabs } from "@/components/InstallationTabs"
import { useState } from "react"

export default function OtpInputDocs() {
  const [otp, setOtp] = useState("")
  const [phoneOtp, setPhoneOtp] = useState("")
  const [maskedOtp, setMaskedOtp] = useState("")

  return (
    <div className="flex flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>OtpInput</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      
      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">OtpInput</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A one-time password (OTP) input component with multiple input fields, auto-focus navigation, paste support, and keyboard navigation.
            </p>
            <Badge variant="secondary">Input Component</Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Install the component using your preferred package manager</CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="otp-input" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <code className="text-sm">
                  {`import { OtpInput } from "@/components/Input/OtpInput"`}
                </code>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`<OtpInput
  length={6}
  value={otpValue}
  onChange={setOtpValue}
  onComplete={(code) => console.log('Complete:', code)}
/>`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Email Verification (6 digits)</h3>
                <OtpInput
                  length={6}
                  value={otp}
                  onChange={setOtp}
                  onComplete={(code) => alert(`Email OTP: ${code}`)}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Current value: "{otp}"
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Phone Verification (4 digits)</h3>
                <OtpInput
                  length={4}
                  value={phoneOtp}
                  onChange={setPhoneOtp}
                  size="lg"
                  onComplete={(code) => alert(`Phone OTP: ${code}`)}
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Current value: "{phoneOtp}"
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Masked Input (Security)</h3>
                <OtpInput
                  length={6}
                  value={maskedOtp}
                  onChange={setMaskedOtp}
                  mask={true}
                  size="md"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Current value: "{maskedOtp}"
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Error State</h3>
                <OtpInput
                  length={6}
                  value=""
                  onChange={() => {}}
                  error={true}
                />
                <p className="text-sm text-destructive mt-2">
                  Invalid OTP code
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Props</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Prop</th>
                      <th className="text-left p-2">Type</th>
                      <th className="text-left p-2">Default</th>
                      <th className="text-left p-2">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b">
                      <td className="p-2 font-mono">length</td>
                      <td className="p-2">number</td>
                      <td className="p-2">6</td>
                      <td className="p-2">Number of OTP input fields</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">value</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Current OTP value</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onChange</td>
                      <td className="p-2">(value: string) =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback when OTP value changes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onComplete</td>
                      <td className="p-2">(value: string) =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback when OTP is complete</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">size</td>
                      <td className="p-2">'sm' | 'md' | 'lg'</td>
                      <td className="p-2">'md'</td>
                      <td className="p-2">Size variant of input fields</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">mask</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether to mask input values</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">error</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Error state styling</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">disabled</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether inputs are disabled</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">autoSubmit</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Auto-submit when complete</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}