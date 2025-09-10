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
import { BasicDropdownExample } from "@/examples/docs/dropdown/basic-dropdown"
import { SearchableDropdownExample } from "@/examples/docs/dropdown/searchable-dropdown"
import { DisabledStateExample } from "@/examples/docs/dropdown/disabled-state"
import { getExampleCode } from "@/lib/serverUtils"

// Raw imports
const basicDropdownCode = getExampleCode("docs/dropdown/basic-dropdown.tsx")
const searchableDropdownCode = getExampleCode("docs/dropdown/searchable-dropdown.tsx")
const disabledStateCode = getExampleCode("docs/dropdown/disabled-state.tsx")

export default async function DropdownDocs() {
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
              <BreadcrumbPage>Dropdown</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>

      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <div className="flex items-end gap-3 mb-4">
              <h1 className="text-4xl font-bold">Dropdown</h1>
              <Badge variant="secondary">Navigation Component</Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              A searchable dropdown component built with Command and Popover primitives, featuring
              keyboard navigation and accessibility support.
            </p>
            <CopyableCodeBadge text={config.getNamespacePath("dropdown")} />
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Installation</CardTitle>
              <CardDescription>
                Install the component using your preferred package manager
              </CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="dropdown" />
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
                preview={<SearchableDropdownExample />}
                code={searchableDropdownCode}
                title="Searchable Dropdown"
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
                      <td className="p-2 font-mono">value</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Currently selected value</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">options</td>
                      <td className="p-2">DropdownOption[]</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Array of dropdown options</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">onChange</td>
                      <td className="p-2">(value: string) =&gt; void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback when selection changes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">placeholder</td>
                      <td className="p-2">string</td>
                      <td className="p-2">&quot;Select an option...&quot;</td>
                      <td className="p-2">Placeholder text</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">searchable</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Enable search functionality</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">className</td>
                      <td className="p-2">string</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Additional CSS classes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">disabled</td>
                      <td className="p-2">boolean</td>
                      <td className="p-2">false</td>
                      <td className="p-2">Whether dropdown is disabled</td>
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
                <li>Built with Command and Popover primitives</li>
                <li>Optional search functionality</li>
                <li>Keyboard navigation support</li>
                <li>Disabled options support</li>
                <li>Accessible with proper ARIA attributes</li>
                <li>Visual selection indicators</li>
                <li>Responsive popover positioning</li>
                <li>Empty state handling</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
