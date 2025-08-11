'use client'

import { Dropdown } from "@/components/Navigation/Dropdown"
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

export default function DropdownDocs() {
  const [basicValue, setBasicValue] = useState<string>("")
  const [searchableValue, setSearchableValue] = useState<string>("")
  
  const options = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
    { value: "disabled", label: "Disabled Option", disabled: true },
  ]

  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "uk", label: "United Kingdom" },
    { value: "au", label: "Australia" },
    { value: "de", label: "Germany" },
    { value: "fr", label: "France" },
    { value: "jp", label: "Japan" },
  ]

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
            <h1 className="text-4xl font-bold mb-4">Dropdown</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A searchable dropdown component built with Command and Popover primitives, featuring keyboard navigation and accessibility support.
            </p>
            <Badge variant="secondary">Navigation Component</Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Install the component using your preferred package manager</CardDescription>
            </CardHeader>
            <CardContent>
              <InstallationTabs componentName="dropdown" />
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <code className="text-sm">
                  {`import { Dropdown } from "@/components/Navigation/Dropdown"`}
                </code>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`<Dropdown
  value={selectedValue}
  onChange={setSelectedValue}
  options={options}
  placeholder="Select an option"
  searchable
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
                <h3 className="text-sm font-medium mb-2">Basic Dropdown</h3>
                <Dropdown
                  value={basicValue}
                  onChange={setBasicValue}
                  options={options}
                  placeholder="Choose an option"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {basicValue || 'None'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Searchable Dropdown</h3>
                <Dropdown
                  value={searchableValue}
                  onChange={setSearchableValue}
                  options={countryOptions}
                  placeholder="Search countries..."
                  searchable
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {searchableValue || 'None'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Disabled State</h3>
                <Dropdown
                  value=""
                  onChange={() => {}}
                  options={options}
                  placeholder="Disabled dropdown"
                  disabled
                />
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
                      <td className="p-2">(value: string) => void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback when selection changes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">placeholder</td>
                      <td className="p-2">string</td>
                      <td className="p-2">"Select an option..."</td>
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
              <CardTitle>DropdownOption Interface</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`interface DropdownOption {
  value: string
  label: string
  disabled?: boolean
}`}
                </code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Features</CardTitle>
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