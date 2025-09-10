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
import { BasicDropdownExample } from "@/examples/docs/select-dropdown/basic-dropdown"
import { SizeVariantsExample } from "@/examples/docs/select-dropdown/size-variants"
import { NumberValuesExample } from "@/examples/docs/select-dropdown/number-values"
import { ErrorStateExample } from "@/examples/docs/select-dropdown/error-state"
import { DisabledStateExample } from "@/examples/docs/select-dropdown/disabled-state"

// Raw imports
const basicDropdownCode = getExampleCode("docs/select-dropdown/basic-dropdown.tsx")
const sizeVariantsCode = getExampleCode("docs/select-dropdown/size-variants.tsx")
const numberValuesCode = getExampleCode("docs/select-dropdown/number-values.tsx")
const errorStateCode = getExampleCode("docs/select-dropdown/error-state.tsx")
const disabledStateCode = getExampleCode("docs/select-dropdown/disabled-state.tsx")

export default async function SelectDropdownDocs() {
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
              <BreadcrumbPage>SelectDropdown</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-end gap-3 mb-4">
              <h1 className="text-4xl font-bold">SelectDropdown</h1>
              <Badge variant="secondary">Navigation Component</Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              A custom dropdown component with full keyboard navigation, accessibility support, and
              type safety. Features custom styling and behavior.
            </p>
            <CopyableCodeBadge text={config.getNamespacePath("select-dropdown")} />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the component using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="select-dropdown" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <PreviewTabs
                preview={<BasicDropdownExample />}
                code={basicDropdownCode}
                title="Basic Dropdown"
              />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Examples</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <PreviewTabs
                preview={<NumberValuesExample />}
                code={numberValuesCode}
                title="Number Values"
              />

              <PreviewTabs
                preview={<SizeVariantsExample />}
                code={sizeVariantsCode}
                title="Size Variants"
              />

              <PreviewTabs
                preview={<ErrorStateExample />}
                code={errorStateCode}
                title="Error State"
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
                      <td className="p-2">SelectDropdownOption&lt;T&gt;[]</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Array of dropdown options</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">value</td>
                      <td className="p-2">T | null</td>
                      <td className="p-2">null</td>
                      <td className="p-2">Currently selected value</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onChange</td>
                      <td className="p-2">(value: T) =&gt; void</td>
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
                      <td className="p-2 font-mono">size</td>
                      <td className="p-2">&apos;default&apos; | &apos;sm&apos; | &apos;lg&apos;</td>
                      <td className="p-2">&apos;default&apos;</td>
                      <td className="p-2">Size variant</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">variant</td>
                      <td className="p-2">&apos;default&apos; | &apos;error&apos;</td>
                      <td className="p-2">&apos;default&apos;</td>
                      <td className="p-2">Visual variant</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">disabled</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether dropdown is disabled</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">error</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Error message to display</td>
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
                      <td className="p-2 font-mono">aria-label</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Accessibility label</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Keyboard Navigation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">↑/↓</kbd>
                  <span>Navigate through options</span>
                </div>
                <div className="flex justify-between">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">Enter/Space</kbd>
                  <span>Toggle dropdown or select option</span>
                </div>
                <div className="flex justify-between">
                  <kbd className="px-2 py-1 bg-muted rounded text-xs">Escape</kbd>
                  <span>Close dropdown</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Full keyboard navigation (arrow keys, enter, escape)</li>
                <li>Click outside to close</li>
                <li>Type-safe with generic support</li>
                <li>Multiple size variants with class-variance-authority</li>
                <li>Error states and form validation</li>
                <li>Disabled options support</li>
                <li>Hidden form input for form submissions</li>
                <li>Accessible with proper ARIA attributes</li>
                <li>Focus management and restoration</li>
                <li>Custom styling variants</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
