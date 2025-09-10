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
import { getExampleCode } from "@/lib/serverUtils"

// Example components
import { BasicAmountExample } from "@/examples/docs/input-amount/basic-amount"
import { CurrencyAmountExample } from "@/examples/docs/input-amount/currency-amount"
import { ErrorStateExample } from "@/examples/docs/input-amount/error-state"

// Raw imports
const basicAmountCode = getExampleCode("docs/input-amount/basic-amount.tsx")
const currencyAmountCode = getExampleCode("docs/input-amount/currency-amount.tsx")
const errorStateCode = getExampleCode("docs/input-amount/error-state.tsx")

export default async function InputAmountDocs() {
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
              <BreadcrumbPage>InputAmount</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-end gap-3 mb-4">
              <h1 className="text-4xl font-bold">InputAmount</h1>
              <Badge variant="secondary">Form Component</Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              A specialized input component for entering monetary amounts with automatic formatting,
              validation, and currency symbol support.
            </p>
            <CopyableCodeBadge text={config.getNamespacePath("input-amount")} />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the InputAmount component using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="input-amount" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <PreviewTabs
                preview={<BasicAmountExample />}
                code={basicAmountCode}
                title="Basic Amount Input"
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <PreviewTabs
                preview={<CurrencyAmountExample />}
                code={currencyAmountCode}
                title="With Currency Symbol"
              />

              <PreviewTabs
                preview={<ErrorStateExample />}
                code={errorStateCode}
                title="With Error State"
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Import</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm">
                  {`import { InputAmount } from "@/components/Input/InputAmount"`}
                </code>
              </div>
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
                      <td className="p-2 font-mono">value</td>
                      <td className="p-2">number | null</td>
                      <td className="p-2">null</td>
                      <td className="p-2">Current numeric value</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onChange</td>
                      <td className="p-2">(value: number | null) =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback fired when value changes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">label</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Optional label for the input</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">placeholder</td>
                      <td className="p-2">string</td>
                      <td className="p-2">&quot;0.00&quot;</td>
                      <td className="p-2">Placeholder text</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">maxDecimals</td>
                      <td className="p-2">number</td>
                      <td className="p-2">2</td>
                      <td className="p-2">Maximum decimal places allowed</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">showCurrency</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether to show currency symbol</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">currency</td>
                      <td className="p-2">string</td>
                      <td className="p-2">&quot;$&quot;</td>
                      <td className="p-2">Currency symbol to display</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">error</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Error message to display</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">disabled</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether the input is disabled</td>
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
