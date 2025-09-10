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
import { BasicExample } from "@/examples/docs/input-select/basic-example"
import { NumberSizesExample } from "@/examples/docs/input-select/number-sizes"
import { ErrorStateExample } from "@/examples/docs/input-select/error-state"
import { DisabledStateExample } from "@/examples/docs/input-select/disabled-state"

// Raw imports
const basicExampleCode = getExampleCode("docs/input-select/basic-example.tsx")
const numberSizesCode = getExampleCode("docs/input-select/number-sizes.tsx")
const errorStateCode = getExampleCode("docs/input-select/error-state.tsx")
const disabledStateCode = getExampleCode("docs/input-select/disabled-state.tsx")

export default async function InputSelectDocs() {
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
              <BreadcrumbPage>InputSelect</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-end gap-3 mb-4">
              <h1 className="text-4xl font-bold">InputSelect</h1>
              <Badge variant="secondary">Input Component</Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              A flexible, type-safe select input component with support for various data types,
              sizes, labels, and error states.
            </p>
            <CopyableCodeBadge text={config.getNamespacePath("input-select")} />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the component using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="input-select" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <PreviewTabs
                preview={<BasicExample />}
                code={basicExampleCode}
                title="Basic Example"
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <PreviewTabs
                preview={<NumberSizesExample />}
                code={numberSizesCode}
                title="Size Variants"
              />

              <PreviewTabs
                preview={<ErrorStateExample />}
                code={errorStateCode}
                title="Required with Error State"
              />

              <PreviewTabs
                preview={<DisabledStateExample />}
                code={disabledStateCode}
                title="Disabled State"
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
                      <td className="p-2 font-mono">options</td>
                      <td className="p-2">SelectOption&lt;T&gt;[]</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Array of select options</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">value</td>
                      <td className="p-2">T | null</td>
                      <td className="p-2">null</td>
                      <td className="p-2">Currently selected value</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onChange</td>
                      <td className="p-2">(value: T | null) =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback when selection changes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">placeholder</td>
                      <td className="p-2">string</td>
                      <td className="p-2">&quot;Select an option&quot;</td>
                      <td className="p-2">Placeholder text</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">label</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Label for the select</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">error</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Error message to display</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">size</td>
                      <td className="p-2">&apos;default&apos; | &apos;sm&apos; | &apos;lg&apos;</td>
                      <td className="p-2">&apos;default&apos;</td>
                      <td className="p-2">Size variant</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">disabled</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether select is disabled</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">required</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether field is required</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">name</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Form field name</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">id</td>
                      <td className="p-2">string</td>
                      <td className="p-2">auto-generated</td>
                      <td className="p-2">Element ID</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Type-safe with generic type support</li>
                <li>Multiple size variants (sm, default, lg)</li>
                <li>Label and error message support</li>
                <li>Required field indication</li>
                <li>Disabled options support</li>
                <li>Accessible with proper ARIA attributes</li>
                <li>Auto-generated IDs with override option</li>
                <li>Form integration with name attribute</li>
                <li>Customizable styling with className props</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
