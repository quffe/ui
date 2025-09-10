"use server"

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
import { InstallationTabs } from "@/components/internal/installation"
import { PreviewTabs } from "@/components/internal/ui/preview-tabs"
import { CopyableCodeBadge } from "@/components/internal/ui/copyable-code-badge"
import { config } from "@/lib/config"

// Example components
import { BasicExample } from "@/examples/docs/otp-input/basic-example"
import { PhoneVerificationExample } from "@/examples/docs/otp-input/phone-verification"
import { MaskedInputExample } from "@/examples/docs/otp-input/masked-input"
import { ErrorStateExample } from "@/examples/docs/otp-input/error-state"
import { getExampleCode } from "@/lib/serverUtils"

// Raw imports
const basicExampleCode = getExampleCode("docs/otp-input/basic-example.tsx")
const phoneVerificationCode = getExampleCode("docs/otp-input/phone-verification.tsx")
const maskedInputCode = getExampleCode("docs/otp-input/masked-input.tsx")
const errorStateCode = getExampleCode("docs/otp-input/error-state.tsx")

export default async function OtpInputDocs() {
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
            <div className="flex items-end gap-3 mb-4">
              <h1 className="text-4xl font-bold">OtpInput</h1>
              <Badge variant="secondary">Form Component</Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              A one-time password (OTP) input component with multiple input fields, auto-focus
              navigation, paste support, and keyboard navigation.
            </p>
            <CopyableCodeBadge text={config.getNamespacePath("otp-input")} />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the component using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="otp-input" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <PreviewTabs
                title="Email Verification (6 digits)"
                preview={<BasicExample />}
                code={basicExampleCode}
              />

              <PreviewTabs
                title="Phone Verification (4 digits)"
                preview={<PhoneVerificationExample />}
                code={phoneVerificationCode}
              />

              <PreviewTabs
                title="Masked Input (Security)"
                preview={<MaskedInputExample />}
                code={maskedInputCode}
              />

              <PreviewTabs
                title="Error State"
                preview={<ErrorStateExample />}
                code={errorStateCode}
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Props</CardTitle>
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
                      <td className="p-2">&apos;sm&apos; | &apos;md&apos; | &apos;lg&apos;</td>
                      <td className="p-2">&apos;md&apos;</td>
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
