'use client'

import { SelectDropdown } from "@/components/Navigation/SelectDropdown"
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
import { useState } from "react"

export default function SelectDropdownDocs() {
  const [basicValue, setBasicValue] = useState<string | null>(null)
  const [numberValue, setNumberValue] = useState<number | null>(null)
  const [errorValue, setErrorValue] = useState<string | null>(null)
  
  const stringOptions = [
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Cherry", value: "cherry" },
    { label: "Date (Disabled)", value: "date", disabled: true },
    { label: "Elderberry", value: "elderberry" },
  ]

  const numberOptions = [
    { label: "One", value: 1 },
    { label: "Two", value: 2 },
    { label: "Three", value: 3 },
    { label: "Four", value: 4 },
    { label: "Five", value: 5 },
  ]

  const statusOptions = [
    { label: "Draft", value: "draft" },
    { label: "In Review", value: "review" },
    { label: "Published", value: "published" },
    { label: "Archived", value: "archived" },
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
              <BreadcrumbPage>SelectDropdown</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      
      <div className="flex-1 p-4">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-4">SelectDropdown</h1>
            <p className="text-lg text-muted-foreground mb-4">
              A custom dropdown component with full keyboard navigation, accessibility support, and type safety. Features custom styling and behavior.
            </p>
            <Badge variant="secondary">Navigation Component</Badge>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Installation</CardTitle>
              <CardDescription>Import the SelectDropdown component</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm">import {`{ SelectDropdown }`} from "@/components/Navigation"</code>
              </div>
            </CardContent>
          </Card>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-md mb-4">
                <code className="text-sm">
                  {`import { SelectDropdown } from "@/components/Navigation/SelectDropdown"`}
                </code>
              </div>
              <div className="bg-muted p-4 rounded-md">
                <code className="text-sm whitespace-pre-line">
{`<SelectDropdown
  options={options}
  value={selectedValue}
  onChange={setSelectedValue}
  placeholder="Choose an option"
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
                <SelectDropdown
                  options={stringOptions}
                  value={basicValue}
                  onChange={setBasicValue}
                  placeholder="Choose a fruit"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {basicValue || 'None'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Number Values</h3>
                <SelectDropdown
                  options={numberOptions}
                  value={numberValue}
                  onChange={setNumberValue}
                  placeholder="Pick a number"
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {numberValue || 'None'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Size Variants</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Small</label>
                    <SelectDropdown
                      options={statusOptions}
                      value={null}
                      onChange={() => {}}
                      placeholder="Small dropdown"
                      size="sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Default</label>
                    <SelectDropdown
                      options={statusOptions}
                      value={null}
                      onChange={() => {}}
                      placeholder="Default dropdown"
                      size="default"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Large</label>
                    <SelectDropdown
                      options={statusOptions}
                      value={null}
                      onChange={() => {}}
                      placeholder="Large dropdown"
                      size="lg"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Error State</h3>
                <SelectDropdown
                  options={statusOptions}
                  value={errorValue}
                  onChange={setErrorValue}
                  placeholder="Select status"
                  error={!errorValue ? "Status is required" : undefined}
                  required
                />
                <p className="text-sm text-muted-foreground mt-2">
                  Selected: {errorValue || 'None'}
                </p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Disabled State</h3>
                <SelectDropdown
                  options={stringOptions}
                  value="apple"
                  onChange={() => {}}
                  placeholder="Cannot change"
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
                      <td className="p-2">(value: T) => void</td>
                      <td className="p-2">-</td>
                      <td className="p-2">Callback when selection changes</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">placeholder</td>
                      <td className="p-2">string</td>
                      <td className="p-2">"Select an option"</td>
                      <td className="p-2">Placeholder text</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">size</td>
                      <td className="p-2">'default' | 'sm' | 'lg'</td>
                      <td className="p-2">'default'</td>
                      <td className="p-2">Size variant</td>
                    </tr>
                    <tr className="border-b">
                      <td className="p-2 font-mono">variant</td>
                      <td className="p-2">'default' | 'error'</td>
                      <td className="p-2">'default'</td>
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
              <CardTitle>Features</CardTitle>
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